"use client";

import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function LoginPage() {
  const router = useRouter();

  async function handleLogin() {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();

    const result = await signInWithPopup(auth, provider);
    const idToken = await result.user.getIdToken();

    await fetch("/api/auth/set-cookie", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token: idToken }),
    });

    router.push("/dashboard");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-zinc-950 via-zinc-900 to-black p-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-md"
      >
        <Card className="backdrop-blur-xl bg-zinc-900/70 border border-zinc-800 text-white shadow-2xl rounded-2xl transition hover:shadow-indigo-500/10">
          <CardHeader className="space-y-2 text-center">
            <CardTitle className="text-2xl font-bold tracking-tight">
              Welcome back
            </CardTitle>
            <CardDescription className="text-zinc-400">
              Sign in to access your dashboard
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  className="bg-zinc-800/50 border-zinc-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/50 transition"
                  required
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <a
                    href="#"
                    className="text-sm text-indigo-400 hover:text-indigo-300 transition-colors"
                  >
                    Forgot password?
                  </a>
                </div>
                <Input
                  id="password"
                  type="password"
                  className="bg-zinc-800/50 border-zinc-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/50 transition"
                  required
                />
              </div>
              <Button
                type="submit"
                className="w-full text-white bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 transition-all shadow-md cursor-pointer hover:shadow-lg hover:shadow-indigo-500/20"
              >
                Sign in
              </Button>
            </form>
          </CardContent>

          <CardFooter className="flex flex-col gap-3">
            <div className="flex items-center gap-2 w-full">
              <div className="h-px flex-1 bg-zinc-700" />
              <span className="text-xs text-zinc-500">OR</span>
              <div className="h-px flex-1 bg-zinc-700" />
            </div>
            <Button
              variant="outline"
              onClick={handleLogin}
              className="w-full border-zinc-700 bg-zinc-800/50 hover:bg-zinc-800 text-white hover:text-white cursor-pointer flex items-center gap-2 transition"
            >
              <FcGoogle className="text-lg" />
              Continue with Google
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
}
