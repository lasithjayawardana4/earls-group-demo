"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { Star, Search, SlidersHorizontal } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface HotelsListClientProps {
  initialHotels: any[];
}

export default function HotelsListClient({ initialHotels }: HotelsListClientProps) {
  const [search, setSearch] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("All");
  const [selectedFacility, setSelectedFacility] = useState("All");
  const [sortBy, setSortBy] = useState("recommended");
  const [showFilters, setShowFilters] = useState(false);

  // Extract all locations for filter buttons
  const locations = useMemo(() => {
    const locs = new Set(initialHotels.map((h) => h.location));
    return ["All", ...Array.from(locs)];
  }, [initialHotels]);

  // Extract unique facilities
  const allFacilities = useMemo(() => {
    const facs = new Set<string>();
    initialHotels.forEach((h) => {
      h.facilities?.forEach((f: string) => facs.add(f));
    });
    return ["All", ...Array.from(facs).slice(0, 5)];
  }, [initialHotels]);

  // Filter and sort logic
  const filteredHotels = useMemo(() => {
    let result = [...initialHotels];

    // Search query
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (h) =>
          h.name.toLowerCase().includes(q) ||
          h.location.toLowerCase().includes(q) ||
          h.description.toLowerCase().includes(q)
      );
    }

    // Location filter
    if (selectedLocation !== "All") {
      result = result.filter((h) => h.location === selectedLocation);
    }

    // Facility filter
    if (selectedFacility !== "All") {
      result = result.filter((h) => h.facilities?.includes(selectedFacility));
    }

    // Sorting
    if (sortBy === "price-low") {
      result.sort((a, b) => a.startingPrice - b.startingPrice);
    } else if (sortBy === "price-high") {
      result.sort((a, b) => b.startingPrice - a.startingPrice);
    } else if (sortBy === "rating") {
      result.sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [initialHotels, search, selectedLocation, selectedFacility, sortBy]);

  return (
    <div className="space-y-12">
      {/* Search and Filters Controls */}
      <div className="glass-panel p-6 flex flex-col gap-6">
        <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
          {/* Search bar */}
          <div className="relative w-full lg:max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-luxury-ivory/30" size={18} />
            <input
              type="text"
              placeholder="SEARCH HOTEL OR DESTINATION..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-luxury-black border border-luxury-gold/15 py-3 pl-12 pr-4 text-xs tracking-widest text-luxury-ivory uppercase focus:outline-none focus:border-luxury-gold/50 placeholder:text-luxury-ivory/30 transition-all rounded-none"
            />
          </div>

          <div className="flex items-center gap-4 w-full lg:w-auto justify-between lg:justify-end">
            {/* Toggle Advanced Filters */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="btn-outline-gold flex items-center space-x-2 px-5 py-3 text-xs"
            >
              <SlidersHorizontal size={14} />
              <span>FILTERS</span>
            </button>

            {/* Sorting dropdown */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-luxury-black border border-luxury-gold/15 text-luxury-ivory text-xs uppercase tracking-widest py-3 px-4 focus:outline-none focus:border-luxury-gold/50 rounded-none cursor-pointer"
              >
                <option value="recommended">RECOMMENDED</option>
                <option value="price-low">PRICE: LOW TO HIGH</option>
                <option value="price-high">PRICE: HIGH TO LOW</option>
                <option value="rating">RATING</option>
              </select>
            </div>
          </div>
        </div>

        {/* Collapsible Advanced Filters */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden border-t border-luxury-gold/10 pt-6 flex flex-col gap-6"
            >
              {/* Filter by Location */}
              <div>
                <span className="block text-[0.65rem] tracking-widest text-luxury-gold uppercase mb-3">
                  Filter by Location
                </span>
                <div className="flex flex-wrap gap-2">
                  {locations.map((loc) => (
                    <button
                      key={loc}
                      onClick={() => setSelectedLocation(loc)}
                      className={`px-4 py-2 text-[0.65rem] tracking-widest uppercase transition-all duration-300 ${
                        selectedLocation === loc
                          ? "bg-luxury-gold text-luxury-black font-semibold"
                          : "border border-luxury-gold/15 text-luxury-ivory/60 hover:text-luxury-gold hover:border-luxury-gold/30"
                      }`}
                    >
                      {loc}
                    </button>
                  ))}
                </div>
              </div>

              {/* Filter by Facility */}
              <div>
                <span className="block text-[0.65rem] tracking-widest text-luxury-gold uppercase mb-3">
                  Filter by Facility
                </span>
                <div className="flex flex-wrap gap-2">
                  {allFacilities.map((fac) => (
                    <button
                      key={fac}
                      onClick={() => setSelectedFacility(fac)}
                      className={`px-4 py-2 text-[0.65rem] tracking-widest uppercase transition-all duration-300 ${
                        selectedFacility === fac
                          ? "bg-luxury-gold text-luxury-black font-semibold"
                          : "border border-luxury-gold/15 text-luxury-ivory/60 hover:text-luxury-gold hover:border-luxury-gold/30"
                      }`}
                    >
                      {fac === "All" ? "All Facilities" : fac}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Grid List of Hotels */}
      {filteredHotels.length === 0 ? (
        <div className="text-center py-20 border border-luxury-gold/10 glass-panel">
          <p className="font-serif text-2xl text-luxury-ivory/60 italic mb-4">
            No sanctuaries match your criteria
          </p>
          <button
            onClick={() => {
              setSearch("");
              setSelectedLocation("All");
              setSelectedFacility("All");
              setSortBy("recommended");
            }}
            className="text-xs text-luxury-gold underline hover:text-luxury-ivory transition-colors uppercase tracking-widest"
          >
            Reset All Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 md:gap-10">
          {filteredHotels.map((hotel, idx) => (
            <motion.div
              key={hotel.slug}
              className="group reveal-container border border-luxury-gold/10 bg-luxury-charcoal/30 flex flex-col justify-between"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1, duration: 0.6 }}
            >
              {/* Hotel image */}
              <div className="relative h-48 md:h-64 lg:h-80 overflow-hidden">
                <Image
                  src={hotel.images[0]}
                  alt={hotel.name}
                  fill
                  sizes="(max-width: 768px) 50vw, 50vw"
                  className="object-cover reveal-image filter brightness-95 group-hover:brightness-100"
                />
                <div className="absolute top-3 left-3 md:top-4 md:left-4 z-10 glass-panel-light px-2 py-1 md:px-3 md:py-1.5 text-[0.55rem] md:text-[0.65rem] tracking-widest text-luxury-gold uppercase">
                  {hotel.location}
                </div>
                <div className="absolute top-3 right-3 md:top-4 md:right-4 z-10 flex items-center space-x-1 bg-black/40 px-2 py-0.5 md:px-2.5 md:py-1 text-[0.6rem] md:text-xs">
                  <Star size={10} className="text-luxury-gold fill-luxury-gold" />
                  <span className="text-luxury-ivory font-medium">5.0</span>
                </div>
              </div>

              {/* Hotel specs */}
              <div className="p-4 md:p-6 flex-grow flex flex-col justify-between gap-4">
                <h2 className="font-serif text-base md:text-xl lg:text-2xl text-luxury-ivory group-hover:text-luxury-gold transition-colors duration-300 line-clamp-1">
                  {hotel.name}
                </h2>

                <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 pt-3 border-t border-luxury-gold/5">
                  <Link
                    href={`/hotels/${hotel.slug}`}
                    className="btn-outline-gold flex-1 py-2 md:py-3 text-center text-[0.6rem] md:text-xs tracking-wider"
                  >
                    View Details
                  </Link>
                  <Link
                    href={`/hotels/${hotel.slug}`}
                    className="btn-gold flex-1 py-2 md:py-3 text-center text-[0.6rem] md:text-xs tracking-wider"
                  >
                    Book Now
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
