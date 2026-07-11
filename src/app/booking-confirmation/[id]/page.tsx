"use client";

import { useEffect, useState, use } from "react";
import Link from "next/link";
import { CheckCircle2, Calendar, MapPin, Printer, ArrowLeft, Loader } from "lucide-react";
import { MOCK_HOTELS, MOCK_ROOMS } from "@/lib/mockData";

interface Props {
  params: Promise<{ id: string }>;
}

export default function BookingConfirmationPage({ params }: Props) {
  const { id } = use(params);
  const [booking, setBooking] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchBooking() {
      try {
        const res = await fetch(`/api/bookings?id=${id}`);
        const data = await res.json();
        if (data.success) {
          // Resolve hotel and room details if they are objectIds/strings
          const b = data.booking;
          
          let hotelObj = b.hotel;
          let roomObj = b.room;

          // If hotel/room are strings (e.g. IDs), look them up in mock list
          if (typeof hotelObj === "string") {
            hotelObj = MOCK_HOTELS.find((h) => h._id === hotelObj) || { name: "Earls Luxury Resort", location: "Sri Lanka" };
          }
          if (typeof roomObj === "string") {
            roomObj = MOCK_ROOMS.find((r) => r._id === roomObj) || { name: "Luxury Suite", price: b.price };
          }

          setBooking({
            ...b,
            hotel: hotelObj,
            room: roomObj,
          });
        } else {
          setError(data.error || "Booking not found.");
        }
      } catch (err) {
        setError("Failed to load booking details.");
      } finally {
        setLoading(false);
      }
    }

    fetchBooking();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-luxury-black flex items-center justify-center text-luxury-gold">
        <div className="flex flex-col items-center space-y-4">
          <Loader size={36} className="animate-spin" />
          <span className="text-xs uppercase tracking-[0.2em]">Retrieving Receipt...</span>
        </div>
      </div>
    );
  }

  if (error || !booking) {
    return (
      <div className="min-h-screen bg-luxury-black flex items-center justify-center px-6">
        <div className="max-w-md w-full text-center border border-luxury-gold/15 p-8 glass-panel space-y-6">
          <h2 className="font-serif text-3xl text-luxury-ivory">Sanctuary Receipt Not Found</h2>
          <p className="text-sm text-luxury-ivory/60 font-light">
            We were unable to locate this booking. It may have expired or the session was reset.
          </p>
          <Link href="/" className="btn-gold block w-full py-3.5 text-center text-xs">
            Return to Homepage
          </Link>
        </div>
      </div>
    );
  }

  const checkInStr = new Date(booking.checkIn).toLocaleDateString("en-US", {
    weekday: "short",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
  const checkOutStr = new Date(booking.checkOut).toLocaleDateString("en-US", {
    weekday: "short",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="min-h-screen bg-luxury-black pt-32 pb-24 px-6">
      <div className="max-w-3xl mx-auto space-y-8">
        {/* Back Link */}
        <Link
          href="/hotels"
          className="text-xs tracking-widest text-luxury-gold hover:text-luxury-ivory transition-colors flex items-center space-x-2 w-fit uppercase"
        >
          <ArrowLeft size={14} />
          <span>Back to Collection</span>
        </Link>

        {/* Confirmation Header */}
        <div className="text-center space-y-4 py-8 border-b border-luxury-gold/10">
          <CheckCircle2 size={56} className="text-luxury-gold mx-auto animate-float" />
          <h1 className="font-serif text-3xl md:text-5xl text-luxury-ivory">Reservation Confirmed</h1>
          <p className="text-xs tracking-widest text-luxury-gold uppercase font-mono">
            Booking Reference: {booking._id}
          </p>
        </div>

        {/* Receipt / Invoice Details */}
        <div className="border border-luxury-gold/15 glass-panel p-8 md:p-12 space-y-8 print:bg-white print:text-black">
          {/* Section 1: Guest Info */}
          <div className="flex flex-col md:flex-row justify-between gap-6 border-b border-luxury-gold/10 pb-6">
            <div>
              <span className="block text-[0.65rem] tracking-widest text-luxury-gold uppercase mb-2">
                Primary Guest
              </span>
              <span className="font-serif text-lg text-luxury-ivory">{booking.guestName}</span>
              <span className="block text-xs text-luxury-ivory/60 font-light mt-1">
                {booking.email} | {booking.phone}
              </span>
            </div>
            <div className="md:text-right">
              <span className="block text-[0.65rem] tracking-widest text-luxury-gold uppercase mb-2">
                Reservation Date
              </span>
              <span className="text-xs text-luxury-ivory/80">
                {new Date(booking.createdAt).toLocaleDateString()}
              </span>
              <span className="block text-[0.6rem] text-luxury-gold/60 uppercase tracking-widest mt-1">
                Status: {booking.bookingStatus}
              </span>
            </div>
          </div>

          {/* Section 2: Hotel & Room Info */}
          <div className="space-y-6 border-b border-luxury-gold/10 pb-6">
            <div>
              <span className="block text-[0.65rem] tracking-widest text-luxury-gold/50 uppercase mb-2">
                Sanctuary
              </span>
              <h3 className="font-serif text-2xl text-luxury-ivory">{booking.hotel.name}</h3>
              <div className="flex items-center space-x-1.5 text-xs text-luxury-ivory/60 mt-1">
                <MapPin size={12} className="text-luxury-gold" />
                <span>{booking.hotel.location}, Sri Lanka</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
              <div>
                <span className="block text-[0.65rem] tracking-widest text-luxury-gold/50 uppercase mb-1">
                  Check-In
                </span>
                <span className="text-sm text-luxury-ivory/80">{checkInStr}</span>
                <span className="text-[0.65rem] text-luxury-ivory/40 block mt-1">After 2:00 PM</span>
              </div>
              <div>
                <span className="block text-[0.65rem] tracking-widest text-luxury-gold/50 uppercase mb-1">
                  Check-Out
                </span>
                <span className="text-sm text-luxury-ivory/80">{checkOutStr}</span>
                <span className="text-[0.65rem] text-luxury-ivory/40 block mt-1">Before 12:00 PM</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6 pt-4">
              <div>
                <span className="block text-[0.65rem] tracking-widest text-luxury-gold/50 uppercase mb-1">
                  Suite/Villa Selected
                </span>
                <span className="text-sm text-luxury-ivory/85">{booking.room.name}</span>
              </div>
              <div>
                <span className="block text-[0.65rem] tracking-widest text-luxury-gold/50 uppercase mb-1">
                  Occupancy
                </span>
                <span className="text-sm text-luxury-ivory/85">
                  {booking.adults} Adults, {booking.children} Children
                </span>
              </div>
            </div>
          </div>

          {/* Section 3: Special Requests */}
          {booking.specialRequests && (
            <div className="border-b border-luxury-gold/10 pb-6">
              <span className="block text-[0.65rem] tracking-widest text-luxury-gold/50 uppercase mb-2">
                Special Requests
              </span>
              <p className="text-xs text-luxury-ivory/70 leading-relaxed font-light italic">
                &ldquo;{booking.specialRequests}&rdquo;
              </p>
            </div>
          )}

        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <button
            onClick={() => window.print()}
            className="btn-outline-gold w-full sm:w-auto px-8 py-3.5 flex items-center justify-center space-x-2 text-xs"
          >
            <Printer size={14} />
            <span>PRINT RECEIPT</span>
          </button>
          <Link href="/" className="btn-gold w-full sm:w-auto px-8 py-3.5 text-center text-xs flex-grow">
            RETURN TO HOME
          </Link>
        </div>
      </div>
    </div>
  );
}
