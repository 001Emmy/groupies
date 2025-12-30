"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { FileUpload } from "@/components/file-upload";
import { ThemeToggle } from "@/components/theme-toggle";
import { ArrowLeft, FileText, Trash2, Sparkles, Download } from "lucide-react";
import Link from "next/link";

interface Document {
  id: string;
  originalName: string;
  fileSize: number;
  uploadedAt: string;
  questions: any[];
  filePath: string;
}

interface Course {
  id: string;
  name: string;
  description?: string;
  color: string;
  documents: Document[];
}

export default function CoursePage() {
  const params = useParams();
  const router = useRouter();
  const courseId = params.id as string;

  const [course, setCourse] = useState<Course | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [generatingQuestions, setGeneratingQuestions] = useState<string | null>(
    null
  );

  const fetchCourse = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`/api/courses/${courseId}`);
      if (response.ok) {
        const data = await response.json();
        setCourse(data);
      } else {
        router.push("/");
      }
    } catch (error) {
      console.error("Error fetching course:", error);
      router.push("/");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCourse();
  }, [courseId]);

  const handleGenerateQuestions = async (documentId: string) => {
    setGeneratingQuestions(documentId);
    try {
      const response = await fetch("/api/ai/generate-questions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ documentId, numQuestions: 5 }),
      });

      if (response.ok) {
        const data = await response.json();
        fetchCourse();
      } else {
        const error = await response.json();
        alert(`Error: ${error.error}`);
      }
    } catch (error) {
      console.error("Error generating questions:", error);
      alert("Failed to generate questions");
    } finally {
      setGeneratingQuestions(null);
    }
  };

  const handleDeleteDocument = async (documentId: string) => {
    if (!confirm("Are you sure you want to delete this document?")) {
      return;
    }

    try {
      const response = await fetch(`/api/documents/${documentId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        fetchCourse();
      }
    } catch (error) {
      console.error("Error deleting document:", error);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i];
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-6 py-8 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500" />
        </div>
      </div>
    );
  }

  if (!course) {
    return null;
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      {/* Header */}
      <header className="border-b border-gray-200 dark:border-gray-800 sticky top-0 z-40 bg-white/80 dark:bg-gray-950/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              Back
            </Link>
            <div
              className="w-4 h-4 rounded-full"
              style={{ backgroundColor: course.color }}
            />
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                {course.name}
              </h1>
              {course.description && (
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {course.description}
                </p>
              )}
            </div>
          </div>
          <ThemeToggle />
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Upload Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Upload PDFs
          </h2>
          <FileUpload
            courseId={course.id}
            courseName={course.name}
            onUploadComplete={fetchCourse}
          />
        </div>

        {/* Documents Section */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Documents ({course.documents.length})
          </h2>

          {course.documents.length === 0 ? (
            <div className="text-center py-12">
              <FileText className="w-16 h-16 text-gray-300 dark:text-gray-700 mx-auto mb-4" />
              <p className="text-gray-600 dark:text-gray-400">
                No documents uploaded yet
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {course.documents.map((doc) => (
                <div
                  key={doc.id}
                  className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-6"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                        {doc.originalName}
                      </h3>
                      <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                        <span>{formatFileSize(doc.fileSize)}</span>
                        <span>•</span>
                        <span>Uploaded {formatDate(doc.uploadedAt)}</span>
                        <span>•</span>
                        <span>
                          {doc.questions.length} question
                          {doc.questions.length !== 1 ? "s" : ""}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => handleDeleteDocument(doc.id)}
                      className="p-2 text-red-500 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-lg transition-colors"
                      aria-label="Delete document"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="flex gap-2">
                    <a
                      href={doc.filePath}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors"
                    >
                      <Download className="w-4 h-4" />
                      View PDF
                    </a>
                    <button
                      onClick={() => handleGenerateQuestions(doc.id)}
                      disabled={generatingQuestions === doc.id}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Sparkles className="w-4 h-4" />
                      {generatingQuestions === doc.id
                        ? "Generating..."
                        : "Generate Questions"}
                    </button>
                  </div>

                  {/* Questions Display */}
                  {doc.questions.length > 0 && (
                    <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-800">
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-4">
                        Study Questions
                      </h4>
                      <div className="space-y-4">
                        {doc.questions.map((question, idx) => (
                          <div
                            key={question.id}
                            className="bg-white dark:bg-gray-800 p-4 rounded border border-gray-200 dark:border-gray-700"
                          >
                            <p className="font-medium text-gray-900 dark:text-white mb-3">
                              {idx + 1}. {question.text}
                            </p>
                            {question.options && (
                              <div className="space-y-2 mb-3">
                                {JSON.parse(question.options).map(
                                  (option: string, optIdx: number) => (
                                    <label
                                      key={optIdx}
                                      className="flex items-center gap-2 text-gray-700 dark:text-gray-300 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 p-2 rounded transition-colors"
                                    >
                                      <input
                                        type="radio"
                                        name={`question-${question.id}`}
                                        className="w-4 h-4"
                                      />
                                      {option}
                                    </label>
                                  )
                                )}
                              </div>
                            )}
                            {question.answer && (
                              <details className="text-sm">
                                <summary className="font-medium text-blue-600 dark:text-blue-400 cursor-pointer hover:underline">
                                  Show Answer
                                </summary>
                                <p className="mt-2 text-gray-700 dark:text-gray-300 pl-4 border-l-2 border-blue-500">
                                  Correct Answer: {question.answer}
                                </p>
                              </details>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
