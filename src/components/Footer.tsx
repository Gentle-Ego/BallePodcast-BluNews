
import { Facebook, Instagram, Mail, Twitter } from "lucide-react";
import { Link } from "react-router-dom";

export function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-muted py-12 mt-20">
      <div className="container px-4 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center mb-4">
              <img 
                src="/logoBallerini.png" 
                alt="BallePodcast Logo" 
                className="h-10 w-auto mr-3"
              />
              <span className="text-lg font-semibold">BallePodcast: BluNews</span>
            </Link>
            <p className="text-muted-foreground text-sm">
              BallePodcast è il podcast ufficiale per le BluNews del Ballerini. Ascolta le ultime notizie e aggiornamenti settimanali direttamente dal tuo dispositivo preferito.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/episodi" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Episodi
                </Link>
              </li>
              <li>
                <Link to="/informazioni" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Informazioni
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Contatti</h3>
            <div className="flex space-x-4 mb-4">
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="mailto:info@ballepodcast.it" className="text-muted-foreground hover:text-foreground transition-colors">
                <Mail className="h-5 w-5" />
              </a>
            </div>
            <p className="text-sm text-muted-foreground">Email: info@ballepodcast.it</p>
          </div>
        </div>
        
        <div className="border-t border-border mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground mb-4 md:mb-0">
            &copy; {currentYear} BallePodcast. Tutti i diritti riservati.
          </p>
          <div className="flex space-x-6">
            <Link to="/privacy" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              Privacy Policy
            </Link>
            <Link to="/termini" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              Termini di Servizio
            </Link>
            <Link to="/cookie" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
