
import { Episode } from "@/data/episodes";
import { Play } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";

interface EpisodeCardProps {
  episode: Episode;
  featured?: boolean;
}

export function EpisodeCard({ episode, featured = false }: EpisodeCardProps) {
  return (
    <div className={`overflow-hidden rounded-lg bg-card shadow-md transition-all hover:shadow-lg ${featured ? "flex flex-col md:flex-row" : ""}`}>
      <div className={`relative ${featured ? "md:w-1/2" : "w-full"}`}>
        <img 
          src={episode.imageUrl} 
          alt={episode.title} 
          className={`w-full h-56 object-cover ${featured ? "md:h-full" : ""}`}
        />
        <div className="absolute inset-0 bg-black/30 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
          <Link to={`/episodi/${episode.id}`}>
            <Button size="icon" variant="secondary" className="rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30">
              <Play className="h-6 w-6 text-white" />
            </Button>
          </Link>
        </div>
      </div>
      
      <div className={`p-5 ${featured ? "md:w-1/2" : ""}`}>
        <div className="flex justify-between items-start mb-2">
          <Link to={`/episodi/${episode.id}`} className="hover:underline">
            <h3 className="text-lg font-semibold">{episode.title}</h3>
          </Link>
          <span className="text-xs text-muted-foreground shrink-0 ml-2">{episode.duration}</span>
        </div>
        
        <p className="text-sm text-muted-foreground mb-3">{episode.date}</p>
        <p className="text-sm line-clamp-3">{episode.description}</p>
        
        <div className="mt-4 flex justify-between items-center">
          <Link 
            to={`/episodi/${episode.id}`}
            className="text-primary text-sm font-medium hover:underline"
          >
            Ascolta ora
          </Link>
          
          <Button 
            variant="ghost" 
            size="sm" 
            className="rounded-full"
            asChild
          >
            <Link to={`/episodi/${episode.id}`}>
              <Play className="h-4 w-4 mr-1" />
              Play
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
