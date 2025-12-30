"use client";

import { useState } from "react";
import { Upload } from "lucide-react";

interface FileUploadProps {
  courseId: string;
  courseName: string;
  onUploadComplete?: () => void;
}

export function FileUpload({
  courseId,
  courseName,
  onUploadComplete,
}: FileUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleUpload = async (files: FileList) => {
    setError(null);
    setIsUploading(true);

    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];

        if (!file.name.toLowerCase().endsWith(".pdf")) {
          setError("Please upload only PDF files");
          setIsUploading(false);
          return;
        }

        const formData = new FormData();
        formData.append("file", file);
        formData.append("courseId", courseId);
        formData.append("courseName", courseName);

        const response = await fetch("/api/documents", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.error || "Upload failed");
        }
      }

      onUploadComplete?.();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setIsUploading(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleUpload(e.dataTransfer.files);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleUpload(e.target.files);
    }
  };

  return (
    <div className="w-full">
      <label
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`block p-8 border-2 border-dashed rounded-lg cursor-pointer transition-colors ${
          isDragging
            ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
            : "border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500"
        } ${isUploading ? "opacity-50 cursor-not-allowed" : ""}`}
      >
        <input
          type="file"
          accept=".pdf"
          multiple
          onChange={handleChange}
          disabled={isUploading}
          className="hidden"
        />
        <div className="flex flex-col items-center justify-center">
          <Upload className="w-12 h-12 text-gray-400 dark:text-gray-500 mb-2" />
          <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
            {isUploading ? "Uploading..." : "Drag and drop your PDFs here"}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            or click to browse
          </p>
        </div>
      </label>
      {error && (
        <div className="mt-4 p-4 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 rounded-lg">
          {error}
        </div>
      )}
    </div>
  );
}
