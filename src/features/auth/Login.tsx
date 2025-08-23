"use client";

import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";

export default function LoginPage() {
  const router = useRouter();

  async function handleLogin() {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();

    const result = await signInWithPopup(auth, provider);
    const idToken = await result.user.getIdToken(); // Firebase ID token

    // Send token to API route to set cookie
    await fetch("/api/auth/set-cookie", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token: idToken }),
    });

    router.push("/dashboard"); // redirect after cookie set
  }

  return (
    <div className="flex h-screen items-center justify-center bg-[var(--bg-secondary)]">
      <button
        onClick={handleLogin}
        className="cursor-pointer h-fit bg-[var(--bg-primary)] rounded-md py-3 px-6 flex items-center"
      >
        <FcGoogle className="text-3xl" />
        <span className="ml-3 font-medium">Continue with Google</span>
      </button>
    </div>
  );
}
