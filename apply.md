Qui di seguito trovi due aggiornamenti da applicare:

---

### 1. Rimuovere l’effetto “circolare” sull’hover

Verifica il componente **ThemeToggle.tsx**: rimuovi qualsiasi classe o pseudo-elemento che aggiunge un background extra sull’hover. Ad esempio, se avevi un `<span>` assoluto che applicava un background gradient durante l’hover, rimuovilo. Nel codice che ti ho proposto in precedenza ho già eliminato quel `<span>`. Assicurati che nel componente non ci siano altre classi che aggiungano un effetto di “hover background” circolare; ad esempio, evita di usare classi come `hover:bg-muted` se non desideri alcun cambiamento visivo.

Esempio aggiornato di **ThemeToggle.tsx** (senza overlay hover):

```tsx
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

interface ThemeToggleProps {
  transparent?: boolean;
}

export function ThemeToggle({ transparent = false }: ThemeToggleProps) {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedTheme = (localStorage.getItem("theme") as "light" | "dark") || "light";
    setTheme(savedTheme);
    document.documentElement.classList.toggle("dark", savedTheme === "dark");
  }, []);

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
      // Rimuoviamo hover:bg-muted per non avere alcun background hover
      className="rounded-full focus:ring-0"
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
    >
      {theme === "light" ? (
        <Moon className={`h-5 w-5 transform transition-transform duration-300 ${transparent ? "text-white" : "text-gray-800"}`} />
      ) : (
        <Sun className="h-5 w-5 transform transition-transform duration-300 text-white" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
```

---

### 2. Risolvere il problema dell'hamburger in modalità mobile

Nel componente **Navbar.tsx** per la sezione mobile, modifica l'icona dell'hamburger (e quella di chiusura) in modo da applicare la stessa logica di colore usata in ThemeToggle. Ad esempio, imposta la classe in base a `transparent && !isScrolled` per far sì che in modalità chiara la icona appaia bianca su sfondi scuri.

Ecco il frammento aggiornato di **Navbar.tsx** per la sezione mobile:

```tsx
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { ThemeToggle } from "./ThemeToggle";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

interface NavbarProps {
  transparent?: boolean;
}

export function Navbar({ transparent = false }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navbarClass = transparent && !isScrolled ? "transparent-navbar" : "colored-navbar";

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 py-4 px-6 md:px-12 ${navbarClass}`}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-3">
          <img src="/logoBallerini.png" alt="BallePodcast Logo" className="h-10 w-auto" />
          <span className={`text-lg font-semibold ${transparent && !isScrolled ? "text-white" : ""}`}>
            BallePodcast: BluNews
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-8">
          <Link
            to="/episodi"
            className={`text-sm font-medium hover:text-primary transition-colors ${
              transparent && !isScrolled ? "text-white hover:text-white/80" : ""
            } ${location.pathname === "/episodi" ? "text-primary" : ""}`}
          >
            Episodi
          </Link>
          <Link
            to="/informazioni"
            className={`text-sm font-medium hover:text-primary transition-colors ${
              transparent && !isScrolled ? "text-white hover:text-white/80" : ""
            } ${location.pathname === "/informazioni" ? "text-primary" : ""}`}
          >
            Informazioni
          </Link>
          <ThemeToggle transparent={transparent && !isScrolled} />
        </div>

        {/* Mobile Hamburger Button */}
        <div className="md:hidden flex items-center">
          <ThemeToggle transparent={transparent && !isScrolled} />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label="Toggle menu"
            className="ml-2"
          >
            {mobileMenuOpen ? (
              <X className={`h-6 w-6 ${transparent && !isScrolled ? "text-white" : "text-gray-800"}`} />
            ) : (
              <Menu className={`h-6 w-6 ${transparent && !isScrolled ? "text-white" : "text-gray-800"}`} />
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
- Il componente **ThemeToggle** non genera più alcun effetto hover circolare perché abbiamo rimosso il background hover e l'overlay.
- Nel menu mobile, l'icona dell'hamburger (e quella di chiusura) riceve una classe condizionale che, se la navbar è trasparente (ovvero `transparent && !isScrolled`), forza il colore dell'icona a essere bianco per garantire la visibilità su sfondo scuro.

Applica queste modifiche e verifica che in tutte le situazioni (desktop, mobile, modalità chiara e scura) l'interfaccia sia coerente e le icone siano sempre leggibili.

Fammi sapere se serve ulteriore assistenza o modifiche!