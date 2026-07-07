@echo off
:: فحص صلاحيات المسؤول
net session >nul 2>&1
if %errorLevel% == 0 (
    goto :run
) else (
    goto :elevate
)

:elevate
echo جاري طلب صلاحيات المسؤول لإصلاح اختفاء الإضافة...
powershell -Command "Start-Process '%~f0' -Verb RunAs"
exit /b

:run
cd /d "%~dp0"
echo جاري إزالة سياسة التثبيت الإجباري للسماح بالتجربة المحلية...
reg delete HKEY_LOCAL_MACHINE\SOFTWARE\Policies\Google\Chrome\ExtensionInstallForcelist /f
reg delete HKEY_LOCAL_MACHINE\SOFTWARE\Policies\Microsoft\Edge\ExtensionInstallForcelist /f
echo.
echo ==========================================================
echo  ✅ تم الإصلاح بنجاح!
echo ==========================================================
echo  1. تم السماح بإعادة تحميل الإضافة محلياً (Load unpacked).
echo  2. تم الإبقاء على قفل البحث الآمن وتصفح اليوتيوب المقيد.
echo  3. تم الإبقاء على قفل التصفح الخفي (Incognito).
echo ----------------------------------------------------------
echo  [*] يمكنك الآن العودة لـ chrome://extensions وإعادة إضافة
echo      المجلد (Load unpacked) وستعمل معك بكفاءة تامة.
echo ==========================================================
echo.
pause
