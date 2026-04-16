@echo off
setlocal
title AI Resume Builder Launcher

echo ==========================================
echo       AI Resume Builder Launcher
echo ==========================================

REM Start Backend using the robust PowerShell script
echo [INFO] Starting Backend Server (may take a moment to setup environment)...
start "AI Resume Backend" powershell -NoExit -ExecutionPolicy Bypass -File "backend\fix_backend_env.ps1"

REM Start Frontend
echo [INFO] Starting Frontend...
cd frontend
if not exist "node_modules" (
    echo [INFO] Installing dependencies...
    call npm install
)
start "AI Resume Frontend" cmd /k "npm run dev"

REM Wait and Open Browser
timeout /t 8 >nul
start http://localhost:5173

echo.
echo ==========================================
echo   Application is launching!
echo   Frontend: http://localhost:5173
echo   Backend:  http://localhost:8080
echo ==========================================
pause
