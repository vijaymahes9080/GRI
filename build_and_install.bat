@echo off
echo ==============================================================================
echo   GRI Mobile Application — USB Release APK Build & Deployment
echo ==============================================================================
echo.

set JAVA_HOME=C:\Program Files\Eclipse Adoptium\jdk-17.0.20.8-hotspot
set ANDROID_HOME=C:\Users\vijay\AppData\Local\Android\Sdk
set PATH=%JAVA_HOME%\bin;%ANDROID_HOME%\platform-tools;%ANDROID_HOME%\build-tools\34.0.0;%PATH%

echo [1/4] Checking environment configuration...
if not exist "%~dp0android\gradlew.bat" (
    echo [ERROR] Android project directory not found at %~dp0android
    pause
    exit /b 1
)

echo.
echo [2/4] Building Standalone Release APK with Gradle...
cd /d "%~dp0android"
call .\gradlew.bat assembleRelease

if %ERRORLEVEL% NEQ 0 (
    echo.
    echo [ERROR] Gradle release build failed. Inspect output above for errors.
    pause
    exit /b %ERRORLEVEL%
)

echo.
echo [3/4] Performing 16KB Page Boundary Alignment & Keystore Signing...
if exist "%ANDROID_HOME%\build-tools\34.0.0\zipalign.exe" (
    "%ANDROID_HOME%\build-tools\34.0.0\zipalign.exe" -f -p 16 "%~dp0android\app\build\outputs\apk\release\app-release.apk" "%~dp0android\app\build\outputs\apk\release\app-release-16kb.apk"
    call "%ANDROID_HOME%\build-tools\34.0.0\apksigner.bat" sign --ks "%~dp0android\app\debug.keystore" --ks-pass pass:android --key-pass pass:android "%~dp0android\app\build\outputs\apk\release\app-release-16kb.apk"
) else (
    echo [WARNING] zipalign tool not found at %ANDROID_HOME%\build-tools\34.0.0. Using standard APK...
    copy "%~dp0android\app\build\outputs\apk\release\app-release.apk" "%~dp0android\app\build\outputs\apk\release\app-release-16kb.apk" /Y
)

echo.
echo [4/4] Deploying Standalone APK to connected Android device...
adb install --user 0 -r -g "%~dp0android\app\build\outputs\apk\release\app-release-16kb.apk"

if %ERRORLEVEL% EQU 0 (
    echo.
    adb shell am start -n in.ac.ruraluniv.gri/.MainActivity > nul 2>&1
    echo ==============================================================================
    echo   SUCCESS: Standalone Release APK deployed to connected device!
    echo ==============================================================================
) else (
    echo.
    echo [ERROR] ADB installation failed. Ensure USB Debugging is enabled on your phone.
)

echo.
pause
