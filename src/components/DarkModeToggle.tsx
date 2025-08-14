import { useEffect, useState } from "react";

const DarkModeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDarkMode);
    localStorage.setItem("darkMode", JSON.stringify(isDarkMode));
  }, [isDarkMode]);

  <div>
    <button onClick={() => setIsDarkMode(!isDarkMode)}>
      {isDarkMode ? "☀ Light Mode" : "🌙 Dark Mode"}
    </button>
  </div>;
};

export default DarkModeToggle;
