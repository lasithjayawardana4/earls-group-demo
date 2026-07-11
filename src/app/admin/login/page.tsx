"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Lock, Mail, Loader, ArrowLeft } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (data.success) {
        router.push("/admin");
      } else {
        setError(data.error || "Login failed. Please verify credentials.");
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-luxury-black flex flex-col justify-center items-center px-6 py-12 relative">
      {/* Return to home link */}
      <Link
        href="/"
        className="absolute top-8 left-8 text-xs tracking-widest text-luxury-gold hover:text-luxury-ivory transition-colors flex items-center space-x-2 uppercase font-sans"
      >
        <ArrowLeft size={14} />
        <span>Return to Home</span>
      </Link>

      <div className="max-w-md w-full border border-luxury-gold/15 glass-panel p-8 md:p-10 space-y-8">
        {/* Header */}
        <div className="text-center">
          <span className="text-[0.65rem] tracking-[0.4em] uppercase text-luxury-gold mb-2 block">
            Security Registry
          </span>
          <h2 className="font-serif text-3xl text-luxury-ivory">Admin Portal Login</h2>
        </div>

        {error && (
          <div className="p-3 border border-red-500/20 bg-red-500/5 text-red-400 text-xs text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6 text-xs text-luxury-ivory">
          <div>
            <label className="block tracking-widest text-luxury-ivory/50 uppercase mb-2">
              Email Address
            </label>
            <div className="relative flex items-center">
              <input
                type="email"
                required
                placeholder="admin@earlsgroup.lk"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-luxury-black/40 border border-luxury-gold/15 py-3 pl-10 pr-4 focus:outline-none focus:border-luxury-gold/50 rounded-none placeholder:text-luxury-ivory/25 text-xs text-luxury-ivory tracking-widest"
              />
              <Mail size={14} className="absolute left-3.5 text-luxury-gold/40" />
            </div>
          </div>

          <div>
            <label className="block tracking-widest text-luxury-ivory/50 uppercase mb-2">
              Password
            </label>
            <div className="relative flex items-center">
              <input
                type="password"
                required
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-luxury-black/40 border border-luxury-gold/15 py-3 pl-10 pr-4 focus:outline-none focus:border-luxury-gold/50 rounded-none text-xs text-luxury-ivory tracking-widest"
              />
              <Lock size={14} className="absolute left-3.5 text-luxury-gold/40" />
            </div>
          </div>

          {/* Info Card */}
          <div className="p-4 border border-luxury-gold/10 bg-luxury-gold/5 text-[0.65rem] leading-relaxed text-luxury-gold/80 font-light font-mono space-y-1">
            <span className="font-semibold block uppercase">Demo Credentials:</span>
            <div>Email: admin@earlsgroup.lk</div>
            <div>Password: luxuryRedefined2026</div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-gold w-full py-4 flex items-center justify-center space-x-2 text-xs"
          >
            {loading ? (
              <>
                <Loader size={14} className="animate-spin" />
                <span>AUTHENTICATING...</span>
              </>
            ) : (
              <span>LOGIN SECURELY</span>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
