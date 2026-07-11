import Image from "next/image";
import { Award, Shield, Eye, Target } from "lucide-react";

export const metadata = {
  title: "About Us | Earls Group Sri Lanka",
  description: "Learn about the heritage, timeline, and leadership of Sri Lanka's most prestigious luxury hotel brand.",
};

export default function AboutPage() {
  const milestones = [
    { year: "1998", title: "The Genesis", desc: "Earls Group is founded in Sri Lanka with a vision to deliver world-class hospitality that reflects the nation's rich heritage." },
    { year: "2006", title: "Bentota Coastal Sanctuary", desc: "Opening of Earls Ocean Paradise, set on the gold sands of Bentota, introducing open-air tropical architectural aesthetics." },
    { year: "2012", title: "Highland Retreat Estate", desc: "Acquisition and restoration of a colonial tea country manor in Nuwara Eliya, introducing the tea sommelier rituals." },
    { year: "2018", title: "Imperial Kandy Fortress", desc: "Launch of Earls Royal Kandy on the banks of the Mahaweli River, designed to honor the cultural arts of the last royal capital." },
    { year: "2025", title: "Colombo Skyline Landmark", desc: "Inauguration of Earls Grand Colombo, a modern skyscraper sanctuary offering Michelin-inspired gastronomy and rooftop heliports." },
  ];

  const leaders = [
    { name: "Earl Gunasekara", role: "Founder & Chairman", img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&h=400&q=80" },
    { name: "Amani Gunasekara", role: "Managing Director", img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&h=400&q=80" },
    { name: "Rohan De Silva", role: "Chief Operating Officer", img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&h=400&q=80" },
  ];

  return (
    <div className="relative min-h-screen bg-luxury-black">
      {/* Hero */}
      <section className="relative h-[65vh] w-full flex items-end justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1920&q=80"
            alt="Earls Story"
            fill
            priority
            className="object-cover filter brightness-95 contrast-95"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-luxury-black/50 to-luxury-black z-10" />
        </div>
        <div className="relative z-20 max-w-4xl mx-auto text-center px-6 pb-16">
          <span className="text-xs tracking-[0.4em] uppercase text-luxury-gold mb-4 block">
            Our Heritage
          </span>
          <h1 className="font-serif text-4xl md:text-7xl text-luxury-ivory tracking-wide">
            Luxury Redefined
          </h1>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-7xl mx-auto px-6 py-24 space-y-28">
        {/* Intro */}
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <p className="font-serif text-2xl md:text-3xl text-luxury-gold italic font-light leading-relaxed">
            &ldquo;Celebrating over two decades of five-star hospitality across Sri Lanka.&rdquo;
          </p>
          <p className="text-sm text-luxury-ivory/60 leading-relaxed font-light">
            Founded on the pillars of prestige, elegance, and deep-seated comfort, Earls Group has grown to become Sri Lanka&apos;s most recognized ultra-luxury hotel collection. Our sanctuaries connect guests directly with local nature, culture, and high-end modern convenience.
          </p>
        </div>

        {/* Vision & Mission */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="border border-luxury-gold/10 p-8 glass-panel space-y-4">
            <div className="w-12 h-12 rounded-full border border-luxury-gold/20 flex items-center justify-center text-luxury-gold mb-2">
              <Eye size={20} />
            </div>
            <h3 className="font-serif text-2xl text-luxury-ivory">Our Vision</h3>
            <p className="text-xs text-luxury-ivory/60 leading-relaxed font-light">
              To remain Sri Lanka&apos;s definitive standard of ultra-premium hospitality, creating immersive travel narratives that unite natural scenery with meticulous five-star service.
            </p>
          </div>
          <div className="border border-luxury-gold/10 p-8 glass-panel space-y-4">
            <div className="w-12 h-12 rounded-full border border-luxury-gold/20 flex items-center justify-center text-luxury-gold mb-2">
              <Target size={20} />
            </div>
            <h3 className="font-serif text-2xl text-luxury-ivory">Our Mission</h3>
            <p className="text-xs text-luxury-ivory/60 leading-relaxed font-light">
              To craft bespoke sanctuaries that honor their surrounding cultural identity. We pledge an unwavering commitment to culinary refinement, wellness healing, and dedicated guest service.
            </p>
          </div>
        </div>

        {/* History Timeline */}
        <div className="space-y-16">
          <div className="text-center">
            <span className="text-xs tracking-[0.3em] uppercase text-luxury-gold mb-2 block">
              Chronicles
            </span>
            <h3 className="font-serif text-4xl text-luxury-ivory">The Historic Timeline</h3>
          </div>

          <div className="relative border-l border-luxury-gold/20 max-w-3xl mx-auto pl-8 space-y-12">
            {milestones.map((milestone) => (
              <div key={milestone.year} className="relative space-y-2">
                {/* Node dot */}
                <div className="absolute -left-[38px] top-1.5 w-4 h-4 rounded-full bg-luxury-black border-2 border-luxury-gold flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-luxury-gold animate-pulse" />
                </div>
                <span className="text-sm font-semibold text-luxury-gold font-mono block">
                  {milestone.year}
                </span>
                <h4 className="font-serif text-xl text-luxury-ivory">
                  {milestone.title}
                </h4>
                <p className="text-xs text-luxury-ivory/60 leading-relaxed font-light">
                  {milestone.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Leadership */}
        <div className="space-y-16">
          <div className="text-center">
            <span className="text-xs tracking-[0.3em] uppercase text-luxury-gold mb-2 block">
              Custodians
            </span>
            <h3 className="font-serif text-4xl text-luxury-ivory">Board of Leadership</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {leaders.map((leader) => (
              <div
                key={leader.name}
                className="group border border-luxury-gold/5 bg-luxury-charcoal/15 text-center overflow-hidden flex flex-col justify-between"
              >
                <div className="relative h-80 overflow-hidden">
                  <Image
                    src={leader.img}
                    alt={leader.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-95"
                  />
                </div>
                <div className="p-6 border-t border-luxury-gold/5">
                  <h4 className="font-serif text-xl text-luxury-ivory">{leader.name}</h4>
                  <span className="text-[0.65rem] text-luxury-gold uppercase tracking-widest mt-1 block">
                    {leader.role}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
