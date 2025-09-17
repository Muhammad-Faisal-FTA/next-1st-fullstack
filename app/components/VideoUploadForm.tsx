"use client";

import { useState } from "react";
import FileUpload from "./FileUpload";

interface UploadResponse {
  url: string;
  name: string;
  fileId: string;
  [key: string]: unknown; // allow extra fields from ImageKit
}

export default function VideoUploadForm() {
  const [uploadResult, setUploadResult] = useState<UploadResponse | null>(null);
  const [progress, setProgress] = useState<number>(0);

  return (
    <div className="bg-gradient-to-r from-gray-900 via-blue-900 to-gray-900 text-white p-6 rounded-2xl shadow-xl max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Upload a Video</h2>

      {/* File Upload Component */}
      <FileUpload
        fileType="video"
        onSuccess={(res) => setUploadResult(res as UploadResponse)}
        onProgress={(p) => setProgress(p)}
      />

      {/* Progress Bar */}
      {progress > 0 && progress < 100 && (
        <div className="mt-4">
          <div className="w-full bg-gray-800 rounded-full h-2 overflow-hidden">
            <div
              className="bg-blue-500 h-2 transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-sm mt-1">{progress}%</p>
        </div>
      )}

      {/* Upload Success */}
      {uploadResult && (
        <div className="mt-6 bg-gray-800 p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold">Upload Successful 🎉</h3>
          <p className="text-gray-300 text-sm mt-2">
            File URL:{" "}
            <a
              href={uploadResult.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 underline"
            >
              {uploadResult.url}
            </a>
          </p>
        </div>
      )}
    </div>
  );
}
