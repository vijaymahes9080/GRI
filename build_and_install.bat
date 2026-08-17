@echo off
setlocal enabledelayedexpansion

echo ==============================================================================
echo   GRI Mobile Application — USB Release APK Build ^& Deployment
echo ==============================================================================
echo.

:: Normalize root directory path (stripping trailing backslash to prevent quote escaping bugs)
set "ROOT_DIR=%~dp0"
if "%ROOT_DIR:~-1%"=="\" set "ROOT_DIR=%ROOT_DIR:~0,-1%"

:: 1. Setup ANDROID_HOME
if not defined ANDROID_HOME (
    if exist "%LOCALAPPDATA%\Android\Sdk" (
        set "ANDROID_HOME=%LOCALAPPDATA%\Android\Sdk"
    )
)

if not exist "%ANDROID_HOME%" (
    echo [ERROR] Android SDK not found at "%ANDROID_HOME%".
    echo Please set ANDROID_HOME environment variable to your Android SDK location.
    pause
    exit /b 1
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

if not defined VALID_JDK (
    echo [ERROR] JDK 17 / Java environment not found.
    echo Please install JDK 17 or set JAVA_HOME environment variable.
    pause
    exit /b 1
)

set "JAVA_HOME=%VALID_JDK%"

:: 3. Detect Latest Build-Tools Directory
set "BUILD_TOOLS_DIR="
for /f "tokens=*" %%D in ('dir /b /a:d /o:-n "%ANDROID_HOME%\build-tools" 2^>nul') do (
    if not defined BUILD_TOOLS_DIR (
        if exist "%ANDROID_HOME%\build-tools\%%D\zipalign.exe" (
            set "BUILD_TOOLS_DIR=%ANDROID_HOME%\build-tools\%%D"
        )
    )
)

set "PATH=%JAVA_HOME%\bin;%ANDROID_HOME%\platform-tools;%BUILD_TOOLS_DIR%;%PATH%"

echo [1/4] Checking environment configuration...
echo   - Root Directory : "%ROOT_DIR%"
echo   - JAVA_HOME      : "%JAVA_HOME%"
echo   - ANDROID_HOME   : "%ANDROID_HOME%"
echo   - Build-Tools    : "%BUILD_TOOLS_DIR%"
echo.

if not exist "%ROOT_DIR%\android\gradlew.bat" (
    echo [ERROR] Android project directory not found at "%ROOT_DIR%\android"
    pause
    exit /b 1
)

:: Clean stale Metro cache to prevent Windows EPERM permission locks
if exist "%TEMP%\metro-cache" rmdir /s /q "%TEMP%\metro-cache" > nul 2>&1

echo [2/4] Building Standalone Release APK with Gradle...
pushd "%ROOT_DIR%\android"
call .\gradlew.bat assembleRelease
set "BUILD_STATUS=%ERRORLEVEL%"
popd

if %BUILD_STATUS% NEQ 0 (
    echo.
    echo [ERROR] Gradle release build failed with exit code %BUILD_STATUS%.
    pause
    exit /b %BUILD_STATUS%
)

set "RELEASE_APK=%ROOT_DIR%\android\app\build\outputs\apk\release\app-release.apk"
set "TARGET_APK=%ROOT_DIR%\android\app\build\outputs\apk\release\app-release-16kb.apk"
set "KEYSTORE=%ROOT_DIR%\android\app\debug.keystore"

if not exist "%RELEASE_APK%" (
    echo [ERROR] Release APK was not found at "%RELEASE_APK%"
    pause
    exit /b 1
)

echo.
echo [3/4] Performing 16KB Page Boundary Alignment ^& Keystore Signing...
if defined BUILD_TOOLS_DIR (
    if exist "%BUILD_TOOLS_DIR%\zipalign.exe" if exist "%BUILD_TOOLS_DIR%\apksigner.bat" (
        echo   - Aligning APK with zipalign ^(16KB^)...
        "%BUILD_TOOLS_DIR%\zipalign.exe" -f -p 16 "%RELEASE_APK%" "%TARGET_APK%"
        if !ERRORLEVEL! NEQ 0 (
            echo [WARNING] zipalign failed. Falling back to original APK.
            copy "%RELEASE_APK%" "%TARGET_APK%" /Y > nul
        ) else (
            echo   - Signing APK with debug keystore...
            call "%BUILD_TOOLS_DIR%\apksigner.bat" sign --ks "%KEYSTORE%" --ks-pass pass:android --key-pass pass:android "%TARGET_APK%"
            if !ERRORLEVEL! NEQ 0 (
                echo [WARNING] apksigner signing failed.
            )
        )
    ) else (
        echo [WARNING] zipalign or apksigner not found in "%BUILD_TOOLS_DIR%". Using standard APK...
        copy "%RELEASE_APK%" "%TARGET_APK%" /Y > nul
    )
) else (
    echo [WARNING] Android build-tools not found. Using standard APK...
    copy "%RELEASE_APK%" "%TARGET_APK%" /Y > nul
)

echo.
echo [4/4] Deploying Standalone APK to connected Android device...
adb devices | findstr /R /C:"device$" > nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo [WARNING] No authorized ADB device found connected via USB.
    echo Please connect your phone, enable USB Debugging, and accept the prompt on screen.
)

adb install -r -g "%TARGET_APK%"
if %ERRORLEVEL% EQU 0 (
    echo.
    adb shell am start -n in.ac.ruraluniv.gri/.MainActivity > nul 2>&1
    echo ==============================================================================
    echo   SUCCESS: Standalone Release APK deployed to connected device!
    echo ==============================================================================
) else (
    echo.
    echo [ERROR] ADB installation failed. Ensure USB Debugging is enabled and device is unlocked.
)

echo.
pause
