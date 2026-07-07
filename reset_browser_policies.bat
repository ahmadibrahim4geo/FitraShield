@echo off
:: فحص صلاحيات المسؤول
net session >nul 2>&1
if %errorLevel% == 0 (
    goto :run
) else (
    goto :elevate
)

:elevate
echo جاري طلب صلاحيات المسؤول لإعادة ضبط سياسات المتصفح...
powershell -Command "Start-Process '%~f0' -Verb RunAs"
exit /b

:run
cd /d "%~dp0"
echo جاري إزالة جميع السياسات الحالية لكروم وإيدج مؤقتاً لاستعادة ملفات التعريف...
reg delete HKEY_LOCAL_MACHINE\SOFTWARE\Policies\Google\Chrome /f
reg delete HKEY_LOCAL_MACHINE\SOFTWARE\Policies\Microsoft\Edge /f
echo.
echo ==========================================================
echo  ✅ تم إعادة ضبط المتصفحات بنجاح!
echo ==========================================================
echo  - تم إزالة قيود التصفح الخفي والسياسات مؤقتاً.
echo  - يمكنك الآن فتح متصفح Chrome و Edge واستخدام كافة البروفايلات بشكل طبيعي.
echo ==========================================================
echo.
pause
