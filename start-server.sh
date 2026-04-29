#!/bin/bash
# Mac/Linux shell script to start a local server for the portfolio
# Simply run: chmod +x start-server.sh && ./start-server.sh

echo "Starting local server for your portfolio..."
echo ""
echo "Your portfolio will be available at: http://localhost:8000"
echo ""
echo "Press Ctrl+C to stop the server"
echo ""

# Try Python 3 first (most common)
if command -v python3 &> /dev/null; then
    python3 -m http.server 8000
# Fall back to Python 2 if Python 3 is not available
elif command -v python &> /dev/null; then
    python -m SimpleHTTPServer 8000
else
    echo "Error: Python is not installed"
    echo "Please install Python from: https://www.python.org/downloads/"
    echo "Or use: brew install python3 (Mac) or sudo apt-get install python3 (Linux)"
    exit 1
fi
