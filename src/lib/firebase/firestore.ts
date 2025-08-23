import { addDoc, collection, getDocs, getFirestore } from "firebase/firestore";
import app from "./config";

const db = getFirestore(app);

export { addDoc, collection, db, getDocs };
