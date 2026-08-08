import Image from "next/image";
import { getRestaurants } from "@/lib/data";
import DiningReservationForm from "@/components/DiningReservationForm";
import { getOptimizedVideoUrl } from "@/lib/cloudinary";

export const metadata = {
  title: "Fine Dining | Earls Group Sri Lanka",
  description: "Experience Michelin-inspired cuisine, oceanfront seafood grills, and colonial organic dining.",
};

export default async function DiningPage() {
  const restaurants = await getRestaurants();

  return (
    <div className="relative min-h-screen bg-luxury-black">
      {/* Hero */}
      <section className="relative h-[70vh] md:h-[80vh] w-full flex items-end justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=1920&q=80"
            alt="Fine Dining"
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
              src={getOptimizedVideoUrl("https://res.cloudinary.com/dnj5bft7g/video/upload/v1785901114/8764783-uhd_3840_2160_25fps_1_uwhawk.mp4")}
              type="video/mp4"
            />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-luxury-black z-10" />
        </div>
        <div className="relative z-20 max-w-4xl mx-auto text-center px-6 pb-16">
          <span className="text-xs tracking-[0.4em] uppercase text-luxury-gold mb-4 block">
            Gastronomy
          </span>
          <h1 className="font-serif text-4xl md:text-7xl text-luxury-ivory tracking-wide">
            The Culinary Art
          </h1>
        </div>
      </section>

      {/* Intro & Showcase */}
      <section className="max-w-7xl mx-auto px-6 py-24 space-y-28">
        {/* Intro */}
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <p className="font-serif text-2xl md:text-3xl text-luxury-gold italic font-light leading-relaxed">
            &ldquo;Fusing local coastal harvest with international culinary excellence.&rdquo;
          </p>
          <p className="text-sm text-luxury-ivory/60 leading-relaxed font-light">
            Every dining room in the Earls Group collection possesses a unique spatial design and gastronomic perspective. From fusion fine dining in Colombo skyline to seafood flame grills on the Bentota sands, our master chefs curate menus utilizing organic produce, native spices, and fresh coastal catches.
          </p>
        </div>

        {/* Restaurant Showcase */}
        <div className="space-y-24">
          {restaurants.map((rest: any, idx: number) => (
            <div
              key={rest.name}
              className={`flex flex-col lg:flex-row gap-12 items-center ${
                idx % 2 === 1 ? "lg:flex-row-reverse" : ""
              }`}
            >
              {/* Photo */}
              <div className="relative w-full lg:w-1/2 h-96 overflow-hidden border border-luxury-gold/15">
                <Image
                  src={rest.images[0]}
                  alt={rest.name}
                  fill
                  className="object-cover filter brightness-95 hover:scale-105 transition-transform duration-[1.5s]"
                />
              </div>

              {/* Info */}
              <div className="w-full lg:w-1/2 space-y-6">
                <span className="text-xs tracking-widest text-luxury-gold uppercase font-semibold">
                  {rest.cuisine} &bull; {rest.openingHours}
                </span>
                <h3 className="font-serif text-3xl md:text-4xl text-luxury-ivory">
                  {rest.name}
                </h3>
                <p className="text-sm text-luxury-ivory/60 leading-relaxed font-light">
                  {rest.description}
                </p>

                {/* Chef Bio */}
                <div className="border-t border-luxury-gold/10 pt-6 flex items-start gap-4">
                  {rest.chefImage && (
                    <div className="relative w-16 h-16 rounded-full overflow-hidden flex-shrink-0 border border-luxury-gold/20">
                      <Image
                        src={rest.chefImage}
                        alt={rest.chefName}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div>
                    <span className="block text-xs uppercase tracking-widest text-luxury-gold mb-1">
                      {rest.chefName}
                    </span>
                    <p className="text-xs text-luxury-ivory/50 font-light leading-relaxed">
                      {rest.chefBio}
                    </p>
                  </div>
                </div>

                {/* Menu items */}
                <div className="pt-4 space-y-3">
                  <span className="block text-xs uppercase tracking-widest text-luxury-gold/75">
                    Signature Creations
                  </span>
                  <div className="space-y-3.5">
                    {rest.menu?.[0]?.items?.map((item: any) => (
                      <div key={item.name} className="flex justify-between items-start gap-4">
                        <div>
                          <span className="text-sm text-luxury-ivory font-serif">{item.name}</span>
                          <span className="block text-[0.7rem] text-luxury-ivory/40 font-light">
                            {item.description}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Table Reservation Widget */}
        <div className="max-w-3xl mx-auto pt-16">
          <div className="border border-luxury-gold/15 p-8 md:p-12 glass-panel space-y-8">
            <div className="text-center">
              <h3 className="font-serif text-3xl text-luxury-ivory">Table Reservations</h3>
              <p className="text-xs text-luxury-gold tracking-widest uppercase mt-2">
                Secure your dining seat at our restaurants
              </p>
            </div>
            <DiningReservationForm restaurants={restaurants} />
          </div>
        </div>
      </section>
    </div>
  );
}
