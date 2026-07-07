<div align="center">

<img src="logo.png" alt="FitraShield Logo" width="160" height="160" />

# 🛡️ درع الفطرة — FitraShield

### [العربية](#-درع-الفطرة---fitrashield) | [English](#-fitrashield---parental-protection-system)

---

</div>

# 🛡️ درع الفطرة — FitraShield
### منظومة حماية رقمية محلية 100% لصيانة الفطرة السليمة وحماية العائلات

[![License: MIT](https://img.shields.io/badge/License-MIT-emerald.svg)](https://opensource.org/licenses/MIT)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-teal.svg)](http://makeapullrequest.com)
[![GitHub Stars](https://img.shields.io/github/stars/ahmadibrahim4geo/FitraShield?style=social)](https://github.com/ahmadibrahim4geo/FitraShield)

**«وَقُل رَّبِّ زِدْنِي عِلْمًا»**  
مشروع **درع الفطرة (FitraShield)** هو منظومة حماية برمجية متكاملة تهدف إلى صيانة الفطرة السليمة وحماية براءة الأطفال وعقول الشباب من مخاطر المحتوى الإباحي والمواقع الضارة على شبكة الإنترنت.

**تطوير وتصميم المطور:** أحمد إبراهيم (Ahmad Ibrahim)

---

## 📖 جدول المحتويات (العربية)
1. [عن المشروع ورؤيته](#1-عن-المشروع-ورؤيته)
2. [المميزات الرئيسية](#2-المميزات-الرئيسية)
3. [المعمارية التقنية للمشروع](#3-المعمارية-التقنية-للمشروع)
4. [هيكل الملفات ووظيفة كل ملف](#4-هيكل-الملفات-ووظيفة-كل-ملف)
5. [طريقة التثبيت والتشغيل](#5-طريقة-التثبيت-والتشغيل)
6. [العيوب والتحديات الحالية](#6-العيوب-والتحديات-الحالية)
7. [النظرة المستقبلية وخارطة الطريق](#7-النظرة-المستقبلية-وخارطة-الطريق)
8. [دليل التطوير والمساهمة (للمطورين الجدد)](#8-دليل-التطوير-والمساهمة-للمطورين-الجدد)
9. [دعم المشروع (هام جداً)](#9-دعم-المشروع-هام-جداً)
10. [الترخيص (License)](#10-الترخيص-license)

---

## 1. عن المشروع ورؤيته
المواقع الإباحية والضارة تتنامى وتغير نطاقاتها (Domains) باستمرار للتحايل على أنظمة الحجب، بالإضافة إلى أن المحتوى المكتوب باللهجات العامية العربية نادراً ما يتم رصده في قوائم الحجب الأجنبية الشهيرة.

تأتي أداة **درع الفطرة** لتسد هذه الثغرة بأداة **عربية الهوية، مجانية بالكامل، وصعبة الالتفاف عليها**. تعمل الأداة **محلياً بنسبة 100%** على جهاز المستخدم دون الحاجة إلى خوادم خارجية أو تسجيل دخول أونلاين، مما يضمن **الخصوصية المطلقة والسرعة الفائقة** لعائلتك وبياناتك.

---

## 2. المميزات الرئيسية
* **الخصوصية المطلقة:** لا يتم إرسال أي رابط تPixel أو سجل تصفح خارج جهازك؛ المنظومة تعمل بالكامل محلياً (Zero-Server Architecture).
* **حظر المواقع الإباحية من المنبع:** حجب فوري للمواقع الإباحية العالمية والموجهة للشرق الأوسط والناطقة بالعربية.
* **محرك تفحص الكلمات المفتاحية الذكي:** فحص نصوص العناوين (Page Titles) والروابط (URLs) باللغة العربية الفصحى وكافة اللهجات العامية (المصرية، الخليجية، المغاربية، الشامية) وحجب الصفحة فوراً عند مطابقة كلمة ممنوعة.
* **منع الحذف والالتفاف الحديدي:** تكامل مع سجل نظام تشغيل ويندوز (Registry Policies) لمنع الأطفال من حذف الإضافة من المتصفح أو إيقاف تشغيلها، حتى في وضع التصفح الخفي (Incognito Mode).
* **نظام تقارير أبوي متقدم ومحمي:** حفظ السجلات محلياً بصيغة CSV مموهة لحمايتها من العبث، وحساب وقت ذروة محاولات التصفح وعدد محاولات اليوم.
* **التحكم بالاستثناءات والقوائم المخصصة:** إمكانية إضافة مواقع للقائمة البيضاء لتفادي الحجب الخاطئ، وإنشاء تصنيفات حجب مخصصة (مثل: ألعاب، تشتيت).
* **إجبار محركات البحث على الوضع الآمن قسرياً:** فرض SafeSearch على Google و Bing و Restricted Mode على YouTube.

---

## 3. المعمارية التقنية للمشروع
تعتمد المنظومة على تكامل وثيق بين طبقة المتصفح (Browser Level) وطبقة نظام التشغيل (OS Level):

```
┌─────────────────────────────────┐
│     متصفح كروم / إيدج / بريف    │
│  [ إضافية درع الفطرة (MV3) ]    │
└────────────────┬────────────────┘
                 │
       (Native Messaging API)
                 │
                 ▼
┌─────────────────────────────────┐      ┌─────────────────────────┐
│     Windows OS Layer            │ ───► │  سياسات الريجستري (HKLM) │
│  [ helper.bat + helper.py ]     │      │   - قفل التصفح الخفي     │
│   (حفظ التقارير ومراقبة المتصفحات)│      │   - منع حذف الإضافة     │
└─────────────────────────────────┘      └─────────────────────────┘
```

---

## 4. هيكل الملفات ووظيفة كل ملف
المشروع مبني بلغة **JavaScript (للإضافة)** و **Python / Batch (لربط نظام التشغيل)**:

| اسم الملف | نوعه | الوظيفة |
|---|---|---|
| `manifest.json` | JSON | الملف التعريفي للإضافة وإعداداتها وصلاحياتها في جوجل (Manifest V3). |
| `background.js` | JS | Service Worker — العقل المدبر، يدير الحجب، والـ Keep-Alive، وتحديث الأيقونات. |
| `popup.html / .js` | HTML/JS | النافذة المنبثقة عند الضغط على أيقونة الإضافة وتتيح تسجيل الدخول والحجب السريع. |
| `options.html / .js` | HTML/JS | لوحة تحكم الآباء (Parental Dashboard) الشاملة لإدارة التقارير والكلمات والقوائم واللغات. |
| `blocked.html` | HTML | صفحة الحجب التربوية التي تظهر للمستخدم عند محاولة فتح موقع محظور. |
| `rules.json` | JSON | قواعد حجب النطاقات المدمجة مسبقاً (تضم آلاف المواقع الإباحية). |
| `rules_safesearch.json` | JSON | قواعد فرض البحث الآمن على محركات البحث الكبرى. |
| `keywords.json` | JSON | قاعدة الكلمات المفتاحية الجنسية بالفصحى ومختلف اللهجات العربية. |
| `helper.py` | Python | المساعد المحلي، يستقبل السجلات من المتصفح ويحفظها ويراقب العمليات لإغلاق المتصفحات البديلة. |
| `helper.bat` | Batch | جسر استدعاء لتشغيل سكربت البايثون المساعد عبر نظام تشغيل ويندوز. |
| `com.fitrashield.helper.json` | JSON | ملف تعريف المساعد المحلي لربطه بكروم/إيدج عبر بروتوكول Native Messaging. |
| `install.bat` | Batch | يطلب صلاحيات المسؤول ويشغل سكربت التثبيت التلقائي لتأمين الجهاز. |
| `install_shield.py` | Python | يقوم بكتابة وتحديث ملفات التعريف وحقن سياسات الأمان في ريجستري الويندوز. |
| `uninstall_shield.py` | Python | يلغي تفعيل المنظومة بالكامل ويمسح سياسات الحجب والمساعد المحلي من ويندوز. |
| `fix_local_test.bat` | Batch | يزيل سياسة قفل حذف الإضافة مؤقتاً لتمكين المطورين من اختبار الإضافة وتعديلها محلياً. |
| `reset_browser_policies.bat` | Batch | يزيل جميع سياسات كروم وإيدج من الريجستري لتهيئة المتصفحات لحالتها الأولى. |
| `FitraShield_Documentation_v1.0.md` | MD | وثيقة التوثيق الهندسي الشاملة للمشروع. |
| `logo.png` | PNG | شعار الأداة المعتمد بدقة عالية وخلفية شفافة. |

---

## 5. طريقة التثبيت والتشغيل
### الخطوة الأولى: تثبيت الإضافة محلياً
1. قم بتحميل كود المشروع وفك الضغط عنه في مجلد دائم على جهازك (مثلاً: `C:\FitraShield`).
2. افتح متصفح Google Chrome أو Microsoft Edge واذهب إلى صفحة الإضافات (`chrome://extensions` أو `edge://extensions`).
3. قم بتفعيل **وضع المطور (Developer Mode)** في الجزء العلوي.
4. اضغط على **Load unpacked** واختر مجلد المشروع.
5. سيتم تثبيت الإضافة وستظهر في شريط الأدوات. انسخ **معرّف الإضافة (Extension ID)** الخاص بها (سلسلة تتكون من 32 حرفاً إنجليزياً).

### الخطوة الثانية: تفعيل التحصين في نظام ويندوز
1. انقر نقراً مزدوجاً فوق ملف [install.bat](file:///c:/Users/ahmad/Desktop/FitraShield/install.bat) لتشغيله.
2. ستظهر لك نافذة تطلب صلاحيات المسؤول (UAC)، وافق عليها.
3. ستفتح نافذة سوداء تطلب منك إدخال **Extension ID** الذي نسخته في الخطوة الأولى.
4. ألصق المعرّف واضغط Enter.
5. سيقوم البرنامج بتهيئة المساعد وتثبيت سياسات ريجستري ويندوز وتأمين المتصفحات فوراً.
6. أعد تشغيل المتصفح، وستلاحظ قفل وضع التصفح الخفي تماماً واختفاء زر حذف الإضافة لحمايتها.

---

## 6. العيوب والتحديات الحالية
للمصداقية العلمية وكتابة كود نظيف، هناك بعض القيود والتحديات في الإصدار الحالي:
* **الاعتماد على بايثون:** يتطلب تشغيل نظام التقارير التلقائي ورصد المتصفحات البديلة وجود لغة Python مثبتة على جهاز الأب ومضافة للـ PATH.
* **صلاحيات المسؤول (Admin Rights):** يتطلب تفعيل سياسات الأمان تشغيل أداة التثبيت بصلاحيات المسؤول، مما يعني ضرورة أن يكون حساب الطفل على ويندوز حساباً عادياً (Standard User) وليس مسؤولاً (Admin) لضمان عدم إبطاله للسياسات.
* **نطاق المتصفحات:** المنظومة تدعم المتصفحات المبنية على نواة Chromium (مثل كروم، إيدج، بريف، أوبرا) بشكل كامل، بينما تعتمد حماية متصفحات أخرى كـ Firefox على كشف العملية وإغلاقها عن طريق المساعد، وليس الحجب الداخلي.
* **محدودية لوحة التحكم:** لوحة التحكم ومراجعة التقارير محلية فقط (Local Dashboard)؛ مما يعني أن الأب يجب أن يفتح جهاز الكمبيوتر الخاص بالطفل لمراجعة السجلات، ولا يوجد تطبيق أو لوحة تحكم سحابية للمتابعة عن بُعد بعد.

---

## 7. النظرة المستقبلية وخارطة الطريق
نسعى لتطوير المنظومة للوصول للرؤية الكبرى لحماية أطفالنا في العالم العربي والإسلامي:
- [ ] **إزالة الاعتماد على بايثون:** إعادة كتابة المساعد المحلي (`helper.py`) بلغة **Go** أو **Rust** وتجميعه كملف تنفيذ ذاتي التشغيل (`.exe` صغير الحجم خفيف الرامات) ليعمل على أي جهاز ويندوز مباشرة دون الحاجة لتثبيت بايثون. *(هدف ذو أولوية للمطورين الجدد)*
- [ ] **محرك ذكاء اصطناعي محلي (Local AI Classification):** دمج نموذج معالجة لغات طبيعية (NLP) محلي وخفيف لتصنيف النصوص والصفحات بشكل أدق، بالإضافة لنموذج رؤية حاسوبية (Computer Vision) لتصنيف وحجب الصور ومقاطع الفيديو الإباحية لحظياً داخل المتصفح.
- [ ] **لوحة التحكم السحابية (Cloud Control Panel):** إمكانية إرسال التقارير مشفرة لخادم سحابي آمن وتلقي إشعارات الحظر فوراً على هاتف الأب عبر تطبيق موبايل مخصص (Flutter/Kotlin).
- [ ] **تحويل المنظومة لخدمة SaaS متكاملة:** تقديم حزم تأمين سهلة ومتاحة للمدارس والمؤسسات التعليمية في الوطن العربي.

---

## 8. دليل التطوير والمساهمة (للمطورين الجدد)
نرحب بمساهمات كل المبرمجين والمهتمين بالعمل الخيري والمفتوح المصدر لحماية النشء:

### كيف تبدأ التطوير محلياً؟
1. للبدء في تعديل الكود وتجربته دون أن يمنعك ويندوز من حذف أو تحديث الإضافة، قم بتشغيل ملف [fix_local_test.bat](file:///c:/Users/ahmad/Desktop/FitraShield/fix_local_test.bat) كمسؤول لإزالة قيود التثبيت القسري مؤقتاً.
2. قم بإجراء تعديلاتك على ملفات الـ HTML/CSS/JS.
3. اذهب إلى `chrome://extensions` واضغط على **Reload** تحت الإضافة لرؤية تعديلاتك فوراً.
4. **أفكار للمساهمة:**
   - تحسين كفاءة فحص الروابط وتقليل استهلاك الرامات في `background.js`.
   - تحويل المساعد بلغة Go/Rust لإنشاء ملف تنفيذي مستقل.
   - تحديث وتنظيف كلمات الحجب بالعامية العربية في `keywords.json`.
   - إصلاح الأخطاء أو تحسين استجابة واجهة لوحة تحكم الآباء لتبدو أكثر جمالية وتفاعلية.

---

## 9. دعم المشروع (هام جداً)
مشروع **درع الفطرة** مبني ليكون **مفتوح المصدر وخيراً Ummah-focused** متاحاً مجاناً لكل عائلة بدون إعلانات أو قيود. 

⚠️ **ولكن، المطور يواجه تحديات حقيقية تمنعه من الوصول لجمهور أكبر:**
1. **تكلفة متجر كروم (Chrome Web Store Developer Fees):** المطور عاجز حالياً عن دفع رسوم التسجيل ورفع الأداة بشكل رسمي لتثبيتها بضغطة زر بدلاً من الطريقة المحلية المعقدة.
2. **تكاليف السيرفرات:** لا نملك دعماً مالياً لحجز سيرفرات وقواعد بيانات سحابية لبناء لوحة التحكم عن بعد وتطبيق الموبايل لإرسال الإشعارات الفورية للوالدين.

### كيف يمكنك دعمنا؟
* **⭐ ادعمنا بنجمة على GitHub:** تقييمك للمستودع بالنجمة يرفع من ترتيبه ويساعد في وصوله لآلاف الآباء والأمهات الباحثين عن حلول لحماية أبنائهم.
* **💸 الدعم المادي المباشر:** يساهم دعمك المادي في حجز السيرفرات، دفع رسوم المتاجر، وتوفير التفرغ الكامل لتطوير خوارزميات الذكاء الاصطناعي والحفاظ على مجانية الأداة.
  * *يمكنك التبرع لدعم تكاليف السيرفرات والمتاجر عبر الطرق التالية:*
    * **PayPal:** `[رابط حساب PayPal الخاص بك أو بريدك الإلكتروني هنا]`
    * **Buy Me a Coffee:** `[رابط حساب Buy Me a Coffee هنا]`
    * **Vodafone Cash / InstaPay (مصر):** `[رابط أو رقم المحفظة المحلية هنا]`
    * **Crypto Wallet:** `[عنوان محفظة عملات رقمية USDT أو BTC هنا]`
* **🔊 نشر الفكرة:** شارك المشروع في مجموعات الماميز والآباء والمهتمين بالتربية الرقمية الصالحة.

---

## 10. الترخيص (License)
هذا المشروع مرخص بموجب رخصة **MIT** - مما يعني أنه يمكنك تعديله وإعادة استخدامه بحرية تامة للأغراض غير التجارية ومساعدة المجتمع.

<div align="center">
  
**﴿ إِنْ أُرِيدُ إِلَّا الْإِصْلَاحَ مَا اسْتَطَعْتُ ۚ وَمَا تَوْفِيقِي إِلَّا بِاللَّهِ ۚ عَلَيْهِ تَوَكَّلْتُ وَإِلَيْهِ أُنِيبُ ﴾**

</div>

---
---

# 🛡️ FitraShield — Parental Protection System
### 100% Local Browser Extension & OS Enforcer to Safeguard Family Purity

[![License: MIT](https://img.shields.io/badge/License-MIT-emerald.svg)](https://opensource.org/licenses/MIT)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-teal.svg)](http://makeapullrequest.com)
[![GitHub Stars](https://img.shields.io/github/stars/ahmadibrahim4geo/FitraShield?style=social)](https://github.com/ahmadibrahim4geo/FitraShield)

**FitraShield** is a comprehensive software security ecosystem designed to preserve natural human purity (Fitra) and protect children and teenagers from adult content and harmful websites.

**Developed and Designed by:** Ahmad Ibrahim

---

## 📖 Table of Contents (English)
1. [About the Project & Vision](#1-about-the-project--vision)
2. [Key Features](#2-key-features)
3. [System Architecture](#3-system-architecture)
4. [File Structure & Purpose](#4-file-structure--purpose)
5. [Installation & Setup](#5-installation--setup)
6. [Current Drawbacks & Limitations](#6-current-drawbacks--limitations)
7. [Future Roadmap](#7-future-roadmap)
8. [Contribution & Development Guide](#8-contribution--development-guide)
9. [Support the Project (Crucial)](#9-support-the-project-crucial)
10. [License](#10-license)

---

## 1. About the Project & Vision
Inappropriate websites change domains constantly to bypass static blocklists. Furthermore, adult content written in local Arabic slang dialect is rarely blocked by international family filters. 

**FitraShield** fills this gap by providing an **Arabic-centric, 100% free, and hard-to-bypass** tool. The entire system runs **locally** on the user's machine without any external servers or registration. This guarantees **absolute privacy and top speed** for your family.

---

## 2. Key Features
* **Absolute Privacy:** No tracking pixels or browsing history ever leaves the device (Zero-Server Architecture).
* **Source Blocklist:** Instant block of thousands of global and Arab-focused adult websites.
* **Smart Keyword Engine:** Scans page titles and URLs for inappropriate terms in both Formal Arabic (Fusha) and regional dialects (Egyptian, Gulf, Maghrebi, Levantine) and intercepts loading instantly.
* **Anti-Bypass Lock:** Integrates with Windows Registry Policies to prevent kids from disabling or removing the extension, even in Incognito/InPrivate modes.
* **Encrypted Local Logging:** Saves records in a obfuscated local CSV file on the hard drive to prevent tampering. Computes daily attempts and peak hours.
* **Exceptions & Custom Categorization:** Allows whitelisting educational sites and creating custom categories (e.g., games, distractions).
* **SafeSearch Enforcement:** Forces SafeSearch on Google, Bing, DuckDuckGo, and restricted mode on YouTube.

---

## 3. System Architecture
The system works through a strict integration between the Browser Level (Chromium Extension) and the OS Level (Registry/Python helper):

```
┌─────────────────────────────────┐
│     Chromium Browser (Chrome/   │
│     Edge/Brave/Opera)           │
│     [ FitraShield (MV3) ]       │
└────────────────┬────────────────┘
                 │
       (Native Messaging API)
                 │
                 ▼
┌─────────────────────────────────┐      ┌─────────────────────────┐
│     Windows OS Layer            │ ───► │  Registry Policy (HKLM) │
│  [ helper.bat + helper.py ]     │      │   - Disable Incognito   │
│   (Local logging & app monitor) │      │   - Force Install Lock  │
└─────────────────────────────────┘      └─────────────────────────┘
```

---

## 4. File Structure & Purpose
Built using **JavaScript (Extension)** and **Python / Batch (OS integration)**:

| File Name | Type | Purpose |
|---|---|---|
| `manifest.json` | JSON | Defines extension properties, metadata, and browser permissions (Manifest V3). |
| `background.js` | JS | Background Service Worker — handles routing, DNR rulesets, dynamic blocking, and keep-alive. |
| `popup.html / .js` | HTML/JS | Simple toolbar popup containing quick login, statistics, and quick-block action. |
| `options.html / .js` | HTML/JS | Parent Control Panel (Dashboard) — manage logs, whitelists, categories, and settings. |
| `blocked.html` | HTML | Educational block screen redirected to when a child attempts to load a restricted page. |
| `rules.json` | JSON | Embedded static DeclarativeNetRequest blocklist rules containing thousands of domains. |
| `rules_safesearch.json` | JSON | DeclarativeNetRequest rules enforcing SafeSearch on search engines. |
| `keywords.json` | JSON | Preloaded Arabic slang and formal bad keywords categorizations. |
| `helper.py` | Python | Native messaging host that processes logs on the filesystem and terminates unmonitored browsers. |
| `helper.bat` | Batch | Launches the Python helper host script inside Windows. |
| `com.fitrashield.helper.json` | JSON | Chrome registry definition file allowing Chrome to connect to `helper.bat`. |
| `install.bat` | Batch | Prompts UAC Admin rights and triggers the setup script to enforce protection. |
| `install_shield.py` | Python | Enforces system-level registry policies (blocks incognito, blocks extension removal). |
| `uninstall_shield.py` | Python | Purges policies, removes registry entries, and unregisters the native helper. |
| `fix_local_test.bat` | Batch | Clears extension force-install registry keys to allow local unpacking and testing for developers. |
| `reset_browser_policies.bat` | Batch | Wipes Chrome and Edge HKLM policies to reset browsers to their default state. |
| `FitraShield_Documentation_v1.0.md` | MD | Comprehensive technical system architecture documentation. |
| `logo.png` | PNG | High-resolution transparent logo icon. |

---

## 5. Installation & Setup
### Step 1: Install the Extension Locally
1. Download this repository and unpack it in a permanent folder (e.g. `C:\FitraShield`).
2. Open Google Chrome or Microsoft Edge and navigate to the Extensions page (`chrome://extensions` or `edge://extensions`).
3. Enable **Developer Mode** toggle at the top right.
4. Click **Load unpacked** and select the project folder.
5. The extension is installed. Copy the **Extension ID** (a 32-letter lowercase string).

### Step 2: Enforce Registry OS Policies
1. Double-click the [install.bat](file:///c:/Users/ahmad/Desktop/FitraShield/install.bat) script.
2. Confirm the User Account Control (UAC) dialog requesting Administrator rights.
3. In the black console window, paste the **Extension ID** you copied in Step 1 and press Enter.
4. The helper will configure the registry keys to lock incognito modes and block removal of the extension.
5. Restart your browser. You will notice that "Incognito mode" is disabled and the extension "Remove" button is locked.

---

## 6. Current Drawbacks & Limitations
For engineering transparency, please note these limitations in the current V1.0 version:
* **Python Dependency:** The background logging and browser process monitor require Python installed on the host machine and added to system PATH.
* **Requires Admin Rights:** Setting up registry policies requires administrator rights. For effective security, the child's Windows account must be set to a **Standard User** to prevent them from executing registry overrides.
* **Browser Scope:** Fully protects Chromium-based browsers (Chrome, Edge, Brave, Opera). Firefox protection relies on closing the browser process entirely via the background helper rather than deep network filtering.
* **Local Control:** Logs and dashboard are kept completely local. The parent must physically open the child's PC to view logs; there is no remote cloud sync.

---

## 7. Future Roadmap
We aim to expand the project to protect all devices across the region:
- [ ] **Remove Python Dependency:** Re-write the native helper (`helper.py`) in **Go** or **Rust** and compile it to a tiny, standalone, zero-dependency executable (`.exe`). *(High priority for new developers)*
- [ ] **Local AI Classification (NLP/CV):** Integrate a lightweight local text-classification model and a computer vision model to detect and block explicit text and images/videos inside the browser frame in real-time.
- [ ] **Cloud Central Dashboard:** Securely sync encrypted logs to a centralized server and view them via a Flutter/Kotlin mobile companion app with instant parent notifications.
- [ ] **SaaS for Schools:** Offer packaged, easy-to-install policy systems for schools and educational institutions.

---

## 8. Contribution & Development Guide
We welcome developers, designers, and translators to contribute:

### How to develop locally:
1. Run [fix_local_test.bat](file:///c:/Users/ahmad/Desktop/FitraShield/fix_local_test.bat) as Administrator to clear the force-install lock, allowing you to update/remove the unpacked extension during development.
2. Make your edits to HTML, CSS, or JS files.
3. Refresh the extension on `chrome://extensions`.
4. **Contribution Ideas:**
   - Optimize connection protocols in `background.js`.
   - Write the Go/Rust native helper replacement.
   - Clean up and expand local Arabic dialects in `keywords.json`.
   - Refactor Options UI CSS to be more interactive and elegant.

---

## 9. Support the Project (Crucial)
**FitraShield** is 100% free and open-source, built purely for the benefit of the Ummah with no ads or limitations.

⚠️ **However, the developer faces financial barriers preventing wider adoption:**
1. **Chrome Web Store Fees:** We cannot afford the Developer registration fees to publish the extension officially, which would allow one-click installation instead of the manual "developer mode" steps.
2. **Server Hosting Costs:** We lack funding to purchase cloud servers to host the remote database, parent alerts system, and mobile app sync.

### How You Can Help:
* **⭐ Star this Repository:** Giving us a star on GitHub boosts visibility and helps search algorithms recommend this to families looking for child safety tools.
* **💸 Donate Directly:** Your support will fund developer fees, cloud database instances, and dedicated developer hours.
  * *You can donate to support store fees and server costs via:*
    * **PayPal:** `[Your PayPal Link or Email Here]`
    * **Buy Me a Coffee:** `[Your Buy Me a Coffee link here]`
    * **Vodafone Cash / InstaPay (Egypt):** `[Your Local Wallet Number Here]`
    * **Crypto Wallet:** `[USDT / BTC Address Here]`
* **🔊 Spread the Word:** Share this project on parenting groups, school forums, and digital safety communities.

---

## 10. License
Licensed under the **MIT License**. You are free to modify, deploy, and utilize this code for non-commercial and social good purposes.

<div align="center">

**"My translation is only from Allah; in Him I trust and to Him I turn."**

</div>
