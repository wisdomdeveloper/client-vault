"use client";

import { auth, db } from "@/lib/firebase/auth";
import { UserData } from "@/types/type";
import { signOut } from "firebase/auth";
import { collection, getDocs } from "firebase/firestore";
import { Folder, Home, LogOut, Settings, User } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const Sidebar = () => {
  const [users, setUsers] = useState<UserData[]>([]);
  const [showDropDown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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

  console.log(users);

  useEffect(() => {
    const fetchUserData = async () => {
      const querySnapshot = await getDocs(collection(db, "users"));
      const usersData = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          photoURL: data.photoURL ?? "",
          name: data.name ?? "",
          email: data.email ?? "",
          uid: data.uid ?? "",
        } as UserData;
      });
      setUsers(usersData);
    };

    fetchUserData();
  }, []);

  return (
    <div>
      <aside className="w-64 h-screen fixed text-white bg-zinc-900 border-r border-zinc-800 px-3 py-6 flex flex-col">
        <h1 className="text-2xl font-bold mb-10 text-purple-500">
          📁 FileDash
        </h1>

        <nav className="flex flex-col gap-4 flex-1">
          <a className="flex hover:bg-gray-800 items-center gap-3 group cursor-pointer">
            <Home className="w-5 h-5 text-gray-400 group-hover:text-purple-400 transition" />
            <span className="relative">Dashboard</span>
          </a>

          <a className="flex items-center gap-3 group cursor-pointer">
            <Folder className="w-5 h-5 text-gray-400 group-hover:text-purple-400 transition" />
            <span className="relative">Files</span>
          </a>

          <a className="flex items-center gap-3 group cursor-pointer">
            <Settings className="w-5 h-5 text-gray-400 group-hover:text-purple-400 transition" />
            <span className="relative">Settings</span>
          </a>

          <div className="flex-1" />

          {/* Profile + dropdown */}
          <div ref={dropdownRef} className="relative">
            {/* Trigger */}
            <div
              onClick={() => setShowDropdown((prev) => !prev)}
              className="flex items-center cursor-pointer rounded-lg hover:bg-zinc-800 p-2 text-gray-300 transition-colors"
            >
              <div className="mr-2 h-[32px] w-[32px] flex items-center justify-center rounded-lg overflow-hidden">
                {!users ? (
                  <User />
                ) : (
                  <img
                    src={users[0]?.photoURL || ""}
                    alt="Profile"
                    className="max-full w-full h-full object-cover rounded-lg"
                  />
                )}
              </div>
              <div className="flex flex-col leading-tight">
                <span className="font-medium text-sm">
                  {!users[0]?.name ? "Username" : users[0]?.name}
                </span>
                <span className="text-[12px]">{users[0]?.email}</span>
              </div>
            </div>

            {/* Dropdown */}
            <div
              className={[
                "absolute bottom-full right-0 left-0 mb-2 z-50",
                "bg-zinc-800 rounded-md shadow-lg overflow-hidden",
                "transition duration-200 ease-out origin-bottom",
                showDropDown
                  ? "opacity-100 translate-y-0 pointer-events-auto"
                  : "opacity-0 -translate-y-1 pointer-events-none",
              ].join(" ")}
            >
              <button
                className="w-full flex items-center text-red-500 cursor-pointer p-3 hover:bg-zinc-700"
                type="button"
                onClick={handleLogout}
              >
                <LogOut className="w-[20px]" />
                <span className="ml-2 text-[14px]">Log out</span>
              </button>
            </div>
          </div>
        </nav>
      </aside>
    </div>
  );
};

export default Sidebar;
