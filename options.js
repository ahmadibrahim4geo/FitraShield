// ═══════════════════════════════════════════════════════════════
// قاموس الترجمات للغتين العربية والإنجليزية
// ═══════════════════════════════════════════════════════════════
const translations = {
  ar: {
    "#setup-screen .auth-title": "إعداد درع الفطرة لأول مرة",
    "#setup-screen .auth-desc": "قم بتعيين كلمة مرور رئيسية قوية لحماية إعدادات الإضافة وسجلات الحظر من عبث الأولاد. هذه الكلمة لن يتمكن أحد من رؤيتها.",
    "#setup-screen label[for=\"setup-password\"]": "كلمة المرور الرئيسية الجديدة:",
    "#setup-screen label[for=\"setup-password-confirm\"]": "تأكيد كلمة المرور:",
    "#setup-password": "••••••••",
    "#setup-password-confirm": "••••••••",
    "#btn-setup-save": "حفظ وتوليد مفتاح الاسترداد 🔐",
    
    "#recovery-screen .auth-title": "⚠️ احفظ مفتاح الاسترداد!",
    "#recovery-screen .auth-desc": "إذا نسيت كلمة المرور، فلن تستطيع الدخول إلا عبر هذا المفتاح. اكتبه في ورقة واحتفظ بها في مكان آمن بعيداً عن متناول الأطفال.",
    "#recovery-screen .recovery-box span:first-child": "مفتاح الاسترداد الرئيسي (Master Recovery Key):",
    "#btn-recovery-confirm": "لقد قمت بحفظ المفتاح، انقلني للوحة التحكم ✅",
    
    "#login-screen .auth-title": "بوابة حماية درع الفطرة",
    "#login-screen .auth-desc": "الرجاء إدخال كلمة المرور الرئيسية للوصول إلى لوحة الإشراف الأبوي وسجلات النشاط.",
    "#login-screen label[for=\"login-password\"]": "كلمة المرور:",
    "#login-password": "••••••••",
    "#btn-login": "تسجيل الدخول 🔓",
    "#link-forgot-pass": "نسيت كلمة المرور؟",
    
    "#forgot-screen .auth-title": "استرداد كلمة المرور",
    "#forgot-screen .auth-desc": "أدخل مفتاح الاسترداد الذي تم توليده عند الإعداد لأول مرة لإعادة تعيين كلمة المرور.",
    "#forgot-screen label[for=\"recovery-key-input\"]": "مفتاح الاسترداد:",
    "#recovery-key-input": "FS-XXXX-XXXX-XXXX-XXXX",
    "#forgot-screen label[for=\"new-password\"]": "كلمة المرور الجديدة:",
    "#forgot-screen label[for=\"new-password-confirm\"]": "تأكيد كلمة المرور الجديدة:",
    "#new-password": "••••••••",
    "#new-password-confirm": "••••••••",
    "#btn-submit-recovery": "التحقق من المفتاح 🔑",
    "#link-back-login": "العودة إلى شاشة الدخول",
    
    ".db-title-text h1": "لوحة تحكم الآباء | درع الفطرة",
    ".db-title-text p": "نظام إشراف أبوي محلي وآمن 100% — لا ترسل بياناتك لأي خادم",
    "#btn-lock": "تسجيل الخروج 🔒",
    
    "[data-tab=\"logs\"]": "📊 سجل المحاولات",
    "[data-tab=\"categories\"]": "🔒 القوائم المخصصة",
    "[data-tab=\"exceptions\"]": "✅ قائمة الاستثناءات",
    "[data-tab=\"settings\"]": "⚙ إعدادات الحماية",
    "[data-tab=\"dns\"]": "🌐 حصّن بيتك",
    "[data-tab=\"about\"]": "ℹ️ عن الأداة",
    "#about-title": "درع الفطرة | FitraShield",
    "#about-description": "إضافة ذكية ومحلية 100% تهدف إلى صيانة الفطرة السليمة وحماية العقول ونقاء القلوب من مخاطر المحتوى الإباحي والمواقع الضارة على شبكة الإنترنت، دون الحاجة للاتصال بخوادم خارجية لضمان السرعة والخصوصية المطلقة لعائلتك.",
    "#about-developer-label": "تطوير وتصميم:",
    "#about-developer-name": "أحمد إبراهيم",
    
    "[data-tab=\"help\"]": "❓ دليل الاستخدام",
    "#help-setup-title": "🚀 دليل البدء السريع والتحصين",
    "#help-setup-desc": "خطوات تأمين وحماية الجهاز لمنع الأطفال من الالتفاف على الأداة أو إزالتها:",
    "#help-setup-list li:nth-child(1)": "قم بتحميل وتشغيل ملف install.bat كمسؤول (Run as Admin).",
    "#help-setup-list li:nth-child(2)": "أدخل معرّف الإضافة (Extension ID) الخاص بهذه الأداة واضغط Enter.",
    "#help-setup-list li:nth-child(3)": "سيقوم المساعد تلقائياً بقفل وضع التصفح الخفي (Incognito) ومنع تعطيل أو حذف الأداة.",
    "#help-setup-list li:nth-child(4)": "تأكد من تشغيل ملف helper.bat في الخلفية لحفظ تقارير الزيارات المحجوبة.",
    "#help-states-title": "🟢 فهم حالات أيقونة الأداة",
    "#help-states-desc": "تتغير ألوان أيقونة درع الفطرة في شريط الأدوات بناءً على حالة الأمان الحالية:",
    "#help-state-active-label": "أخضر (نشط ومحمي):",
    "#help-state-active-desc": "الأداة تعمل بنجاح وجميع أنظمة الحجب وتطهير المحتوى فعالة.",
    "#help-state-blocked-label": "أحمر (رصد وصد):",
    "#help-state-blocked-desc": "وميض أحمر مؤقت عند محاولة الدخول لموقع إباحي، إشارة لحجب الموقع وحفظ التقرير.",
    "#help-state-paused-label": "رمادي (موقوف مؤقتاً):",
    "#help-state-paused-desc": "تم إيقاف تفعيل الحجب يدوياً بعد إدخال كلمة مرور الوالدين.",
    "#help-problems-title": "🛠️ حلول المشاكل الشائعة",
    "#help-problems-desc": "حلول سريعة لأكثر الصعوبات التي قد تواجهك أثناء الاستخدام:",
    "#help-prob-1-label": "المشكلة: السجلات والتقارير لا تظهر في لوحة التحكم.",
    "#help-prob-1-desc": "الحل: تأكد من تشغيل ملف helper.bat وأن برنامج بايثون مثبت على جهازك لتفعيل خدمات Native Messaging.",
    "#help-prob-2-label": "المشكلة: استطاع طفلي إيقاف الإضافة من صفحة الإعدادات.",
    "#help-prob-2-desc": "الحل: تأكد من تشغيل ملف install.bat بصلاحيات المسؤول لتفعيل سياسة التثبيت القسري على مستوى الويندوز.",
    "#help-faq-title": "❓ الأسئلة الشائعة (FAQ)",
    "#help-faq-desc": "إجابات سريعة ومختصرة حول أمان وخصوصية درع الفطرة:",
    "#help-faq-1-label": "هل تقوم الإضافة بإبطاء سرعة التصفح؟",
    "#help-faq-1-desc": "لا، تعمل الإضافة محلياً 100%، وتتم عمليات فحص الروابط والكلمات المفتاحية في أجزاء من الملي ثانية.",
    "#help-faq-2-label": "ماذا يحدث في حال نسيان كلمة مرور الوالدين؟",
    "#help-faq-2-desc": "يمكنك استخدام مفتاح الاسترداد الرئيسي الذي ظهر لك عند التثبيت لأول مرة، أو فتح ملف helper.py بصلاحيات المسؤول لإعادة تعيينها.",
    
    "#label-stats-shield-status": "حالة الحماية",
    "#label-stats-blocks-today": "محاولات حظر اليوم",
    "#label-stats-peak-hour": "ساعة الذروة اليوم",
    "#content-logs .section-title": "آخر الزيارات المحجوبة",
    "#content-logs .section-desc": "محاولات الأطفال التي تم رصدها وحجبها تلقائياً",
    "#btn-refresh-logs": "تحديث 🔄",
    "#btn-clear-logs": "مسح السجل 🗑️",
    "#logs-empty": "🛡️ لا توجد محاولات حظر مسجلة حتى الآن. عائلتك في أمان!",
    "#content-logs .requests-section .section-title": "طلبات الاستثناء الواردة",
    "#content-logs .requests-section .section-desc": "مواقع طلب الأطفال إضافتها للقائمة البيضاء من صفحة الحجب",
    "#requests-empty": "لا توجد طلبات استثناء حالياً.",
    
    "#content-categories .section-title": "القوائم المخصصة للحظر",
    "#content-categories .section-desc": "أنشئ فئات مخصصة (مثل: ألعاب، تشتيت، وسائل تواصل) وأضف المواقع تحت كل فئة",
    "#btn-add-category": "+ إضافة فئة",
    "#categories-empty": "📂 لم تقم بإنشاء أي فئة بعد. أضف فئة جديدة لتبدأ بتنظيم المواقع المحظورة.",
    
    "#content-exceptions .card-title": "القائمة البيضاء (المواقع المستثناة)",
    "#content-exceptions .card-desc": "هذه المواقع لن يتم حجبها أبداً حتى لو تطابقت مع كلمات مفتاحية محظورة. مفيدة للمواقع التعليمية أو الطبية التي تحتوي كلمات قد تُحجب خطأً.",
    "#btn-add-exception": "إضافة",
    "#exception-input": "example.com",
    "#exceptions-empty": "لم تقم بإضافة أي استثناءات بعد.",
    
    "#content-settings .card:nth-child(1) .card-title": "تغيير كلمة المرور",
    "#content-settings .card:nth-child(1) .card-desc": "يتطلب إدخال كلمة المرور الحالية أولاً للتحقق.",
    "#content-settings label[for=\"current-pass-input\"]": "كلمة المرور الحالية:",
    "#current-pass-input": "••••••••",
    "#content-settings label[for=\"new-pass-input\"]": "كلمة المرور الجديدة:",
    "#new-pass-input": "••••••••",
    "#content-settings label[for=\"new-pass-confirm-input\"]": "تأكيد الجديدة:",
    "#new-pass-confirm-input": "••••••••",
    "#btn-change-password": "تحديث كلمة المرور 🔄",
    
    "#content-settings .card:nth-child(2) .card-title": "خيارات الحماية",
    "#content-settings .card:nth-child(2) .card-desc": "تحكم في آليات الحماية الفعّالة على المتصفح.",
    "#content-settings .card:nth-child(2) .setting-row:nth-child(3) .setting-label": "فرض البحث الآمن (SafeSearch)",
    "#content-settings .card:nth-child(2) .setting-row:nth-child(3) .setting-desc": "يمنع ظهور نتائج بحث غير لائقة على Google وBing",
    "#content-settings .card:nth-child(2) .setting-row:nth-child(4) .setting-label": "بصمة مفتاح الاسترداد",
    "#content-settings .card:nth-child(2) .setting-row:nth-child(4) .setting-desc": "هاش التعريف المشفر لمفتاح الاسترداد",
    
    "#content-settings .card:nth-child(3) .card-title": "تصدير الإعدادات",
    "#content-settings .card:nth-child(3) .card-desc": "تصدير جميع إعداداتك (بدون كلمة المرور ومفتاح الاسترداد) لنقلها أو حفظها.",
    "#btn-export-settings": "تصدير إعدادات درع الفطرة (.json) 📤",
    
    "#content-settings .card:nth-child(4) .card-title": "استيراد قائمة مواقع",
    "#content-settings .card:nth-child(4) .card-desc": "ارفع ملف نصي (.txt) يحتوي على روابط مواقع (رابط في كل سطر) لإضافتها لفئة مخصصة.",
    "#content-settings label[for=\"import-file\"] strong": "📥 اختر ملف .txt للاستيراد",
    "#content-settings label[for=\"import-file\"] p": "سيتم تطهير الروابط وإضافتها تلقائياً لفئة \"مستورد\" مخصصة.",
    ".support-btn": "ادعمنا لحماية جيل 💚 — ساهم على GitHub",
    
    "#content-dns h3": "🏠 حماية شبكة الواي فاي والراوتر المنزلي",
    "#content-dns p": "لتأمين بيتك بالكامل وحماية الهواتف المحمولة والتابلت والشاشات الذكية دون الحاجة لتنزيل الإضافة على كل جهاز، ننصح بشدة بتغيير الـ DNS الخاص بالراوتر المنزلي إلى أحد خيارات الـ DNS العائلي النظيف.",
    "#content-dns .dns-card h4": "أقوى خيارات الـ DNS العائلي المجاني:",
    "#content-dns h4:nth-of-type(2)": "📋 خطوات ضبط DNS على الراوتر:",
    "#content-dns ol li:nth-child(1)": "افتح المتصفح واكتب عنوان صفحة إعدادات الراوتر (غالباً 192.168.1.1 أو 192.168.0.1).",
    "#content-dns ol li:nth-child(2)": "سجّل الدخول باستخدام بيانات المسؤول المكتوبة خلف الراوتر (Admin / Password).",
    "#content-dns ol li:nth-child(3)": "ابحث عن إعدادات WAN أو LAN أو DHCP Server.",
    "#content-dns ol li:nth-child(4)": "ابحث عن خانات Primary DNS و Secondary DNS.",
    "#content-dns ol li:nth-child(5)": "أدخل العناوين النظيفة (مثلاً 1.1.1.3 و 1.0.0.3).",
    "#content-dns ol li:nth-child(6)": "احفظ الإعدادات وأعد تشغيل الراوتر لتعميم الحماية على كل أجهزة البيت.",
    "#content-dns .alert-banner": "⚠️ ملاحظة تقنية: لا يتعارض DNS الراوتر النظيف مع عمل إضافة درع الفطرة على المتصفح؛ بل يعملان معاً كخطوط دفاعية متكاملة. الأول يحجب على مستوى إشارة الواي فاي لكل الأجهزة، والإضافة تحمي محلياً من التفاف الأطفال أو استخدام أدوات تخطي على المتصفح.",
    "[data-tab=\"blur\"]": "🖼️ التصفية البصرية",
    "[data-tab=\"cloud\"]": "☁️ التحكم السحابي"
  },
  en: {
    "#setup-screen .auth-title": "Setup FitraShield for the First Time",
    "#setup-screen .auth-desc": "Set a strong master password to protect extension settings and block logs from kids. No one else will be able to see this password.",
    "#setup-screen label[for=\"setup-password\"]": "New Master Password:",
    "#setup-screen label[for=\"setup-password-confirm\"]": "Confirm Password:",
    "#setup-password": "New Password",
    "#setup-password-confirm": "Confirm Password",
    "#btn-setup-save": "Save & Generate Recovery Key 🔐",
    
    "#recovery-screen .auth-title": "⚠️ Save Your Recovery Key!",
    "#recovery-screen .auth-desc": "If you forget your password, you can only log in using this key. Write it down and keep it in a safe place away from children.",
    "#recovery-screen .recovery-box span:first-child": "Master Recovery Key:",
    "#btn-recovery-confirm": "I have saved the key, take me to dashboard ✅",
    
    "#login-screen .auth-title": "FitraShield Protection Gate",
    "#login-screen .auth-desc": "Please enter the master password to access the parental supervision dashboard and logs.",
    "#login-screen label[for=\"login-password\"]": "Password:",
    "#login-password": "Password",
    "#btn-login": "Log In 🔓",
    "#link-forgot-pass": "Forgot Password?",
    
    "#forgot-screen .auth-title": "Recover Password",
    "#forgot-screen .auth-desc": "Enter the recovery key generated during the initial setup to reset your password.",
    "#forgot-screen label[for=\"recovery-key-input\"]": "Recovery Key:",
    "#recovery-key-input": "FS-XXXX-XXXX-XXXX-XXXX",
    "#forgot-screen label[for=\"new-password\"]": "New Password:",
    "#forgot-screen label[for=\"new-password-confirm\"]": "Confirm New Password:",
    "#new-password": "New Password",
    "#new-password-confirm": "Confirm Password",
    "#btn-submit-recovery": "Verify Key 🔑",
    "#link-back-login": "Back to Login",
    
    ".db-title-text h1": "Parental Dashboard | FitraShield",
    ".db-title-text p": "100% Local & Secure Parental Control — No data sent to any server",
    "#btn-lock": "Log Out 🔒",
    
    "[data-tab=\"logs\"]": "📊 Activity Log",
    "[data-tab=\"categories\"]": "🔒 Custom Lists",
    "[data-tab=\"exceptions\"]": "✅ Whitelist",
    "[data-tab=\"settings\"]": "⚙ Settings",
    "[data-tab=\"dns\"]": "🌐 Protect Home Wi-Fi",
    "[data-tab=\"about\"]": "ℹ️ About",
    "#about-title": "FitraShield",
    "#about-description": "A smart and 100% local browser extension designed to preserve natural purity (Fitra) and protect minds and hearts from adult online content and harmful websites, operating completely locally without remote servers for absolute family speed and privacy.",
    "#about-developer-label": "Developed & Designed by:",
    "#about-developer-name": "Ahmad Ibrahim",
    
    "[data-tab=\"help\"]": "❓ User Guide",
    "#help-setup-title": "🚀 Quick Start & Enforcer Guide",
    "#help-setup-desc": "Steps to secure and protect the device to prevent bypass or removal:",
    "#help-setup-list li:nth-child(1)": "Download and run the install.bat file as Administrator (Run as Admin).",
    "#help-setup-list li:nth-child(2)": "Enter the Extension ID of this tool and press Enter.",
    "#help-setup-list li:nth-child(3)": "The enforcer will automatically lock Incognito mode and block disabling or removing the extension.",
    "#help-setup-list li:nth-child(4)": "Make sure helper.bat is running in the background to save blocked visit logs.",
    "#help-states-title": "🟢 Understanding Icon States",
    "#help-states-desc": "The FitraShield toolbar icon changes color depending on current protection status:",
    "#help-state-active-label": "Green (Active & Protected):",
    "#help-state-active-desc": "The extension is working successfully and all blocking and cleansing engines are active.",
    "#help-state-blocked-label": "Red (Alert & Blocked):",
    "#help-state-blocked-desc": "A temporary red flash on attempt, indicating blocking of the site and logging.",
    "#help-state-paused-label": "Gray (Temporarily Paused):",
    "#help-state-paused-desc": "Protection is manually paused after entering the parent password.",
    "#help-problems-title": "🛠️ Troubleshooting Guide",
    "#help-problems-desc": "Quick solutions to common issues you might encounter:",
    "#help-prob-1-label": "Problem: Blocked logs do not appear in the dashboard.",
    "#help-prob-1-desc": "Solution: Make sure helper.bat is running and Python is installed on your computer to enable Native Messaging.",
    "#help-prob-2-label": "Problem: My child managed to disable the extension from the settings page.",
    "#help-prob-2-desc": "Solution: Make sure you ran install.bat as Administrator to apply the force-install policy at the OS level.",
    "#help-faq-title": "❓ Frequently Asked Questions (FAQ)",
    "#help-faq-desc": "Quick answers regarding the security and privacy of FitraShield:",
    "#help-faq-1-label": "Does the extension slow down my browsing speed?",
    "#help-faq-1-desc": "No, the extension runs 100% locally. Inspections take less than a millisecond.",
    "#help-faq-2-label": "What happens if I forget the master password?",
    "#help-faq-2-desc": "You can use the Master Recovery Key shown during setup, or run helper.py as Administrator to reset it.",
    
    "#label-stats-shield-status": "Protection Status",
    "#label-stats-blocks-today": "Blocks Today",
    "#label-stats-peak-hour": "Peak Hour Today",
    "#content-logs .section-title": "Recent Blocked Visits",
    "#content-logs .section-desc": "Monitored and blocked browsing attempts",
    "#btn-refresh-logs": "Refresh 🔄",
    "#btn-clear-logs": "Clear Log 🗑️",
    "#logs-empty": "🛡️ No blocked attempts logged yet. Your family is safe!",
    "#content-logs .requests-section .section-title": "Incoming Whitelist Requests",
    "#content-logs .requests-section .section-desc": "Websites requested by children to be whitelisted",
    "#requests-empty": "No whitelist requests currently.",
    
    "#content-categories .section-title": "Custom Block Lists",
    "#content-categories .section-desc": "Create custom categories (e.g., games, distractions, social media) and add sites under each",
    "#btn-add-category": "+ Add Category",
    "#categories-empty": "📂 No categories created yet. Add a new category to start organizing blocked sites.",
    
    "#content-exceptions .card-title": "Whitelist (Allowed Sites)",
    "#content-exceptions .card-desc": "These sites will never be blocked, even if they match blocked keywords. Useful for educational or medical sites containing words that might be blocked by mistake.",
    "#btn-add-exception": "Add",
    "#exception-input": "example.com",
    "#exceptions-empty": "No exceptions added yet.",
    
    "#content-settings .card:nth-child(1) .card-title": "Change Password",
    "#content-settings .card:nth-child(1) .card-desc": "Requires current password verification first.",
    "#content-settings label[for=\"current-pass-input\"]": "Current Password:",
    "#current-pass-input": "Current Password",
    "#content-settings label[for=\"new-pass-input\"]": "New Password:",
    "#new-pass-input": "New Password",
    "#content-settings label[for=\"new-pass-confirm-input\"]": "Confirm New:",
    "#new-pass-confirm-input": "Confirm Password",
    "#btn-change-password": "Update Password 🔄",
    
    "#content-settings .card:nth-child(2) .card-title": "Protection Options",
    "#content-settings .card:nth-child(2) .card-desc": "Control protection mechanisms active on the browser.",
    "#content-settings .card:nth-child(2) .setting-row:nth-child(3) .setting-label": "Enforce SafeSearch",
    "#content-settings .card:nth-child(2) .setting-row:nth-child(3) .setting-desc": "Prevents adult search results on Google & Bing",
    "#content-settings .card:nth-child(2) .setting-row:nth-child(4) .setting-label": "Recovery Key Fingerprint",
    "#content-settings .card:nth-child(2) .setting-row:nth-child(4) .setting-desc": "Hashed recovery key fingerprint",
    
    "#content-settings .card:nth-child(3) .card-title": "Export Settings",
    "#content-settings .card:nth-child(3) .card-desc": "Export all settings (excluding password and recovery key) to move or save them.",
    "#btn-export-settings": "Export FitraShield Settings (.json) 📤",
    
    "#content-settings .card:nth-child(4) .card-title": "Import Sites List",
    "#content-settings .card:nth-child(4) .card-desc": "Upload a text file (.txt) containing website links (one per line) to add them to a custom category.",
    "#content-settings label[for=\"import-file\"] strong": "📥 Choose a .txt file to import",
    "#content-settings label[for=\"import-file\"] p": "Links will be cleaned and auto-added to an 'Imported' category.",
    ".support-btn": "Support us to protect a generation 💚 — Contribute on GitHub",
    
    "#content-dns h3": "🏠 Protect Wi-Fi & Home Router",
    "#content-dns p": "To protect your entire home and mobile devices, tablets, and smart TVs without installing the extension on each device, we highly recommend changing the router's DNS to a family-safe option.",
    "#content-dns .dns-card h4": "Top Free Family-Safe DNS Options:",
    "#content-dns h4:nth-of-type(2)": "📋 Steps to configure DNS on your router:",
    "#content-dns ol li:nth-child(1)": "Open browser and type router IP (usually 192.168.1.1 or 192.168.0.1).",
    "#content-dns ol li:nth-child(2)": "Log in using the admin credentials printed behind the router (Admin / Password).",
    "#content-dns ol li:nth-child(3)": "Search for WAN, LAN, or DHCP Server settings.",
    "#content-dns ol li:nth-child(4)": "Find Primary DNS and Secondary DNS fields.",
    "#content-dns ol li:nth-child(5)": "Enter the clean addresses (e.g., 1.1.1.3 and 1.0.0.3).",
    "#content-dns ol li:nth-child(6)": "Save settings and restart router to apply protection to all home devices.",
    "#content-dns .alert-banner": "⚠️ Technical Note: Clean Router DNS does not conflict with FitraShield; they work together as complementary lines of defense. The former blocks at the Wi-Fi level for all devices, while the extension protects locally against bypass tools.",
    "[data-tab=\"blur\"]": "🖼️ Visual Protection",
    "[data-tab=\"cloud\"]": "☁️ Cloud Control"
  }
};

