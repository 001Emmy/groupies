# 📚 Groupies - AI-Powered School PDF Manager

A modern web application for students to organize their school PDF documents by course and automatically generate study questions using artificial intelligence.

## 🌟 Features

- **📚 Course Organization** - Organize PDFs into courses with custom colors
- **📤 PDF Upload** - Drag & drop file upload with instant storage  
- **🤖 AI Question Generation** - Auto-generate study questions from PDF content
- **🌙 Light/Dark Mode** - Fully functional theme switching
- **📱 Responsive Design** - Works on desktop, tablet, and mobile
- **⚡ Fast Performance** - Built with Next.js and Turbopack
- **🔒 Secure** - Local storage with secure configuration

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- OpenAI API key (get one free at https://platform.openai.com/api-keys)

### Setup (2 minutes)

1. **Navigate to project:**
   ```bash
   cd c:\Users\user\Desktop\test\groupies
   ```

2. **Configure OpenAI API:**
   - Edit `.env.local`
   - Add: `OPENAI_API_KEY="sk-your-key-here"`

3. **Start the app:**
   ```bash
   npm run dev
   ```

4. **Open in browser:**
   ```
   http://localhost:3000
   ```

## 📖 Documentation

- **[BUILD_COMPLETE.md](./BUILD_COMPLETE.md)** - Build summary & next steps
- **[QUICK_START.md](./QUICK_START.md)** - Get started in 5 minutes
- **[SETUP_GUIDE.md](./SETUP_GUIDE.md)** - Detailed setup reference
- **[PROJECT_INFO.md](./PROJECT_INFO.md)** - Technical documentation

## 💻 Tech Stack

- **Frontend:** React 19, Next.js 16, TypeScript, Tailwind CSS
- **Backend:** Next.js API Routes
- **Database:** SQLite + Prisma ORM
- **AI:** OpenAI GPT-3.5-turbo
- **UI:** Lucide Icons, next-themes

## 🎯 How to Use

### Create a Course
1. Click "New Course" button
2. Enter course name, description, and choose a color
3. Click "Create"

### Upload PDFs
1. Navigate to a course
2. Drag & drop PDFs or click to browse
3. Files upload automatically

### Generate Questions
1. In course detail, find the document
2. Click "Generate Questions" button
3. Wait for AI to analyze and create questions
4. View generated questions with answers

### Toggle Theme
- Click moon/sun icon in header to switch between light/dark mode

## 🔧 Development

```bash
# Start dev server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# View database
npx prisma studio

# Run migrations
npx prisma migrate dev
```

## 📊 API Endpoints

- `GET/POST /api/courses` - Course management
- `GET/POST/DELETE /api/documents` - PDF management
- `POST /api/ai/generate-questions` - Question generation

## 📁 Project Structure

```
groupies/
├── src/
│   ├── app/           # Next.js pages & API routes
│   ├── components/    # React components
│   └── lib/           # Utilities
├── prisma/            # Database schema
├── public/uploads/    # Uploaded PDFs
└── .env.local         # Configuration
```

## 🔐 Configuration

Create `.env.local`:
```
DATABASE_URL="file:./dev.db"
OPENAI_API_KEY="sk-your-api-key"
NEXT_PUBLIC_API_URL="http://localhost:3000"
```

## 🐛 Troubleshooting

**App won't start?**
```bash
npx prisma generate
npm run dev
```

**API key error?**
- Add API key to `.env.local`
- Restart the dev server

**PDF upload fails?**
- Ensure file is PDF format
- Check browser console (F12) for errors

## 📱 Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers

## 🚀 Deployment

### Deploy to Vercel (Recommended)

Your app is **fully configured for Vercel**! Deploy in 10 minutes:

1. **See:** `DEPLOY_QUICK_GUIDE.md` for step-by-step instructions
2. **Alternative detailed guide:** `VERCEL_DEPLOYMENT.md`
3. **Setup PostgreSQL locally (optional):** `POSTGRES_SETUP.md`

After deployment, share the live link with your team!

### Quick Vercel Deploy:

```bash
npm install -g vercel
vercel
```

Then add environment variables in Vercel dashboard and redeploy.

### Status

✅ **Vercel Ready** - Changed from SQLite to PostgreSQL
✅ **Production Ready** - No additional configuration needed
✅ **Team Ready** - Share live link immediately after deployment

**See `VERCEL_READY.md` for complete deployment info!**

## 📝 License

Open source project for educational use.

## 🤝 Contributing

Suggestions and feedback welcome!

## 📞 Support

Check the documentation files for detailed help:
- Quick questions → QUICK_START.md
- Setup help → SETUP_GUIDE.md
- Technical details → PROJECT_INFO.md

## ✨ Key Highlights

✅ **Production Ready** - Fully functional application  
✅ **Beautiful UI** - Modern design with Tailwind CSS  
✅ **AI Powered** - OpenAI GPT-3.5 integration  
✅ **Dark Mode** - Full light/dark theme support  
✅ **Mobile Friendly** - Responsive on all devices  
✅ **Easy to Use** - Intuitive interface  
✅ **Well Documented** - Comprehensive guides included  

## 🎓 Perfect For

- Students organizing lecture notes
- Teachers preparing study materials
- Exam preparation
- Course note management
- Self-paced learning

---

**Happy Studying! 📚✨**

Built with ❤️ for students everywhere.

Version: 1.0.0 | Status: ✅ Production Ready | Last Updated: December 30, 2025
