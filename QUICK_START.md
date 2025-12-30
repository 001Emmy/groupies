# 🚀 Groupies - Quick Start Guide

## ✅ Installation Complete!

Your **Groupies** application has been successfully created and is ready to use! Here's everything you need to know to get started.

## 🎯 What is Groupies?

**Groupies** is a powerful web application that helps you:
- ✅ Organize all your school PDF documents by course
- ✅ Automatically generate study questions using AI (GPT-3.5-turbo)
- ✅ Store and manage your educational materials in one place
- ✅ Switch between light and dark modes for comfortable studying
- ✅ Access your materials from any device

## 🏃 Quick Start (5 minutes)

### Step 1: Start the Development Server

The server is already running on `http://localhost:3001`

If you need to restart it, run:
```bash
cd c:\Users\user\Desktop\test\groupies
npm run dev
```

### Step 2: Add Your OpenAI API Key

To enable AI question generation, you need an OpenAI API key:

1. **Get an API Key:**
   - Go to https://platform.openai.com/api-keys
   - Sign up or log in
   - Create a new API key
   - Copy the key (it starts with `sk-`)

2. **Add to `.env.local`:**
   - Open `c:\Users\user\Desktop\test\groupies\.env.local`
   - Replace: `OPENAI_API_KEY="your-openai-api-key-here"`
   - With your actual key, e.g., `OPENAI_API_KEY="sk-..."`
   - Save the file
   - Restart the dev server

### Step 3: Open in Browser

Visit: **http://localhost:3001**

You should see the Groupies home page with a beautiful header showing "📚 Groupies"

### Step 4: Create Your First Course

1. Click **"New Course"** button (top right)
2. Enter course details:
   - **Course Name:** e.g., "Biology 101"
   - **Description:** (optional) e.g., "General Biology Lecture Notes"
   - **Color:** Pick a color that represents your course
3. Click **"Create"**
4. Your course appears on the home page!

### Step 5: Upload PDFs

1. Click on your course to open it
2. In the **"Upload PDFs"** section:
   - Drag and drop PDF files, OR
   - Click to browse and select files
3. Files upload automatically to your course
4. You'll see them listed under **"Documents"**

### Step 6: Generate Study Questions

1. Find a document you uploaded
2. Click **"Generate Questions"** (the sparkle button ✨)
3. Wait a few seconds while AI analyzes the PDF
4. Study questions appear below the document!
5. Click **"Show Answer"** to see correct answers

### Step 7: Toggle Dark Mode

- Click the **Moon/Sun icon** in the top right corner
- Your preference is automatically saved!

## 📁 Project Structure

```
groupies/
├── src/
│   ├── app/           # Next.js app directory
│   ├── components/    # React components
│   └── lib/           # Utilities (Prisma client)
├── prisma/            # Database schema & migrations
├── public/uploads/    # Uploaded PDF files
└── .env.local         # Configuration (API keys)
```

## 📚 Key Features Explained

### Course Organization
- Create multiple courses for different subjects
- Each course can have a color and description
- Organize all your PDFs by topic

### PDF Management
- Upload multiple PDFs at once
- Drag and drop interface
- Files are stored securely
- Delete documents anytime

### AI Question Generation
- Analyzes PDF content using GPT-3.5-turbo
- Generates 5 study questions per PDF
- Multiple-choice format with answers
- Click "Show Answer" to verify

### Light/Dark Mode
- Toggle anytime with the theme button
- Smooth transitions
- Preference saved in browser

### Responsive Design
- Works on desktop, tablet, and mobile
- Touch-friendly interface
- Optimized for all screen sizes

## 🎓 Study Workflow

1. **Organize:** Create courses for each subject
2. **Upload:** Add your lecture PDFs
3. **Generate:** Create study questions with AI
4. **Study:** Practice with the generated questions
5. **Review:** Click "Show Answer" to check

## 🔧 Troubleshooting

### "OpenAI API key not configured"
- ✅ Add your API key to `.env.local`
- ✅ Restart the dev server
- ✅ Check you're using the correct key format

### PDF Upload Fails
- ✅ Make sure the file is a PDF (.pdf extension)
- ✅ Try a different file
- ✅ Check browser console (F12) for errors

### Questions Not Generating
- ✅ Verify your OpenAI API key is valid
- ✅ Check that the PDF contains readable text (not just scans)
- ✅ Ensure your OpenAI account has credits

### Theme Not Saving
- ✅ Enable JavaScript in your browser
- ✅ Clear browser cache and try again
- ✅ Try a different browser

## 🎨 Customization

### Change the App Name
Edit `src/app/page.tsx` and `src/app/layout.tsx` to replace "Groupies" with your preferred name.

### Change Available Colors
Edit `src/components/create-course-modal.tsx` and modify the `colors` array.

### Change Number of Questions Generated
In `src/app/course/[id]/page.tsx`, find the line:
```typescript
numQuestions: 5
```
And change to your preferred number.

## 📱 Deployment

When you're ready to share with others:

```bash
# Build for production
npm run build

# Run production version
npm start
```

Deploy to platforms like:
- **Vercel** (recommended for Next.js)
- **Netlify**
- **Railway**
- **Render**
- Your own server

## 💡 Tips & Tricks

✨ **Pro Tips:**
- Use clear, descriptive course names
- Choose course colors that match your preferences
- Upload PDFs with good quality for better text extraction
- Generate questions for each new PDF you upload
- Use dark mode for late-night studying
- Your data is stored locally in the `dev.db` file

🚫 **What to Avoid:**
- Don't share your `.env.local` file (contains API key)
- Don't upload extremely large PDFs (may timeout)
- Don't lose the `dev.db` file (contains all your data)

## 🔒 Privacy & Security

- ✅ Your PDFs are stored locally on your computer
- ✅ Your data is not sent to any external servers (except OpenAI for question generation)
- ✅ API key is stored locally and never exposed
- ✅ Questions are generated server-side securely

## 📞 Need Help?

1. **Check the console:**
   - Press `F12` in your browser
   - Look for error messages
   
2. **Check the documentation:**
   - See `SETUP_GUIDE.md` for detailed information
   - Review API endpoints in the README

3. **Common issues:**
   - Restart the dev server
   - Clear browser cache
   - Check `.env.local` file

## 🎉 What's Next?

### Features to Explore
- Create multiple courses
- Upload various subjects' PDFs
- Generate questions for study sessions
- Use dark mode for relaxed studying
- Share insights with classmates

### Future Enhancements (Roadmap)
- Question difficulty levels
- Quiz/test modes
- Export questions to PDF
- Collaborative course sharing
- Better PDF text extraction
- Multiple question types

## 📊 Project Stats

- **Frontend:** React + Next.js 16
- **Styling:** Tailwind CSS (w/ dark mode)
- **Database:** SQLite + Prisma ORM
- **AI:** OpenAI GPT-3.5-turbo
- **Icons:** Lucide React
- **Hosting:** Ready for Vercel/Any Node.js host

## 🙌 Acknowledgments

Built with modern web technologies:
- [Next.js](https://nextjs.org/)
- [React](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Prisma](https://www.prisma.io/)
- [OpenAI API](https://openai.com/)
- [Lucide Icons](https://lucide.dev/)
- [next-themes](https://github.com/pacocoursey/next-themes)

---

**Happy Studying! 📚✨**

Made with ❤️ for students everywhere.
