"use client";

import { useState } from "react";
import {
  TrendingUp,
  DollarSign,
  Calendar,
  Percent,
  CheckCircle,
  XCircle,
  AlertCircle,
  Eye,
  Trash2,
  Bell,
  Hotel as HotelIcon
} from "lucide-react";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from "recharts";

interface AdminDashboardClientProps {
  initialBookings: any[];
  hotels: any[];
}

export default function AdminDashboardClient({
  initialBookings,
  hotels,
}: AdminDashboardClientProps) {
  const [activeTab, setActiveTab] = useState("overview");

  // Mock bookings fallback if empty
  const [bookings, setBookings] = useState<any[]>(
    initialBookings.length > 0
      ? initialBookings
      : [
          {
            _id: "bk_mock_1",
            guestName: "Samantha Miller",
            email: "samantha@travelmag.com",
            phone: "+1 415 908 2311",
            hotel: { name: "Earls Ocean Paradise", location: "Bentota" },
            room: { name: "Executive Suite" },
            checkIn: "2026-07-12",
            checkOut: "2026-07-16",
            price: 1976,
            bookingStatus: "Confirmed",
            createdAt: "2026-07-08T19:30:00Z",
          },
          {
            _id: "bk_mock_2",
            guestName: "David Vance",
            email: "david.vance@vanceholdings.com",
            phone: "+44 20 7946 0912",
            hotel: { name: "Earls Grand Colombo", location: "Colombo" },
            room: { name: "Deluxe Room" },
            checkIn: "2026-07-15",
            checkOut: "2026-07-17",
            price: 640,
            bookingStatus: "Pending",
            createdAt: "2026-07-09T08:15:00Z",
          },
          {
            _id: "bk_mock_3",
            guestName: "Hideo Tanaka",
            email: "tanaka@osaka-tech.jp",
            phone: "+81 6 6208 2111",
            hotel: { name: "Earls Royal Kandy", location: "Kandy" },
            room: { name: "Presidential Villa" },
            checkIn: "2026-08-01",
            checkOut: "2026-08-05",
            price: 4960,
            bookingStatus: "Confirmed",
            createdAt: "2026-07-09T14:22:00Z",
          },
        ]
  );

  const [notifications, setNotifications] = useState([
    { id: 1, text: "New booking request for Presidential Villa in Kandy", time: "5 mins ago" },
    { id: 2, text: "Wedding hall inquiry submitted for Colombo", time: "1 hour ago" },
    { id: 3, text: "Ayurveda Spa booking confirmed for Samantha Miller", time: "2 hours ago" },
  ]);

  // Statistics calculations
  const totalBookingsCount = bookings.length;
  const totalRevenue = bookings.reduce((sum, b) => (b.bookingStatus === "Cancelled" ? sum : sum + b.price), 0);
  const occupancyRate = 72; // Simulated occupancy
  const newGuestsCount = bookings.filter((b) => b.bookingStatus === "Pending").length;

  // Chart data
  const revenueData = [
    { month: "Jan", revenue: 12400 },
    { month: "Feb", revenue: 18900 },
    { month: "Mar", revenue: 15600 },
    { month: "Apr", revenue: 24800 },
    { month: "May", revenue: 22100 },
    { month: "Jun", revenue: 31200 },
    { month: "Jul", revenue: totalRevenue },
  ];

  const occupancyData = hotels.map((h, idx) => ({
    name: h.name.replace("Earls ", ""),
    rate: [68, 82, 75, 60, 70][idx % 5] || 70,
  }));

  // Handle Booking Status Update
  const handleUpdateStatus = (id: string, newStatus: "Pending" | "Confirmed" | "Cancelled") => {
    setBookings(
      bookings.map((b) => (b._id === id ? { ...b, bookingStatus: newStatus } : b))
    );
  };

  // Handle Delete Booking
  const handleDeleteBooking = (id: string) => {
    if (confirm("Are you sure you want to remove this booking registry?")) {
      setBookings(bookings.filter((b) => b._id !== id));
    }
  };

  return (
    <div className="space-y-10">
      {/* 1. Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="border border-luxury-gold/10 p-6 glass-panel flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[0.6rem] tracking-widest text-luxury-ivory/40 uppercase block">
              Cumulative Revenue
            </span>
            <span className="text-3xl font-serif text-luxury-gold">${totalRevenue.toLocaleString()}</span>
          </div>
          <div className="w-12 h-12 rounded-full bg-luxury-gold/5 border border-luxury-gold/10 flex items-center justify-center text-luxury-gold">
            <DollarSign size={20} />
          </div>
        </div>

        <div className="border border-luxury-gold/10 p-6 glass-panel flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[0.6rem] tracking-widest text-luxury-ivory/40 uppercase block">
              Total Registries
            </span>
            <span className="text-3xl font-serif text-luxury-ivory">{totalBookingsCount} Bookings</span>
          </div>
          <div className="w-12 h-12 rounded-full bg-luxury-gold/5 border border-luxury-gold/10 flex items-center justify-center text-luxury-gold">
            <Calendar size={20} />
          </div>
        </div>

        <div className="border border-luxury-gold/10 p-6 glass-panel flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[0.6rem] tracking-widest text-luxury-ivory/40 uppercase block">
              Occupancy Rate
            </span>
            <span className="text-3xl font-serif text-luxury-gold">{occupancyRate}%</span>
          </div>
          <div className="w-12 h-12 rounded-full bg-luxury-gold/5 border border-luxury-gold/10 flex items-center justify-center text-luxury-gold">
            <Percent size={20} />
          </div>
        </div>

        <div className="border border-luxury-gold/10 p-6 glass-panel flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[0.6rem] tracking-widest text-luxury-ivory/40 uppercase block">
              Pending Actions
            </span>
            <span className="text-3xl font-serif text-luxury-ivory">{newGuestsCount} Guests</span>
          </div>
          <div className="w-12 h-12 rounded-full bg-luxury-gold/5 border border-luxury-gold/10 flex items-center justify-center text-luxury-gold">
            <TrendingUp size={20} />
          </div>
        </div>
      </div>

      {/* 2. Visual Graphs & Notifications */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Revenue Graph */}
        <div className="lg:col-span-2 border border-luxury-gold/10 p-6 glass-panel space-y-4">
          <h3 className="font-serif text-lg text-luxury-ivory">Revenue Flow Trends</h3>
          <div className="h-64 w-full text-xs">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#C8A45C" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#C8A45C" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(200,164,92,0.05)" />
                <XAxis dataKey="month" stroke="rgba(248,245,239,0.3)" />
                <YAxis stroke="rgba(248,245,239,0.3)" />
                <Tooltip contentStyle={{ backgroundColor: "#121212", borderColor: "rgba(200, 164, 92, 0.2)" }} />
                <Area type="monotone" dataKey="revenue" stroke="#C8A45C" fillOpacity={1} fill="url(#colorRev)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Notifications list */}
        <div className="border border-luxury-gold/10 p-6 glass-panel space-y-6">
          <h3 className="font-serif text-lg text-luxury-ivory flex items-center gap-2">
            <Bell size={18} className="text-luxury-gold" />
            <span>Registry Alerts</span>
          </h3>
          <div className="space-y-4">
            {notifications.map((n) => (
              <div key={n.id} className="p-3 bg-luxury-black/30 border-l border-luxury-gold/40 text-[0.7rem] space-y-1">
                <p className="text-luxury-ivory/80 leading-normal">{n.text}</p>
                <span className="text-[0.6rem] text-luxury-gold/50">{n.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex border-b border-luxury-gold/10">
        <button
          onClick={() => setActiveTab("overview")}
          className={`pb-3 px-6 text-xs tracking-widest uppercase transition-all duration-200 ${
            activeTab === "overview" ? "border-b-2 border-luxury-gold text-luxury-gold" : "text-luxury-ivory/50"
          }`}
        >
          Bookings Registry
        </button>
        <button
          onClick={() => setActiveTab("hotels")}
          className={`pb-3 px-6 text-xs tracking-widest uppercase transition-all duration-200 ${
            activeTab === "hotels" ? "border-b-2 border-luxury-gold text-luxury-gold" : "text-luxury-ivory/50"
          }`}
        >
          Our Sanctuaries ({hotels.length})
        </button>
        <button
          onClick={() => setActiveTab("stats")}
          className={`pb-3 px-6 text-xs tracking-widest uppercase transition-all duration-200 ${
            activeTab === "stats" ? "border-b-2 border-luxury-gold text-luxury-gold" : "text-luxury-ivory/50"
          }`}
        >
          Occupancy Metrics
        </button>
      </div>

      {/* Tab Contents */}
      <div className="space-y-6">
        {activeTab === "overview" && (
          <div className="border border-luxury-gold/10 glass-panel overflow-x-auto rounded-none">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-luxury-gold/15 bg-luxury-black/40 text-luxury-gold/80 tracking-widest uppercase font-sans">
                  <th className="p-4">Reference</th>
                  <th className="p-4">Guest</th>
                  <th className="p-4">Destination / Suite</th>
                  <th className="p-4">Dates</th>
                  <th className="p-4">Revenue</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((booking) => {
                  const hotelName = booking.hotel?.name || "Earls Hotel";
                  const roomName = booking.room?.name || "Suite";
                  return (
                    <tr key={booking._id} className="border-b border-luxury-gold/5 hover:bg-luxury-charcoal/10 transition-colors">
                      <td className="p-4 font-mono text-[0.65rem] text-luxury-ivory/50">{booking._id}</td>
                      <td className="p-4">
                        <div className="font-medium text-luxury-ivory">{booking.guestName}</div>
                        <div className="text-[0.65rem] text-luxury-ivory/40">{booking.email}</div>
                      </td>
                      <td className="p-4">
                        <div className="text-luxury-ivory/80">{hotelName}</div>
                        <div className="text-[0.65rem] text-luxury-gold/60">{roomName}</div>
                      </td>
                      <td className="p-4">
                        <div>{new Date(booking.checkIn).toLocaleDateString()}</div>
                        <div className="text-[0.65rem] text-luxury-ivory/40">to {new Date(booking.checkOut).toLocaleDateString()}</div>
                      </td>
                      <td className="p-4 font-medium text-luxury-gold">${booking.price}</td>
                      <td className="p-4">
                        <span
                          className={`inline-flex items-center px-2 py-1 text-[0.6rem] uppercase tracking-wider ${
                            booking.bookingStatus === "Confirmed"
                              ? "bg-green-500/10 text-green-400 border border-green-500/20"
                              : booking.bookingStatus === "Pending"
                              ? "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20"
                              : "bg-red-500/10 text-red-400 border border-red-500/20"
                          }`}
                        >
                          {booking.bookingStatus}
                        </span>
                      </td>
                      <td className="p-4 flex items-center justify-center gap-2">
                        {booking.bookingStatus === "Pending" && (
                          <button
                            onClick={() => handleUpdateStatus(booking._id, "Confirmed")}
                            title="Confirm Booking"
                            className="p-1.5 border border-green-500/20 text-green-400 hover:bg-green-500/10 transition-colors"
                          >
                            <CheckCircle size={14} />
                          </button>
                        )}
                        {booking.bookingStatus !== "Cancelled" && (
                          <button
                            onClick={() => handleUpdateStatus(booking._id, "Cancelled")}
                            title="Cancel Booking"
                            className="p-1.5 border border-red-500/20 text-red-400 hover:bg-red-500/10 transition-colors"
                          >
                            <XCircle size={14} />
                          </button>
                        )}
                        <button
                          onClick={() => handleDeleteBooking(booking._id)}
                          title="Delete Registry"
                          className="p-1.5 border border-luxury-gold/20 text-luxury-gold hover:bg-luxury-gold/10 transition-colors"
                        >
                          <Trash2 size={14} />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === "hotels" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {hotels.map((h) => (
              <div
                key={h.slug}
                className="p-6 border border-luxury-gold/10 bg-luxury-charcoal/20 flex gap-4 items-start"
              >
                <div className="w-12 h-12 rounded-full border border-luxury-gold/20 flex items-center justify-center text-luxury-gold bg-luxury-black/30 flex-shrink-0">
                  <HotelIcon size={20} />
                </div>
                <div className="space-y-2">
                  <h4 className="font-serif text-lg text-luxury-ivory">{h.name}</h4>
                  <p className="text-[0.7rem] text-luxury-gold/70 uppercase tracking-widest">{h.location}</p>
                  <p className="text-xs text-luxury-ivory/60 leading-relaxed font-light">{h.description}</p>
                  <div className="text-[0.65rem] text-luxury-ivory/40">
                    Starting price: <span className="text-luxury-gold">${h.startingPrice}</span> / night
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "stats" && (
          <div className="border border-luxury-gold/10 p-6 glass-panel space-y-6">
            <h3 className="font-serif text-lg text-luxury-ivory">Occupancy Rates Across Properties</h3>
            <div className="h-80 w-full text-xs">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={occupancyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(200,164,92,0.05)" />
                  <XAxis dataKey="name" stroke="rgba(248,245,239,0.3)" />
                  <YAxis stroke="rgba(248,245,239,0.3)" tickFormatter={(val) => `${val}%`} />
                  <Tooltip contentStyle={{ backgroundColor: "#121212", borderColor: "rgba(200, 164, 92, 0.2)" }} />
                  <Legend />
                  <Bar dataKey="rate" name="Occupancy Rate (%)" fill="#C8A45C" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
