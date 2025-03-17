Per far sì che l'icona dell'hamburger in modalità mobile segua la stessa logica dinamica dell'icona adiacente (ThemeToggle), puoi creare una variabile (ad esempio `isTransparent`) che verifica se la navbar deve essere trasparente (ossia se `transparent && !isScrolled` è true) e usarla per impostare il colore dell'icona.

Ad esempio, nel file **Navbar.tsx** modifica il codice della sezione mobile in questo modo:

```tsx
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { ThemeToggle } from "./ThemeToggle";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useCurrentTheme } from "@/hooks/useCurrentTheme"; // se necessario

interface NavbarProps {
  transparent?: boolean;
}

export function Navbar({ transparent = false }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  // Puoi continuare a usare useCurrentTheme se serve per altri casi,
  // ma per il colore della navbar usiamo la stessa logica di ThemeToggle:
  const isTransparent = transparent && !isScrolled;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
              <X className={`h-6 w-6 ${isTransparent ? "text-white" : "text-gray-800"}`} />
            ) : (
              <Menu className={`h-6 w-6 ${isTransparent ? "text-white" : "text-gray-800"}`} />
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
```

In questo modo:

- Viene definita la variabile `isTransparent` basata su `transparent && !isScrolled`, che è esattamente la stessa logica usata dal **ThemeToggle**.
- L'icona dell'hamburger (sia la X che il Menu) usa `isTransparent` per decidere il colore: se `isTransparent` è true, l'icona è bianca; altrimenti è scura (`text-gray-800`).

Questo farà sì che l'icona dell'hamburger cambi colore dinamicamente nello stesso modo dell'icona adiacente, risolvendo il problema che avevi.