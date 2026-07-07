/**
 * درع الفطرة (FitraShield) — العقل المدبر (Background Service Worker)
 * الإصدار: V1.0 التأسيسي
 * يعمل محلياً بنسبة 100% لحماية خصوصية العائلة ومنع الالتفاف.
 * 
 * الركائز الثلاث للحجب:
 * 1. قاعدة البيانات المدمجة (rules.json) — DeclarativeNetRequest
 * 2. محرك الكلمات المفتاحية — فحص URL + Title
 * 3. التحديث الصامت المجتمعي — سحب دوري من GitHub
 */

// ═══════════════════════════════════════════════════════════════
// رابط التحديث الصامت من مستودع GitHub المجتمعي
// ═══════════════════════════════════════════════════════════════
const REMOTE_UPDATE_URL = "https://raw.githubusercontent.com/ahmadibrahim4geo/FitraShield/main/blocklist.json";

// ═══════════════════════════════════════════════════════════════
// قائمة كلمات احتياطية (تُستخدم فقط إذا فشل تحميل keywords.json)
// ═══════════════════════════════════════════════════════════════
const FALLBACK_KEYWORDS = [
  "porn", "sex", "xxx", "adult", "nude", "hentai", "erotic",
  "سكس", "جنس", "اباحي", "إباحي", "فاحشة", "بورن", "شذوذ"
];

// متغير عام لتخزين الكلمات المحملة
let loadedKeywords = [];

// ═══════════════════════════════════════════════════════════════
// نظام تسجيل أخطاء التطوير لحظياً لمراقبة عمل الإضافة
// ═══════════════════════════════════════════════════════════════
function debugLog(msg) {
  chrome.storage.local.get(["debugLog"], (result) => {
    let logs = result.debugLog || [];
    logs.push(`[${new Date().toLocaleTimeString("ar-EG")}] ${msg}`);
    if (logs.length > 150) logs.shift();
    chrome.storage.local.set({ debugLog: logs });
  });
}


// ═══════════════════════════════════════════════════════════════
// 1. تهيئة التخزين وتحميل الكلمات عند تثبيت الأداة
// ═══════════════════════════════════════════════════════════════
chrome.runtime.onInstalled.addListener(() => {
  // تهيئة التخزين المحلي بالقيم الافتراضية
  chrome.storage.local.get([
    "masterPassword", "blockedKeywords", "customCategories",
    "exceptionsList", "activityLog", "exceptionRequests",
    "safesearchEnabled", "shieldActive"
  ], (result) => {
    const defaults = {
      blockedKeywords: result.blockedKeywords || [],
      customCategories: result.customCategories || [],
      exceptionsList: result.exceptionsList || [],
      activityLog: result.activityLog || [],
      exceptionRequests: result.exceptionRequests || [],
      safesearchEnabled: result.safesearchEnabled !== undefined ? result.safesearchEnabled : true,
      shieldActive: result.shieldActive !== undefined ? result.shieldActive : true,
      masterPassword: result.masterPassword || "",
      lastActive: Date.now()
    };

    chrome.storage.local.set(defaults, () => {
      console.log("✅ تمت تهيئة إعدادات درع الفطرة بنجاح.");
    });
  });

  // إنشاء منبه Keep-Alive لمنع المتصفح من إدخال الخدمة في وضع النوم (كل 25 ثانية)
  chrome.alarms.create("fitraKeepAlive", { periodInMinutes: 0.4 });

  // إنشاء منبه التحديثات الصامتة الدورية (كل 24 ساعة)
  chrome.alarms.create("silentUpdateAlarm", { periodInMinutes: 1440.0 });

  // تشغيل التحديث لأول مرة فور تثبيت الإضافة
  updateBlocklistFromServer();

  // تفعيل فرض البحث الآمن بأقصى درجة فوراً كإجراء احترازي
  chrome.declarativeNetRequest.updateEnabledRulesets({
    enableRulesetIds: ["ruleset_safesearch"]
  }, () => {
    console.log("🔒 تم تفعيل فرض البحث الآمن (SafeSearch) قسرياً فور التثبيت.");
  });

  // ضبط الأيقونة الأولية
  updateIcon("active");
});

