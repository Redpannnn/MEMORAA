"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { Music, Volume2, VolumeX } from "lucide-react";

interface MusicPlayerProps {
  src?: string;
  autoPlay?: boolean;
}

export default function MusicPlayer({ src = "/audio/wedding-bg.mp3", autoPlay = false }: MusicPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const isListeningRef = useRef(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const stopListening = useCallback(() => {
    isListeningRef.current = false;
  }, []);

  const togglePlay = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      audio.play().catch(() => {});
      setIsPlaying(true);
      stopListening();
    } else {
      audio.pause();
      setIsPlaying(false);
    }
  }, [stopListening]);

  const toggleMute = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.muted = !audio.muted;
    setIsMuted((prev) => !prev);
  }, []);

  // Auto-play: keep trying on every user interaction until it succeeds
  useEffect(() => {
    if (!autoPlay || isListeningRef.current) return;
    isListeningRef.current = true;

    const handleGesture = () => {
      if (!isListeningRef.current) return;
      const audio = audioRef.current;
      if (!audio || !audio.paused) return;

      audio.play()
        .then(() => {
          setIsPlaying(true);
          isListeningRef.current = false;
        })
        .catch(() => {
          // Blocked by browser — keep listening for next interaction
        });
    };

    // Try immediate play (works in some browser contexts)
    handleGesture();

    const events = ["click", "touchstart", "touchend", "pointerdown"] as const;
    events.forEach((evt) => document.addEventListener(evt, handleGesture, { passive: true }));

    return () => {
      events.forEach((evt) => document.removeEventListener(evt, handleGesture));
    };
  }, [autoPlay]);

  return (
    <>
      <audio ref={audioRef} src={src} loop preload="auto" />

      <div className="fixed bottom-5 right-5 z-[70] flex items-center gap-2">
        {/* Mute button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleMute();
          }}
          className="w-9 h-9 rounded-full bg-white/80 backdrop-blur-md shadow-lg border border-white/60 flex items-center justify-center text-stone-500 hover:text-stone-800 transition-all duration-200 active:scale-90"
          aria-label={isMuted ? "Unmute" : "Mute"}
        >
          {isMuted ? (
            <VolumeX className="h-3.5 w-3.5" />
          ) : (
            <Volume2 className="h-3.5 w-3.5" />
          )}
        </button>

        {/* Play/Pause button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            togglePlay();
          }}
          className={`relative w-12 h-12 rounded-full bg-white/80 backdrop-blur-md shadow-lg border border-white/60 flex items-center justify-center transition-all duration-300 active:scale-90 group ${
            isPlaying ? "text-rose-500" : "text-stone-600 hover:text-rose-500"
          }`}
          aria-label={isPlaying ? "Pause music" : "Play music"}
        >
          {isPlaying ? (
            <div
              className="w-7 h-7 rounded-full border-[2.5px] border-rose-400 border-dashed flex items-center justify-center animate-spin"
              style={{ animationDuration: "3s" }}
            >
              <div className="w-1.5 h-1.5 rounded-full bg-rose-400" />
            </div>
          ) : (
            <Music className="h-5 w-5 group-hover:scale-110 transition-transform" />
          )}
        </button>
      </div>
    </>
  );
}