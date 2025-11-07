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

REM Test 1: Check if MySQL is accessible
echo Testing: MySQL is accessible...
mysql -u root --password="" -e "SELECT 1" >nul 2>nul
if %ERRORLEVEL% EQU 0 (
    echo [OK] PASS
    set /a TESTS_PASSED+=1
) else (
    mysql -u root -e "SELECT 1" >nul 2>nul
    if %ERRORLEVEL% EQU 0 (
        echo [OK] PASS
        set /a TESTS_PASSED+=1
    ) else (
        echo [FAIL] FAIL
        set /a TESTS_FAILED+=1
    )
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
for /f %%i in ('mysql -u root --password^=^"^" -sN -e "SELECT COUNT(*) FROM innovation_manager.users" 2^>nul') do set USER_COUNT=%%i
if not defined USER_COUNT (
    for /f %%i in ('mysql -u root -sN -e "SELECT COUNT(*) FROM innovation_manager.users" 2^>nul') do set USER_COUNT=%%i
)
if defined USER_COUNT (
    if !USER_COUNT! GEQ 6 (
        echo [OK] PASS (count: !USER_COUNT!^)
        set /a TESTS_PASSED+=1
    ) else (
        echo [FAIL] FAIL
        set /a TESTS_FAILED+=1
    )
) else (
    echo [FAIL] FAIL - Could not query database
    set /a TESTS_FAILED+=1
)

REM Test 6: Check database has initiatives
echo Testing: Database has initiatives...
for /f %%i in ('mysql -u root --password^=^"^" -sN -e "SELECT COUNT(*) FROM innovation_manager.initiatives" 2^>nul') do set INITIATIVE_COUNT=%%i
if not defined INITIATIVE_COUNT (
    for /f %%i in ('mysql -u root -sN -e "SELECT COUNT(*) FROM innovation_manager.initiatives" 2^>nul') do set INITIATIVE_COUNT=%%i
)
if defined INITIATIVE_COUNT (
    if !INITIATIVE_COUNT! GEQ 12 (
        echo [OK] PASS (count: !INITIATIVE_COUNT!^)
        set /a TESTS_PASSED+=1
    ) else (
        echo [FAIL] FAIL
        set /a TESTS_FAILED+=1
    )
) else (
    echo [FAIL] FAIL - Could not query database
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
