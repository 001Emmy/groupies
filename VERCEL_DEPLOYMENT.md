# 🚀 Deploy Groupies to Vercel

Complete guide to deploy Groupies on Vercel so you can share it with your team!

## ✅ Prerequisites

- GitHub account (https://github.com)
- Vercel account (free, https://vercel.com)
- OpenAI API key (https://platform.openai.com/api-keys)
- PostgreSQL database (we'll use Neon - free tier available)

## 📋 Step-by-Step Deployment Guide

### Step 1: Push to GitHub

1. **Initialize Git (if not already done):**
   ```bash
   cd c:\Users\user\Desktop\test\groupies
   git init
   git add .
   git commit -m "Initial Groupies commit"
   ```

2. **Create GitHub Repository:**
   - Go to https://github.com/new
   - Name it `groupies`
   - Don't initialize with README (we have one)
   - Click "Create repository"

3. **Add Remote and Push:**
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/groupies.git
   git branch -M main
   git push -u origin main
   ```

### Step 2: Set Up PostgreSQL Database

We recommend **Neon** (free tier, generous limits):

1. **Create Neon Account:**
   - Go to https://neon.tech
   - Click "Sign Up"
   - Use your GitHub account for easy signup

2. **Create New Project:**
   - Click "New Project"
   - Name it `groupies`
   - Choose region closest to you
   - Click "Create project"

3. **Get Connection String:**
   - In project dashboard, copy the connection string
   - Format: `postgresql://user:password@host/dbname`
   - **Save this somewhere safe** - you'll need it for Vercel

4. **Create Database Locally (Optional):**
   If you want to test locally with PostgreSQL:
   - Install PostgreSQL locally
   - Create database: `createdb groupies`
   - Update `.env.local` with your local connection string

### Step 3: Deploy to Vercel

1. **Connect GitHub to Vercel:**
   - Go to https://vercel.com
   - Sign in with GitHub
   - Click "Import Git Repository"
   - Find your `groupies` repository
   - Click "Import"

2. **Configure Project:**
   - **Project Name:** `groupies` (or your preferred name)
   - **Framework Preset:** Next.js
   - **Root Directory:** `./` (default)
   - Click "Continue"

3. **Add Environment Variables:**
   - In the "Environment Variables" section, add:

   ```
   DATABASE_URL = postgresql://user:password@host/dbname
   OPENAI_API_KEY = sk-your-api-key-here
   NEXT_PUBLIC_API_URL = https://your-app.vercel.app
   ```

   **How to get these:**
   - `DATABASE_URL`: From Neon (Step 2 above)
   - `OPENAI_API_KEY`: From https://platform.openai.com/api-keys
   - `NEXT_PUBLIC_API_URL`: Use your Vercel URL (we'll get it after deploy)

4. **Deploy:**
   - Click "Deploy"
   - Wait for deployment to complete (~3-5 minutes)
   - You'll see a success page with your app URL

5. **Update Environment Variable:**
   - Go to Vercel Project Settings → Environment Variables
   - Update `NEXT_PUBLIC_API_URL` with your actual Vercel URL
   - Redeploy: Click "Deployments" → "..." on latest → "Redeploy"

### Step 4: Run Migrations on Vercel

After deployment, you need to create the database tables:

**Option A: Using Vercel CLI (Recommended)**

1. **Install Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

2. **Connect to your Vercel project:**
   ```bash
   vercel link
   ```

3. **Run migrations:**
   ```bash
   vercel env pull  # Gets your environment variables locally
   npx prisma migrate deploy
   ```

**Option B: Manual Migration**

1. Add to your `package.json` scripts:
   ```json
   "scripts": {
     "dev": "next dev",
     "build": "next build",
     "start": "next start",
     "migrate": "prisma migrate deploy"
   }
   ```

2. In Vercel, go to project settings and add a **Build Command**:
   ```bash
   npx prisma migrate deploy && next build
   ```

### Step 5: Test Your Deployment

1. Go to your Vercel URL (you'll get it in the deployment summary)
2. Test all features:
   - Create a course
   - Upload a PDF
   - Generate questions
   - Toggle theme

## 🔗 Share with Team

Your app is now live! Share these details with your team:

```
📱 App URL: https://your-app.vercel.app
👥 Team Access: Anyone with the link can access it
🔑 API Key: Already configured on Vercel (no sharing needed)
📝 Database: Shared PostgreSQL on Neon
```

**For teammates to contribute to code:**
1. They fork your GitHub repository
2. They clone their fork
3. They set up `.env.local` locally (copy `.env.example`)
4. They run `npm install && npm run dev`

## 🎯 Useful Vercel Commands

```bash
# Deploy current code
vercel

# View logs
vercel logs your-app-name.vercel.app

# Manage environment variables
vercel env list
vercel env pull

# Revert to previous deployment
vercel rollback
```

## 📊 Database Backups

With Neon, you get:
- ✅ Automatic daily backups
- ✅ Point-in-time recovery
- ✅ Migration assistance
- ✅ Database branching (Pro plan)

## 🔐 Security Best Practices

✅ **Do:**
- Keep OpenAI API key secret (only add to Vercel, not GitHub)
- Use `.env.example` instead of `.env.local` in repos
- Enable Vercel Protected Branches for main
- Regularly rotate API keys

❌ **Don't:**
- Commit `.env.local` to GitHub
- Share API keys via email
- Use production database URL in `.env.local`
- Expose credentials in logs

## 🐛 Troubleshooting

### "Database Connection Error"
- Check DATABASE_URL in Vercel environment variables
- Verify Neon database is active
- Run: `npx prisma db push` to sync schema

### "Build Failed - Migration Error"
- SSH into Vercel and check logs
- Run locally: `npx prisma migrate dev`
- Push migration files to GitHub
- Redeploy

### "OpenAI API Not Working"
- Verify API key in Vercel environment variables
- Check API key has available credits
- Test with: `curl https://api.openai.com/v1/models -H "Authorization: Bearer $OPENAI_API_KEY"`

### "PDF Upload Not Working"
- Check file upload size limits (Vercel: 6MB)
- Verify `/public/uploads` directory exists
- Check file permissions on server

## 📈 Scaling Tips

As your team grows:

**Database:**
- Start with Neon free tier (~5GB)
- Upgrade to paid plan as needed
- Use read replicas for better performance

**File Storage:**
- Consider AWS S3 for large files
- Use Vercel Blob for file uploads
- Add CDN for faster delivery

**API Rate Limiting:**
- Add rate limiting middleware
- Set up request logging
- Monitor OpenAI usage

## 🚀 Advanced Deployment Options

### Alternative Databases:
- **Supabase** (PostgreSQL + Auth)
- **Railway** (Database included)
- **Render** (PostgreSQL)
- **AWS RDS** (Production-grade)

### Alternative File Storage:
- **Vercel Blob** (Native, easy)
- **AWS S3** (Industry standard)
- **Cloudinary** (Image optimization)

### Alternative Hosting:
- **Railway** (Full-stack)
- **Render** (Simplicity)
- **AWS** (Enterprise)
- **DigitalOcean** (Affordable)

## 📞 Support Resources

- Vercel Docs: https://vercel.com/docs
- Prisma Docs: https://www.prisma.io/docs/
- Neon Docs: https://neon.tech/docs/
- Next.js Docs: https://nextjs.org/docs

## ✅ Deployment Checklist

- [ ] GitHub repository created
- [ ] Code pushed to GitHub
- [ ] PostgreSQL database set up (Neon)
- [ ] Vercel account created
- [ ] Project linked to Vercel
- [ ] Environment variables added
- [ ] Deployment successful
- [ ] Migrations ran successfully
- [ ] Features tested on live URL
- [ ] Team members invited
- [ ] Documentation shared

## 🎉 You're Live!

Congratulations! Your Groupies app is now:
- ✅ Live on the internet
- ✅ Shareable with your team
- ✅ Automatically deployed when you push to main
- ✅ Backed up and monitored
- ✅ Scalable and professional

Share the URL with your team and start collaborating!

---

**Questions?** Check the troubleshooting section or refer to service documentation.

**Need help?** Common issues are usually found in:
1. Environment variables (check Vercel settings)
2. Database connection (test Neon connectivity)
3. API keys (verify they're correct and active)
4. Build logs (check Vercel deployment logs)
