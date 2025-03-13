
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { EpisodeCard } from "@/components/EpisodeCard";
import episodes from "@/data/episodes";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Search, Disc } from "lucide-react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Progress } from "@/components/ui/progress";

const Episodes = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [searchResults, setSearchResults] = useState(episodes);
  const [activeFilter, setActiveFilter] = useState("all");
  
  // Simulate loading state
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Filter episodes based on search query and active filter
  useEffect(() => {
    if (searchQuery.trim() === "" && activeFilter === "all") {
      setSearchResults(episodes);
      return;
    }
    
    let filteredEpisodes = episodes;
    
    // Apply search filter
    if (searchQuery.trim() !== "") {
      filteredEpisodes = filteredEpisodes.filter(
        episode => 
          episode.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          episode.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Apply category filter
    if (activeFilter !== "all") {
      filteredEpisodes = filteredEpisodes.filter(
        episode => episode.featured === (activeFilter === "featured")
      );
    }
    
    setSearchResults(filteredEpisodes);
  }, [searchQuery, activeFilter]);
  
  const handleFilterChange = (value: string) => {
    if (value) setActiveFilter(value);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-32 pb-16 px-4 md:px-8 max-w-7xl mx-auto w-full gradient-bg">
        <div className="text-center mb-12 animate-fade-down">
          <h1 className="text-4xl font-bold mb-3 gradient-text">Esplora gli Episodi</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Scopri tutti gli episodi del BallePodcast e ascolta i contenuti che preferisci
          </p>
        </div>
        
        <div className="relative max-w-md mx-auto mb-10 animate-fade-in group" style={{ animationDelay: "0.2s" }}>
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
          </div>
          <Input
            type="search"
            placeholder="Cerca episodi per titolo o descrizione..."
            className="pl-10 py-6 transition-all border-muted focus:border-primary shadow-sm focus:shadow-md"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="flex justify-center mb-8 animate-fade-in" style={{ animationDelay: "0.3s" }}>
          <ToggleGroup type="single" value={activeFilter} onValueChange={handleFilterChange}>
            <ToggleGroupItem value="all" className="rounded-l-md">
              Tutti
            </ToggleGroupItem>
            <ToggleGroupItem value="featured" className="rounded-r-md">
              In Evidenza
            </ToggleGroupItem>
          </ToggleGroup>
        </div>
        
        {isLoading ? (
          <div className="space-y-6 animate-pulse">
            <div className="text-center mb-4">
              <Progress value={80} className="h-1 w-56 mx-auto" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="rounded-xl bg-card/50 h-80"></div>
              ))}
            </div>
          </div>
        ) : searchResults.length === 0 ? (
          <div className="text-center py-16 animate-fade-in">
            <Disc className="h-16 w-16 text-muted-foreground mx-auto mb-4 animate-pulse" />
            <p className="text-lg text-muted-foreground mb-2">
              Nessun episodio trovato per "{searchQuery}"
            </p>
            <p className="text-sm text-muted-foreground">
              Prova con una ricerca diversa o esplora tutti gli episodi
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {searchResults.map((episode, index) => (
              <div 
                key={episode.id} 
                className="animate-fade-in" 
                style={{ animationDelay: `${0.1 + index * 0.05}s` }}
              >
                <EpisodeCard episode={episode} />
              </div>
            ))}
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default Episodes;
