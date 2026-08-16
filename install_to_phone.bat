@echo off
echo ==============================================================================
echo   GRI Mobile Application — Push Development APK to USB Device
echo ==============================================================================
echo.

set ANDROID_HOME=C:\Users\vijay\AppData\Local\Android\Sdk
set PATH=%ANDROID_HOME%\platform-tools;%ANDROID_HOME%\build-tools\34.0.0;%PATH%

echo [1/4] Setting up ADB USB reverse port forwarding (8081 & 8000)...
adb reverse tcp:8081 tcp:8081
adb reverse tcp:8000 tcp:8000

if %ERRORLEVEL% NEQ 0 (
    echo [WARNING] ADB reverse failed. Verify USB debugging is enabled and device is unlocked.
)

echo.
echo [2/4] Aligning and Signing Debug APK for 16KB Page Boundaries...
if exist "%~dp0android\app\build\outputs\apk\debug\app-debug.apk" (
    "%ANDROID_HOME%\build-tools\34.0.0\zipalign.exe" -f -p 16 "%~dp0android\app\build\outputs\apk\debug\app-debug.apk" "%~dp0android\app\build\outputs\apk\debug\app-debug-16kb.apk"
    call "%ANDROID_HOME%\build-tools\34.0.0\apksigner.bat" sign --ks "%~dp0android\app\debug.keystore" --ks-pass pass:android --key-pass pass:android "%~dp0android\app\build\outputs\apk\debug\app-debug-16kb.apk"
    
    echo.
    echo [3/4] Installing Debug APK on connected device...
    adb install -r "%~dp0android\app\build\outputs\apk\debug\app-debug-16kb.apk"
) else (
    echo [INFO] Debug APK not found. Building debug APK first...
    cd /d "%~dp0android"
    call .\gradlew.bat assembleDebug
    adb install -r "%~dp0android\app\build\outputs\apk\debug\app-debug.apk"
)

if %ERRORLEVEL% EQU 0 (
    echo.
    echo [4/4] Starting Metro Bundler and launching GRI Mobile App...
    start "GRI Metro Bundler" cmd /k "npx expo start --localhost"
    ping 127.0.0.1 -n 4 > nul
    adb shell monkey -p in.ac.ruraluniv.gri -c android.intent.category.LAUNCHER 1 > nul 2>&1
    echo.
    echo ==============================================================================
    echo   SUCCESS: App installed and launched!
    echo   TIP: If screen shows script load error, wait 3 seconds and tap RELOAD.
    echo ==============================================================================
) else (
    echo.
    echo [ERROR] Installation failed. Ensure device is unlocked and USB Debugging is ON.
)

echo.
pause
