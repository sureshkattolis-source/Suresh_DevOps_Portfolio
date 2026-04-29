@echo off
REM Windows batch file to start a local server for the portfolio
REM Simply double-click this file to start the server!

echo Starting local server for your portfolio...
echo.
echo Windows will start a local web server.
echo Your portfolio will be available at: http://localhost:8000
echo.
echo Press Ctrl+C to stop the server
echo.

REM Try Python 3 first
python -m http.server 8000

REM If Python 3 fails, try Python 2
if errorlevel 1 (
    echo Trying Python 2...
    python -m SimpleHTTPServer 8000
)

REM If both fail, give instructions
if errorlevel 1 (
    echo.
    echo Error: Python is not installed or not in PATH
    echo Please install Python from: https://www.python.org/downloads/
    echo Make sure to check "Add Python to PATH" during installation
    echo.
    pause
)
