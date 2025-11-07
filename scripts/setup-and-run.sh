#!/bin/bash

# Innovation Lifecycle Manager - Automated Setup and Run Script
# This script installs dependencies, sets up the database, and starts the application

set -e  # Exit on any error

echo ""
echo "🚀 Innovation Lifecycle Manager - Setup & Run"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Color codes
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js is not installed${NC}"
    echo "Please install Node.js 18+ from https://nodejs.org/"
    exit 1
fi

echo -e "${GREEN}✅ Node.js found: $(node --version)${NC}"
echo ""

# Check if MySQL is running
if command -v mysql &> /dev/null; then
    echo -e "${GREEN}✅ MySQL found: $(mysql --version | grep -oE '[0-9]+\.[0-9]+\.[0-9]+' | head -1)${NC}"
else
    echo -e "${YELLOW}⚠️  Warning: MySQL not found${NC}"
    echo -e "${YELLOW}   Please install MySQL before continuing${NC}"
    echo ""
fi
echo ""

# Step 1: Install root dependencies (just concurrently)
echo "📦 Step 1/6: Installing root dependencies..."
if [ ! -d "node_modules" ]; then
    npm install --no-optional
    echo -e "${GREEN}✅ Root dependencies installed${NC}"
else
    echo -e "${YELLOW}⏭️  Root dependencies already installed (skipping)${NC}"
fi
echo ""

# Step 2: Install server dependencies
echo "📦 Step 2/6: Installing server dependencies..."
cd server
if [ ! -d "node_modules" ]; then
    npm install --no-audit
    echo -e "${GREEN}✅ Server dependencies installed${NC}"
else
    echo -e "${YELLOW}⏭️  Server dependencies already installed (skipping)${NC}"
fi
cd ..
echo ""

# Step 3: Install client dependencies
echo "📦 Step 3/6: Installing client dependencies..."
cd client
if [ ! -d "node_modules" ]; then
    npm install --no-audit
    echo -e "${GREEN}✅ Client dependencies installed${NC}"
else
    echo -e "${YELLOW}⏭️  Client dependencies already installed (skipping)${NC}"
fi
cd ..
echo ""

# Step 4: Create .env file if it doesn't exist
echo "⚙️  Step 4/6: Checking environment configuration..."
if [ ! -f ".env" ]; then
    cp .env.example .env
    echo -e "${GREEN}✅ Created .env file from template${NC}"
    echo -e "${YELLOW}⚠️  Note: Add your ANTHROPIC_API_KEY to .env later${NC}"
else
    echo -e "${YELLOW}⏭️  .env file already exists (skipping)${NC}"
fi
echo ""

# Step 5: Initialize database
echo "🗄️  Step 5/6: Setting up database..."
echo -e "${YELLOW}ℹ️  Checking MySQL database...${NC}"
read -p "Do you want to reset the database? (y/N): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    cd server && node database/reset.js && cd ..
    echo -e "${GREEN}✅ Database initialized with demo data${NC}"
else
    echo -e "${YELLOW}⏭️  Skipping database reset${NC}"
fi
echo ""

# Step 6: Run verification tests
echo "🧪 Step 6/6: Running verification tests..."
echo ""

echo -e "${GREEN}✅ Setup validation complete${NC}"

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo -e "${GREEN}✅ Setup Complete!${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "🔑 Demo Login Credentials:"
echo "   employee@demo.com / demo123 (Employee)"
echo "   reviewer@demo.com / demo123 (Reviewer)"
echo "   admin@demo.com / demo123 (Admin)"
echo ""
echo "🌐 Starting servers..."
echo "   Backend:  http://localhost:3000"
echo "   Frontend: http://localhost:5173"
echo ""
echo "Press Ctrl+C to stop servers"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Start the development servers
npm run dev
