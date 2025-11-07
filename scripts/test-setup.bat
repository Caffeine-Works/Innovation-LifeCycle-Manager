@echo off
REM Test Script - Verifies the setup is working correctly (Windows)
REM Run this AFTER the servers are started (in a separate terminal)

setlocal enabledelayedexpansion

echo.
echo Testing Innovation Lifecycle Manager Setup
echo ============================================
echo.

set TESTS_PASSED=0
set TESTS_FAILED=0

REM Test 1: Check if database file exists
echo Testing: Database file exists...
if exist "server\data\innovation-manager.db" (
    echo [OK] PASS
    set /a TESTS_PASSED+=1
) else (
    echo [FAIL] FAIL
    set /a TESTS_FAILED+=1
)

REM Test 2: Check if backend is running
echo Testing: Backend health check...
curl -f -s http://localhost:3000/health >nul 2>nul
if %ERRORLEVEL% EQU 0 (
    echo [OK] PASS
    set /a TESTS_PASSED+=1
) else (
    echo [FAIL] FAIL
    set /a TESTS_FAILED+=1
)

REM Test 3: Check if frontend is running
echo Testing: Frontend is accessible...
curl -f -s http://localhost:5173 >nul 2>nul
if %ERRORLEVEL% EQU 0 (
    echo [OK] PASS
    set /a TESTS_PASSED+=1
) else (
    echo [FAIL] FAIL
    set /a TESTS_FAILED+=1
)

REM Test 4: Test API endpoint
echo Testing: API info endpoint...
curl -f -s http://localhost:3000/api >nul 2>nul
if %ERRORLEVEL% EQU 0 (
    echo [OK] PASS
    set /a TESTS_PASSED+=1
) else (
    echo [FAIL] FAIL
    set /a TESTS_FAILED+=1
)

REM Test 5: Check database has users
echo Testing: Database has users...
cd server
for /f "tokens=*" %%i in ('npx --yes better-sqlite3 data\innovation-manager.db "SELECT COUNT(*) as count FROM users" --json 2^>nul ^| findstr /r "\"count\":[0-9]*"') do set USER_OUTPUT=%%i
cd ..
REM Extract count value from JSON (simple parsing)
set USER_COUNT=0
for /f "tokens=2 delims=:" %%a in ("%USER_OUTPUT%") do (
    for /f "tokens=1 delims=," %%b in ("%%a") do set USER_COUNT=%%b
)
if !USER_COUNT! GEQ 6 (
    echo [OK] PASS (count: !USER_COUNT!^)
    set /a TESTS_PASSED+=1
) else (
    echo [FAIL] FAIL
    set /a TESTS_FAILED+=1
)

REM Test 6: Check database has initiatives
echo Testing: Database has initiatives...
cd server
for /f "tokens=*" %%i in ('npx --yes better-sqlite3 data\innovation-manager.db "SELECT COUNT(*) as count FROM initiatives" --json 2^>nul ^| findstr /r "\"count\":[0-9]*"') do set INITIATIVE_OUTPUT=%%i
cd ..
REM Extract count value from JSON (simple parsing)
set INITIATIVE_COUNT=0
for /f "tokens=2 delims=:" %%a in ("%INITIATIVE_OUTPUT%") do (
    for /f "tokens=1 delims=," %%b in ("%%a") do set INITIATIVE_COUNT=%%b
)
if !INITIATIVE_COUNT! GEQ 12 (
    echo [OK] PASS (count: !INITIATIVE_COUNT!^)
    set /a TESTS_PASSED+=1
) else (
    echo [FAIL] FAIL
    set /a TESTS_FAILED+=1
)

echo.
echo ============================================
echo Test Results:
echo [OK] Passed: %TESTS_PASSED%
echo [FAIL] Failed: %TESTS_FAILED%
echo ============================================

if %TESTS_FAILED% EQU 0 (
    echo.
    echo [OK] All tests passed! Setup is working correctly.
    echo.
    echo You can now:
    echo    1. Open http://localhost:5173 in your browser
    echo    2. See the frontend connected to the backend
    echo    3. Commit this scaffolding to Git
    echo.
    exit /b 0
) else (
    echo.
    echo [WARNING] Some tests failed. Please check:
    echo    1. Are the servers running? (npm run dev^)
    echo    2. Are ports 3000 and 5173 available?
    echo    3. Did database initialization complete?
    echo.
    exit /b 1
)
