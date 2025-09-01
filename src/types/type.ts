export interface UserData {
  id: string;
  photoURL: string;
  name: string;
  email: string;
  uid: string;
}

export interface StoredFile {
  id: string;
  name: string;
  size: number;
  type: string;
  lastModified: string;
  dataUrl: string;
  userId: string;
}
