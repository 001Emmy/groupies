# Groupies Vercel Deployment - Complete Setup Guide

This guide covers everything needed to deploy Groupies to Vercel and fix common errors.

## 🚀 Quick Start (10 minutes)

### Step 1: Create PostgreSQL Database (Choose One)

#### Option A: Neon (Recommended - Fastest)
1. Go to [neon.tech](https://neon.tech)
2. Sign up for free account
3. Create a new project (auto-creates database)
4. Copy the "Connection String" - it looks like:
   ```
   postgresql://user:password@host.neon.tech/dbname
   ```

#### Option B: Supabase
1. Go to [supabase.com](https://supabase.com)
2. Create new project
3. Go to Settings → Database → Connection String
4. Copy PostgreSQL URI

#### Option C: Railway
1. Go to [railway.app](https://railway.app)
2. Create new project
3. Add PostgreSQL plugin
4. View variables → copy `DATABASE_URL`

### Step 2: Configure Environment Variables on Vercel

1. Go to your Vercel project → Settings → Environment Variables
2. Add these three variables:

```
Name: DATABASE_URL
Value: postgresql://user:password@host/dbname
(Paste your PostgreSQL connection string)

Name: OPENAI_API_KEY
Value: sk-...
(Get from https://platform.openai.com/api-keys)

Name: NEXT_PUBLIC_API_URL
Value: https://your-vercel-app.vercel.app
(Use your Vercel project URL)
```

**IMPORTANT:** Make sure these are also visible in "Production" environment!

### Step 3: Deploy to Vercel

1. Push code to GitHub (already done: https://github.com/001Emmy/Groupies)
2. Go to [vercel.com](https://vercel.com)
3. Import your GitHub repository
4. Select your GitHub account → Groupies repo
5. No need to change settings, click "Deploy"
6. **WAIT** for build to complete (2-3 minutes)

---

## 🔧 Common Errors & Fixes

### Error 1: "DATABASE_URL is not a valid PostgreSQL URL"

**Cause:** Wrong database format in environment variables

**Fix:**
1. Go to Vercel → Settings → Environment Variables
2. Check that DATABASE_URL starts with `postgresql://`
3. Format should be: `postgresql://user:password@host:5432/dbname`

---

### Error 2: "PrismaClientInitializationError"

**Cause:** Database connection not working at runtime

**Fix:**
1. Verify DATABASE_URL is in Production environment (not just Preview)
2. Add 10 second timeout to Vercel function:
   - Settings → Functions → Max Duration: 30s
3. Check PostgreSQL is accessible (whitelist Vercel IPs in firewall)

**For Neon specifically:**
- Go to Neon dashboard
- Settings → IP Whitelist
- Add: `0.0.0.0/0` (allows all IPs)

---

### Error 3: "OPENAI_API_KEY not configured"

**Cause:** API key missing or misconfigured

**Fix:**
1. Get API key from https://platform.openai.com/api-keys
2. In Vercel Settings → Environment Variables
3. Add variable name exactly: `OPENAI_API_KEY`
4. Paste your key (starts with `sk-`)
5. **Redeploy** after adding (don't just save)

---

### Error 4: "Build failed: TypeScript compilation error"

**Cause:** Missing dependencies or broken imports

**Fix:**
```bash
# Locally, run:
npm install
npm run build

# If it fails, check:
npm audit fix
npm install --save-dev typescript@latest
```

Then push to GitHub and redeploy from Vercel.

---

### Error 5: "File upload not working in production"

**Cause:** Vercel serverless can't write files to `/public/uploads`

**Status:** ✅ FIXED
- App now stores PDF content as Base64 in PostgreSQL database
- No file system writes needed

---

## 🔄 Deployment Checklist

- [ ] PostgreSQL database created (Neon/Supabase/Railway)
- [ ] DATABASE_URL added to Vercel environment variables
- [ ] OPENAI_API_KEY added to Vercel environment variables
- [ ] NEXT_PUBLIC_API_URL set to your Vercel domain
- [ ] All three variables visible in "Production" environment
- [ ] Code pushed to GitHub (https://github.com/001Emmy/Groupies)
- [ ] Vercel project deployed successfully
- [ ] Can access app at `https://your-vercel-app.vercel.app`
- [ ] Can create courses
- [ ] Can upload PDFs
- [ ] Can generate questions using AI

---

## 🆘 Verification Steps

After deployment, verify everything works:

1. **Open the app:** https://your-vercel-app.vercel.app
2. **Create a course:** Click "New Course" button
3. **Upload a PDF:** Drag & drop a PDF file
4. **Generate questions:** Click "Generate Questions" button
5. **Check dark mode:** Click theme toggle in top-right

---

## 📊 Monitoring Deployment

### Check Build Logs
1. Vercel Dashboard → Deployments
2. Click the deployment name
3. Click "View Build Logs"
4. Search for errors like:
   - `error TS1345` (TypeScript)
   - `ERR_MODULE_NOT_FOUND` (Missing dependency)
   - `PRISMA` (Database issues)

### Check Runtime Logs
1. Vercel Dashboard → Deployments → Production
2. Click "View Function Logs"
3. Look for API errors

### Database Connection Test
Create a simple endpoint to test:
```typescript
// src/app/api/health/route.ts
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await prisma.$queryRaw`SELECT 1`;
    return NextResponse.json({ status: "ok", database: "connected" });
  } catch (e) {
    return NextResponse.json({ status: "error", message: String(e) }, { status: 500 });
  }
}
```

---

## 🎯 If All Else Fails

### Reset & Redeploy

```bash
# 1. Clear local cache
rm -Recurse .next
rm -Recurse node_modules

# 2. Reinstall
npm install

# 3. Regenerate Prisma
npm run build

# 4. Push to GitHub
git add .
git commit -m "Fix: regenerate and redeploy"
git push origin main

# 5. Manual redeploy on Vercel
# Go to Vercel → Deployments → click "Redeploy" on latest
```

### Contact Support
- **Vercel:** https://vercel.com/support
- **Neon:** https://neon.tech/docs
- **OpenAI:** https://help.openai.com

---

## 📝 Post-Deployment

### Share with Team
Once working, share URL: https://your-vercel-app.vercel.app

### Enable Analytics (Optional)
1. Vercel → Settings → Analytics
2. Toggle "Web Analytics" ON
3. Gets free 3000 requests/month

### Custom Domain (Optional)
1. Vercel → Settings → Domains
2. Add your custom domain (e.g., groupies.yourcompany.com)
3. Point DNS to Vercel nameservers

---

**Deployment Guide Version:** 2.0  
**Last Updated:** 2025-01-21  
**Status:** ✅ All fixes applied
