"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  Maximize2,
  Bed,
  Users2,
  Check,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Compass,
  Sparkles,
  Calendar
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface RoomDetailCoordinatorProps {
  hotel: any;
  room: any;
}

export default function RoomDetailCoordinator({ hotel, room }: RoomDetailCoordinatorProps) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const toggleFullscreen = () => {
    if (!videoRef.current) return;
    if (videoRef.current.requestFullscreen) {
      videoRef.current.requestFullscreen();
    } else if ((videoRef.current as any).webkitRequestFullscreen) {
      (videoRef.current as any).webkitRequestFullscreen();
    } else if ((videoRef.current as any).msRequestFullscreen) {
      (videoRef.current as any).msRequestFullscreen();
    }
  };

  return (
    <div className="space-y-12">
      {/* Back navigation */}
      <div className="flex items-center justify-between border-b border-luxury-gold/10 pb-6">
        <Link
          href={`/hotels/${hotel.slug}`}
          className="flex items-center space-x-3 text-sm text-luxury-gold hover:text-luxury-gold-light transition-colors duration-300 font-sans tracking-wider"
        >
          <ArrowLeft size={16} />
          <span className="uppercase">Back to {hotel.name}</span>
        </Link>
        <div className="text-xs text-luxury-silver font-light tracking-[0.2em] uppercase hidden sm:block">
          Exclusive Suite Details
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Video & Media Area (7 Columns) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="relative w-full h-[60vh] lg:h-[75vh] overflow-hidden border border-luxury-gold/15 bg-luxury-black shadow-lg group">
            {room.video ? (
              <>
                <video
                  ref={videoRef}
                  src={room.video}
                  autoPlay
                  muted={isMuted}
                  loop
                  playsInline
                  className="w-full h-full object-cover cursor-pointer"
                  onClick={toggleFullscreen}
                />
                
                {/* Control overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-luxury-ivory/85 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-between p-6">
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={togglePlay}
                      className="w-10 h-10 rounded-full bg-luxury-gold/90 text-luxury-black flex items-center justify-center hover:bg-luxury-gold-light hover:scale-105 transition-all duration-300 shadow-md"
                    >
                      {isPlaying ? <Pause size={16} className="fill-luxury-black" /> : <Play size={16} className="ml-0.5 fill-luxury-black" />}
                    </button>
                    <button
                      onClick={toggleMute}
                      className="w-10 h-10 rounded-full bg-luxury-gold/90 text-luxury-black flex items-center justify-center hover:bg-luxury-gold-light hover:scale-105 transition-all duration-300 shadow-md"
                    >
                      {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                    </button>
                    <button
                      onClick={toggleFullscreen}
                      className="w-10 h-10 rounded-full bg-luxury-gold/90 text-luxury-black flex items-center justify-center hover:bg-luxury-gold-light hover:scale-105 transition-all duration-300 shadow-md"
                      title="Fullscreen"
                    >
                      <Maximize2 size={16} />
                    </button>
                  </div>
                  
                  <span className="text-[0.65rem] text-luxury-gold tracking-[0.3em] uppercase font-sans font-medium">
                    Immersive Room Tour
                  </span>
                </div>

                {/* Floating Mute Indicator */}
                {isMuted && (
                  <div className="absolute top-4 right-4 bg-luxury-ivory/70 border border-luxury-gold/25 px-2 py-1 text-[0.6rem] text-luxury-gold tracking-widest uppercase font-sans">
                    Muted
                  </div>
                )}
              </>
            ) : (
              <div className="w-full h-full relative">
                <Image
                  src={room.images[0] || hotel.images[0]}
                  alt={room.name}
                  fill
                  className="object-cover"
                />
              </div>
            )}
          </div>

          {/* Photo Gallery of Room */}
          <div className="space-y-4">
            <h5 className="font-serif text-lg text-luxury-ivory tracking-wide">Room Gallery</h5>
            <div className="grid grid-cols-3 gap-4">
              {room.images.map((img: string, idx: number) => (
                <div
                  key={idx}
                  onClick={() => setLightboxImage(img)}
                  className="relative h-24 sm:h-32 overflow-hidden border border-luxury-gold/10 cursor-pointer group"
                >
                  <Image
                    src={img}
                    alt={`${room.name} view ${idx + 1}`}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-95"
                  />
                  <div className="absolute inset-0 bg-luxury-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="text-[0.55rem] text-luxury-gold border border-luxury-gold/30 px-2 py-0.5 uppercase tracking-widest bg-luxury-black/50">
                      Expand
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Room Spec & Booking (5 Columns) */}
        <div className="lg:col-span-5 space-y-8 bg-luxury-charcoal/20 border border-luxury-gold/10 p-8 sm:p-10 gold-glow">
          {/* Header */}
          <div className="space-y-2">
            <span className="text-[0.65rem] text-luxury-gold tracking-[0.3em] uppercase font-sans">
              Sanctuary Quarters
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl text-luxury-ivory tracking-wide">
              {room.name}
            </h1>
            <div className="flex items-center space-x-2 pt-1">
              <span className="font-serif text-2xl text-luxury-gold">${room.price}</span>
              <span className="text-xs text-luxury-silver tracking-wider font-light">/ night</span>
            </div>
          </div>

          {/* Key Specs */}
          <div className="grid grid-cols-3 gap-4 border-y border-luxury-gold/15 py-4 text-xs text-luxury-ivory/80 font-sans">
            <div className="flex flex-col items-center justify-center p-3 bg-luxury-charcoal/30 border border-luxury-gold/5 text-center space-y-1">
              <Maximize2 size={16} className="text-luxury-gold" />
              <span className="text-[0.6rem] text-luxury-silver uppercase tracking-wider font-light">Space</span>
              <span className="font-semibold">{room.size}</span>
            </div>
            <div className="flex flex-col items-center justify-center p-3 bg-luxury-charcoal/30 border border-luxury-gold/5 text-center space-y-1">
              <Bed size={16} className="text-luxury-gold" />
              <span className="text-[0.6rem] text-luxury-silver uppercase tracking-wider font-light">Bedding</span>
              <span className="font-semibold">{room.bedType}</span>
            </div>
            <div className="flex flex-col items-center justify-center p-3 bg-luxury-charcoal/30 border border-luxury-gold/5 text-center space-y-1">
              <Users2 size={16} className="text-luxury-gold" />
              <span className="text-[0.6rem] text-luxury-silver uppercase tracking-wider font-light">Guests</span>
              <span className="font-semibold">Max {room.occupancy.adults}</span>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-3 text-sm text-luxury-ivory/70 font-light leading-relaxed">
            <p>{room.description}</p>
            <p>
              Experience unmatched hospitality with custom-tailored layout design, private climate control,
              and panoramic vistas curated to match your aesthetic desires.
            </p>
          </div>

          {/* Full Amenities */}
          <div className="space-y-4">
            <h4 className="text-xs text-luxury-gold tracking-[0.25em] uppercase font-semibold">
              Included Indulgences
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-luxury-ivory/85">
              {room.amenities.map((amen: string) => (
                <div key={amen} className="flex items-center space-x-3">
                  <div className="w-5 h-5 rounded-full border border-luxury-gold/20 flex items-center justify-center bg-luxury-gold/5 text-luxury-gold flex-shrink-0">
                    <Check size={10} />
                  </div>
                  <span>{amen}</span>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Link */}
          <div className="pt-4">
            <Link
              href={`/hotels/${hotel.slug}?room=${room.slug}#booking-card`}
              className="btn-gold w-full py-4 text-center text-xs tracking-[0.2em] font-sans font-medium hover:scale-[1.01] transition-transform duration-300 block shadow-lg uppercase"
            >
              Book this Quarters
            </Link>
          </div>
        </div>
      </div>

      {/* Lightbox for Gallery */}
      <AnimatePresence>
        {lightboxImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxImage(null)}
            className="fixed inset-0 z-50 bg-luxury-black/95 flex items-center justify-center p-4 cursor-pointer"
          >
            <button
              onClick={() => setLightboxImage(null)}
              className="absolute top-6 right-6 text-luxury-gold hover:text-luxury-gold-light transition-colors duration-300"
            >
              <ArrowLeft size={24} />
            </button>
            <div className="relative max-w-5xl max-h-[85vh] w-full h-full">
              <Image
                src={lightboxImage}
                alt="Room detail zoom"
                fill
                className="object-contain"
                sizes="(max-width: 1200px) 100vw, 1200px"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
