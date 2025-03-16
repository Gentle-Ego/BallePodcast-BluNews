import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

interface ThemeToggleProps {
  transparent?: boolean;
}

export function ThemeToggle({ transparent }: ThemeToggleProps) {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [mounted, setMounted] = useState(false);

  // Initialize theme from localStorage and set up system
  useEffect(() => {
    setMounted(true);
    const savedTheme = (localStorage.getItem("theme") as "light" | "dark") || "light";
    setTheme(savedTheme);
    document.documentElement.classList.toggle("dark", savedTheme === "dark");
  }, []);

  // This ensures theme changes are synchronized across pages
  useEffect(() => {
    if (!mounted) return;

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "theme") {
        const newTheme = (e.newValue as "light" | "dark") || "light";
        setTheme(newTheme);
        document.documentElement.classList.toggle("dark", newTheme === "dark");
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [mounted]);

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
          // In light mode, mostra un’icona di luna con un colore che risalti sullo sfondo chiaro
          <Moon className={`h-5 w-5 transform transition-transform duration-300 group-hover:rotate-12 ${transparent ? "text-white" : "text-gray-800"}`} />
        ) : (
          // In dark mode, mostra il sole con un colore caldo (ad esempio, giallo)
          <Sun className="h-5 w-5 text-yellow-400 transform transition-transform duration-300 group-hover:rotate-90" />
        )}
      </div>
      <span className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-podcast-purple/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"></span>
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
