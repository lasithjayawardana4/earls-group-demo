"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  Compass,
  Star,
  Maximize2,
  Bed,
  Users2,
  Check,
  ChevronRight,
  X,
  Award,
  ChevronDown,
  Loader
} from "lucide-react";
import BookingWidget from "./BookingWidget";
import { motion, AnimatePresence } from "framer-motion";

interface HotelDetailCoordinatorProps {
  hotel: any;
  rooms: any[];
  relatedHotels: any[];
}

export default function HotelDetailCoordinator({
  hotel,
  rooms,
  relatedHotels,
}: HotelDetailCoordinatorProps) {
  const [selectedRoomSlug, setSelectedRoomSlug] = useState(rooms[0]?.slug || "deluxe-room");
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  const [openFAQIndex, setOpenFAQIndex] = useState<number | null>(null);
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  const searchParams = useSearchParams();
  const roomParam = searchParams.get("room");
  const urlCheckIn = searchParams.get("checkIn");
  const urlCheckOut = searchParams.get("checkOut");

  const [checkIn, setCheckIn] = useState(urlCheckIn || "");
  const [checkOut, setCheckOut] = useState(urlCheckOut || "");
  const [availability, setAvailability] = useState<any[]>([]);
  const [isFetchingAvail, setIsFetchingAvail] = useState(false);

  useEffect(() => {
    if (roomParam && rooms.some((r) => r.slug === roomParam)) {
      setSelectedRoomSlug(roomParam);
      const hash = window.location.hash;
      if (hash === "#booking-card") {
        setIsBookingOpen(true);
      }
    }
  }, [roomParam, rooms]);

  // Initialize search dates and query availability
  useEffect(() => {
    let defaultIn = urlCheckIn || "";
    let defaultOut = urlCheckOut || "";

    if (!defaultIn || !defaultOut) {
      const today = new Date();
      const tomorrow = new Date(today);
      tomorrow.setDate(today.getDate() + 1);
      const dayAfter = new Date(tomorrow);
      dayAfter.setDate(tomorrow.getDate() + 2);

      defaultIn = tomorrow.toISOString().split("T")[0];
      defaultOut = dayAfter.toISOString().split("T")[0];
    }

    setCheckIn(defaultIn);
    setCheckOut(defaultOut);
    fetchLiveAvailability(defaultIn, defaultOut);
  }, [urlCheckIn, urlCheckOut]);

  const fetchLiveAvailability = async (ci: string, co: string) => {
    if (!ci || !co) return;
    if (new Date(ci) >= new Date(co)) {
      setAvailability([]);
      return;
    }
    setIsFetchingAvail(true);
    try {
      const res = await fetch(`/api/availability?checkIn=${ci}&checkOut=${co}`);
      if (res.ok) {
        const data = await res.json();
        setAvailability(data.rooms || []);
      }
    } catch (e) {
      console.error("Failed to fetch availability:", e);
    } finally {
      setIsFetchingAvail(false);
    }
  };

  const handleDateChange = (type: "in" | "out", value: string) => {
    if (type === "in") {
      setCheckIn(value);
      if (checkOut && new Date(value) >= new Date(checkOut)) {
        const nextDay = new Date(value);
        nextDay.setDate(nextDay.getDate() + 1);
        const nextDayStr = nextDay.toISOString().split("T")[0];
        setCheckOut(nextDayStr);
        fetchLiveAvailability(value, nextDayStr);
      } else {
        fetchLiveAvailability(value, checkOut);
      }
    } else {
      setCheckOut(value);
      fetchLiveAvailability(checkIn, value);
    }
  };

  const getRoomTypeCode = (slug: string) => {
    if (slug === "deluxe-room") return "DELUXE";
    if (slug === "premier-room") return "PREMIER";
    if (slug === "executive-suite") return "EXECUTIVE_SUITE";
    if (slug === "presidential-villa") return "PRESIDENTIAL_VILLA";
    return "EXECUTIVE_SUITE";
  };

  // Open booking modal
  const handleReserveRoom = (roomSlug: string) => {
    setSelectedRoomSlug(roomSlug);
    setIsBookingOpen(true);
  };

  return (
    <div className="w-full space-y-20 relative">
        {/* Description */}
        <section id="about" className="space-y-6">
          <h3 className="font-serif text-3xl text-luxury-ivory tracking-wide">
            The Sanctuary Overview
          </h3>
          <p className="text-base text-luxury-ivory/70 font-light leading-relaxed">
            {hotel.longDescription}
          </p>
        </section>

        {/* Room Types Listing */}
        <section id="rooms" className="space-y-10">
          <div className="border-b border-luxury-gold/15 pb-4 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
            <div>
              <h3 className="font-serif text-3xl text-luxury-ivory tracking-wide">
                Suites &amp; Villas
              </h3>
              <p className="text-xs text-luxury-gold tracking-widest uppercase mt-1">
                Select your private living quarters
              </p>
            </div>

            {/* Dynamic Date Search Component */}
            <div className="flex flex-wrap items-center gap-3 bg-luxury-charcoal/30 border border-luxury-gold/10 p-3 rounded-lg gold-glow max-w-md">
              <div className="flex-1 min-w-[120px]">
                <label className="block text-[0.55rem] tracking-[0.15em] text-luxury-gold uppercase mb-1 font-sans font-medium">Check-In</label>
                <input
                  type="date"
                  value={checkIn}
                  onChange={(e) => handleDateChange("in", e.target.value)}
                  className="w-full bg-luxury-black border border-luxury-gold/15 py-1 px-2 text-[0.7rem] text-luxury-ivory focus:outline-none focus:border-luxury-gold/50 cursor-pointer uppercase tracking-wider"
                />
              </div>
              <div className="flex-1 min-w-[120px]">
                <label className="block text-[0.55rem] tracking-[0.15em] text-luxury-gold uppercase mb-1 font-sans font-medium">Check-Out</label>
                <input
                  type="date"
                  value={checkOut}
                  onChange={(e) => handleDateChange("out", e.target.value)}
                  className="w-full bg-luxury-black border border-luxury-gold/15 py-1 px-2 text-[0.7rem] text-luxury-ivory focus:outline-none focus:border-luxury-gold/50 cursor-pointer uppercase tracking-wider"
                />
              </div>
            </div>
          </div>

          <div className="space-y-12">
            {rooms.map((room, idx) => (
              <div
                key={room.slug}
                className={`group border border-luxury-gold/10 bg-luxury-charcoal/20 flex flex-col ${
                  idx % 2 === 1 ? "md:flex-row-reverse" : "md:flex-row"
                } overflow-hidden hover:border-luxury-gold/30 transition-all duration-500`}
              >
                {/* Room Image */}
                <div className="relative w-full md:w-[420px] h-64 md:h-auto overflow-hidden">
                  <Image
                    src={room.images?.[0] || hotel.images?.[0] || "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80"}
                    alt={room.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-95"
                  />
                </div>

                {/* Room Specs */}
                <div className="p-8 flex-grow flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start mb-2 gap-4 flex-wrap">
                      <h4 className="font-serif text-2xl text-luxury-ivory group-hover:text-luxury-gold transition-colors duration-300">
                        {room.name}
                      </h4>
                      {(() => {
                        const code = getRoomTypeCode(room.slug);
                        const avail = availability.find((a) => a.roomTypeCode === code);
                        if (!avail) return null;
                        if (isFetchingAvail) {
                          return (
                            <span className="text-[0.65rem] uppercase font-mono tracking-widest text-luxury-gold/50 animate-pulse mt-2">
                              Updating status...
                            </span>
                          );
                        }
                        if (!avail.isAvailable || avail.available <= 0) {
                          return (
                            <span className="text-[0.65rem] uppercase font-mono tracking-widest text-red-400 font-bold bg-red-950/20 px-2.5 py-1 border border-red-500/25 mt-2 rounded">
                              Fully Booked
                            </span>
                          );
                        }
                        return (
                          <span className={`text-[0.65rem] uppercase font-mono tracking-widest px-2.5 py-1 border rounded mt-2 ${
                            avail.available <= 5 
                              ? "text-red-400 border-red-500/20 bg-red-950/15 font-bold animate-pulse" 
                              : "text-emerald-400 border-emerald-500/20 bg-emerald-950/15"
                          }`}>
                            Only {avail.available} rooms left!
                          </span>
                        );
                      })()}
                    </div>

                    <p className="text-xs text-luxury-ivory/60 font-light leading-relaxed mb-6">
                      {room.description}
                    </p>

                    {/* Room Stats */}
                    <div className="grid grid-cols-3 gap-4 border-y border-luxury-gold/5 py-3 mb-6 text-xs text-luxury-ivory/50">
                      <div className="flex items-center space-x-2">
                        <Maximize2 size={14} className="text-luxury-gold/60" />
                        <span>{room.size}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Bed size={14} className="text-luxury-gold/60" />
                        <span>{room.bedType}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Users2 size={14} className="text-luxury-gold/60" />
                        <span>Max {room.occupancy.adults} Guests</span>
                      </div>
                    </div>

                    {/* Amenities list */}
                    <div className="grid grid-cols-2 gap-2 text-xs text-luxury-ivory/55 mb-6">
                      {room.amenities.slice(0, 4).map((amen: string) => (
                        <div key={amen} className="flex items-center space-x-2">
                          <Check size={12} className="text-luxury-gold" />
                          <span>{amen}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col space-y-3 w-full md:w-fit">
                    <Link
                      href={`/hotels/${hotel.slug}/rooms/${room.slug}`}
                      className="btn-outline-gold w-full px-8 py-3 text-center text-xs tracking-widest font-sans uppercase block"
                    >
                      EXPLORE ROOM
                    </Link>
                    {(() => {
                      const code = getRoomTypeCode(room.slug);
                      const avail = availability.find((a) => a.roomTypeCode === code);
                      const isFullyBooked = avail && (!avail.isAvailable || avail.available <= 0);
                      return (
                        <button
                          onClick={() => handleReserveRoom(room.slug)}
                          disabled={isFullyBooked}
                          className="btn-gold w-full px-8 py-3 text-center text-xs tracking-widest font-sans uppercase disabled:opacity-50 disabled:pointer-events-none"
                        >
                          {isFullyBooked ? "Fully Booked" : "SELECT & BOOK"}
                        </button>
                      );
                    })()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Facilities Section */}
        <section id="facilities" className="space-y-8">
          <div className="border-b border-luxury-gold/15 pb-4">
            <h3 className="font-serif text-3xl text-luxury-ivory tracking-wide">
              Bespoke Facilities
            </h3>
            <p className="text-xs text-luxury-gold tracking-widest uppercase mt-1">
              Curated guest facilities &amp; experiences
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {hotel.facilities.map((fac: string) => (
              <div
                key={fac}
                className="p-6 border border-luxury-gold/5 bg-luxury-charcoal/10 hover:border-luxury-gold/15 transition-all duration-300 flex flex-col items-center text-center space-y-3"
              >
                <div className="w-10 h-10 rounded-full border border-luxury-gold/20 flex items-center justify-center text-luxury-gold">
                  <Compass size={18} />
                </div>
                <span className="font-serif text-base text-luxury-ivory">{fac}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Gallery Section */}
        <section id="gallery" className="space-y-8">
          <div className="border-b border-luxury-gold/15 pb-4">
            <h3 className="font-serif text-3xl text-luxury-ivory tracking-wide">
              Visual Narrative
            </h3>
            <p className="text-xs text-luxury-gold tracking-widest uppercase mt-1">
              Immerse yourself in our captures
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {hotel.images.map((img: string, idx: number) => (
              <div
                key={idx}
                onClick={() => setLightboxImage(img)}
                className="relative h-44 overflow-hidden border border-luxury-gold/10 cursor-pointer group"
              >
                <Image
                  src={img}
                  alt={`Gallery image ${idx + 1}`}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-95 group-hover:brightness-100"
                />
                <div className="absolute inset-0 bg-luxury-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all duration-300">
                  <span className="text-[0.6rem] text-luxury-gold tracking-widest uppercase border border-luxury-gold/30 px-3 py-1 font-semibold">
                    Enlarge View
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Attractions */}
        <section id="attractions" className="space-y-8">
          <div className="border-b border-luxury-gold/15 pb-4">
            <h3 className="font-serif text-3xl text-luxury-ivory tracking-wide">
              Local Heritage &amp; Journeys
            </h3>
            <p className="text-xs text-luxury-gold tracking-widest uppercase mt-1">
              Nearby exploration curated by concierge
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {hotel.nearbyAttractions.map((attr: any) => (
              <div
                key={attr.name}
                className="p-6 border border-luxury-gold/10 bg-luxury-charcoal/20 flex flex-col justify-between space-y-4"
              >
                <div>
                  <div className="flex justify-between items-start gap-4 mb-2">
                    <h4 className="font-serif text-xl text-luxury-gold">{attr.name}</h4>
                    <span className="text-[0.65rem] text-luxury-ivory/40 uppercase tracking-widest font-mono bg-luxury-black border border-luxury-gold/5 px-2.5 py-1">
                      {attr.distance} away
                    </span>
                  </div>
                  <p className="text-xs text-luxury-ivory/60 leading-relaxed font-light">
                    {attr.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Reviews Section */}
        <section id="reviews" className="space-y-8">
          <div className="border-b border-luxury-gold/15 pb-4">
            <h3 className="font-serif text-3xl text-luxury-ivory tracking-wide">
              Guest Impressions
            </h3>
            <p className="text-xs text-luxury-gold tracking-widest uppercase mt-1">
              Testimonials from our valued guests
            </p>
          </div>

          <div className="space-y-6">
            {hotel.reviews.map((rev: any, idx: number) => (
              <div key={idx} className="p-6 border border-luxury-gold/5 bg-luxury-charcoal/10 relative">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-xs font-semibold text-luxury-gold uppercase tracking-wider">
                    {rev.author}
                  </span>
                  <div className="flex items-center space-x-1">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} size={10} className="text-luxury-gold fill-luxury-gold" />
                    ))}
                  </div>
                </div>
                <p className="font-serif text-base text-luxury-ivory/70 italic leading-relaxed font-light mb-2">
                  &ldquo;{rev.comment}&rdquo;
                </p>
                <span className="text-[0.65rem] text-luxury-ivory/40 block text-right">
                  {rev.date}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faqs" className="space-y-8">
          <div className="border-b border-luxury-gold/15 pb-4">
            <h3 className="font-serif text-3xl text-luxury-ivory tracking-wide">
              Familiar Questions
            </h3>
            <p className="text-xs text-luxury-gold tracking-widest uppercase mt-1">
              General queries regarding your stay
            </p>
          </div>

          <div className="space-y-3">
            {hotel.faqs.map((faq: any, idx: number) => (
              <div
                key={idx}
                className="border border-luxury-gold/10 bg-luxury-charcoal/15 overflow-hidden"
              >
                <button
                  onClick={() => setOpenFAQIndex(openFAQIndex === idx ? null : idx)}
                  className="w-full p-5 flex items-center justify-between text-left focus:outline-none"
                >
                  <span className="font-serif text-lg text-luxury-ivory pr-6">
                    {faq.question}
                  </span>
                  <ChevronDown
                    size={16}
                    className={`text-luxury-gold transition-transform duration-300 ${
                      openFAQIndex === idx ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <AnimatePresence>
                  {openFAQIndex === idx && (
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: "auto" }}
                      exit={{ height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <p className="p-5 pt-0 text-xs text-luxury-ivory/60 leading-relaxed font-light border-t border-luxury-gold/5">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </section>

        {/* Policies Section */}
        <section id="policies" className="space-y-6">
          <h3 className="font-serif text-2xl text-luxury-ivory tracking-wide">
            Policies &amp; Disclaimers
          </h3>
          <ul className="space-y-2.5 text-xs text-luxury-ivory/60 font-light">
            {hotel.policies.map((p: string, idx: number) => (
              <li key={idx} className="flex items-start space-x-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-luxury-gold mt-1.5 flex-shrink-0" />
                <span>{p}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Booking Modal */}
        <AnimatePresence>
          {isBookingOpen && (
            <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsBookingOpen(false)}
                className="absolute inset-0 bg-black/80 backdrop-blur-sm"
              />
              
              {/* Modal Card */}
              <motion.div
                data-lenis-prevent
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="relative w-full max-w-xl z-10 bg-white rounded-2xl booking-widget-card border border-zinc-100"
              >
                {/* Close Button */}
                <button
                  onClick={() => setIsBookingOpen(false)}
                  className="absolute top-5 right-5 w-8 h-8 rounded-full border border-zinc-200 hover:border-luxury-gold/50 hover:bg-zinc-50 flex items-center justify-center text-zinc-400 hover:text-luxury-gold hover:rotate-90 transition-all duration-300 z-30 cursor-pointer"
                  aria-label="Close Booking Modal"
                >
                  <X size={15} />
                </button>

                <BookingWidget
                  hotel={hotel}
                  rooms={rooms}
                  selectedRoomSlug={selectedRoomSlug}
                  onSelectRoomSlug={(slug) => setSelectedRoomSlug(slug)}
                  initialCheckIn={checkIn}
                  initialCheckOut={checkOut}
                />
              </motion.div>
            </div>
          )}
        </AnimatePresence>

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
                alt="Enlarged gallery capture"
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
