"use client";

import {
  Check,
  Download,
  Eye,
  File,
  FileAudio,
  FileCode,
  FileImage,
  FileText,
  FileVideo,
  Pencil,
  Trash2,
  X,
} from "lucide-react";

import { useAuth } from "@/context/AuthContext";
import { db } from "@/lib/firebase/auth";
import { storage } from "@/lib/firebase/firestore";
import { StoredFile } from "@/types/type";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useEffect, useRef, useState } from "react";
import ConfirmDelete from "./ConfirmDelete";
import ControlBar from "./ControlBar";
// import { useAuth } from "@/context/AuthContext";

const FileTable = () => {
  const [files, setFiles] = useState<StoredFile[]>([]);
  const [file, setFile] = useState<File | null>(null);
  const [search, setSearch] = useState("");
  const [renameIndex, setRenameIndex] = useState<number | null>(null);
  const [newName, setNewName] = useState("");
  const [previewFile, setPreviewFile] = useState<StoredFile | null>(null);
  const [showModalDelete, setShowModalDelete] = useState<boolean>(false);

  const fileInput = useRef<HTMLInputElement | null>(null);

  const { user, loading } = useAuth();

  // upload to firestore

  const handleUploadToDatabase = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const selectedFile = event.target.files?.[0];
    if (!selectedFile || !user) return;

    // Upload to Firebase Storage
    const storageRef = ref(storage, `files/${user.uid}/${selectedFile.name}`);
    await uploadBytes(storageRef, selectedFile);
    const downloadURL = await getDownloadURL(storageRef);

    // Save metadata to Firestore
    const storedFile: StoredFile = {
      id: crypto.randomUUID(),
      name: selectedFile.name,
      size: selectedFile.size,
      type: selectedFile.type || getMimeFromExtension(selectedFile.name),
      lastModified: new Date(selectedFile.lastModified).toISOString(),
      dataUrl: downloadURL,
      userId: user.uid,
    };

    try {
      await addDoc(collection(db, "files"), storedFile);
    } catch (error) {
      console.error("Error uploading file to Firestore:", error);
    }
    setFiles((prev) => [...prev, storedFile]);

    if (fileInput.current) fileInput.current.value = "";
  };

  // fetch files from firestore

  useEffect(() => {
    const fetchFiles = async () => {
      if (!user) return;
      const q = query(collection(db, "files"), where("userId", "==", user.uid));
      const querySnapshot = await getDocs(q);
      const filesData = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          name: data.name,
          size: data.size,
          type: data.type,
          lastModified: data.lastModified,
          dataUrl: data.dataUrl,
          userId: data.userId,
        } as StoredFile;
      });
      setFiles(filesData);
    };

    fetchFiles();
  }, [user]);

  const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFIle = event.target.files?.[0];
    if (!selectedFIle) return;

    setFile(selectedFIle);

    const reader = new FileReader();
    reader.onload = () => {
      const fileData: StoredFile = {
        id: crypto.randomUUID(),
        name: selectedFIle.name,
        size: selectedFIle.size,
        type: selectedFIle.type || getMimeFromExtension(selectedFIle.name),
        lastModified: new Date(selectedFIle.lastModified).toISOString(),
        dataUrl: reader.result as string,
        userId: user?.uid || "unknown",
      };
      setFiles((prev) => [...prev, fileData]);
    };
    reader.readAsDataURL(selectedFIle);

    if (fileInput.current) fileInput.current.value = "";
  };

  const handleClick = () => fileInput.current?.click();

  const handleDelete = (idx: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== idx));
    setShowModalDelete(!showModalDelete);
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

  const handleDownload = (file: StoredFile) => {
    const link = document.createElement("a");
    link.href = file.dataUrl;
    link.download = file.name;
    link.click();
  };

  const formatFileSize = (size: number) => {
    if (size < 1024) return `${size} B`;
    if (size < 1024 * 1024) return `${(size / 1024).toFixed(1)} KB`;
    return `${(size / (1024 * 1024)).toFixed(1)} MB`;
  };

  const getMimeFromExtension = (name: string) => {
    const ext = name.split(".").pop()?.toLowerCase();
    const map: Record<string, string> = {
      py: "text/x-python",
      js: "application/javascript",
      ts: "application/typescript",
      json: "application/json",
      html: "text/html",
      css: "text/css",
      txt: "text/plain",
      pdf: "application/pdf",
      png: "image/png",
      jpg: "image/jpeg",
      jpeg: "image/jpeg",
      gif: "image/gif",
      mp3: "audio/mpeg",
      mp4: "video/mp4",
      zip: "application/zip",
    };
    return map[ext || ""] || "unknown";
  };

  const getFileIcon = (type: string) => {
    if (!type) return <File className="w-5 h-5 text-gray-400" />;
    if (type.startsWith("image/"))
      return <FileImage className="w-5 h-5 text-blue-500" />;
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
      return <FileAudio className="w-5 h-5 text-purple-500" />;
    if (type.startsWith("video/"))
      return <FileVideo className="w-5 h-5 text-pink-500" />;
    return <File className="w-5 h-5 text-gray-400" />;
  };

  const filteredFiles = files.filter((f) =>
    f.name.toLowerCase().includes(search.toLowerCase())
  );

  const setSearchFunc = (e: any) => {
    setSearch(e.target.value);
  };

  return (
    <div className="px-6">
      {/* Control bar */}
      <ControlBar
        search={search}
        setSearchFunc={setSearchFunc}
        handleClickFunc={handleClick}
        handleUploadFunc={handleUpload}
        fileInput={fileInput}
      />

      {/* File Table */}
      <div className="overflow-hidden rounded-xl shadow border border-gray-800">
        <table className="w-full text-sm text-gray-300">
          <thead className="bg-gray-900 text-gray-400 text-left">
            <tr>
              <th className="p-4">File</th>
              <th className="p-4">Size</th>
              <th className="p-4">Type</th>
              <th className="p-4">Last Modified</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredFiles.length > 0 ? (
              filteredFiles.map((file, idx) => (
                <tr
                  key={idx}
                  className="border-t border-gray-800 hover:bg-gray-800/40 transition"
                >
                  <td className="p-4 flex items-center gap-3">
                    {getFileIcon(file.type)}
                    <span>{file.name}</span>
                  </td>
                  <td className="p-4">{formatFileSize(file.size)}</td>
                  <td className="p-4">{file.type}</td>
                  <td className="p-4">
                    {new Date(file.lastModified).toLocaleString()}
                  </td>
                  <td className="p-4 flex gap-3">
                    <button
                      onClick={() => openRenameModal(idx)}
                      className="text-yellow-400 cursor-pointer hover:text-yellow-500"
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setPreviewFile(file)}
                      className="text-green-400 cursor-pointer hover:text-green-500"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDownload(file)}
                      className="text-blue-400 cursor-pointer hover:text-blue-500"
                    >
                      <Download className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setShowModalDelete(!showModalDelete)}
                      className="text-red-400 cursor-pointer hover:text-red-500"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <ConfirmDelete
                      id={idx}
                      show={showModalDelete}
                      showFunc={setShowModalDelete}
                      deleteFunc={handleDelete}
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={5}
                  className="text-center py-10 text-gray-500 text-base"
                >
                  No files uploaded yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Rename Modal */}
      {renameIndex !== null && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50">
          <div className="bg-gray-900 p-6 rounded-xl shadow-lg w-[90%] max-w-md">
            <h2 className="text-lg font-semibold text-white mb-4">
              Rename File
            </h2>
            <input
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              className="w-full p-3 rounded bg-gray-800 text-white outline-none"
            />
            <div className="flex justify-end gap-3 mt-4">
              <button
                onClick={() => setRenameIndex(null)}
                className="px-4 py-2 rounded bg-gray-700 hover:bg-gray-600 text-white"
              >
                Cancel
              </button>
              <button
                onClick={saveRename}
                className="px-4 py-2 rounded bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2"
              >
                <Check className="w-4 h-4" /> Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Preview Modal */}
      {previewFile && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/70 z-50">
          <div className="bg-gray-900 p-6 rounded-xl shadow-lg w-[95%] max-w-3xl relative">
            <button
              onClick={() => setPreviewFile(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
            >
              <X className="w-6 h-6" />
            </button>
            <h2 className="text-lg font-semibold text-white mb-4">
              Preview: {previewFile.name}
            </h2>
            <div className="bg-gray-800 rounded p-4 max-h-[70vh] overflow-auto">
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
              ) : previewFile.type.startsWith("text/") ||
                previewFile.type.includes("json") ||
                previewFile.type.includes("javascript") ||
                previewFile.type.includes("python") ? (
                <pre className="text-sm text-gray-200 whitespace-pre-wrap">
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
  );
};

export default FileTable;
