@echo off
title Product Signal AI Workspace
cd /d "%~dp0"

cls
echo ====================================================================
echo                   PRODUCT SIGNAL AI APPLICATION
echo           AI Decision Workspace for Customer Feedback
echo ====================================================================
echo.
echo  [*] Workspace: %~dp0
echo  [*] Starting Product Signal servers...
echo  [*] Opening http://localhost:5173 in your default browser...
echo.

:: 1. Launch default browser immediately
start http://localhost:5173

:: 2. Start Backend in background (port 5000)
if exist "backend\server.js" (
    if not exist "backend\.env.local" (
        if exist "backend\.env.example" (
            copy "backend\.env.example" "backend\.env.local" >nul
        )
    )
    start "Product Signal Backend API" /min cmd /c "cd /d \"%~dp0backend\" && node --watch server.js"
)

:: 3. Start Frontend directly on port 5173
cd /d "%~dp0frontend"
call npx vite --host --port 5173

echo.
echo [*] Server stopped.
pause
