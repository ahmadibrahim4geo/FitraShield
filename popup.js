/**
 * درع الفطرة (FitraShield) - منطق النافذة المنبثقة (popup.js)
 * يدير بوابة الدخول السريع، حجب الموقع الحالي فوراً، وعرض الإحصائيات.
 * يعمل محلياً بالكامل بدون أي اتصال خارجي.
 */

// ===== دالة تشفير SHA-256 مع الملح (Salt) (متطابقة مع options.js) =====
async function hashPassword(password, salt = "") {
  if (!password) return "";
  const combined = salt ? (salt + ":" + password) : password;
  const msgBuffer = new TextEncoder().encode(combined);
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

// ===== دالة استخلاص الدومين من الرابط =====
function extractDomain(url) {
  try {
    // استخدام URL API لاستخراج الدومين بدقة
    const urlObj = new URL(url);
    let hostname = urlObj.hostname;
    // إزالة www. لتوحيد النتائج
    if (hostname.startsWith("www.")) {
      hostname = hostname.substring(4);
    }
    return hostname.toLowerCase();
  } catch (e) {
    // في حال فشل التحليل نحاول التنظيف اليدوي
    let domain = url.trim();
    if (domain.startsWith("http://")) domain = domain.substring(7);
    else if (domain.startsWith("https://")) domain = domain.substring(8);
    if (domain.startsWith("www.")) domain = domain.substring(4);
    domain = domain.split('/')[0].split('?')[0].split(':')[0];
    return domain.toLowerCase().trim();
  }
}

// ===== دالة عرض رسالة التنبيه المنبثقة (Toast) =====
function showToast(message, type = "success") {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  // إزالة الحالات السابقة
  toast.classList.remove("show", "success", "error");
  // تعيين النوع الجديد
  toast.classList.add(type);
  // إظهار الرسالة بتأثير حركي
  requestAnimationFrame(() => {
    toast.classList.add("show");
  });
  // إخفاء الرسالة بعد 2.5 ثانية
  setTimeout(() => {
    toast.classList.remove("show");
  }, 2500);
}

// ===== عند تحميل الصفحة =====
document.addEventListener("DOMContentLoaded", () => {

  // ===== مراجع عناصر الواجهة =====
  const screenSetup = document.getElementById("screen-setup");
  const screenLogin = document.getElementById("screen-login");
  const screenMain = document.getElementById("screen-main");
  const inputPassword = document.getElementById("input-password");
  const loginError = document.getElementById("login-error");
  const btnLogin = document.getElementById("btn-login");
  const btnOpenSetup = document.getElementById("btn-open-setup");
  const btnBlockCurrent = document.getElementById("btn-block-current");
  const btnOpenDashboard = document.getElementById("btn-open-dashboard");
  const btnLock = document.getElementById("btn-lock");
  const statsTodayCount = document.getElementById("stats-today-count");

  // ===== ضبط لغة البوب أب بناءً على إعدادات لوحة التحكم =====
  const currentLang = localStorage.getItem("fitraShieldLang") || "ar";
  if (currentLang === "en") {
    document.body.dir = "ltr";
    document.body.style.direction = "ltr";
    document.body.style.fontFamily = "'Outfit', sans-serif";
    
    const titleEl = document.querySelector(".popup-title");
    if (titleEl) titleEl.textContent = "FitraShield";
    
    const subtitleEl = document.querySelector(".popup-subtitle");
    if (subtitleEl) subtitleEl.textContent = "Local Parental Protection";
    
    const aboutDevEl = document.getElementById("popup-about-dev");
    if (aboutDevEl) aboutDevEl.textContent = "Developer: Ahmad Ibrahim";
    
    const setupMsgEl = document.querySelector(".setup-msg");
    if (setupMsgEl) {
      const setupStrong = setupMsgEl.querySelector("strong");
      if (setupStrong) setupStrong.textContent = "⚙️ Initial Setup Required";
      for (let node of setupMsgEl.childNodes) {
        if (node.nodeType === Node.TEXT_NODE && node.textContent.includes("لم يتم")) {
          node.textContent = " No master password set yet. Please open the dashboard to set up protection and set a strong parent password. ";
        }
      }
    }
    
    if (btnOpenSetup) btnOpenSetup.textContent = "Open Dashboard to Setup ⚙️";
    
    const loginTitleEl = document.querySelector(".login-title");
    if (loginTitleEl) loginTitleEl.textContent = "🔒 Enter Master Password";
    
    if (inputPassword) inputPassword.placeholder = "Password";
    
    if (btnLogin) {
      btnLogin.innerHTML = '<span class="btn-icon">🔓</span> Log In';
    }
    
    const statusTextEl = document.querySelector(".status-text");
    if (statusTextEl) statusTextEl.textContent = "Shield Active & Protected";
    
    const statusSubEl = document.querySelector(".status-sub");
    if (statusSubEl) statusSubEl.textContent = "All protection systems active";
    
    if (btnBlockCurrent) {
      btnBlockCurrent.innerHTML = '<span class="btn-icon">🚫</span> Block Current Site Now';
    }
    
    if (btnOpenDashboard) {
      btnOpenDashboard.innerHTML = '<span class="btn-icon">⚙️</span> Open Dashboard';
    }
    
    if (btnLock) {
      btnLock.innerHTML = '<span class="btn-icon">🔒</span> Log Out';
    }
    
    const statsLabelEl = document.querySelector(".stats-label");
    if (statsLabelEl) statsLabelEl.textContent = "Attempts Blocked Today:";
  }

  // ===== دالة مساعدة لإظهار شاشة معينة وإخفاء الباقي =====
  function showScreen(screen) {
    screenSetup.classList.remove("active");
    screenLogin.classList.remove("active");
    screenMain.classList.remove("active");
    screen.classList.add("active");
  }

  // ===== 1. فحص حالة كلمة المرور وجلسة الدخول النشطة عند التحميل =====
  chrome.storage.local.get(["masterPassword", "dashboardLoggedIn", "loginTime"], (result) => {
    const now = Date.now();
    const sessionDuration = 30 * 60 * 1000; // 30 دقيقة
    const isSessionValid = result.dashboardLoggedIn === true && 
                           result.loginTime && 
                           (now - result.loginTime < sessionDuration);

    if (!result.masterPassword) {
      // لم يتم تعيين كلمة مرور بعد -> عرض رسالة الإعداد
      showScreen(screenSetup);
    } else if (isSessionValid) {
      // الأب مسجل دخوله بالفعل وفاتح لوحة التحكم -> تخطي تسجيل الدخول وعرض الشاشة الرئيسية وتجديد الجلسة
      chrome.storage.local.set({ loginTime: now });
      showScreen(screenMain);
      loadTodayStats();
    } else {
      // جلسة منتهية أو لم يسجل دخوله -> عرض بوابة الدخول
      chrome.storage.local.set({ dashboardLoggedIn: false, loginTime: 0 });
      showScreen(screenLogin);
      // تركيز حقل الإدخال تلقائياً
      setTimeout(() => inputPassword.focus(), 150);
    }
  });

  // ===== 2. زر فتح لوحة التحكم من شاشة الإعداد =====
  btnOpenSetup.addEventListener("click", () => {
    chrome.runtime.openOptionsPage();
  });

  // ===== 3. منطق تسجيل الدخول =====
  btnLogin.addEventListener("click", async () => {
    const enteredPassword = inputPassword.value;

    // التحقق من إدخال كلمة المرور
    if (!enteredPassword) {
      loginError.textContent = currentLang === "en" ? "Please enter the password." : "يرجى إدخال كلمة المرور.";
      inputPassword.focus();
      return;
    }

    // تعطيل الزر أثناء المعالجة
    btnLogin.disabled = true;
    loginError.textContent = "";

    chrome.storage.local.get(["masterPassword", "passwordSalt"], async (result) => {
      try {
        const salt = result.passwordSalt || "";
        // تشفير كلمة المرور المُدخلة بالملح ومقارنتها بالمخزنة
        const hashedEntered = await hashPassword(enteredPassword, salt);

        if (result.masterPassword === hashedEntered) {
          // كلمة المرور صحيحة -> فتح اللوحة الرئيسية
          loginError.textContent = "";
          inputPassword.value = "";
          chrome.storage.local.set({ dashboardLoggedIn: true, loginTime: Date.now() }, () => {
            showScreen(screenMain);
            loadTodayStats();
            showToast(currentLang === "en" ? "Logged in successfully" : "تم تسجيل الدخول بنجاح", "success");
          });
        } else {
          // كلمة المرور خاطئة
          loginError.textContent = currentLang === "en" ? "Incorrect password. Try again." : "كلمة المرور خاطئة. حاول مجدداً.";
          inputPassword.value = "";
          inputPassword.focus();
          btnLogin.disabled = false;
        }
      } catch (err) {
        console.error("خطأ أثناء تسجيل الدخول:", err);
        loginError.textContent = currentLang === "en" ? "An unexpected error occurred. Please try again." : "حدث خطأ غير متوقع. يرجى المحاولة مرة أخرى.";
        btnLogin.disabled = false;
      }
    });
  });

  // السماح بالضغط على Enter لتسجيل الدخول
  inputPassword.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      btnLogin.click();
    }
  });

  // ===== 4. زر حجب الموقع الحالي فوراً =====
  btnBlockCurrent.addEventListener("click", () => {
    // تعطيل الزر لمنع الضغط المتكرر
    btnBlockCurrent.disabled = true;

    // الحصول على التبويب النشط حالياً
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (!tabs || tabs.length === 0) {
        showToast(currentLang === "en" ? "Cannot access current tab" : "تعذر الوصول للتبويب الحالي", "error");
        btnBlockCurrent.disabled = false;
        return;
      }

      const currentTab = tabs[0];
      const tabUrl = currentTab.url;

      // التحقق من أن الرابط صالح للحجب (ليس صفحة داخلية في المتصفح)
      if (!tabUrl ||
          tabUrl.startsWith("chrome://") ||
          tabUrl.startsWith("chrome-extension://") ||
          tabUrl.startsWith("about:") ||
          tabUrl.startsWith("edge://") ||
          tabUrl === "about:blank") {
        showToast(currentLang === "en" ? "Cannot block internal browser pages" : "لا يمكن حجب صفحات المتصفح الداخلية", "error");
        btnBlockCurrent.disabled = false;
        return;
      }

      // استخراج الدومين من الرابط الحالي
      const domain = extractDomain(tabUrl);

      if (!domain) {
        showToast(currentLang === "en" ? "Failed to extract website domain" : "تعذر استخراج نطاق الموقع", "error");
        btnBlockCurrent.disabled = false;
        return;
      }

      // إضافة الدومين لقائمة الحجب السريع في customCategories
      chrome.storage.local.get(["customCategories"], (result) => {
        let categories = result.customCategories || [];

        // البحث عن فئة "حجب سريع" أو إنشاؤها
        let quickBlockCategory = categories.find(cat => cat.id === "quick-block");

        if (!quickBlockCategory) {
          // إنشاء فئة حجب سريع جديدة
          quickBlockCategory = {
            id: "quick-block",
            name: "حجب سريع",
            sites: [],
            enabled: true
          };
          categories.push(quickBlockCategory);
        }

        // التحقق من عدم تكرار الدومين
        if (quickBlockCategory.sites.includes(domain)) {
          showToast(currentLang === "en" ? `Website ${domain} is already blocked` : `الموقع ${domain} محجوب بالفعل`, "error");
          btnBlockCurrent.disabled = false;
          return;
        }

        // إضافة الدومين للفئة
        quickBlockCategory.sites.push(domain);

        // حفظ التحديثات
        chrome.storage.local.set({
          customCategories: categories
        }, () => {
          showToast(currentLang === "en" ? `Blocked ${domain} successfully ✅` : `تم حجب ${domain} بنجاح ✅`, "success");
          btnBlockCurrent.disabled = false;
        });
      });
    });
  });

  // ===== 5. زر فتح لوحة التحكم =====
  btnOpenDashboard.addEventListener("click", () => {
    chrome.runtime.openOptionsPage();
  });

  // ===== 6. زر القفل (العودة لشاشة الدخول) =====
  btnLock.addEventListener("click", () => {
    // مسح حقل كلمة المرور ورسائل الخطأ
    inputPassword.value = "";
    loginError.textContent = "";
    btnLogin.disabled = false;

    // تعيين حالة تسجيل الدخول لـ false لمزامنة لوحة التحكم
    chrome.storage.local.set({ dashboardLoggedIn: false }, () => {
      // العودة لشاشة تسجيل الدخول
      showScreen(screenLogin);
      showToast(currentLang === "en" ? "Logged out successfully 🔒" : "تم تسجيل الخروج بنجاح 🔒", "success");
      setTimeout(() => inputPassword.focus(), 200);
    });
  });

  // ===== 7. تحميل إحصائيات اليوم (عدد المحاولات المحجوبة) =====
  function loadTodayStats() {
    chrome.storage.local.get(["activityLog"], (result) => {
      const logs = result.activityLog || [];

      if (logs.length === 0) {
        statsTodayCount.textContent = "0";
        return;
      }

      // حساب تاريخ اليوم الحالي
      const now = new Date();
      const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());

      // عد المحاولات التي حدثت اليوم باستخدام timeObject (ISO string)
      let todayCount = 0;
      for (let i = 0; i < logs.length; i++) {
        const log = logs[i];
        // استخدام timeObject إذا كان متوفراً، وإلا محاولة timestamp
        const logTime = log.timeObject ? new Date(log.timeObject) : null;
        if (logTime && logTime >= todayStart) {
          todayCount++;
        }
      }

      statsTodayCount.textContent = todayCount.toString();
    });
  }

  // الاستماع لتغييرات حالة تسجيل الدخول من لوحة التحكم لمزامنة البوب آب في الوقت الحقيقي
  chrome.storage.onChanged.addListener((changes, area) => {
    if (area === "local" && changes.dashboardLoggedIn) {
      if (changes.dashboardLoggedIn.newValue === true) {
        showScreen(screenMain);
        loadTodayStats();
      } else if (changes.dashboardLoggedIn.newValue === false) {
        inputPassword.value = "";
        loginError.textContent = "";
        btnLogin.disabled = false;
        showScreen(screenLogin);
      }
    }
  });
});
