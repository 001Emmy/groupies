"use client";

import { useState, useEffect } from "react";
import { CourseCard } from "@/components/course-card";
import { CreateCourseModal } from "@/components/create-course-modal";
import { ThemeToggle } from "@/components/theme-toggle";
import { Plus } from "lucide-react";

interface Course {
  id: string;
  name: string;
  description?: string;
  color: string;
  documents: any[];
}

export default function Home() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchCourses = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/courses");
      if (response.ok) {
        const data = await response.json();
        setCourses(data);
      }
    } catch (error) {
      console.error("Error fetching courses:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      {/* Header */}
      <header className="border-b border-gray-200 dark:border-gray-800 sticky top-0 z-40 bg-white/80 dark:bg-gray-950/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              📚 Groupies
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Manage your school PDFs and generate study questions with AI
            </p>
          </div>
          <ThemeToggle />
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Create Course Button */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Your Courses
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              {courses.length} course{courses.length !== 1 ? "s" : ""} • {courses.reduce((sum, c) => sum + c.documents.length, 0)} document
              {courses.reduce((sum, c) => sum + c.documents.length, 0) !== 1 ? "s" : ""}
            </p>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-colors shadow-md hover:shadow-lg"
          >
            <Plus className="w-5 h-5" />
            New Course
          </button>
        </div>

        {/* Courses Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="h-48 bg-gray-200 dark:bg-gray-800 rounded-lg animate-pulse"
              />
            ))}
          </div>
        ) : courses.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">📚</div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              No courses yet
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Create your first course to get started organizing your PDFs
            </p>
            <button
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-colors"
            >
              <Plus className="w-5 h-5" />
              Create Course
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <CourseCard
                key={course.id}
                id={course.id}
                name={course.name}
                description={course.description}
                color={course.color}
                documentCount={course.documents.length}
                onDelete={fetchCourses}
              />
            ))}
          </div>
        )}
      </main>

      {/* Create Course Modal */}
      <CreateCourseModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreate={fetchCourses}
      />
    </div>
  );
}