// ═══════════════════════════════════════════════════════════════
// 2. تحميل الكلمات المفتاحية من ملف keywords.json
// ═══════════════════════════════════════════════════════════════
async function loadKeywordsFromFile() {
  try {
    const url = chrome.runtime.getURL("keywords.json");
    const response = await fetch(url);
    const data = await response.json();

    // دمج كل الفئات في مصفوفة واحدة مسطحة
    loadedKeywords = [];
    for (const category in data) {
      if (Array.isArray(data[category])) {
        loadedKeywords.push(...data[category]);
      }
    }

    // إزالة التكرارات
    loadedKeywords = [...new Set(loadedKeywords)];
    // حفظ في التخزين المحلي لضمان بقائها عند إغلاق/إعادة تشغيل Service Worker
    await chrome.storage.local.set({ systemKeywords: loadedKeywords });
    console.log(`✅ تم تحميل ${loadedKeywords.length} كلمة مفتاحية وحفظها في التخزين.`);
  } catch (error) {
    console.warn("⚠ فشل تحميل keywords.json، يتم استخدام القائمة الاحتياطية:", error.message);
    loadedKeywords = FALLBACK_KEYWORDS;
    await chrome.storage.local.set({ systemKeywords: FALLBACK_KEYWORDS });
  }
}

// ═══════════════════════════════════════════════════════════════
// 3. دالة تطهير وتوحيد النصوص العربية (لمنع التحايل بالتشكيل)
// ═══════════════════════════════════════════════════════════════
function normalizeArabic(text) {
  if (!text) return "";
  return text
    .toLowerCase()
    .replace(/[\u064B-\u0652]/g, "")  // إزالة التشكيل
    .replace(/[أإآ]/g, "ا")           // توحيد الألفات
    .replace(/ى/g, "ي")               // توحيد الياء المقصورة
    .replace(/ة/g, "ه")               // توحيد التاء المربوطة
    .replace(/\s+/g, " ")             // توحيد المسافات
    .trim();
}

// ═══════════════════════════════════════════════════════════════
// 4. استخراج الدومين الأساسي من أي رابط
// ═══════════════════════════════════════════════════════════════
function extractDomain(url) {
  try {
    const urlObj = new URL(url);
    let domain = urlObj.hostname.toLowerCase();
    if (domain.startsWith("www.")) domain = domain.substring(4);
    return domain;
  } catch {
    return "";
  }
}

// ═══════════════════════════════════════════════════════════════
// 5. منبهات العمليات الدورية (Alarms)
// ═══════════════════════════════════════════════════════════════
chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === "fitraKeepAlive") {
    // تنشيط الـ Service Worker
    chrome.storage.local.set({ lastActive: Date.now() });
  } else if (alarm.name === "silentUpdateAlarm") {
    console.log("🔄 بدء التحديث الصامت لقائمة الحجب...");
    updateBlocklistFromServer();
  } else if (alarm.name === "resetIconToActive") {
    // إعادة الأيقونة للحالة النشطة بعد وميض الحجب
    updateIcon("active");
  }
});

// ═══════════════════════════════════════════════════════════════
// 6. التحديث الصامت المجتمعي من GitHub
// ═══════════════════════════════════════════════════════════════
function updateBlocklistFromServer() {
  fetch(REMOTE_UPDATE_URL)
    .then(response => {
      if (!response.ok) throw new Error("HTTP " + response.status);
      return response.json();
    })
    .then(domains => {
      if (Array.isArray(domains)) {
        applyDynamicBlockingRules(domains);
      } else {
        console.error("⚠ بنية ملف التحديث غير صالحة.");
      }
    })
    .catch(error => {
      console.warn("⚠ تعذر جلب التحديث الصامت:", error.message);
    });
}

// ═══════════════════════════════════════════════════════════════
// 7. تطبيق قواعد الحجب الديناميكية في المتصفح
// ═══════════════════════════════════════════════════════════════
function applyDynamicBlockingRules(domains) {
  chrome.declarativeNetRequest.getDynamicRules((existingRules) => {
    const removeRuleIds = existingRules.map(r => r.id);
    const addRules = [];
    let ruleId = 10000;

    // حد أقصى 20,000 نطاق لسلامة المتصفح
    const safeDomains = domains.slice(0, 20000);

    for (const domain of safeDomains) {
      if (domain && domain.trim()) {
        const cleanDomain = domain.trim().toLowerCase();
        addRules.push({
          id: ruleId++,
          priority: 1,
          action: { type: "block" },
          condition: {
            requestDomains: [cleanDomain],
            resourceTypes: ["main_frame", "sub_frame"]
          }
        });
      }
    }

    chrome.declarativeNetRequest.updateDynamicRules({
      removeRuleIds: removeRuleIds,
      addRules: addRules
    }, () => {
      if (chrome.runtime.lastError) {
        console.error("❌ فشل شحن القواعد الديناميكية:", chrome.runtime.lastError.message);
      } else {
        console.log(`✅ تم شحن ${addRules.length} قاعدة حجب ديناميكية.`);
      }
    });
  });
}

