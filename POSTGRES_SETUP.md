# 🗄️ PostgreSQL Local Setup Guide

This guide will help you set up PostgreSQL locally for Groupies development.

## 🚀 Quick Start

### Windows

1. **Install PostgreSQL:**
   - Download from: https://www.postgresql.org/download/windows/
   - Run installer
   - Remember the password you set for the `postgres` user
   - Keep default settings

2. **Run Setup Script:**
   ```bash
   .\setup-postgres.bat
   ```

3. **Update `.env.local`:**
   ```
   DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@localhost:5432/groupies"
   ```
   Replace `YOUR_PASSWORD` with the password you set during installation

4. **Run Migrations:**
   ```bash
   npx prisma migrate dev
   ```

5. **Start Development:**
   ```bash
   npm run dev
   ```

### macOS

1. **Install PostgreSQL (using Homebrew):**
   ```bash
   brew install postgresql@15
   brew services start postgresql@15
   ```

2. **Run Setup Script:**
   ```bash
   chmod +x setup-postgres.sh
   ./setup-postgres.sh
   ```

3. **Update `.env.local`:**
   ```
   DATABASE_URL="postgresql://YOUR_USER:YOUR_PASSWORD@localhost:5432/groupies"
   ```

4. **Run Migrations:**
   ```bash
   npx prisma migrate dev
   ```

5. **Start Development:**
   ```bash
   npm run dev
   ```

### Linux (Ubuntu/Debian)

1. **Install PostgreSQL:**
   ```bash
   sudo apt-get update
   sudo apt-get install postgresql postgresql-contrib
   sudo service postgresql start
   ```

2. **Create User and Database:**
   ```bash
   sudo -u postgres createdb groupies
   ```

3. **Update `.env.local`:**
   ```
   DATABASE_URL="postgresql://postgres:postgres@localhost:5432/groupies"
   ```

4. **Run Migrations:**
   ```bash
   npx prisma migrate dev
   ```

5. **Start Development:**
   ```bash
   npm run dev
   ```

## 📊 Verify Installation

### Check if PostgreSQL is Running

**Windows (PowerShell):**
```powershell
Get-Service PostgreSQL*
```

**macOS/Linux:**
```bash
sudo systemctl status postgresql
```

### Connect to Database

```bash
psql -U postgres -h localhost -d groupies
```

You should see the PostgreSQL prompt: `groupies=#`

Type `\dt` to see tables (should be empty initially)
Type `\q` to exit

## 🔄 Running Migrations

After setting up PostgreSQL:

```bash
# Create initial migration
npx prisma migrate dev --name init

# View migrations
npx prisma migrate status

# Reset database (deletes data!)
npx prisma migrate reset

# View database in UI
npx prisma studio
```

## 🐛 Troubleshooting

### "PostgreSQL connection refused"
- Ensure PostgreSQL service is running
- Windows: Check Services app for PostgreSQL
- macOS: `brew services list`
- Linux: `sudo systemctl status postgresql`

### "Permission denied for database"
- Wrong password in DATABASE_URL
- Check you have created the database
- Verify user has permissions

### "Database doesn't exist"
- Run setup script: `setup-postgres.bat` or `setup-postgres.sh`
- Or manually: `createdb groupies`

### "Port 5432 already in use"
- Another PostgreSQL instance is running
- Or another service is using the port
- Change port in DATABASE_URL: `localhost:5433`

## 🔐 Security for Development

⚠️ **Important for production:**
- Don't use default credentials
- Change `postgres` password
- Create separate user for application
- Use strong passwords
- Enable SSL connections

**For development only**, you can use simple credentials like:
```
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/groupies"
```

## 🔗 Useful PostgreSQL Commands

```bash
# Connect to database
psql -U postgres -d groupies

# List databases
\l

# List tables
\dt

# Describe table
\d table_name

# Exit
\q

# Reset password
ALTER USER postgres PASSWORD 'newpassword';
```

## 📈 Viewing Data with Prisma Studio

```bash
npx prisma studio
```

This opens a beautiful UI at `http://localhost:5555` where you can:
- View all data
- Create/edit/delete records
- See relationships
- Manage tables

## 🚀 Next Steps

Once PostgreSQL is set up:

1. ✅ Run `npx prisma migrate dev`
2. ✅ Start dev server: `npm run dev`
3. ✅ Open http://localhost:3000
4. ✅ Test the application
5. ✅ When ready, deploy to Vercel (see VERCEL_DEPLOYMENT.md)

## 📚 Additional Resources

- PostgreSQL Official: https://www.postgresql.org/docs/
- Prisma PostgreSQL: https://www.prisma.io/docs/reference/database-reference/connection-urls#postgresql
- pgAdmin (UI Tool): https://www.pgadmin.org/
- DBeaver (Database Tool): https://dbeaver.io/

---

Questions? Check the main README or VERCEL_DEPLOYMENT.md for Vercel-specific setup.
