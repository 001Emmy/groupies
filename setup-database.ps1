# Setup PostgreSQL Database for Groupies (Windows)
# Run this script after installing PostgreSQL

# Configuration
$DB_NAME = "groupies"
$DB_USER = "postgres"
$DB_HOST = "localhost"
$DB_PORT = "5432"

Write-Host "Setting up PostgreSQL database for Groupies..." -ForegroundColor Green

# Check if PostgreSQL is installed
$pgPath = "C:\Program Files\PostgreSQL\*\bin\psql.exe"
$psqlExe = Get-Item $pgPath -ErrorAction SilentlyContinue | Select-Object -First 1 -ExpandProperty FullName

if (-not $psqlExe) {
    Write-Host "PostgreSQL not found. Please install PostgreSQL first." -ForegroundColor Red
    Write-Host "Download from: https://www.postgresql.org/download/windows/" -ForegroundColor Yellow
    exit 1
}

Write-Host "Found PostgreSQL at: $psqlExe" -ForegroundColor Green

# Create database
Write-Host "Creating database '$DB_NAME'..." -ForegroundColor Cyan
$createDbCommand = @"
CREATE DATABASE $DB_NAME;
"@

# Execute via psql
$createDbCommand | & $psqlExe -U $DB_USER -h $DB_HOST -p $DB_PORT -w 2>&1

if ($LASTEXITCODE -eq 0 -or $LASTEXITCODE -eq 3) {
    Write-Host "Database setup complete!" -ForegroundColor Green
    Write-Host ""
    Write-Host "Next steps:" -ForegroundColor Green
    Write-Host "1. Update .env.local with your PostgreSQL password if needed"
    Write-Host "2. Run: npm run dev"
    Write-Host "3. The app will automatically run migrations on first start"
} else {
    Write-Host "Failed to create database. Check if PostgreSQL is running." -ForegroundColor Red
    exit 1
}