// ═══════════════════════════════════════════════════════════════
// 8. محرك فحص التبويبات والروابط النشطة (الركيزة الثانية)
// ═══════════════════════════════════════════════════════════════

// فحص عند تحديث التبويب
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  const targetUrl = changeInfo.url || tab.url;
  if ((changeInfo.status === "loading" || changeInfo.url || changeInfo.title) && targetUrl) {
    checkAndBlockTab(tabId, targetUrl, changeInfo.title || tab.title || "");
  }
});

// فحص عند التنقل (webNavigation) كطبقة إضافية
chrome.webNavigation.onBeforeNavigate.addListener((details) => {
  if (details.frameId === 0 && details.url) {
    checkAndBlockTab(details.tabId, details.url, "");
  }
});

// ═══════════════════════════════════════════════════════════════
// 9. دالة التحقق والحجب المركزية
// ═══════════════════════════════════════════════════════════════
const recentChecks = new Map();

function checkAndBlockTab(tabId, url, title) {
  // تجاهل الروابط الداخلية للمتصفح والإضافة
  if (!url || 
      url.startsWith("chrome-extension://") || 
      url.startsWith("chrome://") ||
      url.startsWith("about:") ||
      url.startsWith("edge://") ||
      url.startsWith("brave://")) {
    return;
  }
  
  // تحقق من الذاكرة المؤقتة لمنع الفحص المزدوج لنفس التبويب والرابط
  const cacheKey = `${tabId}:${url}`;
  const now = Date.now();
  if (recentChecks.has(cacheKey)) {
    const lastCheck = recentChecks.get(cacheKey);
    if (now - lastCheck.time < 1500) {
      if (!title || lastCheck.hasTitle) {
        return;
      }
    }
  }
  recentChecks.set(cacheKey, { time: now, hasTitle: !!title });

  // تنظيف الذاكرة المؤقتة القديمة
  if (recentChecks.size > 100) {
    for (const [key, value] of recentChecks.entries()) {
      if (now - value.time > 5000) {
        recentChecks.delete(key);
      }
    }
  }

  debugLog(`جاري فحص الرابط: ${url}`);

  chrome.storage.local.get([
    "systemKeywords", "blockedKeywords", "customCategories", "exceptionsList", "shieldActive"
  ], (data) => {
    // إذا كان الدرع متوقفاً (بكلمة مرور)، لا يتم الفحص
    if (data.shieldActive === false) {
      debugLog("تم تخطي الفحص لأن الدرع معطل (shieldActive = false)");
      return;
    }

    let keywords = data.systemKeywords && data.systemKeywords.length > 0 ? data.systemKeywords : loadedKeywords;
    if (!keywords || keywords.length === 0) {
      keywords = FALLBACK_KEYWORDS;
    }
    if (data.blockedKeywords && data.blockedKeywords.length > 0) {
      keywords = [...new Set([...keywords, ...data.blockedKeywords])];
    }
    const categories = data.customCategories || [];
    const exceptions = data.exceptionsList || [];
    debugLog(`حالة الحماية: نشطة | الكلمات المفحوصة: ${keywords.length} | الاستثناءات: ${exceptions.length}`);

    const domain = extractDomain(url);
    
    let decodedUrl = url;
    try {
      decodedUrl = decodeURIComponent(url);
    } catch (e) {
      // استخدام الرابط الخام إذا فشل التشفير
    }
    const normUrl = normalizeArabic(decodedUrl);
    const normTitle = normalizeArabic(title);

    // ─── أ. فحص قائمة الاستثناءات أولاً ───
    for (const exDomain of exceptions) {
      if (exDomain && domain.includes(exDomain.toLowerCase().trim())) {
        return; // الموقع في قائمة الاستثناءات — لا يُحجب
      }
    }

    // ─── ب. فحص القوائم المخصصة المبوّبة ───
    for (const category of categories) {
      if (!category.enabled) continue; // القائمة معطلة
      for (const site of category.sites) {
        if (site && normUrl.includes(normalizeArabic(site))) {
          debugLog(`🔥 تطابق فئة مخصصة: "${category.name}" للموقع: "${site}"! جاري الحجب.`);
          blockTab(tabId, url, `قائمة مخصصة: ${category.name}`, site);
          return;
        }
      }
    }

    // ─── ج. فحص الكلمات المفتاحية المحظورة ───
    for (const word of keywords) {
      if (word) {
        const normWord = normalizeArabic(word);
        if (normWord.length < 2) continue; // تجاهل الكلمات القصيرة جداً

        if (normUrl.includes(normWord) || normTitle.includes(normWord)) {
          debugLog(`🔥 تطابق كلمة مفتاحية: "${word}" في الرابط! جاري الحجب.`);
          blockTab(tabId, url, "كلمة مفتاحية", word);

          // إضافة الدومين تلقائياً للقواعد الديناميكية لمنع الدخول مرة أخرى
          if (domain) {
            addDomainToDynamicRules(domain);
          }
          return;
        }
      }
    }
  });
}

