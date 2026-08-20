import Image from "next/image";
import { getSpaTreatments } from "@/lib/data";
import SpaBookingForm from "@/components/SpaBookingForm";
import SpaThemeEnforcer from "@/components/SpaThemeEnforcer";

export const metadata = {
  title: "Ayurveda & Spa | Earls Group Sri Lanka",
  description: "Restore your vital energies at our award-winning wellness centers offering custom Ayurvedic massages and organic therapies.",
};

export default async function SpaPage() {
  const treatments = await getSpaTreatments();

  return (
    <div className="relative min-h-screen bg-luxury-black">
      <SpaThemeEnforcer />
      {/* Hero */}
      <section className="relative h-[70vh] md:h-[80vh] w-full flex items-end justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover filter brightness-[0.98]"
          >
            <source
              src="https://res.cloudinary.com/dnj5bft7g/video/upload/v1785899838/6187898-uhd_3840_2160_25fps_1_ff5sli.mp4"
              type="video/mp4"
            />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-luxury-black z-10" />
        </div>
        <div className="relative z-20 max-w-4xl mx-auto text-center px-6 pb-16">
          <span className="text-xs tracking-[0.4em] uppercase text-luxury-gold mb-4 block">
            Wellness
          </span>
          <h1 className="font-serif text-4xl md:text-7xl text-luxury-ivory tracking-wide">
            Sanctuary &amp; Spa
          </h1>
        </div>
      </section>

      {/* Intro & Showcase */}
      <section className="max-w-7xl mx-auto px-6 py-24 space-y-28">
        {/* Intro */}
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <p className="font-serif text-2xl md:text-3xl text-luxury-gold italic font-light leading-relaxed">
            &ldquo;Timeless holistic healing and modern botanical luxury.&rdquo;
          </p>
          <p className="text-sm text-luxury-ivory/60 leading-relaxed font-light">
            Step into a peaceful realm where the rush of the world dissolves. Our five-star spa centers offer immersive wellness programs, coupling native Sri Lankan Ayurvedic herbs, steam oils, and organic scrubs with classical body massage techniques. Enjoy floating spa pavilions and professional couple therapies.
          </p>
        </div>

        {/* Treatments Showcase */}
        <div className="space-y-12">
          <div className="border-b border-luxury-gold/15 pb-4">
            <h3 className="font-serif text-3xl text-luxury-ivory">Therapeutic Rituals</h3>
            <p className="text-xs text-luxury-gold tracking-widest uppercase mt-1">
              Select your customized healing experience
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {treatments.map((treatment: any) => (
              <div
                key={treatment.name}
                className="group border border-luxury-gold/10 bg-luxury-charcoal/20 flex flex-col justify-between overflow-hidden"
              >
                {/* Photo */}
                <div className="relative h-60 overflow-hidden">
                  <Image
                    src={treatment.images?.[0] || "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=600&q=80"}
                    alt={treatment.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-[1.2s] filter brightness-95"
                  />
                  <div className="absolute top-4 left-4 z-10 glass-panel-light px-3 py-1 text-[0.6rem] tracking-widest text-luxury-gold uppercase">
                    {treatment.category}
                  </div>
                </div>

                {/* Specs */}
                <div className="p-6 flex-grow flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="flex justify-between items-start gap-4">
                      <h4 className="font-serif text-xl text-luxury-ivory group-hover:text-luxury-gold transition-colors duration-300">
                        {treatment.name}
                      </h4>
                    </div>
                    <p className="text-xs text-luxury-ivory/60 font-light leading-relaxed">
                      {treatment.description}
                    </p>
                    <div className="text-[0.65rem] tracking-wider text-luxury-ivory/40 uppercase">
                      Duration: {treatment.duration}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Spa Booking Form */}
        <div className="max-w-3xl mx-auto pt-16">
          <div className="border border-luxury-gold/15 p-8 md:p-12 glass-panel space-y-8">
            <div className="text-center">
              <h3 className="font-serif text-3xl text-luxury-ivory">Spa Reservations</h3>
              <p className="text-xs text-luxury-gold tracking-widest uppercase mt-2">
                Begin your physical and mental rejuvenation
              </p>
            </div>
            <SpaBookingForm treatments={treatments} />
          </div>
        </div>
      </section>
    </div>
  );
}
