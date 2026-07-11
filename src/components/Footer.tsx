"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Mail, Award } from "lucide-react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <footer className="bg-luxury-black border-t border-luxury-gold/15 text-luxury-ivory pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
        {/* Column 1: Branding & Accolades */}
        <div className="flex flex-col space-y-6">
          <Link href="/" className="group flex flex-col w-fit">
            <span className="font-serif text-2xl tracking-[0.25em] text-luxury-ivory group-hover:text-luxury-gold transition-colors duration-300">
              EARLS GROUP
            </span>
            <span className="text-[0.65rem] tracking-[0.45em] text-luxury-gold uppercase mt-1">
              Sri Lanka
            </span>
          </Link>
          <p className="text-sm text-luxury-ivory/60 font-light leading-relaxed max-w-sm">
            Sri Lanka&apos;s premier collection of five-star luxury hotels, offering bespoke hospitality, breathtaking destinations, and unforgettable cinematic experiences.
          </p>
          <div className="flex items-center space-x-3 pt-2">
            <Award className="text-luxury-gold" size={20} />
            <span className="text-xs tracking-widest uppercase text-luxury-gold/80">
              5-Star World-Class Hospitality
            </span>
          </div>
        </div>

        {/* Column 2: Quick Links */}
        <div>
          <h4 className="font-serif text-lg tracking-wider text-luxury-gold mb-6">Explore</h4>
          <ul className="space-y-3 text-sm">
            {[
              { name: "Our Hotels", href: "/hotels" },
              { name: "Fine Dining", href: "/dining" },
              { name: "Weddings & Celebrations", href: "/weddings" },
              { name: "Wellness & Spa", href: "/spa" },
              { name: "Curated Experiences", href: "/#experiences" },
              { name: "Media Gallery", href: "/gallery" },
              { name: "Our Story", href: "/about" },
            ].map((link) => (
              <li key={link.name}>
                <Link
                  href={link.href}
                  className="text-luxury-ivory/60 hover:text-luxury-gold transition-colors duration-200"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 3: Contact */}
        <div>
          <h4 className="font-serif text-lg tracking-wider text-luxury-gold mb-6">Contact</h4>
          <ul className="space-y-4 text-sm text-luxury-ivory/60">
            <li>
              <span className="block text-xs uppercase tracking-widest text-luxury-gold/50 mb-1">
                Headquarters
              </span>
              <span>12 Galle Road, Colombo 03, Sri Lanka</span>
            </li>
            <li>
              <span className="block text-xs uppercase tracking-widest text-luxury-gold/50 mb-1">
                Reservations
              </span>
              <a
                href="tel:+94112345678"
                className="hover:text-luxury-gold transition-colors block"
              >
                +94 (11) 234-5678
              </a>
            </li>
            <li>
              <span className="block text-xs uppercase tracking-widest text-luxury-gold/50 mb-1">
                General Inquiries
              </span>
              <a
                href="mailto:concierge@earlsgroup.lk"
                className="hover:text-luxury-gold transition-colors block"
              >
                concierge@earlsgroup.lk
              </a>
            </li>
          </ul>
        </div>

        {/* Column 4: Newsletter */}
        <div>
          <h4 className="font-serif text-lg tracking-wider text-luxury-gold mb-6">Newsletter</h4>
          <p className="text-sm text-luxury-ivory/60 mb-6 leading-relaxed">
            Subscribe to receive exclusive offers, seasonal travel guides, and luxury design insights from Earls Group.
          </p>
          {subscribed ? (
            <div className="p-4 border border-luxury-gold/30 bg-luxury-gold/5 text-sm text-luxury-gold font-light">
              Thank you. You have been added to the Earls newsletter list.
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="relative flex items-center">
              <input
                type="email"
                required
                placeholder="YOUR EMAIL ADDRESS"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-luxury-charcoal/50 border border-luxury-gold/15 py-3.5 pl-4 pr-12 text-xs tracking-widest text-luxury-ivory uppercase focus:outline-none focus:border-luxury-gold/50 placeholder:text-luxury-ivory/30 transition-all rounded-none"
              />
              <button
                type="submit"
                className="absolute right-0 top-0 bottom-0 px-4 text-luxury-gold hover:text-luxury-ivory transition-colors duration-200"
                aria-label="Subscribe"
              >
                <ArrowRight size={18} />
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="max-w-7xl mx-auto px-6 pt-10 border-t border-luxury-gold/10 flex flex-col md:flex-row items-center justify-between text-xs text-luxury-ivory/40 gap-6">
        <div>
          &copy; {new Date().getFullYear()} Earls Group. All Rights Reserved. Crafted for Ultra Premium Hospitality.
        </div>
        <div className="flex space-x-6">
          <Link href="/privacy" className="hover:text-luxury-gold transition-colors">
            Privacy Policy
          </Link>
          <Link href="/terms" className="hover:text-luxury-gold transition-colors">
            Terms of Service
          </Link>
          <Link href="/careers" className="hover:text-luxury-gold transition-colors">
            Careers
          </Link>
        </div>
        <div className="flex items-center space-x-4">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
            className="hover:text-luxury-gold transition-colors"
            aria-label="Instagram"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
          </a>
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noreferrer"
            className="hover:text-luxury-gold transition-colors"
            aria-label="Facebook"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
          </a>
          <a
            href="https://youtube.com"
            target="_blank"
            rel="noreferrer"
            className="hover:text-luxury-gold transition-colors"
            aria-label="Youtube"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M23.498 6.163a3.003 3.003 0 00-2.11-2.11C19.517 3.545 12 3.545 12 3.545s-7.517 0-9.388.508a3.003 3.003 0 00-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 002.11 2.11c1.871.508 9.388.508 9.388.508s7.517 0 9.388-.508a3.003 3.003 0 002.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
          </a>
        </div>
      </div>
    </footer>
  );
}
