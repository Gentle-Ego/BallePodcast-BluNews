
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { EpisodeCard } from "@/components/EpisodeCard";
import episodes from "@/data/episodes";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Search, Disc } from "lucide-react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Progress } from "@/components/ui/progress";
import { motion } from "framer-motion";

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

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-28 pb-16 w-full gradient-bg">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: -10 }} 
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl sm:text-5xl font-bold mb-3 gradient-text">Esplora gli Episodi</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Scopri tutti gli episodi del BallePodcast e ascolta i contenuti che preferisci
            </p>
          </motion.div>
          
          <div className="relative max-w-xl mx-auto mb-12">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="group glass-card ring-1 ring-white/10 shadow-lg"
            >
              <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                <Search className="h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
              </div>
              <Input
                type="search"
                placeholder="Cerca episodi per titolo o descrizione..."
                className="pl-12 py-6 transition-all bg-transparent border-none focus:ring-2 focus:ring-primary/30"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </motion.div>
          </div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="flex justify-center mb-12"
          >
            <ToggleGroup type="single" value={activeFilter} onValueChange={handleFilterChange} className="glass-card p-1">
              <ToggleGroupItem value="all" className="rounded-l-md data-[state=on]:bg-primary/20 data-[state=on]:text-foreground px-6">
                Tutti
              </ToggleGroupItem>
              <ToggleGroupItem value="featured" className="rounded-r-md data-[state=on]:bg-primary/20 data-[state=on]:text-foreground px-6">
                In Evidenza
              </ToggleGroupItem>
            </ToggleGroup>
          </motion.div>
          
          {isLoading ? (
            <div className="space-y-8 animate-pulse">
              <div className="text-center mb-4">
                <Progress value={80} className="h-1 w-56 mx-auto" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                  <div key={i} className="rounded-xl glass-card h-80"></div>
                ))}
              </div>
            </div>
          ) : searchResults.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <Disc className="h-20 w-20 text-muted-foreground mx-auto mb-6 animate-pulse" />
              <p className="text-xl text-muted-foreground mb-3">
                Nessun episodio trovato per "{searchQuery}"
              </p>
              <p className="text-base text-muted-foreground">
                Prova con una ricerca diversa o esplora tutti gli episodi
              </p>
            </motion.div>
          ) : (
            <motion.div 
              variants={container}
              initial="hidden"
              animate="show"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
            >
              {searchResults.map((episode) => (
                <motion.div key={episode.id} variants={item}>
                  <EpisodeCard episode={episode} />
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Episodes;
