#!/bin/bash

# Angular Microfrontend Startup Script
echo "🚀 Starting Angular Microfrontend Demo"
echo "======================================"

# Check if we're in the correct directory
if [ ! -f "README.md" ]; then
    echo "❌ Please run this script from the project root directory"
    exit 1
fi

# Start Child App (Microfrontend) in the background
echo "📦 Starting Child App (Port 4201)..."
cd child-app
npm start &
CHILD_PID=$!
cd ..

# Wait a moment for child app to start
sleep 5

# Start Shell App
echo "🏠 Starting Shell App (Port 4200)..."
cd shell-app
npm start &
SHELL_PID=$!
cd ..

echo ""
echo "✅ Both applications are starting!"
echo ""
echo "🌐 Shell App (Host):  http://localhost:4200"
echo "📦 Child App (Remote): http://localhost:4201"
echo ""
echo "📝 Open http://localhost:4200 in your browser to see the microfrontend in action!"
echo ""
echo "To stop both apps, press Ctrl+C"
echo ""

# Function to cleanup processes
cleanup() {
    echo ""
    echo "🛑 Shutting down applications..."
    kill $CHILD_PID $SHELL_PID 2>/dev/null
    exit 0
}

# Set trap to cleanup on script exit
trap cleanup INT TERM

# Wait for both processes
wait $CHILD_PID $SHELL_PID