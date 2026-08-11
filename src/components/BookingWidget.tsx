"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Calendar, Users, Percent, Sparkles, Loader, Mail, Phone, User, MessageSquare, Bed, Tag } from "lucide-react";

// Custom helper function to compute nights count
function calculateNights(inStr: string, outStr: string) {
  if (!inStr || !outStr) return 0;
  const checkInDate = new Date(inStr);
  const checkOutDate = new Date(outStr);
  const diffTime = Math.abs(checkOutDate.getTime() - checkInDate.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return isNaN(diffDays) ? 0 : diffDays;
}

interface BookingWidgetProps {
  hotel: any;
  rooms: any[];
  selectedRoomSlug: string;
  onSelectRoomSlug: (slug: string) => void;
}

export default function BookingWidget({
  hotel,
  rooms,
  selectedRoomSlug,
  onSelectRoomSlug,
}: BookingWidgetProps) {
  const router = useRouter();
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [promoCode, setPromoCode] = useState("");
  const [specialRequests, setSpecialRequests] = useState("");
  const [guestName, setGuestName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [visitorType, setVisitorType] = useState<"local" | "international">("local");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Default dates: checkin = tomorrow, checkout = day after tomorrow
  useEffect(() => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    const dayAfter = new Date(tomorrow);
    dayAfter.setDate(tomorrow.getDate() + 2);

    setCheckIn(tomorrow.toISOString().split("T")[0]);
    setCheckOut(dayAfter.toISOString().split("T")[0]);
  }, []);

  const activeRoom = rooms.find((r) => r.slug === selectedRoomSlug) || rooms[0];

  // Compute pricing
  const nights = calculateNights(checkIn, checkOut);
  const basePrice = activeRoom ? activeRoom.price : hotel.startingPrice;
  let totalPrice = basePrice * (nights || 1);
  let discountAmount = 0;

  if (promoCode.trim().toUpperCase() === "ESCAPE20") {
    discountAmount = totalPrice * 0.2;
    totalPrice *= 0.8;
  } else if (promoCode.trim().toUpperCase() === "HONEYMOON") {
    discountAmount = totalPrice * 0.15;
    totalPrice *= 0.85;
  }

  async function handleBookNow(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!checkIn || !checkOut) {
      setError("Please select check-in and check-out dates.");
      return;
    }

    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);

    if (checkInDate >= checkOutDate) {
      setError("Check-out date must be after check-in date.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          guestName,
          email,
          phone,
          hotelId: hotel._id,
          roomId: activeRoom?._id,
          adults,
          children,
          checkIn,
          checkOut,
          price: Math.round(totalPrice),
          specialRequests,
          promoCode,
          visitorType,
        }),
      });

      const data = await response.json();

      if (data.success) {
        // Redirect to booking success/confirmation page
        router.push(`/booking-confirmation/${data.booking._id}`);
      } else {
        setError(data.error || "Booking failed. Please try again.");
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="p-5 lg:p-7 w-full text-zinc-800">
      <h3 className="font-serif text-2xl lg:text-3xl text-luxury-gold-dark tracking-wide mb-1 text-center font-medium">Reserve Your Sanctuary</h3>
      <p className="text-[0.6rem] lg:text-xs text-zinc-400 tracking-[0.25em] uppercase mb-6 text-center font-medium">
        Earls Group Best Rate Guarantee
      </p>

      {error && (
        <div className="p-3 border border-red-200 bg-red-50 text-red-600 text-xs mb-4 rounded-lg">
          {error}
        </div>
      )}

      <form onSubmit={handleBookNow} className="space-y-4">
        {/* Check In / Out */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-[0.55rem] lg:text-[0.6rem] tracking-widest text-zinc-500 uppercase mb-2 font-medium">
              Check-In
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-luxury-gold/70 pointer-events-none z-10">
                <Calendar size={13} />
              </span>
              <input
                type="date"
                required
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                className="w-full bg-zinc-50 border border-zinc-200 hover:border-luxury-gold/40 focus:border-luxury-gold/60 focus:ring-1 focus:ring-luxury-gold/20 focus:bg-white py-2 pl-9 pr-3 text-xs text-zinc-800 focus:outline-none rounded-lg cursor-pointer transition-all duration-300"
              />
            </div>
          </div>
          <div>
            <label className="block text-[0.55rem] lg:text-[0.6rem] tracking-widest text-zinc-500 uppercase mb-2 font-medium">
              Check-Out
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-luxury-gold/70 pointer-events-none z-10">
                <Calendar size={13} />
              </span>
              <input
                type="date"
                required
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                className="w-full bg-zinc-50 border border-zinc-200 hover:border-luxury-gold/40 focus:border-luxury-gold/60 focus:ring-1 focus:ring-luxury-gold/20 focus:bg-white py-2 pl-9 pr-3 text-xs text-zinc-800 focus:outline-none rounded-lg cursor-pointer transition-all duration-300"
              />
            </div>
          </div>
        </div>

        {/* Room Type */}
        <div>
          <label className="block text-[0.55rem] lg:text-[0.6rem] tracking-widest text-zinc-500 uppercase mb-2 font-medium">
            Selected Suite / Villa
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-luxury-gold/70 pointer-events-none z-10">
              <Bed size={13} />
            </span>
            <select
              value={selectedRoomSlug}
              onChange={(e) => onSelectRoomSlug(e.target.value)}
              className="w-full bg-zinc-50 border border-zinc-200 hover:border-luxury-gold/40 focus:border-luxury-gold/60 focus:ring-1 focus:ring-luxury-gold/20 focus:bg-white py-2.5 pl-9 pr-8 text-xs text-zinc-800 focus:outline-none rounded-lg cursor-pointer uppercase tracking-wider appearance-none transition-all duration-300"
            >
              {rooms.map((room) => (
                <option key={room.slug} value={room.slug} className="bg-white text-zinc-800">
                  {room.name}
                </option>
              ))}
            </select>
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-luxury-gold/70 pointer-events-none z-10">
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 20 20">
                <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
              </svg>
            </span>
          </div>
        </div>

        {/* Adults & Children */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-[0.55rem] lg:text-[0.6rem] tracking-widest text-zinc-500 uppercase mb-2 font-medium">
              Adults
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-luxury-gold/70 pointer-events-none z-10">
                <Users size={13} />
              </span>
              <select
                value={adults}
                onChange={(e) => setAdults(Number(e.target.value))}
                className="w-full bg-zinc-50 border border-zinc-200 hover:border-luxury-gold/40 focus:border-luxury-gold/60 focus:ring-1 focus:ring-luxury-gold/20 focus:bg-white py-2.5 pl-9 pr-8 text-xs text-zinc-800 focus:outline-none rounded-lg cursor-pointer appearance-none transition-all duration-300"
              >
                {[1, 2, 3, 4, 5, 6].map((num) => (
                  <option key={num} value={num} className="bg-white text-zinc-800">
                    {num}
                  </option>
                ))}
              </select>
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-luxury-gold/70 pointer-events-none z-10">
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 20 20">
                  <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                </svg>
              </span>
            </div>
          </div>
          <div>
            <label className="block text-[0.55rem] lg:text-[0.6rem] tracking-widest text-zinc-500 uppercase mb-2 font-medium">
              Children
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-luxury-gold/70 pointer-events-none z-10">
                <Users size={13} />
              </span>
              <select
                value={children}
                onChange={(e) => setChildren(Number(e.target.value))}
                className="w-full bg-zinc-50 border border-zinc-200 hover:border-luxury-gold/40 focus:border-luxury-gold/60 focus:ring-1 focus:ring-luxury-gold/20 focus:bg-white py-2.5 pl-9 pr-8 text-xs text-zinc-800 focus:outline-none rounded-lg cursor-pointer appearance-none transition-all duration-300"
              >
                {[0, 1, 2, 3, 4].map((num) => (
                  <option key={num} value={num} className="bg-white text-zinc-800">
                    {num}
                  </option>
                ))}
              </select>
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-luxury-gold/70 pointer-events-none z-10">
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 20 20">
                  <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                </svg>
              </span>
            </div>
          </div>
        </div>

        {/* Promo Code */}
        <div>
          <label className="block text-[0.55rem] lg:text-[0.6rem] tracking-widest text-zinc-500 uppercase mb-2 font-medium">
            Promo Code
          </label>
          <div className="relative flex items-center">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-luxury-gold/70 pointer-events-none z-10">
              <Tag size={13} />
            </span>
            <input
              type="text"
              placeholder="ENTER CODE..."
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
              className="w-full bg-zinc-50 border border-zinc-200 hover:border-luxury-gold/40 focus:border-luxury-gold/60 focus:ring-1 focus:ring-luxury-gold/20 focus:bg-white py-2 pl-9 pr-10 text-xs text-zinc-800 focus:outline-none rounded-lg uppercase placeholder:text-zinc-400 transition-all duration-300 tracking-widest"
            />
            <Percent size={13} className="absolute right-3 text-luxury-gold/50 pointer-events-none" />
          </div>
        </div>


        {/* Guest Details */}
        <div className="border-t border-zinc-100 pt-4 mt-4 space-y-4">
          <div>
            <label className="block text-[0.55rem] lg:text-[0.6rem] tracking-widest text-zinc-500 uppercase mb-2 font-medium">
              Visitor Origin
            </label>
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setVisitorType("local")}
                className={`py-2.5 text-xs tracking-wider uppercase border font-sans font-medium transition-all duration-300 cursor-pointer rounded-lg ${
                  visitorType === "local"
                    ? "bg-gradient-to-r from-luxury-gold to-luxury-gold-light text-white border-luxury-gold font-semibold shadow-sm"
                    : "bg-zinc-50 text-zinc-600 border-zinc-200 hover:text-luxury-gold hover:border-luxury-gold/50"
                }`}
              >
                Local Visitor
              </button>
              <button
                type="button"
                onClick={() => setVisitorType("international")}
                className={`py-2.5 text-xs tracking-wider uppercase border font-sans font-medium transition-all duration-300 cursor-pointer rounded-lg ${
                  visitorType === "international"
                    ? "bg-gradient-to-r from-luxury-gold to-luxury-gold-light text-white border-luxury-gold font-semibold shadow-sm"
                    : "bg-zinc-50 text-zinc-600 border-zinc-200 hover:text-luxury-gold hover:border-luxury-gold/50"
                }`}
              >
                International
              </button>
            </div>
          </div>

          <div>
            <label className="block text-[0.55rem] lg:text-[0.6rem] tracking-widest text-zinc-500 uppercase mb-2 font-medium">
              Full Name
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-luxury-gold/70 pointer-events-none z-10">
                <User size={13} />
              </span>
              <input
                type="text"
                required
                placeholder="ENTER YOUR FULL NAME..."
                value={guestName}
                onChange={(e) => setGuestName(e.target.value)}
                className="w-full bg-zinc-50 border border-zinc-200 hover:border-luxury-gold/40 focus:border-luxury-gold/60 focus:ring-1 focus:ring-luxury-gold/20 focus:bg-white py-2 pl-9 pr-3 text-xs text-zinc-800 focus:outline-none rounded-lg placeholder:text-zinc-400 transition-all duration-300"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-[0.55rem] lg:text-[0.6rem] tracking-widest text-zinc-500 uppercase mb-2 font-medium">
                Phone Number
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-luxury-gold/70 pointer-events-none z-10">
                  <Phone size={13} />
                </span>
                <input
                  type="tel"
                  required
                  placeholder="ENTER PHONE NUMBER..."
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-zinc-50 border border-zinc-200 hover:border-luxury-gold/40 focus:border-luxury-gold/60 focus:ring-1 focus:ring-luxury-gold/20 focus:bg-white py-2 pl-9 pr-3 text-xs text-zinc-800 focus:outline-none rounded-lg placeholder:text-zinc-400 transition-all duration-300"
                />
              </div>
            </div>
            <div>
              <label className="block text-[0.55rem] lg:text-[0.6rem] tracking-widest text-zinc-500 uppercase mb-2 font-medium">
                Email Address <span className="text-luxury-gold/60 italic font-light lowercase">(Optional)</span>
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-luxury-gold/70 pointer-events-none z-10">
                  <Mail size={13} />
                </span>
                <input
                  type="email"
                  placeholder="ENTER EMAIL ADDRESS..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-zinc-50 border border-zinc-200 hover:border-luxury-gold/40 focus:border-luxury-gold/60 focus:ring-1 focus:ring-luxury-gold/20 focus:bg-white py-2 pl-9 pr-3 text-xs text-zinc-800 focus:outline-none rounded-lg placeholder:text-zinc-400 transition-all duration-300"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3.5 mt-6 flex items-center justify-center space-x-2 text-xs font-sans tracking-[0.2em] text-white bg-gradient-to-r from-luxury-gold via-luxury-gold-light to-luxury-gold border-none rounded-lg hover:shadow-[0_4px_20px_rgba(158,116,40,0.25)] transition-all duration-500 cursor-pointer disabled:opacity-50 disabled:pointer-events-none"
        >
          {loading ? (
            <>
              <Loader size={14} className="animate-spin" />
              <span>CONFIRMING...</span>
            </>
          ) : (
            <span>CONFIRM RESERVATION</span>
          )}
        </button>
      </form>
    </div>
  );
}


