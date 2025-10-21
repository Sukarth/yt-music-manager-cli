@echo off
REM YT Music Manager GUI Launcher for Windows

echo ========================================
echo    YT Music Manager GUI Launcher
echo ========================================
echo.

REM Check if we're in the gui directory
if not exist "package.json" (
    echo Not in gui directory. Attempting to change directory...
    if exist "gui" (
        cd gui
        echo [OK] Changed to gui directory
    ) else (
        echo [ERROR] Cannot find gui directory
        echo Please run this script from the project root or gui directory
        pause
        exit /b 1
    )
)

REM Check if Node.js is installed
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Node.js is not installed
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)

for /f "tokens=*" %%i in ('node --version') do set NODE_VERSION=%%i
echo [OK] Node.js found: %NODE_VERSION%

REM Check if npm is installed
where npm >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] npm is not installed
    echo Please install npm (usually comes with Node.js)
    pause
    exit /b 1
)

for /f "tokens=*" %%i in ('npm --version') do set NPM_VERSION=%%i
echo [OK] npm found: %NPM_VERSION%

REM Check if Python is installed
where python >nul 2>nul
if %ERRORLEVEL% EQU 0 (
    for /f "tokens=*" %%i in ('python --version') do set PYTHON_VERSION=%%i
    echo [OK] Python found: %PYTHON_VERSION%
) else (
    echo [WARNING] Python not found in PATH
    echo The GUI requires Python with yt-music-manager-cli installed
    echo Please install Python 3.8+ from https://python.org/
)

REM Check if yt-music-manager-cli is installed
echo.
echo Checking for yt-music-manager-cli...

where ytmm >nul 2>nul
if %ERRORLEVEL% EQU 0 (
    echo [OK] yt-music-manager-cli is installed
) else (
    python -c "import yt_music_manager_cli" 2>nul
    if %ERRORLEVEL% EQU 0 (
        echo [OK] yt-music-manager-cli Python package found
    ) else (
        echo [WARNING] yt-music-manager-cli is not installed
        echo The GUI requires the CLI tool to be installed
        echo.
        echo Install with: pip install yt-music-manager-cli
        echo.
        set /p CONTINUE="Continue anyway? (y/n): "
        if /i not "%CONTINUE%"=="y" exit /b 1
    )
)

REM Check if node_modules exists
echo.
if not exist "node_modules" (
    echo [WARNING] Dependencies not installed
    echo Installing dependencies...
    call npm install
    if %ERRORLEVEL% EQU 0 (
        echo [OK] Dependencies installed successfully
    ) else (
        echo [ERROR] Failed to install dependencies
        pause
        exit /b 1
    )
) else (
    echo [OK] Dependencies are installed
)

REM Launch the application
echo.
echo Starting YT Music Manager GUI...
echo.

call npm start
