@echo off
REM Ramadanly - Netlify Deployment Script for Windows

echo 🕌 Ramadanly - Deploying to Netlify
echo ====================================

REM Check if netlify-cli is installed
where netlify >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Netlify CLI not found. Installing...
    call npm install -g netlify-cli
)

REM Build the project
echo.
echo 📦 Building project...
call npm run build

if %ERRORLEVEL% EQU 0 (
    echo ✅ Build successful!
    
    REM Deploy to Netlify
    echo.
    echo 🚀 Deploying to Netlify...
    call netlify deploy --prod --dir=build
    
    if %ERRORLEVEL% EQU 0 (
        echo.
        echo ✅ Deployment successful!
        echo 🎉 Your Ramadanly app is now live!
    ) else (
        echo ❌ Deployment failed. Check the error above.
        exit /b 1
    )
) else (
    echo ❌ Build failed. Please fix the errors and try again.
    exit /b 1
)
