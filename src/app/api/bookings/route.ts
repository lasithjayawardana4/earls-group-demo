import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Booking from "@/models/Booking";
import Hotel from "@/models/Hotel";
import Room from "@/models/Room";
import { MOCK_HOTELS, MOCK_ROOMS } from "@/lib/mockData";

// Simple local in-memory database of mock bookings for demo fallback
const mockBookingsDb: Record<string, any> = {};

async function syncBookingToDashboard(bookingData: {
  hotelId: string;
  roomId: string;
  checkIn: string | Date;
  checkOut: string | Date;
  adults: number;
  children: number;
  price: number;
  specialRequests?: string;
  guestName: string;
  email?: string;
  phone: string;
  visitorType?: "local" | "international";
}) {
  try {
    // 1. Resolve hotel details
    let hotelSlug = "";
    try {
      await dbConnect();
      const hotelObj = await Hotel.findById(bookingData.hotelId);
      if (hotelObj) {
        hotelSlug = hotelObj.slug;
      }
    } catch (e) {
      console.warn("MongoDB hotel resolution failed, trying mock fallback");
    }

    if (!hotelSlug) {
      const mockHotel = MOCK_HOTELS.find((h) => h._id === bookingData.hotelId);
      if (mockHotel) {
        hotelSlug = mockHotel.slug;
      }
    }

    // 2. Resolve room details
    let roomSlug = "";
    try {
      const roomObj = await Room.findById(bookingData.roomId);
      if (roomObj) {
        roomSlug = roomObj.slug;
      }
    } catch (e) {
      console.warn("MongoDB room resolution failed, trying mock fallback");
    }

    if (!roomSlug) {
      const mockRoom = MOCK_ROOMS.find((r) => r._id === bookingData.roomId);
      if (mockRoom) {
        roomSlug = mockRoom.slug;
      }
    }

    // 3. Map Codes
    // Always "regent" for Earl's Regent Hotel
    const hotelCode = hotelSlug && hotelSlug.includes("regent") ? "regent" : "regent";

    // roomTypeCode: Must map to: "DELUXE", "PREMIER", "EXECUTIVE_SUITE", or "PRESIDENTIAL_VILLA"
    let roomTypeCode = "DELUXE";
    if (roomSlug === "deluxe-room") {
      roomTypeCode = "DELUXE";
    } else if (roomSlug === "premier-room") {
      roomTypeCode = "PREMIER";
    } else if (roomSlug === "executive-suite") {
      roomTypeCode = "EXECUTIVE_SUITE";
    } else if (roomSlug === "presidential-villa") {
      roomTypeCode = "PRESIDENTIAL_VILLA";
    }

    // Format dates
    const checkInStr = new Date(bookingData.checkIn).toISOString().split("T")[0];
    const checkOutStr = new Date(bookingData.checkOut).toISOString().split("T")[0];

    const dashboardApiUrl = process.env.CENTRAL_DASHBOARD_API_URL || "http://localhost:3000/api/public/bookings";
    const bearerToken = "earls_website_secure_token_2026";

    const payload = {
      hotelCode,
      roomTypeCode,
      checkIn: checkInStr,
      checkOut: checkOutStr,
      adults: bookingData.adults || 2,
      children: bookingData.children || 0,
      rooms: 1,
      totalAmount: bookingData.price,
      currency: "USD",
      specialRequests: bookingData.specialRequests || "",
      guest: {
        name: bookingData.guestName,
        email: bookingData.email || "anonymous@earlshotels.com",
        phone: bookingData.phone || "+94-77-1234567",
        country: bookingData.visitorType === "international" ? "International" : "Sri Lanka",
      },
    };

    console.log("Sending booking synchronization to Central Reservation Dashboard:", payload);

    const response = await fetch(dashboardApiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${bearerToken}`,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Dashboard API returned status ${response.status}: ${errorText}`);
    }

    const data = await response.json();
    console.log("Central Reservation Dashboard sync success:", data);
    return data.reservationNumber;
  } catch (error) {
    console.error("Failed to sync booking to dashboard:", error);
    return null;
  }
}

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

    // Server-Side Availability Check before checkout
    try {
      const checkInStr = new Date(checkIn).toISOString().split("T")[0];
      const checkOutStr = new Date(checkOut).toISOString().split("T")[0];
      const dashboardUrl = process.env.CENTRAL_DASHBOARD_API_URL || "http://localhost:3000/api/public/bookings";
      const availabilityUrl = dashboardUrl.replace("/bookings", "/availability");

      const availRes = await fetch(`${availabilityUrl}?checkIn=${checkInStr}&checkOut=${checkOutStr}`);
      if (availRes.ok) {
        const availData = await availRes.json();
        
        // Resolve roomTypeCode for requested room
        let roomSlug = "";
        try {
          const roomObj = await Room.findById(roomId);
          if (roomObj) roomSlug = roomObj.slug;
        } catch (e) {}
        if (!roomSlug) {
          const mockRoom = MOCK_ROOMS.find((r) => r._id === roomId);
          if (mockRoom) roomSlug = mockRoom.slug;
        }

        let roomTypeCode = "DELUXE";
        if (roomSlug === "deluxe-room") {
          roomTypeCode = "DELUXE";
        } else if (roomSlug === "premier-room") {
          roomTypeCode = "PREMIER";
        } else if (roomSlug === "executive-suite") {
          roomTypeCode = "EXECUTIVE_SUITE";
        } else if (roomSlug === "presidential-villa") {
          roomTypeCode = "PRESIDENTIAL_VILLA";
        }

        const roomAvail = availData.rooms?.find((r: any) => r.roomTypeCode === roomTypeCode);
        if (roomAvail && (!roomAvail.isAvailable || roomAvail.available <= 0)) {
          return NextResponse.json({
            success: false,
            error: `The selected quarters (${roomAvail.roomTypeName}) is fully booked for the selected dates. Please choose another quarters or date range.`
          }, { status: 400 });
        }
      }
    } catch (availErr) {
      console.warn("Failed to perform server-side availability check, continuing as fallback:", availErr);
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

      // Directly after saving, trigger sync to Central Dashboard
      const reservationNumber = await syncBookingToDashboard(body);
      if (reservationNumber) {
        newBooking.reservationNumber = reservationNumber;
        await newBooking.save();
      }

      return NextResponse.json({
        success: true,
        booking: newBooking,
        message: "Booking saved in MongoDB",
      });
    } catch (dbErr) {
      console.warn("MongoDB write failed, creating mock booking in-memory fallback.");
      
      // Fallback: create in-memory mock booking
      const mockId = `mock_bk_${Math.random().toString(36).substring(2, 10)}`;
      const mockBooking: any = {
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
      
      // Directly after saving, trigger sync to Central Dashboard
      const reservationNumber = await syncBookingToDashboard(body);
      if (reservationNumber) {
        mockBooking.reservationNumber = reservationNumber;
      }

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
