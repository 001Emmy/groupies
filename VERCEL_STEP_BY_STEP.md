# ⚡ VERCEL DEPLOYMENT - STEP BY STEP FIX GUIDE

## What Was Wrong & What We Fixed ✅

### Issues Fixed:
1. ✅ **File system writes** - Removed `/public/uploads` directory writes (Vercel serverless can't persist files)
2. ✅ **Prisma client generation** - Added `prisma generate` to build scripts
3. ✅ **PDF handling** - Changed to Base64 storage in database instead of file system
4. ✅ **Build configuration** - Added postinstall hook for Prisma client

**Latest commit:** `7161749` - Vercel deployment fixes applied

---

## 🎯 EXACT STEPS TO DEPLOY (Follow Exactly)

### Phase 1: Create Your PostgreSQL Database (5 minutes)

Choose ONE option below:

#### 🟢 **OPTION 1: Neon (Easiest)**
1. Go to https://neon.tech
2. Click "Sign up" (use GitHub login)
3. Create new project → accept defaults
4. Copy connection string from "Connection details" panel
   - Look for: `postgresql://user:password@host.neon.tech/dbname`
   - Click copy button
5. **Save this string** (you'll need it in Step 2)

#### 🔵 **OPTION 2: Supabase**
1. Go to https://supabase.com
2. Sign up → create new project
3. Go to Settings → Database
4. Copy under "Connection string" → PostgreSQL section
5. **Save this string**

#### 🟣 **OPTION 3: Railway**
1. Go to https://railway.app
2. Login → New Project → PostgreSQL
3. Click "Connect" → copy PostgreSQL connection URL
4. **Save this string**

---

### Phase 2: Configure Vercel Environment Variables (3 minutes)

1. **Go to Vercel Dashboard:** https://vercel.com/dashboard

2. **Click on your "Groupies" project** (should show in Projects list)

3. **Click Settings** (top navigation bar)

4. **Click "Environment Variables"** (left sidebar)

5. **Add DATABASE_URL:**
   - Name: `DATABASE_URL`
   - Value: Paste the PostgreSQL string from Phase 1
   - Environments: Check ALL three (Production, Preview, Development)
   - Click "Save"

6. **Add OPENAI_API_KEY:**
   - Name: `OPENAI_API_KEY`
   - Value: Your OpenAI API key from https://platform.openai.com/api-keys
     - Login → go to "API keys" section
     - Click "Create new secret key"
     - Copy it (looks like: `sk-proj-xxxxx...`)
   - Environments: Check ALL three (Production, Preview, Development)
   - Click "Save"

7. **Add NEXT_PUBLIC_API_URL:**
   - Name: `NEXT_PUBLIC_API_URL`
   - Value: `https://your-vercel-project-name.vercel.app`
     - Replace `your-vercel-project-name` with actual project name
     - Can find this in Vercel dashboard URL or project settings
   - Environments: Check ALL three
   - Click "Save"

**✅ VERIFY:** All three variables show in the list below, with checkmarks for Production/Preview/Development

---

### Phase 3: Deploy Your Code (1 minute)

1. **Go to Deployments tab** (in your Vercel project)

2. **Find the latest deployment** (top of list)

3. **Click the three dots (...)** next to it

4. **Click "Redeploy"**
   - This picks up your new environment variables
   - Build starts automatically
   - Wait 2-3 minutes for build to complete

5. **Check the build status:**
   - Green checkmark ✅ = Success
   - Red X ❌ = Error (see Troubleshooting below)

---

### Phase 4: Test Your App (2 minutes)

1. **Click the deployment** or your project name to open it

2. **You'll see:** `https://groupies-xxx.vercel.app`

3. **Open that URL** in browser

4. **Test these features:**
   - [ ] Page loads without errors
   - [ ] Can see "Groupies" heading
   - [ ] Dark/light mode toggle works (top right)
   - [ ] Can click "New Course" button
   - [ ] Can create a course with name and color
   - [ ] Refresh page, course persists (from database)

✅ **If all work, you're done!**

---

## ❌ TROUBLESHOOTING

### Build Failed / See Red X

1. **Click the deployment name**
2. **Scroll down to "Build Logs"**
3. **Find the ERROR line** (usually red text)
4. **Common errors:**

#### Error: `DATABASE_URL`
```
Error: Invalid `__TURBOPACK__imported__module__..` invocation
error: Error validating datasource `db`: the URL must start with the protocol...
```
**Fix:**
- Go back to Settings → Environment Variables
- Check DATABASE_URL is in **all 3 environments** (Production, Preview, Development)
- Make sure it starts with `postgresql://` (not `file://`)
- Redeploy

#### Error: `OPENAI_API_KEY`
```
Error: OpenAI API key not configured
```
**Fix:**
- Check OPENAI_API_KEY variable exists in Settings
- Verify it starts with `sk-`
- Check it's in **Production** environment (not just Preview)
- Redeploy

#### Error: `PrismaClientInitializationError`
```
Error: Unable to connect to database
```
**Fix:**
- Check PostgreSQL is running (Neon/Supabase/Railway dashboard)
- Try whitelist all IPs in PostgreSQL settings (if it has firewall)
- Check DATABASE_URL format is correct
- Wait 30 seconds and redeploy

#### Error: `npm ERR! code E404`
```
npm error 404 Not Found - GET ...
```
**Fix:**
- This usually means a typo in package.json
- It's likely an old cache issue
- Redeploy should fix it

---

## ✅ SUCCESS SIGNS

After deployment completes:

✅ Vercel shows **green checkmark** on deployment  
✅ App URL works and loads without errors  
✅ Can create courses and they persist  
✅ Can upload PDFs  
✅ Can see dark/light mode toggle  
✅ No red errors in console (F12 → Console tab)

---

## 🔗 SHARE WITH YOUR TEAM

Once deployment is successful, share this URL:

```
https://groupies-xxx.vercel.app
```

Team members can:
- Create courses
- Upload school PDFs
- Generate questions with AI
- Toggle light/dark mode

All data is saved to your PostgreSQL database automatically.

---

## 📊 QUICK REFERENCE

| Variable | Example Value | Where to Get |
|----------|---|---|
| `DATABASE_URL` | `postgresql://user:pass@neon.tech/db` | Neon.tech / Supabase / Railway |
| `OPENAI_API_KEY` | `sk-proj-xxxxx...` | https://platform.openai.com/api-keys |
| `NEXT_PUBLIC_API_URL` | `https://groupies-xxx.vercel.app` | Your Vercel project URL |

**Important:** All three must be in **Production** environment on Vercel!

---

## 🆘 STILL NOT WORKING?

1. **Check:** Are all 3 environment variables in Production environment? (Most common mistake)
2. **Check:** DATABASE_URL starts with `postgresql://`?
3. **Check:** OPENAI_API_KEY starts with `sk-`?
4. **Redeploy:** Go to Deployments → Click ... → Redeploy
5. **Wait:** Build takes 2-3 minutes, check back

---

**Status:** ✅ Ready to Deploy  
**Code committed:** Yes (7161749 on master)  
**Next step:** Follow "Phase 1-4" above
