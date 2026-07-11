"use client";

import { useState } from "react";
import { Loader } from "lucide-react";

interface DiningReservationFormProps {
  restaurants: any[];
}

export default function DiningReservationForm({ restaurants }: DiningReservationFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    restaurant: restaurants[0]?.name || "",
    guests: "2",
    date: "",
    time: "19:00",
    requests: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        restaurant: restaurants[0]?.name || "",
        guests: "2",
        date: "",
        time: "19:00",
        requests: "",
      });
    }, 1500);
  };

  if (success) {
    return (
      <div className="p-8 border border-luxury-gold/30 bg-luxury-gold/5 text-center space-y-4">
        <h4 className="font-serif text-2xl text-luxury-gold">Table Reserved Successfully</h4>
        <p className="text-sm text-luxury-ivory/70 leading-relaxed font-light">
          Your table reservation has been confirmed. A confirmation receipt has been sent to your email. We look forward to hosting you for an exquisite dining experience.
        </p>
        <button
          onClick={() => setSuccess(false)}
          className="text-xs text-luxury-gold underline hover:text-luxury-ivory transition-colors uppercase tracking-widest mt-4"
        >
          Book Another Table
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 text-xs text-luxury-ivory">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block tracking-widest text-luxury-ivory/50 uppercase mb-2">
            Your Name
          </label>
          <input
            type="text"
            required
            placeholder="ENTER YOUR FULL NAME"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full bg-luxury-black/40 border border-luxury-gold/15 py-3 px-4 focus:outline-none focus:border-luxury-gold/50 rounded-none uppercase placeholder:text-luxury-ivory/20"
          />
        </div>
        <div>
          <label className="block tracking-widest text-luxury-ivory/50 uppercase mb-2">
            Email Address
          </label>
          <input
            type="email"
            required
            placeholder="ENTER YOUR EMAIL ADDRESS"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full bg-luxury-black/40 border border-luxury-gold/15 py-3 px-4 focus:outline-none focus:border-luxury-gold/50 rounded-none uppercase placeholder:text-luxury-ivory/20"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label className="block tracking-widest text-luxury-ivory/50 uppercase mb-2">
            Phone Number
          </label>
          <input
            type="tel"
            required
            placeholder="PHONE NUMBER"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="w-full bg-luxury-black/40 border border-luxury-gold/15 py-3 px-4 focus:outline-none focus:border-luxury-gold/50 rounded-none placeholder:text-luxury-ivory/20"
          />
        </div>
        <div>
          <label className="block tracking-widest text-luxury-ivory/50 uppercase mb-2">
            Select Restaurant
          </label>
          <select
            value={formData.restaurant}
            onChange={(e) => setFormData({ ...formData, restaurant: e.target.value })}
            className="w-full bg-luxury-black/40 border border-luxury-gold/15 py-3 px-4 focus:outline-none focus:border-luxury-gold/50 rounded-none cursor-pointer"
          >
            {restaurants.map((r) => (
              <option key={r.name} value={r.name}>
                {r.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block tracking-widest text-luxury-ivory/50 uppercase mb-2">
            Guests
          </label>
          <select
            value={formData.guests}
            onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
            className="w-full bg-luxury-black/40 border border-luxury-gold/15 py-3 px-4 focus:outline-none focus:border-luxury-gold/50 rounded-none cursor-pointer"
          >
            {[1, 2, 3, 4, 5, 6, 8, 10].map((num) => (
              <option key={num} value={num}>
                {num} Guests
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block tracking-widest text-luxury-ivory/50 uppercase mb-2">
            Reservation Date
          </label>
          <input
            type="date"
            required
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            className="w-full bg-luxury-black/40 border border-luxury-gold/15 py-3 px-4 focus:outline-none focus:border-luxury-gold/50 rounded-none cursor-pointer text-luxury-ivory/80"
          />
        </div>
        <div>
          <label className="block tracking-widest text-luxury-ivory/50 uppercase mb-2">
            Time Slot
          </label>
          <select
            value={formData.time}
            onChange={(e) => setFormData({ ...formData, time: e.target.value })}
            className="w-full bg-luxury-black/40 border border-luxury-gold/15 py-3 px-4 focus:outline-none focus:border-luxury-gold/50 rounded-none cursor-pointer"
          >
            {["18:00", "18:30", "19:00", "19:30", "20:00", "20:30", "21:00", "21:30"].map((t) => (
              <option key={t} value={t}>
                {t} PM
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="block tracking-widest text-luxury-ivory/50 uppercase mb-2">
          Special Dietary or Seating Requirements
        </label>
        <textarea
          rows={3}
          placeholder="E.g., vegetarian diet, window-side table, wheelchair accessibility..."
          value={formData.requests}
          onChange={(e) => setFormData({ ...formData, requests: e.target.value })}
          className="w-full bg-luxury-black/40 border border-luxury-gold/15 py-3 px-4 focus:outline-none focus:border-luxury-gold/50 rounded-none resize-none placeholder:text-luxury-ivory/20"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="btn-gold w-full py-4 mt-4 flex items-center justify-center space-x-2 text-xs"
      >
        {loading ? (
          <>
            <Loader size={14} className="animate-spin" />
            <span>CONFIRMING TABLE...</span>
          </>
        ) : (
          <span>CONFIRM TABLE RESERVATION</span>
        )}
      </button>
    </form>
  );
}
