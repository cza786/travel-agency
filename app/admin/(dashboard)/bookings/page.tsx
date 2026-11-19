"use client";

import React, { useState, useEffect, useCallback } from "react";
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
  Key,
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

interface RentalRecord {
  id: string;
  reference_id: string;
  name: string;
  email: string;
  phone: string;
  pickup: string;
  start_date: string;
  end_date: string;
  notes?: string;
  status: "pending" | "confirmed" | "completed" | "cancelled";
  created_at: string;
}

interface ContactRecord {
  id: string;
  name: string;
  email: string;
  message: string;
  locale: string;
  status: "unread" | "read" | "replied";
  created_at: string;
}

export default function AdminBookingsPage() {
  const [activeTab, setActiveTab] = useState<"transfers" | "rentals" | "messages">("transfers");

  const [bookings, setBookings] = useState<BookingRecord[]>([]);
  const [rentals, setRentals] = useState<RentalRecord[]>([]);
  const [messages, setMessages] = useState<ContactRecord[]>([]);

  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const [selectedBooking, setSelectedBooking] = useState<BookingRecord | null>(null);
  const [selectedRental, setSelectedRental] = useState<RentalRecord | null>(null);
  const [selectedMessage, setSelectedMessage] = useState<ContactRecord | null>(null);

  // Initial fallback/sample data
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
      vehicle: "Mercedes-Benz V-Klasse / Vito",
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
      vehicle: "Mercedes-Benz V-Klasse / Vito",
      notes: "Panoramic alpine excursion tour.",
      status: "pending",
      created_at: new Date(Date.now() - 7200000).toISOString(),
    },
  ];

  const fetchAllData = useCallback(async () => {
    setLoading(true);
    try {
      const supabase = createClient();

      // 1. Fetch Bookings
      const { data: bData, error: bErr } = await supabase
        .from("bookings")
        .select("*")
        .order("created_at", { ascending: false });

      if (!bErr && bData && bData.length > 0) {
        setBookings(bData as BookingRecord[]);
      } else {
        setBookings(sampleBookings);
      }

      // 2. Fetch Rentals
      const { data: rData } = await supabase
        .from("rentals")
        .select("*")
        .order("created_at", { ascending: false });

      if (rData) {
        setRentals(rData as RentalRecord[]);
      }

      // 3. Fetch Contact Messages
      const { data: mData } = await supabase
        .from("contact_messages")
        .select("*")
        .order("created_at", { ascending: false });

      if (mData) {
        setMessages(mData as ContactRecord[]);
      }
    } catch (err) {
      console.warn("Failed fetching admin data:", err);
      setBookings(sampleBookings);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAllData();

    // Setup Supabase Realtime Subscription for instantaneous sync!
    try {
      const supabase = createClient();
      const channel = supabase
        .channel("admin-realtime-feed")
        .on("postgres_changes", { event: "*", schema: "public", table: "bookings" }, () => {
          fetchAllData();
        })
        .on("postgres_changes", { event: "*", schema: "public", table: "rentals" }, () => {
          fetchAllData();
        })
        .on("postgres_changes", { event: "*", schema: "public", table: "contact_messages" }, () => {
          fetchAllData();
        })
        .subscribe();

      return () => {
        supabase.removeChannel(channel);
      };
    } catch {
      // fallback gracefully if realtime is unavailable
    }
  }, [fetchAllData]);

  // Update Status Handlers
  const handleUpdateBookingStatus = async (
    bookingId: string,
    newStatus: BookingRecord["status"]
  ) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === bookingId ? { ...b, status: newStatus } : b))
    );
    if (selectedBooking && selectedBooking.id === bookingId) {
      setSelectedBooking({ ...selectedBooking, status: newStatus });
    }

    try {
      const supabase = createClient();
      await supabase.from("bookings").update({ status: newStatus }).eq("id", bookingId);
    } catch (err) {
      console.warn("Status update fallback:", err);
    }
  };

  const handleUpdateRentalStatus = async (
    rentalId: string,
    newStatus: RentalRecord["status"]
  ) => {
    setRentals((prev) =>
      prev.map((r) => (r.id === rentalId ? { ...r, status: newStatus } : r))
    );
    if (selectedRental && selectedRental.id === rentalId) {
      setSelectedRental({ ...selectedRental, status: newStatus });
    }

    try {
      const supabase = createClient();
      await supabase.from("rentals").update({ status: newStatus }).eq("id", rentalId);
    } catch (err) {
      console.warn("Status update fallback:", err);
    }
  };

  const handleUpdateMessageStatus = async (
    messageId: string,
    newStatus: ContactRecord["status"]
  ) => {
    setMessages((prev) =>
      prev.map((m) => (m.id === messageId ? { ...m, status: newStatus } : m))
    );
    if (selectedMessage && selectedMessage.id === messageId) {
      setSelectedMessage({ ...selectedMessage, status: newStatus });
    }

    try {
      const supabase = createClient();
      await supabase.from("contact_messages").update({ status: newStatus }).eq("id", messageId);
    } catch (err) {
      console.warn("Status update fallback:", err);
    }
  };

  // Filtered lists
  const query = searchQuery.toLowerCase();

  const filteredBookings = bookings.filter((b) => {
    const matchesStatus =
      statusFilter === "all" || b.status.toLowerCase() === statusFilter.toLowerCase();
    const matchesSearch =
      b.full_name?.toLowerCase().includes(query) ||
      b.email?.toLowerCase().includes(query) ||
      b.reference_id?.toLowerCase().includes(query) ||
      b.pickup?.toLowerCase().includes(query) ||
      b.dropoff?.toLowerCase().includes(query);
    return matchesStatus && matchesSearch;
  });

  const filteredRentals = rentals.filter((r) => {
    const matchesStatus =
      statusFilter === "all" || r.status.toLowerCase() === statusFilter.toLowerCase();
    const matchesSearch =
      r.name?.toLowerCase().includes(query) ||
      r.email?.toLowerCase().includes(query) ||
      r.reference_id?.toLowerCase().includes(query) ||
      r.pickup?.toLowerCase().includes(query);
    return matchesStatus && matchesSearch;
  });

  const filteredMessages = messages.filter((m) => {
    const matchesStatus =
      statusFilter === "all" || m.status.toLowerCase() === statusFilter.toLowerCase();
    const matchesSearch =
      m.name?.toLowerCase().includes(query) ||
      m.email?.toLowerCase().includes(query) ||
      m.message?.toLowerCase().includes(query);
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="space-y-7">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
            Reservations & Inquiries
          </h1>
          <p className="text-xs sm:text-sm text-[#9CA3AF] mt-1">
            Real-time customer submissions synced with customer website
          </p>
        </div>

        <button
          onClick={fetchAllData}
          className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#131926] border border-[#212B3D] text-xs font-semibold text-gray-200 hover:text-white hover:bg-[#1A2233] transition-colors self-start sm:self-auto"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin text-[#DFBA73]" : ""}`} />
          <span>Sync Now</span>
        </button>
      </div>

      {/* Main Tab Navigation */}
      <div className="flex items-center gap-2 border-b border-[#1C2433] pb-2 overflow-x-auto select-none">
        <button
          onClick={() => {
            setActiveTab("transfers");
            setStatusFilter("all");
          }}
          className={`cursor-pointer px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
            activeTab === "transfers"
              ? "bg-[#DFBA73] text-black shadow-lg shadow-amber-950/20"
              : "bg-[#0D121B] text-gray-400 hover:text-white hover:bg-[#121824]"
          }`}
        >
          <Car className="w-4 h-4" />
          <span>Transfer Bookings</span>
          <span
            className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
              activeTab === "transfers" ? "bg-black/20 text-black" : "bg-[#1E2638] text-gray-300"
            }`}
          >
            {bookings.length}
          </span>
        </button>

        <button
          onClick={() => {
            setActiveTab("rentals");
            setStatusFilter("all");
          }}
          className={`cursor-pointer px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
            activeTab === "rentals"
              ? "bg-[#DFBA73] text-black shadow-lg shadow-amber-950/20"
              : "bg-[#0D121B] text-gray-400 hover:text-white hover:bg-[#121824]"
          }`}
        >
          <Key className="w-4 h-4" />
          <span>Car Rentals</span>
          <span
            className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
              activeTab === "rentals" ? "bg-black/20 text-black" : "bg-[#1E2638] text-gray-300"
            }`}
          >
            {rentals.length}
          </span>
        </button>

        <button
          onClick={() => {
            setActiveTab("messages");
            setStatusFilter("all");
          }}
          className={`cursor-pointer px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
            activeTab === "messages"
              ? "bg-[#DFBA73] text-black shadow-lg shadow-amber-950/20"
              : "bg-[#0D121B] text-gray-400 hover:text-white hover:bg-[#121824]"
          }`}
        >
          <MessageSquare className="w-4 h-4" />
          <span>Contact Messages</span>
          <span
            className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
              activeTab === "messages" ? "bg-black/20 text-black" : "bg-[#1E2638] text-gray-300"
            }`}
          >
            {messages.length}
          </span>
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
            placeholder={
              activeTab === "transfers"
                ? "Search by customer name, ref ID, route or email..."
                : activeTab === "rentals"
                ? "Search by renter name, ref ID, pickup or email..."
                : "Search by contact name, message or email..."
            }
            className="w-full bg-[#111723] border border-[#212B3D] focus:border-[#DFBA73] rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-white placeholder-gray-500 outline-none transition-colors"
          />
        </div>

        {/* Status Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto select-none pt-1 sm:pt-0">
          {(activeTab === "messages"
            ? ["all", "unread", "read", "replied"]
            : ["all", "pending", "confirmed", "completed", "cancelled"]
          ).map((st) => (
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

      {/* TAB 1: TRANSFER BOOKINGS */}
      {activeTab === "transfers" && (
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
                {filteredBookings.map((b) => (
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

                    {/* Vehicle */}
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
                          handleUpdateBookingStatus(
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

          {filteredBookings.length === 0 && (
            <div className="py-12 text-center text-gray-500 text-xs">
              No transfer bookings found matching current filters.
            </div>
          )}
        </div>
      )}

      {/* TAB 2: CAR RENTALS */}
      {activeTab === "rentals" && (
        <div className="bg-[#0D121B] border border-[#1C2433] rounded-2xl overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#1A2230] text-[12px] font-semibold text-[#8E97A6] uppercase tracking-wider bg-[#0B0F17]">
                  <th className="py-4 px-6">Reference & Renter</th>
                  <th className="py-4 px-6">Pickup Location</th>
                  <th className="py-4 px-6">Rental Period</th>
                  <th className="py-4 px-6">Notes / Vehicle</th>
                  <th className="py-4 px-6">Status</th>
                  <th className="py-4 px-6 text-right">Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#161D29] text-xs sm:text-sm text-gray-200">
                {filteredRentals.map((r) => (
                  <tr key={r.id} className="hover:bg-[#111723] transition-colors">
                    {/* Renter */}
                    <td className="py-4 px-6">
                      <p className="font-bold text-white">{r.name}</p>
                      <p className="text-[11px] text-[#DFBA73] font-mono mt-0.5">
                        {r.reference_id}
                      </p>
                      <p className="text-[11px] text-gray-400">{r.phone}</p>
                    </td>

                    {/* Pickup */}
                    <td className="py-4 px-6">
                      <p className="text-white font-medium">{r.pickup}</p>
                    </td>

                    {/* Period */}
                    <td className="py-4 px-6">
                      <p className="font-medium text-white">{r.start_date} → {r.end_date}</p>
                      <p className="text-[11px] text-gray-400">
                        {new Date(r.created_at).toLocaleDateString()}
                      </p>
                    </td>

                    {/* Notes */}
                    <td className="py-4 px-6 max-w-xs">
                      <p className="text-gray-300 text-xs truncate">
                        {r.notes || "Standard fleet"}
                      </p>
                    </td>

                    {/* Status Dropdown */}
                    <td className="py-4 px-6">
                      <select
                        value={r.status}
                        onChange={(e) =>
                          handleUpdateRentalStatus(
                            r.id,
                            e.target.value as RentalRecord["status"]
                          )
                        }
                        className={`text-[11px] font-semibold px-2.5 py-1 rounded-full border outline-none cursor-pointer ${
                          r.status === "confirmed"
                            ? "bg-[#0D2818] text-[#34D399] border-[#059669]/40"
                            : r.status === "pending"
                            ? "bg-[#332200] text-[#FBBF24] border-[#D97706]/40"
                            : r.status === "cancelled"
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
                        onClick={() => setSelectedRental(r)}
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

          {filteredRentals.length === 0 && (
            <div className="py-12 text-center text-gray-500 text-xs">
              No car rental inquiries received yet.
            </div>
          )}
        </div>
      )}

      {/* TAB 3: CONTACT MESSAGES */}
      {activeTab === "messages" && (
        <div className="bg-[#0D121B] border border-[#1C2433] rounded-2xl overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#1A2230] text-[12px] font-semibold text-[#8E97A6] uppercase tracking-wider bg-[#0B0F17]">
                  <th className="py-4 px-6">Sender & Email</th>
                  <th className="py-4 px-6">Message</th>
                  <th className="py-4 px-6">Date</th>
                  <th className="py-4 px-6">Status</th>
                  <th className="py-4 px-6 text-right">Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#161D29] text-xs sm:text-sm text-gray-200">
                {filteredMessages.map((m) => (
                  <tr key={m.id} className="hover:bg-[#111723] transition-colors">
                    {/* Sender */}
                    <td className="py-4 px-6">
                      <p className="font-bold text-white">{m.name}</p>
                      <p className="text-[11px] text-gray-400">{m.email}</p>
                      <span className="inline-block mt-0.5 text-[10px] uppercase font-mono bg-[#161D2A] text-gray-300 px-1.5 py-0.5 rounded">
                        Lang: {m.locale}
                      </span>
                    </td>

                    {/* Message Preview */}
                    <td className="py-4 px-6 max-w-md">
                      <p className="text-gray-300 text-xs truncate font-medium">
                        {m.message}
                      </p>
                    </td>

                    {/* Date */}
                    <td className="py-4 px-6">
                      <p className="text-xs text-gray-300">
                        {new Date(m.created_at).toLocaleDateString()}
                      </p>
                      <p className="text-[11px] text-gray-500">
                        {new Date(m.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </td>

                    {/* Status Dropdown */}
                    <td className="py-4 px-6">
                      <select
                        value={m.status}
                        onChange={(e) =>
                          handleUpdateMessageStatus(
                            m.id,
                            e.target.value as ContactRecord["status"]
                          )
                        }
                        className={`text-[11px] font-semibold px-2.5 py-1 rounded-full border outline-none cursor-pointer ${
                          m.status === "unread"
                            ? "bg-[#332200] text-[#FBBF24] border-[#D97706]/40"
                            : m.status === "read"
                            ? "bg-[#182335] text-[#60A5FA] border-[#3B82F6]/40"
                            : "bg-[#0D2818] text-[#34D399] border-[#059669]/40"
                        }`}
                      >
                        <option value="unread" className="bg-[#121824] text-white">Unread</option>
                        <option value="read" className="bg-[#121824] text-white">Read</option>
                        <option value="replied" className="bg-[#121824] text-white">Replied</option>
                      </select>
                    </td>

                    {/* Actions */}
                    <td className="py-4 px-6 text-right">
                      <button
                        onClick={() => setSelectedMessage(m)}
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

          {filteredMessages.length === 0 && (
            <div className="py-12 text-center text-gray-500 text-xs">
              No contact messages found.
            </div>
          )}
        </div>
      )}

      {/* Booking Detail Modal */}
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
                className="text-gray-400 hover:text-white p-1 text-sm font-bold cursor-pointer"
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
                  <p className="text-gray-400">Vehicle</p>
                  <p className="font-semibold text-white mt-0.5 truncate">{selectedBooking.vehicle}</p>
                </div>
              </div>

              {selectedBooking.notes && (
                <div className="bg-[#131926] p-3.5 rounded-xl border border-[#212B3D]">
                  <p className="text-gray-400">Customer Notes</p>
                  <p className="text-gray-200 mt-1 whitespace-pre-wrap">{selectedBooking.notes}</p>
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
                className="px-4 py-2 rounded-xl bg-[#DFBA73] text-black font-bold text-xs cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Rental Detail Modal */}
      {selectedRental && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
          <div className="w-full max-w-lg bg-[#0F141E] border border-[#222C3E] rounded-2xl shadow-2xl p-6 relative">
            <div className="flex justify-between items-start pb-4 border-b border-[#1C2433]">
              <div>
                <span className="text-[11px] text-[#DFBA73] font-mono font-bold">
                  {selectedRental.reference_id}
                </span>
                <h3 className="text-lg font-bold text-white mt-0.5">
                  {selectedRental.name}
                </h3>
              </div>
              <button
                onClick={() => setSelectedRental(null)}
                className="text-gray-400 hover:text-white p-1 text-sm font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="py-4 space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3 bg-[#131926] p-3.5 rounded-xl border border-[#212B3D]">
                <div>
                  <p className="text-gray-400">Phone</p>
                  <p className="font-semibold text-white mt-0.5">{selectedRental.phone}</p>
                </div>
                <div>
                  <p className="text-gray-400">Email</p>
                  <p className="font-semibold text-white mt-0.5 truncate">{selectedRental.email}</p>
                </div>
              </div>

              <div className="bg-[#131926] p-3.5 rounded-xl border border-[#212B3D]">
                <p className="text-gray-400">Pickup Location / Delivery Address</p>
                <p className="font-semibold text-white mt-0.5">{selectedRental.pickup}</p>
              </div>

              <div className="grid grid-cols-2 gap-3 text-center bg-[#131926] p-3 rounded-xl border border-[#212B3D]">
                <div>
                  <p className="text-gray-400">Rental Start</p>
                  <p className="font-semibold text-white mt-0.5">{selectedRental.start_date}</p>
                </div>
                <div>
                  <p className="text-gray-400">Rental End</p>
                  <p className="font-semibold text-white mt-0.5">{selectedRental.end_date}</p>
                </div>
              </div>

              {selectedRental.notes && (
                <div className="bg-[#131926] p-3.5 rounded-xl border border-[#212B3D]">
                  <p className="text-gray-400">Requested Vehicle / Special Notes</p>
                  <p className="text-gray-200 mt-1 whitespace-pre-wrap">{selectedRental.notes}</p>
                </div>
              )}
            </div>

            <div className="pt-2 flex items-center justify-between border-t border-[#1C2433]">
              <a
                href={`https://wa.me/${selectedRental.phone.replace(/[^0-9]/g, "")}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-[#25D366] hover:underline"
              >
                <span>Chat on WhatsApp</span>
                <ExternalLink className="w-3 h-3" />
              </a>

              <button
                onClick={() => setSelectedRental(null)}
                className="px-4 py-2 rounded-xl bg-[#DFBA73] text-black font-bold text-xs cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Contact Message Detail Modal */}
      {selectedMessage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
          <div className="w-full max-w-lg bg-[#0F141E] border border-[#222C3E] rounded-2xl shadow-2xl p-6 relative">
            <div className="flex justify-between items-start pb-4 border-b border-[#1C2433]">
              <div>
                <span className="text-[11px] text-[#DFBA73] font-mono font-bold uppercase">
                  Language: {selectedMessage.locale}
                </span>
                <h3 className="text-lg font-bold text-white mt-0.5">
                  {selectedMessage.name}
                </h3>
              </div>
              <button
                onClick={() => setSelectedMessage(null)}
                className="text-gray-400 hover:text-white p-1 text-sm font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="py-4 space-y-4 text-xs">
              <div className="bg-[#131926] p-3.5 rounded-xl border border-[#212B3D]">
                <p className="text-gray-400">Email Address</p>
                <p className="font-semibold text-white mt-0.5">{selectedMessage.email}</p>
              </div>

              <div className="bg-[#131926] p-3.5 rounded-xl border border-[#212B3D]">
                <p className="text-gray-400">Message Content</p>
                <div className="text-gray-200 mt-2 p-3 bg-[#0A0D14] rounded-lg border border-[#1A2230] whitespace-pre-wrap leading-relaxed">
                  {selectedMessage.message}
                </div>
              </div>

              <div className="text-right text-[11px] text-gray-500">
                Received on: {new Date(selectedMessage.created_at).toLocaleString()}
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between border-t border-[#1C2433]">
              <a
                href={`mailto:${selectedMessage.email}?subject=Ihre Anfrage bei First Class Drive`}
                className="inline-flex items-center gap-1.5 text-xs text-[#DFBA73] hover:underline"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Reply via Email</span>
              </a>

              <button
                onClick={() => setSelectedMessage(null)}
                className="px-4 py-2 rounded-xl bg-[#DFBA73] text-black font-bold text-xs cursor-pointer"
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
