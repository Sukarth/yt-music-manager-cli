#!/bin/bash

# YT Music Manager GUI Launcher
# This script helps launch the Electron GUI application

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}╔════════════════════════════════════════╗${NC}"
echo -e "${GREEN}║   YT Music Manager GUI Launcher       ║${NC}"
echo -e "${GREEN}╚════════════════════════════════════════╝${NC}"
echo ""

# Check if we're in the gui directory
if [ ! -f "package.json" ]; then
    echo -e "${YELLOW}Not in gui directory. Attempting to change directory...${NC}"
    if [ -d "gui" ]; then
        cd gui
        echo -e "${GREEN}✓ Changed to gui directory${NC}"
    else
        echo -e "${RED}✗ Error: Cannot find gui directory${NC}"
        echo "  Please run this script from the project root or gui directory"
        exit 1
    fi
fi

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo -e "${RED}✗ Node.js is not installed${NC}"
    echo "  Please install Node.js from https://nodejs.org/"
    exit 1
fi

echo -e "${GREEN}✓ Node.js found: $(node --version)${NC}"

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo -e "${RED}✗ npm is not installed${NC}"
    echo "  Please install npm (usually comes with Node.js)"
    exit 1
fi

echo -e "${GREEN}✓ npm found: $(npm --version)${NC}"

# Check if Python is installed
if ! command -v python3 &> /dev/null && ! command -v python &> /dev/null; then
    echo -e "${YELLOW}⚠ Python not found in PATH${NC}"
    echo "  The GUI requires Python with yt-music-manager-cli installed"
    echo "  Please install Python 3.8+ from https://python.org/"
else
    if command -v python3 &> /dev/null; then
        PYTHON_VERSION=$(python3 --version)
    else
        PYTHON_VERSION=$(python --version)
    fi
    echo -e "${GREEN}✓ Python found: ${PYTHON_VERSION}${NC}"
fi

# Check if yt-music-manager-cli is installed
echo ""
echo "Checking for yt-music-manager-cli..."

if command -v ytmm &> /dev/null; then
    echo -e "${GREEN}✓ yt-music-manager-cli is installed${NC}"
elif python3 -c "import yt_music_manager_cli" 2>/dev/null || python -c "import yt_music_manager_cli" 2>/dev/null; then
    echo -e "${GREEN}✓ yt-music-manager-cli Python package found${NC}"
else
    echo -e "${YELLOW}⚠ yt-music-manager-cli is not installed${NC}"
    echo "  The GUI requires the CLI tool to be installed"
    echo ""
    echo "  Install with: pip install yt-music-manager-cli"
    echo ""
    read -p "Continue anyway? (y/n) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
fi

# Check if node_modules exists
echo ""
if [ ! -d "node_modules" ]; then
    echo -e "${YELLOW}⚠ Dependencies not installed${NC}"
    echo "  Installing dependencies..."
    npm install
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✓ Dependencies installed successfully${NC}"
    else
        echo -e "${RED}✗ Failed to install dependencies${NC}"
        exit 1
    fi
else
    echo -e "${GREEN}✓ Dependencies are installed${NC}"
fi

# Launch the application
echo ""
echo -e "${GREEN}Starting YT Music Manager GUI...${NC}"
echo ""

npm start
