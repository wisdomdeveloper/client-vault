import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import app from "./config";

const storage = getStorage(app);

export const uploadFile = async (file: File, path: string) => {
  const storageRef = ref(storage, path);
  await uploadBytes(storageRef, file);
  return getDownloadURL(storageRef);
};

export { storage };
