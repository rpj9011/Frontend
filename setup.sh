#!/bin/bash

# Agency K - Setup Script
# This script helps you set up the project quickly

echo "🚀 Agency K - Setup Script"
echo "================================"
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

echo "✅ Node.js version: $(node -v)"
echo ""

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

echo "✅ npm version: $(npm -v)"
echo ""

# Install dependencies
echo "📦 Installing dependencies..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ Failed to install dependencies"
    exit 1
fi

echo "✅ Dependencies installed successfully"
echo ""

# Check if .env.local exists
if [ ! -f .env.local ]; then
    echo "📝 Creating .env.local from template..."
    cp .env.example .env.local
    echo "✅ .env.local created"
    echo ""
    echo "⚠️  IMPORTANT: Please edit .env.local with your credentials:"
    echo "   - MongoDB connection string"
    echo "   - SMTP email settings"
    echo "   - Admin email address"
    echo ""
else
    echo "✅ .env.local already exists"
    echo ""
fi

# Summary
echo "================================"
echo "✅ Setup Complete!"
echo ""
echo "Next steps:"
echo "1. Edit .env.local with your credentials"
echo "2. Run 'npm run dev' to start development server"
echo "3. Visit http://localhost:3000"
echo "4. Test the contact form at http://localhost:3000#contact"
echo ""
echo "📚 Documentation:"
echo "   - README.md - Quick start guide"
echo "   - DEPLOYMENT.md - Deployment instructions"
echo "   - DESIGN_SYSTEM.md - Design guidelines"
echo ""
echo "Need help? Check the documentation or contact hello@agencyk.in"
echo "================================"
