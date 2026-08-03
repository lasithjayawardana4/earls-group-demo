import { notFound } from "next/navigation";
import { getHotelBySlug, getRoomBySlug } from "@/lib/data";
import RoomDetailCoordinator from "@/components/RoomDetailCoordinator";
import { Suspense } from "react";

interface Props {
  params: Promise<{ slug: string; roomSlug: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { slug, roomSlug } = await params;
  const room = await getRoomBySlug(slug, roomSlug);
  if (!room) return {};

  return {
    title: `${room.name} | ${room.hotel.name} | Earls Group`,
    description: room.description,
  };
}

export default async function RoomDetailPage({ params }: Props) {
  const { slug, roomSlug } = await params;
  const room = await getRoomBySlug(slug, roomSlug);

  if (!room) {
    notFound();
  }

  const hotel = room.hotel;

  return (
    <div className="relative min-h-screen bg-luxury-black pb-24 pt-28">
      <div className="max-w-7xl mx-auto px-6">
        <Suspense fallback={<div className="text-luxury-gold text-center py-24 uppercase tracking-widest text-xs">Loading Quarters Details...</div>}>
          <RoomDetailCoordinator hotel={hotel} room={room} />
        </Suspense>
      </div>
    </div>
  );
}
