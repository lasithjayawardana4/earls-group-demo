import { getHotels } from "@/lib/data";
import HotelsListClient from "@/components/HotelsListClient";

export const metadata = {
  title: "Destinations | Earls Group Ultra Luxury Collection",
  description: "Browse the five-star luxury resorts and hotels of Earls Group across Sri Lanka.",
};

export default async function HotelsPage() {
  const hotels = await getHotels();

  return (
    <div className="relative min-h-screen bg-luxury-black pt-28 pb-24">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        {/* Client-side search & filter container */}
        <HotelsListClient initialHotels={hotels} />
      </div>
    </div>
  );
}
