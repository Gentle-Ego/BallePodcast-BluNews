import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { ThemeToggle } from "./ThemeToggle";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useCurrentTheme } from "@/hooks/useCurrentTheme"; // Hook per il tema corrente

interface NavbarProps {
  transparent?: boolean;
}

export function Navbar({ transparent = false }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const currentTheme = useCurrentTheme();

  // In light mode, l'icona deve essere bianca se non si è scrollati (navbar trasparente)
  // e scura quando si è scrollati.
  // In dark mode, l'icona è sempre bianca.
  const hamburgerColor =
    currentTheme === "dark"
      ? "text-white"
      : (!isScrolled ? "text-white" : "text-gray-800");

  // Usare document.documentElement.scrollTop per una compatibilità maggiore su mobile
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = document.documentElement.scrollTop || window.pageYOffset;
      setIsScrolled(scrollTop > 10);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Chiamata immediata per impostare lo stato iniziale
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // La navbar è trasparente se viene passata la prop "transparent" e non si è scrollati.
  const isTransparent = transparent && !isScrolled;
  const navbarClass = isTransparent ? "transparent-navbar" : "colored-navbar";

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 py-4 px-6 md:px-12 ${navbarClass}`}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-3">
          <img 
            src="/logoBallerini.png" 
            alt="BallePodcast Logo" 
            className="h-10 w-auto"
          />
          <span className={`text-lg font-semibold ${isTransparent ? "text-white" : ""}`}>
            BallePodcast: BluNews
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-8">
          <Link 
            to="/episodi" 
            className={`text-sm font-medium hover:text-primary transition-colors ${isTransparent ? "text-white hover:text-white/80" : ""} ${location.pathname === "/episodi" ? "text-primary" : ""}`}
          >
            Episodi
          </Link>
          <Link 
            to="/informazioni" 
            className={`text-sm font-medium hover:text-primary transition-colors ${isTransparent ? "text-white hover:text-white/80" : ""} ${location.pathname === "/informazioni" ? "text-primary" : ""}`}
          >
            Informazioni
          </Link>
          <ThemeToggle transparent={isTransparent} />
        </div>

        {/* Mobile Hamburger Button */}
        <div className="md:hidden flex items-center">
          <ThemeToggle transparent={isTransparent} />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label="Toggle menu"
            className="ml-2"
          >
            {mobileMenuOpen ? (
              <X className={`h-6 w-6 ${hamburgerColor}`} />
            ) : (
              <Menu className={`h-6 w-6 ${hamburgerColor}`} />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute inset-x-0 top-full bg-background shadow-md">
          <div className="flex flex-col items-center py-4 space-y-4">
            <Link 
              to="/episodi" 
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              Episodi
            </Link>
            <Link 
              to="/informazioni" 
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              Informazioni
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
