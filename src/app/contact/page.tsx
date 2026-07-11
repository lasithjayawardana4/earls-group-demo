import Image from "next/image";
import ContactForm from "@/components/ContactForm";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

export const metadata = {
  title: "Contact Us | Earls Group Sri Lanka",
  description: "Connect with Earls Group. Reach our Colombo headquarters or check the direct contact details of our five-star resorts.",
};

export default function ContactPage() {
  const branches = [
    { name: "Earls Grand Colombo", tel: "+94 11 234 5678", mail: "colombo@earlsgroup.lk", loc: "Galle Road, Colombo 03" },
    { name: "Earls Ocean Paradise", tel: "+94 34 234 5678", mail: "bentota@earlsgroup.lk", loc: "Coastal Path, Bentota" },
    { name: "Earls Highland Retreat", tel: "+94 52 234 5678", mail: "nuwaraeliya@earlsgroup.lk", loc: "Tea Valley Road, Nuwara Eliya" },
    { name: "Earls Lagoon Resort", tel: "+94 31 234 5678", mail: "negombo@earlsgroup.lk", loc: "Lagoon Boulevard, Negombo" },
    { name: "Earls Royal Kandy", tel: "+94 81 234 5678", mail: "kandy@earlsgroup.lk", loc: "Mahaweli View Drive, Kandy" },
  ];

  return (
    <div className="relative min-h-screen bg-luxury-black pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6 space-y-16">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-xs tracking-[0.4em] uppercase text-luxury-gold mb-3 block">
            Reservations &amp; Concierge
          </span>
          <h1 className="font-serif text-4xl md:text-7xl text-luxury-ivory mb-6">
            Connect With Us
          </h1>
          <p className="text-sm text-luxury-ivory/60 font-light leading-relaxed">
            Begin your journey. Reach out to our central reservations registry, or directly communicate with our individual resorts.
          </p>
        </div>

        {/* 2 Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left Column: Branch Info */}
          <div className="space-y-10">
            <div>
              <h3 className="font-serif text-2xl text-luxury-ivory mb-6">Resort Direct Contacts</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {branches.map((branch) => (
                  <div
                    key={branch.name}
                    className="p-5 border border-luxury-gold/5 bg-luxury-charcoal/15 space-y-3"
                  >
                    <h4 className="font-serif text-lg text-luxury-gold">{branch.name}</h4>
                    <div className="space-y-1.5 text-xs text-luxury-ivory/60 font-light">
                      <div className="flex items-center space-x-2">
                        <MapPin size={12} className="text-luxury-gold" />
                        <span>{branch.loc}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Phone size={12} className="text-luxury-gold" />
                        <span>{branch.tel}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Mail size={12} className="text-luxury-gold" />
                        <span>{branch.mail}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* General HQ Contact */}
            <div className="border-t border-luxury-gold/15 pt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <span className="block text-[0.65rem] tracking-widest text-luxury-gold uppercase">
                  Central Registry
                </span>
                <p className="text-xs text-luxury-ivory/70 font-light leading-relaxed">
                  Earls Group HQ Building,<br />12 Galle Road, Colombo 03, Sri Lanka
                </p>
              </div>
              <div className="space-y-2 text-xs text-luxury-ivory/70 font-light">
                <div className="flex items-center space-x-2">
                  <Phone size={12} className="text-luxury-gold" />
                  <span>+94 (11) 234-5678</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail size={12} className="text-luxury-gold" />
                  <span>concierge@earlsgroup.lk</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock size={12} className="text-luxury-gold" />
                  <span>24 Hours Concierge Desk</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Inquiry Form */}
          <div className="border border-luxury-gold/15 p-8 md:p-12 glass-panel space-y-6">
            <div>
              <h3 className="font-serif text-2xl text-luxury-ivory text-center">General Inquiries</h3>
              <p className="text-xs text-luxury-gold tracking-widest uppercase text-center mt-2">
                Send a message to our central guest services
              </p>
            </div>
            <ContactForm branches={branches} />
          </div>
        </div>

        {/* Custom Styled Map Placeholder */}
        <div className="border border-luxury-gold/15 h-96 w-full relative overflow-hidden flex items-center justify-center bg-luxury-charcoal/30">
          <div className="absolute inset-0 opacity-15 filter invert">
            <Image
              src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=1200&q=80"
              alt="Map outline"
              fill
              className="object-cover"
            />
          </div>
          {/* Simulated 3D coordinates markers */}
          <div className="relative z-10 text-center space-y-4 max-w-sm px-6">
            <MapPin className="text-luxury-gold animate-float mx-auto" size={32} />
            <h4 className="font-serif text-lg text-luxury-ivory">Sri Lankan Luxury Map</h4>
            <p className="text-xs text-luxury-ivory/50 leading-relaxed font-light">
              Interactive satellite coordinates loaded. Our properties reside in major destinations: Colombo, Bentota, Nuwara Eliya, Negombo, and Kandy.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
