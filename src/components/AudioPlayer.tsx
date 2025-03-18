
import { useState, useRef, useEffect, useCallback } from "react";
import { Play, Pause, SkipBack, SkipForward, Volume2 } from "lucide-react";
import { Button } from "./ui/button";
import { Slider } from "./ui/slider";
import { Episode } from "@/data/episodes";

interface AudioPlayerProps {
  episode: Episode;
  onNext?: () => void;
  onPrevious?: () => void;
  hasNext?: boolean;
  hasPrevious?: boolean;
}

export function AudioPlayer({ 
  episode, 
  onNext, 
  onPrevious, 
  hasNext = false, 
  hasPrevious = false 
}: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.8);

  const handleLoadedMetadata = useCallback(() => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  }, []);

  const handleEnded = useCallback(() => {
    setIsPlaying(false);
    setCurrentTime(0);
  }, []);

  useEffect(() => {
    // Reset player when episode changes
    setIsPlaying(false);
    setCurrentTime(0);

    // Create audio element
    const audio = new Audio(episode.audioUrl);
    audioRef.current = audio;

    // Set event listeners
    audio.addEventListener("timeupdate", updateProgress);
    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("ended", handleEnded);

    // Set volume
    audio.volume = volume;

    return () => {
      // Clean up
      audio.pause();
      audio.removeEventListener("timeupdate", updateProgress);
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("ended", handleEnded);
    };
  }, [episode, volume, handleLoadedMetadata, handleEnded]);

  const updateProgress = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeChange = (value: number[]) => {
    if (audioRef.current) {
      audioRef.current.currentTime = value[0];
      setCurrentTime(value[0]);
    }
  };

  const handleVolumeChange = (value: number[]) => {
    const newVolume = value[0];
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
    setVolume(newVolume);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return (
    <div className="w-full p-4 bg-card rounded-xl shadow-md">
      <div className="flex flex-col space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium line-clamp-1">{episode.title}</h3>
          <span className="text-xs text-muted-foreground">{episode.date}</span>
        </div>
        
        <div className="flex items-center space-x-2">
          <span className="text-xs text-muted-foreground w-10">
            {formatTime(currentTime)}
          </span>
          
          <Slider 
            value={[currentTime]} 
            max={duration || 100} 
            step={0.1} 
            onValueChange={handleTimeChange}
            className="flex-1"
          />
          
          <span className="text-xs text-muted-foreground w-10">
            {duration ? formatTime(duration) : episode.duration}
          </span>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex-1 flex items-center justify-start">
            <div className="flex items-center space-x-2">
              <Volume2 className="h-4 w-4 text-muted-foreground" />
              <Slider 
                value={[volume]} 
                max={1} 
                step={0.01} 
                onValueChange={handleVolumeChange}
                className="w-20"
              />
            </div>
          </div>
          
          <div className="flex-1 flex items-center justify-center space-x-4">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={onPrevious}
              disabled={!hasPrevious}
              className={`${!hasPrevious ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              <SkipBack className="h-5 w-5" />
            </Button>
            
            <Button 
              variant="default" 
              size="icon" 
              onClick={togglePlay}
              className="h-12 w-12 rounded-full"
            >
              {isPlaying ? (
                <Pause className="h-6 w-6" />
              ) : (
                <Play className="h-6 w-6 ml-1" />
              )}
            </Button>
            
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={onNext}
              disabled={!hasNext}
              className={`${!hasNext ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              <SkipForward className="h-5 w-5" />
            </Button>
          </div>
          
          <div className="flex-1"></div>
        </div>
      </div>
    </div>
  );
}
