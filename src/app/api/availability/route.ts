import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const checkIn = searchParams.get("checkIn");
    const checkOut = searchParams.get("checkOut");

    if (!checkIn || !checkOut) {
      return NextResponse.json({ error: "Missing checkIn or checkOut parameters" }, { status: 400 });
    }

    const dashboardUrl = process.env.CENTRAL_DASHBOARD_API_URL || "https://booking-system-jet-kappa.vercel.app/api/public/bookings";
    // Construct the availability URL from the bookings URL
    const availabilityUrl = dashboardUrl.replace("/bookings", "/availability");

    console.log(`Proxying availability request to dashboard: ${availabilityUrl}?checkIn=${checkIn}&checkOut=${checkOut}`);

    const apiKey = process.env.CENTRAL_DASHBOARD_API_KEY || "earls_website_secure_token_2026";

    const response = await fetch(`${availabilityUrl}?checkIn=${checkIn}&checkOut=${checkOut}`, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
      },
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      return NextResponse.json({ error: `Dashboard API error: ${errorText}` }, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error: any) {
    console.error("Availability proxy error:", error);
    return NextResponse.json({ error: error.message || "Failed to fetch availability" }, { status: 500 });
  }
}
