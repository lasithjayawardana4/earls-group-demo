"use client";

import { useState } from "react";
import { Loader } from "lucide-react";

interface SpaBookingFormProps {
  treatments: any[];
}

export default function SpaBookingForm({ treatments }: SpaBookingFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    treatment: treatments[0]?.name || "",
    date: "",
    time: "10:00",
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
        treatment: treatments[0]?.name || "",
        date: "",
        time: "10:00",
        requests: "",
      });
    }, 1500);
  };

  if (success) {
    return (
      <div className="p-8 border border-luxury-gold/30 bg-luxury-gold/5 text-center space-y-4">
        <h4 className="font-serif text-2xl text-luxury-gold">Spa Appointment Confirmed</h4>
        <p className="text-sm text-luxury-ivory/70 leading-relaxed font-light">
          Your spa therapy slot has been successfully scheduled. A confirmation email has been dispatched with prep details. We look forward to welcome you to our oasis of calmness.
        </p>
        <button
          onClick={() => setSuccess(false)}
          className="text-xs text-luxury-gold underline hover:text-luxury-ivory transition-colors uppercase tracking-widest mt-4"
        >
          Book Another Therapy
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
            Select Ritual
          </label>
          <select
            value={formData.treatment}
            onChange={(e) => setFormData({ ...formData, treatment: e.target.value })}
            className="w-full bg-luxury-black/40 border border-luxury-gold/15 py-3 px-4 focus:outline-none focus:border-luxury-gold/50 rounded-none cursor-pointer"
          >
            {treatments.map((t) => (
              <option key={t.name} value={t.name}>
                {t.name} ({t.duration})
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block tracking-widest text-luxury-ivory/50 uppercase mb-2">
            Preferred Time
          </label>
          <select
            value={formData.time}
            onChange={(e) => setFormData({ ...formData, time: e.target.value })}
            className="w-full bg-luxury-black/40 border border-luxury-gold/15 py-3 px-4 focus:outline-none focus:border-luxury-gold/50 rounded-none cursor-pointer"
          >
            {["09:00", "10:00", "11:30", "13:00", "14:30", "16:00", "17:30", "19:00"].map((t) => (
              <option key={t} value={t}>
                {t} {Number(t.split(":")[0]) >= 12 ? "PM" : "AM"}
              </option>
            ))}
          </select>
        </div>
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

      <div>
        <label className="block tracking-widest text-luxury-ivory/50 uppercase mb-2">
          Health Notes or Special Preferences
        </label>
        <textarea
          rows={3}
          placeholder="E.g., high blood pressure, muscle soreness focus areas, therapist preference..."
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
            <span>SCHEDULING...</span>
          </>
        ) : (
          <span>CONFIRM SPA APPOINTMENT</span>
        )}
      </button>
    </form>
  );
}
