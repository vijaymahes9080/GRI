@echo off
echo ===================================================
echo   GRI Mobile - Full Build and Push to Phone (USB)
echo ===================================================
echo.

set JAVA_HOME=C:\Program Files\Eclipse Adoptium\jdk-17.0.20.8-hotspot
set ANDROID_HOME=C:\Users\vijay\AppData\Local\Android\Sdk

echo [1/3] Building Debug APK with Gradle...
cd /d "%~dp0android"
call .\gradlew.bat assembleDebug

if %ERRORLEVEL% NEQ 0 (
    echo.
    echo [ERROR] Build failed! Check errors above.
    pause
    exit /b %ERRORLEVEL%
)

echo.
echo [2/3] Setting up ADB USB reverse port (8081)...
adb reverse tcp:8081 tcp:8081

echo.
echo [3/3] Installing APK onto connected phone...
adb install -r "%~dp0android\app\build\outputs\apk\debug\app-debug.apk"

if %ERRORLEVEL% EQU 0 (
    echo.
    echo Launching GRI Mobile app...
    adb shell monkey -p in.ac.ruraluniv.gri -c android.intent.category.LAUNCHER 1 > nul 2>&1
    echo.
    echo SUCCESS: Build and USB deployment completed!
) else (
    echo.
    echo [ERROR] Installation failed. Ensure phone is connected with USB Debugging enabled.
)

echo.
pause
