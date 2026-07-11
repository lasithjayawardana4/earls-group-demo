import { notFound } from "next/navigation";
import { getHotelBySlug, getRoomsForHotel, getHotels } from "@/lib/data";
import HotelDetailCoordinator from "@/components/HotelDetailCoordinator";
import Image from "next/image";
import { Star, MapPin } from "lucide-react";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const hotel = await getHotelBySlug(slug);
  if (!hotel) return {};

  return {
    title: `${hotel.name} | Earls Group Sri Lanka`,
    description: hotel.description,
  };
}

export default async function HotelDetailPage({ params }: Props) {
  const { slug } = await params;
  const hotel = await getHotelBySlug(slug);

  if (!hotel) {
    notFound();
  }

  const rooms = await getRoomsForHotel(hotel._id);
  const allHotels = await getHotels();
  const relatedHotels = allHotels.filter((h: any) => h.slug !== slug).slice(0, 2);

  return (
    <div className="relative min-h-screen bg-luxury-black pb-24">
      {/* Immersive Hero */}
      <section className="relative h-[80vh] w-full flex items-end justify-start overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src={hotel.images[0]}
            alt={hotel.name}
            fill
            priority
            className="object-cover filter brightness-95 contrast-95"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-luxury-black/50 to-luxury-black z-10" />
        </div>

        <div className="relative z-20 max-w-7xl mx-auto px-6 pb-16 w-full">
          <div className="flex items-center space-x-2 mb-4">
            <span className="text-xs tracking-[0.3em] uppercase text-luxury-gold">
              Five-Star Sanctuary
            </span>
            <span className="text-luxury-gold/50">•</span>
            <div className="flex items-center space-x-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={12} className="text-luxury-gold fill-luxury-gold" />
              ))}
            </div>
          </div>

          <h1 className="font-serif text-4xl md:text-7xl text-luxury-ivory mb-6 tracking-wide max-w-4xl">
            {hotel.name}
          </h1>

          <div className="flex flex-wrap items-center gap-6 text-sm text-luxury-ivory/80 font-light">
            <div className="flex items-center space-x-2">
              <MapPin size={16} className="text-luxury-gold" />
              <span>{hotel.location}, Sri Lanka</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="max-w-7xl mx-auto px-6 pt-16">
        <HotelDetailCoordinator hotel={hotel} rooms={rooms} relatedHotels={relatedHotels} />
      </section>
    </div>
  );
}
