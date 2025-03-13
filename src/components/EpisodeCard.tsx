
import { Episode } from "@/data/episodes";
import { Play } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./ui/hover-card";

interface EpisodeCardProps {
  episode: Episode;
  featured?: boolean;
}

export function EpisodeCard({ episode, featured = false }: EpisodeCardProps) {
  return (
    <div 
      className={`
        overflow-hidden rounded-xl bg-card shadow-md transition-all 
        card-hover group 
        ${featured ? "flex flex-col md:flex-row" : ""} 
        animate-scale-up
      `}
    >
      <div className={`relative ${featured ? "md:w-1/2" : "w-full"}`}>
        <img 
          src={episode.imageUrl} 
          alt={episode.title} 
          className={`w-full h-56 object-cover transition-transform duration-700 group-hover:scale-105 ${featured ? "md:h-full" : ""}`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-90 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <Link to={`/episodi/${episode.id}`}>
            <Button 
              size="icon" 
              variant="secondary" 
              className="rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all scale-100 group-hover:scale-110"
            >
              <Play className="h-6 w-6 text-white" />
            </Button>
          </Link>
        </div>
        <Badge 
          className="absolute top-3 right-3 bg-primary/80 backdrop-blur-sm text-white"
        >
          {episode.duration}
        </Badge>
      </div>
      
      <div className={`p-5 ${featured ? "md:w-1/2" : ""}`}>
        <div className="flex justify-between items-start mb-2">
          <HoverCard>
            <HoverCardTrigger asChild>
              <Link to={`/episodi/${episode.id}`} className="hover:underline">
                <h3 className="text-lg font-semibold gradient-text">{episode.title}</h3>
              </Link>
            </HoverCardTrigger>
            <HoverCardContent className="glass-card w-80">
              <div className="space-y-2">
                <h4 className="text-sm font-medium">{episode.title}</h4>
                <p className="text-xs text-muted-foreground">{episode.description}</p>
              </div>
            </HoverCardContent>
          </HoverCard>
        </div>
        
        <p className="text-sm text-muted-foreground mb-3">{episode.date}</p>
        <p className="text-sm line-clamp-3 mb-3">{episode.description}</p>
        
        <div className="mt-4 flex justify-between items-center">
          <Link 
            to={`/episodi/${episode.id}`}
            className="text-primary text-sm font-medium relative inline-block after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-primary after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left"
          >
            Ascolta ora
          </Link>
          
          <Button 
            variant="ghost" 
            size="sm" 
            className="rounded-full hover:bg-primary/10"
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
