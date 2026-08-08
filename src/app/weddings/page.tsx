import Image from "next/image";
import { getWeddings } from "@/lib/data";
import WeddingForm from "@/components/WeddingForm";
import { getOptimizedVideoUrl } from "@/lib/cloudinary";

export const metadata = {
  title: "Weddings & Celebrations | Earls Group Sri Lanka",
  description: "Exquisite five-star wedding venues, ocean pavilions, and colonial halls across Sri Lanka.",
};

export default async function WeddingsPage() {
  const venues = await getWeddings();

  return (
    <div className="relative min-h-screen bg-luxury-black">
      {/* Hero */}
      <section className="relative h-[70vh] md:h-[80vh] w-full flex items-end justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1920&q=80"
            alt="Weddings & Celebrations"
            fill
            priority
            className="object-cover filter brightness-[0.98]"
          />
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover filter brightness-[0.98]"
          >
            <source
              src={getOptimizedVideoUrl("https://res.cloudinary.com/dnj5bft7g/video/upload/v1785898558/12279936_1920_1080_25fps_cpzdg7.mp4")}
              type="video/mp4"
            />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-luxury-black z-10" />
        </div>
        <div className="relative z-20 max-w-4xl mx-auto text-center px-6 pb-16">
          <span className="text-xs tracking-[0.4em] uppercase text-luxury-gold mb-4 block">
            Love &amp; Prestige
          </span>
          <h1 className="font-serif text-4xl md:text-7xl text-luxury-ivory tracking-wide">
            Celebrations of a Lifetime
          </h1>
        </div>
      </section>

      {/* Intro & Packages */}
      <section className="max-w-7xl mx-auto px-6 py-24 space-y-24">
        {/* Intro */}
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <p className="font-serif text-2xl md:text-3xl text-luxury-gold italic font-light leading-relaxed">
            &ldquo;Crafting timeless moments on golden shorelines and amidst misty peaks.&rdquo;
          </p>
          <p className="text-sm text-luxury-ivory/60 leading-relaxed font-light">
            Whether you envision a grand ballroom ceremony with hundreds of guests in the heart of Colombo, or a barefoot sunset vow renewal overlooking the Bentota sea—Earls Group provides the coordinates, catering, and luxury details to write your fairy tale.
          </p>
        </div>

        {/* Venues Grid */}
        <div className="space-y-16">
          {venues.map((venue: any, idx: number) => (
            <div
              key={venue.venueName}
              className={`flex flex-col lg:flex-row gap-12 items-center ${
                idx % 2 === 1 ? "lg:flex-row-reverse" : ""
              }`}
            >
              {/* Photo */}
              <div className="relative w-full lg:w-1/2 h-96 overflow-hidden border border-luxury-gold/15">
                <Image
                  src={venue.images[0]}
                  alt={venue.venueName}
                  fill
                  className="object-cover filter brightness-95 hover:scale-105 transition-transform duration-[1.5s]"
                />
              </div>

              {/* Specs */}
              <div className="w-full lg:w-1/2 space-y-6">
                <span className="text-xs tracking-widest text-luxury-gold uppercase font-semibold">
                  Exclusive Venue
                </span>
                <h3 className="font-serif text-3xl md:text-4xl text-luxury-ivory">
                  {venue.venueName}
                </h3>
                <div className="flex gap-6 text-xs text-luxury-ivory/50 uppercase tracking-wider">
                  <span>Capacity: {venue.capacity}</span>
                </div>
                <p className="text-sm text-luxury-ivory/60 leading-relaxed font-light">
                  {venue.description}
                </p>

                {/* Inclusions */}
                <div className="space-y-3">
                  <span className="block text-xs uppercase tracking-widest text-luxury-gold/75">
                    Package Inclusions
                  </span>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 text-xs text-luxury-ivory/65">
                    {venue.inclusions.map((incl: string) => (
                      <div key={incl} className="flex items-center space-x-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-luxury-gold" />
                        <span>{incl}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Inquiry Form */}
        <div className="max-w-3xl mx-auto pt-16">
          <div className="border border-luxury-gold/15 p-8 md:p-12 glass-panel space-y-8">
            <div className="text-center">
              <h3 className="font-serif text-3xl text-luxury-ivory">Wedding &amp; Event Inquiries</h3>
              <p className="text-xs text-luxury-gold tracking-widest uppercase mt-2">
                Begin planning your custom celebration
              </p>
            </div>
            <WeddingForm venues={venues} />
          </div>
        </div>
      </section>
    </div>
  );
}
