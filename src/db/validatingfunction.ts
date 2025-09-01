function validateFileData({
  name,
  size,
  type,
  uploadedAt,
  userUID,
  url,
}: {
  name: string;
  size: number;
  type: string;
  uploadedAt?: string;
  userUID: string;
  url: string;
}) {
  if (!name || typeof name !== "string" || name.length > 255)
    throw new Error("Invalid file name");
  if (!Number.isInteger(size) || size < 0) throw new Error("Invalid file size");
  if (!type || typeof type !== "string" || type.length > 100)
    throw new Error("Invalid file type");
  if (uploadedAt && isNaN(Date.parse(uploadedAt)))
    throw new Error("Invalid upload date");
  if (!userUID || typeof userUID !== "string" || userUID.length > 255)
    throw new Error("Invalid user UID");
  try {
    new URL(url);
  } catch {
    throw new Error("Invalid file URL");
  }
  if (url.length > 2048) throw new Error("File URL too long");
}
