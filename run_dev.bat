@echo off
echo ==============================================================================
echo   GRI Mobile Application — Complete Development Environment Startup
echo ==============================================================================
echo.

set JAVA_HOME=C:\Program Files\Eclipse Adoptium\jdk-17.0.20.8-hotspot
set ANDROID_HOME=C:\Users\vijay\AppData\Local\Android\Sdk
set PATH=%JAVA_HOME%\bin;%ANDROID_HOME%\platform-tools;%PATH%

echo [1/3] Starting FastAPI Backend Server (http://localhost:8000)...
start "GRI FastAPI Backend" cmd /k "cd /d "%~dp0" && set PYTHONPATH=. && uvicorn backend.app.main:app --reload --host 0.0.0.0 --port 8000"

echo [2/3] Setting up ADB USB Port Forwarding...
adb reverse tcp:8081 tcp:8081 > nul 2>&1
adb reverse tcp:8000 tcp:8000 > nul 2>&1

echo [3/3] Starting Expo Metro Bundler (React Native)...
start "GRI Expo Metro Bundler" cmd /k "cd /d "%~dp0" && npx expo start"

echo.
echo ==============================================================================
echo   GRI Development Environment is Running!
echo   - FastAPI API & WebSockets : http://localhost:8000
echo   - FastAPI Interactive Docs  : http://localhost:8000/docs
echo   - Expo Metro Bundler Dev    : http://localhost:8081
echo ==============================================================================
echo.
pause
