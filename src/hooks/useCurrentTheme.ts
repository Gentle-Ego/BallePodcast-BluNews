import { useState, useEffect } from "react";

export function useCurrentTheme() {
  const [currentTheme, setCurrentTheme] = useState("light");
  useEffect(() => {
    const updateTheme = () => {
      setCurrentTheme(
        document.documentElement.classList.contains("dark") ? "dark" : "light"
      );
    };
    updateTheme();
    window.addEventListener("storage", updateTheme);
    return () => window.removeEventListener("storage", updateTheme);
  }, []);
  return currentTheme;
}
