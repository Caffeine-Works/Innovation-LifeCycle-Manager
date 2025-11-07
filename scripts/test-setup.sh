#!/bin/bash

# Test Script - Verifies the setup is working correctly
# Run this AFTER the servers are started (in a separate terminal)

echo ""
echo "🧪 Testing Innovation Lifecycle Manager Setup"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Color codes
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m'

TESTS_PASSED=0
TESTS_FAILED=0

# Test function
run_test() {
    local test_name=$1
    local test_command=$2

    echo -n "Testing: $test_name... "

    if eval "$test_command" &>/dev/null; then
        echo -e "${GREEN}✅ PASS${NC}"
        ((TESTS_PASSED++))
        return 0
    else
        echo -e "${RED}❌ FAIL${NC}"
        ((TESTS_FAILED++))
        return 1
    fi
}

# 1. Check if MySQL is running
run_test "MySQL is accessible" "mysql -u root --password='' -e 'SELECT 1' &> /dev/null || mysql -u root -e 'SELECT 1' &> /dev/null"

# 2. Check if backend is running
run_test "Backend health check" "curl -f -s http://localhost:3000/health > /dev/null"

# 3. Check if frontend is running
run_test "Frontend is accessible" "curl -f -s http://localhost:5173 > /dev/null"

# 4. Test API endpoint
if curl -f -s http://localhost:3000/api > /dev/null; then
    echo -e "Testing: API info endpoint... ${GREEN}✅ PASS${NC}"
    ((TESTS_PASSED++))
else
    echo -e "Testing: API info endpoint... ${RED}❌ FAIL${NC}"
    ((TESTS_FAILED++))
fi

# 5. Check database has users
USER_COUNT=$(mysql -u root --password='' -e "SELECT COUNT(*) as count FROM innovation_manager.users" -sN 2>/dev/null || mysql -u root -e "SELECT COUNT(*) as count FROM innovation_manager.users" -sN 2>/dev/null)
if [ -n "$USER_COUNT" ] && [ "$USER_COUNT" -ge 6 ]; then
    echo -e "Testing: Database has users (count: $USER_COUNT)... ${GREEN}✅ PASS${NC}"
    ((TESTS_PASSED++))
else
    echo -e "Testing: Database has users... ${RED}❌ FAIL${NC}"
    ((TESTS_FAILED++))
fi

# 6. Check database has initiatives
INITIATIVE_COUNT=$(mysql -u root --password='' -e "SELECT COUNT(*) as count FROM innovation_manager.initiatives" -sN 2>/dev/null || mysql -u root -e "SELECT COUNT(*) as count FROM innovation_manager.initiatives" -sN 2>/dev/null)
if [ -n "$INITIATIVE_COUNT" ] && [ "$INITIATIVE_COUNT" -ge 12 ]; then
    echo -e "Testing: Database has initiatives (count: $INITIATIVE_COUNT)... ${GREEN}✅ PASS${NC}"
    ((TESTS_PASSED++))
else
    echo -e "Testing: Database has initiatives... ${RED}❌ FAIL${NC}"
    ((TESTS_FAILED++))
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "Test Results:"
echo -e "${GREEN}✅ Passed: $TESTS_PASSED${NC}"
echo -e "${RED}❌ Failed: $TESTS_FAILED${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

if [ $TESTS_FAILED -eq 0 ]; then
    echo ""
    echo -e "${GREEN}🎉 All tests passed! Setup is working correctly.${NC}"
    echo ""
    echo "✅ You can now:"
    echo "   1. Open http://localhost:5173 in your browser"
    echo "   2. See the frontend connected to the backend"
    echo "   3. Commit this scaffolding to Git"
    echo ""
    exit 0
else
    echo ""
    echo -e "${RED}⚠️  Some tests failed. Please check:${NC}"
    echo "   1. Are the servers running? (npm run dev)"
    echo "   2. Are ports 3000 and 5173 available?"
    echo "   3. Did database initialization complete?"
    echo ""
    exit 1
fi
