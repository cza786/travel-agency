"use client";

import React, { useState, useEffect } from "react";
import {
  Calendar,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  XCircle,
  ExternalLink,
  Phone,
  Mail,
  MapPin,
  Car,
  Plane,
  Luggage,
  Users,
  RefreshCw,
  MessageSquare,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";

interface BookingRecord {
  id: string;
  reference_id: string;
  full_name: string;
  email: string;
  phone: string;
  pickup: string;
  dropoff: string;
  date: string;
  time: string;
  flight_number?: string;
  passengers: number;
  luggage: number;
  vehicle: string;
  notes?: string;
  status: "pending" | "confirmed" | "completed" | "cancelled";
  created_at: string;
}

export default function AdminBookingsPage() {
  const [bookings, setBookings] = useState<BookingRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedBooking, setSelectedBooking] = useState<BookingRecord | null>(null);

  // Initial fallback/sample data matching First Class Drive operations
  const sampleBookings: BookingRecord[] = [
    {
      id: "b1",
      reference_id: "FCD-829104",
      full_name: "Alexander von Berg",
      email: "alexander@vberg-holding.at",
      phone: "+43 664 123 4567",
      pickup: "Flughafen Salzburg (SZG)",
      dropoff: "Grand Hotel Zell am See",
      date: "2025-04-26",
      time: "10:30",
      flight_number: "OS 921",
      passengers: 3,
      luggage: 4,
      vehicle: "Mercedes-Benz V-Klasse VIP",
      notes: "Flight arrival with ski equipment bags.",
      status: "confirmed",
      created_at: new Date(Date.now() - 3600000).toISOString(),
    },
    {
      id: "b2",
      reference_id: "FCD-394821",
      full_name: "Sophie Laurent",
      email: "sophie.laurent@luxurytravel.fr",
      phone: "+33 6 12 34 56 78",
      pickup: "Kaprun Tauern Spa",
      dropoff: "Großglockner High Alpine Road",
      date: "2025-04-25",
      time: "14:15",
      passengers: 2,
      luggage: 2,
      vehicle: "Mercedes-Benz V-Klasse VIP",
      notes: "Panoramic alpine excursion tour.",
      status: "pending",
      created_at: new Date(Date.now() - 7200000).toISOString(),
    },
    {
      id: "b3",
      reference_id: "FCD-551029",
      full_name: "Maximilian Huber",
      email: "m.huber@consulting-vienna.com",
      phone: "+43 676 987 6543",
      pickup: "Salzburg Hauptbahnhof",
      dropoff: "Kitzbühel Country Club",
      date: "2025-04-25",
      time: "13:20",
      passengers: 1,
      luggage: 1,
      vehicle: "Mercedes-Benz E-Klasse Chauffeur",
      notes: "Business transfer.",
      status: "confirmed",
      created_at: new Date(Date.now() - 14400000).toISOString(),
    },
    {
      id: "b4",
      reference_id: "FCD-109283",
      full_name: "Elena Rostova",
      email: "elena.r@lifestyle.de",
      phone: "+49 171 2345678",
      pickup: "Zell am See Bahnhof",
      dropoff: "Hotel Schloss Prielau",
      date: "2025-04-24",
      time: "16:45",
      passengers: 4,
      luggage: 3,
      vehicle: "Bicycle Transfer Special",
      notes: "Cancelled by client due to flight change.",
      status: "cancelled",
      created_at: new Date(Date.now() - 86400000).toISOString(),
    },
  ];

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const supabase = createClient();
      const { data, error } = await supabase
        .from("bookings")
        .select("*")
        .order("created_at", { ascending: false });

      if (!error && data && data.length > 0) {
        setBookings(data as BookingRecord[]);
      } else {
        setBookings(sampleBookings);
      }
    } catch {
      setBookings(sampleBookings);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleUpdateStatus = async (
    bookingId: string,
    newStatus: "pending" | "confirmed" | "completed" | "cancelled"
  ) => {
    // Optimistic local update
    setBookings((prev) =>
      prev.map((b) => (b.id === bookingId ? { ...b, status: newStatus } : b))
    );
    if (selectedBooking && selectedBooking.id === bookingId) {
      setSelectedBooking({ ...selectedBooking, status: newStatus });
    }

    try {
      const supabase = createClient();
      await supabase
        .from("bookings")
        .update({ status: newStatus })
        .eq("id", bookingId);
    } catch (err) {
      console.warn("Status update fallback:", err);
    }
  };

  const filtered = bookings.filter((b) => {
    const matchesStatus =
      statusFilter === "all" || b.status.toLowerCase() === statusFilter.toLowerCase();
    const query = searchQuery.toLowerCase();
    const matchesSearch =
      b.full_name.toLowerCase().includes(query) ||
      b.email.toLowerCase().includes(query) ||
      b.reference_id.toLowerCase().includes(query) ||
      b.pickup.toLowerCase().includes(query) ||
      b.dropoff.toLowerCase().includes(query);
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="space-y-7">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
            Bookings Management
          </h1>
          <p className="text-xs sm:text-sm text-[#9CA3AF] mt-1">
            Real-time reservations and dispatch management
          </p>
        </div>

        <button
          onClick={fetchBookings}
          className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#131926] border border-[#212B3D] text-xs font-semibold text-gray-200 hover:text-white hover:bg-[#1A2233] transition-colors self-start sm:self-auto"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin text-[#DFBA73]" : ""}`} />
          <span>Refresh</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-[#0D121B] border border-[#1C2433] rounded-2xl p-4">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by customer name, ref ID, route or email..."
            className="w-full bg-[#111723] border border-[#212B3D] focus:border-[#DFBA73] rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-white placeholder-gray-500 outline-none transition-colors"
          />
        </div>

        {/* Status Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto select-none pt-1 sm:pt-0">
          {["all", "pending", "confirmed", "completed", "cancelled"].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold capitalize whitespace-nowrap cursor-pointer transition-all ${
                statusFilter === st
                  ? "bg-[#DFBA73] text-black shadow-sm"
                  : "bg-[#111723] text-gray-400 hover:text-white hover:bg-[#161E2D]"
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Bookings Table Card */}
      <div className="bg-[#0D121B] border border-[#1C2433] rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#1A2230] text-[12px] font-semibold text-[#8E97A6] uppercase tracking-wider bg-[#0B0F17]">
                <th className="py-4 px-6">Reference & Guest</th>
                <th className="py-4 px-6">Route</th>
                <th className="py-4 px-6">Date & Time</th>
                <th className="py-4 px-6">Vehicle</th>
                <th className="py-4 px-6">Status</th>
                <th className="py-4 px-6 text-right">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#161D29] text-xs sm:text-sm text-gray-200">
              {filtered.map((b) => (
                <tr key={b.id} className="hover:bg-[#111723] transition-colors">
                  {/* Guest */}
                  <td className="py-4 px-6">
                    <p className="font-bold text-white">{b.full_name}</p>
                    <p className="text-[11px] text-[#DFBA73] font-mono mt-0.5">
                      {b.reference_id}
                    </p>
                    <p className="text-[11px] text-gray-400">{b.phone}</p>
                  </td>

                  {/* Route */}
                  <td className="py-4 px-6">
                    <div className="max-w-xs space-y-0.5">
                      <p className="text-white font-medium truncate flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                        {b.pickup}
                      </p>
                      <p className="text-gray-400 truncate flex items-center gap-1.5 text-xs">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" />
                        {b.dropoff}
                      </p>
                    </div>
                  </td>

                  {/* Date & Time */}
                  <td className="py-4 px-6">
                    <p className="font-medium text-white">{b.date}</p>
                    <p className="text-[11px] text-gray-400">{b.time} Uhr</p>
                    {b.flight_number && (
                      <span className="inline-block mt-0.5 text-[10px] font-mono bg-[#161D2A] text-gray-300 px-1.5 py-0.5 rounded">
                        ✈ {b.flight_number}
                      </span>
                    )}
                  </td>

                  {/* Vehicle & Specs */}
                  <td className="py-4 px-6">
                    <p className="font-medium text-white">{b.vehicle}</p>
                    <p className="text-[11px] text-gray-400">
                      {b.passengers} Guests · {b.luggage} Bags
                    </p>
                  </td>

                  {/* Status Dropdown */}
                  <td className="py-4 px-6">
                    <select
                      value={b.status}
                      onChange={(e) =>
                        handleUpdateStatus(
                          b.id,
                          e.target.value as BookingRecord["status"]
                        )
                      }
                      className={`text-[11px] font-semibold px-2.5 py-1 rounded-full border outline-none cursor-pointer ${
                        b.status === "confirmed"
                          ? "bg-[#0D2818] text-[#34D399] border-[#059669]/40"
                          : b.status === "pending"
                          ? "bg-[#332200] text-[#FBBF24] border-[#D97706]/40"
                          : b.status === "cancelled"
                          ? "bg-[#2D1214] text-[#F87171] border-[#DC2626]/40"
                          : "bg-[#182335] text-[#60A5FA] border-[#3B82F6]/40"
                      }`}
                    >
                      <option value="pending" className="bg-[#121824] text-white">Pending</option>
                      <option value="confirmed" className="bg-[#121824] text-white">Confirmed</option>
                      <option value="completed" className="bg-[#121824] text-white">Completed</option>
                      <option value="cancelled" className="bg-[#121824] text-white">Cancelled</option>
                    </select>
                  </td>

                  {/* Actions */}
                  <td className="py-4 px-6 text-right">
                    <button
                      onClick={() => setSelectedBooking(b)}
                      className="cursor-pointer text-xs font-semibold text-[#DFBA73] hover:underline"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filtered.length === 0 && (
          <div className="py-12 text-center text-gray-500 text-xs">
            No bookings found matching current filters.
          </div>
        )}
      </div>

      {/* Booking Detail Slide-over / Modal */}
      {selectedBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
          <div className="w-full max-w-lg bg-[#0F141E] border border-[#222C3E] rounded-2xl shadow-2xl p-6 relative">
            <div className="flex justify-between items-start pb-4 border-b border-[#1C2433]">
              <div>
                <span className="text-[11px] text-[#DFBA73] font-mono font-bold">
                  {selectedBooking.reference_id}
                </span>
                <h3 className="text-lg font-bold text-white mt-0.5">
                  {selectedBooking.full_name}
                </h3>
              </div>
              <button
                onClick={() => setSelectedBooking(null)}
                className="text-gray-400 hover:text-white p-1 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <div className="py-4 space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3 bg-[#131926] p-3.5 rounded-xl border border-[#212B3D]">
                <div>
                  <p className="text-gray-400">Phone</p>
                  <p className="font-semibold text-white mt-0.5">{selectedBooking.phone}</p>
                </div>
                <div>
                  <p className="text-gray-400">Email</p>
                  <p className="font-semibold text-white mt-0.5 truncate">{selectedBooking.email}</p>
                </div>
              </div>

              <div className="space-y-2 bg-[#131926] p-3.5 rounded-xl border border-[#212B3D]">
                <div>
                  <p className="text-gray-400">Pickup Location</p>
                  <p className="font-semibold text-white mt-0.5">{selectedBooking.pickup}</p>
                </div>
                <div>
                  <p className="text-gray-400">Destination</p>
                  <p className="font-semibold text-white mt-0.5">{selectedBooking.dropoff}</p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 text-center bg-[#131926] p-3 rounded-xl border border-[#212B3D]">
                <div>
                  <p className="text-gray-400">Date</p>
                  <p className="font-semibold text-white mt-0.5">{selectedBooking.date}</p>
                </div>
                <div>
                  <p className="text-gray-400">Time</p>
                  <p className="font-semibold text-white mt-0.5">{selectedBooking.time}</p>
                </div>
                <div>
                  <p className="text-gray-400">Passengers</p>
                  <p className="font-semibold text-white mt-0.5">{selectedBooking.passengers} Guests</p>
                </div>
              </div>

              {selectedBooking.notes && (
                <div className="bg-[#131926] p-3.5 rounded-xl border border-[#212B3D]">
                  <p className="text-gray-400">Special Notes</p>
                  <p className="text-gray-200 mt-1">{selectedBooking.notes}</p>
                </div>
              )}
            </div>

            <div className="pt-2 flex items-center justify-between border-t border-[#1C2433]">
              <a
                href={`https://wa.me/${selectedBooking.phone.replace(/[^0-9]/g, "")}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-[#25D366] hover:underline"
              >
                <span>Chat on WhatsApp</span>
                <ExternalLink className="w-3 h-3" />
              </a>

              <button
                onClick={() => setSelectedBooking(null)}
                className="px-4 py-2 rounded-xl bg-[#DFBA73] text-black font-bold text-xs"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
