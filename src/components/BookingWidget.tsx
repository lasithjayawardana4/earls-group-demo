"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Calendar, Users, Percent, Sparkles, Loader } from "lucide-react";

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
    <div className="glass-panel p-6 sticky top-28 z-20">
      <h3 className="font-serif text-2xl text-luxury-ivory mb-2">Reserve Your Sanctuary</h3>
      <p className="text-xs text-luxury-gold/75 tracking-wider uppercase mb-6">
        Earls Group Best Rate Guarantee
      </p>

      {error && (
        <div className="p-3 border border-red-500/20 bg-red-500/5 text-red-400 text-xs mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleBookNow} className="space-y-4">
        {/* Check In / Out */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-[0.6rem] tracking-widest text-luxury-ivory/50 uppercase mb-2">
              Check-In
            </label>
            <div className="relative">
              <input
                type="date"
                required
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                className="w-full bg-luxury-charcoal/50 border border-luxury-gold/15 py-2.5 px-3 text-xs text-luxury-ivory focus:outline-none focus:border-luxury-gold/50 rounded-none cursor-pointer"
              />
            </div>
          </div>
          <div>
            <label className="block text-[0.6rem] tracking-widest text-luxury-ivory/50 uppercase mb-2">
              Check-Out
            </label>
            <div className="relative">
              <input
                type="date"
                required
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                className="w-full bg-luxury-charcoal/50 border border-luxury-gold/15 py-2.5 px-3 text-xs text-luxury-ivory focus:outline-none focus:border-luxury-gold/50 rounded-none cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Room Type */}
        <div>
          <label className="block text-[0.6rem] tracking-widest text-luxury-ivory/50 uppercase mb-2">
            Selected Suite / Villa
          </label>
          <select
            value={selectedRoomSlug}
            onChange={(e) => onSelectRoomSlug(e.target.value)}
            className="w-full bg-luxury-charcoal/50 border border-luxury-gold/15 py-2.5 px-3 text-xs text-luxury-ivory focus:outline-none focus:border-luxury-gold/50 rounded-none cursor-pointer uppercase tracking-wider"
          >
            {rooms.map((room) => (
              <option key={room.slug} value={room.slug}>
                {room.name}
              </option>
            ))}
          </select>
        </div>

        {/* Adults & Children */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-[0.6rem] tracking-widest text-luxury-ivory/50 uppercase mb-2">
              Adults
            </label>
            <div className="relative">
              <select
                value={adults}
                onChange={(e) => setAdults(Number(e.target.value))}
                className="w-full bg-luxury-charcoal/50 border border-luxury-gold/15 py-2.5 px-3 text-xs text-luxury-ivory focus:outline-none focus:border-luxury-gold/50 rounded-none cursor-pointer"
              >
                {[1, 2, 3, 4, 5, 6].map((num) => (
                  <option key={num} value={num}>
                    {num}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div>
            <label className="block text-[0.6rem] tracking-widest text-luxury-ivory/50 uppercase mb-2">
              Children
            </label>
            <div className="relative">
              <select
                value={children}
                onChange={(e) => setChildren(Number(e.target.value))}
                className="w-full bg-luxury-charcoal/50 border border-luxury-gold/15 py-2.5 px-3 text-xs text-luxury-ivory focus:outline-none focus:border-luxury-gold/50 rounded-none cursor-pointer"
              >
                {[0, 1, 2, 3, 4].map((num) => (
                  <option key={num} value={num}>
                    {num}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Promo Code */}
        <div>
          <label className="block text-[0.6rem] tracking-widest text-luxury-ivory/50 uppercase mb-2">
            Promo Code
          </label>
          <div className="relative flex items-center">
            <input
              type="text"
              placeholder="ENTER CODE..."
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
              className="w-full bg-luxury-charcoal/50 border border-luxury-gold/15 py-2.5 pl-3 pr-10 text-xs text-luxury-ivory tracking-widest focus:outline-none focus:border-luxury-gold/50 rounded-none uppercase placeholder:text-luxury-ivory/20"
            />
            <Percent size={14} className="absolute right-3 text-luxury-gold/40 pointer-events-none" />
          </div>
        </div>

        {/* Special Requests */}
        <div>
          <label className="block text-[0.6rem] tracking-widest text-luxury-ivory/50 uppercase mb-2">
            Special Requests
          </label>
          <textarea
            placeholder="Dietary requests, room positioning..."
            value={specialRequests}
            onChange={(e) => setSpecialRequests(e.target.value)}
            rows={2}
            className="w-full bg-luxury-charcoal/50 border border-luxury-gold/15 py-2.5 px-3 text-xs text-luxury-ivory focus:outline-none focus:border-luxury-gold/50 rounded-none resize-none placeholder:text-luxury-ivory/25"
          />
        </div>

        {/* Guest Details */}
        <div className="border-t border-luxury-gold/10 pt-4 mt-6 space-y-4">
          <div>
            <label className="block text-[0.6rem] tracking-widest text-luxury-ivory/50 uppercase mb-2">
              Full Name
            </label>
            <input
              type="text"
              required
              placeholder="ENTER YOUR FULL NAME..."
              value={guestName}
              onChange={(e) => setGuestName(e.target.value)}
              className="w-full bg-luxury-charcoal/50 border border-luxury-gold/15 py-2.5 px-3 text-xs text-luxury-ivory focus:outline-none focus:border-luxury-gold/50 rounded-none placeholder:text-luxury-ivory/20"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-[0.6rem] tracking-widest text-luxury-ivory/50 uppercase mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                required
                placeholder="ENTER PHONE NUMBER..."
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-luxury-charcoal/50 border border-luxury-gold/15 py-2.5 px-3 text-xs text-luxury-ivory focus:outline-none focus:border-luxury-gold/50 rounded-none placeholder:text-luxury-ivory/20"
              />
            </div>
            <div>
              <label className="block text-[0.6rem] tracking-widest text-luxury-ivory/50 uppercase mb-2">
                Email Address
              </label>
              <input
                type="email"
                required
                placeholder="ENTER EMAIL ADDRESS..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-luxury-charcoal/50 border border-luxury-gold/15 py-2.5 px-3 text-xs text-luxury-ivory focus:outline-none focus:border-luxury-gold/50 rounded-none placeholder:text-luxury-ivory/20"
              />
            </div>
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="btn-gold w-full py-4 mt-6 flex items-center justify-center space-x-2 text-xs"
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


