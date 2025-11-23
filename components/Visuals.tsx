import React, { useState, useEffect } from 'react';
import { PlaceholderProps, AnimatedElementProps } from '../types';
import { COLORS, SparkleIcon, AmuletIcon } from '../constants';

export const Placeholder: React.FC<PlaceholderProps> = ({ label, dimensions, seed = 1, className = '' }) => {
  return (
    <div className={`relative overflow-hidden rounded-lg shadow-lg ${className} group`}>
      {/* Fancy Border Frame */}
      <div className="absolute inset-0 border-[6px] border-double border-[#D4AF37] rounded-lg z-20 pointer-events-none"></div>
      <div className="absolute inset-[2px] border border-[#F5C6E8] rounded-lg z-20 pointer-events-none opacity-50"></div>
      
      {/* Corner Embellishments */}
      <div className="absolute top-0 left-0 w-6 h-6 border-t-[3px] border-l-[3px] border-[#D4AF37] rounded-tl-md z-30" />
      <div className="absolute top-0 right-0 w-6 h-6 border-t-[3px] border-r-[3px] border-[#D4AF37] rounded-tr-md z-30" />
      <div className="absolute bottom-0 left-0 w-6 h-6 border-b-[3px] border-l-[3px] border-[#D4AF37] rounded-bl-md z-30" />
      <div className="absolute bottom-0 right-0 w-6 h-6 border-b-[3px] border-r-[3px] border-[#D4AF37] rounded-br-md z-30" />

      <img 
        src={`https://picsum.photos/seed/${seed}/800/1200`} 
        alt={label}
        className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-1000 transform group-hover:scale-105 transition-transform"
      />
      
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 text-center p-4 backdrop-blur-[1px]">
         <div className="bg-white/10 p-3 rounded border border-white/30 backdrop-blur-sm">
            <span className="text-white font-serif text-sm font-bold tracking-widest uppercase mb-1 drop-shadow-md block">
            {label}
            </span>
            {dimensions && (
            <span className="text-white/80 text-[10px] font-mono border-t border-white/40 pt-1 inline-block">
                {dimensions}
            </span>
            )}
        </div>
      </div>
    </div>
  );
};

export const AnimatedElement: React.FC<AnimatedElementProps> = ({ children, delay = 0, animation = 'fade', isActive, className = '' }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // When isActive becomes true, schedule the show.
    // When isActive becomes false, hide immediately (reset).
    if (isActive) {
      const timer = setTimeout(() => setShow(true), delay);
      return () => clearTimeout(timer);
    } else {
      setShow(false);
    }
  }, [isActive, delay]);

  const getAnimationClass = () => {
    // If not showing, apply the "Exit" state.
    // We use a faster duration (500ms) for exit so it resets quickly for the next turn,
    // reducing the "wiping" visual effect while turning.
    if (!show) return 'opacity-0 translate-y-4 scale-95 transition-all duration-500 ease-in';
    
    // Enter states
    switch (animation) {
      case 'slide': return 'opacity-100 translate-y-0 transition-all duration-1000 ease-out';
      case 'zoom': return 'opacity-100 scale-100 transition-all duration-1000 cubic-bezier(0.34, 1.56, 0.64, 1)';
      case 'bounce': return 'opacity-100 animate-bounce';
      case 'typewriter': return 'opacity-100 transition-opacity duration-700'; // Logic handled by CSS opacity, visual handled by font? Usually typewriter needs JS, but fade in is fine here.
      case 'fade': default: return 'opacity-100 transition-opacity duration-1000';
    }
  };

  return (
    <div className={`${getAnimationClass()} ${className}`} style={{ transitionDelay: `${show ? 0 : 0}ms` }}>
      {children}
    </div>
  );
};

export const MagicParticles: React.FC = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">
      {[...Array(12)].map((_, i) => (
        <div 
          key={i}
          className="absolute text-[#D4AF37] animate-twinkle"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 4}s`,
            opacity: Math.random() * 0.7,
            transform: `scale(${Math.random() * 0.5 + 0.5})`
          }}
        >
          <SparkleIcon className="w-3 h-3 md:w-4 md:h-4" />
        </div>
      ))}
    </div>
  );
};

export const RoyalDivider: React.FC<{className?: string}> = ({className}) => (
  <div className={`flex items-center justify-center gap-2 my-2 opacity-60 ${className}`}>
    <div className="h-[1px] w-10 bg-gradient-to-r from-transparent to-[#D4AF37]"></div>
    <div className="w-2 h-2 rotate-45 bg-[#D4AF37]"></div>
    <div className="h-[1px] w-10 bg-gradient-to-l from-transparent to-[#D4AF37]"></div>
  </div>
);

export const AmuletDecoration: React.FC = () => (
    <div className="absolute -top-6 left-1/2 -translate-x-1/2 z-20 drop-shadow-lg">
        <div className="relative">
             {/* Chain */}
             <div className="absolute -top-10 left-[-60px] w-[60px] h-[60px] border-b-2 border-r-2 border-[#C0C0C0] rounded-br-full"></div>
             <div className="absolute -top-10 right-[-60px] w-[60px] h-[60px] border-b-2 border-l-2 border-[#C0C0C0] rounded-bl-full"></div>
             <AmuletIcon className="w-16 h-16" />
        </div>
    </div>
);