#!/bin/bash

# Ramadanly - Netlify Deployment Script

echo "🕌 Ramadanly - Deploying to Netlify"
echo "===================================="

# Check if netlify-cli is installed
if ! command -v netlify &> /dev/null
then
    echo "❌ Netlify CLI not found. Installing..."
    npm install -g netlify-cli
fi

# Build the project
echo ""
echo "📦 Building project..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
    
    # Deploy to Netlify
    echo ""
    echo "🚀 Deploying to Netlify..."
    netlify deploy --prod --dir=build
    
    if [ $? -eq 0 ]; then
        echo ""
        echo "✅ Deployment successful!"
        echo "🎉 Your Ramadanly app is now live!"
    else
        echo "❌ Deployment failed. Check the error above."
        exit 1
    fi
else
    echo "❌ Build failed. Please fix the errors and try again."
    exit 1
fi