// ═══════════════════════════════════════════════════════════════
// 10. إضافة دومين جديد للقواعد الديناميكية تلقائياً
// ═══════════════════════════════════════════════════════════════
function addDomainToDynamicRules(domain) {
  chrome.declarativeNetRequest.getDynamicRules((existingRules) => {
    // التحقق من عدم وجود قاعدة مكررة لهذا الدومين
    const alreadyExists = existingRules.some(rule => {
      return rule.condition && 
             rule.condition.requestDomains && 
             rule.condition.requestDomains.includes(domain);
    });

    if (alreadyExists) return;

    // توليد معرف فريد للقاعدة الجديدة
    const maxId = existingRules.length > 0 
      ? Math.max(...existingRules.map(r => r.id)) 
      : 9999;

    chrome.declarativeNetRequest.updateDynamicRules({
      addRules: [{
        id: maxId + 1,
        priority: 1,
        action: { type: "block" },
        condition: {
          requestDomains: [domain],
          resourceTypes: ["main_frame", "sub_frame"]
        }
      }]
    }, () => {
      if (!chrome.runtime.lastError) {
        console.log(`🛡 تم إضافة ${domain} تلقائياً للحجب الديناميكي.`);
      }
    });
  });
}

// ═══════════════════════════════════════════════════════════════
// 11. دالة توجيه التبويب لصفحة الحظر وتسجيل المحاولة
// ═══════════════════════════════════════════════════════════════
function blockTab(tabId, originalUrl, reason, keyword = "") {
  const blockedPageUrl = chrome.runtime.getURL("blocked.html") +
    `?url=${encodeURIComponent(originalUrl)}` +
    `&reason=${encodeURIComponent(reason)}` +
    `&keyword=${encodeURIComponent(keyword)}`;

  chrome.tabs.update(tabId, { url: blockedPageUrl }, () => {
    // تسجيل المحاولة في السجل المحلي
    logBlockedAttempt(originalUrl, reason, keyword);

    // تغيير الأيقونة للأحمر لمدة ثانيتين ثم العودة للأخضر
    updateIcon("blocked");
    chrome.alarms.create("resetIconToActive", { delayInMinutes: 0.033 }); // ~2 ثانية
  });
}

// ═══════════════════════════════════════════════════════════════
// 12. نظام تسجيل المحاولات المحلي المتقدم
// ═══════════════════════════════════════════════════════════════
function logBlockedAttempt(url, reason, keyword = "") {
  const timestamp = new Date().toLocaleString("ar-EG", {
    timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit"
  });

  const logEntry = {
    url: url,
    reason: reason,
    keyword: keyword,
    action: "حجب وتحويل",
    timestamp: timestamp,
    timeObject: new Date().toISOString(),
    shieldStatus: "نشط"
  };

  chrome.storage.local.get(["activityLog"], (result) => {
    let logs = result.activityLog || [];

    // منع تكرار التسجيل لنفس الموقع خلال 5 ثوانٍ
    if (logs.length > 0) {
      const lastLog = logs[logs.length - 1];
      const timeDiff = new Date() - new Date(lastLog.timeObject);
      if (lastLog.url === url && timeDiff < 5000) {
        return;
      }
    }

    logs.push(logEntry);

    // حد أقصى 1000 سجل
    if (logs.length > 1000) {
      logs.shift();
    }

    chrome.storage.local.set({ activityLog: logs }, () => {
      // إرسال السجل للمساعد المحلي على مستوى نظام التشغيل
      sendToNativeHelper(logEntry);
    });
  });
}

