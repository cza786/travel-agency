"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Mail, Lock, Eye, EyeOff, Loader2 } from "lucide-react";
import { AdminBrandLogo } from "@/components/admin/AdminBrandLogo";
import { loginAdminAction } from "@/app/admin/actions/auth";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("admin@firstclassdrive.at");
  const [password, setPassword] = useState("admin123");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [forgotModalOpen, setForgotModalOpen] = useState(false);
  const [forgotSent, setForgotSent] = useState(false);
  const [resetEmail, setResetEmail] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const formData = new FormData();
      formData.set("email", email);
      formData.set("password", password);
      const res = await loginAdminAction(formData);

      if (res.success) {
        router.push("/admin");
        router.refresh();
      } else {
        setError(res.error || "Login failed. Please check credentials.");
      }
    } catch {
      setError("An unexpected error occurred during login.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex bg-[#090C12] text-white">
      {/* Left Column: Visual Showcase */}
      <div className="relative hidden lg:flex lg:w-1/2 min-h-screen overflow-hidden items-center justify-center bg-black">
        {/* Background Van & Mountain Image */}
        <Image
          src="/images/about-hero-van.jpg"
          alt="First Class Drive Executive Fleet"
          fill
          priority
          sizes="50vw"
          className="object-cover object-center filter brightness-90 contrast-105"
        />

        {/* Cinematic Vignette Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/70" />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#090C12]" />

        {/* Mountain Logo at Top Center */}
        <div className="absolute top-12 left-1/2 -translate-x-1/2 z-10">
          <AdminBrandLogo size="lg" />
        </div>

        {/* Bottom subtle quote / brand pill */}
        <div className="absolute bottom-10 left-12 right-12 z-10 flex items-center justify-between text-xs text-gray-400 border-t border-white/10 pt-4">
          <span>VIP Chauffeur & Transfers Zell am See</span>
          <span>Mercedes-Benz Luxury Fleet</span>
        </div>
      </div>

      {/* Right Column: Login Form */}
      <div className="w-full lg:w-1/2 min-h-screen flex flex-col justify-between p-8 sm:p-12 md:p-16 lg:p-20 xl:p-24 relative">
        {/* Mobile Header Logo */}
        <div className="lg:hidden flex justify-center pt-4 pb-8">
          <AdminBrandLogo size="md" />
        </div>

        {/* Center Content Form */}
        <div className="w-full max-w-md mx-auto my-auto py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-extrabold tracking-tight text-white mb-2">
              Welcome Back
            </h1>
            <p className="text-[#9CA3AF] text-sm">
              Sign in to your admin account
            </p>
          </div>

          {error && (
            <div className="mb-6 p-3.5 rounded-xl bg-red-950/50 border border-red-800/60 text-red-200 text-sm flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-red-400 shrink-0" />
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Field */}
            <div>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email Address"
                  className="w-full bg-[#111622] border border-[#21293B] focus:border-[#DFBA73] focus:ring-1 focus:ring-[#DFBA73] rounded-xl pl-11 pr-4 py-3.5 text-sm text-white placeholder:text-gray-500 transition-colors outline-none"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  className="w-full bg-[#111622] border border-[#21293B] focus:border-[#DFBA73] focus:ring-1 focus:ring-[#DFBA73] rounded-xl pl-11 pr-11 py-3.5 text-sm text-white placeholder:text-gray-500 transition-colors outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot Password Row */}
            <div className="flex items-center justify-between text-xs pt-1">
              <label className="flex items-center gap-2 cursor-pointer text-gray-300 hover:text-white select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded bg-[#111622] border-[#21293B] text-[#DFBA73] focus:ring-0 focus:ring-offset-0 cursor-pointer accent-[#DFBA73]"
                />
                <span>Remember Me</span>
              </label>

              <button
                type="button"
                onClick={() => {
                  setResetEmail(email);
                  setForgotSent(false);
                  setForgotModalOpen(true);
                }}
                className="text-[#DFBA73] hover:text-[#EFCA83] hover:underline font-medium transition-colors cursor-pointer"
              >
                Forgot Password?
              </button>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full cursor-pointer bg-gradient-to-r from-[#DFBA73] via-[#D5AC5E] to-[#B88E3E] text-[#0A0D14] font-bold text-sm py-3.5 px-6 rounded-xl shadow-lg shadow-amber-950/25 hover:brightness-105 active:scale-[0.99] transition-all flex items-center justify-center gap-2 disabled:opacity-70 mt-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-black" />
                  <span>Signing in...</span>
                </>
              ) : (
                "Sign In"
              )}
            </button>

            {/* Sign Up Hint */}
            <div className="text-center text-xs text-gray-400 pt-3">
              Don&apos;t have an account?{" "}
              <Link
                href="mailto:office@firstclassdrive.at?subject=Admin%20Account%20Request"
                className="text-[#DFBA73] hover:underline font-medium"
              >
                Sign Up
              </Link>
            </div>
          </form>
        </div>

        {/* Footer */}
        <div className="text-center text-xs text-gray-500 py-4">
          © 2025 First Class Drive. All rights reserved.
        </div>
      </div>

      {/* Forgot Password Modal */}
      {forgotModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-md bg-[#0F141E] border border-[#222C3E] rounded-2xl shadow-2xl p-6 relative">
            <button
              onClick={() => setForgotModalOpen(false)}
              className="absolute top-5 right-5 text-gray-400 hover:text-white p-1"
            >
              ✕
            </button>

            <h3 className="text-lg font-bold text-white mb-1">Reset Password</h3>
            <p className="text-xs text-gray-400 mb-5">
              Enter your admin email to receive secure recovery instructions.
            </p>

            {forgotSent ? (
              <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-800/60 text-emerald-200 text-xs space-y-2">
                <p className="font-semibold">Reset instructions dispatched!</p>
                <p className="text-emerald-300">
                  Please check your inbox at <span className="underline">{resetEmail}</span>.
                </p>
                <button
                  type="button"
                  onClick={() => setForgotModalOpen(false)}
                  className="mt-3 px-4 py-2 rounded-xl bg-[#DFBA73] text-black font-bold text-xs"
                >
                  Back to Login
                </button>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setForgotSent(true);
                }}
                className="space-y-4"
              >
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                    Admin Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={resetEmail}
                    onChange={(e) => setResetEmail(e.target.value)}
                    placeholder="admin@firstclassdrive.at"
                    className="w-full bg-[#131926] border border-[#222C3E] focus:border-[#DFBA73] rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-gray-500 outline-none"
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setForgotModalOpen(false)}
                    className="px-4 py-2 rounded-xl text-xs text-gray-300 hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#DFBA73] to-[#B88E3E] text-black font-bold text-xs shadow-md hover:brightness-105"
                  >
                    Send Reset Link
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
