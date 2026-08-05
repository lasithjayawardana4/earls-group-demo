import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Booking from "@/models/Booking";
import Hotel from "@/models/Hotel";
import Room from "@/models/Room";

// Simple local in-memory database of mock bookings for demo fallback
const mockBookingsDb: Record<string, any> = {};

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      guestName,
      email,
      phone,
      hotelId,
      roomId,
      adults,
      children,
      checkIn,
      checkOut,
      price,
      specialRequests,
      promoCode,
      visitorType,
    } = body;

    // Validate dates
    if (!checkIn || !checkOut) {
      return NextResponse.json({ success: false, error: "Missing check-in or check-out date" }, { status: 400 });
    }

    try {
      await dbConnect();
      
      const newBooking = await Booking.create({
        guestName,
        email,
        phone,
        hotel: hotelId,
        room: roomId,
        adults,
        children,
        checkIn: new Date(checkIn),
        checkOut: new Date(checkOut),
        price,
        specialRequests,
        promoCode,
        visitorType: visitorType || "local",
        bookingStatus: "Confirmed",
      });

      return NextResponse.json({
        success: true,
        booking: newBooking,
        message: "Booking saved in MongoDB",
      });
    } catch (dbErr) {
      console.warn("MongoDB write failed, creating mock booking in-memory fallback.");
      
      // Fallback: create in-memory mock booking
      const mockId = `mock_bk_${Math.random().toString(36).substring(2, 10)}`;
      const mockBooking = {
        _id: mockId,
        guestName,
        email,
        phone,
        hotel: hotelId,
        room: roomId,
        adults,
        children,
        checkIn: new Date(checkIn),
        checkOut: new Date(checkOut),
        price,
        specialRequests,
        promoCode,
        visitorType: visitorType || "local",
        bookingStatus: "Confirmed",
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      
      mockBookingsDb[mockId] = mockBooking;
      
      return NextResponse.json({
        success: true,
        booking: mockBooking,
        message: "Booking created in temporary mock memory",
      });
    }
  } catch (error: any) {
    console.error("Booking API error:", error);
    return NextResponse.json({ success: false, error: error.message || "An error occurred" }, { status: 500 });
  }
}

// Retrieve a booking (used by confirmation page route)
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ success: false, error: "Missing booking ID" }, { status: 400 });
    }

    try {
      await dbConnect();
      const booking = await Booking.findById(id).populate("hotel").populate("room").lean();
      if (booking) {
        return NextResponse.json({ success: true, booking });
      }
    } catch (dbErr) {
      console.warn("MongoDB read failed for booking, searching mock memory.");
    }

    // Check mock DB
    const mockB = mockBookingsDb[id];
    if (mockB) {
      return NextResponse.json({ success: true, booking: mockB });
    }

    return NextResponse.json({ success: false, error: "Booking not found" }, { status: 404 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message || "An error occurred" }, { status: 500 });
  }
}
