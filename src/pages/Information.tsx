
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Headphones, Newspaper, Calendar, Users } from "lucide-react";

const Information = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-24 pb-16 px-4 md:px-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-center">Informazioni sul BallePodcast</h1>
          
          <div className="mb-16">
            <img 
              src="https://images.unsplash.com/photo-1589903308904-1010c2294adc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" 
              alt="Studio Podcast" 
              className="w-full h-64 md:h-96 object-cover rounded-xl mb-8"
            />
            
            <p className="text-lg text-muted-foreground mb-6">
              Benvenuto alla pagina informativa di BallePodcast: BluNews. Il nostro podcast è dedicato a portarti le ultime notizie e aggiornamenti dal mondo Ballerini in un formato audio facilmente accessibile.
            </p>
            
            <p className="text-lg text-muted-foreground">
              Il nostro obiettivo è rendere l'informazione accessibile a tutti, permettendoti di restare aggiornato anche quando non puoi guardare uno schermo. Che tu sia in viaggio, a fare sport o semplicemente rilassato a casa, BallePodcast è il modo perfetto per rimanere informato.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <div className="bg-card p-6 rounded-xl shadow-sm">
              <div className="flex items-center mb-4">
                <div className="p-3 bg-primary/10 rounded-full mr-4">
                  <Headphones className="h-6 w-6 text-primary" />
                </div>
                <h2 className="text-xl font-semibold">Il Nostro Podcast</h2>
              </div>
              <p className="text-muted-foreground">
                BallePodcast: BluNews è un podcast settimanale che raccoglie e presenta le notizie più rilevanti della settimana in modo conciso e piacevole. Ogni episodio dura circa 3-5 minuti, perfetto per il tuo pendolarismo o per una pausa caffè.
              </p>
            </div>
            
            <div className="bg-card p-6 rounded-xl shadow-sm">
              <div className="flex items-center mb-4">
                <div className="p-3 bg-primary/10 rounded-full mr-4">
                  <Newspaper className="h-6 w-6 text-primary" />
                </div>
                <h2 className="text-xl font-semibold">I Nostri Contenuti</h2>
              </div>
              <p className="text-muted-foreground">
                Copriamo una vasta gamma di argomenti: dall'attualità alla scienza, dalla cultura allo sport, dalla tecnologia all'economia. Il nostro team editoriale seleziona con cura le notizie più importanti e le presenta in modo chiaro e obiettivo.
              </p>
            </div>
            
            <div className="bg-card p-6 rounded-xl shadow-sm">
              <div className="flex items-center mb-4">
                <div className="p-3 bg-primary/10 rounded-full mr-4">
                  <Calendar className="h-6 w-6 text-primary" />
                </div>
                <h2 className="text-xl font-semibold">La Nostra Programmazione</h2>
              </div>
              <p className="text-muted-foreground">
                Nuovi episodi vengono pubblicati ogni Martedì. Non preoccuparti se ne perdi uno: tutti gli episodi rimangono disponibili nel nostro archivio, accessibile in qualsiasi momento tramite questo sito web o sull'email ufficiale.
              </p>
            </div>
          
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Information;
