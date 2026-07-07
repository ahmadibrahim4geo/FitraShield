@echo off
:: فحص صلاحيات المسؤول
net session >nul 2>&1
if %errorLevel% == 0 (
    goto :run
) else (
    goto :elevate
)

:elevate
echo جاري طلب صلاحيات المسؤول لتثبيت درع الفطرة...
powershell -Command "Start-Process '%~f0' -Verb RunAs"
exit /b

:run
cd /d "%~dp0"
python install_shield.py
