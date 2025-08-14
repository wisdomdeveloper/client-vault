"use client";

import { signIn } from "next-auth/react";

const LogIn = () => {
  const handleSignIn = async () => {
    signIn("google", { callbackUrl: "/dashboard" });
  };

  return (
    <div className="w-full h-screen overflow-y-hidden flex items-center">
      <div className="p-10 mx-auto max-w-[500px] border border-[var(--border-color)] rounded-[8px]">
        <div>
          <div className="text-[length:var(--heading-xl)] text-center">
            CLIENTVAULT
          </div>
          <div className="text-center text-[length:var(--body-l)] text-[var(--text-primary)] mt-[16px]">
            clientvault: work smart not hard. Global storage for work of anykind
          </div>
        </div>
        <div className="mx-auto flex justify-center">
          <button></button>
          <button
            onClick={handleSignIn}
            className="border border-[var(--border-color)] px-8 py-3 text-[length:var(--body-s)] font-[500] hover:bg-white hover:text-black text-[var(--text-primary)] rounded-[4px] mt-8 transition cursor-pointer w-full"
          >
            Sign in
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogIn;
