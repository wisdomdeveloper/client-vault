"use client";

import {
  Check,
  Eye,
  FileAudio,
  FileCode,
  File as FileIcon,
  FileImage,
  FileText,
  FileVideo,
  Pencil,
  Search,
  Trash2,
  Upload,
  X,
} from "lucide-react";
import { useRef, useState } from "react";

export default function Dashboard() {
  const [files, setFiles] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [renameIndex, setRenameIndex] = useState<number | null>(null);
  const [newName, setNewName] = useState("");
  const [previewFile, setPreviewFile] = useState<any | null>(null);
  const fileInput = useRef<HTMLInputElement | null>(null);

  const handleClick = () => fileInput.current?.click();

  const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (!selectedFile) return;

    const reader = new FileReader();
    reader.onload = () => {
      const fileData = {
        id: crypto.randomUUID(),
        name: selectedFile.name,
        size: selectedFile.size,
        type: selectedFile.type || "unknown",
        lastModified: new Date(selectedFile.lastModified).toISOString(),
        dataUrl: reader.result as string,
      };
      setFiles((prev) => [...prev, fileData]);
    };
    reader.readAsDataURL(selectedFile);
  };

  const handleDelete = (idx: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== idx));
  };

  const openRenameModal = (idx: number) => {
    setRenameIndex(idx);
    setNewName(files[idx].name);
  };

  const saveRename = () => {
    if (renameIndex === null) return;
    const updated = [...files];
    updated[renameIndex].name = newName;
    setFiles(updated);
    setRenameIndex(null);
  };

  const formatFileSize = (size: number) => {
    if (size < 1024) return `${size} B`;
    if (size < 1024 * 1024) return `${(size / 1024).toFixed(1)} KB`;
    return `${(size / (1024 * 1024)).toFixed(1)} MB`;
  };

  const getFileIcon = (type: string) => {
    if (!type) return <FileIcon className="w-5 h-5 text-gray-400" />;
    if (type.startsWith("image/"))
      return <FileImage className="w-5 h-5 text-purple-500" />;
    if (type === "application/pdf")
      return <FileText className="w-5 h-5 text-red-500" />;
    if (
      type.includes("javascript") ||
      type.includes("json") ||
      type.includes("python") ||
      type.includes("html") ||
      type.includes("css")
    )
      return <FileCode className="w-5 h-5 text-green-500" />;
    if (type.startsWith("text/"))
      return <FileText className="w-5 h-5 text-gray-400" />;
    if (type.startsWith("audio/"))
      return <FileAudio className="w-5 h-5 text-purple-400" />;
    if (type.startsWith("video/"))
      return <FileVideo className="w-5 h-5 text-pink-500" />;
    return <FileIcon className="w-5 h-5 text-gray-400" />;
  };

  const filteredFiles = files.filter((f) =>
    f.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="">
      {/* Navbar */}

      <div className="flex min-h-screen bg-black text-white">
        {/* Main content */}
        <main className="flex-1 flex flex-col">
          {/* Topbar */}
          <header className="flex items-center justify-between p-6  bg-zinc-950">
            <div className="flex items-center gap-3 bg-zinc-800 px-3 py-2 rounded-lg w-1/3">
              <Search className="w-4 h-4 text-gray-400" />
              <input
                placeholder="Search files..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="bg-transparent outline-none flex-1 text-sm"
              />
            </div>
            <button
              onClick={handleClick}
              className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 transition px-4 py-2 rounded-lg"
            >
              <Upload className="w-4 h-4" /> Upload
            </button>
            <input
              ref={fileInput}
              type="file"
              className="hidden"
              onChange={handleUpload}
            />
          </header>

          {/* File table */}
          <div className="p-6 overflow-auto">
            <div className="overflow-hidden rounded-xl border border-zinc-800">
              <table className="w-full text-sm">
                <thead className="bg-zinc-900 text-gray-400">
                  <tr>
                    <th className="p-4 text-left">File</th>
                    <th className="p-4 text-left">Size</th>
                    <th className="p-4 text-left">Type</th>
                    <th className="p-4 text-left">Last Modified</th>
                    <th className="p-4 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredFiles.length > 0 ? (
                    filteredFiles.map((file, idx) => (
                      <tr
                        key={file.id}
                        className="border-t border-zinc-800 hover:bg-zinc-800/50"
                      >
                        <td className="p-4 flex items-center gap-3">
                          {getFileIcon(file.type)}
                          {file.name}
                        </td>
                        <td className="p-4">{formatFileSize(file.size)}</td>
                        <td className="p-4">{file.type}</td>
                        <td className="p-4">
                          {new Date(file.lastModified).toLocaleString()}
                        </td>
                        <td className="p-4 flex gap-3">
                          <button
                            onClick={() => openRenameModal(idx)}
                            className="text-yellow-400 hover:text-yellow-500"
                          >
                            <Pencil className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => setPreviewFile(file)}
                            className="text-green-400 hover:text-green-500"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(idx)}
                            className="text-red-400 hover:text-red-500"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={5}
                        className="text-center py-10 text-gray-500"
                      >
                        No files uploaded yet.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </main>

        {/* Rename Modal */}
        {renameIndex !== null && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/70 z-50">
            <div className="bg-zinc-900 p-6 rounded-xl w-[90%] max-w-md">
              <h2 className="text-lg font-semibold mb-4">Rename File</h2>
              <input
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                className="w-full p-3 rounded bg-zinc-800 outline-none"
              />
              <div className="flex justify-end gap-3 mt-4">
                <button
                  onClick={() => setRenameIndex(null)}
                  className="px-4 py-2 rounded bg-gray-700 hover:bg-gray-600"
                >
                  Cancel
                </button>
                <button
                  onClick={saveRename}
                  className="px-4 py-2 rounded bg-purple-600 hover:bg-purple-700 flex items-center gap-2"
                >
                  <Check className="w-4 h-4" /> Save
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Preview Modal */}
        {previewFile && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/80 z-50">
            <div className="bg-zinc-900 p-6 rounded-xl max-w-3xl w-[95%] relative">
              <button
                onClick={() => setPreviewFile(null)}
                className="absolute top-4 right-4 text-gray-400 hover:text-white"
              >
                <X className="w-6 h-6" />
              </button>
              <h2 className="text-lg font-semibold mb-4">
                Preview: {previewFile.name}
              </h2>
              <div className="bg-zinc-800 rounded p-4 max-h-[70vh] overflow-auto">
                {previewFile.type.startsWith("image/") ? (
                  <img
                    src={previewFile.dataUrl}
                    alt={previewFile.name}
                    className="max-h-[60vh] mx-auto"
                  />
                ) : previewFile.type === "application/pdf" ? (
                  <iframe
                    src={previewFile.dataUrl}
                    className="w-full h-[60vh]"
                  ></iframe>
                ) : previewFile.type.startsWith("text/") ? (
                  <pre className="text-sm whitespace-pre-wrap text-gray-200">
                    {atob(previewFile.dataUrl.split(",")[1])}
                  </pre>
                ) : (
                  <p className="text-gray-400 text-center">
                    Preview not available for this file type.
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
