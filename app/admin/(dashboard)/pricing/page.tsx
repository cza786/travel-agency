"use client";

import React, { useState, useEffect } from "react";
import {
  Plane,
  Car,
  Mountain,
  Briefcase,
  Users,
  Bike,
  Plus,
  Pencil,
  Trash2,
  X,
  ChevronLeft,
  ChevronRight,
  Check,
  RefreshCw,
} from "lucide-react";
import {
  PricingEntry,
  DEFAULT_PRICES,
  getLivePrices,
  updateLivePrice,
  deleteLivePrice,
} from "@/lib/pricing";

export default function AdminPricingPage() {
  const [prices, setPrices] = useState<PricingEntry[]>(DEFAULT_PRICES);
  const [activeTab, setActiveTab] = useState<
    "all" | "service" | "fixed_route" | "airport_route" | "km_rate"
  >("all");
  const [loading, setLoading] = useState(false);
  const [successNotice, setSuccessNotice] = useState<string | null>(null);

  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<PricingEntry | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<PricingEntry | null>(null);

  const [formService, setFormService] = useState("");
  const [formPrice, setFormPrice] = useState("");
  const [formCategory, setFormCategory] = useState<PricingEntry["category"]>("service");
  const [formStatus, setFormStatus] = useState<"Active" | "Inactive">("Active");
  const [formIcon, setFormIcon] = useState<PricingEntry["iconType"]>("car");

  const loadData = async () => {
    setLoading(true);
    const data = await getLivePrices();
    setPrices(data);
    setLoading(false);
  };

  useEffect(() => {
    loadData();

    const handleSync = (e: Event) => {
      const customEvent = e as CustomEvent<PricingEntry[]>;
      if (customEvent.detail) {
        setPrices(customEvent.detail);
      }
    };
    window.addEventListener("fcd_pricing_updated", handleSync);
    return () => window.removeEventListener("fcd_pricing_updated", handleSync);
  }, []);

  const openAddModal = () => {
    setEditingItem(null);
    setFormService("");
    setFormPrice("");
    setFormCategory("service");
    setFormStatus("Active");
    setFormIcon("car");
    setModalOpen(true);
  };

  const openEditModal = (item: PricingEntry) => {
    setEditingItem(item);
    setFormService(item.service);
    setFormPrice(item.price);
    setFormCategory(item.category);
    setFormStatus(item.status);
    setFormIcon(item.iconType);
    setModalOpen(true);
  };

  const confirmDeleteAction = async () => {
    if (!deleteTarget) return;
    await deleteLivePrice(deleteTarget.id);
    setPrices((prev) => prev.filter((p) => p.id !== deleteTarget.id));
    setSuccessNotice(`Tariff for "${deleteTarget.service}" deleted.`);
    setDeleteTarget(null);
    setTimeout(() => setSuccessNotice(null), 3000);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();

    // Extract numeric value
    const numeric = parseFloat(formPrice.replace(/[^0-9.]/g, "")) || 0;

    const entryToSave: PricingEntry = {
      id: editingItem ? editingItem.id : `price-${Date.now()}`,
      service: formService,
      price: formPrice,
      numericPrice: numeric,
      category: formCategory,
      status: formStatus,
      iconType: formIcon,
      unit: formCategory === "km_rate" ? "€ / km" : undefined,
    };

    await updateLivePrice(entryToSave);

    setPrices((prev) => {
      const exists = prev.some((p) => p.id === entryToSave.id);
      return exists
        ? prev.map((p) => (p.id === entryToSave.id ? entryToSave : p))
        : [...prev, entryToSave];
    });

    setModalOpen(false);
    setSuccessNotice(`Price for "${formService}" updated to ${formPrice} and synced live to website!`);
    setTimeout(() => setSuccessNotice(null), 4000);
  };

  const renderIcon = (type: PricingEntry["iconType"]) => {
    switch (type) {
      case "plane":
        return <Plane className="w-4 h-4 text-gray-300" />;
      case "car":
        return <Car className="w-4 h-4 text-gray-300" />;
      case "mountain":
        return <Mountain className="w-4 h-4 text-gray-300" />;
      case "briefcase":
        return <Briefcase className="w-4 h-4 text-gray-300" />;
      case "users":
        return <Users className="w-4 h-4 text-gray-300" />;
      case "bike":
        return <Bike className="w-4 h-4 text-gray-300" />;
    }
  };

  const filteredPrices = prices.filter((p) => {
    if (activeTab === "all") return true;
    return p.category === activeTab;
  });

  return (
    <div className="space-y-7">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
            Pricing Management
          </h1>
          <p className="text-xs sm:text-sm text-[#9CA3AF] mt-1">
            Manage your service prices · Synced in real time to all website pages
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={loadData}
            title="Refresh prices from database"
            className="p-2.5 rounded-xl bg-[#131926] border border-[#212B3D] text-gray-300 hover:text-white hover:bg-[#1A2233] transition-colors cursor-pointer"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin text-[#DFBA73]" : ""}`} />
          </button>

          <button
            onClick={openAddModal}
            className="cursor-pointer inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#DFBA73] via-[#D5AC5E] to-[#B88E3E] text-[#0A0D14] font-bold text-xs sm:text-sm shadow-md hover:brightness-105 active:scale-[0.99] transition-all select-none"
          >
            <Plus className="w-4 h-4 text-black stroke-[3]" />
            <span>Add New Price</span>
          </button>
        </div>
      </div>

      {successNotice && (
        <div className="p-3.5 rounded-xl bg-emerald-950/40 border border-emerald-800/60 text-emerald-200 text-xs flex items-center gap-2">
          <Check className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{successNotice}</span>
        </div>
      )}

      {/* Category Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 select-none">
        {[
          { key: "all", label: "All Prices" },
          { key: "service", label: "General Services" },
          { key: "fixed_route", label: "Main Fixed Routes" },
          { key: "airport_route", label: "Airport Routes" },
          { key: "km_rate", label: "Kilometer Tariffs" },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key as typeof activeTab)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap cursor-pointer transition-all ${
              activeTab === tab.key
                ? "bg-[#DFBA73] text-black shadow-sm"
                : "bg-[#0D121B] border border-[#1C2433] text-gray-400 hover:text-white hover:bg-[#141B26]"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Pricing Table Card */}
      <div className="bg-[#0D121B] border border-[#1C2433] rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#1A2230] text-[12px] font-semibold text-[#8E97A6] uppercase tracking-wider bg-[#0B0F17]">
                <th className="py-4 px-6">Service / Route</th>
                <th className="py-4 px-6">Category</th>
                <th className="py-4 px-6">Price</th>
                <th className="py-4 px-6">Status</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#161D29] text-xs sm:text-sm text-gray-200">
              {filteredPrices.map((item) => (
                <tr
                  key={item.id}
                  className="hover:bg-[#111723] transition-colors"
                >
                  {/* Service Icon & Name */}
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3.5">
                      <div className="w-9 h-9 rounded-xl bg-[#161D2A] border border-[#232D3F] flex items-center justify-center shrink-0">
                        {renderIcon(item.iconType)}
                      </div>
                      <div>
                        <span className="font-semibold text-white block">
                          {item.service}
                        </span>
                        <span className="text-[10px] text-gray-500 font-mono">
                          ID: {item.id}
                        </span>
                      </div>
                    </div>
                  </td>

                  {/* Category */}
                  <td className="py-4 px-6 text-xs text-gray-400 capitalize">
                    {item.category.replace("_", " ")}
                  </td>

                  {/* Price */}
                  <td className="py-4 px-6 font-semibold text-[#DFBA73]">
                    {item.price}
                  </td>

                  {/* Status Badge */}
                  <td className="py-4 px-6">
                    {item.status === "Active" ? (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#0D2818] text-[#34D399] border border-[#059669]/30">
                        Active
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#2D1214] text-[#F87171] border border-[#DC2626]/30">
                        Inactive
                      </span>
                    )}
                  </td>

                  {/* Actions (Gold Pencil + Red Trash) */}
                  <td className="py-4 px-6 text-right">
                    <div className="inline-flex items-center gap-3">
                      <button
                        onClick={() => openEditModal(item)}
                        title="Edit price"
                        className="text-[#DFBA73] hover:text-[#EFCA83] transition-colors cursor-pointer p-1"
                      >
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setDeleteTarget(item)}
                        title="Delete price"
                        className="text-[#EF4444] hover:text-[#F87171] transition-colors cursor-pointer p-1"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer with Pagination matching design */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-[#1A2230] text-xs text-gray-400 bg-[#0A0E16]">
          <span>
            Showing 1–{filteredPrices.length} of {filteredPrices.length} items
          </span>

          <div className="flex items-center gap-1.5">
            <button
              disabled
              className="w-7 h-7 rounded-lg bg-[#121824] border border-[#222C3E] flex items-center justify-center text-gray-600 cursor-not-allowed"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            <button className="w-7 h-7 rounded-lg bg-[#DFBA73] text-black font-bold flex items-center justify-center shadow-sm">
              1
            </button>
            <button
              disabled
              className="w-7 h-7 rounded-lg bg-[#121824] border border-[#222C3E] flex items-center justify-center text-gray-600 cursor-not-allowed"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Modal for Add / Edit Price */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="w-full max-w-md bg-[#0F141E] border border-[#222C3E] rounded-2xl shadow-2xl p-6 relative">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-5 right-5 text-gray-400 hover:text-white p-1 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-bold text-white mb-1">
              {editingItem ? "Edit Service Price" : "Add New Price Entry"}
            </h3>
            <p className="text-xs text-gray-400 mb-5">
              Updates will automatically sync across all website pages
            </p>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                  Service / Route Name
                </label>
                <input
                  type="text"
                  required
                  value={formService}
                  onChange={(e) => setFormService(e.target.value)}
                  placeholder="e.g. Airport Transfer or Salzburg → Zell am See"
                  className="w-full bg-[#131926] border border-[#222C3E] focus:border-[#DFBA73] rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder-gray-500 outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                    Price String
                  </label>
                  <input
                    type="text"
                    required
                    value={formPrice}
                    onChange={(e) => setFormPrice(e.target.value)}
                    placeholder="250 € or € 80.00"
                    className="w-full bg-[#131926] border border-[#222C3E] focus:border-[#DFBA73] rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder-gray-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                    Category
                  </label>
                  <select
                    value={formCategory}
                    onChange={(e) =>
                      setFormCategory(e.target.value as PricingEntry["category"])
                    }
                    className="w-full bg-[#131926] border border-[#222C3E] focus:border-[#DFBA73] rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white outline-none cursor-pointer"
                  >
                    <option value="service">General Service</option>
                    <option value="fixed_route">Main Fixed Route</option>
                    <option value="airport_route">Airport Route</option>
                    <option value="km_rate">Kilometer Rate</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                  Status
                </label>
                <select
                  value={formStatus}
                  onChange={(e) =>
                    setFormStatus(e.target.value as "Active" | "Inactive")
                  }
                  className="w-full bg-[#131926] border border-[#222C3E] focus:border-[#DFBA73] rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white outline-none cursor-pointer"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                  Service Icon
                </label>
                <div className="grid grid-cols-6 gap-2">
                  {(
                    ["plane", "car", "mountain", "briefcase", "users", "bike"] as PricingEntry["iconType"][]
                  ).map((iconKey) => (
                    <button
                      key={iconKey}
                      type="button"
                      onClick={() => setFormIcon(iconKey)}
                      className={`p-2.5 rounded-xl border flex items-center justify-center transition-all cursor-pointer ${
                        formIcon === iconKey
                          ? "bg-[#DFBA73] text-black border-[#DFBA73]"
                          : "bg-[#131926] border-[#222C3E] text-gray-400 hover:text-white"
                      }`}
                    >
                      {renderIcon(iconKey)}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-3 flex items-center justify-end gap-3 border-t border-[#1C2433]">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs text-gray-300 hover:text-white hover:bg-[#182133] cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="cursor-pointer px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#DFBA73] via-[#D5AC5E] to-[#B88E3E] text-[#0A0D14] font-bold text-xs shadow-md hover:brightness-105 active:scale-[0.99] transition-all"
                >
                  Save & Sync Price
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="w-full max-w-md bg-[#0F141E] border border-[#222C3E] rounded-2xl shadow-2xl p-6 relative">
            <button
              onClick={() => setDeleteTarget(null)}
              className="absolute top-5 right-5 text-gray-400 hover:text-white p-1 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3.5 mb-3">
              <div className="w-11 h-11 rounded-2xl bg-red-950/50 border border-red-800/60 flex items-center justify-center shrink-0">
                <Trash2 className="w-5 h-5 text-red-400" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Delete Price Tariff</h3>
                <p className="text-xs text-gray-400">Confirm permanent tariff removal</p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#141B26] border border-[#20293B] my-4 space-y-1">
              <p className="text-xs text-gray-400">Target Service / Route:</p>
              <p className="text-sm font-bold text-white">{deleteTarget.service}</p>
              <p className="text-xs font-semibold text-[#DFBA73] mt-1">Current Price: {deleteTarget.price}</p>
            </div>

            <p className="text-xs text-gray-400 leading-relaxed mb-5">
              Are you sure you want to delete this price tariff? This will immediately remove it from all website calculators and route listings.
            </p>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#1C2433]">
              <button
                type="button"
                onClick={() => setDeleteTarget(null)}
                className="px-4 py-2.5 rounded-xl text-xs font-semibold text-gray-300 hover:text-white hover:bg-[#182133] transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmDeleteAction}
                className="cursor-pointer px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs shadow-lg shadow-red-950/40 active:scale-[0.99] transition-all flex items-center gap-2"
              >
                <Trash2 className="w-4 h-4" />
                <span>Confirm Delete</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
