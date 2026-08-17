@echo off
setlocal enabledelayedexpansion

echo ==============================================================================
echo   GRI Mobile Application — Push Development APK to USB Device
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

echo [1/4] Setting up ADB USB reverse port forwarding ^(8081 ^& 8000^)...
adb devices | findstr /R /C:"device$" > nul 2>&1
if %ERRORLEVEL% EQU 0 (
    adb reverse tcp:8081 tcp:8081 > nul 2>&1
    adb reverse tcp:8000 tcp:8000 > nul 2>&1
    echo   - Port forwarding configured successfully.
) else (
    echo   - [WARNING] ADB reverse failed. Verify USB debugging is enabled and device is connected and unlocked.
)

set "DEBUG_APK=%ROOT_DIR%\android\app\build\outputs\apk\debug\app-debug.apk"
set "TARGET_APK=%ROOT_DIR%\android\app\build\outputs\apk\debug\app-debug-16kb.apk"
set "KEYSTORE=%ROOT_DIR%\android\app\debug.keystore"

echo.
echo [2/4] Checking and building Debug APK...
if not exist "%DEBUG_APK%" (
    echo   - Debug APK not found. Compiling Debug APK with Gradle...
    if exist "%TEMP%\metro-cache" rmdir /s /q "%TEMP%\metro-cache" > nul 2>&1
    pushd "%ROOT_DIR%\android"
    call .\gradlew.bat assembleDebug
    set "BUILD_STATUS=!ERRORLEVEL!"
    popd

    if !BUILD_STATUS! NEQ 0 (
        echo.
        echo [ERROR] Gradle debug build failed with exit code !BUILD_STATUS!.
        pause
        exit /b !BUILD_STATUS!
    )
)

echo.
echo [3/4] Aligning and Signing Debug APK for 16KB Page Boundaries...
if defined BUILD_TOOLS_DIR (
    if exist "%BUILD_TOOLS_DIR%\zipalign.exe" if exist "%BUILD_TOOLS_DIR%\apksigner.bat" (
        echo   - Aligning APK with zipalign ^(16KB^)...
        "%BUILD_TOOLS_DIR%\zipalign.exe" -f -p 16 "%DEBUG_APK%" "%TARGET_APK%"
        if !ERRORLEVEL! NEQ 0 (
            echo [WARNING] zipalign failed. Falling back to original debug APK.
            copy "%DEBUG_APK%" "%TARGET_APK%" /Y > nul
        ) else (
            echo   - Signing APK with debug keystore...
            call "%BUILD_TOOLS_DIR%\apksigner.bat" sign --ks "%KEYSTORE%" --ks-pass pass:android --key-pass pass:android "%TARGET_APK%"
            if !ERRORLEVEL! NEQ 0 (
                echo [WARNING] apksigner signing failed.
            )
        )
    ) else (
        echo [WARNING] zipalign tool not found. Using raw debug APK...
        copy "%DEBUG_APK%" "%TARGET_APK%" /Y > nul
    )
) else (
    echo [WARNING] Android build-tools not found. Using raw debug APK...
    copy "%DEBUG_APK%" "%TARGET_APK%" /Y > nul
)

echo.
echo [4/4] Installing Debug APK on connected device...
adb install -r -g "%TARGET_APK%"
set "INSTALL_STATUS=%ERRORLEVEL%"

if %INSTALL_STATUS% EQU 0 (
    echo.
    echo ==============================================================================
    echo   SUCCESS: App installed successfully! Starting Metro Bundler and launching App...
    echo ==============================================================================
    echo.
    start "GRI Metro Bundler" cmd /k "cd /d "%ROOT_DIR%" && npx expo start --localhost"
    echo Waiting for Metro server launch...
    timeout /t 3 /nobreak > nul
    adb shell am start -n in.ac.ruraluniv.gri/.MainActivity > nul 2>&1
    if !ERRORLEVEL! NEQ 0 (
        adb shell monkey -p in.ac.ruraluniv.gri -c android.intent.category.LAUNCHER 1 > nul 2>&1
    )
    echo.
    echo   TIP: If mobile screen shows script load error, wait 3 seconds and tap RELOAD.
) else (
    echo.
    echo [ERROR] Installation failed ^(code %INSTALL_STATUS%^). Ensure device is unlocked and USB Debugging is ON.
)

echo.
pause
