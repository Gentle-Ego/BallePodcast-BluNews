
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ChevronDown } from "lucide-react";
import { EpisodeCard } from "@/components/EpisodeCard";
import episodes from "@/data/episodes";
import { useRef } from "react";

const Index = () => {
  const featuredSection = useRef<HTMLDivElement>(null);
  
  const scrollToFeatured = () => {
    featuredSection.current?.scrollIntoView({ behavior: "smooth" });
  };
  
  const featuredEpisodes = episodes.filter(episode => episode.featured);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar transparent />
      
      {/* Hero section */}
      <section className="relative w-full h-screen overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1478737270239-2f02b77fc618?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" 
            alt="Podcast Background" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 hero-gradient"></div>
        </div>
        
        <div className="relative z-10 h-full flex flex-col items-center justify-center px-4 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 animate-fade-down">
            Benvenuto al BallePodcast
          </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-3xl animate-fade-in" style={{ animationDelay: "0.2s" }}>
            Qui potrai sentire ai podcast delle BluNews del Ballerini senza il bisogno di guardare lo schermo...
          </p>
        </div>
        
        <div 
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10 cursor-pointer animate-bounce-down"
          onClick={scrollToFeatured}
        >
          <ChevronDown className="h-10 w-10 text-white" />
        </div>
      </section>
      
      {/* Featured episodes section */}
      <section 
        ref={featuredSection}
        className="py-16 px-4 md:px-8 max-w-7xl mx-auto w-full"
      >
        <h2 className="text-3xl font-bold mb-8">Episodi in evidenza</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {featuredEpisodes.slice(0, 2).map((episode) => (
            <EpisodeCard 
              key={episode.id} 
              episode={episode} 
              featured
            />
          ))}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredEpisodes.slice(2).map((episode) => (
            <EpisodeCard 
              key={episode.id} 
              episode={episode}
            />
          ))}
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
