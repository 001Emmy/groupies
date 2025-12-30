"use client";

import Link from "next/link";
import { Trash2, FileText } from "lucide-react";
import { useState } from "react";

interface CourseCardProps {
  id: string;
  name: string;
  description?: string;
  color: string;
  documentCount: number;
  onDelete?: () => void;
}

export function CourseCard({
  id,
  name,
  description,
  color,
  documentCount,
  onDelete,
}: CourseCardProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!confirm(`Are you sure you want to delete "${name}"?`)) {
      return;
    }

    setIsDeleting(true);
    try {
      const response = await fetch(`/api/courses/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        onDelete?.();
      }
    } catch (error) {
      console.error("Error deleting course:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Link href={`/course/${id}`}>
      <div
        className="p-6 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-lg dark:hover:bg-gray-800 transition-all cursor-pointer h-full"
        style={{
          backgroundColor: `${color}15`,
          borderLeftWidth: "4px",
          borderLeftColor: color,
        }}
      >
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 flex-1 pr-4">
            {name}
          </h3>
          <button
            onClick={(e) => {
              e.preventDefault();
              handleDelete();
            }}
            disabled={isDeleting}
            className="p-2 text-red-500 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-lg transition-colors disabled:opacity-50"
            aria-label="Delete course"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>

        {description && (
          <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
            {description}
          </p>
        )}

        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
          <FileText className="w-4 h-4 mr-2" />
          {documentCount} {documentCount === 1 ? "document" : "documents"}
        </div>
      </div>
    </Link>
  );
}
