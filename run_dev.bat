@echo off
setlocal enabledelayedexpansion

echo ==============================================================================
echo   GRI Mobile Application — Complete Development Environment Startup
echo ==============================================================================
echo.

:: Normalize root directory path (stripping trailing backslash to prevent quote escaping bugs)
set "ROOT_DIR=%~dp0"
if "%ROOT_DIR:~-1%"=="\" set "ROOT_DIR=%ROOT_DIR:~0,-1%"

:: Allocate increased Node.js heap memory to prevent Metro Bundler OOM crashes
set "NODE_OPTIONS=--max-old-space-size=8192"

:: 1. Setup ANDROID_HOME
if not defined ANDROID_HOME (
    if exist "%LOCALAPPDATA%\Android\Sdk" (
        set "ANDROID_HOME=%LOCALAPPDATA%\Android\Sdk"
    )
)

:: 2. Setup JAVA_HOME
set "VALID_JDK="
if defined JAVA_HOME (
    if exist "%JAVA_HOME%\bin\java.exe" set "VALID_JDK=%JAVA_HOME%"
)

if not defined VALID_JDK (
    if exist "C:\Program Files\Eclipse Adoptium\jdk-17.0.20.8-hotspot\bin\java.exe" (
        set "VALID_JDK=C:\Program Files\Eclipse Adoptium\jdk-17.0.20.8-hotspot"
    ) else if exist "%ANDROID_HOME%\jbr\bin\java.exe" (
        set "VALID_JDK=%ANDROID_HOME%\jbr"
    ) else if exist "%ProgramFiles%\Android\Android Studio\jbr\bin\java.exe" (
        set "VALID_JDK=%ProgramFiles%\Android\Android Studio\jbr"
    )
)

if defined VALID_JDK (
    set "JAVA_HOME=%VALID_JDK%"
)

if defined ANDROID_HOME (
    set "PATH=%JAVA_HOME%\bin;%ANDROID_HOME%\platform-tools;%PATH%"
) else if defined JAVA_HOME (
    set "PATH=%JAVA_HOME%\bin;%PATH%"
)

:: Detect Python Virtual Environment if available
set "ACTIVATE_VENV="
if exist "%ROOT_DIR%\.venv\Scripts\activate.bat" (
    set "ACTIVATE_VENV=call "%ROOT_DIR%\.venv\Scripts\activate.bat" && "
) else if exist "%ROOT_DIR%\venv\Scripts\activate.bat" (
    set "ACTIVATE_VENV=call "%ROOT_DIR%\venv\Scripts\activate.bat" && "
)

echo [1/3] Starting FastAPI Backend Server (http://localhost:8000)...
start "GRI FastAPI Backend" cmd /k "cd /d "%ROOT_DIR%" && !ACTIVATE_VENV!set PYTHONPATH=. && python -m uvicorn backend.app.main:app --reload --host 0.0.0.0 --port 8000"

echo [2/3] Setting up ADB USB Port Forwarding...
adb devices | findstr /R /C:"device$" > nul 2>&1
if %ERRORLEVEL% EQU 0 (
    adb reverse tcp:8081 tcp:8081 > nul 2>&1
    adb reverse tcp:8000 tcp:8000 > nul 2>&1
    echo   - ADB reverse port forwarding ^(ports 8081 and 8000^) active.
) else (
    echo   - [WARNING] No USB ADB device detected. Connect phone and enable USB debugging for live testing.
)

echo [3/3] Starting Expo Metro Bundler (React Native)...
start "GRI Expo Metro Bundler" cmd /k "cd /d "%ROOT_DIR%" && npx expo start"

echo.
echo ==============================================================================
echo   GRI Development Environment is Running!
echo   - FastAPI API ^& WebSockets : http://localhost:8000
echo   - FastAPI Interactive Docs  : http://localhost:8000/docs
echo   - Expo Metro Bundler Dev    : http://localhost:8081
echo ==============================================================================
echo.
pause
