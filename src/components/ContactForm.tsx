"use client";

import { useState } from "react";
import { Loader } from "lucide-react";

interface ContactFormProps {
  branches: any[];
}

export default function ContactForm({ branches }: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    branch: "Central Concierge",
    subject: "",
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
        branch: "Central Concierge",
        subject: "",
        message: "",
      });
    }, 1500);
  };

  if (success) {
    return (
      <div className="p-8 border border-luxury-gold/30 bg-luxury-gold/5 text-center space-y-4 text-xs">
        <h4 className="font-serif text-2xl text-luxury-gold">Message Sent Successfully</h4>
        <p className="text-sm text-luxury-ivory/70 leading-relaxed font-light">
          Thank you for contacting Earls Group. Your message has been routed to the appropriate department. A guest relations representative will get back to you shortly.
        </p>
        <button
          onClick={() => setSuccess(false)}
          className="text-xs text-luxury-gold underline hover:text-luxury-ivory transition-colors uppercase tracking-widest mt-4"
        >
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5 text-xs text-luxury-ivory">
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block tracking-widest text-luxury-ivory/50 uppercase mb-2">
            Sanctuary Destination
          </label>
          <select
            value={formData.branch}
            onChange={(e) => setFormData({ ...formData, branch: e.target.value })}
            className="w-full bg-luxury-black/40 border border-luxury-gold/15 py-3 px-4 focus:outline-none focus:border-luxury-gold/50 rounded-none cursor-pointer"
          >
            <option value="Central Concierge">Central Concierge Desk</option>
            {branches.map((b) => (
              <option key={b.name} value={b.name}>
                {b.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block tracking-widest text-luxury-ivory/50 uppercase mb-2">
            Subject
          </label>
          <input
            type="text"
            required
            placeholder="INQUIRY SUBJECT"
            value={formData.subject}
            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
            className="w-full bg-luxury-black/40 border border-luxury-gold/15 py-3 px-4 focus:outline-none focus:border-luxury-gold/50 rounded-none uppercase placeholder:text-luxury-ivory/20"
          />
        </div>
      </div>

      <div>
        <label className="block tracking-widest text-luxury-ivory/50 uppercase mb-2">
          Your Message
        </label>
        <textarea
          rows={4}
          placeholder="How can we accommodate your upcoming luxury stay or events registry..."
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
            <span>TRANSMITTING MESSAGE...</span>
          </>
        ) : (
          <span>TRANSMIT MESSAGE</span>
        )}
      </button>
    </form>
  );
}