let currentLang = localStorage.getItem("fitraShieldLang") || "ar";

function applyTranslations(lang) {
  currentLang = lang;
  localStorage.setItem("fitraShieldLang", lang);
  
  const dict = translations[lang];
  for (const selector in dict) {
    const el = document.querySelector(selector);
    if (el) {
      if (el.tagName === "INPUT") {
        el.placeholder = dict[selector];
      } else {
        el.textContent = dict[selector];
      }
    }
  }
  
  // ضبط الاتجاه والخطوط
  document.body.className = lang === "en" ? "ltr" : "rtl";
  document.documentElement.dir = lang === "en" ? "ltr" : "rtl";
  document.documentElement.lang = lang;
  
  // تحديث نص أزرار التبديل
  document.querySelectorAll(".lang-toggle-btn").forEach(btn => {
    btn.textContent = lang === "en" ? "العربية" : "English";
  });
}

/**
 * درع الفطرة (FitraShield) — منطق لوحة التحكم (options.js)
 * يدير البوابات الأمنية، التبويبات، سجل النشاط، طلبات الاستثناء، القوائم المخصصة، الاستثناءات والإعدادات.
 */

// ═══════════════════════════════════════════════════════════════
// دالات مساعدة للأمان والتشفير وتطهير البيانات
// ═══════════════════════════════════════════════════════════════

