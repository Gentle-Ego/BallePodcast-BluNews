
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { ThemeToggle } from "./ThemeToggle";

interface NavbarProps {
  transparent?: boolean;
}

export function Navbar({ transparent = false }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navbarClass = transparent && !isScrolled 
    ? "transparent-navbar" 
    : "colored-navbar";

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 py-4 px-6 md:px-12 ${navbarClass}`}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-3">
          <img 
            src="/logoBallerini.png" 
            alt="BallePodcast Logo" 
            className="h-10 w-auto"
          />
          <span className={`text-lg font-semibold ${transparent && !isScrolled ? "text-white" : ""}`}>
            BallePodcast: BluNews
          </span>
        </Link>

        <div className="flex items-center space-x-8">
          <Link 
            to="/episodi" 
            className={`text-sm font-medium hover:text-primary transition-colors ${transparent && !isScrolled ? "text-white hover:text-white/80" : ""} ${location.pathname === "/episodi" ? "text-primary" : ""}`}
          >
            Episodi
          </Link>
          <Link 
            to="/informazioni" 
            className={`text-sm font-medium hover:text-primary transition-colors ${transparent && !isScrolled ? "text-white hover:text-white/80" : ""} ${location.pathname === "/informazioni" ? "text-primary" : ""}`}
          >
            Informazioni
          </Link>
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}
