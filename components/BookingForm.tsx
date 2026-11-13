"use client";

import React, { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import {
  Calendar as CalendarIcon,
  Clock,
  User,
  Mail,
  Phone,
  MapPin,
  ArrowLeftRight,
  Plane,
  MessageSquare,
  Users,
  Briefcase,
  CheckCircle2,
  ChevronRight,
  Loader2,
  Send,
  Car,
} from "lucide-react";
import { submitBookingInquiry } from "@/app/actions/booking";
import { BookingFormData } from "@/lib/bookingSchema";
import { WhatsAppIcon } from "./WhatsAppIcon";

interface BookingFormProps {
  initialPickup?: string;
  initialDropoff?: string;
  onSuccess?: () => void;
}

export function BookingForm({ initialPickup = "", initialDropoff = "", onSuccess }: BookingFormProps) {
  const t = useTranslations("booking");
  const tCommon = useTranslations("common");
  const locale = useLocale();

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [confirmedData, setConfirmedData] = useState<{
    referenceId: string;
    whatsappUrl?: string;
  } | null>(null);

  // Form states
  const [formData, setFormData] = useState<BookingFormData>({
    fullName: "",
    email: "",
    phone: "",
    pickup: initialPickup,
    dropoff: initialDropoff,
    date: "",
    time: "",
    flightNumber: "",
    passengers: 2,
    luggage: 2,
    vehicle: "Mercedes-Benz V-Klasse VIP",
    notes: "",
    locale: locale,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "passengers" || name === "luggage" ? parseInt(value) || 0 : value,
    }));
  };

  const handleSwapAddresses = () => {
    setFormData((prev) => ({
      ...prev,
      pickup: prev.dropoff,
      dropoff: prev.pickup,
    }));
  };

  const validateStep1 = () => {
    if (!formData.pickup || !formData.dropoff || !formData.date || !formData.time) {
      setErrorMessage(t("validationError"));
      return false;
    }
    setErrorMessage(null);
    return true;
  };

  const validateStep2 = () => {
    if (!formData.fullName || !formData.email || !formData.phone) {
      setErrorMessage(t("validationError"));
      return false;
    }
    if (!formData.email.includes("@")) {
      setErrorMessage("Bitte gültige E-Mail eingeben / Please enter a valid email");
      return false;
    }
    setErrorMessage(null);
    return true;
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!validateStep1() || !validateStep2()) {
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const res = await submitBookingInquiry(formData);
      if (res.success && res.referenceId) {
        setConfirmedData({
          referenceId: res.referenceId,
          whatsappUrl: res.whatsappUrl,
        });
        setStep(3);
        if (onSuccess) onSuccess();
      } else {
        setErrorMessage(res.error || "Ein Fehler ist aufgetreten.");
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Submission failed";
      setErrorMessage(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  // If successfully booked
  if (confirmedData) {
    return (
      <div className="bg-graphite rounded-2xl sm:rounded-3xl border border-hairline p-6 sm:p-10 text-center shadow-2xl">
        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto mb-4 sm:mb-6">
          <CheckCircle2 className="w-8 h-8 sm:w-10 sm:h-10 text-emerald-400" strokeWidth={1.5} />
        </div>

        <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2">
          {t("successTitle")}
        </h3>
        <p className="text-xs sm:text-sm text-silver-muted max-w-md mx-auto mb-6 sm:mb-8">
          {t("successDesc")}
        </p>

        {/* Reference ID card */}
        <div className="bg-obsidian border border-hairline rounded-2xl p-4 sm:p-6 max-w-md mx-auto mb-6 sm:mb-8 shadow-inner">
          <div className="text-[11px] sm:text-xs uppercase tracking-wider text-silver-muted mb-1">
            {t("referenceIdLabel")}
          </div>
          <div className="text-xl sm:text-2xl font-mono font-bold text-platinum-light tracking-wider">
            {confirmedData.referenceId}
          </div>
          <div className="text-xs sm:text-sm text-platinum-dark mt-3 border-t border-hairline/60 pt-3 flex justify-between items-center">
            <span className="truncate max-w-[45%] font-medium text-white">{formData.pickup}</span>
            <span className="text-silver-muted px-2">➔</span>
            <span className="truncate max-w-[45%] font-medium text-white">{formData.dropoff}</span>
          </div>
          <div className="text-[11px] sm:text-xs text-silver-muted mt-2">
            {formData.date} · {formData.time} {t("timeSuffix")} · {formData.passengers} {t("paxUnit")} · {formData.vehicle}
          </div>
        </div>

        {/* Actions - Equalized grid with authentic WhatsApp icon */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-md mx-auto w-full">
          {confirmedData.whatsappUrl && (
            <a
              href={confirmedData.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-3 sm:py-3.5 px-4 rounded-xl bg-whatsapp hover:bg-whatsapp/90 text-black font-semibold text-xs sm:text-sm transition-all shadow-lg min-h-[46px] sm:min-h-[48px]"
            >
              <WhatsAppIcon className="w-4 h-4 shrink-0 fill-current" />
              <span>{t("whatsappDirect")}</span>
            </a>
          )}

          <button
            type="button"
            onClick={() => {
              setConfirmedData(null);
              setStep(1);
            }}
            className="w-full flex items-center justify-center gap-2 py-3 sm:py-3.5 px-4 rounded-xl bg-graphite-elevated hover:bg-hairline text-platinum-mid hover:text-white text-xs sm:text-sm font-semibold border border-hairline transition-colors min-h-[46px] sm:min-h-[48px]"
          >
            {t("anotherBooking")}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-graphite rounded-2xl sm:rounded-3xl border border-hairline p-5 sm:p-8 md:p-9 shadow-2xl relative overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-3.5 mb-2">
        <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-obsidian border border-hairline flex items-center justify-center shrink-0">
          <CalendarIcon className="w-5 h-5 text-platinum-light" strokeWidth={1.5} />
        </div>
        <div>
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-white tracking-tight">
            {t("title")}
          </h2>
          <p className="text-xs sm:text-sm text-silver-muted">
            {t("subtitle")}
          </p>
        </div>
      </div>

      {/* Step Progress Bar matching Screenshot 3 */}
      <div className="my-6 border-y border-hairline/60 py-4 sm:py-5">
        <div className="relative flex items-center justify-between max-w-sm sm:max-w-md mx-auto">
          {/* Connector Line */}
          <div className="absolute top-1/2 left-8 right-8 -translate-y-1/2 h-[1px] bg-hairline z-0" />

          {/* Step 1 */}
          <button
            type="button"
            onClick={() => setStep(1)}
            className="relative z-10 flex flex-col items-center group cursor-pointer"
          >
            <div
              className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs sm:text-sm font-bold transition-all ${
                step === 1
                  ? "bg-white text-obsidian ring-4 ring-white/10"
                  : step > 1
                  ? "bg-platinum-dark text-obsidian"
                  : "bg-obsidian border border-hairline text-silver-muted"
              }`}
            >
              1
            </div>
            <span
              className={`text-[11px] sm:text-xs mt-1 font-medium ${
                step === 1 ? "text-platinum-light font-semibold" : "text-silver-muted"
              }`}
            >
              {t("step1")}
            </span>
          </button>

          {/* Step 2 */}
          <button
            type="button"
            onClick={() => {
              if (validateStep1()) setStep(2);
            }}
            className="relative z-10 flex flex-col items-center group cursor-pointer"
          >
            <div
              className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs sm:text-sm font-bold transition-all ${
                step === 2
                  ? "bg-white text-obsidian ring-4 ring-white/10"
                  : step > 2
                  ? "bg-platinum-dark text-obsidian"
                  : "bg-obsidian border border-hairline text-silver-muted"
              }`}
            >
              2
            </div>
            <span
              className={`text-[11px] sm:text-xs mt-1 font-medium ${
                step === 2 ? "text-platinum-light font-semibold" : "text-silver-muted"
              }`}
            >
              {t("step2")}
            </span>
          </button>

          {/* Step 3 */}
          <button
            type="button"
            onClick={() => {
              if (validateStep1() && validateStep2()) setStep(3);
            }}
            className="relative z-10 flex flex-col items-center group cursor-pointer"
          >
            <div
              className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs sm:text-sm font-bold transition-all ${
                step === 3
                  ? "bg-white text-obsidian ring-4 ring-white/10"
                  : "bg-obsidian border border-hairline text-silver-muted"
              }`}
            >
              3
            </div>
            <span
              className={`text-[11px] sm:text-xs mt-1 font-medium ${
                step === 3 ? "text-platinum-light font-semibold" : "text-silver-muted"
              }`}
            >
              {t("step3")}
            </span>
          </button>
        </div>
      </div>

      {errorMessage && (
        <div className="mb-5 p-3.5 rounded-xl bg-red-950/40 border border-red-800/60 text-red-200 text-xs sm:text-sm flex items-center gap-2">
          <span>⚠️</span>
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Form Steps */}
      <form onSubmit={(e) => e.preventDefault()} className="space-y-4 sm:space-y-5">
        {/* STEP 1: Trip Details */}
        {step === 1 && (
          <div className="space-y-4 sm:space-y-5 animate-in fade-in duration-200">
            {/* Pickup & Dropoff with Responsive Layout & Swap Button */}
            <div className="space-y-2 sm:space-y-0 sm:grid sm:grid-cols-[1fr_auto_1fr] sm:items-center sm:gap-2">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-silver-muted">
                  <MapPin className="w-4 h-4" strokeWidth={1.5} />
                </div>
                <input
                  type="text"
                  name="pickup"
                  value={formData.pickup}
                  onChange={handleChange}
                  placeholder={`${t("pickup")} *`}
                  required
                  className="w-full pl-10 pr-4 py-3 sm:py-3.5 bg-obsidian border border-hairline rounded-xl text-base sm:text-sm text-platinum-light placeholder:text-silver-muted focus:border-platinum-mid focus:outline-none transition-colors"
                />
              </div>

              {/* Swap Button (Vertical on mobile, horizontal on tablet/desktop) */}
              <div className="flex justify-center -my-1 sm:my-0 relative z-10">
                <button
                  type="button"
                  onClick={handleSwapAddresses}
                  className="p-2 rounded-full bg-graphite-elevated border border-hairline text-silver-muted hover:text-white hover:border-platinum-mid transition-all shadow-md shrink-0"
                  title={t("swap")}
                >
                  <ArrowLeftRight className="w-4 h-4 rotate-90 sm:rotate-0" strokeWidth={1.5} />
                </button>
              </div>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-silver-muted">
                  <MapPin className="w-4 h-4" strokeWidth={1.5} />
                </div>
                <input
                  type="text"
                  name="dropoff"
                  value={formData.dropoff}
                  onChange={handleChange}
                  placeholder={`${t("dropoff")} *`}
                  required
                  className="w-full pl-10 pr-4 py-3 sm:py-3.5 bg-obsidian border border-hairline rounded-xl text-base sm:text-sm text-platinum-light placeholder:text-silver-muted focus:border-platinum-mid focus:outline-none transition-colors"
                />
              </div>
            </div>

            {/* Date, Time & Flight Number (Responsive: 2-col on mobile, 3-col on tablet/desktop) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-silver-muted">
                  <CalendarIcon className="w-4 h-4" strokeWidth={1.5} />
                </div>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-3 py-3 sm:py-3.5 bg-obsidian border border-hairline rounded-xl text-base sm:text-sm text-platinum-light focus:border-platinum-mid focus:outline-none transition-colors"
                />
              </div>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-silver-muted">
                  <Clock className="w-4 h-4" strokeWidth={1.5} />
                </div>
                <input
                  type="time"
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-3 py-3 sm:py-3.5 bg-obsidian border border-hairline rounded-xl text-base sm:text-sm text-platinum-light focus:border-platinum-mid focus:outline-none transition-colors"
                />
              </div>

              {/* Flight Number */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-silver-muted">
                  <Plane className="w-4 h-4" strokeWidth={1.5} />
                </div>
                <input
                  type="text"
                  name="flightNumber"
                  value={formData.flightNumber}
                  onChange={handleChange}
                  placeholder={t("flightNumber")}
                  className="w-full pl-10 pr-4 py-3 sm:py-3.5 bg-obsidian border border-hairline rounded-xl text-base sm:text-sm text-platinum-light placeholder:text-silver-muted focus:border-platinum-mid focus:outline-none transition-colors"
                />
              </div>
            </div>

            {/* Passengers & Luggage */}
            <div className="grid grid-cols-2 gap-3 pt-1">
              <div className="flex items-center justify-between px-3.5 py-3 bg-obsidian border border-hairline rounded-xl">
                <div className="flex items-center gap-2 text-xs sm:text-sm text-silver-muted">
                  <Users className="w-4 h-4" strokeWidth={1.5} />
                  <span>{t("passengers")}</span>
                </div>
                <select
                  name="passengers"
                  value={formData.passengers}
                  onChange={handleChange}
                  className="bg-transparent text-platinum-light text-xs sm:text-sm font-semibold focus:outline-none cursor-pointer"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                    <option key={num} value={num} className="bg-obsidian text-white">
                      {num} {num === 1 ? t("personSingle") : t("personPlural")}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center justify-between px-3.5 py-3 bg-obsidian border border-hairline rounded-xl">
                <div className="flex items-center gap-2 text-xs sm:text-sm text-silver-muted">
                  <Briefcase className="w-4 h-4" strokeWidth={1.5} />
                  <span>{t("luggage")}</span>
                </div>
                <select
                  name="luggage"
                  value={formData.luggage}
                  onChange={handleChange}
                  className="bg-transparent text-platinum-light text-xs sm:text-sm font-semibold focus:outline-none cursor-pointer"
                >
                  {[0, 1, 2, 3, 4, 5, 6, 8, 10, 12].map((num) => (
                    <option key={num} value={num} className="bg-obsidian text-white">
                      {num} {t("luggageUnit")}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Vehicle Selection */}
            <div className="space-y-1.5 pt-1">
              <label className="text-[11px] sm:text-xs text-silver-muted flex items-center gap-1.5">
                <Car className="w-3.5 h-3.5 text-platinum-mid" strokeWidth={1.5} />
                <span>{t("vehicle")}</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <button
                  type="button"
                  onClick={() => setFormData((p) => ({ ...p, vehicle: "Mercedes-Benz V-Klasse VIP" }))}
                  className={`p-3.5 rounded-xl border text-left rtl:text-right transition-all ${
                    formData.vehicle.includes("V-Klasse")
                      ? "bg-graphite-elevated border-platinum-mid text-white shadow-md"
                      : "bg-obsidian border-hairline text-silver-muted hover:border-hairline hover:text-platinum-mid"
                  }`}
                >
                  <div className="text-xs sm:text-sm font-semibold text-platinum-light">Mercedes V-Klasse VIP</div>
                  <div className="text-[11px] text-silver-muted">{t("vClassCapacity")}</div>
                </button>

                <button
                  type="button"
                  onClick={() => setFormData((p) => ({ ...p, vehicle: "Mercedes-Benz S-Klasse / E-Klasse" }))}
                  className={`p-3.5 rounded-xl border text-left rtl:text-right transition-all ${
                    formData.vehicle.includes("S-Klasse")
                      ? "bg-graphite-elevated border-platinum-mid text-white shadow-md"
                      : "bg-obsidian border-hairline text-silver-muted hover:border-hairline hover:text-platinum-mid"
                  }`}
                >
                  <div className="text-xs sm:text-sm font-semibold text-platinum-light">Mercedes S- / E-Klasse</div>
                  <div className="text-[11px] text-silver-muted">{t("sClassCapacity")}</div>
                </button>
              </div>
            </div>

            {/* Next Button */}
            <button
              type="button"
              onClick={() => {
                if (validateStep1()) setStep(2);
              }}
              className="w-full mt-4 flex items-center justify-center gap-2 py-3.5 sm:py-4 px-6 rounded-xl bg-silver-metallic text-obsidian font-bold text-xs sm:text-sm uppercase tracking-wider shadow-lg hover:brightness-105 active:scale-[0.99] transition-all"
            >
              <span>{tCommon("next")}: {t("step2")}</span>
              <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" strokeWidth={1.5} />
            </button>
          </div>
        )}

        {/* STEP 2: Contact Details */}
        {step === 2 && (
          <div className="space-y-4 sm:space-y-5 animate-in fade-in duration-200">
            {/* Contact Details Grid (Responsive: 1 col on mobile, 3 cols on tablet/desktop) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {/* Full Name */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-silver-muted">
                  <User className="w-4 h-4" strokeWidth={1.5} />
                </div>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder={`${t("fullName")} *`}
                  required
                  className="w-full pl-10 pr-4 py-3 sm:py-3.5 bg-obsidian border border-hairline rounded-xl text-base sm:text-sm text-platinum-light placeholder:text-silver-muted focus:border-platinum-mid focus:outline-none transition-colors"
                />
              </div>

              {/* Email */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-silver-muted">
                  <Mail className="w-4 h-4" strokeWidth={1.5} />
                </div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder={`${t("email")} *`}
                  required
                  className="w-full pl-10 pr-4 py-3 sm:py-3.5 bg-obsidian border border-hairline rounded-xl text-base sm:text-sm text-platinum-light placeholder:text-silver-muted focus:border-platinum-mid focus:outline-none transition-colors"
                />
              </div>

              {/* Phone */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-silver-muted">
                  <Phone className="w-4 h-4" strokeWidth={1.5} />
                </div>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder={`${t("phone")} *`}
                  required
                  className="w-full pl-10 pr-4 py-3 sm:py-3.5 bg-obsidian border border-hairline rounded-xl text-base sm:text-sm text-platinum-light placeholder:text-silver-muted focus:border-platinum-mid focus:outline-none transition-colors"
                />
              </div>
            </div>

            {/* Notes / Special Requests */}
            <div className="space-y-1.5">
              <div className="flex items-center gap-2 text-xs sm:text-sm text-silver-muted px-1">
                <MessageSquare className="w-4 h-4" strokeWidth={1.5} />
                <span>{t("notes")}</span>
              </div>
              <textarea
                name="notes"
                rows={3}
                value={formData.notes}
                onChange={handleChange}
                placeholder={t("notesPlaceholder")}
                className="w-full p-3.5 bg-obsidian border border-hairline rounded-xl text-base sm:text-sm text-platinum-light placeholder:text-silver-muted/80 focus:border-platinum-mid focus:outline-none transition-colors resize-none"
              />
            </div>

            {/* Back & Next Navigation */}
            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="w-1/3 py-3.5 sm:py-4 px-4 rounded-xl bg-obsidian border border-hairline text-platinum-mid hover:text-white text-xs sm:text-sm font-semibold transition-colors"
              >
                {tCommon("back")}
              </button>
              <button
                type="button"
                onClick={() => {
                  if (validateStep2()) setStep(3);
                }}
                className="w-2/3 flex items-center justify-center gap-2 py-3.5 sm:py-4 px-6 rounded-xl bg-silver-metallic text-obsidian font-bold text-xs sm:text-sm uppercase tracking-wider shadow-lg hover:brightness-105 active:scale-[0.99] transition-all"
              >
                <span>{tCommon("next")}: {t("step3")}</span>
                <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" strokeWidth={1.5} />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: Review & Send */}
        {step === 3 && (
          <div className="space-y-4 sm:space-y-5 animate-in fade-in duration-200">
            {/* Summary Review Box (Responsive: 2-col on mobile, 4-col on tablet/desktop) */}
            <div className="bg-obsidian border border-hairline rounded-2xl p-5 text-xs sm:text-sm space-y-3">
              <div className="font-semibold text-platinum-light text-sm sm:text-base border-b border-hairline/60 pb-2.5 flex justify-between items-center">
                <span>{t("summaryTitle")}</span>
                <span className="text-xs text-silver-muted font-normal">{t("vipChauffeurBadge")}</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 text-silver-muted">
                <div>
                  <span className="block text-[10px] uppercase text-silver-muted/70">{t("fromLabel")}</span>
                  <span className="text-white font-medium block truncate">{formData.pickup}</span>
                </div>
                <div>
                  <span className="block text-[10px] uppercase text-silver-muted/70">{t("toLabel")}</span>
                  <span className="text-white font-medium block truncate">{formData.dropoff}</span>
                </div>
                <div>
                  <span className="block text-[10px] uppercase text-silver-muted/70">{t("dateTimeLabel")}</span>
                  <span className="text-white font-medium block">{formData.date} • {formData.time} {t("timeSuffix")}</span>
                </div>
                <div>
                  <span className="block text-[10px] uppercase text-silver-muted/70">{t("passengersVehicleLabel")}</span>
                  <span className="text-white font-medium block">{formData.passengers} {t("paxUnit")} • {formData.vehicle}</span>
                </div>
                <div>
                  <span className="block text-[10px] uppercase text-silver-muted/70">{t("nameLabel")}</span>
                  <span className="text-white font-medium block truncate">{formData.fullName}</span>
                </div>
                <div>
                  <span className="block text-[10px] uppercase text-silver-muted/70">{t("phoneLabel")}</span>
                  <span className="text-white font-medium block">{formData.phone}</span>
                </div>
                {formData.flightNumber && (
                  <div>
                    <span className="block text-[10px] uppercase text-silver-muted/70">{t("flightLabel")}</span>
                    <span className="text-white font-medium block">{formData.flightNumber}</span>
                  </div>
                )}
                <div>
                  <span className="block text-[10px] uppercase text-silver-muted/70">{t("luggageLabel")}</span>
                  <span className="text-white font-medium block">{formData.luggage} {t("luggageUnit")}</span>
                </div>
              </div>

              {formData.notes && (
                <div className="border-t border-hairline/60 pt-2.5 text-xs text-silver-muted italic">
                  &ldquo;{formData.notes}&rdquo;
                </div>
              )}
            </div>

            {/* Back & Submit Navigation */}
            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={() => setStep(2)}
                disabled={isSubmitting}
                className="w-1/3 py-3.5 sm:py-4 px-4 rounded-xl bg-obsidian border border-hairline text-platinum-mid hover:text-white text-xs sm:text-sm font-semibold transition-colors disabled:opacity-50"
              >
                {tCommon("back")}
              </button>

              <button
                type="button"
                onClick={() => handleSubmit()}
                disabled={isSubmitting}
                className="w-2/3 flex items-center justify-center gap-2 py-3.5 sm:py-4 px-6 rounded-xl bg-silver-metallic text-obsidian font-bold text-xs sm:text-sm uppercase tracking-wider shadow-xl hover:brightness-105 active:scale-[0.99] transition-all disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" strokeWidth={1.5} />
                    <span>{t("submitting")}</span>
                  </>
                ) : (
                  <>
                    <span>{t("submit")}</span>
                    <Send className="w-4 h-4 sm:w-5 sm:h-5" strokeWidth={1.5} />
                  </>
                )}
              </button>
            </div>

            {/* WhatsApp Alternative */}
            <div className="pt-2 text-center">
              <a
                href={`https://wa.me/436641234567?text=${encodeURIComponent(
                  t("whatsAppPrefill", {
                    pickup: formData.pickup || "...",
                    dropoff: formData.dropoff || "...",
                    date: formData.date || "...",
                    time: formData.time || "...",
                    passengers: formData.passengers,
                    name: formData.fullName || "...",
                  })
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs sm:text-sm text-whatsapp hover:underline font-medium"
              >
                <WhatsAppIcon className="w-4 h-4 fill-current shrink-0" />
                <span>{t("orViaWhatsApp")}</span>
              </a>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}
