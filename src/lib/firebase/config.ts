// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBhBSZLS-IGfInQa5rcjF8czqeIBteHPqo",
  authDomain: "client-vault-c6548.firebaseapp.com",
  projectId: "client-vault-c6548",
  storageBucket: "client-vault-c6548.firebasestorage.app",
  messagingSenderId: "986611049480",
  appId: "1:986611049480:web:6b0c23593b9886b1ff9dbd",
  measurementId: "G-KE0NR9FPV7",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export default app;