// ═══════════════════════════════════════════════════════════════
// 13. إرسال البيانات للمساعد المحلي (Native Messaging)
// ═══════════════════════════════════════════════════════════════
function sendToNativeHelper(logEntry) {
  try {
    chrome.runtime.sendNativeMessage(
      "com.fitrashield.helper",
      {
        url: logEntry.url,
        reason: logEntry.reason,
        keyword: logEntry.keyword,
        action: logEntry.action,
        timestamp: logEntry.timestamp,
        shieldStatus: logEntry.shieldStatus
      },
      (response) => {
        if (chrome.runtime.lastError) {
          // المساعد غير مُثبّت — سلوك عادي للمستخدمين الذين لم يشغلوا أداة التثبيت
          console.warn("⚠ المساعد المحلي غير متصل:", chrome.runtime.lastError.message);
        } else {
          console.log("✅ رد المساعد المحلي:", response);
        }
      }
    );
  } catch (e) {
    // تجاهل الأخطاء بصمت في حالة عدم توفر Native Messaging
  }
}

// ═══════════════════════════════════════════════════════════════
// 14. نظام إدارة حالات الأيقونة (3 حالات)
// ═══════════════════════════════════════════════════════════════
function updateIcon(state) {
  const iconPaths = {
    active: {
      "16": "icons/shield-active-16.png",
      "48": "icons/shield-active-48.png",
      "128": "icons/shield-active-128.png"
    },
    blocked: {
      "16": "icons/shield-blocked-16.png",
      "48": "icons/shield-blocked-48.png",
      "128": "icons/shield-blocked-128.png"
    },
    paused: {
      "16": "icons/shield-paused-16.png",
      "48": "icons/shield-paused-48.png",
      "128": "icons/shield-paused-128.png"
    }
  };

  const titles = {
    active: "درع الفطرة — نشط ومحمي ✅",
    blocked: "درع الفطرة — تم رصد وصد محاولة! 🛡",
    paused: "درع الفطرة — متوقف مؤقتاً ⚠"
  };

  const icons = iconPaths[state] || iconPaths.active;
  const title = titles[state] || titles.active;

  chrome.action.setIcon({ path: icons });
  chrome.action.setTitle({ title: title });
}

// ═══════════════════════════════════════════════════════════════
// 15. الاستماع لتغييرات التخزين (تحديث الحالة فوراً)
// ═══════════════════════════════════════════════════════════════
chrome.storage.onChanged.addListener((changes, areaName) => {
  if (areaName !== "local") return;

  // إذا تغيرت حالة الدرع
  if (changes.shieldActive) {
    if (changes.shieldActive.newValue === false) {
      updateIcon("paused");
    } else {
      updateIcon("active");
    }
  }

  // إذا تغيرت الكلمات المفتاحية
  if (changes.blockedKeywords) {
    loadedKeywords = changes.blockedKeywords.newValue || FALLBACK_KEYWORDS;
  }
});

// ═══════════════════════════════════════════════════════════════
// 16. إعادة تحميل الكلمات عند بدء تشغيل الـ Service Worker
// ═══════════════════════════════════════════════════════════════
(async () => {
  await loadKeywordsFromFile();
  // التأكد من أن الأيقونة والحماية في الحالة الصحيحة عند الإقلاع
  chrome.storage.local.get(["shieldActive", "safesearchEnabled"], (result) => {
    if (result.shieldActive === false) {
      updateIcon("paused");
    } else {
      updateIcon("active");
    }

    const isSafe = result.safesearchEnabled !== undefined ? result.safesearchEnabled : true;
    chrome.declarativeNetRequest.updateEnabledRulesets({
      enableRulesetIds: isSafe ? ["ruleset_safesearch"] : [],
      disableRulesetIds: isSafe ? [] : ["ruleset_safesearch"]
    }, () => {
      console.log("🔒 تم مزامنة حالة البحث الآمن (SafeSearch) بنجاح عند البدء.");
    });
  });
})();

// ═══════════════════════════════════════════════════════════════
// 17. استقبال الرسائل من صفحات الإضافة (طلب استثناء، إلخ)
// ═══════════════════════════════════════════════════════════════
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "requestException") {
    chrome.storage.local.get(["exceptionRequests"], (result) => {
      let requests = result.exceptionRequests || [];
      const exists = requests.some(r => r.url === message.url);
      if (!exists) {
        requests.push({
          url: message.url,
          timestamp: new Date().toISOString()
        });
        chrome.storage.local.set({ exceptionRequests: requests }, () => {
          sendResponse({ success: true });
        });
      } else {
        sendResponse({ success: true });
      }
    });
    return true; // Keep channel open for async response
  }
});

