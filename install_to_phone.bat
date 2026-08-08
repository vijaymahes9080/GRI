@echo off
echo ===================================================
echo   GRI Mobile - Push APK to Connected Phone (USB)
echo ===================================================
echo.

echo [1/3] Setting up USB reverse port forwarding (8081)...
adb reverse tcp:8081 tcp:8081
if %ERRORLEVEL% NEQ 0 (
    echo [WARNING] ADB reverse failed. Please check USB connection and unlock your phone.
)

echo.
echo [2/3] Installing APK onto connected Android phone...
adb install -r "%~dp0android\app\build\outputs\apk\debug\app-debug.apk"

if %ERRORLEVEL% EQU 0 (
    echo.
    echo [3/3] Opening GRI Mobile App on your phone...
    adb shell monkey -p in.ac.ruraluniv.gri -c android.intent.category.LAUNCHER 1 > nul 2>&1
    echo.
    echo SUCCESS: Application installed and launched cleanly!
    echo.
    echo Starting Metro bundler server...
    start "GRI Metro Bundler" cmd /k "npx expo start --localhost"
) else (
    echo.
    echo [ERROR] Installation failed. Ensure phone is unlocked and USB Debugging is enabled.
)

echo.
pause
