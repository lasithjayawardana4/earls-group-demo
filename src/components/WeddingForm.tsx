"use client";

import { useState } from "react";
import { Loader } from "lucide-react";

interface WeddingFormProps {
  venues: any[];
}

export default function WeddingForm({ venues }: WeddingFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    venue: venues[0]?.venueName || "",
    guests: "150",
    date: "",
    message: "",
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
        venue: venues[0]?.venueName || "",
        guests: "150",
        date: "",
        message: "",
      });
    }, 1500);
  };

  if (success) {
    return (
      <div className="p-8 border border-luxury-gold/30 bg-luxury-gold/5 text-center space-y-4">
        <h4 className="font-serif text-2xl text-luxury-gold">Inquiry Submitted Successfully</h4>
        <p className="text-sm text-luxury-ivory/70 leading-relaxed font-light">
          Thank you for sharing your vision with us. Our luxury events concierge will review your inquiry and reach out within 24 hours to begin designing your sanctuary celebration.
        </p>
        <button
          onClick={() => setSuccess(false)}
          className="text-xs text-luxury-gold underline hover:text-luxury-ivory transition-colors uppercase tracking-widest mt-4"
        >
          Submit Another Inquiry
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
            Preferred Venue
          </label>
          <select
            value={formData.venue}
            onChange={(e) => setFormData({ ...formData, venue: e.target.value })}
            className="w-full bg-luxury-black/40 border border-luxury-gold/15 py-3 px-4 focus:outline-none focus:border-luxury-gold/50 rounded-none cursor-pointer"
          >
            {venues.map((v) => (
              <option key={v.venueName} value={v.venueName}>
                {v.venueName}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block tracking-widest text-luxury-ivory/50 uppercase mb-2">
            Preferred Date
          </label>
          <input
            type="date"
            required
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            className="w-full bg-luxury-black/40 border border-luxury-gold/15 py-3 px-4 focus:outline-none focus:border-luxury-gold/50 rounded-none cursor-pointer text-luxury-ivory/80"
          />
        </div>
      </div>

      <div>
        <label className="block tracking-widest text-luxury-ivory/50 uppercase mb-2">
          Estimated Guest Count
        </label>
        <select
          value={formData.guests}
          onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
          className="w-full bg-luxury-black/40 border border-luxury-gold/15 py-3 px-4 focus:outline-none focus:border-luxury-gold/50 rounded-none cursor-pointer"
        >
          <option value="under-100">Under 100 Guests</option>
          <option value="100-200">100 - 200 Guests</option>
          <option value="200-350">200 - 350 Guests</option>
          <option value="over-350">Over 350 Guests</option>
        </select>
      </div>

      <div>
        <label className="block tracking-widest text-luxury-ivory/50 uppercase mb-2">
          Tell us about your celebration
        </label>
        <textarea
          rows={4}
          placeholder="Share details of your ideal wedding styling, culinary preferences, accommodation needs..."
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
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
            <span>SUBMITTING INQUIRY...</span>
          </>
        ) : (
          <span>SUBMIT WEDDING INQUIRY</span>
        )}
      </button>
    </form>
  );
}
