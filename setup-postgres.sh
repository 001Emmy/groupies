#!/bin/bash

# Setup script for local PostgreSQL development with Groupies

echo "🚀 Groupies PostgreSQL Setup"
echo "============================"
echo ""

# Check if PostgreSQL is installed
if ! command -v psql &> /dev/null
then
    echo "❌ PostgreSQL is not installed"
    echo "Please install PostgreSQL from: https://www.postgresql.org/download/"
    exit 1
fi

echo "✅ PostgreSQL found"
echo ""

# Create database
echo "Creating database 'groupies'..."
createdb groupies 2>/dev/null

if [ $? -eq 0 ]; then
    echo "✅ Database created successfully"
else
    echo "⚠️  Database might already exist (that's okay)"
fi

echo ""
echo "Setup Instructions:"
echo "===================="
echo ""
echo "1. Update .env.local with your PostgreSQL credentials:"
echo "   DATABASE_URL=\"postgresql://username:password@localhost:5432/groupies\""
echo ""
echo "2. Run Prisma migrations:"
echo "   npx prisma migrate dev"
echo ""
echo "3. Start the development server:"
echo "   npm run dev"
echo ""
echo "✅ Setup complete!"
