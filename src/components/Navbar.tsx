"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight } from "lucide-react";

const navLinks = [
  { name: "Hotels", href: "/hotels" },
  { name: "Experiences", href: "/#experiences" },
  { name: "Weddings", href: "/weddings" },
  { name: "Dining", href: "/dining" },
  { name: "Spa", href: "/spa" },
  { name: "Gallery", href: "/gallery" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const activeLinkStyle = (href: string) => {
    if (href === "/" && pathname === "/") return "text-luxury-gold";
    if (href !== "/" && pathname.startsWith(href)) return "text-luxury-gold";
    return "text-luxury-ivory/80 hover:text-luxury-gold";
  };

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-luxury-black/75 backdrop-blur-md border-b border-luxury-gold/15 py-4"
            : "bg-transparent py-6"
        }`}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="group flex flex-col">
            <span className="font-serif text-xl tracking-[0.25em] text-luxury-ivory group-hover:text-luxury-gold transition-colors duration-300">
              EARLS GROUP
            </span>
            <span className="text-[0.6rem] tracking-[0.45em] text-luxury-gold text-center uppercase">
              Sri Lanka
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`relative font-sans text-xs tracking-widest uppercase transition-colors duration-300 ${activeLinkStyle(
                  link.href
                )}`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Book Now Button */}
          <div className="hidden lg:flex items-center space-x-4">
            <Link
              href="/admin"
              className="text-xs text-luxury-ivory/60 hover:text-luxury-gold transition-colors duration-300 font-sans uppercase tracking-widest mr-2"
            >
              Portal
            </Link>
            <Link href="/hotels" className="btn-gold px-6 py-2.5 rounded-none font-sans">
              Book Your Stay
            </Link>
          </div>

          {/* Mobile Hamburger Menu */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-luxury-ivory hover:text-luxury-gold transition-colors focus:outline-none"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.header>

      {/* Fullscreen Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-luxury-black/95 backdrop-blur-lg flex flex-col justify-between pt-32 pb-12 px-8 lg:hidden"
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ type: "tween", duration: 0.5, ease: "easeInOut" }}
          >
            <nav className="flex flex-col space-y-6">
              {navLinks.map((link, idx) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05, duration: 0.4 }}
                >
                  <Link
                    href={link.href}
                    className={`font-serif text-3xl tracking-wider block ${
                      pathname === link.href ? "text-luxury-gold" : "text-luxury-ivory"
                    }`}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </nav>

            <motion.div
              className="flex flex-col space-y-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <Link
                href="/hotels"
                className="btn-gold py-4 w-full flex items-center justify-center space-x-2 font-sans rounded-none"
              >
                <span>Book Your Stay</span>
                <ArrowRight size={16} />
              </Link>
              <div className="flex justify-between text-xs tracking-wider text-luxury-ivory/40">
                <Link href="/admin/login">Admin Dashboard</Link>
                <span>© {new Date().getFullYear()} Earls Group</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
