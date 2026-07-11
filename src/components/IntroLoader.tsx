"use client";

import { useEffect, useState } from "react";

export default function IntroLoader() {
  const [progress, setProgress] = useState(0);
  const [isFading, setIsFading] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    // Lock scroll on mount
    if (typeof window !== "undefined") {
      document.documentElement.classList.add("lenis-stopped");
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
    }

    // Step-based realistic progress calculation
    let currentProgress = 0;
    const interval = setInterval(() => {
      const remaining = 100 - currentProgress;
      if (remaining <= 0) {
        clearInterval(interval);
        setProgress(100);
        
        // Start fade out after a tiny pause at 100%
        setTimeout(() => {
          setIsFading(true);
          
          // Unmount component and restore scroll after fade transition completes
          setTimeout(() => {
            setIsCompleted(true);
            document.documentElement.classList.remove("lenis-stopped");
            document.documentElement.style.overflow = "";
            document.body.style.overflow = "";
          }, 1000); // matches the transition duration (1000ms)
        }, 500); // pause duration at 100%
        return;
      }

      // Progress increments by varying steps for a natural feel
      const step = Math.min(remaining, Math.floor(Math.random() * 8) + 3);
      currentProgress += step;
      setProgress(currentProgress);
    }, 70);

    return () => {
      clearInterval(interval);
      if (typeof window !== "undefined") {
        document.documentElement.classList.remove("lenis-stopped");
        document.documentElement.style.overflow = "";
        document.body.style.overflow = "";
      }
    };
  }, []);

  if (isCompleted) return null;

  const formattedProgress = progress < 10 ? `0${progress}` : `${progress}`;

  return (
    <div
      className={`fixed inset-0 z-[99999] bg-luxury-black flex flex-col items-center justify-center select-none transition-opacity duration-[1000ms] ease-in-out ${
        isFading ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      {/* BRANDING AND LOADING STATUS */}
      <div className="flex flex-col items-center justify-center text-center">
        {/* Subtle Luxury Scroll/Intro Text */}
        <span className="text-[0.65rem] md:text-[0.75rem] tracking-[0.5em] uppercase text-luxury-gold/80 mb-4 font-sans font-medium">
          EARLS HOTELS & RESORTS
        </span>

        {/* Brand Name */}
        <h1 className="font-serif text-5xl md:text-7xl text-luxury-ivory tracking-[0.2em] font-light mb-6 select-none text-center">
          E A R L &apos; S
        </h1>

        {/* Luxury Subtitle */}
        <p className="text-[0.6rem] md:text-[0.7rem] tracking-[0.3em] uppercase text-luxury-ivory/60 mb-12 max-w-xs text-center font-sans">
          SRI LANKA&apos;S FINEST SANCTUARIES
        </p>

        {/* Counter and Progress Bar container */}
        <div className="flex flex-col items-center">
          <div className="font-serif text-4xl md:text-5xl text-luxury-gold tracking-[0.1em] font-extralight select-none tabular-nums">
            {formattedProgress}
            <span className="text-lg md:text-xl text-luxury-gold/60 ml-1">%</span>
          </div>

          {/* Golden Shimmering Loader Bar */}
          <div className="w-56 md:w-64 h-[2px] bg-luxury-ivory/10 mt-6 relative overflow-hidden rounded-full">
            <div
              style={{ width: `${progress}%` }}
              className="h-full bg-gradient-to-r from-luxury-gold-dark via-luxury-gold to-luxury-gold-light absolute left-0 top-0 transition-all duration-300 ease-out shadow-[0_0_10px_rgba(200,164,92,0.6)]"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
