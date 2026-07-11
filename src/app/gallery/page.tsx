import { getGallery } from "@/lib/data";
import GalleryClient from "@/components/GalleryClient";

export const metadata = {
  title: "Media Gallery | Earls Group Sri Lanka",
  description: "Immerse yourself in the visual splendor of our five-star resorts, private lagoons, and heritage salons.",
};

export default async function GalleryPage() {
  const mediaItems = await getGallery();

  return (
    <div className="relative min-h-screen bg-luxury-black pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs tracking-[0.4em] uppercase text-luxury-gold mb-3 block">
            Visual Prestige
          </span>
          <h1 className="font-serif text-4xl md:text-7xl text-luxury-ivory mb-6">
            The Gallery
          </h1>
          <p className="text-sm md:text-base text-luxury-ivory/60 font-light leading-relaxed">
            Take a cinematic walk through our sanctuaries. Explore high-resolution captures of our suites, private beaches, gourmet tables, and 360 degree virtual spheres.
          </p>
        </div>

        {/* Client media gallery */}
        <GalleryClient initialItems={mediaItems} />
      </div>
    </div>
  );
}
