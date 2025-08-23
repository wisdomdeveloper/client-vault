"use client";


import { auth } from "@/lib/firebase/auth";
import { signOut } from "firebase/auth";

const NavigationBar = () => {
  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        console.log("User signed out");
      })
      .catch((error) => {
        console.error("Sign out error", error);
      });
    console.log("Logout clicked");
  };

  return (
    <header className="w-full flex justify-center fixed top-0 left-0 right-0 z-50 border-b border-[var(--border-color)]">
      <nav
        className="flex items-center justify-between container
        py-4 px-6
        bg-[var(--bg-backdrop)]
        backdrop-blur-md backdrop-saturate-150 shadow-lg"
      >
        <div className="cursor-pointer text-white text-[length:var(--heading-l)] font-semibold tracking-wide">
          <span>CLIENTVAULT</span>
        </div>
        <div className="flex items-center">
          <button
            className="rounded-lg py-2 px-4 bg-[var(--error)] cursor-pointer
            text-white font-medium shadow-sm hover:opacity-90 transition"
            onClick={handleLogout}
          >
            Logout
          </button>
          <div className="ml-5">
            <div
              className="w-[52px] h-[52px] rounded-full
              bg-gray-300 border border-[var(--border-color)]
              shadow-inner"
            ></div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default NavigationBar;
