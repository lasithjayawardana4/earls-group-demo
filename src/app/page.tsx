import Link from "next/link";
import Image from "next/image";
import { getHotels, getTestimonials } from "@/lib/data";
import { Star, Award, Compass, Heart, UtensilsCrossed, Sparkles } from "lucide-react";
import HomeClientEffects from "@/components/HomeClientEffects";

export default async function Home() {
  const hotels = await getHotels();
  const featuredHotels = hotels.filter((h: any) => h.featured);
  const testimonials = await getTestimonials();

  const experiences = [
    {
      title: "Wedding Venues",
      desc: "Exchange vows in majestic ballrooms or beach pavilions overlooking the Indian Ocean.",
      icon: Heart,
      img: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=600&q=80",
    },
    {
      title: "Fine Dining",
      desc: "Michelin-inspired culinary journeys curated by world-renowned chefs.",
      icon: UtensilsCrossed,
      img: "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=600&q=80",
    },
    {
      title: "Infinity Pools",
      desc: "Unwind in pristine waters that dissolve into panoramic ocean and mountain vistas.",
      icon: Compass,
      img: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=600&q=80",
    },
    {
      title: "Luxury Spas",
      desc: "Ayurvedic rituals and body scrub therapies to restore your inner balance.",
      icon: Sparkles,
      img: "https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?auto=format&fit=crop&w=600&q=80",
    },
  ];

  const awards = [
    { title: "5 Star Hospitality", authority: "Sri Lanka Tourism Board", year: "2025" },
    { title: "Best Luxury Resort", authority: "Conde Nast Johansens", year: "2025" },
    { title: "Tourism Excellence", authority: "World Travel Awards", year: "2026" },
    { title: "World Class Dining", authority: "Global Gastronomy Guide", year: "2026" },
  ];

  const instagramPosts = [
    "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=400&q=80",
    "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=400&q=80",
    "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=400&q=80",
    "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=400&q=80",
    "https://images.unsplash.com/photo-1439066615861-d1af74d74000?auto=format&fit=crop&w=400&q=80",
    "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=400&q=80",
  ];

  return (
    <div className="relative min-h-screen bg-luxury-black overflow-hidden">
      {/* 1. Cinematic Hero Section */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        {/* Background Video with Light Overlay */}
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover scale-105 filter brightness-95 contrast-100"
            poster="https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1920&q=80"
          >
            <source
              src="https://assets.mixkit.co/videos/preview/mixkit-beautiful-swimming-pool-in-a-resort-40899-large.mp4"
              type="video/mp4"
            />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-luxury-black/92 via-luxury-black/85 to-luxury-black z-10" />
        </div>

        {/* Hero Content */}
        <div className="relative z-20 text-center px-6 max-w-4xl flex flex-col items-center">
          <span className="text-xs md:text-sm tracking-[0.4em] uppercase text-luxury-gold mb-6 font-sans">
            Earls Group Sri Lanka
          </span>
          <h1 className="font-serif text-5xl md:text-8xl text-luxury-ivory tracking-wide leading-tight mb-8">
            Discover the Art of <span className="text-gold-gradient italic">Luxury</span>
          </h1>
          <p className="text-sm md:text-base tracking-[0.2em] uppercase font-light text-luxury-silver max-w-2xl mb-12 leading-relaxed">
            Five Exceptional Destinations.<br />One Unforgettable Experience.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <Link href="/hotels" className="btn-gold px-10 py-4 w-56 text-center text-xs tracking-[0.2em] font-sans">
              Explore Hotels
            </Link>
            <Link href="/hotels" className="btn-outline-gold px-10 py-4 w-56 text-center text-xs tracking-[0.2em] font-sans">
              Book Your Stay
            </Link>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center space-y-2">
          <span className="text-[0.65rem] tracking-[0.3em] uppercase text-luxury-silver/80">
            Scroll To Discover
          </span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-luxury-gold to-transparent animate-pulse" />
        </div>
      </section>

      {/* Client-side animations wrapper */}
      <HomeClientEffects>
        {/* Full-bleed Brand Showcase Video */}
        <section className="relative w-full h-[60vh] md:h-[85vh] overflow-hidden bg-luxury-black border-b border-luxury-gold/5">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          >
            <source
              src="https://res.cloudinary.com/dnj5bft7g/video/upload/v1785816402/12834077_3840_2160_24fps_pjaxtq.mp4"
              type="video/mp4"
            />
          </video>
          {/* Subtle top and bottom overlays to blend with neighboring sections */}
          <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-luxury-black to-transparent pointer-events-none z-10" />
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-luxury-black to-transparent pointer-events-none z-10" />
        </section>

        {/* 2. Luxury Introduction */}
        <section id="introduction" className="py-28 px-6 bg-luxury-charcoal border-y border-luxury-gold/5">
          <div className="max-w-4xl mx-auto text-center">
            <span className="text-xs tracking-[0.3em] uppercase text-luxury-gold mb-8 block">
              Bespoke Hospitality
            </span>
            <h2 className="font-serif text-3xl md:text-5xl text-luxury-ivory leading-relaxed font-light mb-8 italic">
              &ldquo;Where Sri Lanka&apos;s natural soul converges with five-star timeless elegance.&rdquo;
            </h2>
            <p className="text-base md:text-lg text-luxury-ivory/60 font-light leading-relaxed max-w-2xl mx-auto">
              Earls Group is Sri Lanka&apos;s premier collection of five-star luxury hotels. We offer exceptional hospitality, breathtaking coastal and highland destinations, world-class dining, elegant wedding sanctuaries, infinity pools, and holistic wellness spas.
            </p>
          </div>
        </section>

        {/* 3. Featured Hotels Section */}
        <section id="hotels" className="py-32 px-4 md:px-6 max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-6">
            <div>
              <span className="text-xs tracking-[0.3em] uppercase text-luxury-gold mb-3 block">
                The Collection
              </span>
              <h3 className="font-serif text-4xl md:text-6xl text-luxury-ivory">
                Featured Destinations
              </h3>
            </div>
            <Link
              href="/hotels"
              className="text-xs tracking-widest uppercase text-luxury-gold hover:text-luxury-ivory transition-colors font-medium flex items-center space-x-2"
            >
              <span>View All Destinations</span>
              <span>&rarr;</span>
            </Link>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-10">
            {featuredHotels.slice(0, 3).map((hotel: any) => (
              <div
                key={hotel.slug}
                className="group reveal-container border border-luxury-gold/10 bg-luxury-charcoal/30 flex flex-col justify-between"
              >
                {/* Image */}
                <div className="relative h-48 md:h-72 lg:h-96 overflow-hidden">
                  <Image
                    src={hotel.images[0]}
                    alt={hotel.name}
                    fill
                    sizes="(max-width: 768px) 50vw, 33vw"
                    className="object-cover reveal-image filter brightness-95 group-hover:brightness-100"
                  />
                  <div className="absolute top-3 left-3 md:top-4 md:left-4 z-10 glass-panel-light px-2 py-1 md:px-3 md:py-1.5 text-[0.55rem] md:text-[0.65rem] tracking-widest text-luxury-gold uppercase">
                    {hotel.location}
                  </div>
                  <div className="absolute top-3 right-3 md:top-4 md:right-4 z-10 flex items-center space-x-1 bg-black/40 px-2 py-0.5 md:px-2.5 md:py-1 text-[0.6rem] md:text-xs">
                    <Star size={10} className="text-luxury-gold fill-luxury-gold" />
                    <span className="text-luxury-ivory font-medium">5.0</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4 md:p-6 flex-grow flex flex-col justify-between gap-4">
                  <h4 className="font-serif text-base md:text-xl lg:text-2xl text-luxury-ivory group-hover:text-luxury-gold transition-colors duration-300 line-clamp-1">
                    {hotel.name}
                  </h4>
                  <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 pt-3 border-t border-luxury-gold/5">
                    <Link
                      href={`/hotels/${hotel.slug}`}
                      className="btn-outline-gold flex-1 py-2 md:py-3 text-center text-[0.6rem] md:text-[0.7rem]"
                    >
                      Explore Hotel
                    </Link>
                    <Link
                      href={`/hotels/${hotel.slug}`}
                      className="btn-gold flex-1 py-2 md:py-3 text-center text-[0.6rem] md:text-[0.7rem]"
                    >
                      Book Now
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 4. Luxury Experiences */}
        <section id="experiences" className="py-32 px-6 bg-luxury-charcoal border-y border-luxury-gold/5">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-2xl mx-auto mb-24">
              <span className="text-xs tracking-[0.3em] uppercase text-luxury-gold mb-3 block">
                Indulgences
              </span>
              <h3 className="font-serif text-4xl md:text-6xl text-luxury-ivory mb-6">
                Curated Experiences
              </h3>
              <p className="text-sm text-luxury-ivory/55 font-light leading-relaxed">
                From sunset vows on beachfronts to traditional Ayurveda rituals under canopies, we craft moments of deep connection and visual wonder.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {experiences.map((exp) => {
                const Icon = exp.icon;
                return (
                  <div
                    key={exp.title}
                    className="group relative h-[450px] overflow-hidden flex flex-col justify-end p-8 border border-luxury-gold/10"
                  >
                    <Image
                      src={exp.img}
                      alt={exp.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 25vw"
                      className="object-cover group-hover:scale-110 filter brightness-95 contrast-95 group-hover:brightness-90 transition-all duration-[1.2s] ease-out z-0"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-luxury-black/95 via-luxury-black/50 to-transparent z-10 pointer-events-none" />
                    <div className="relative z-20 flex flex-col space-y-4">
                      <div className="w-12 h-12 rounded-full border border-luxury-gold/40 flex items-center justify-center text-luxury-gold bg-luxury-black/30 group-hover:bg-luxury-gold group-hover:text-luxury-black transition-all duration-500">
                        <Icon size={20} />
                      </div>
                      <h4 className="font-serif text-2xl text-luxury-ivory group-hover:text-luxury-gold transition-colors duration-300">
                        {exp.title}
                      </h4>
                      <p className="text-xs text-luxury-ivory/60 leading-relaxed font-light opacity-0 group-hover:opacity-100 transition-opacity duration-500 max-h-0 group-hover:max-h-20 overflow-hidden">
                        {exp.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* 5. Awards Section */}
        <section id="awards" className="py-24 px-6 max-w-7xl mx-auto text-center border-b border-luxury-gold/10">
          <span className="text-xs tracking-[0.3em] uppercase text-luxury-gold mb-16 block">
            Accolades & Prestige
          </span>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 items-center justify-center">
            {awards.map((award) => (
              <div
                key={award.title}
                className="flex flex-col items-center p-6 border border-luxury-gold/5 hover:border-luxury-gold/20 hover:bg-luxury-charcoal/10 transition-all duration-300"
              >
                <Award className="text-luxury-gold mb-4 animate-float" size={32} />
                <span className="font-serif text-lg md:text-xl text-luxury-ivory mb-1">
                  {award.title}
                </span>
                <span className="text-[0.65rem] text-luxury-ivory/50 uppercase tracking-wider">
                  {award.authority}
                </span>
                <span className="text-[0.6rem] text-luxury-gold font-light mt-2">
                  {award.year}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* 6. Testimonials Slider */}
        <section id="testimonials" className="py-32 px-6 bg-luxury-charcoal border-b border-luxury-gold/5">
          <div className="max-w-4xl mx-auto text-center">
            <span className="text-xs tracking-[0.3em] uppercase text-luxury-gold mb-16 block">
              Guest Impressions
            </span>
            <div className="grid grid-cols-1 gap-12">
              {testimonials.slice(0, 1).map((test: any) => (
                <div key={test.name} className="flex flex-col items-center">
                  <div className="relative w-20 h-20 rounded-full overflow-hidden border border-luxury-gold/30 p-1 mb-6">
                    <Image
                      src={test.avatar}
                      alt={test.name}
                      width={80}
                      height={80}
                      className="object-cover rounded-full"
                    />
                  </div>
                  <p className="font-serif text-xl md:text-3xl text-luxury-ivory italic leading-relaxed font-light max-w-3xl mb-8">
                    &ldquo;{test.content}&rdquo;
                  </p>
                  <h4 className="font-sans text-sm tracking-widest text-luxury-gold uppercase font-medium">
                    {test.name}
                  </h4>
                  <span className="text-[0.65rem] text-luxury-ivory/40 uppercase tracking-widest mt-1">
                    {test.role} &bull; {test.hotelName}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 7. Instagram masonry gallery */}
        <section id="instagram" className="py-32 px-6 max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-xs tracking-[0.3em] uppercase text-luxury-gold mb-3 block">
              Gallery
            </span>
            <h3 className="font-serif text-4xl text-luxury-ivory">
              Stories from Earls
            </h3>
            <span className="text-xs text-luxury-gold/60 uppercase tracking-widest mt-2 block">
              @EarlsGroupResorts
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {instagramPosts.map((post, idx) => (
              <div
                key={idx}
                className="group relative h-60 overflow-hidden border border-luxury-gold/10"
              >
                <Image
                  src={post}
                  alt="Instagram capture"
                  fill
                  sizes="(max-width: 768px) 50vw, 16vw"
                  className="object-cover group-hover:scale-110 filter brightness-75 group-hover:brightness-95 transition-all duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all duration-300">
                  <span className="text-xs text-luxury-gold tracking-widest uppercase">
                    View Post
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </HomeClientEffects>
    </div>
  );
}
