"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import {
  Building2,
  Mail,
  Phone,
  Globe,
  Upload,
  Check,
  Shield,
  Bell,
  Palette,
  X,
  Image as ImageIcon,
  RotateCcw,
} from "lucide-react";
import { AdminBrandLogo } from "@/components/admin/AdminBrandLogo";

export default function AdminSettingsPage() {
  const [activeTab, setActiveTab] = useState<
    "general" | "branding" | "permissions" | "notifications"
  >("general");

  const [companyName, setCompanyName] = useState("First Class Drive");
  const [supportEmail, setSupportEmail] = useState("info@firstclassdrive.at");
  const [phoneNumber, setPhoneNumber] = useState("+43 662 123456");
  const [languageDefault, setLanguageDefault] = useState("English");
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Logo state & modal
  const [logoModalOpen, setLogoModalOpen] = useState(false);
  const [customLogoUrl, setCustomLogoUrl] = useState<string | null>(null);
  const [tempLogoUrl, setTempLogoUrl] = useState<string | null>(null);
  const [selectedVariant, setSelectedVariant] = useState<"default" | "gold" | "custom">("default");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setTempLogoUrl(event.target.result as string);
          setSelectedVariant("custom");
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleApplyLogo = () => {
    if (selectedVariant === "custom" && tempLogoUrl) {
      setCustomLogoUrl(tempLogoUrl);
    } else if (selectedVariant === "default") {
      setCustomLogoUrl(null);
    }
    setLogoModalOpen(false);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  return (
    <div className="space-y-7">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
          Settings
        </h1>
        <p className="text-xs sm:text-sm text-[#9CA3AF] mt-1">
          Configure your website settings
        </p>
      </div>

      {/* Settings Navigation Tabs */}
      <div className="flex items-center gap-6 border-b border-[#1A2230] text-xs sm:text-sm select-none overflow-x-auto">
        <button
          onClick={() => setActiveTab("general")}
          className={`pb-3 font-semibold transition-all relative whitespace-nowrap cursor-pointer ${
            activeTab === "general"
              ? "text-[#DFBA73]"
              : "text-gray-400 hover:text-white"
          }`}
        >
          General
          {activeTab === "general" && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#DFBA73]" />
          )}
        </button>

        <button
          onClick={() => setActiveTab("branding")}
          className={`pb-3 font-semibold transition-all relative whitespace-nowrap cursor-pointer ${
            activeTab === "branding"
              ? "text-[#DFBA73]"
              : "text-gray-400 hover:text-white"
          }`}
        >
          Logo & Branding
          {activeTab === "branding" && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#DFBA73]" />
          )}
        </button>

        <button
          onClick={() => setActiveTab("permissions")}
          className={`pb-3 font-semibold transition-all relative whitespace-nowrap cursor-pointer ${
            activeTab === "permissions"
              ? "text-[#DFBA73]"
              : "text-gray-400 hover:text-white"
          }`}
        >
          Permissions
          {activeTab === "permissions" && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#DFBA73]" />
          )}
        </button>

        <button
          onClick={() => setActiveTab("notifications")}
          className={`pb-3 font-semibold transition-all relative whitespace-nowrap cursor-pointer ${
            activeTab === "notifications"
              ? "text-[#DFBA73]"
              : "text-gray-400 hover:text-white"
          }`}
        >
          Notifications
          {activeTab === "notifications" && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#DFBA73]" />
          )}
        </button>
      </div>

      {/* Tab: General Settings (matching design image bottom-right screen) */}
      {activeTab === "general" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Box: General Settings Form (7 cols) */}
          <div className="lg:col-span-7 bg-[#0D121B] border border-[#1C2433] rounded-2xl p-6 sm:p-7 shadow-xl">
            <h2 className="text-base font-bold text-white mb-6">
              General Settings
            </h2>

            {saveSuccess && (
              <div className="mb-6 p-3.5 rounded-xl bg-emerald-950/40 border border-emerald-800/60 text-emerald-200 text-xs flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400" />
                <span>Settings have been updated successfully!</span>
              </div>
            )}

            <form onSubmit={handleSave} className="space-y-5">
              {/* Company Name */}
              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                  Company Name
                </label>
                <input
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  className="w-full bg-[#111723] border border-[#212B3D] focus:border-[#DFBA73] rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white placeholder-gray-500 outline-none transition-colors"
                />
              </div>

              {/* Support Email */}
              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                  Support Email
                </label>
                <input
                  type="email"
                  value={supportEmail}
                  onChange={(e) => setSupportEmail(e.target.value)}
                  className="w-full bg-[#111723] border border-[#212B3D] focus:border-[#DFBA73] rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white placeholder-gray-500 outline-none transition-colors"
                />
              </div>

              {/* Phone Number */}
              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                  Phone Number
                </label>
                <input
                  type="text"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="w-full bg-[#111723] border border-[#212B3D] focus:border-[#DFBA73] rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white placeholder-gray-500 outline-none transition-colors"
                />
              </div>

              {/* Language Default */}
              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                  Language Default
                </label>
                <select
                  value={languageDefault}
                  onChange={(e) => setLanguageDefault(e.target.value)}
                  className="w-full bg-[#111723] border border-[#212B3D] focus:border-[#DFBA73] rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white outline-none cursor-pointer"
                >
                  <option value="English">English</option>
                  <option value="German">German (Deutsch)</option>
                  <option value="Arabic">Arabic (العربية)</option>
                </select>
              </div>

              {/* Save Changes Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="cursor-pointer px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#DFBA73] via-[#D5AC5E] to-[#B88E3E] text-[#0A0D14] font-bold text-xs sm:text-sm shadow-md hover:brightness-105 active:scale-[0.99] transition-all"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>

          {/* Right Box: Logo Settings (5 cols) */}
          <div className="lg:col-span-5 bg-[#0D121B] border border-[#1C2433] rounded-2xl p-6 sm:p-7 shadow-xl">
            <h2 className="text-base font-bold text-white mb-6">
              Logo Settings
            </h2>

            {/* Logo Preview Card */}
            <div className="w-full h-44 rounded-xl bg-[#090C12] border border-[#1C2433] flex items-center justify-center p-6 mb-4 relative overflow-hidden">
              {customLogoUrl ? (
                <div className="relative w-48 h-20">
                  <Image
                    src={customLogoUrl}
                    alt="Custom Logo"
                    fill
                    className="object-contain"
                    unoptimized
                  />
                </div>
              ) : (
                <AdminBrandLogo size="lg" />
              )}
            </div>

            <button
              type="button"
              onClick={() => {
                setTempLogoUrl(customLogoUrl);
                setLogoModalOpen(true);
              }}
              className="w-full cursor-pointer py-2.5 rounded-xl bg-[#141B26] border border-[#222C3E] text-xs font-semibold text-gray-200 hover:text-white hover:bg-[#1A2333] transition-colors"
            >
              Change Logo
            </button>

            <p className="text-[11px] text-gray-500 text-center mt-2">
              Recommended size: 200x80px
            </p>
          </div>
        </div>
      )}

      {/* Tab: Logo & Branding */}
      {activeTab === "branding" && (
        <div className="bg-[#0D121B] border border-[#1C2433] rounded-2xl p-6 space-y-4">
          <h2 className="text-base font-bold text-white">Brand Colors & Assets</h2>
          <p className="text-xs text-gray-400">
            First Class Drive executive gold and obsidian metallic themes.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
            <div className="p-4 rounded-xl bg-[#080A0C] border border-[#222C3E] text-center">
              <div className="w-8 h-8 rounded-full bg-[#080A0C] border border-white/20 mx-auto mb-2" />
              <p className="text-xs font-bold text-white">Obsidian Black</p>
              <p className="text-[10px] text-gray-400">#080A0C</p>
            </div>
            <div className="p-4 rounded-xl bg-[#080A0C] border border-[#222C3E] text-center">
              <div className="w-8 h-8 rounded-full bg-[#DFBA73] mx-auto mb-2" />
              <p className="text-xs font-bold text-white">Champagne Gold</p>
              <p className="text-[10px] text-gray-400">#DFBA73</p>
            </div>
            <div className="p-4 rounded-xl bg-[#080A0C] border border-[#222C3E] text-center">
              <div className="w-8 h-8 rounded-full bg-[#14171C] border border-white/20 mx-auto mb-2" />
              <p className="text-xs font-bold text-white">Graphite Soft</p>
              <p className="text-[10px] text-gray-400">#14171C</p>
            </div>
            <div className="p-4 rounded-xl bg-[#080A0C] border border-[#222C3E] text-center">
              <div className="w-8 h-8 rounded-full bg-[#FFFFFF] mx-auto mb-2" />
              <p className="text-xs font-bold text-white">Pure Platinum</p>
              <p className="text-[10px] text-gray-400">#FFFFFF</p>
            </div>
          </div>
        </div>
      )}

      {/* Tab: Permissions */}
      {activeTab === "permissions" && (
        <div className="bg-[#0D121B] border border-[#1C2433] rounded-2xl p-6 space-y-4">
          <h2 className="text-base font-bold text-white">Administrator Permissions</h2>
          <p className="text-xs text-gray-400">
            Control which accounts have booking dispatch, pricing edit, and database permissions.
          </p>
          <div className="p-4 rounded-xl bg-[#111723] border border-[#212B3D] flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-white">Master Admin Privileges</p>
              <p className="text-[11px] text-gray-400">office@firstclassdrive.at</p>
            </div>
            <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-[#0D2818] text-[#34D399] border border-[#059669]/30">
              Superadmin
            </span>
          </div>
        </div>
      )}

      {/* Tab: Notifications */}
      {activeTab === "notifications" && (
        <div className="bg-[#0D121B] border border-[#1C2433] rounded-2xl p-6 space-y-4">
          <h2 className="text-base font-bold text-white">Alert Preferences</h2>
          <p className="text-xs text-gray-400">
            Configure how you receive new booking alerts and rental inquiries.
          </p>
          <div className="space-y-3">
            <label className="flex items-center justify-between p-3.5 rounded-xl bg-[#111723] border border-[#212B3D] cursor-pointer">
              <div>
                <p className="text-xs font-bold text-white">WhatsApp Instant Dispatch</p>
                <p className="text-[11px] text-gray-400">Send pre-filled WhatsApp inquiries to dispatch phone</p>
              </div>
              <input type="checkbox" defaultChecked className="accent-[#DFBA73] w-4 h-4" />
            </label>
            <label className="flex items-center justify-between p-3.5 rounded-xl bg-[#111723] border border-[#212B3D] cursor-pointer">
              <div>
                <p className="text-xs font-bold text-white">Resend Email Alerts</p>
                <p className="text-[11px] text-gray-400">Dispatch copies to office@firstclassdrive.at</p>
              </div>
              <input type="checkbox" defaultChecked className="accent-[#DFBA73] w-4 h-4" />
            </label>
          </div>
        </div>
      )}

      {/* Change Logo Modal Dialog */}
      {logoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="w-full max-w-lg bg-[#0F141E] border border-[#222C3E] rounded-2xl shadow-2xl p-6 relative">
            <button
              onClick={() => setLogoModalOpen(false)}
              className="absolute top-5 right-5 text-gray-400 hover:text-white p-1 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-1">
              <div className="w-10 h-10 rounded-xl bg-[#241B0E] border border-[#DFBA73]/30 flex items-center justify-center">
                <ImageIcon className="w-5 h-5 text-[#DFBA73]" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Update Brand Logo</h3>
                <p className="text-xs text-gray-400">
                  Select a preset logo or upload a custom brand image
                </p>
              </div>
            </div>

            <div className="mt-5 space-y-4">
              {/* Live Preview Box */}
              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                  Live Preview
                </label>
                <div className="w-full h-32 rounded-xl bg-[#090C12] border border-[#222C3E] flex items-center justify-center p-4 relative overflow-hidden">
                  {selectedVariant === "custom" && tempLogoUrl ? (
                    <div className="relative w-48 h-16">
                      <Image
                        src={tempLogoUrl}
                        alt="Preview"
                        fill
                        className="object-contain"
                        unoptimized
                      />
                    </div>
                  ) : (
                    <AdminBrandLogo size="lg" />
                  )}
                </div>
              </div>

              {/* Upload Dropzone */}
              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                  Upload Logo File (PNG, SVG, or JPG)
                </label>
                <input
                  type="file"
                  ref={fileInputRef}
                  accept="image/png, image/svg+xml, image/jpeg"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full border-2 border-dashed border-[#263246] hover:border-[#DFBA73] rounded-xl p-5 flex flex-col items-center justify-center gap-2 text-center bg-[#111724]/60 hover:bg-[#141B28] transition-all cursor-pointer group"
                >
                  <Upload className="w-6 h-6 text-gray-400 group-hover:text-[#DFBA73] transition-colors" />
                  <span className="text-xs font-semibold text-gray-200">
                    Click to browse or drag and drop image here
                  </span>
                  <span className="text-[11px] text-gray-500">
                    Recommended resolution: 200 x 80px · Transparent PNG or SVG preferred
                  </span>
                </button>
              </div>

              {/* Quick Preset Selector */}
              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                  Or Choose Brand Presets
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedVariant("default");
                      setTempLogoUrl(null);
                    }}
                    className={`p-3 rounded-xl border text-left text-xs transition-all cursor-pointer ${
                      selectedVariant === "default"
                        ? "bg-[#182133] border-[#DFBA73] text-white"
                        : "bg-[#111724] border-[#222C3E] text-gray-400 hover:text-white"
                    }`}
                  >
                    <p className="font-semibold text-white">Default Mountain Logo</p>
                    <p className="text-[11px] text-gray-400 mt-0.5">Alpine Peak Vector (White)</p>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setSelectedVariant("custom");
                      setTempLogoUrl("/images/logo.png");
                    }}
                    className={`p-3 rounded-xl border text-left text-xs transition-all cursor-pointer ${
                      selectedVariant === "custom" && tempLogoUrl === "/images/logo.png"
                        ? "bg-[#182133] border-[#DFBA73] text-white"
                        : "bg-[#111724] border-[#222C3E] text-gray-400 hover:text-white"
                    }`}
                  >
                    <p className="font-semibold text-white">High-Res PNG Logo</p>
                    <p className="text-[11px] text-gray-400 mt-0.5">Asset from /images/logo.png</p>
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 flex items-center justify-end gap-3 border-t border-[#1C2433]">
                <button
                  type="button"
                  onClick={() => setLogoModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs text-gray-300 hover:text-white hover:bg-[#182133] transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleApplyLogo}
                  className="cursor-pointer px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#DFBA73] via-[#D5AC5E] to-[#B88E3E] text-[#0A0D14] font-bold text-xs shadow-md hover:brightness-105 active:scale-[0.99] transition-all"
                >
                  Apply Logo
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