// تشفير النصوص بـ SHA-256 مع الملح (Salt) لحماية كلمة المرور محلياً
async function hashPassword(password, salt = "") {
  if (!password) return "";
  const combined = salt ? (salt + ":" + password) : password;
  const msgBuffer = new TextEncoder().encode(combined);
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

// توليد مفتاح استرداد عشوائي (FS-XXXX-XXXX-XXXX-XXXX)
function generateRecoveryKey() {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let key = "FS";
  for (let i = 0; i < 4; i++) {
    let segment = "";
    for (let j = 0; j < 4; j++) {
      segment += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    key += "-" + segment;
  }
  return key;
}

// استخلاص وتطهير الدومين الأساسي من أي رابط مدخل
function extractDomain(input) {
  let domain = input.trim();
  if (domain.startsWith("http://")) domain = domain.substring(7);
  else if (domain.startsWith("https://")) domain = domain.substring(8);
  if (domain.startsWith("www.")) domain = domain.substring(4);
  domain = domain.split('/')[0];
  domain = domain.split('?')[0];
  domain = domain.split(':')[0];
  return domain.toLowerCase().trim();
}

// ═══════════════════════════════════════════════════════════════
// نظام التنبيهات المنبثقة (Toast)
// ═══════════════════════════════════════════════════════════════
function showToast(message, isSuccess = true) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.className = "toast-msg visible";
  toast.style.background = isSuccess ? "rgba(13, 148, 136, 0.95)" : "rgba(239, 68, 68, 0.95)";
  
  setTimeout(() => {
    toast.className = "toast-msg";
  }, 3000);
}

// ═══════════════════════════════════════════════════════════════
// نظام الحوار المخصص (Modal Window) بديل عن prompt/alert
// ═══════════════════════════════════════════════════════════════
let modalResolve = null;

function showModal(title, body, needsInput = false, placeholder = "") {
  return new Promise((resolve) => {
    modalResolve = resolve;
    const overlay = document.getElementById("modal-overlay");
    document.getElementById("modal-title").textContent = title;
    document.getElementById("modal-body").textContent = body;
    
    const inputArea = document.getElementById("modal-input-area");
    inputArea.innerHTML = "";
    if (needsInput) {
      const input = document.createElement("input");
      input.type = "text";
      input.id = "modal-input-field";
      input.className = "form-input";
      input.placeholder = placeholder;
      input.style.marginTop = "14px";
      inputArea.appendChild(input);
      input.focus();
    }
    
    overlay.className = "modal-overlay visible";
  });
}

function closeModal(approved = false) {
  const overlay = document.getElementById("modal-overlay");
  overlay.className = "modal-overlay";
  
  let value = approved;
  const input = document.getElementById("modal-input-field");
  if (input) {
    value = approved ? input.value : null;
  }
  
  if (modalResolve) {
    modalResolve(value);
    modalResolve = null;
  }
}

// ═══════════════════════════════════════════════════════════════
// إدارة الواجهات والدخول عند تحميل الصفحة
// ═══════════════════════════════════════════════════════════════
document.addEventListener("DOMContentLoaded", () => {
  // تهيئة اللغة وتطبيقها فوراً عند الفتح
  applyTranslations(currentLang);

  // ربط مستمعي أزرار تبديل اللغة
  document.querySelectorAll(".lang-toggle-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const target = currentLang === "ar" ? "en" : "ar";
      applyTranslations(target);
      // إعادة تحميل الجداول والقوائم التفاعلية لتعكس رؤوس الأعمدة واللغة
      loadActivityLogs();
      loadExceptionRequests();
      loadCustomCategories();
      loadExceptionsList();
    });
  });
  // شاشات الواجهة
  const setupScreen = document.getElementById("setup-screen");
  const recoveryScreen = document.getElementById("recovery-screen");
  const loginScreen = document.getElementById("login-screen");
  const forgotScreen = document.getElementById("forgot-screen");
  const dashboardScreen = document.getElementById("dashboard-screen");

  // تهيئة مستمعي المودال المخصص
  document.getElementById("modal-confirm").addEventListener("click", () => closeModal(true));
  document.getElementById("modal-cancel").addEventListener("click", () => closeModal(false));

  // فحص كلمة المرور وحالة التخزين وجلسة تسجيل الدخول النشطة
  chrome.storage.local.get(["masterPassword", "recoveryKeyHash", "dashboardLoggedIn", "loginTime"], (result) => {
    const now = Date.now();
    const sessionDuration = 30 * 60 * 1000; // 30 دقيقة
    const isSessionValid = result.dashboardLoggedIn === true && 
                           result.loginTime && 
                           (now - result.loginTime < sessionDuration) &&
                           sessionStorage.getItem("fitraShieldAuth") === "true";

    if (!result.masterPassword) {
      setupScreen.style.display = "block";
    } else if (isSessionValid) {
      // إذا كان الأب قد سجل دخوله بالفعل والصفحة حدث لها ريفريش وجلسته صالحة
      chrome.storage.local.set({ loginTime: now });
      unlockDashboard();
    } else {
      chrome.storage.local.set({ dashboardLoggedIn: false, loginTime: 0 });
      sessionStorage.removeItem("fitraShieldAuth");
      loginScreen.style.display = "block";
      dashboardScreen.style.display = "none";
    }
  });

  // 1. شاشة التثبيت الأولية
  document.getElementById("btn-setup-save").addEventListener("click", async () => {
    const pass = document.getElementById("setup-password").value;
    const confirm = document.getElementById("setup-password-confirm").value;

    if (!pass || pass.length < 4) {
      showToast("يجب أن تكون كلمة المرور 4 رموز أو أكثر.", false);
      return;
    }
    if (pass !== confirm) {
      showToast("كلمات المرور غير متطابقة.", false);
      return;
    }

    // توليد الملح (Salt) العشوائي
    const salt = crypto.getRandomValues(new Uint8Array(16)).reduce((str, byte) => str + byte.toString(16).padStart(2, '0'), '');
    const hashedPass = await hashPassword(pass, salt);
    const rawRecoveryKey = generateRecoveryKey();
    const cleanKey = rawRecoveryKey.replace(/-/g, "").trim().toUpperCase();
    const hashedRecoveryKey = await hashPassword(cleanKey, salt);

    chrome.storage.local.set({
      masterPassword: hashedPass,
      recoveryKeyHash: hashedRecoveryKey,
      passwordSalt: salt
    }, () => {
      setupScreen.style.display = "none";
      document.getElementById("display-recovery-key").textContent = rawRecoveryKey;
      recoveryScreen.style.display = "block";
    });
  });

  // تأكيد مفتاح الاسترداد والدخول
  document.getElementById("btn-recovery-confirm").addEventListener("click", () => {
    recoveryScreen.style.display = "none";
    sessionStorage.setItem("fitraShieldAuth", "true");
    chrome.storage.local.set({ dashboardLoggedIn: true, loginTime: Date.now() }, () => {
      unlockDashboard();
    });
  });

  // 2. شاشة تسجيل الدخول المعتادة
  document.getElementById("btn-login").addEventListener("click", async () => {
    performLogin();
  });

  document.getElementById("login-password").addEventListener("keypress", (e) => {
    if (e.key === "Enter") performLogin();
  });

  async function performLogin() {
    const enteredPass = document.getElementById("login-password").value;

    chrome.storage.local.get(["masterPassword", "passwordSalt"], async (result) => {
      const salt = result.passwordSalt || "";
      const hashedEntered = await hashPassword(enteredPass, salt);
      if (result.masterPassword === hashedEntered) {
        loginScreen.style.display = "none";
        sessionStorage.setItem("fitraShieldAuth", "true");
        chrome.storage.local.set({ dashboardLoggedIn: true, loginTime: Date.now() }, () => {
          unlockDashboard();
        });
      } else {
        showToast("كلمة المرور خاطئة. حاول مجدداً.", false);
      }
    });
  }

  // نسيت كلمة المرور
  document.getElementById("link-forgot-pass").addEventListener("click", () => {
    loginScreen.style.display = "none";
    forgotScreen.style.display = "block";
    // تصفير الحقول
    document.getElementById("recovery-key-input").value = "";
    document.getElementById("new-pass-fields").style.display = "none";
    document.getElementById("btn-submit-recovery").textContent = "التحقق من المفتاح 🔑";
  });

  document.getElementById("link-back-login").addEventListener("click", () => {
    forgotScreen.style.display = "none";
    loginScreen.style.display = "block";
  });

  // معالجة مفتاح الاسترداد وإعادة التعيين
  let isKeyVerified = false;
  let tempKeySalt = "";
  document.getElementById("btn-submit-recovery").addEventListener("click", async () => {
    if (!isKeyVerified) {
      const rawEnteredKey = document.getElementById("recovery-key-input").value;
      const cleanEnteredKey = rawEnteredKey.replace(/-/g, "").trim().toUpperCase();

      chrome.storage.local.get(["recoveryKeyHash", "passwordSalt"], async (result) => {
        const salt = result.passwordSalt || "";
        const hashedEnteredKey = await hashPassword(cleanEnteredKey, salt);
        if (result.recoveryKeyHash === hashedEnteredKey) {
          isKeyVerified = true;
          tempKeySalt = salt;
          document.getElementById("new-pass-fields").style.display = "block";
          document.getElementById("btn-submit-recovery").textContent = "حفظ كلمة المرور الجديدة 🔐";
          showToast("مفتاح الاسترداد صحيح. عيّن كلمة مرور جديدة.");
        } else {
          showToast("مفتاح الاسترداد غير صحيح. تحقق منه مرة أخرى.", false);
        }
      });
    } else {
      // حفظ الباسورد الجديد
      const newPass = document.getElementById("new-password").value;
      const newConfirm = document.getElementById("new-password-confirm").value;

      if (!newPass || newPass.length < 4) {
        showToast("يجب أن تكون كلمة المرور الجديدة 4 رموز أو أكثر.", false);
        return;
      }
      if (newPass !== newConfirm) {
        showToast("كلمات المرور غير متطابقة.", false);
        return;
      }

      const salt = tempKeySalt || "";
      const hashedNew = await hashPassword(newPass, salt);
      chrome.storage.local.set({
        masterPassword: hashedNew
      }, () => {
        showToast("تم تحديث كلمة المرور بنجاح.");
        isKeyVerified = false;
        forgotScreen.style.display = "none";
        loginScreen.style.display = "block";
        document.getElementById("login-password").value = "";
      });
    }
  });

  // قفل لوحة التحكم والخروج
  document.getElementById("btn-lock").addEventListener("click", () => {
    sessionStorage.removeItem("fitraShieldAuth");
    chrome.storage.local.set({ dashboardLoggedIn: false }, () => {
      dashboardScreen.style.display = "none";
      document.getElementById("login-password").value = "";
      loginScreen.style.display = "block";
      showToast(currentLang === "en" ? "Dashboard locked successfully." : "تم قفل لوحة التحكم بنجاح.");
    });
  });

  // ═══════════════════════════════════════════════════════════════
  // التنقل بين التبويبات
  // ═══════════════════════════════════════════════════════════════
  const tabButtons = document.querySelectorAll(".tab-btn");
  const tabContents = document.querySelectorAll(".tab-content");

  tabButtons.forEach(button => {
    button.addEventListener("click", () => {
      const targetTab = button.getAttribute("data-tab");

      tabButtons.forEach(btn => btn.classList.remove("active"));
      button.classList.add("active");

      tabContents.forEach(content => content.classList.remove("active"));
      document.getElementById(`content-${targetTab}`).classList.add("active");

      // تحديث البيانات بناءً على التبويب المفتوح
      if (targetTab === "logs") {
        loadActivityLogs();
        loadExceptionRequests();
      } else if (targetTab === "categories") {
        loadCustomCategories();
      } else if (targetTab === "exceptions") {
        loadExceptionsList();
      } else if (targetTab === "settings") {
        loadSettingsTab();
      } else if (targetTab === "blur") {
        loadBlurSettings();
      } else if (targetTab === "cloud") {
        loadCloudSettings();
      }
    });
  });

  // ═══════════════════════════════════════════════════════════════
  // فتح لوحة التحكم وتحميل البيانات
  // ═══════════════════════════════════════════════════════════════
  function unlockDashboard() {
    dashboardScreen.style.display = "block";
    chrome.storage.local.set({ dashboardLoggedIn: true });
    loadActivityLogs();
    loadExceptionRequests();
    loadCustomCategories();
    loadExceptionsList();
    loadSettingsTab();
    loadCloudSettings();
  }

  // ═══════════════════════════════════════════════════════════════
  // التبويب 1: سجل المحاولات وطلبات الاستثناء
  // ═══════════════════════════════════════════════════════════════
  function loadActivityLogs() {
    // ترجمة رؤوس أعمدة جدول سجل المحاولات ديناميكياً
    const tableHeader = document.querySelector("#logs-table thead tr");
    if (tableHeader) {
      tableHeader.innerHTML = currentLang === "en" ? `
        <th style="width:15%">Date</th>
        <th style="width:35%">Website</th>
        <th style="width:15%">Reason</th>
        <th style="width:15%">Keyword</th>
        <th style="width:10%">Preview</th>
        <th style="width:10%">Action</th>
      ` : `
        <th style="width:15%">التاريخ</th>
        <th style="width:35%">الموقع</th>
        <th style="width:15%">سبب الحجب</th>
        <th style="width:15%">الكلمة المرصودة</th>
        <th style="width:10%">معاينة</th>
        <th style="width:10%">التصرف</th>
      `;
    }
    chrome.storage.local.get(["activityLog", "shieldActive"], (result) => {
      const logs = result.activityLog || [];
      const shieldActive = result.shieldActive !== false;
      const tbody = document.getElementById("logs-tbody");
      const emptyDiv = document.getElementById("logs-empty");

      // 1. تحديث بطاقة حالة الحصن
      const shieldStatusEl = document.getElementById("stats-shield-status");
      const shieldIconWrapper = document.getElementById("stats-shield-icon-wrapper");
      if (shieldStatusEl) {
        if (shieldActive) {
          shieldStatusEl.textContent = currentLang === "en" ? "Active & Protected" : "نشط ومحمي";
          shieldStatusEl.className = "stat-value text-emerald";
          if (shieldIconWrapper) {
            shieldIconWrapper.style.color = "var(--accent)";
            shieldIconWrapper.style.background = "rgba(16, 185, 129, 0.08)";
            shieldIconWrapper.classList.add("pulse-animation");
          }
        } else {
          shieldStatusEl.textContent = currentLang === "en" ? "Paused" : "موقوف مؤقتاً";
          shieldStatusEl.className = "stat-value text-paused";
          if (shieldIconWrapper) {
            shieldIconWrapper.style.color = "#64748b";
            shieldIconWrapper.style.background = "rgba(100, 116, 139, 0.08)";
            shieldIconWrapper.classList.remove("pulse-animation");
          }
        }
      }

      // 2. حساب إحصائيات اليوم الحالي وساعة الذروة
      const todayStr = new Date().toDateString();
      let todayCount = 0;
      const todayHours = [];

      logs.forEach(log => {
        const logDate = log.timeObject ? new Date(log.timeObject) : new Date(log.timestamp);
        if (logDate && !isNaN(logDate.getTime()) && logDate.toDateString() === todayStr) {
          todayCount++;
          const hour = logDate.getHours();
          todayHours.push(hour);
        }
      });

      let peakHourText = currentLang === "en" ? "None" : "لا يوجد";
      if (todayHours.length > 0) {
        const hourCounts = {};
        let maxHour = todayHours[0];
        let maxCount = 0;
        todayHours.forEach(h => {
          hourCounts[h] = (hourCounts[h] || 0) + 1;
          if (hourCounts[h] > maxCount) {
            maxCount = hourCounts[h];
            maxHour = h;
          }
        });
        
        const ampm = maxHour >= 12 ? (currentLang === "en" ? "PM" : "م") : (currentLang === "en" ? "AM" : "ص");
        const displayHour = maxHour % 12 === 0 ? 12 : maxHour % 12;
        peakHourText = `${displayHour}:00 ${ampm}`;
      }

      const blocksTodayEl = document.getElementById("stats-blocks-today");
      if (blocksTodayEl) {
        blocksTodayEl.textContent = todayCount;
      }
      
      const peakHourEl = document.getElementById("stats-peak-hour");
      if (peakHourEl) {
        peakHourEl.textContent = peakHourText;
      }

      tbody.innerHTML = "";

      if (logs.length === 0) {
        emptyDiv.style.display = "block";
        return;
      }
      emptyDiv.style.display = "none";

      // عرض السجل من الأحدث إلى الأقدم
      for (let i = logs.length - 1; i >= 0; i--) {
        const log = logs[i];
        const tr = document.createElement("tr");

        // ضبط محاذاة النص والصفوف لتدعم LTR في الإنجليزية
        tr.style.textAlign = currentLang === "en" ? "left" : "right";
        
        const tdTime = document.createElement("td");
        tdTime.textContent = log.timestamp;
        tr.appendChild(tdTime);

        const tdUrl = document.createElement("td");
        tdUrl.textContent = log.url;
        tdUrl.style.wordBreak = "break-all";
        tdUrl.style.fontFamily = "'Outfit', sans-serif";
        tdUrl.style.direction = "ltr";
        tdUrl.style.textAlign = "left";
        tr.appendChild(tdUrl);

        const tdReason = document.createElement("td");
        const spanReason = document.createElement("span");
        spanReason.className = "reason-tag";
        spanReason.textContent = log.reason;
        
        // تلوين وسم التصفية البصرية بلون مختلف لتمييزه
        if (log.reason && log.reason.includes("تصفية")) {
          spanReason.style.background = "rgba(13, 148, 136, 0.15)";
          spanReason.style.color = "#2dd4bf";
          spanReason.style.border = "1px solid rgba(13, 148, 136, 0.25)";
        }
        
        tdReason.appendChild(spanReason);
        tr.appendChild(tdReason);

        const tdKeyword = document.createElement("td");
        if (log.keyword) {
          const spanKeyword = document.createElement("span");
          spanKeyword.style.background = "rgba(217, 119, 6, 0.15)";
          spanKeyword.style.color = "#f59e0b";
          spanKeyword.style.border = "1px solid rgba(217, 119, 6, 0.25)";
          spanKeyword.style.padding = "3px 10px";
          spanKeyword.style.borderRadius = "99px";
          spanKeyword.style.fontSize = "11px";
          spanKeyword.style.fontWeight = "bold";
          spanKeyword.textContent = log.keyword;
          tdKeyword.appendChild(spanKeyword);
        } else {
          tdKeyword.textContent = "—";
        }
        tr.appendChild(tdKeyword);

        // عمود المعاينة البصرية الجديدة
        const tdPreview = document.createElement("td");
        if (log.reason && log.reason.includes("تصفية") && log.url.startsWith("http")) {
          const previewImg = document.createElement("img");
          previewImg.src = log.url;
          previewImg.style.width = "36px";
          previewImg.style.height = "36px";
          previewImg.style.borderRadius = "6px";
          previewImg.style.objectFit = "cover";
          previewImg.style.filter = "blur(6px) grayscale(100%)";
          previewImg.style.transition = "all 0.3s ease";
          previewImg.style.cursor = "zoom-in";
          previewImg.title = currentLang === "en" ? "Hover to reveal preview" : "مرر الفأرة للمعاينة";
          
          previewImg.addEventListener("mouseenter", () => {
            previewImg.style.filter = "none";
            previewImg.style.transform = "scale(1.5)";
            previewImg.style.zIndex = "10";
          });
          previewImg.addEventListener("mouseleave", () => {
            previewImg.style.filter = "blur(6px) grayscale(100%)";
            previewImg.style.transform = "none";
            previewImg.style.zIndex = "auto";
          });
          
          tdPreview.appendChild(previewImg);
        } else {
          tdPreview.textContent = "—";
        }
        tr.appendChild(tdPreview);

        const tdAction = document.createElement("td");
        tdAction.textContent = log.action || "حجب وتحويل";
        tr.appendChild(tdAction);

        tbody.appendChild(tr);
      }
      
      // رسم المخطط البياني التفاعلي فور تحميل السجلات
      drawAnalyticsChart();
    });
  }

  // تحميل طلبات الاستثناء
  function loadExceptionRequests() {
    chrome.storage.local.get(["exceptionRequests"], (result) => {
      const requests = result.exceptionRequests || [];
      const container = document.getElementById("exception-requests-container");
      const emptyDiv = document.getElementById("requests-empty");

      container.innerHTML = "";

      if (requests.length === 0) {
        emptyDiv.style.display = "block";
        return;
      }
      emptyDiv.style.display = "none";

      requests.forEach((req, index) => {
        const div = document.createElement("div");
        div.className = "card";
        div.style.padding = "14px 20px";
        div.style.marginBottom = "10px";
        div.style.display = "flex";
        div.style.justifyContent = "space-between";
        div.style.alignItems = "center";

        const info = document.createElement("div");
        info.innerHTML = `
          <strong style="font-family:'Outfit'; direction:ltr; unicode-bidi:embed;">${req.url}</strong>
          <div style="font-size:11px; color:var(--text-muted); margin-top:4px;">${currentLang === "en" ? "Requested on" : "تاريخ الطلب"}: ${new Date(req.timestamp).toLocaleString(currentLang === "en" ? "en-US" : "ar-EG")}</div>
        `;

        const actions = document.createElement("div");
        actions.style.display = "flex";
        actions.style.alignItems = "center";
        actions.style.gap = "8px";

        const durationSelect = document.createElement("select");
        durationSelect.className = "form-input";
        durationSelect.style.width = "120px";
        durationSelect.style.padding = "6px 8px";
        durationSelect.style.fontSize = "12px";
        durationSelect.innerHTML = `
          <option value="permanent" selected>${currentLang === "en" ? "Permanent" : "دائم"}</option>
          <option value="30">30 ${currentLang === "en" ? "Mins" : "دقيقة"}</option>
          <option value="120">2 ${currentLang === "en" ? "Hours" : "ساعتان"}</option>
          <option value="1440">1 ${currentLang === "en" ? "Day" : "يوم"}</option>
        `;

        const approveBtn = document.createElement("button");
        approveBtn.className = "btn btn-primary btn-sm";
        approveBtn.style.padding = "6px 14px";
        approveBtn.textContent = currentLang === "en" ? "Approve ✅" : "قبول ✅";
        approveBtn.addEventListener("click", () => approveRequest(req.url, index, durationSelect.value));

        const rejectBtn = document.createElement("button");
        rejectBtn.className = "btn btn-secondary btn-sm";
        rejectBtn.style.color = "var(--danger-color)";
        rejectBtn.style.padding = "6px 14px";
        rejectBtn.textContent = currentLang === "en" ? "Reject ❌" : "رفض ❌";
        rejectBtn.addEventListener("click", () => rejectRequest(index));

        actions.appendChild(durationSelect);
        actions.appendChild(approveBtn);
        actions.appendChild(rejectBtn);

        div.appendChild(info);
        div.appendChild(actions);
        container.appendChild(div);
      });
    });
  }

  // قبول طلب استثناء (إضافته للقائمة البيضاء وحذف الطلب)
  function approveRequest(url, index, duration = "permanent") {
    const domain = extractDomain(url);
    if (!domain) return;

    chrome.storage.local.get(["exceptionsList", "exceptionRequests", "exceptionsExpiries"], (result) => {
      let exceptions = result.exceptionsList || [];
      let requests = result.exceptionRequests || [];
      let expiries = result.exceptionsExpiries || {};

      if (!exceptions.includes(domain)) {
        exceptions.push(domain);
      }

      if (duration !== "permanent") {
        const mins = parseInt(duration);
        expiries[domain] = Date.now() + (mins * 60 * 1000);
      } else {
        delete expiries[domain];
      }

      requests.splice(index, 1);

      chrome.storage.local.set({
        exceptionsList: exceptions,
        exceptionRequests: requests,
        exceptionsExpiries: expiries
      }, () => {
        loadExceptionRequests();
        loadExceptionsList();
        showToast(duration !== "permanent" ? `تم فك الحظر مؤقتاً عن ${domain} لمدة ${duration} دقيقة.` : `تم قبول الطلب وفك الحظر دائمًا عن ${domain}.`);
      });
    });
  }

  // رفض طلب الاستثناء (حذفه فقط)
  function rejectRequest(index) {
    chrome.storage.local.get(["exceptionRequests"], (result) => {
      let requests = result.exceptionRequests || [];
      requests.splice(index, 1);

      chrome.storage.local.set({
        exceptionRequests: requests
      }, () => {
        loadExceptionRequests();
        showToast("تم رفض وحذف طلب الاستثناء.");
      });
    });
  }

  // تحديث السجل يدوياً
  document.getElementById("btn-refresh-logs").addEventListener("click", () => {
    loadActivityLogs();
    loadExceptionRequests();
    showToast("تم تحديث السجلات بنجاح.");
  });

  // مسح السجل كاملاً
  document.getElementById("btn-clear-logs").addEventListener("click", async () => {
    const confirmed = await showModal(
      currentLang === "en" ? "🗑️ Clear Blocked Visits Log" : "🗑️ مسح سجل الزيارات المحجوبة",
      currentLang === "en" ? "Are you sure you want to clear all logs? This action cannot be undone." : "هل أنت متأكد من مسح جميع السجلات؟ لا يمكن التراجع عن هذه الخطوة."
    );

    if (confirmed) {
      chrome.storage.local.set({ activityLog: [] }, () => {
        loadActivityLogs();
        showToast("تم مسح سجل المحاولات بالكامل.");
      });
    }
  });

  // ═══════════════════════════════════════════════════════════════
  // التبويب 2: القوائم المخصصة المبوّبة
  // ═══════════════════════════════════════════════════════════════
  function loadCustomCategories() {
    chrome.storage.local.get(["customCategories"], (result) => {
      const categories = result.customCategories || [];
      const container = document.getElementById("categories-container");
      const emptyDiv = document.getElementById("categories-empty");

      container.innerHTML = "";

      if (categories.length === 0) {
        emptyDiv.style.display = "block";
        return;
      }
      emptyDiv.style.display = "none";

      categories.forEach((cat) => {
        const card = document.createElement("div");
        card.className = "card";
        card.style.position = "relative";

        // رأس البطاقة
        const header = document.createElement("div");
        header.className = "card-title";
        
        const titleText = document.createElement("span");
        titleText.textContent = currentLang === "en" ? `${cat.name} (${cat.sites.length} sites)` : `${cat.name} (${cat.sites.length} موقع)`;
        
        const controls = document.createElement("div");
        controls.style.display = "flex";
        controls.style.alignItems = "center";
        controls.style.gap = "14px";

        // مفتاح التفعيل / التعطيل الفئة
        const toggleLabel = document.createElement("label");
        toggleLabel.className = "toggle-switch";
        const toggleInput = document.createElement("input");
        toggleInput.type = "checkbox";
        toggleInput.checked = cat.enabled;
        toggleInput.addEventListener("change", () => toggleCategoryEnabled(cat.id, toggleInput.checked));
        const toggleSlider = document.createElement("span");
        toggleSlider.className = "toggle-slider";
        toggleLabel.appendChild(toggleInput);
        toggleLabel.appendChild(toggleSlider);

        // زر حذف الفئة
        const delCatBtn = document.createElement("button");
        delCatBtn.className = "delete-btn";
        delCatBtn.textContent = currentLang === "en" ? "Delete Category 🗑️" : "حذف الفئة 🗑️";
        delCatBtn.addEventListener("click", () => deleteCategory(cat.id, cat.name));

        controls.appendChild(toggleLabel);
        controls.appendChild(delCatBtn);

        header.appendChild(titleText);
        header.appendChild(controls);
        card.appendChild(header);

        // إدخال موقع جديد تحت الفئة
        const inputGroup = document.createElement("div");
        inputGroup.className = "input-group";
        inputGroup.style.marginTop = "14px";
        
        const siteInput = document.createElement("input");
        siteInput.type = "text";
        siteInput.className = "form-input";
        siteInput.placeholder = currentLang === "en" ? "Enter site domain (e.g., game.com)" : "أدخل اسم الموقع (مثال: game.com)";
        siteInput.style.flex = "1";
        siteInput.style.textAlign = "left";
        siteInput.style.direction = "ltr";
        siteInput.addEventListener("keypress", (e) => {
          if (e.key === "Enter") addSiteToCategory(cat.id, siteInput.value);
        });

        const addSiteBtn = document.createElement("button");
        addSiteBtn.className = "btn btn-primary";
        addSiteBtn.style.width = "auto";
        addSiteBtn.style.padding = "0 20px";
        addSiteBtn.textContent = currentLang === "en" ? "Add" : "إضافة";
        addSiteBtn.addEventListener("click", () => addSiteToCategory(cat.id, siteInput.value));

        inputGroup.appendChild(siteInput);
        inputGroup.appendChild(addSiteBtn);
        card.appendChild(inputGroup);

        // قائمة المواقع المضافة
        const listDiv = document.createElement("div");
        listDiv.className = "custom-list";
        listDiv.style.marginTop = "12px";

        if (cat.sites.length === 0) {
          listDiv.innerHTML = `<div style="padding:14px; text-align:center; font-size:12px; color:var(--text-muted)">لا توجد مواقع في هذه الفئة بعد.</div>`;
        } else {
          cat.sites.forEach((site) => {
            const item = document.createElement("div");
            item.className = "custom-item";

            const siteSpan = document.createElement("span");
            siteSpan.textContent = site;
            siteSpan.style.fontFamily = "'Outfit', sans-serif";

            const delSiteBtn = document.createElement("button");
            delSiteBtn.className = "delete-btn";
            delSiteBtn.textContent = currentLang === "en" ? "Delete ❌" : "حذف ❌";
            delSiteBtn.addEventListener("click", () => removeSiteFromCategory(cat.id, site));

            item.appendChild(siteSpan);
            item.appendChild(delSiteBtn);
            listDiv.appendChild(item);
          });
        }
        card.appendChild(listDiv);
        container.appendChild(card);
      });
    });
  }

  // إضافة فئة جديدة
  document.getElementById("btn-add-category").addEventListener("click", async () => {
    const catName = await showModal(
      currentLang === "en" ? "📁 Add New Block Category" : "📁 إضافة فئة حجب جديدة",
      currentLang === "en" ? "Enter custom category name (e.g., Distraction, Social, Games):" : "أدخل اسم الفئة المخصصة (مثال: تشتيت، تواصل، ألعاب):",
      true,
      currentLang === "en" ? "Category Name" : "اسم الفئة"
    );

    if (catName && catName.trim()) {
      chrome.storage.local.get(["customCategories"], (result) => {
        let categories = result.customCategories || [];
        const newId = "cat_" + Date.now();
        categories.push({
          id: newId,
          name: catName.trim(),
          sites: [],
          enabled: true
        });

        chrome.storage.local.set({ customCategories: categories }, () => {
          loadCustomCategories();
          showToast(`تم إنشاء الفئة "${catName}" بنجاح.`);
        });
      });
    }
  });

  // تفعيل/تعطيل الفئة
  function toggleCategoryEnabled(catId, isEnabled) {
    chrome.storage.local.get(["customCategories"], (result) => {
      let categories = result.customCategories || [];
      const cat = categories.find(c => c.id === catId);
      if (cat) {
        cat.enabled = isEnabled;
        chrome.storage.local.set({ customCategories: categories }, () => {
          showToast(isEnabled ? `تم تفعيل الفئة.` : `تم تعطيل الفئة.`);
        });
      }
    });
  }

  // حذف فئة بالكامل
  async function deleteCategory(catId, catName) {
    const confirmed = await showModal(
      currentLang === "en" ? "⚠️ Delete Category" : "⚠️ حذف الفئة",
      currentLang === "en" ? `Are you sure you want to delete category "${catName}"? All sites under it will be removed.` : `هل أنت متأكد من حذف فئة "${catName}" بالكامل؟ سيتم مسح جميع المواقع المسجلة تحتها.`
    );

    if (confirmed) {
      chrome.storage.local.get(["customCategories"], (result) => {
        let categories = result.customCategories || [];
        const index = categories.findIndex(c => c.id === catId);
        if (index !== -1) {
          categories.splice(index, 1);
          chrome.storage.local.set({ customCategories: categories }, () => {
            loadCustomCategories();
            showToast(`تم حذف الفئة بنجاح.`);
          });
        }
      });
    }
  }

  // إضافة موقع لفئة
  function addSiteToCategory(catId, rawSite) {
    const site = extractDomain(rawSite);
    if (!site) {
      showToast("يرجى إدخال رابط أو دومين صحيح.", false);
      return;
    }

    chrome.storage.local.get(["customCategories"], (result) => {
      let categories = result.customCategories || [];
      const cat = categories.find(c => c.id === catId);
      if (cat) {
        if (cat.sites.includes(site)) {
          showToast("الموقع مضاف بالفعل في هذه الفئة.", false);
          return;
        }
        cat.sites.push(site);

        // التحديث التوافقي العكسي مع customBlockedSites للباكجراوند القديمة إذا كانت نشطة
        chrome.storage.local.get(["customBlockedSites"], (oldRes) => {
          let oldSites = oldRes.customBlockedSites || [];
          if (!oldSites.includes(site)) oldSites.push(site);
          chrome.storage.local.set({
            customCategories: categories,
            customBlockedSites: oldSites
          }, () => {
            loadCustomCategories();
            showToast(`تمت إضافة ${site} إلى الفئة.`);
          });
        });
      }
    });
  }

  // حذف موقع من فئة
  function removeSiteFromCategory(catId, site) {
    chrome.storage.local.get(["customCategories"], (result) => {
      let categories = result.customCategories || [];
      const cat = categories.find(c => c.id === catId);
      if (cat) {
        const index = cat.sites.indexOf(site);
        if (index !== -1) {
          cat.sites.splice(index, 1);

          chrome.storage.local.set({ customCategories: categories }, () => {
            loadCustomCategories();
            showToast(`تمت إزالة الموقع.`);
          });
        }
      }
    });
  }

  // ═══════════════════════════════════════════════════════════════
  // التبويب 3: قائمة الاستثناءات (الوايت ليست)
  // ═══════════════════════════════════════════════════════════════
  function loadExceptionsList() {
    chrome.storage.local.get(["exceptionsList", "exceptionsExpiries"], (result) => {
      let exceptions = result.exceptionsList || [];
      let expiries = result.exceptionsExpiries || {};
      const container = document.getElementById("exceptions-list-container");
      const emptyDiv = document.getElementById("exceptions-empty");

      container.innerHTML = "";

      let hasExpired = false;
      const now = Date.now();

      // فلترة منتهية الصلاحية
      exceptions = exceptions.filter(site => {
        const expiry = expiries[site];
        if (expiry && now > expiry) {
          delete expiries[site];
          hasExpired = true;
          return false;
        }
        return true;
      });

      if (hasExpired) {
        chrome.storage.local.set({
          exceptionsList: exceptions,
          exceptionsExpiries: expiries
        });
      }

      if (exceptions.length === 0) {
        emptyDiv.style.display = "block";
        return;
      }
      emptyDiv.style.display = "none";

      exceptions.forEach((site, index) => {
        const div = document.createElement("div");
        div.className = "exception-item";

        const span = document.createElement("span");
        
        // حساب الوقت المتبقي إذا كان مؤقتاً
        const expiry = expiries[site];
        if (expiry) {
          const minLeft = Math.ceil((expiry - now) / 60000);
          const timeText = currentLang === "en" 
            ? ` (Temporary: ${minLeft}m remaining)` 
            : ` (مؤقت: يتبقى ${minLeft} دقيقة)`;
          span.innerHTML = `${site} <span style="font-size:11px; color:#f59e0b; font-weight:bold;">${timeText}</span>`;
        } else {
          span.textContent = site;
        }

        const delBtn = document.createElement("button");
        delBtn.className = "delete-btn";
        delBtn.textContent = "حذف ❌";
        delBtn.addEventListener("click", () => deleteException(index));

        div.appendChild(span);
        div.appendChild(delBtn);
        container.appendChild(div);
      });
    });
  }

  // إضافة استثناء
  document.getElementById("btn-add-exception").addEventListener("click", () => {
    const input = document.getElementById("exception-input");
    const durationSelect = document.getElementById("select-exception-duration");
    const site = extractDomain(input.value);
    const duration = durationSelect ? durationSelect.value : "permanent";

    if (!site) {
      showToast("يرجى إدخال رابط أو دومين صحيح.", false);
      return;
    }

    chrome.storage.local.get(["exceptionsList", "exceptionsExpiries"], (result) => {
      let exceptions = result.exceptionsList || [];
      let expiries = result.exceptionsExpiries || {};

      if (exceptions.includes(site)) {
        showToast("الموقع مضاف بالفعل في قائمة الاستثناءات.", false);
        return;
      }

      exceptions.push(site);

      if (duration !== "permanent") {
        const mins = parseInt(duration);
        expiries[site] = Date.now() + (mins * 60 * 1000);
      } else {
        delete expiries[site];
      }

      chrome.storage.local.set({ 
        exceptionsList: exceptions,
        exceptionsExpiries: expiries
      }, () => {
        input.value = "";
        loadExceptionsList();
        showToast(duration !== "permanent" 
          ? `تمت إضافة ${site} للوايت ليست مؤقتاً لمدة ${duration} دقيقة.` 
          : `تمت إضافة ${site} إلى القائمة البيضاء.`);
      });
    });
  });

  // حذف استثناء
  function deleteException(index) {
    chrome.storage.local.get(["exceptionsList", "exceptionsExpiries"], (result) => {
      let exceptions = result.exceptionsList || [];
      let expiries = result.exceptionsExpiries || {};
      const site = exceptions[index];

      exceptions.splice(index, 1);
      if (site) {
        delete expiries[site];
      }

      chrome.storage.local.set({ 
        exceptionsList: exceptions,
        exceptionsExpiries: expiries
      }, () => {
        loadExceptionsList();
        showToast("تمت إزالة الاستثناء.");
      });
    });
  }

  // ═══════════════════════════════════════════════════════════════
  // التبويب 4: إعدادات الحماية
  // ═══════════════════════════════════════════════════════════════
  function loadSettingsTab() {
    loadDebugLogs();
    chrome.storage.local.get(["safesearchEnabled"], (result) => {
      const safesearchVal = result.safesearchEnabled !== undefined ? result.safesearchEnabled : true;
      document.getElementById("toggle-safesearch").checked = safesearchVal;
    });

    // تصفير حقول الباسورد
    document.getElementById("current-pass-input").value = "";
    document.getElementById("new-pass-input").value = "";
    document.getElementById("new-pass-confirm-input").value = "";
  }

  // تبديل حالة السيف سيرش
  document.getElementById("toggle-safesearch").addEventListener("change", (e) => {
    const isChecked = e.target.checked;
    chrome.storage.local.set({ safesearchEnabled: isChecked }, () => {
      // تحديث قواعد SafeSearch في المتصفح فوراً
      chrome.declarativeNetRequest.updateEnabledRulesets({
        enableRulesetIds: isChecked ? ["ruleset_safesearch"] : [],
        disableRulesetIds: isChecked ? [] : ["ruleset_safesearch"]
      }, () => {
        showToast(isChecked ? "تم تفعيل فرض SafeSearch بنجاح." : "تم تعطيل فرض SafeSearch.");
      });
    });
  });

  // تغيير الباسورد
  document.getElementById("btn-change-password").addEventListener("click", async () => {
    const currentPass = document.getElementById("current-pass-input").value;
    const newPass = document.getElementById("new-pass-input").value;
    const newConfirm = document.getElementById("new-pass-confirm-input").value;

    if (!currentPass || !newPass || !newConfirm) {
      showToast("يرجى ملء جميع حقول كلمة المرور.", false);
      return;
    }

    if (newPass.length < 4) {
      showToast("يجب أن تكون كلمة المرور الجديدة 4 رموز أو أكثر.", false);
      return;
    }

    if (newPass !== newConfirm) {
      showToast("كلمة المرور الجديدة وتأكيدها غير متطابقين.", false);
      return;
    }

    chrome.storage.local.get(["masterPassword", "passwordSalt"], async (result) => {
      const salt = result.passwordSalt || "";
      const hashedCurrent = await hashPassword(currentPass, salt);
      const hashedNew = await hashPassword(newPass, salt);

      if (result.masterPassword !== hashedCurrent) {
        showToast("كلمة المرور الحالية غير صحيحة.", false);
      } else {
        chrome.storage.local.set({ masterPassword: hashedNew }, () => {
          showToast("تم تغيير كلمة المرور بنجاح.");
          document.getElementById("current-pass-input").value = "";
          document.getElementById("new-pass-input").value = "";
          document.getElementById("new-pass-confirm-input").value = "";
        });
      }
    });
  });

  // تصدير الإعدادات الآمن
  document.getElementById("btn-export-settings").addEventListener("click", () => {
    chrome.storage.local.get(null, (allData) => {
      // استبعاد البيانات الحساسة لأسباب أمنية
      const safeData = { ...allData };
      delete safeData.masterPassword;
      delete safeData.recoveryKeyHash;
      
      const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(safeData, null, 2));
      const downloadAnchor = document.createElement('a');
      downloadAnchor.setAttribute("href", dataStr);
      downloadAnchor.setAttribute("download", "FitraShield_Settings_Backup.json");
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      downloadAnchor.remove();
      showToast("تم تصدير الإعدادات بنجاح.");
    });
  });

  // استيراد القائمة السوداء من ملف خارجي
  document.getElementById("import-file").addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(evt) {
      const text = evt.target.result;
      const lines = text.split("\n");
      const importedDomains = [];

      lines.forEach(line => {
        const cleanDomain = extractDomain(line);
        if (cleanDomain && !cleanDomain.startsWith("#")) {
          importedDomains.push(cleanDomain);
        }
      });

      if (importedDomains.length === 0) {
        showToast("الملف فارغ أو لا يحتوي على نطاقات صالحة.", false);
        return;
      }

      chrome.storage.local.get(["customCategories"], (result) => {
        let categories = result.customCategories || [];
        
        // البحث عن فئة مستورد أو إنشائها
        let importCat = categories.find(c => c.name === "مستورد");
        if (!importCat) {
          importCat = {
            id: "cat_imported_" + Date.now(),
            name: "مستورد",
            sites: [],
            enabled: true
          };
          categories.push(importCat);
        }

        // دمج المواقع المضافة وتصفية المكررات
        const mergedSites = Array.from(new Set([...importCat.sites, ...importedDomains]));
        importCat.sites = mergedSites;

        // التحديث التوافقي العكسي أيضاً مع القائمة القديمة
        chrome.storage.local.get(["customBlockedSites"], (oldRes) => {
          let oldSites = oldRes.customBlockedSites || [];
          const mergedOld = Array.from(new Set([...oldSites, ...importedDomains]));

          chrome.storage.local.set({
            customCategories: categories,
            customBlockedSites: mergedOld
          }, () => {
            loadCustomCategories();
            showToast(`تم استيراد ${importedDomains.length} موقع بنجاح في فئة "مستورد".`);
            document.getElementById("import-file").value = "";
          });
        });
      });
    };
    reader.readAsText(file);
  });

    // ربط أزرار سجل التطوير
    const btnRefreshDebug = document.getElementById("btn-refresh-debug");
    const btnClearDebug = document.getElementById("btn-clear-debug");
    if (btnRefreshDebug) {
      btnRefreshDebug.addEventListener("click", () => {
        loadDebugLogs();
        showToast("تم تحديث سجل المطورين.");
      });
    }
    if (btnClearDebug) {
      btnClearDebug.addEventListener("click", () => {
        chrome.storage.local.set({ debugLog: [] }, () => {
          loadDebugLogs();
          showToast("تم مسح سجل المطورين.");
        });
      });
    }

    // --- مستمعي التصفية البصرية ---
    const toggleBlurEnabled = document.getElementById("toggle-blur-enabled");
    if (toggleBlurEnabled) {
      toggleBlurEnabled.addEventListener("change", (e) => {
        const enabled = e.target.checked;
        chrome.storage.local.set({ blurEnabled: enabled }, () => {
          notifyBlurSettingsUpdated();
          showToast(enabled ? "تم تفعيل التصفية البصرية بنجاح." : "تم تعطيل التصفية البصرية.");
        });
      });
    }

    const selectBlurSensitivity = document.getElementById("select-blur-sensitivity");
    if (selectBlurSensitivity) {
      selectBlurSensitivity.addEventListener("change", (e) => {
        const sens = e.target.value;
        chrome.storage.local.set({ blurSensitivity: sens }, () => {
          notifyBlurSettingsUpdated();
          showToast("تم تحديث حساسية التصفية البصرية.");
        });
      });
    }

    const inputBlurRadius = document.getElementById("input-blur-radius");
    const blurRadiusValue = document.getElementById("blur-radius-value");
    if (inputBlurRadius && blurRadiusValue) {
      inputBlurRadius.addEventListener("input", (e) => {
        const val = e.target.value;
        blurRadiusValue.textContent = `${val}px`;
      });
      inputBlurRadius.addEventListener("change", (e) => {
        const val = parseInt(e.target.value);
        chrome.storage.local.set({ blurRadius: val }, () => {
          notifyBlurSettingsUpdated();
          showToast("تم تحديث قوة التضبيب.");
        });
      });
    }

    const toggleBlurGrayscale = document.getElementById("toggle-blur-grayscale");
    if (toggleBlurGrayscale) {
      toggleBlurGrayscale.addEventListener("change", (e) => {
        const enabled = e.target.checked;
        chrome.storage.local.set({ blurGrayscale: enabled }, () => {
          notifyBlurSettingsUpdated();
          showToast(enabled ? "تم تفعيل تدرج الرمادي للصور المحجوبة." : "تم تعطيل تدرج الرمادي للصور المحجوبة.");
        });
      });
    }

    const btnResetBlurStats = document.getElementById("btn-reset-blur-stats");
    if (btnResetBlurStats) {
      btnResetBlurStats.addEventListener("click", () => {
        chrome.storage.local.set({
          blurStatsTotal: 0,
          blurStatsBlocked: 0,
          blurStatsCache: 0
        }, () => {
          loadBlurSettings();
          showToast("تم تصفير إحصائيات التصفية البصرية بنجاح.");
        });
      });
    }

    const btnAddBlurWhitelist = document.getElementById("btn-add-blur-whitelist");
    if (btnAddBlurWhitelist) {
      btnAddBlurWhitelist.addEventListener("click", () => {
        const input = document.getElementById("blur-whitelist-input");
        const site = extractDomain(input.value);
        if (!site) {
          showToast("يرجى إدخال رابط أو دومين صحيح.", false);
          return;
        }

        chrome.storage.local.get(["blurWhitelist"], (result) => {
          let whitelist = result.blurWhitelist || [];
          if (whitelist.includes(site)) {
            showToast("الموقع مضاف بالفعل في الاستثناءات.", false);
            return;
          }

          whitelist.push(site);
          chrome.storage.local.set({ blurWhitelist: whitelist }, () => {
            input.value = "";
            renderBlurWhitelist(whitelist);
            notifyBlurSettingsUpdated();
            showToast(`تمت إضافة ${site} إلى الاستثناءات البصرية.`);
          });
        });
      });
    }

    const blurWhitelistInput = document.getElementById("blur-whitelist-input");
    if (blurWhitelistInput) {
      blurWhitelistInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") btnAddBlurWhitelist.click();
      });
    }

    const btnSaveCloudConfig = document.getElementById("btn-save-cloud-config");
    if (btnSaveCloudConfig) {
      btnSaveCloudConfig.addEventListener("click", () => {
        saveCloudSettings();
      });
    }

    const btnTestCloudConfig = document.getElementById("btn-test-cloud-config");
    if (btnTestCloudConfig) {
      btnTestCloudConfig.addEventListener("click", () => {
        testCloudConfig();
      });
    }

  // تسجيل الخروج التلقائي عند إغلاق التبويب
  window.addEventListener("beforeunload", () => {
    chrome.storage.local.set({ dashboardLoggedIn: false });
  });

  // الاستماع لتغييرات حالة تسجيل الدخول من البوب آب في الخلفية
  chrome.storage.onChanged.addListener((changes, area) => {
    if (area === "local" && changes.dashboardLoggedIn) {
      if (changes.dashboardLoggedIn.newValue === false) {
        sessionStorage.removeItem("fitraShieldAuth");
        dashboardScreen.style.display = "none";
        document.getElementById("login-password").value = "";
        loginScreen.style.display = "block";
      }
    }
  });
});

  // تحميل وعرض سجل المطورين لتصحيح الأخطاء
  function loadDebugLogs() {
    chrome.storage.local.get(["debugLog"], (result) => {
      const logs = result.debugLog || [];
      const display = document.getElementById("debug-log-display");
      if (display) {
        if (logs.length === 0) {
          display.textContent = "No debug logs recorded yet. Perform some searches to generate logs.";
        } else {
          display.textContent = logs.join("\n");
          display.scrollTop = display.scrollHeight; // النزول التلقائي للأسفل
        }
      }
    });
  }

  // --- دوال إدارة التصفية البصرية ---
  function loadBlurSettings() {
    chrome.storage.local.get(["blurEnabled", "blurSensitivity", "blurWhitelist", "blurStatsTotal", "blurStatsBlocked", "blurStatsCache", "blurRadius", "blurGrayscale"], (data) => {
      const enabled = data.blurEnabled ?? false;
      const sensitivity = data.blurSensitivity ?? "standard";
      const whitelist = data.blurWhitelist || [];
      const total = data.blurStatsTotal ?? 0;
      const blocked = data.blurStatsBlocked ?? 0;
      const cacheHits = data.blurStatsCache ?? 0;
      const radius = data.blurRadius ?? 30;
      const grayscale = data.blurGrayscale ?? true;

      const toggle = document.getElementById("toggle-blur-enabled");
      if (toggle) toggle.checked = enabled;

      const select = document.getElementById("select-blur-sensitivity");
      if (select) select.value = sensitivity;

      const totalEl = document.getElementById("stats-blur-total");
      if (totalEl) totalEl.textContent = total;

      const blockedEl = document.getElementById("stats-blur-blocked");
      if (blockedEl) blockedEl.textContent = blocked;

      const cacheEl = document.getElementById("stats-blur-cache");
      if (cacheEl) cacheEl.textContent = cacheHits;

      // تحديث شريط قوة التضبيب
      const slider = document.getElementById("input-blur-radius");
      if (slider) slider.value = radius;

      const sliderVal = document.getElementById("blur-radius-value");
      if (sliderVal) sliderVal.textContent = `${radius}px`;

      // تحديث مفتاح تدرج الرمادي
      const grayToggle = document.getElementById("toggle-blur-grayscale");
      if (grayToggle) grayToggle.checked = grayscale;

      renderBlurWhitelist(whitelist);
    });
  }

  function renderBlurWhitelist(whitelist) {
    const container = document.getElementById("blur-whitelist-container");
    const emptyDiv = document.getElementById("blur-whitelist-empty");
    if (!container || !emptyDiv) return;

    container.innerHTML = "";

    if (whitelist.length === 0) {
      emptyDiv.style.display = "block";
      return;
    }
    emptyDiv.style.display = "none";

    whitelist.forEach((site, index) => {
      const div = document.createElement("div");
      div.className = "exception-item";

      const span = document.createElement("span");
      span.textContent = site;

      const delBtn = document.createElement("button");
      delBtn.className = "delete-btn";
      delBtn.textContent = "حذف ❌";
      delBtn.addEventListener("click", () => deleteBlurWhitelist(index));

      div.appendChild(span);
      div.appendChild(delBtn);
      container.appendChild(div);
    });
  }

  function deleteBlurWhitelist(index) {
    chrome.storage.local.get(["blurWhitelist"], (result) => {
      let whitelist = result.blurWhitelist || [];
      whitelist.splice(index, 1);
      chrome.storage.local.set({ blurWhitelist: whitelist }, () => {
        renderBlurWhitelist(whitelist);
        notifyBlurSettingsUpdated();
        showToast("تمت إزالة الاستثناء البصري.");
      });
    });
  }

  function notifyBlurSettingsUpdated() {
    chrome.storage.local.get(["blurEnabled", "blurSensitivity", "blurWhitelist", "blurRadius", "blurGrayscale"], (data) => {
      chrome.runtime.sendMessage({
        type: "BLUR_SETTINGS_UPDATED",
        settings: {
          blurEnabled: data.blurEnabled ?? false,
          blurSensitivity: data.blurSensitivity ?? "standard",
          blurWhitelist: data.blurWhitelist ?? [],
          blurRadius: data.blurRadius ?? 30,
          blurGrayscale: data.blurGrayscale ?? true
        }
      });
    });
  }

  // --- دالة رسم المخطط البياني التفاعلي للمحاولات المحجوبة ---
  function drawAnalyticsChart() {
    const canvas = document.getElementById("analytics-chart");
    if (!canvas) return;

    // ضبط دقة الرسم لتفادي التشوش على شاشات Retina/High-DPI
    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;

    const ctx = canvas.getContext("2d");
    ctx.scale(dpr, dpr);

    chrome.storage.local.get(["activityLog"], (result) => {
      const logs = result.activityLog || [];

      // توليد آخر 7 أيام
      const days = [];
      const counts = [];
      const labels = [];
      
      const now = new Date();
      for (let i = 6; i >= 0; i--) {
        const d = new Date(now.getFullYear(), now.getMonth(), now.getDate() - i);
        days.push(d);
        counts.push(0);

        // تنسيق الاسم e.g. "7/8"
        labels.push(`${d.getMonth() + 1}/${d.getDate()}`);
      }

      // تجميع أعداد المحاولات لكل يوم
      logs.forEach(log => {
        const logDate = log.timeObject ? new Date(log.timeObject) : (log.timestamp ? new Date(log.timestamp) : null);
        if (!logDate || isNaN(logDate.getTime())) return;

        for (let i = 0; i < 7; i++) {
          const d = days[i];
          if (logDate.getDate() === d.getDate() &&
              logDate.getMonth() === d.getMonth() &&
              logDate.getFullYear() === d.getFullYear()) {
            counts[i]++;
            break;
          }
        }
      });

      // أبعاد الرسم البياني
      const width = rect.width;
      const height = rect.height;
      const paddingLeft = 35;
      const paddingRight = 15;
      const paddingTop = 20;
      const paddingBottom = 25;

      const chartWidth = width - paddingLeft - paddingRight;
      const chartHeight = height - paddingTop - paddingBottom;

      // مسح الكانفاس
      ctx.clearRect(0, 0, width, height);

      // إيجاد الحد الأقصى للمحاولات لضبط مقياس الرسم (5 كحد أدنى)
      const maxCount = Math.max(...counts, 5);
      const yTicks = 4;

      // رسم خطوط الشبكة الأفقية وقيم محور Y
      ctx.strokeStyle = "rgba(255, 255, 255, 0.05)";
      ctx.lineWidth = 1;
      ctx.fillStyle = "rgba(148, 163, 184, 0.6)"; // text-muted
      ctx.font = "10px Outfit, Cairo, sans-serif";
      ctx.textAlign = "right";
      ctx.textBaseline = "middle";

      for (let i = 0; i <= yTicks; i++) {
        const yVal = Math.round((maxCount / yTicks) * i);
        const yPos = paddingTop + chartHeight - (chartHeight * (i / yTicks));
        
        ctx.beginPath();
        ctx.moveTo(paddingLeft, yPos);
        ctx.lineTo(width - paddingRight, yPos);
        ctx.stroke();

        ctx.fillText(yVal, paddingLeft - 8, yPos);
      }

      // رسم تسميات الأيام على محور X
      ctx.textAlign = "center";
      ctx.textBaseline = "top";
      const xInterval = chartWidth / 6;

      days.forEach((d, i) => {
        const xPos = paddingLeft + (i * xInterval);
        ctx.fillText(labels[i], xPos, height - paddingBottom + 8);
      });

      // حساب إحداثيات النقاط
      const points = [];
      days.forEach((d, i) => {
        const xPos = paddingLeft + (i * xInterval);
        const yPos = paddingTop + chartHeight - (chartHeight * (counts[i] / maxCount));
        points.push({ x: xPos, y: yPos });
      });

      // رسم تظليل متدرج (Gradient Area Fill) تحت الخط
      const gradient = ctx.createLinearGradient(0, paddingTop, 0, height - paddingBottom);
      gradient.addColorStop(0, "rgba(20, 184, 166, 0.3)"); // accent-hover transparent
      gradient.addColorStop(1, "rgba(20, 184, 166, 0.0)");

      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.moveTo(points[0].x, height - paddingBottom);
      points.forEach(p => {
        ctx.lineTo(p.x, p.y);
      });
      ctx.lineTo(points[points.length - 1].x, height - paddingBottom);
      ctx.closePath();
      ctx.fill();

      // رسم الخط البياني الرئيسي ( glowing neon line )
      ctx.strokeStyle = "#14b8a6"; // accent-hover
      ctx.lineWidth = 3;
      ctx.lineJoin = "round";
      ctx.lineCap = "round";
      ctx.shadowColor = "rgba(20, 184, 166, 0.4)";
      ctx.shadowBlur = 6;

      ctx.beginPath();
      ctx.moveTo(points[0].x, points[0].y);
      for (let i = 1; i < points.length; i++) {
        ctx.lineTo(points[i].x, points[i].y);
      }
      ctx.stroke();

      // إيقاف تأثير الوهج لرسم الدوائر والأرقام بوضوح
      ctx.shadowBlur = 0;
      ctx.shadowColor = "transparent";

      // رسم النقاط الدائرية (Dots) والأرقام
      points.forEach((p, i) => {
        ctx.fillStyle = "#0d9488"; // Accent
        ctx.beginPath();
        ctx.arc(p.x, p.y, 5, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = "#ffffff";
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
        ctx.fill();
        
        // عرض الرقم فوق النقطة إذا كان أكبر من 0 لسهولة القراءة
        if (counts[i] > 0) {
          ctx.fillStyle = "#2dd4bf";
          ctx.font = "bold 10px Outfit, Cairo, sans-serif";
          ctx.textAlign = "center";
          ctx.fillText(counts[i], p.x, p.y - 12);
        }
      });
    });
  }

  // --- دوال التحكم السحابي ---
  function loadCloudSettings() {
    chrome.storage.local.get(["cloudEnabled", "firebaseUrl", "telegramToken", "telegramChatId", "parentSecret"], (data) => {
      const enabled = data.cloudEnabled ?? false;
      const firebaseUrl = data.firebaseUrl || "";
      const telegramToken = data.telegramToken || "";
      const telegramChatId = data.telegramChatId || "";
      const parentSecret = data.parentSecret || "";

      const toggle = document.getElementById("toggle-cloud-enabled");
      if (toggle) toggle.checked = enabled;

      const inputUrl = document.getElementById("input-firebase-url");
      if (inputUrl) inputUrl.value = firebaseUrl;

      const inputToken = document.getElementById("input-telegram-token");
      if (inputToken) inputToken.value = telegramToken;

      const inputChatId = document.getElementById("input-telegram-chat-id");
      if (inputChatId) inputChatId.value = telegramChatId;

      const inputSecret = document.getElementById("input-parent-secret");
      if (inputSecret) inputSecret.value = parentSecret;
    });
  }

  function saveCloudSettings() {
    const enabled = document.getElementById("toggle-cloud-enabled").checked;
    const firebaseUrl = document.getElementById("input-firebase-url").value.trim();
    const telegramToken = document.getElementById("input-telegram-token").value.trim();
    const telegramChatId = document.getElementById("input-telegram-chat-id").value.trim();
    const parentSecret = document.getElementById("input-parent-secret").value.trim();

    chrome.storage.local.set({
      cloudEnabled: enabled,
      firebaseUrl: firebaseUrl,
      telegramToken: telegramToken,
      telegramChatId: telegramChatId,
      parentSecret: parentSecret
    }, () => {
      chrome.runtime.sendMessage({ type: 'CLOUD_SETTINGS_UPDATED' });
      showToast("تم حفظ الإعدادات السحابية بنجاح.");
    });
  }

  function testCloudConfig() {
    const token = document.getElementById("input-telegram-token").value.trim();
    const chatId = document.getElementById("input-telegram-chat-id").value.trim();

    if (!token || !chatId) {
      showToast("يرجى إدخال التوكن ومعرف الشات أولاً.", false);
      return;
    }

    showToast("جاري إرسال الرسالة التجريبية...");

    const url = `https://api.telegram.org/bot${token}/sendMessage`;
    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text: "🛡️ *درع الفطرة: اختبار اتصال ناجح!*\n\nالبوت متصل بنجاح بلوحة تحكم الآباء وجاهز لتلقي طلبات طفلك.",
        parse_mode: "Markdown"
      })
    })
    .then(res => res.json())
    .then(data => {
      if (data.ok) {
        showToast("تم إرسال الرسالة التجريبية بنجاح! تفقد تليجرام.");
      } else {
        showToast(`فشل الإرسال: ${data.description}`, false);
      }
    })
    .catch(err => {
      showToast(`خطأ في الاتصال: ${err.message}`, false);
    });
  }
