"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Calendar,
  Tag,
  Settings,
  Users,
  LogOut,
  Search,
  Bell,
  ChevronDown,
  Menu,
  X,
  ExternalLink,
} from "lucide-react";
import { AdminBrandLogo } from "@/components/admin/AdminBrandLogo";
import { logoutAdminAction } from "@/app/admin/actions/auth";
import { createClient } from "@/lib/supabase/client";

export function AdminDashboardShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [recentNotifications, setRecentNotifications] = useState<
    Array<{ id: string; title: string; subtitle: string; time: string }>
  >([]);

  useEffect(() => {
    async function loadNotifications() {
      try {
        const supabase = createClient();
        const [{ data: b }, { data: r }, { data: m }] = await Promise.all([
          supabase.from("bookings").select("id, full_name, pickup, created_at").order("created_at", { ascending: false }).limit(2),
          supabase.from("rentals").select("id, name, pickup, created_at").order("created_at", { ascending: false }).limit(2),
          supabase.from("contact_messages").select("id, name, message, created_at").order("created_at", { ascending: false }).limit(2),
        ]);

        const list: Array<{ id: string; title: string; subtitle: string; time: string; ts: number }> = [];
        b?.forEach((item) => {
          list.push({
            id: `b-${item.id}`,
            title: `Buchung: ${item.full_name}`,
            subtitle: `Abholung: ${item.pickup}`,
            time: new Date(item.created_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
            ts: new Date(item.created_at).getTime(),
          });
        });
        r?.forEach((item) => {
          list.push({
            id: `r-${item.id}`,
            title: `Mietwagen: ${item.name}`,
            subtitle: `Ort: ${item.pickup}`,
            time: new Date(item.created_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
            ts: new Date(item.created_at).getTime(),
          });
        });
        m?.forEach((item) => {
          list.push({
            id: `m-${item.id}`,
            title: `Nachricht: ${item.name}`,
            subtitle: item.message?.slice(0, 36) + "...",
            time: new Date(item.created_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
            ts: new Date(item.created_at).getTime(),
          });
        });

        list.sort((x, y) => y.ts - x.ts);
        setRecentNotifications(list.slice(0, 4));
      } catch {
        // fallback
      }
    }

    loadNotifications();
  }, []);

  const navItems = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Bookings", href: "/admin/bookings", icon: Calendar },
    { name: "Pricing", href: "/admin/pricing", icon: Tag },
    { name: "Settings", href: "/admin/settings", icon: Settings },
    { name: "Users", href: "/admin/users", icon: Users },
  ];

  const handleLogout = async () => {
    await logoutAdminAction();
    router.push("/admin/login");
    router.refresh();
  };

  return (
    <div className="min-h-screen bg-[#080B10] text-[#E4E7EC] flex flex-col lg:flex-row antialiased">
      {/* Mobile Top Navbar */}
      <header className="lg:hidden flex items-center justify-between px-4 py-3 bg-[#0A0E15] border-b border-[#1A2230] sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-[#141B26]"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
          <AdminBrandLogo size="sm" />
        </div>

        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#DFBA73] to-[#99732B] text-black font-bold text-xs flex items-center justify-center">
            AD
          </div>
        </div>
      </header>

      {/* Sidebar for Desktop & Mobile Slide-over */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-[#0A0E15] border-r border-[#1B2230] flex flex-col justify-between transition-transform duration-200 lg:translate-x-0 ${
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div>
          {/* Logo Branding */}
          <div className="pt-8 pb-7 px-6 border-b border-[#161C28]/80 flex justify-center">
            <Link href="/admin" onClick={() => setMobileMenuOpen(false)}>
              <AdminBrandLogo size="md" />
            </Link>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1.5 mt-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive =
                item.href === "/admin"
                  ? pathname === "/admin"
                  : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3.5 px-4 py-3 rounded-xl text-sm transition-all select-none ${
                    isActive
                      ? "bg-gradient-to-r from-[#DFBA73] via-[#D5AC5E] to-[#B88E3E] text-[#0A0D14] font-bold shadow-md shadow-amber-950/20"
                      : "text-[#9CA3AF] hover:text-white hover:bg-[#121824] font-medium"
                  }`}
                >
                  <Icon
                    className={`w-4 h-4 ${
                      isActive ? "text-[#0A0D14]" : "text-gray-400 group-hover:text-white"
                    }`}
                  />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-[#161C28]/80 space-y-2">
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs text-gray-400 hover:text-white hover:bg-[#121824] transition-colors"
          >
            <ExternalLink className="w-4 h-4 text-gray-400" />
            <span>View Live Website</span>
          </Link>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-gray-400 hover:text-red-400 hover:bg-red-950/20 transition-colors cursor-pointer text-left"
          >
            <LogOut className="w-4 h-4 text-gray-400" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Overlay backdrop for mobile */}
      {mobileMenuOpen && (
        <div
          onClick={() => setMobileMenuOpen(false)}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 lg:hidden"
        />
      )}

      {/* Main Content Area */}
      <div className="flex-1 lg:pl-64 flex flex-col min-h-screen">
        {/* Top Header Bar */}
        <header className="hidden lg:flex items-center justify-between px-8 py-4 bg-[#090C12]/80 backdrop-blur-md border-b border-[#1A2230] sticky top-0 z-30">
          {/* Search Bar */}
          <div className="relative w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search bookings..."
              className="w-full bg-[#0D121B] border border-[#1E2638] focus:border-[#DFBA73] rounded-xl pl-10 pr-4 py-2 text-xs text-gray-200 placeholder:text-gray-500 outline-none transition-colors"
            />
          </div>

          {/* Right Header Icons */}
          <div className="flex items-center gap-5">
            {/* Notification Bell */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2 rounded-xl text-gray-400 hover:text-white hover:bg-[#121824] transition-colors cursor-pointer"
              >
                <Bell className="w-4 h-4" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500 ring-2 ring-[#080B10]" />
              </button>

              {/* Notification Popover */}
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 rounded-xl bg-[#101520] border border-[#20293B] shadow-2xl p-3 z-50">
                  <div className="text-xs font-semibold text-white pb-2 border-b border-white/10 flex justify-between items-center">
                    <span>Notifications</span>
                    <span className="text-[10px] text-[#DFBA73] font-mono">
                      {recentNotifications.length} Recent
                    </span>
                  </div>
                  <div className="py-2 space-y-2 text-xs">
                    {recentNotifications.length > 0 ? (
                      recentNotifications.map((n) => (
                        <div key={n.id} className="p-2.5 rounded-lg bg-[#141B28] text-gray-300 border border-white/5">
                          <div className="flex justify-between items-start">
                            <p className="font-semibold text-white truncate">{n.title}</p>
                            <span className="text-[10px] text-gray-500 shrink-0 ml-2">{n.time}</span>
                          </div>
                          <p className="text-[11px] text-gray-400 mt-0.5 truncate">{n.subtitle}</p>
                        </div>
                      ))
                    ) : (
                      <div className="p-3 text-center text-gray-500 text-xs">
                        No new notifications
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Admin User Profile */}
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center gap-2.5 pl-2 pr-3 py-1.5 rounded-xl hover:bg-[#121824] transition-colors cursor-pointer select-none"
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#DFBA73] to-[#99732B] text-black font-bold text-xs flex items-center justify-center shadow-sm">
                  AD
                </div>
                <span className="text-xs font-semibold text-gray-200">Admin</span>
                <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
              </button>

              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-48 rounded-xl bg-[#101520] border border-[#20293B] shadow-2xl py-1.5 z-50">
                  <div className="px-3 py-2 border-b border-white/10">
                    <p className="text-xs font-semibold text-white">Executive Administrator</p>
                    <p className="text-[10px] text-gray-400 truncate">office@firstclassdrive.at</p>
                  </div>
                  <Link
                    href="/admin/settings"
                    onClick={() => setShowUserMenu(false)}
                    className="flex items-center gap-2 px-3 py-2 text-xs text-gray-300 hover:text-white hover:bg-[#161F2E]"
                  >
                    <Settings className="w-3.5 h-3.5" />
                    <span>Settings</span>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2 px-3 py-2 text-xs text-red-400 hover:bg-red-950/20 text-left cursor-pointer"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Logout</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Page Children Container */}
        <main className="flex-1 p-5 sm:p-7 lg:p-9 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
export default AdminDashboardShell;
