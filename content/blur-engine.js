/**
 * FitraShield - Blur Engine
 * المحرك المسؤول عن إدارة حالات الصور وتصنيفها والتواصل مع الخلفية والتحكم بالضبابية
 */

const FitraBlurEngine = (() => {

  // ---- الحالة الداخلية للمحرك ----
  let settings = { enabled: false, sensitivity: 'standard', whitelist: [], blurRadius: 30, blurGrayscale: true };
  let requestCounter = 0;
  const pendingRequests = new Map(); // requestId → imgElement
  const sessionCache = new Map();    // imgURL → 'ALLOW'|'BLOCK'
  const MIN_IMAGE_SIZE = 40;         // تجاهل الصور الصغيرة جداً (أيقونات)

  // دالة لاستخراج رابط الخلفية البصرية لعناصر الـ CSS
  function getBackgroundImageUrl(element) {
    if (!element || element.nodeType !== Node.ELEMENT_NODE) return null;
    
    // محاولة قراءة النمط المباشر (Inline style) أولاً كونه الأسرع
    const inlineBg = element.style.backgroundImage || element.style.background;
    if (inlineBg && inlineBg !== 'none') {
      const match = inlineBg.match(/url\((['"]?)(.*?)\1\)/);
      if (match && match[2]) return match[2];
    }

    // محاولة قراءة النمط المحسوب (Computed Style) إذا كان متوفراً
    try {
      const computedBg = window.getComputedStyle(element).backgroundImage;
      if (computedBg && computedBg !== 'none') {
        const match = computedBg.match(/url\((['"]?)(.*?)\1\)/);
        if (match && match[2]) return match[2];
      }
    } catch (e) {}

    return null;
  }

  // عنصر Canvas مشترك لتسريع فك وتصغير مصفوفات بكسلات الصور
  let sharedCanvas = null;
  let sharedCtx = null;

  function getSharedContext() {
    if (!sharedCanvas) {
      sharedCanvas = document.createElement('canvas');
      sharedCanvas.width = 224;
      sharedCanvas.height = 224;
      sharedCtx = sharedCanvas.getContext('2d', { willReadFrequently: true });
    }
    return sharedCtx;
  }

  // ---- عتبات تصنيف NSFWJS ----
  const SENSITIVITY_THRESHOLDS = {
    strict:   { Porn: 0.15, Hentai: 0.15, Sexy: 0.15 },
    standard: { Porn: 0.35, Hentai: 0.35, Sexy: 0.45 },
    relaxed:  { Porn: 0.6, Hentai: 0.6, Sexy: 0.7 }
  };

  // تطبيق قيم CSS المخصصة بناءً على إعدادات الوالدين
  function applyBlurStyles() {
    const radius = settings.blurRadius ?? 30;
    const grayscale = settings.blurGrayscale ?? true;
    
    document.documentElement.style.setProperty('--fs-blur-radius', `${radius}px`);
    document.documentElement.style.setProperty('--fs-grayscale', grayscale ? '100%' : '0%');
  }

  // توليد هش قصير فريد للروابط لتجنب انتفاخ أسماء مفاتيح الكاش
  async function hashUrl(str) {
    try {
      const msgBuffer = new TextEncoder().encode(str);
      const hashBuffer = await crypto.subtle.digest('SHA-1', msgBuffer);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      return hashArray.map(b => b.toString(16).padStart(2, '0')).join('').slice(0, 16);
    } catch (e) {
      return btoa(str).slice(0, 16);
    }
  }

  // تحميل الكاش المشترك بين علامات التبويب من chrome.storage.session
  function loadSessionStorageCache() {
    try {
      chrome.storage.session.get(null, (result) => {
        if (chrome.runtime.lastError || !result) return;
        for (const key in result) {
          if (key.startsWith('fs_blur_')) {
            const item = result[key];
            if (item && item.url && item.verdict) {
              sessionCache.set(item.url, item.verdict);
            }
          }
        }
      });
    } catch (e) {}
  }

  // قاطع الأمان لحماية الأداء عند تكرار الأخطاء
  const CircuitBreaker = {
    errorCount: 0,
    MAX_ERRORS: 5,
    RESET_AFTER: 30000, // 30 ثانية
    open: false,
 
    recordError() {
      this.errorCount++;
      if (this.errorCount >= this.MAX_ERRORS) {
        this.open = true;
        console.warn('[FitraShield] Circuit Breaker: تم تعليق الفحص البصري مؤقتاً لحماية الأداء بسبب أخطاء متكررة.');
        setTimeout(() => {
          this.open = false;
          this.errorCount = 0;
          console.log('[FitraShield] Circuit Breaker: تم إعادة تفعيل الفحص البصري.');
        }, this.RESET_AFTER);
      }
    },

    recordSuccess() {
      this.errorCount = 0;
    },

    isAllowed() {
      return !this.open;
    }
  };

  // طابور الفرز ذو الأولوية بـ Viewport
  const InspectionQueue = {
    high: [],   // الصور داخل منطقة العرض (المرئية)
    low: [],    // الصور خارج منطقة العرض
    running: false,
    BATCH_SIZE: 3,

    enqueue(imgElement) {
      if (imgElement.dataset.fsStatus && imgElement.dataset.fsStatus !== 'pending') return;

      // تطبيق التضبيب الوقائي فوراً وبشكل فوري لحجب الصورة قبل بدء معالجتها أو تصنيفها
      applyPendingBlur(imgElement);

      const rect = imgElement.getBoundingClientRect();
      const inViewport = rect.bottom > 0 && rect.top < (window.innerHeight || document.documentElement.clientHeight);
      
      if (inViewport) {
        this.high.push(imgElement);
      } else {
        this.low.push(imgElement);
      }
      this.scheduleRun();
    },

    scheduleRun() {
      if (this.running) return;
      this.running = true;
      // بدء التشغيل الفوري والسريع لمعالجة الصور
      setTimeout(() => this.processNext(), 30);
    },

    processNext() {
      const batch = [];
      while (batch.length < this.BATCH_SIZE) {
        const img = this.high.shift() || this.low.shift();
        if (!img) break;
        batch.push(img);
      }

      batch.forEach(img => {
        // تم تطبيق التضبيب الوقائي مسبقاً في مرحلة enqueue
        if (img.complete && img.naturalWidth > 0) {
          queueImageForCheck(img);
        } else {
          // مستمعات الأحداث لضمان الفحص بمجرد اكتمال التحميل أو إلغائه عند الفشل
          img.addEventListener('load', () => queueImageForCheck(img), { once: true });
          img.addEventListener('error', () => removePendingBlur(img), { once: true });
          
          // حماية إضافية: فحص الصورة فقط إذا اكتمل تحميلها لاحقاً لمنع كشف الصور البطيئة
          setTimeout(() => {
            if (img.dataset.fsStatus === 'pending' && img.complete && img.naturalWidth > 0) {
              queueImageForCheck(img);
            }
          }, 5000);
        }
      });

      if (this.high.length > 0 || this.low.length > 0) {
        //Yield execution and process next batch in 30ms to maintain responsiveness while keeping scanning super fast
        setTimeout(() => this.processNext(), 35);
      } else {
        this.running = false;
      }
    }
  };

  // ---- تهيئة المحرك ----
  function init(userSettings) {
    settings = { ...settings, ...userSettings };
    if (!settings.enabled) {
      disableAllBlurs();
      return;
    }

    applyBlurStyles();
    loadSessionStorageCache(); // تحميل كاش الجلسة المشترك

    // التحقق مما إذا كان الموقع الحالي مدرجاً في القائمة البيضاء (الاستثناءات)
    const hostname = window.location.hostname.toLowerCase();
    const isWhitelisted = settings.whitelist.some(domain => {
      const d = domain.toLowerCase().trim ? domain.toLowerCase().trim() : domain.toLowerCase();
      return hostname === d || hostname.endsWith('.' + d);
    });

    if (isWhitelisted) {
      console.log(`[FitraShield] الموقع الحالي (${hostname}) مستثنى من التصفية البصرية.`);
      return;
    }

    // الاستماع لردود التصنيف والتحقق من التغييرات الفورية في الإعدادات
    chrome.runtime.onMessage.addListener(handleBackgroundMessage);

    scanExistingImages();
    startMutationObserver();
  }

  // ---- معالجة رسائل الخدمة الخلفية ----
  function handleBackgroundMessage(message) {
    if (message.type === 'CLASSIFICATION_RESULT') {
      const { requestId, imgURL, predictions, verdict, error } = message;
      
      const imgElement = pendingRequests.get(requestId);
      pendingRequests.delete(requestId);

      if (error) {
        CircuitBreaker.recordError();
      } else {
        CircuitBreaker.recordSuccess();
      }

      if (!imgElement) return;

      let finalVerdict = verdict;

      // إذا لم يحدد الـ Service Worker نتيجة صريحة، نقوم بتحليل التوقعات الخام
      if (!finalVerdict && predictions) {
        finalVerdict = analyzeScores(predictions);
      }

      // تخزين النتيجة في كاش الجلسة
      if (imgURL) {
        sessionCache.set(imgURL, finalVerdict);

        // حفظ في كاش الجلسة المشترك عبر chrome.storage.session
        hashUrl(imgURL).then(hash => {
          const cacheKey = `fs_blur_${hash}`;
          chrome.storage.session.set({ [cacheKey]: { url: imgURL, verdict: finalVerdict } }).catch(() => {});
        });

        // تحديث كاش الإضافة طوال الجلسة
        chrome.runtime.sendMessage({
          type: 'SET_BLUR_CACHE',
          imgURL,
          verdict: finalVerdict
        });
      }

      // تطبيق القرار البصري النهائي
      if (finalVerdict === 'BLOCK') {
        applyPermanentBlur(imgElement);
        incrementBlockedStats();
      } else {
        removePendingBlur(imgElement);
      }
    } else if (message.type === 'BLUR_SETTINGS_UPDATED') {
      // تحديث فوري للإعدادات في حالة تعديلها من لوحة التحكم دون الحاجة لإعادة تحميل الصفحة
      settings.enabled = message.settings.blurEnabled ?? false;
      settings.sensitivity = message.settings.blurSensitivity ?? 'standard';
      settings.whitelist = message.settings.blurWhitelist ?? [];
      settings.blurRadius = message.settings.blurRadius ?? 30;
      settings.blurGrayscale = message.settings.blurGrayscale ?? true;
      
      if (!settings.enabled) {
        disableAllBlurs();
      } else {
        applyBlurStyles();
        init(settings);
      }
    }
  }

  // ---- تعطيل التضبيب عن كل الصور ----
  function disableAllBlurs() {
    document.querySelectorAll('img[data-fs-status]').forEach(img => {
      img.dataset.fsStatus = 'safe';
      img.removeAttribute('data-fs-status');
      img.removeAttribute('data-fs-overlay');
      img.parentNode.querySelector('.fs-blur-overlay')?.remove();
      if (img.parentNode.classList.contains('fs-img-wrapper')) {
        // فك تغليف الصورة
        img.parentNode.replaceWith(img);
      }
    });
  }

  // ---- تحليل نتائج النموذج بحسب الحساسية ----
  function analyzeScores(predictions) {
    const sens = SENSITIVITY_THRESHOLDS[settings.sensitivity] || SENSITIVITY_THRESHOLDS.standard;
    const scores = {};
    
    predictions.forEach(p => {
      scores[p.className] = p.probability;
    });

    if ((scores['Porn'] || 0) >= sens.Porn) return 'BLOCK';
    if ((scores['Hentai'] || 0) >= sens.Hentai) return 'BLOCK';
    if ((scores['Sexy'] || 0) >= sens.Sexy) return 'BLOCK';

    return 'ALLOW';
  }

  // التحقق الدلالي من البيانات الوصفية لرصد صور النساء والعلاقات الرومانسية فوراً
  function containsWomanMetadata(imgElement) {
    const textToSearch = [
      imgElement.alt || '',
      imgElement.title || '',
      imgElement.src || '',
      imgElement.getAttribute('aria-label') || '',
      imgElement.parentNode?.tagName === 'A' ? (imgElement.parentNode.title || imgElement.parentNode.href || '') : ''
    ].join(' ').toLowerCase();

    const keywords = [
      'امرأة', 'امرأه', 'نساء', 'بنت', 'بنات', 'فتاة', 'فتيات', 'سيدة', 'سيدات', 
      'عارضة', 'عارضات', 'ممثلة', 'ممثلات', 'زوجة', 'زوجات', 'عروس', 'الزوجين', 'زوجين',
      'حبيبين', 'الحبيبين', 'خطيبين', 'الخطيبين', 'رومانسية', 'الرومانسية', 'حضن', 'الاحضان', 'قبلة', 'القبلات', 'علاقة حميمة', 'العلاقة الحميمة',
      'woman', 'women', 'girl', 'girls', 'lady', 'ladies', 'female', 'females', 
      'actress', 'model', 'bride', 'wife', 'couple', 'couples', 'romance', 'romantic', 
      'kiss', 'kissing', 'hug', 'hugging', 'intimate', 'intimacy'
    ];

    return keywords.some(keyword => textToSearch.includes(keyword));
  }

  // ---- إرسال صورة لقائمة الانتظار للفحص ----
  function queueImageForCheck(imgElement) {
    // التحقق من قاطع التيار وقائياً
    if (!CircuitBreaker.isAllowed()) {
      removePendingBlur(imgElement);
      return;
    }

    // تجاهل الصور المكتمل حظرها أو تصنيفها مسبقاً
    if (imgElement.dataset.fsStatus && imgElement.dataset.fsStatus !== 'pending') return;

    // 1. الفحص الدلالي السريع لرصد النساء والعلاقات الرومانسية
    if (containsWomanMetadata(imgElement)) {
      applyPermanentBlur(imgElement);
      incrementBlockedStats();
      return;
    }

    // 2. التحقق من أبعاد العنصر (للصور العادية أو عناصر الخلفيات) لتجنب حجب الأيقونات المصغرة
    if (imgElement.tagName === 'IMG') {
      if (imgElement.complete && imgElement.naturalWidth > 0) {
        if (imgElement.naturalWidth < MIN_IMAGE_SIZE || imgElement.naturalHeight < MIN_IMAGE_SIZE) {
          removePendingBlur(imgElement);
          return;
        }
      } else if (!imgElement.complete) {
        // إذا لم تكتمل بعد، لا تقم بفك الحجب الوقائي تلقائياً وانتظر اكتمال التحميل
        return;
      }
    } else {
      // عناصر الخلفيات البصرية (مثل div)
      const width = imgElement.clientWidth || imgElement.offsetWidth || 0;
      const height = imgElement.clientHeight || imgElement.offsetHeight || 0;
      if (width > 0 && height > 0) {
        if (width < MIN_IMAGE_SIZE || height < MIN_IMAGE_SIZE) {
          removePendingBlur(imgElement);
          return;
        }
      }
    }

    // استخدام currentSrc للصور العادية، أو استخراج الخلفية للعناصر الأخرى
    const src = imgElement.tagName === 'IMG' ? (imgElement.currentSrc || imgElement.src) : getBackgroundImageUrl(imgElement);
    if (!src || src.startsWith('data:image/svg') || src.length > 2048) {
      removePendingBlur(imgElement);
      return;
    }

    // التحقق من كاش الصفحة أولاً
    if (sessionCache.has(src)) {
      const cached = sessionCache.get(src);
      incrementCacheStats(); // تسجيل استرجاع من الكاش
      if (cached === 'BLOCK') {
        applyPermanentBlur(imgElement);
      } else {
        removePendingBlur(imgElement);
      }
      return;
    }

    const requestId = ++requestCounter;
    pendingRequests.set(requestId, imgElement);

    // تسجيل فحص إحصائي
    incrementTotalStats();

    // حالة 1: صورة Base64 محلية مشفرة كـ Data URL (لصور IMG فقط)
    if (src.startsWith('data:image/') && imgElement.tagName === 'IMG') {
      try {
        const ctx = getSharedContext();
        ctx.clearRect(0, 0, 224, 224);
        ctx.drawImage(imgElement, 0, 0, 224, 224);
        const imageData = ctx.getImageData(0, 0, 224, 224);

        chrome.runtime.sendMessage({
          type: 'CLASSIFY_LOCAL_IMAGE',
          imageData,
          imgURL: src,
          requestId
        });
      } catch (err) {
        removePendingBlur(imgElement);
      }
      return;
    }

    // حالة 2: صورة خارجية من نطاق مختلف (CORS) أو محلية عادية أو عناصر خلفيات
    const isCrossOrigin = imgElement.tagName !== 'IMG' || !src.startsWith(window.location.origin);
    
    if (isCrossOrigin) {
      // إرسال للخلفية لجلبها وتصنيفها في Offscreen
      chrome.runtime.sendMessage({
        type: 'CLASSIFY_CROSS_ORIGIN',
        imgURL: src,
        requestId
      });
    } else {
      // صورة محلية عادية: محاولة فك تشفيرها بالكانفاس
      requestIdleCallback(() => {
        try {
          const ctx = getSharedContext();
          ctx.clearRect(0, 0, 224, 224);
          ctx.drawImage(imgElement, 0, 0, 224, 224);
          const imageData = ctx.getImageData(0, 0, 224, 224);

          chrome.runtime.sendMessage({
            type: 'CLASSIFY_LOCAL_IMAGE',
            imageData,
            imgURL: src,
            requestId
          });
        } catch (err) {
          // إجراء احتياطي في حالة الفشل (Fall Back): جلبها من خلال الخلفية
          chrome.runtime.sendMessage({
            type: 'CLASSIFY_CROSS_ORIGIN',
            imgURL: src,
            requestId
          });
        }
      }, { timeout: 1500 });
    }
  }

  // ---- تطبيق الضبابية الوقائية المؤقتة ----
  function applyPendingBlur(imgElement) {
    if (imgElement.dataset.fsStatus) return;
    imgElement.dataset.fsStatus = 'pending';
  }

  // ---- تثبيت الضبابية نهائياً لقفل الصورة ----
  function applyPermanentBlur(imgElement) {
    imgElement.dataset.fsStatus = 'blocked';
    addLockOverlay(imgElement);
  }

  // ---- إزالة الضبابية وعرض الصورة ----
  function removePendingBlur(imgElement) {
    imgElement.dataset.fsStatus = 'safe';
  }

  // ---- إضافة واجهة قفل زجاجية فوق الصورة المحجوبة ----
  function addLockOverlay(imgElement) {
    if (imgElement.dataset.fsOverlay === 'true') return;
    imgElement.dataset.fsOverlay = 'true';

    const overlay = document.createElement('div');
    overlay.className = 'fs-blur-overlay';
    overlay.title = 'درع الفطرة: صورة محجوبة لحماية المحتوى — انقر لعرضها مؤقتاً';

    const lockIcon = document.createElement('img');
    lockIcon.className = 'fs-lock-icon';
    lockIcon.src = chrome.runtime.getURL('icons/lock-overlay.svg');
    lockIcon.alt = '🔐';
    overlay.appendChild(lockIcon);

    if (imgElement.tagName === 'IMG') {
      // لف الصورة بحاوية div للحفاظ على موضع القفل
      const wrapper = document.createElement('div');
      wrapper.className = 'fs-img-wrapper';
      imgElement.parentNode.insertBefore(wrapper, imgElement);
      wrapper.appendChild(imgElement);
      wrapper.appendChild(overlay);
    } else {
      // بالنسبة لعناصر الخلفيات (مثل div)، نضيف القفل كابن مباشر بوضعية مطلقة
      const computedPos = window.getComputedStyle(imgElement).position;
      if (computedPos === 'static') {
        imgElement.style.position = 'relative';
      }
      imgElement.appendChild(overlay);
    }

    overlay.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      handleUnblockRequest(imgElement);
    });
  }

  // ---- طلب كشف الحجب الآمن بكلمة مرور الوالدين ----
  function handleUnblockRequest(imgElement) {
    FitraPasswordModal.show((password) => {
      chrome.runtime.sendMessage(
        { type: 'VERIFY_PARENT_PASSWORD', password },
        (response) => {
          if (response?.verified) {
            imgElement.dataset.fsStatus = 'safe';
            imgElement.dataset.fsOverlay = 'false';
            
            if (imgElement.parentNode && imgElement.parentNode.classList.contains('fs-img-wrapper')) {
              imgElement.parentNode.querySelector('.fs-blur-overlay')?.remove();
              imgElement.parentNode.replaceWith(imgElement);
            } else {
              imgElement.querySelector('.fs-blur-overlay')?.remove();
            }
            
            FitraPasswordModal.hide();
          } else {
            FitraPasswordModal.showError('كلمة المرور غير صحيحة.');
          }
        }
      );
    });
  }

  // ---- تحديث إحصائيات لوحة التحكم ----
  function incrementTotalStats() {
    chrome.runtime.sendMessage({ type: 'INCREMENT_STATS_TOTAL' });
  }

  function incrementBlockedStats() {
    chrome.runtime.sendMessage({ type: 'INCREMENT_STATS_BLOCKED' });
  }

  function incrementCacheStats() {
    chrome.runtime.sendMessage({ type: 'INCREMENT_STATS_CACHE' });
  }

  // ---- مسح الصور الحالية عند التحميل الأول ----
  function scanExistingImages() {
    // 1. فحص عناصر الصور العادية
    document.querySelectorAll('img').forEach(img => {
      InspectionQueue.enqueue(img);
    });

    // 2. فحص عناصر الخلفيات البصرية (background-image)
    document.querySelectorAll('[style*="background-image"], [style*="background"]').forEach(el => {
      const bgUrl = getBackgroundImageUrl(el);
      if (bgUrl) {
        InspectionQueue.enqueue(el);
      }
    });
  }

  // ---- مراقبة الصور الديناميكية (MutationObserver) ----
  function startMutationObserver() {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach(mutation => {
        // 1. مراقبة إضافة عناصر جديدة للـ DOM
        mutation.addedNodes.forEach(node => {
          if (node.nodeType !== Node.ELEMENT_NODE) return;

          if (node.tagName === 'IMG') {
            InspectionQueue.enqueue(node);
          } else {
            const bgUrl = getBackgroundImageUrl(node);
            if (bgUrl) {
              InspectionQueue.enqueue(node);
            }
          }

          node.querySelectorAll?.('img').forEach(img => {
            InspectionQueue.enqueue(img);
          });

          node.querySelectorAll?.('[style*="background-image"], [style*="background"]').forEach(el => {
            const bgUrl = getBackgroundImageUrl(el);
            if (bgUrl) {
              InspectionQueue.enqueue(el);
            }
          });
        });

        // 2. مراقبة تغيير السمات (مثل تغيير src أو srcset أو إزالة سمة الحجب أو تغيير الـ style)
        if (mutation.type === 'attributes') {
          const target = mutation.target;
          
          if (target.tagName === 'IMG') {
            if (mutation.attributeName === 'src' || mutation.attributeName === 'srcset') {
              target.removeAttribute('data-fs-status');
              target.removeAttribute('data-fs-overlay');
              InspectionQueue.enqueue(target);
            }
          } else if (mutation.attributeName === 'style') {
            const bgUrl = getBackgroundImageUrl(target);
            if (bgUrl) {
              target.removeAttribute('data-fs-status');
              target.removeAttribute('data-fs-overlay');
              InspectionQueue.enqueue(target);
            }
          }

          if (mutation.attributeName === 'data-fs-status') {
            const currentStatus = target.dataset.fsStatus;
            const src = target.tagName === 'IMG' ? (target.currentSrc || target.src) : getBackgroundImageUrl(target);
            if (!currentStatus && src && sessionCache.has(src)) {
              const cached = sessionCache.get(src);
              if (cached === 'BLOCK') {
                applyPermanentBlur(target);
              } else if (cached === 'ALLOW') {
                removePendingBlur(target);
              }
            }
          }
        }
      });
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['src', 'srcset', 'style', 'data-fs-status']
    });
  }

  return { init };
})();
