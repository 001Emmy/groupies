@echo off
REM Setup script for local PostgreSQL development with Groupies

echo.
echo 🚀 Groupies PostgreSQL Setup
echo ============================
echo.

REM Check if PostgreSQL is installed
where psql >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ❌ PostgreSQL is not installed
    echo Please install PostgreSQL from: https://www.postgresql.org/download/
    pause
    exit /b 1
)

echo ✅ PostgreSQL found
echo.

REM Create database
echo Creating database 'groupies'...
psql -U postgres -c "CREATE DATABASE groupies;" 2>nul

if %ERRORLEVEL% EQU 0 (
    echo ✅ Database created successfully
) else (
    echo ⚠️  Database might already exist (that's okay^)
)

echo.
echo Setup Instructions:
echo ===================
echo.
echo 1. Update .env.local with your PostgreSQL credentials:
echo    DATABASE_URL="postgresql://username:password@localhost:5432/groupies"
echo.
echo 2. Run Prisma migrations:
echo    npx prisma migrate dev
echo.
echo 3. Start the development server:
echo    npm run dev
echo.
echo ✅ Setup complete!
echo.
pause
