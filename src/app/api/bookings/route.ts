import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Hotel from "@/models/Hotel";
import Room from "@/models/Room";
import { MOCK_HOTELS, MOCK_ROOMS } from "@/lib/mockData";

// Simple local in-memory database of bookings for demo fallback & confirmation retrieval
const mockBookingsDb: Record<string, any> = {};

const pushBookingToDashboard = async (bookingDetails: {
  hotelCode?: string;
  roomType: string;
  checkInDate: string;
  checkOutDate: string;
  adultsCount: number;
  childrenCount: number;
  totalPrice: number;
  customerNotes?: string;
  customerName: string;
  customerEmail?: string;
  customerPhone?: string;
  customerCountry?: string;
}) => {
  const dashboardUrl = process.env.CENTRAL_DASHBOARD_API_URL || "https://booking-system-jet-kappa.vercel.app/api/public/bookings";

  const payload = {
    hotelCode: bookingDetails.hotelCode || "regent", // Always "regent" for Earl's Regent Hotel
    roomTypeCode: bookingDetails.roomType, // E.g., "DELUXE", "EXECUTIVE_SUITE", "PREMIER", or "PRESIDENTIAL_VILLA"
    checkIn: bookingDetails.checkInDate, // Format: "YYYY-MM-DD"
    checkOut: bookingDetails.checkOutDate, // Format: "YYYY-MM-DD"
    adults: bookingDetails.adultsCount || 2,
    children: bookingDetails.childrenCount || 0,
    rooms: 1,
    totalAmount: bookingDetails.totalPrice, // Number value (e.g., 220)
    currency: "USD",
    specialRequests: bookingDetails.customerNotes || "",
    guest: {
      name: bookingDetails.customerName,
      email: bookingDetails.customerEmail || "anonymous@earlshotels.com",
      phone: bookingDetails.customerPhone || "",
      country: bookingDetails.customerCountry || "Sri Lanka",
    },
  };

  const apiKey = process.env.CENTRAL_DASHBOARD_API_KEY || "earls_website_secure_token_2026";

  try {
    const response = await fetch(dashboardUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
      },
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      const data = await response.json();
      console.log("Dashboard sync success! Reference:", data.reservationNumber);
      return data;
    } else {
      console.error("Dashboard refused sync:", await response.text());
      return null;
    }
  } catch (err) {
    console.error("Failed to connect to dashboard API:", err);
    return null;
  }
};

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

    const checkInStr = new Date(checkIn).toISOString().split("T")[0];
    const checkOutStr = new Date(checkOut).toISOString().split("T")[0];

    // Resolve room details and slug
    let roomSlug = "";
    let roomName = "Selected Room";
    try {
      await dbConnect();
      const roomObj = await Room.findById(roomId);
      if (roomObj) {
        roomSlug = roomObj.slug;
        roomName = roomObj.name;
      }
    } catch (e) {}

    if (!roomSlug) {
      const mockRoom = MOCK_ROOMS.find((r) => r._id === roomId);
      if (mockRoom) {
        roomSlug = mockRoom.slug;
        roomName = mockRoom.name;
      }
    }

    // Resolve hotel details and slug
    let hotelSlug = "";
    let hotelName = "Earl's Regent Hotel";
    let hotelLocation = "Kandy, Sri Lanka";
    try {
      const hotelObj = await Hotel.findById(hotelId);
      if (hotelObj) {
        hotelSlug = hotelObj.slug;
        hotelName = hotelObj.name;
        hotelLocation = hotelObj.location;
      }
    } catch (e) {}

    if (!hotelSlug) {
      const mockHotel = MOCK_HOTELS.find((h) => h._id === hotelId);
      if (mockHotel) {
        hotelSlug = mockHotel.slug;
        hotelName = mockHotel.name;
        hotelLocation = mockHotel.location;
      }
    }

    // Map room slug to official roomTypeCode
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

    // Server-Side Availability Check before checkout
    try {
      const dashboardUrl = process.env.CENTRAL_DASHBOARD_API_URL || "https://booking-system-jet-kappa.vercel.app/api/public/bookings";
      const availabilityUrl = dashboardUrl.replace("/bookings", "/availability");

      const availRes = await fetch(`${availabilityUrl}?checkIn=${checkInStr}&checkOut=${checkOutStr}`);
      if (availRes.ok) {
        const availData = await availRes.json();
        const roomAvail = availData.rooms?.find((r: any) => r.roomTypeCode === roomTypeCode);
        if (roomAvail && (!roomAvail.isAvailable || roomAvail.available <= 0)) {
          return NextResponse.json({
            success: false,
            error: `The selected quarters (${roomAvail.roomTypeName || roomName}) is fully booked for the selected dates. Please choose another quarters or date range.`
          }, { status: 400 });
        }
      }
    } catch (availErr) {
      console.warn("Failed to perform server-side availability check, continuing:", availErr);
    }

    // Replace direct MongoDB write with Dashboard API Call
    const dashboardResult = await pushBookingToDashboard({
      hotelCode: "regent",
      roomType: roomTypeCode,
      checkInDate: checkInStr,
      checkOutDate: checkOutStr,
      adultsCount: adults || 2,
      childrenCount: children || 0,
      totalPrice: price,
      customerNotes: specialRequests || "",
      customerName: guestName,
      customerEmail: email,
      customerPhone: phone || "",
      customerCountry: visitorType === "international" ? "International" : "Sri Lanka",
    });

    if (!dashboardResult || !dashboardResult.reservationNumber) {
      return NextResponse.json({
        success: false,
        error: "Failed to create reservation on Central Dashboard. Please try again.",
      }, { status: 500 });
    }

    const reservationNumber = dashboardResult.reservationNumber;
    const reservationId = dashboardResult.reservationId || reservationNumber;

    // Construct the booking record for client presentation
    const bookingObj = {
      _id: reservationNumber,
      reservationNumber,
      reservationId,
      guestName,
      email,
      phone,
      hotel: {
        _id: hotelId,
        name: hotelName,
        location: hotelLocation,
      },
      room: {
        _id: roomId,
        name: roomName,
      },
      adults: adults || 2,
      children: children || 0,
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

    // Store in memory for confirmation page receipt retrieval
    mockBookingsDb[reservationNumber] = bookingObj;
    mockBookingsDb[reservationId] = bookingObj;

    return NextResponse.json({
      success: true,
      booking: bookingObj,
      reservationNumber,
      message: "Direct Booking created successfully via Central Dashboard",
    });
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

    // Check memory cache
    const cachedBooking = mockBookingsDb[id];
    if (cachedBooking) {
      return NextResponse.json({ success: true, booking: cachedBooking });
    }

    return NextResponse.json({ success: false, error: "Booking not found" }, { status: 404 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message || "An error occurred" }, { status: 500 });
  }
}
