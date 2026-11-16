"use client";

import React, { useState } from "react";
import {
  Users,
  UserPlus,
  Shield,
  Mail,
  Phone,
  MoreHorizontal,
  X,
  Check,
  Trash2,
  Lock,
} from "lucide-react";

interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: string;
  status: "Active" | "Pending" | "Inactive";
  phone: string;
  initials: string;
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState<TeamMember[]>([
    {
      id: "u1",
      name: "Managing Director",
      email: "office@firstclassdrive.at",
      role: "Super Admin",
      status: "Active",
      phone: "+43 664 123 4567",
      initials: "MD",
    },
    {
      id: "u2",
      name: "Lead Chauffeur Dispatch",
      email: "dispatch@firstclassdrive.at",
      role: "Operations Manager",
      status: "Active",
      phone: "+43 654 212 2456",
      initials: "CD",
    },
    {
      id: "u3",
      name: "Accounting & Reservations",
      email: "reservations@firstclassdrive.at",
      role: "Billing & Invoicing",
      status: "Active",
      phone: "+43 662 123456",
      initials: "AR",
    },
  ]);

  const [modalOpen, setModalOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<TeamMember | null>(null);
  const [successBanner, setSuccessBanner] = useState<string | null>(null);

  // Form states
  const [formName, setFormName] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formPhone, setFormPhone] = useState("");
  const [formRole, setFormRole] = useState("Operations Manager");

  const handleInvite = (e: React.FormEvent) => {
    e.preventDefault();

    const initials = formName
      .trim()
      .split(" ")
      .map((n) => n[0])
      .join("")
      .substring(0, 2)
      .toUpperCase() || "TM";

    const newMember: TeamMember = {
      id: `u-${Date.now()}`,
      name: formName,
      email: formEmail,
      phone: formPhone || "+43 664 000 0000",
      role: formRole,
      status: "Active",
      initials,
    };

    setUsers((prev) => [...prev, newMember]);
    setModalOpen(false);
    setSuccessBanner(`Invitation sent to ${formEmail}!`);
    setTimeout(() => setSuccessBanner(null), 4000);

    // Reset form
    setFormName("");
    setFormEmail("");
    setFormPhone("");
    setFormRole("Operations Manager");
  };

  const confirmDeleteMember = () => {
    if (!deleteTarget) return;
    setUsers((prev) => prev.filter((u) => u.id !== deleteTarget.id));
    setSuccessBanner(`${deleteTarget.name} has been removed.`);
    setDeleteTarget(null);
    setTimeout(() => setSuccessBanner(null), 3000);
  };

  return (
    <div className="space-y-7">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
            Users & Team
          </h1>
          <p className="text-xs sm:text-sm text-[#9CA3AF] mt-1">
            Manage dispatchers, chauffeurs, and portal administrators
          </p>
        </div>

        <button
          onClick={() => setModalOpen(true)}
          className="cursor-pointer inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#DFBA73] via-[#D5AC5E] to-[#B88E3E] text-[#0A0D14] font-bold text-xs sm:text-sm shadow-md hover:brightness-105 active:scale-[0.99] transition-all select-none self-start sm:self-auto"
        >
          <UserPlus className="w-4 h-4 text-black stroke-[3]" />
          <span>Invite Member</span>
        </button>
      </div>

      {successBanner && (
        <div className="p-3.5 rounded-xl bg-emerald-950/40 border border-emerald-800/60 text-emerald-200 text-xs flex items-center gap-2">
          <Check className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{successBanner}</span>
        </div>
      )}

      {/* Users Table Card */}
      <div className="bg-[#0D121B] border border-[#1C2433] rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#1A2230] text-[12px] font-semibold text-[#8E97A6] uppercase tracking-wider bg-[#0B0F17]">
                <th className="py-4 px-6">Member</th>
                <th className="py-4 px-6">Role</th>
                <th className="py-4 px-6">Phone</th>
                <th className="py-4 px-6">Status</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#161D29] text-xs sm:text-sm text-gray-200">
              {users.map((u) => (
                <tr key={u.id} className="hover:bg-[#111723] transition-colors">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#DFBA73] to-[#99732B] text-black font-bold text-xs flex items-center justify-center shrink-0">
                        {u.initials}
                      </div>
                      <div>
                        <p className="font-semibold text-white">{u.name}</p>
                        <p className="text-[11px] text-gray-400">{u.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6 font-medium text-gray-300">
                    <span className="inline-flex items-center gap-1.5">
                      <Shield className="w-3.5 h-3.5 text-[#DFBA73]" />
                      {u.role}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-gray-400">{u.phone}</td>
                  <td className="py-4 px-6">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#0D2818] text-[#34D399] border border-[#059669]/30">
                      {u.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-right">
                    {u.id !== "u1" && (
                      <button
                        onClick={() => setDeleteTarget(u)}
                        title="Remove member"
                        className="text-gray-400 hover:text-red-400 p-1 transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Invite Member Modal Dialog */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="w-full max-w-md bg-[#0F141E] border border-[#222C3E] rounded-2xl shadow-2xl p-6 relative">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-5 right-5 text-gray-400 hover:text-white p-1 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-1">
              <div className="w-10 h-10 rounded-xl bg-[#241B0E] border border-[#DFBA73]/30 flex items-center justify-center">
                <UserPlus className="w-5 h-5 text-[#DFBA73]" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Invite Team Member</h3>
                <p className="text-xs text-gray-400">
                  Send onboarding link and configure permissions
                </p>
              </div>
            </div>

            <form onSubmit={handleInvite} className="space-y-4 mt-5">
              {/* Name */}
              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  placeholder="e.g. Johann Berger"
                  className="w-full bg-[#131926] border border-[#222C3E] focus:border-[#DFBA73] rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder-gray-500 outline-none"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                  Work Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="email"
                    required
                    value={formEmail}
                    onChange={(e) => setFormEmail(e.target.value)}
                    placeholder="johann@firstclassdrive.at"
                    className="w-full bg-[#131926] border border-[#222C3E] focus:border-[#DFBA73] rounded-xl pl-10 pr-3.5 py-2.5 text-xs sm:text-sm text-white placeholder-gray-500 outline-none"
                  />
                </div>
              </div>

              {/* Phone */}
              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                  Phone Number
                </label>
                <div className="relative">
                  <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="tel"
                    required
                    value={formPhone}
                    onChange={(e) => setFormPhone(e.target.value)}
                    placeholder="+43 664 123 4567"
                    className="w-full bg-[#131926] border border-[#222C3E] focus:border-[#DFBA73] rounded-xl pl-10 pr-3.5 py-2.5 text-xs sm:text-sm text-white placeholder-gray-500 outline-none"
                  />
                </div>
              </div>

              {/* Role */}
              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                  Role & Permissions
                </label>
                <select
                  value={formRole}
                  onChange={(e) => setFormRole(e.target.value)}
                  className="w-full bg-[#131926] border border-[#222C3E] focus:border-[#DFBA73] rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white outline-none cursor-pointer"
                >
                  <option value="Super Admin">Super Admin (Full Portal Control)</option>
                  <option value="Operations Manager">Operations Manager (Bookings & Pricing)</option>
                  <option value="Lead Dispatcher">Lead Dispatcher (Bookings Dispatch)</option>
                  <option value="Billing & Invoicing">Billing & Invoicing (Financial Records)</option>
                  <option value="Chauffeur Driver">Chauffeur Driver (Trip View Only)</option>
                </select>
              </div>

              {/* Buttons */}
              <div className="pt-3 flex items-center justify-end gap-3 border-t border-[#1C2433]">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs text-gray-300 hover:text-white hover:bg-[#182133] transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="cursor-pointer px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#DFBA73] via-[#D5AC5E] to-[#B88E3E] text-[#0A0D14] font-bold text-xs shadow-md hover:brightness-105 active:scale-[0.99] transition-all"
                >
                  Send Invitation
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Member Confirmation Modal */}
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
                <h3 className="text-lg font-bold text-white">Remove Team Member</h3>
                <p className="text-xs text-gray-400">Revoke portal access permissions</p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#141B26] border border-[#20293B] my-4 space-y-1">
              <p className="text-sm font-bold text-white">{deleteTarget.name}</p>
              <p className="text-xs text-gray-400">{deleteTarget.email}</p>
              <p className="text-xs text-[#DFBA73] font-semibold mt-1">Role: {deleteTarget.role}</p>
            </div>

            <p className="text-xs text-gray-400 leading-relaxed mb-5">
              Are you sure you want to remove this member? They will immediately lose access to all dispatch and reservation management tools.
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
                onClick={confirmDeleteMember}
                className="cursor-pointer px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs shadow-lg shadow-red-950/40 active:scale-[0.99] transition-all flex items-center gap-2"
              >
                <Trash2 className="w-4 h-4" />
                <span>Confirm Removal</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
