Ecco due soluzioni da applicare per risolvere i problemi:

---

### 1. Rimuovere l'effetto cerchio (hover overlay) mantenendo la rotazione

Il “cerchio” che appare sotto l’icona in hover è probabilmente ereditato dagli stili di default del bottone ghost. Per rimuoverlo pur mantenendo la rotazione dell’icona, basta forzare lo sfondo a rimanere trasparente durante hover/active. Ad esempio, nel componente **ThemeToggle.tsx** modifica la proprietà `className` del bottone aggiungendo le classi per eliminare il background in hover e in active:

```tsx
<Button 
  variant="ghost" 
  size="icon" 
  onClick={toggleTheme}
  // Aggiungi hover e active trasparent per eliminare l'overlay
  className="rounded-full relative overflow-hidden group focus:ring-0 hover:bg-transparent active:bg-transparent"
  aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
>
  {theme === "light" ? (
    <Moon className={`h-5 w-5 transform transition-transform duration-300 group-hover:rotate-12 ${transparent ? "text-white" : "text-gray-800"}`} />
  ) : (
    <Sun className="h-5 w-5 transform transition-transform duration-300 text-white group-hover:rotate-90" />
  )}
  <span className="sr-only">Toggle theme</span>
</Button>
```

Questo override (hover:bg-transparent active:bg-transparent) impedirà al bottone di applicare un background extra (quello a forma di cerchio) quando ci passi sopra, lasciando invariato l’effetto di rotazione.

---

### 2. Hamburger mobile non visibile in light mode e problemi al cambio viewport

Il problema sembra dovuto al fatto che il colore dell’icona nell’header mobile viene calcolato usando la prop `transparent && !isScrolled`, che però non si adatta correttamente in mobile. La soluzione è usare un hook che rilevi il tema corrente (chiaro o scuro) e applicare la classe appropriata.

#### a. Crea un hook per il tema corrente (puoi metterlo in un file separato, ad esempio `useCurrentTheme.ts`):

```tsx
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
```

#### b. Modifica la sezione mobile del componente **Navbar.tsx** in modo che usi il nuovo hook:

```tsx
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { ThemeToggle } from "./ThemeToggle";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useCurrentTheme } from "@/hooks/useCurrentTheme"; // importa il nuovo hook

interface NavbarProps {
  transparent?: boolean;
}

export function Navbar({ transparent = false }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const currentTheme = useCurrentTheme(); // ottieni il tema corrente

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

        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-8">
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
              <X className={`h-6 w-6 ${currentTheme === "dark" ? "text-white" : "text-gray-800"}`} />
            ) : (
              <Menu className={`h-6 w-6 ${currentTheme === "dark" ? "text-white" : "text-gray-800"}`} />
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

Queste modifiche faranno sì che:
- Il bottone per il cambio tema non applichi più l'effetto "cerchio" (grazie a hover:bg-transparent active:bg-transparent) ma mantenga la rotazione in hover.
- In modalità mobile, l'icona dell'hamburger (e quella di chiusura) userà il colore basato sul tema corrente (usando il nostro hook `useCurrentTheme`) invece di basarsi esclusivamente sul prop `transparent`, così da avere sempre il contrasto corretto quando si passa da desktop a mobile.

Applica questi aggiornamenti e verifica che ora:
- Non ci sia più l'effetto di cerchio sotto l'icona in hover;
- L'icona dell'hamburger in mobile si adatti correttamente al tema (in light mode scura o in dark mode chiara).

Se persistono ulteriori problemi, fammi sapere!