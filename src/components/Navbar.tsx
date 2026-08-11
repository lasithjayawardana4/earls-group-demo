"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight, Sun, Moon } from "lucide-react";

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
  const hasHeroHeader =
    pathname === "/" ||
    pathname === "/about" ||
    pathname === "/dining" ||
    pathname === "/spa" ||
    pathname === "/weddings" ||
    (pathname.startsWith("/hotels/") && pathname !== "/hotels");
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const isDark = document.documentElement.classList.contains("dark");
    setTheme(isDark ? "dark" : "light");
  }, []);

  // Sync navbar theme state when route changes (e.g. going to/from Spa page)
  useEffect(() => {
    if (!mounted) return;
    const isDark = document.documentElement.classList.contains("dark");
    setTheme(isDark ? "dark" : "light");
  }, [pathname, mounted]);

  const toggleTheme = () => {
    const nextTheme = theme === "light" ? "dark" : "light";
    setTheme(nextTheme);
    localStorage.setItem("theme", nextTheme);
    if (nextTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

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
    return hasHeroHeader && !scrolled
      ? "text-white/80 hover:text-luxury-gold"
      : "text-luxury-ivory/80 hover:text-luxury-gold";
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
            <span className={`font-serif text-xl tracking-[0.25em] transition-colors duration-300 group-hover:text-luxury-gold ${
              hasHeroHeader && !scrolled ? "text-white" : "text-luxury-ivory"
            }`}>
              EARLS GROUP
            </span>
            <span className="text-[0.6rem] tracking-[0.45em] text-luxury-gold text-center uppercase">
              Sri Lanka
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center lg:space-x-4 xl:space-x-8">
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
          <div className="hidden lg:flex items-center lg:space-x-3 xl:space-x-5">
            <button
              onClick={toggleTheme}
              className={`p-2 hover:text-luxury-gold transition-colors duration-300 focus:outline-none cursor-pointer flex items-center justify-center ${
                hasHeroHeader && !scrolled ? "text-white" : "text-luxury-ivory"
              }`}
              aria-label="Toggle Dark Mode"
            >
              {!mounted ? (
                <div className={`w-5 h-5 animate-pulse rounded-full ${
                  hasHeroHeader && !scrolled ? "bg-white/10" : "bg-luxury-ivory/10"
                }`} />
              ) : theme === "dark" ? (
                <Sun size={18} className="text-luxury-gold animate-[spin_10s_linear_infinite]" />
              ) : (
                <Moon size={18} />
              )}
            </button>
            <Link
              href="/admin"
              className={`text-xs transition-colors duration-300 font-sans uppercase tracking-widest ${
                hasHeroHeader && !scrolled ? "text-white/60 hover:text-luxury-gold" : "text-luxury-ivory/60 hover:text-luxury-gold"
              }`}
            >
              Portal
            </Link>
            <Link href="/hotels" className="btn-gold px-6 py-2.5 rounded-none font-sans">
              Book Your Stay
            </Link>
          </div>

          {/* Mobile Dark Mode and Hamburger */}
          <div className="flex lg:hidden items-center space-x-3">
            <button
              onClick={toggleTheme}
              className={`p-2 hover:text-luxury-gold transition-colors duration-300 focus:outline-none cursor-pointer flex items-center justify-center ${
                hasHeroHeader && !scrolled ? "text-white" : "text-luxury-ivory"
              }`}
              aria-label="Toggle Dark Mode"
            >
              {!mounted ? (
                <div className={`w-5 h-5 animate-pulse rounded-full ${
                  hasHeroHeader && !scrolled ? "bg-white/10" : "bg-luxury-ivory/10"
                }`} />
              ) : theme === "dark" ? (
                <Sun size={18} className="text-luxury-gold animate-[spin_10s_linear_infinite]" />
              ) : (
                <Moon size={18} />
              )}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-2 hover:text-luxury-gold transition-colors focus:outline-none ${
                hasHeroHeader && !scrolled ? "text-white" : "text-luxury-ivory"
              }`}
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
            />
            
            {/* Drawer */}
            <motion.div
              className="fixed top-0 right-0 bottom-0 w-full max-w-xs z-40 bg-luxury-black/95 border-l border-luxury-gold/15 flex flex-col justify-between pt-28 pb-8 px-6 lg:hidden"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.35, ease: "easeOut" }}
            >
              <nav className="flex flex-col space-y-6">
                {navLinks.map((link, idx) => (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.04, duration: 0.3 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`font-serif text-2xl tracking-wider block ${
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
                transition={{ delay: 0.3 }}
              >
                <Link
                  href="/hotels"
                  onClick={() => setMobileMenuOpen(false)}
                  className="btn-gold py-3 w-full flex items-center justify-center space-x-2 font-sans rounded-none text-xs"
                >
                  <span>Book Your Stay</span>
                  <ArrowRight size={14} />
                </Link>
                <div className="flex justify-between text-[0.65rem] tracking-wider text-luxury-ivory/40">
                  <Link href="/admin/login" onClick={() => setMobileMenuOpen(false)}>Admin Dashboard</Link>
                  <span>© {new Date().getFullYear()} Earls Group</span>
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
