"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Calendar,
  Euro,
  Users,
  Star,
  Plane,
  Mountain,
  Car,
  Bike,
  ArrowUpRight,
  ChevronDown,
  ArrowRight,
  TrendingUp,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";

interface BookingItem {
  id: string;
  service: string;
  dateTime: string;
  status: "Confirmed" | "Pending" | "Cancelled" | "Completed";
  iconType: "plane" | "mountain" | "car" | "bike";
}

export default function AdminDashboardPage() {
  const [timeRange, setTimeRange] = useState("Last 7 Days");
  const [realBookings, setRealBookings] = useState<BookingItem[]>([]);
  const [counts, setCounts] = useState({
    bookings: 248,
    revenue: "€18,720",
    customers: "1,024",
    rating: "4.9",
  });

  // Default design mock bookings matching the exact provided screenshot
  const initialBookings: BookingItem[] = [
    {
      id: "1",
      service: "Airport Transfer",
      dateTime: "Apr 26, 2025 · 10:30 AM",
      status: "Confirmed",
      iconType: "plane",
    },
    {
      id: "2",
      service: "Excursion Tour",
      dateTime: "Apr 25, 2025 · 02:15 PM",
      status: "Pending",
      iconType: "mountain",
    },
    {
      id: "3",
      service: "Taxi Service",
      dateTime: "Apr 25, 2025 · 01:20 PM",
      status: "Confirmed",
      iconType: "car",
    },
    {
      id: "4",
      service: "Bicycle Transfer",
      dateTime: "Apr 24, 2025 · 04:45 PM",
      status: "Cancelled",
      iconType: "bike",
    },
  ];

  // Fetch real data from Supabase if present
  useEffect(() => {
    async function fetchSupabaseData() {
      try {
        const supabase = createClient();
        const { data, error, count } = await supabase
          .from("bookings")
          .select("*", { count: "exact" })
          .order("created_at", { ascending: false })
          .limit(4);

        if (!error && data && data.length > 0) {
          const mapped: BookingItem[] = data.map((b) => {
            let iconType: "plane" | "mountain" | "car" | "bike" = "car";
            const vLower = (b.vehicle || "").toLowerCase();
            const pickupLower = (b.pickup || "").toLowerCase();
            if (pickupLower.includes("airport") || pickupLower.includes("flughafen") || b.flight_number) {
              iconType = "plane";
            } else if (vLower.includes("excursion") || pickupLower.includes("grossglockner")) {
              iconType = "mountain";
            } else if (vLower.includes("bike") || pickupLower.includes("bike")) {
              iconType = "bike";
            }

            const statusMap: Record<string, "Confirmed" | "Pending" | "Cancelled" | "Completed"> = {
              confirmed: "Confirmed",
              pending: "Pending",
              cancelled: "Cancelled",
              completed: "Completed",
            };

            return {
              id: b.id,
              service: b.vehicle || "VIP Chauffeur Transfer",
              dateTime: `${b.date} · ${b.time}`,
              status: statusMap[b.status] || "Pending",
              iconType,
            };
          });

          setRealBookings(mapped);
          if (count && count > 0) {
            setCounts((prev) => ({ ...prev, bookings: prev.bookings + count }));
          }
        }
      } catch {
        // Fallback gracefully to design preset
      }
    }

    fetchSupabaseData();
  }, []);

  const displayBookings = realBookings.length > 0 ? realBookings : initialBookings;

  const renderServiceIcon = (type: "plane" | "mountain" | "car" | "bike") => {
    switch (type) {
      case "plane":
        return <Plane className="w-4 h-4 text-gray-300" />;
      case "mountain":
        return <Mountain className="w-4 h-4 text-gray-300" />;
      case "bike":
        return <Bike className="w-4 h-4 text-gray-300" />;
      case "car":
      default:
        return <Car className="w-4 h-4 text-gray-300" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Confirmed":
        return (
          <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-[#0D2818] text-[#34D399] border border-[#059669]/30">
            Confirmed
          </span>
        );
      case "Pending":
        return (
          <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-[#332200] text-[#FBBF24] border border-[#D97706]/30">
            Pending
          </span>
        );
      case "Cancelled":
        return (
          <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-[#2D1214] text-[#F87171] border border-[#DC2626]/30">
            Cancelled
          </span>
        );
      case "Completed":
      default:
        return (
          <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-[#182335] text-[#60A5FA] border border-[#3B82F6]/30">
            Completed
          </span>
        );
    }
  };

  return (
    <div className="space-y-7">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
          Dashboard
        </h1>
        <p className="text-xs sm:text-sm text-[#9CA3AF] mt-1">
          Overview of your business
        </p>
      </div>

      {/* 4 Executive Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Total Bookings */}
        <div className="bg-[#0D121B] border border-[#1C2433] rounded-2xl p-5 hover:border-[#2C384F] transition-all">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#241B0E] border border-[#DFBA73]/30 flex items-center justify-center shrink-0">
              <Calendar className="w-5 h-5 text-[#DFBA73]" />
            </div>
            <div>
              <p className="text-xs text-[#9CA3AF] font-medium">Total Bookings</p>
              <h3 className="text-2xl font-extrabold text-white mt-0.5">
                {counts.bookings}
              </h3>
              <p className="text-[11px] font-semibold text-[#10B981] flex items-center gap-1 mt-0.5">
                <span>↑</span> 12%
              </p>
            </div>
          </div>
        </div>

        {/* Card 2: Total Revenue */}
        <div className="bg-[#0D121B] border border-[#1C2433] rounded-2xl p-5 hover:border-[#2C384F] transition-all">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#241B0E] border border-[#DFBA73]/30 flex items-center justify-center shrink-0">
              <Euro className="w-5 h-5 text-[#DFBA73]" />
            </div>
            <div>
              <p className="text-xs text-[#9CA3AF] font-medium">Total Revenue</p>
              <h3 className="text-2xl font-extrabold text-white mt-0.5">
                {counts.revenue}
              </h3>
              <p className="text-[11px] font-semibold text-[#10B981] flex items-center gap-1 mt-0.5">
                <span>↑</span> 8%
              </p>
            </div>
          </div>
        </div>

        {/* Card 3: Active Customers */}
        <div className="bg-[#0D121B] border border-[#1C2433] rounded-2xl p-5 hover:border-[#2C384F] transition-all">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#241B0E] border border-[#DFBA73]/30 flex items-center justify-center shrink-0">
              <Users className="w-5 h-5 text-[#DFBA73]" />
            </div>
            <div>
              <p className="text-xs text-[#9CA3AF] font-medium">Active Customers</p>
              <h3 className="text-2xl font-extrabold text-white mt-0.5">
                {counts.customers}
              </h3>
              <p className="text-[11px] font-semibold text-[#10B981] flex items-center gap-1 mt-0.5">
                <span>↑</span> 14%
              </p>
            </div>
          </div>
        </div>

        {/* Card 4: Rating */}
        <div className="bg-[#0D121B] border border-[#1C2433] rounded-2xl p-5 hover:border-[#2C384F] transition-all">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#241B0E] border border-[#DFBA73]/30 flex items-center justify-center shrink-0">
              <Star className="w-5 h-5 text-[#DFBA73] fill-[#DFBA73]" />
            </div>
            <div>
              <p className="text-xs text-[#9CA3AF] font-medium">Rating</p>
              <h3 className="text-2xl font-extrabold text-white mt-0.5">
                {counts.rating}
              </h3>
              <p className="text-[11px] font-semibold text-[#DFBA73] flex items-center gap-1 mt-0.5">
                5-Star Luxury
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Lower Grid: Bookings Overview Chart + Recent Bookings List */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Bookings Overview Spline Line Chart (7 cols) */}
        <div className="lg:col-span-7 bg-[#0D121B] border border-[#1C2433] rounded-2xl p-6">
          {/* Header Row */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-base font-bold text-white">Bookings Overview</h2>

            {/* Time Filter Pill Dropdown */}
            <div className="relative">
              <button
                type="button"
                className="flex items-center gap-2 bg-[#121824] border border-[#222C3E] px-3 py-1.5 rounded-xl text-xs text-gray-300 hover:text-white transition-colors select-none"
              >
                <span>{timeRange}</span>
                <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
              </button>
            </div>
          </div>

          {/* SVG Interactive Line Chart */}
          <div className="w-full relative pt-2 pb-1">
            <div className="flex items-center gap-3">
              {/* Y-axis Labels */}
              <div className="flex flex-col justify-between h-44 text-[11px] text-gray-500 font-mono select-none pr-1">
                <span>150</span>
                <span>100</span>
                <span>50</span>
                <span>0</span>
              </div>

              {/* Chart SVG */}
              <div className="flex-1 h-44 relative">
                {/* Horizontal Grid lines */}
                <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
                  <div className="border-b border-[#1A2230]/70 w-full" />
                  <div className="border-b border-[#1A2230]/70 w-full" />
                  <div className="border-b border-[#1A2230]/70 w-full" />
                  <div className="border-b border-[#1A2230]/70 w-full" />
                </div>

                {/* SVG Curve */}
                <svg
                  viewBox="0 0 500 176"
                  preserveAspectRatio="none"
                  className="w-full h-full overflow-visible"
                >
                  <defs>
                    <linearGradient id="goldArea" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#DFBA73" stopOpacity="0.32" />
                      <stop offset="60%" stopColor="#DFBA73" stopOpacity="0.08" />
                      <stop offset="100%" stopColor="#DFBA73" stopOpacity="0" />
                    </linearGradient>
                    <filter id="goldGlow" x="-20%" y="-20%" width="140%" height="140%">
                      <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#DFBA73" floodOpacity="0.4" />
                    </filter>
                  </defs>

                  {/* Gradient Fill under spline */}
                  <path
                    d="M 10,132 
                       C 50,130 65,95 100,95 
                       C 135,95 150,120 180,120 
                       C 210,120 235,68 270,68 
                       C 305,68 335,42 375,42 
                       C 415,42 435,50 490,54 
                       L 490,176 L 10,176 Z"
                    fill="url(#goldArea)"
                  />

                  {/* Glowing Stroke Path */}
                  <path
                    d="M 10,132 
                       C 50,130 65,95 100,95 
                       C 135,95 150,120 180,120 
                       C 210,120 235,68 270,68 
                       C 305,68 335,42 375,42 
                       C 415,42 435,50 490,54"
                    fill="none"
                    stroke="#DFBA73"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    filter="url(#goldGlow)"
                  />

                  {/* Key Trend Dots */}
                  <circle cx="100" cy="95" r="3.5" fill="#DFBA73" className="drop-shadow" />
                  <circle cx="270" cy="68" r="3.5" fill="#DFBA73" className="drop-shadow" />
                  <circle cx="375" cy="42" r="4.5" fill="#FFF" stroke="#DFBA73" strokeWidth="2" />
                  <circle cx="490" cy="54" r="3.5" fill="#DFBA73" className="drop-shadow" />
                </svg>
              </div>
            </div>

            {/* X-axis Days */}
            <div className="flex justify-between pl-8 pr-1 mt-3 text-[11px] text-gray-500 font-medium select-none">
              <span>Mon</span>
              <span>Tue</span>
              <span>Wed</span>
              <span>Thu</span>
              <span>Fri</span>
              <span>Sat</span>
              <span>Sun</span>
            </div>
          </div>
        </div>

        {/* Right Column: Recent Bookings (5 cols) */}
        <div className="lg:col-span-5 bg-[#0D121B] border border-[#1C2433] rounded-2xl p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-base font-bold text-white">Recent Bookings</h2>
            <Link
              href="/admin/bookings"
              className="text-xs text-[#DFBA73] hover:text-[#E8C888] font-semibold flex items-center gap-1 transition-colors"
            >
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-4">
            {displayBookings.map((b) => (
              <div
                key={b.id}
                className="flex items-center justify-between p-3 rounded-xl bg-[#101622] hover:bg-[#141B28] transition-colors border border-transparent hover:border-[#202A3C]"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-[#161D2A] border border-[#232D3F] flex items-center justify-center shrink-0">
                    {renderServiceIcon(b.iconType)}
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs sm:text-sm font-semibold text-white truncate">
                      {b.service}
                    </p>
                    <p className="text-[11px] text-gray-400 mt-0.5 truncate">
                      {b.dateTime}
                    </p>
                  </div>
                </div>

                <div className="shrink-0 ml-3">{getStatusBadge(b.status)}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
