import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import mongoose from "mongoose";
import dbConnect from "@/lib/dbConnect";
import Booking from "@/models/Booking";
import Hotel from "@/models/Hotel";
import Room from "@/models/Room";
import AdminDashboardClient from "@/components/AdminDashboardClient";
import { getHotels } from "@/lib/data";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_token")?.value;

  if (!token) {
    redirect("/admin/login");
  }

  let dbBookings: any[] = [];
  let dbHotels: any[] = [];

  try {
    await dbConnect();
    // Fetch bookings from DB
    dbBookings = await Booking.find({})
      .populate("hotel")
      .populate("room")
      .sort({ createdAt: -1 })
      .lean();

    // If bookings collection is empty, read from shared reservations collection
    if (!dbBookings || dbBookings.length === 0) {
      const rawReservations = await mongoose.connection.db?.collection("reservations").find({}).sort({ createdAt: -1 }).toArray();
      if (rawReservations && rawReservations.length > 0) {
        dbBookings = rawReservations.map((r: any) => ({
          _id: r.reservationNumber || r._id.toString(),
          reservationNumber: r.reservationNumber,
          guestName: r.guest?.name || "Guest",
          email: r.guest?.email || "",
          phone: r.guest?.phone || "",
          hotel: { name: r.hotelCode === "regent" ? "Earl's Regent Kandy" : r.hotelCode, location: "Kandy" },
          room: { name: r.roomTypeCode || "Deluxe Room" },
          adults: r.adults || 2,
          children: r.children || 0,
          checkIn: r.checkIn,
          checkOut: r.checkOut,
          price: r.totalAmount || 0,
          specialRequests: r.specialRequests || "",
          bookingStatus: r.status === "CONFIRMED" ? "Confirmed" : r.status || "Confirmed",
          createdAt: r.createdAt || new Date(),
        }));
      }
    }
    
    dbHotels = await Hotel.find({}).lean();
    
    // Stringify ObjectIds
    dbBookings = JSON.parse(JSON.stringify(dbBookings));
    dbHotels = JSON.parse(JSON.stringify(dbHotels));
  } catch (err: any) {
    console.error("Admin Dashboard fetch error:", err?.message || err);
  }

  // Fetch hotels through getHotels as fallback
  if (dbHotels.length === 0) {
    dbHotels = await getHotels();
  }

  return (
    <div className="min-h-screen bg-luxury-black pt-32 pb-24 text-luxury-ivory">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-luxury-gold/15 pb-8 mb-12 gap-4">
          <div>
            <span className="text-[0.65rem] tracking-[0.4em] uppercase text-luxury-gold block mb-2">
              Management Portal
            </span>
            <h1 className="font-serif text-4xl md:text-5xl text-luxury-ivory">
              Grand Registry Dashboard
            </h1>
          </div>
          <form action="/api/admin/logout" method="POST">
            <button
              type="submit"
              className="btn-outline-gold px-6 py-2.5 text-xs font-sans tracking-widest"
            >
              LOGOUT SECURELY
            </button>
          </form>
        </div>

        {/* Dashboard Client Controller */}
        <AdminDashboardClient initialBookings={dbBookings} hotels={dbHotels} />
      </div>
    </div>
  );
}
