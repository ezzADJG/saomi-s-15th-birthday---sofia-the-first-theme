import React, { useState, useEffect, useRef } from 'react';
import { Book } from './components/Book';
import { PageData } from './types';
import { CrownIcon, MusicIcon, MusicOffIcon } from './constants';

// Define the pages sequence
const PAGES: PageData[] = [
  { id: 0, type: 'cover' },
  { id: 1, type: 'intro' },
  { id: 2, type: 'details' },
  { id: 3, type: 'location' },
  { id: 4, type: 'dresscode' },
  { id: 5, type: 'parents' },
  { id: 6, type: 'godparents' },
  { id: 7, type: 'rsvp' },
  { id: 8, type: 'back' },
];

// Time to stay on each page (in milliseconds)
const READING_TIME = 6000; 

// Reliable Royalty-Free Classical Waltz (Tchaikovsky - Waltz of the Flowers)
// Hosted on Archive.org which provides direct MP3 access suitable for all browsers
const MUSIC_URL = "audio.mp3";

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  // Use 'any' to avoid issues with NodeJS.Timeout in browser-only environments
  const autoPlayRef = useRef<any>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  const handleNextPage = () => {
    setCurrentPage((prev) => {
      if (prev < PAGES.length) return prev + 1;
      return prev;
    });
  };

  const handlePrevPage = () => {
    setCurrentPage((prev) => {
      if (prev > 0) return prev - 1;
      return prev;
    });
  };

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isMusicPlaying) {
        audioRef.current.pause();
        setIsMusicPlaying(false);
      } else {
        // User interaction required to start audio
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              setIsMusicPlaying(true);
            })
            .catch(() => {
              // Log simple string to avoid circular JSON error
              console.log("Audio play failed. Interaction required or source error.");
            });
        }
      }
    }
  };

  const toggleAutoPlay = () => {
    if (isAutoPlaying) {
      setIsAutoPlaying(false);
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    } else {
      setIsAutoPlaying(true);
      // Try to start music when auto-play starts if it isn't already playing
      // This counts as a user interaction if triggered by click
      if (!isMusicPlaying && audioRef.current) {
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => setIsMusicPlaying(true))
            .catch(() => console.log("Auto-play audio blocked or failed"));
        }
      }
    }
  };

  useEffect(() => {
    if (isAutoPlaying) {
      autoPlayRef.current = setInterval(() => {
        setCurrentPage((prev) => {
          if (prev >= PAGES.length) {
            setIsAutoPlaying(false);
            if (autoPlayRef.current) clearInterval(autoPlayRef.current);
            return 0; // Reset to start
          }
          return prev + 1;
        });
      }, READING_TIME);
    }

    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [isAutoPlaying]);

  // Preload textures
  useEffect(() => {
     const img = new Image();
     img.src = "https://www.transparenttextures.com/patterns/cream-paper.png";
  }, []);

  return (
    <div className="h-screen w-screen bg-[#1a0b2e] flex flex-col items-center justify-center relative overflow-hidden">
      {/* Background Audio */}
      <audio 
        ref={audioRef} 
        src={MUSIC_URL} 
        loop 
        onError={() => console.log("Audio failed to load. Please check the network or URL.")}
      />

      {/* Background Ambience */}
      <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-purple-900 via-[#1a0b2e] to-black pointer-events-none"></div>
      
      {/* Main Book Component */}
      <div className="flex-grow w-full flex items-center justify-center py-4 md:py-10">
        <Book 
          pages={PAGES} 
          currentPage={currentPage} 
          onPageClick={(idx) => {
            if (idx === currentPage) handleNextPage();
            if (idx < currentPage) setCurrentPage(idx);
          }}
        />
      </div>

      {/* Controls UI */}
      <div className="absolute bottom-6 left-0 right-0 flex justify-center items-center gap-4 z-50 pointer-events-auto">
        
        {/* Music Toggle */}
        <button 
          onClick={toggleMusic}
          className="bg-white/10 backdrop-blur-md text-white p-3 rounded-full hover:bg-white/20 transition-all"
          aria-label={isMusicPlaying ? "Mute Music" : "Play Music"}
        >
          {isMusicPlaying ? <MusicIcon className="w-5 h-5" /> : <MusicOffIcon className="w-5 h-5" />}
        </button>

        <button 
          onClick={handlePrevPage}
          disabled={currentPage === 0}
          className="bg-white/10 backdrop-blur-md text-white p-3 rounded-full hover:bg-white/20 disabled:opacity-20 transition-all"
          aria-label="Previous Page"
        >
          ←
        </button>

        <button 
          onClick={toggleAutoPlay}
          className={`px-6 py-2 rounded-full font-bold transition-all flex items-center gap-2 shadow-lg ${isAutoPlaying ? 'bg-red-500 hover:bg-red-600 text-white' : 'bg-[#D4AF37] hover:bg-yellow-500 text-purple-900'}`}
        >
          {isAutoPlaying ? (
            <>⏸ Pause Video</>
          ) : (
            <>▶ Play Video Mode</>
          )}
        </button>

        <button 
          onClick={handleNextPage}
          disabled={currentPage === PAGES.length}
          className="bg-white/10 backdrop-blur-md text-white p-3 rounded-full hover:bg-white/20 disabled:opacity-20 transition-all"
          aria-label="Next Page"
        >
          →
        </button>
      </div>

      {/* Page Indicator */}
      <div className="absolute top-4 right-4 bg-black/40 px-3 py-1 rounded-full text-white/60 text-xs font-mono">
        Page {currentPage + 1} / {PAGES.length + 1}
      </div>
      
      {/* Floating Decorative Elements */}
      <div className="absolute top-10 left-10 animate-float opacity-20 text-[#D4AF37]">
         <CrownIcon className="w-12 h-12" />
      </div>
      <div className="absolute bottom-20 right-10 animate-float opacity-20 text-[#E8B4D9]" style={{ animationDelay: '2s' }}>
         <CrownIcon className="w-8 h-8 rotate-45" />
      </div>
    </div>
  );
};

export default App;