# 📚 Groupies - School PDF Manager with AI Question Generation

A modern web application for managing school PDF documents organized by courses, with AI-powered study question generation using OpenAI's GPT model.

## ✨ Features

- **Course Organization**: Organize your school PDFs into different courses
- **PDF Upload & Storage**: Upload and store PDF files with drag-and-drop interface
- **AI Question Generation**: Automatically generate study questions from PDF content using OpenAI's GPT
- **Light/Dark Mode**: Fully functional theme switching with persistent preferences
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Question Management**: View, organize, and study generated questions
- **Fast & Efficient**: Built with Next.js for optimal performance

## 🛠️ Tech Stack

- **Frontend**: Next.js 15+, React, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: SQLite with Prisma ORM
- **AI**: OpenAI GPT-3.5-turbo
- **UI Components**: Lucide React Icons
- **Styling**: Tailwind CSS with dark mode support

## 📋 Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- OpenAI API key (for AI question generation)

## 🚀 Quick Start

### 1. Clone/Setup the Project

```bash
cd c:\Users\user\Desktop\test\groupies
```

### 2. Install Dependencies

All dependencies have already been installed. If you need to reinstall:

```bash
npm install
```

### 3. Set Up Environment Variables

The `.env.local` file already exists. You need to add your OpenAI API key:

```bash
# .env.local
DATABASE_URL="file:./dev.db"
OPENAI_API_KEY="your-openai-api-key-here"  # 👈 Replace with your actual API key
NEXT_PUBLIC_API_URL="http://localhost:3000"
```

To get an OpenAI API key:
1. Go to https://platform.openai.com/api-keys
2. Sign up or log in with your account
3. Create a new API key
4. Copy and paste it into `.env.local`

### 4. Set Up the Database

The database has already been initialized with Prisma migrations. To reset (optional):

```bash
npx prisma migrate reset
```

### 5. Run the Development Server

```bash
npm run dev
```

The application will start at `http://localhost:3000`

## 📖 Usage Guide

### Creating a Course

1. Click the **"New Course"** button on the home page
2. Enter the course name, optional description, and select a color
3. Click **"Create"** to add the course

### Uploading PDFs

1. Navigate to a course by clicking on it
2. Use the **"Drag and drop your PDFs here"** area to upload PDF files
3. Alternatively, click the area to browse and select files
4. Files will be stored in the database and accessible later

### Generating Study Questions

1. In the course detail page, find the PDF document
2. Click the **"Generate Questions"** button (with the sparkle icon)
3. Wait for the AI to analyze the PDF and generate 5 study questions
4. The generated questions will appear below the document

### Viewing Study Questions

- Questions are displayed with multiple-choice options
- Click **"Show Answer"** to reveal the correct answer
- Answer options can be selected for practice

### Theme Switching

- Click the **moon/sun icon** in the top right corner to toggle between light and dark modes
- Your preference is automatically saved

### Managing Documents and Courses

- Delete individual PDFs using the trash icon next to each document
- Delete entire courses using the trash icon on the course card
- Confirm before deletion to prevent accidental data loss

## 🗄️ Project Structure

```
groupies/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── courses/           # Course management endpoints
│   │   │   ├── documents/         # PDF upload and management
│   │   │   └── ai/                # AI question generation
│   │   ├── course/
│   │   │   └── [id]/              # Course detail page
│   │   ├── globals.css            # Global styles
│   │   ├── layout.tsx             # Root layout with theme provider
│   │   └── page.tsx               # Home page with course list
│   ├── components/
│   │   ├── course-card.tsx        # Course card component
│   │   ├── create-course-modal.tsx # Course creation modal
│   │   ├── file-upload.tsx        # PDF upload component
│   │   ├── providers.tsx          # Theme provider wrapper
│   │   └── theme-toggle.tsx       # Light/dark mode toggle
│   └── lib/
│       └── prisma.ts             # Prisma client instance
├── prisma/
│   ├── schema.prisma             # Database schema
│   └── migrations/               # Database migrations
├── public/
│   └── uploads/                  # Uploaded PDF storage
├── .env.local                    # Environment variables
├── next.config.ts                # Next.js configuration
└── tailwind.config.ts            # Tailwind CSS configuration
```

## 🔌 API Endpoints

### Courses
- `GET /api/courses` - List all courses
- `POST /api/courses` - Create a new course
- `GET /api/courses/[id]` - Get course details with documents
- `PUT /api/courses/[id]` - Update course
- `DELETE /api/courses/[id]` - Delete course

### Documents
- `GET /api/documents` - List all documents (with optional courseId filter)
- `POST /api/documents` - Upload a new PDF
- `GET /api/documents/[id]` - Get document details with questions
- `DELETE /api/documents/[id]` - Delete document

### AI
- `POST /api/ai/generate-questions` - Generate study questions from PDF
  - Request body: `{ documentId: string, numQuestions?: number }`
  - Returns: Generated questions with multiple-choice options

## 🎨 Customization

### Change App Name

To change "Groupies" to another name:
1. Update `<h1>📚 Groupies</h1>` in `src/app/page.tsx`
2. Update the metadata title in `src/app/layout.tsx`

### Customize Course Colors

Edit the available colors in `src/components/create-course-modal.tsx`:

```typescript
const colors = [
  "#3b82f6", // blue
  "#ef4444", // red
  "#10b981", // green
  // Add more colors here
];
```

### Change Question Generation Count

In `src/app/course/[id]/page.tsx`, modify the `numQuestions` parameter:

```typescript
await fetch("/api/ai/generate-questions", {
  method: "POST",
  body: JSON.stringify({ documentId, numQuestions: 10 }), // Change from 5 to desired number
});
```

## 🔒 Security Considerations

- **API Keys**: Never commit `.env.local` to version control (already in `.gitignore`)
- **File Storage**: PDFs are stored in the `public/uploads` folder - consider implementing access controls
- **Database**: SQLite is suitable for development; use PostgreSQL for production
- **File Validation**: Currently accepts .pdf files - add additional validation if needed

## 📱 Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🐛 Troubleshooting

### "OpenAI API key not configured"
- Ensure you've added your OpenAI API key to `.env.local`
- Restart the development server after updating environment variables

### PDF Upload Fails
- Check that the file is in PDF format
- Ensure the file size is reasonable (API has limitations)
- Check browser console for error messages

### Questions Not Generating
- Verify your OpenAI API key has available credits
- Check that the PDF contains readable text (not scanned image)
- Review server logs for detailed error messages

### Theme Not Persisting
- Clear browser cache and cookies
- Ensure JavaScript is enabled
- Check that next-themes package is properly installed

## 📈 Future Enhancements

- PDF text extraction improvements
- Multiple language support
- Question difficulty levels
- Study quizzes with score tracking
- PDF annotation and highlighting
- Collaborative course sharing
- Question type variety (essay, fill-in-the-blank)
- Export questions to formats (PDF, Word)

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions are welcome! Feel free to:
1. Report bugs and issues
2. Suggest new features
3. Submit pull requests with improvements

## 📞 Support

For issues, questions, or suggestions:
- Check the troubleshooting section
- Review error messages in the browser console
- Check server logs for detailed information

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Styling with [Tailwind CSS](https://tailwindcss.com/)
- Database ORM [Prisma](https://www.prisma.io/)
- AI powered by [OpenAI](https://openai.com/)
- Icons from [Lucide React](https://lucide.dev/)

---

Happy studying! 📚✨
