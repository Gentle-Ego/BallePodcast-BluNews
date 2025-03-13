import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { AudioPlayer } from "@/components/AudioPlayer";
import episodes from "@/data/episodes";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const EpisodePage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [transcript, setTranscript] = useState("");
  const [loading, setLoading] = useState(true);
  
  const episodeIndex = episodes.findIndex(ep => ep.id === id);
  const episode = episodes[episodeIndex];
  
  useEffect(() => {
    if (!episode) return;
    setLoading(true);
    // Effettuiamo il fetch del file della trascrizione usando l'URL presente in episode.transcriptUrl
    fetch(episode.transcriptUrl)
      .then(res => {
        if (!res.ok) {
          throw new Error("Errore nel caricamento della trascrizione");
        }
        return res.text();
      })
      .then(text => {
        setTranscript(text);
        setLoading(false);
      })
      .catch(err => {
        console.error("Errore nel fetch della trascrizione:", err);
        setTranscript("Trascrizione non disponibile.");
        setLoading(false);
      });
  }, [id, episode]);
  
  if (!episode) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 pt-24 pb-16 px-4 md:px-8 max-w-7xl mx-auto w-full">
          <div className="text-center py-12">
            <h1 className="text-3xl font-bold mb-4">Episodio non trovato</h1>
            <p className="text-muted-foreground mb-8">
              L'episodio che stai cercando non esiste o è stato rimosso.
            </p>
            <Button asChild>
              <Link to="/episodi">Torna agli Episodi</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  const handlePrevious = () => {
    if (episodeIndex > 0) {
      navigate(`/episodi/${episodes[episodeIndex - 1].id}`);
    }
  };
  
  const handleNext = () => {
    if (episodeIndex < episodes.length - 1) {
      navigate(`/episodi/${episodes[episodeIndex + 1].id}`);
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-24 pb-16 px-4 md:px-8 max-w-4xl mx-auto w-full">
        <Button 
          variant="ghost" 
          size="sm" 
          className="flex items-center mb-8" 
          asChild
        >
          <Link to="/episodi">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Torna agli Episodi
          </Link>
        </Button>
        
        <div className="bg-card rounded-xl overflow-hidden shadow-md mb-8">
          <img src={`/images/${episode.imageUrl}`} alt={episode.title} />

        </div>
        
        <h1 className="text-3xl font-bold mb-2">{episode.title}</h1>
        <p className="text-muted-foreground mb-6">{episode.date}</p>
        
        <div className="mb-12">
          <AudioPlayer 
            episode={episode}
            onPrevious={handlePrevious}
            onNext={handleNext}
            hasPrevious={episodeIndex > 0}
            hasNext={episodeIndex < episodes.length - 1}
          />
        </div>
        
        <div className="prose dark:prose-invert max-w-none">
          <h2 className="text-2xl font-semibold mb-4">Trascrizione</h2>
          
          {loading ? (
            <div className="animate-pulse space-y-4">
              <div className="h-4 bg-muted rounded w-3/4"></div>
              <div className="h-4 bg-muted rounded"></div>
              <div className="h-4 bg-muted rounded"></div>
              <div className="h-4 bg-muted rounded w-5/6"></div>
              <div className="h-4 bg-muted rounded w-1/2"></div>
            </div>
          ) : (
            <div className="whitespace-pre-line text-muted-foreground">
              {transcript}
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default EpisodePage;
