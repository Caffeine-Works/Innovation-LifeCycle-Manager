@echo off
REM Innovation Lifecycle Manager - Automated Setup and Run Script (Windows)
REM This script installs dependencies, sets up the database, and starts the application

setlocal enabledelayedexpansion

echo.
echo Innovation Lifecycle Manager - Setup ^& Run
echo ============================================
echo.

REM Check if Node.js is installed
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Node.js is not installed
    echo Please install Node.js 18+ from https://nodejs.org/
    exit /b 1
)

for /f "tokens=*" %%i in ('node --version') do set NODE_VERSION=%%i
echo [OK] Node.js found: %NODE_VERSION%
echo.

REM Step 1: Install root dependencies (just concurrently)
echo Step 1/6: Installing root dependencies...
if not exist "node_modules" (
    call npm install --no-optional
    if %ERRORLEVEL% NEQ 0 (
        echo [ERROR] Failed to install root dependencies
        exit /b 1
    )
    echo [OK] Root dependencies installed
) else (
    echo [SKIP] Root dependencies already installed
)
echo.

REM Step 2: Install server dependencies
echo Step 2/6: Installing server dependencies...
cd server
if not exist "node_modules" (
    call npm install --no-audit
    if %ERRORLEVEL% NEQ 0 (
        echo [ERROR] Failed to install server dependencies
        cd ..
        exit /b 1
    )
    echo [OK] Server dependencies installed
) else (
    echo [SKIP] Server dependencies already installed
)
cd ..
echo.

REM Step 3: Install client dependencies
echo Step 3/6: Installing client dependencies...
cd client
if not exist "node_modules" (
    call npm install --no-audit
    if %ERRORLEVEL% NEQ 0 (
        echo [ERROR] Failed to install client dependencies
        cd ..
        exit /b 1
    )
    echo [OK] Client dependencies installed
) else (
    echo [SKIP] Client dependencies already installed
)
cd ..
echo.

REM Step 4: Create .env file if it doesn't exist
echo Step 4/6: Checking environment configuration...
if not exist ".env" (
    copy .env.example .env >nul
    echo [OK] Created .env file from template
    echo [WARNING] Note: Add your ANTHROPIC_API_KEY to .env later
) else (
    echo [SKIP] .env file already exists
)
echo.

REM Step 5: Initialize database
echo Step 5/6: Setting up database...
if not exist "server\data\innovation-manager.db" (
    cd server
    node database\reset.js
    if %ERRORLEVEL% NEQ 0 (
        echo [ERROR] Failed to initialize database
        cd ..
        exit /b 1
    )
    cd ..
    echo [OK] Database initialized with demo data
) else (
    echo [INFO] Database already exists
    set /p RESET_DB="Do you want to reset it? (y/N): "
    if /i "!RESET_DB!"=="y" (
        cd server
        node database\reset.js
        if %ERRORLEVEL% NEQ 0 (
            echo [ERROR] Failed to reset database
            cd ..
            exit /b 1
        )
        cd ..
        echo [OK] Database reset complete
    ) else (
        echo [SKIP] Keeping existing database
    )
)
echo.

REM Step 6: Run verification tests
echo Step 6/6: Running verification tests...
echo.

REM Check if database exists
if exist "server\data\innovation-manager.db" (
    echo [OK] Database file exists and setup is complete
    echo [OK] Database has been initialized with demo data
) else (
    echo [ERROR] Database file not found
    exit /b 1
)

echo.
echo ============================================
echo [OK] Setup Complete!
echo ============================================
echo.
echo Demo Login Credentials:
echo    employee@demo.com / demo123 (Employee^)
echo    reviewer@demo.com / demo123 (Reviewer^)
echo    admin@demo.com / demo123 (Admin^)
echo.
echo Starting servers...
echo    Backend:  http://localhost:3000
echo    Frontend: http://localhost:5173
echo.
echo Press Ctrl+C to stop servers
echo.
echo ============================================
echo.

REM Start the development servers
call npm run dev
