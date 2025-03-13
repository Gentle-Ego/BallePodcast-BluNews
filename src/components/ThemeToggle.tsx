
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export function ThemeToggle() {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
    document.documentElement.classList.toggle("dark", savedTheme === "dark");
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  return (
    <Button 
      variant="ghost" 
      size="icon" 
      onClick={toggleTheme}
      className="rounded-full hover:bg-muted relative overflow-hidden group"
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      <div className="relative z-10">
        {theme === "light" ? (
          <Moon className="h-5 w-5 transform transition-transform duration-300 group-hover:rotate-12" />
        ) : (
          <Sun className="h-5 w-5 transform transition-transform duration-300 group-hover:rotate-90" />
        )}
      </div>
      <span className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-podcast-purple/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"></span>
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
