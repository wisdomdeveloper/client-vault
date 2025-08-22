"use client";

import { login } from "@/lib/actions/auth";
import { FcGoogle } from "react-icons/fc";

const Login = () => {
  return (
    <div className="flex h-screen items-center justify-center bg-[var(--bg-secondary)]">
      <button
        onClick={() => login()}
        className="cursor-pointer h-fit bg-[var(--bg-primary)] rounded-md py-3 px-6 flex items-center"
      >
        <FcGoogle className="text-3xl" />
        <span className="ml-3 font-medium">Continue with Google</span>
      </button>
    </div>
  );
};

export default Login;
