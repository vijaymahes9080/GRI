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

echo [2/4] Performing 16KB Page Alignment and Signing (ELE Check)...
"%ANDROID_HOME%\build-tools\34.0.0\zipalign.exe" -f -p 4 "%~dp0android\app\build\outputs\apk\debug\app-debug.apk" "%~dp0android\app\build\outputs\apk\debug\app-debug-16kb.apk"
call "%ANDROID_HOME%\build-tools\34.0.0\apksigner.bat" sign --ks "%~dp0android\app\debug.keystore" --ks-pass pass:android --key-pass pass:android "%~dp0android\app\build\outputs\apk\debug\app-debug-16kb.apk"

echo.
echo [3/4] Setting up ADB USB reverse port (8081)...
adb reverse tcp:8081 tcp:8081

echo.
echo [4/4] Installing 16KB-aligned APK onto connected phone...
adb install -r "%~dp0android\app\build\outputs\apk\debug\app-debug-16kb.apk"

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
