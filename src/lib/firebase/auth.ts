import app from "@/lib/firebase/config";

import {
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from "firebase/auth";

import { doc, getDoc, getFirestore, setDoc } from "firebase/firestore";

const auth = getAuth(app);

const db = getFirestore(app);

const provider = new GoogleAuthProvider();

// sign in with Google
export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider);

    const user = result.user;

    const userRef = doc(db, "users", user.uid);

    const docSnap = await getDoc(userRef);

    if (!docSnap.exists()) {
      await setDoc(userRef, {
        uid: user.uid,
        name: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        createdAt: new Date(),
      });
    } else {
      await setDoc(
        userRef,
        {
          name: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
          lastLogin: new Date(),
        },
        { merge: true }
      );
    }

    return user;
  } catch (error) {
    console.error("Error during sign-in:", error);
    throw error;
  }
};

export const logout = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Error during sign-out:", error);
    throw error;
  }
};

export const listenForAuthChanges = (callback: (user: any) => void) => {
  return onAuthStateChanged(auth, callback);
};

export { auth, db };
