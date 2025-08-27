import { addDoc, collection, getDocs, getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import app from "./config";

const db = getFirestore(app);
const storage = getStorage(app);

export { addDoc, collection, db, getDocs, storage };
