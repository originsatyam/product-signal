@echo off
title Product Signal Application
cd /d "%~dp0"

cls
echo ====================================================================
echo                   PRODUCT SIGNAL AI APPLICATION
echo ====================================================================
echo.
echo  [*] Workspace: %~dp0
echo  [*] Starting Product Signal application...
echo.

:: 1. Check Node.js installation
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo [ERROR] Node.js is not installed or not added to PATH.
    echo Please install Node.js v18 or higher from https://nodejs.org/ and try again.
    echo.
    pause
    exit /b 1
)

:: 2. Check dependencies
if not exist node_modules (
    echo [*] Dependencies missing. Installing npm packages, please wait...
    call npm install
    if %errorlevel% neq 0 (
        echo [ERROR] Failed to install dependencies.
        pause
        exit /b 1
    )
    echo [*] Dependencies installed successfully!
    echo.
)

:: 3. Open browser at http://localhost:5173 after 3 seconds
echo [*] Starting Frontend (port 5173) and Backend (port 5000)...
echo [*] Opening http://localhost:5173 in your default browser...
echo.
start "" powershell -Command "Start-Sleep -Seconds 3; Start-Process 'http://localhost:5173'"

:: 4. Start servers
call npm run dev

pause
