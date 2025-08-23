// Import the Firebase app instance from your custom config file
import app from "@/lib/firebase/config";

// Import Firebase Authentication functions
import {
  getAuth, // Used to initialize authentication service
  GoogleAuthProvider, // Function to log user out
  onAuthStateChanged, // Google OAuth provider
  signInWithPopup, // Function to sign in using popup UI
  signOut, // Function to log user out
} from "firebase/auth";

// Import Firestore (database) functions
import {
  doc, // Creates or updates a document in Firestore
  getDoc, // Fetches a document from Firestore
  getFirestore, // Creates a reference to a specific document
  setDoc,
} from "firebase/firestore";

// Initialize Firebase Authentication using your app instance
const auth = getAuth(app);

// Initialize Firestore database using your app instance
const db = getFirestore(app);

// Create a Google OAuth provider object for Google sign-in
const provider = new GoogleAuthProvider();

// ---------------- SIGN IN WITH GOOGLE -----------------
export const signInWithGoogle = async () => {
  try {
    // Trigger Google login popup and wait for user to sign in
    const result = await signInWithPopup(auth, provider);

    // Extract the signed-in user's information from the result
    const user = result.user;

    // Reference to Firestore "users" collection, under the current user's UID
    const userRef = doc(db, "users", user.uid);

    // Check if the user document already exists in Firestore
    const docSnap = await getDoc(userRef);

    if (!docSnap.exists()) {
      // If the document does NOT exist → this is a NEW user
      // Create a new user document in Firestore with their details
      await setDoc(userRef, {
        uid: user.uid, // Unique user ID from Firebase
        name: user.displayName, // User's display name from Google
        email: user.email, // User's email
        photoURL: user.photoURL, // Profile picture URL
        createdAt: new Date(), // Timestamp for account creation
      });
    } else {
      // If document already exists → this is a RETURNING user
      // Update their details and log last login time
      await setDoc(
        userRef,
        {
          name: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
          lastLogin: new Date(), // Record their most recent login
        },
        { merge: true } // Merge ensures we don’t overwrite existing fields
      );
    }

    // Return the signed-in user object so the caller can use it
    return user;
  } catch (error) {
    // Catch and log any error during sign-in
    console.error("Error during sign-in:", error);
    throw error; // Re-throw so the calling function knows it failed
  }
};

// ---------------- SIGN OUT -----------------
export const logout = async () => {
  try {
    // Call Firebase function to sign the user out
    await signOut(auth);
  } catch (error) {
    // Log any error during logout
    console.error("Error during sign-out:", error);
    throw error;
  }
};

// ---------------- LISTEN FOR AUTH STATE CHANGES -----------------
// Useful to persist user session across refreshes or track login/logout
export const listenForAuthChanges = (callback: (user: any) => void) => {
  // onAuthStateChanged will run whenever:
  // 1. The user logs in
  // 2. The user logs out
  // 3. The app initializes and Firebase checks local storage
  return onAuthStateChanged(auth, callback);
};

// Export auth and db so other parts of the app can use them
export { auth, db };
