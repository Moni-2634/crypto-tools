"use client";

import { useState, useCallback, useRef } from "react";
import OutputField from "@/components/tools/OutputField";

interface FileInfo {
  name: string;
  size: number;
  type: string;
  width?: number;
  height?: number;
}

export default function ImageToBase64Tool() {
  const [base64, setBase64] = useState("");
  const [dataUri, setDataUri] = useState("");
  const [preview, setPreview] = useState("");
  const [fileInfo, setFileInfo] = useState<FileInfo | null>(null);
  const [error, setError] = useState("");
  const [outputMode, setOutputMode] = useState<"datauri" | "raw">("datauri");
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const processFile = useCallback((file: File) => {
    setError("");

    if (!file.type.startsWith("image/")) {
      setError("Please select a valid image file (PNG, JPG, GIF, SVG, WebP, etc.).");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setError("File size exceeds 10 MB limit.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      if (!result) return;

      setDataUri(result);
      // Extract raw base64 (remove data:mime;base64, prefix)
      const rawBase64 = result.split(",")[1] || "";
      setBase64(rawBase64);
      setPreview(result);

      // Get image dimensions
      const img = new Image();
      img.onload = () => {
        setFileInfo({
          name: file.name,
          size: file.size,
          type: file.type,
          width: img.naturalWidth,
          height: img.naturalHeight,
        });
      };
      img.onerror = () => {
        setFileInfo({
          name: file.name,
          size: file.size,
          type: file.type,
        });
      };
      img.src = result;
    };
    reader.onerror = () => {
      setError("Failed to read the file.");
    };
    reader.readAsDataURL(file);
  }, []);

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) processFile(file);
    },
    [processFile]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      const file = e.dataTransfer.files?.[0];
      if (file) processFile(file);
    },
    [processFile]
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleClear = useCallback(() => {
    setBase64("");
    setDataUri("");
    setPreview("");
    setFileInfo(null);
    setError("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  }, []);

  const formatSize = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const output = outputMode === "datauri" ? dataUri : base64;

  const htmlSnippet = dataUri
    ? `<img src="${dataUri.length > 80 ? dataUri.substring(0, 80) + "..." : dataUri}" alt="image" />`
    : "";

  const cssSnippet = dataUri
    ? `background-image: url(${dataUri.length > 80 ? dataUri.substring(0, 80) + "..." : dataUri});`
    : "";

  return (
    <div className="space-y-6">
      {/* Drop zone */}
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={() => fileInputRef.current?.click()}
        className={`flex flex-col items-center justify-center rounded-lg border-2 border-dashed p-8 cursor-pointer transition-colors ${
          isDragging
            ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
            : "border-gray-300 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-600"
        }`}
      >
        <svg
          className="mb-3 h-10 w-10 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          <span className="font-medium text-blue-600 dark:text-blue-400">
            Click to upload
          </span>{" "}
          or drag and drop
        </p>
        <p className="mt-1 text-xs text-gray-500">
          PNG, JPG, GIF, SVG, WebP, ICO (max 10 MB)
        </p>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />
      </div>

      {/* Output mode */}
      {base64 && (
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-sm text-gray-600 dark:text-gray-400">
            Output:
          </span>
          <div className="flex gap-1 rounded-lg bg-gray-100 dark:bg-gray-800 p-1">
            {(["datauri", "raw"] as const).map((m) => (
              <button
                key={m}
                onClick={() => setOutputMode(m)}
                className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                  outputMode === m
                    ? "bg-blue-600 text-white"
                    : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                }`}
              >
                {m === "datauri" ? "Data URI" : "Raw Base64"}
              </button>
            ))}
          </div>
          <button
            onClick={handleClear}
            className="rounded-lg border border-gray-300 dark:border-gray-700 px-4 py-1.5 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            Clear
          </button>
        </div>
      )}

      {error && (
        <p className="rounded-lg border border-red-300 dark:border-red-800 bg-red-100 dark:bg-red-900/30 px-4 py-3 text-sm text-red-600 dark:text-red-400">
          {error}
        </p>
      )}

      {/* Preview */}
      {preview && (
        <div className="flex justify-center rounded-lg border border-gray-200 dark:border-gray-700 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjEwIiBoZWlnaHQ9IjEwIiBmaWxsPSIjZTVlN2ViIi8+PHJlY3QgeD0iMTAiIHk9IjEwIiB3aWR0aD0iMTAiIGhlaWdodD0iMTAiIGZpbGw9IiNlNWU3ZWIiLz48L3N2Zz4=')] p-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={preview}
            alt="Preview"
            className="max-h-64 max-w-full object-contain"
          />
        </div>
      )}

      {/* File stats */}
      {fileInfo && (
        <div className="rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 p-4">
          <h3 className="mb-3 text-sm font-semibold text-gray-700 dark:text-gray-300">
            File Info
          </h3>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            <div className="text-sm">
              <span className="text-gray-500 dark:text-gray-400">Name</span>
              <p className="font-mono text-blue-600 dark:text-blue-400 truncate">
                {fileInfo.name}
              </p>
            </div>
            <div className="text-sm">
              <span className="text-gray-500 dark:text-gray-400">Type</span>
              <p className="font-mono text-blue-600 dark:text-blue-400">
                {fileInfo.type}
              </p>
            </div>
            <div className="text-sm">
              <span className="text-gray-500 dark:text-gray-400">
                Original Size
              </span>
              <p className="font-mono text-blue-600 dark:text-blue-400">
                {formatSize(fileInfo.size)}
              </p>
            </div>
            {fileInfo.width && fileInfo.height && (
              <div className="text-sm">
                <span className="text-gray-500 dark:text-gray-400">
                  Dimensions
                </span>
                <p className="font-mono text-blue-600 dark:text-blue-400">
                  {fileInfo.width} x {fileInfo.height}
                </p>
              </div>
            )}
            <div className="text-sm">
              <span className="text-gray-500 dark:text-gray-400">
                Base64 Size
              </span>
              <p className="font-mono text-blue-600 dark:text-blue-400">
                {formatSize(base64.length)}
              </p>
            </div>
            <div className="text-sm">
              <span className="text-gray-500 dark:text-gray-400">
                Size Increase
              </span>
              <p className="font-mono text-blue-600 dark:text-blue-400">
                {fileInfo.size > 0
                  ? `+${(((base64.length - fileInfo.size) / fileInfo.size) * 100).toFixed(0)}%`
                  : "N/A"}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Output */}
      {output && (
        <OutputField
          label={outputMode === "datauri" ? "Data URI" : "Raw Base64"}
          value={output}
          rows={8}
        />
      )}

      {/* Usage snippets */}
      {dataUri && (
        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">
            Usage Examples
          </h3>
          <div className="space-y-3">
            <div>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                HTML
              </span>
              <div className="mt-1 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 px-4 py-2">
                <code className="text-xs text-gray-700 dark:text-gray-300 break-all">
                  {htmlSnippet}
                </code>
              </div>
            </div>
            <div>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                CSS
              </span>
              <div className="mt-1 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 px-4 py-2">
                <code className="text-xs text-gray-700 dark:text-gray-300 break-all">
                  {cssSnippet}
                </code>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Info */}
      <div className="border-t border-gray-200 dark:border-gray-800 pt-6">
        <h3 className="mb-3 text-sm font-semibold text-gray-700 dark:text-gray-300">
          About Image to Base64
        </h3>
        <div className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
          <p>
            Base64 encoding converts binary image data into an ASCII text string. This
            allows you to embed images directly in HTML, CSS, JSON, or any text-based
            format without separate file requests.
          </p>
          <p>
            A Data URI (data:image/png;base64,...) can be used directly as an{" "}
            <code>src</code> attribute in an <code>&lt;img&gt;</code> tag or as a{" "}
            <code>background-image</code> URL in CSS. Note that Base64 encoding
            increases the data size by approximately 33%.
          </p>
          <p>
            All processing happens client-side in your browser. Your images are never
            uploaded to any server.
          </p>
        </div>
      </div>
    </div>
  );
}
