# Agency K - Setup Script (PowerShell)
# This script helps you set up the project quickly on Windows

Write-Host "🚀 Agency K - Setup Script" -ForegroundColor Cyan
Write-Host "================================" -ForegroundColor Cyan
Write-Host ""

# Check if Node.js is installed
try {
    $nodeVersion = node -v
    Write-Host "✅ Node.js version: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Node.js is not installed. Please install Node.js 18+ first." -ForegroundColor Red
    exit 1
}

Write-Host ""

# Check if npm is installed
try {
    $npmVersion = npm -v
    Write-Host "✅ npm version: $npmVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ npm is not installed. Please install npm first." -ForegroundColor Red
    exit 1
}

Write-Host ""

# Install dependencies
Write-Host "📦 Installing dependencies..." -ForegroundColor Yellow
npm install

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Failed to install dependencies" -ForegroundColor Red
    exit 1
}

Write-Host "✅ Dependencies installed successfully" -ForegroundColor Green
Write-Host ""

# Check if .env.local exists
if (-not (Test-Path .env.local)) {
    Write-Host "📝 Creating .env.local from template..." -ForegroundColor Yellow
    Copy-Item .env.example .env.local
    Write-Host "✅ .env.local created" -ForegroundColor Green
    Write-Host ""
    Write-Host "⚠️  IMPORTANT: Please edit .env.local with your credentials:" -ForegroundColor Yellow
    Write-Host "   - MongoDB connection string"
    Write-Host "   - SMTP email settings"
    Write-Host "   - Admin email address"
    Write-Host ""
} else {
    Write-Host "✅ .env.local already exists" -ForegroundColor Green
    Write-Host ""
}

# Summary
Write-Host "================================" -ForegroundColor Cyan
Write-Host "✅ Setup Complete!" -ForegroundColor Green
Write-Host ""
Write-Host "Next steps:"
Write-Host "1. Edit .env.local with your credentials"
Write-Host "2. Run 'npm run dev' to start development server"
Write-Host "3. Visit http://localhost:3000"
Write-Host "4. Test the contact form at http://localhost:3000#contact"
Write-Host ""
Write-Host "📚 Documentation:"
Write-Host "   - README.md - Quick start guide"
Write-Host "   - DEPLOYMENT.md - Deployment instructions"
Write-Host "   - DESIGN_SYSTEM.md - Design guidelines"
Write-Host ""
Write-Host "Need help? Check the documentation or contact hello@agencyk.in"
Write-Host "================================" -ForegroundColor Cyan
