@echo off
where python >nul 2>&1
if %ERRORLEVEL% neq 0 (
    echo [%DATE% %TIME%] FitraShield: Python is not installed or not in PATH. Native helper cannot start. >> "%~dp0error.log"
    exit /b 1
)
python "%~dp0helper.py" %*
