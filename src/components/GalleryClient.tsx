"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, Play, Compass, Loader } from "lucide-react";

interface GalleryClientProps {
  initialItems: any[];
}

export default function GalleryClient({ initialItems }: GalleryClientProps) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  const [vrActive, setVrActive] = useState(false);
  const [vrLoading, setVrLoading] = useState(false);

  // Extract unique categories
  const categories = useMemo(() => {
    const cats = new Set(initialItems.map((item) => item.category));
    return ["All", ...Array.from(cats)];
  }, [initialItems]);

  const filteredItems = useMemo(() => {
    if (activeCategory === "All") return initialItems;
    return initialItems.filter((item) => item.category === activeCategory);
  }, [initialItems, activeCategory]);

  const handleLaunchVR = () => {
    setVrLoading(true);
    setTimeout(() => {
      setVrLoading(false);
      setVrActive(true);
    }, 2000);
  };

  return (
    <div className="space-y-16">
      {/* Category Filters */}
      <div className="flex flex-wrap items-center justify-center gap-3 border-b border-luxury-gold/10 pb-8">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-6 py-2.5 text-xs tracking-widest uppercase transition-all duration-300 ${
              activeCategory === cat
                ? "bg-luxury-gold text-luxury-black font-semibold"
                : "border border-luxury-gold/15 text-luxury-ivory/60 hover:text-luxury-gold hover:border-luxury-gold/30"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Masonry-Style Staggered Grid */}
      <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <AnimatePresence mode="popLayout">
          {filteredItems.map((item, idx) => (
            <motion.div
              key={item.url}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4 }}
              onClick={() => setLightboxImage(item.url)}
              className={`relative overflow-hidden cursor-pointer border border-luxury-gold/10 group ${
                idx % 5 === 0 ? "lg:col-span-2 lg:row-span-2 h-[450px]" : "h-64"
              }`}
            >
              <Image
                src={item.url}
                alt={item.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                className="object-cover group-hover:scale-105 transition-transform duration-[1.2s] filter brightness-95 group-hover:brightness-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-luxury-black/95 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                <span className="text-[0.6rem] tracking-[0.3em] uppercase text-luxury-gold mb-1 font-semibold">
                  {item.category}
                </span>
                <h4 className="font-serif text-lg text-luxury-ivory font-bold">{item.title}</h4>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* 360 VR virtual tour section */}
      <section className="border border-luxury-gold/15 p-8 md:p-12 glass-panel relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-15">
          <Image
            src="https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1200&q=80"
            alt="360 view"
            fill
            className="object-cover"
          />
        </div>

        <div className="relative z-10 flex flex-col items-center text-center max-w-2xl mx-auto space-y-6">
          <Compass className="text-luxury-gold animate-float" size={40} />
          <h3 className="font-serif text-3xl text-luxury-ivory">Immersive 360° Virtual Spheres</h3>
          <p className="text-xs text-luxury-ivory/60 leading-relaxed font-light">
            Take a self-guided virtual scan tour through our Presidential Villas and Executive Suites. Experience the detailed textures, architectural wood moldings, and panoramic views as if you were already there.
          </p>
          
          {vrLoading ? (
            <div className="flex items-center space-x-2 text-luxury-gold py-3 px-8 border border-luxury-gold/30 bg-luxury-gold/5 text-xs">
              <Loader className="animate-spin" size={14} />
              <span>ALIGNING VIRTUAL CAMERAS...</span>
            </div>
          ) : vrActive ? (
            <div className="w-full space-y-4">
              <div className="relative h-96 w-full border border-luxury-gold/25 bg-black overflow-hidden flex items-center justify-center">
                {/* Mock Panning Image/View */}
                <motion.div
                  className="absolute w-[200%] h-full"
                  animate={{ x: ["-25%", "0%", "-25%"] }}
                  transition={{ repeat: Infinity, duration: 45, ease: "linear" }}
                >
                  <Image
                    src="https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=2000&q=80"
                    alt="VR Room view"
                    fill
                    className="object-cover filter brightness-95 contrast-95"
                  />
                </motion.div>
                <div className="absolute inset-0 bg-radial-gradient from-transparent to-luxury-black/50 pointer-events-none" />
                <div className="absolute bottom-4 left-4 glass-panel px-3 py-1.5 text-[0.65rem] text-luxury-gold tracking-widest uppercase flex items-center space-x-2">
                  <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                  <span>360° ACTIVE TOUR</span>
                </div>
                <button
                  onClick={() => setVrActive(false)}
                  className="absolute top-4 right-4 bg-black/60 hover:bg-black/80 text-luxury-ivory p-2 rounded-full border border-luxury-gold/15"
                  aria-label="Exit VR"
                >
                  <X size={16} />
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={handleLaunchVR}
              className="btn-gold px-8 py-3 text-xs tracking-widest font-sans"
            >
              LAUNCH VIRTUAL TOUR
            </button>
          )}
        </div>
      </section>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxImage && (
          <motion.div
            className="fixed inset-0 z-[9999] bg-black/95 flex items-center justify-center p-4 cursor-zoom-out"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxImage(null)}
          >
            <button
              onClick={() => setLightboxImage(null)}
              className="absolute top-6 right-6 text-luxury-ivory hover:text-luxury-gold transition-colors focus:outline-none"
              aria-label="Close Lightbox"
            >
              <X size={28} />
            </button>
            <div className="relative max-w-5xl max-h-[85vh] w-full h-full">
              <Image
                src={lightboxImage}
                alt="Enlarged view"
                fill
                className="object-contain"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
