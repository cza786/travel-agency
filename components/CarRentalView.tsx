"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import {
  MapPin,
  Calendar,
  CalendarDays,
  Clock,
  ShieldCheck,
  Car,
  User,
  Mail,
  Phone,
  MessageSquare,
  ChevronRight,
  CheckCircle,
  AlertCircle,
  RefreshCw,
} from "lucide-react";
import { submitRentalInquiry } from "@/app/actions/rental";
import { WhatsAppIcon } from "./WhatsAppIcon";

export function CarRentalView() {
  const t = useTranslations("carRentalPage");
  const locale = useLocale();

  // Form State
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [pickup, setPickup] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [notes, setNotes] = useState("");

  // Submission State
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successData, setSuccessData] = useState<{
    referenceId?: string;
    whatsappUrl?: string;
  } | null>(null);

  // Stepper State (1: Mietdaten, 2: Ihre Angaben, 3: Anfrage senden)
  const currentStep = successData
    ? 3
    : name && email && phone
    ? 2
    : 1;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    // Basic validation
    if (!name.trim() || !email.trim() || !phone.trim() || !pickup.trim() || !startDate.trim() || !endDate.trim()) {
      setErrorMessage(t("form.validationError"));
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await submitRentalInquiry({
        name,
        email,
        phone,
        pickup,
        startDate,
        endDate,
        notes,
        locale,
      });

      if (res.success) {
        setSuccessData({
          referenceId: res.referenceId,
          whatsappUrl: res.whatsappUrl,
        });
      } else {
        setErrorMessage(res.error || t("form.validationError"));
      }
    } catch (err) {
      console.error("Submission error:", err);
      setErrorMessage(t("form.validationError"));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setName("");
    setEmail("");
    setPhone("");
    setPickup("");
    setStartDate("");
    setEndDate("");
    setNotes("");
    setSuccessData(null);
    setErrorMessage(null);
  };

  return (
    <div className="w-full max-w-5xl xl:max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-6 sm:space-y-8 md:space-y-10 pb-12 sm:pb-20">
      {/* =========================================================================
          HERO CARD (Exact Size & Padding of /services Page, Home Screen Picture)
          ========================================================================= */}
      <section className="relative rounded-2xl sm:rounded-3xl overflow-hidden border border-hairline bg-graphite p-6 sm:p-8 md:p-10 shadow-xl min-h-[170px] sm:min-h-[200px] md:min-h-[225px] flex items-center">
        {/* Background Image: The exact image from the Home Screen (/images/clean-rental.jpg) */}
        <div className="absolute inset-0 pointer-events-none select-none">
          <Image
            src="/images/clean-rental.jpg"
            alt="First Class Drive Car Rental Mercedes Key"
            fill
            priority
            quality={95}
            sizes="(max-width: 1024px) 100vw, 1400px"
            className="object-cover object-left rtl:object-right opacity-90 transition-transform duration-700 ease-out"
          />
          {/* Subtle horizontal gradient to ensure the Mercedes key on left is visible while text on right is crisp */}
          <div className="absolute inset-0 bg-gradient-to-r rtl:bg-gradient-to-l from-obsidian/75 via-obsidian/85 to-obsidian sm:from-transparent sm:via-obsidian/75 sm:to-obsidian pointer-events-none" />
        </div>

        {/* Foreground Content:
            Only:
            1. "Zell am See, Austria"
            2. "NUR AUF ANFRAGE / UPON REQUEST ONLY"
            3. "Car Rental & Exclusive Vehicle Hire"
        */}
        <div className="relative z-10 w-full flex items-center justify-between gap-4 sm:gap-6">
          {/* Left spacer for unobstructed Mercedes key visibility on tablet/desktop */}
          <div className="hidden sm:block w-[32%] md:w-[38%] lg:w-[42%] shrink-0 pointer-events-none" />

          {/* Text Area */}
          <div className="flex-1 space-y-2 sm:space-y-2.5 min-w-0">
            {/* Location Tag */}
            <div className="flex items-center gap-1.5 text-xs sm:text-[13px] text-silver-muted font-medium tracking-wide">
              <MapPin className="w-3.5 h-3.5 text-silver-muted shrink-0" strokeWidth={1.75} />
              <span>{t("locationBadge")}</span>
            </div>

            {/* Badge: NUR AUF ANFRAGE / UPON REQUEST ONLY */}
            <div>
              <span className="inline-flex items-center px-2.5 py-0.5 sm:py-1 rounded-full border border-[#C59B4B]/70 bg-[#DFBA73]/10 text-[#DFBA73] text-[9.5px] sm:text-[11px] font-semibold uppercase tracking-wider shadow-xs">
                {t("requestBadge")}
              </span>
            </div>

            {/* Title: Car Rental & Exclusive Vehicle Hire */}
            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)]">
              {t("heroTitle")}
            </h1>
          </div>
        </div>
      </section>

      {/* =========================================================================
          PILLS / BADGES ROW (Under Hero Card)
          ========================================================================= */}
      <section className="flex flex-wrap sm:flex-nowrap items-center justify-between gap-2 sm:gap-3">
        {/* Pill 1: Flexible Mietdauer */}
        <div className="flex-1 min-w-[120px] flex items-center justify-center gap-2 px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-full bg-[#15181f]/90 border border-hairline text-white shadow-xs backdrop-blur-xs">
          <CalendarDays className="w-4 h-4 text-white/90 shrink-0" strokeWidth={1.75} />
          <span className="text-xs sm:text-sm font-medium tracking-tight whitespace-nowrap">
            {t("pills.flexible")}
          </span>
        </div>

        {/* Pill 2: Vollkasko & Winterpaket */}
        <div className="flex-1 min-w-[140px] flex items-center justify-center gap-2 px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-full bg-[#15181f]/90 border border-hairline text-white shadow-xs backdrop-blur-xs">
          <ShieldCheck className="w-4 h-4 text-white/90 shrink-0" strokeWidth={1.75} />
          <span className="text-xs sm:text-sm font-medium tracking-tight whitespace-nowrap">
            {t("pills.insurance")}
          </span>
        </div>

        {/* Pill 3: Hotel- & Flughafen-Zustellung */}
        <div className="flex-1 min-w-[150px] flex items-center justify-center gap-2 px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-full bg-[#15181f]/90 border border-hairline text-white shadow-xs backdrop-blur-xs">
          <Car className="w-4 h-4 text-white/90 shrink-0" strokeWidth={1.75} />
          <span className="text-xs sm:text-sm font-medium tracking-tight whitespace-nowrap">
            {t("pills.delivery")}
          </span>
        </div>
      </section>

      {/* =========================================================================
          THREE FEATURE CARDS
          ========================================================================= */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
        {/* Card 1: Selbstfahrer oder mit Chauffeur */}
        <div className="rounded-xl sm:rounded-2xl border border-hairline bg-graphite p-4 sm:p-5 hover:border-zinc-500/40 transition-colors shadow-xs">
          <h3 className="text-sm sm:text-base font-bold text-white mb-1 tracking-tight">
            {t("features.selfDriveTitle")}
          </h3>
          <p className="text-xs sm:text-sm text-silver-muted leading-relaxed">
            {t("features.selfDriveDesc")}
          </p>
        </div>

        {/* Card 2: Tages-, Wochen- & Langzeitmiete */}
        <div className="rounded-xl sm:rounded-2xl border border-hairline bg-graphite p-4 sm:p-5 hover:border-zinc-500/40 transition-colors shadow-xs">
          <h3 className="text-sm sm:text-base font-bold text-white mb-1 tracking-tight">
            {t("features.periodTitle")}
          </h3>
          <p className="text-xs sm:text-sm text-silver-muted leading-relaxed">
            {t("features.periodDesc")}
          </p>
        </div>

        {/* Card 3: Individuelles Angebot auf Anfrage */}
        <div className="rounded-xl sm:rounded-2xl border border-hairline bg-graphite p-4 sm:p-5 hover:border-zinc-500/40 transition-colors shadow-xs">
          <h3 className="text-sm sm:text-base font-bold text-white mb-1 tracking-tight">
            {t("features.customTitle")}
          </h3>
          <p className="text-xs sm:text-sm text-silver-muted leading-relaxed">
            {t("features.customDesc")}
          </p>
        </div>
      </section>

      {/* =========================================================================
          REQUEST FORM CARD ("Mietwagen anfragen")
          ========================================================================= */}
      <section className="relative rounded-2xl sm:rounded-3xl border border-hairline bg-gradient-to-b from-graphite via-[#14161c] to-obsidian p-6 sm:p-8 md:p-10 shadow-xl">
        {/* Form Header */}
        <div className="flex items-center gap-3.5 mb-6">
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-white/[0.04] border border-hairline flex items-center justify-center shrink-0">
            <Calendar className="w-5 h-5 text-white" strokeWidth={1.75} />
          </div>
          <div>
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-white tracking-tight">
              {t("form.title")}
            </h2>
            <p className="text-xs sm:text-sm text-silver-muted font-normal">
              {t("form.subtitle")}
            </p>
          </div>
        </div>

        {/* Stepper (1: Mietdaten - 2: Ihre Angaben - 3: Anfrage senden) */}
        <div className="relative mb-6 sm:mb-8 px-4 sm:px-12 md:px-16">
          <div className="flex items-center justify-between relative z-10">
            {/* Step 1 */}
            <div className="flex flex-col items-center">
              <div
                className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all shadow-sm ${
                  currentStep >= 1
                    ? "bg-white text-obsidian ring-2 ring-white/20"
                    : "bg-[#14171d] text-silver-muted border border-white/20"
                }`}
              >
                1
              </div>
              <span
                className={`text-[11px] sm:text-xs font-medium mt-1.5 transition-colors ${
                  currentStep >= 1 ? "text-white" : "text-silver-muted"
                }`}
              >
                {t("form.step1")}
              </span>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col items-center">
              <div
                className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all shadow-sm ${
                  currentStep >= 2
                    ? "bg-white text-obsidian ring-2 ring-white/20"
                    : "bg-[#14171d] text-white border border-white/30"
                }`}
              >
                2
              </div>
              <span
                className={`text-[11px] sm:text-xs font-medium mt-1.5 transition-colors ${
                  currentStep >= 2 ? "text-white" : "text-silver-muted"
                }`}
              >
                {t("form.step2")}
              </span>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col items-center">
              <div
                className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all shadow-sm ${
                  currentStep >= 3
                    ? "bg-emerald-400 text-obsidian ring-2 ring-emerald-400/30"
                    : "bg-[#14171d] text-silver-muted border border-white/20"
                }`}
              >
                3
              </div>
              <span
                className={`text-[11px] sm:text-xs font-medium mt-1.5 transition-colors ${
                  currentStep >= 3 ? "text-emerald-400 font-semibold" : "text-silver-muted"
                }`}
              >
                {t("form.step3")}
              </span>
            </div>
          </div>

          {/* Stepper Connector Line */}
          <div className="absolute top-3.5 sm:top-4 left-12 sm:left-20 md:left-24 right-12 sm:right-20 md:right-24 h-[1px] bg-white/20 -z-0" />
        </div>

        {/* Success View */}
        {successData ? (
          <div className="py-8 px-4 text-center space-y-4 animate-in fade-in zoom-in-95 duration-300">
            <div className="w-16 h-16 mx-auto rounded-full bg-emerald-500/15 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shadow-lg">
              <CheckCircle className="w-9 h-9" strokeWidth={1.8} />
            </div>

            <div className="space-y-1.5">
              <h3 className="text-lg sm:text-xl font-bold text-white">
                {t("form.successTitle")}
              </h3>
              <p className="text-xs sm:text-sm text-silver-muted max-w-md mx-auto leading-relaxed">
                {t("form.successDesc")}
              </p>
            </div>

            {successData.referenceId && (
              <div className="inline-block px-4 py-2 rounded-xl bg-white/[0.04] border border-hairline text-xs font-mono text-platinum-mid">
                <span className="text-silver-muted mr-2">{t("form.refId")}:</span>
                <strong className="text-white font-bold tracking-wider">{successData.referenceId}</strong>
              </div>
            )}

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
              {successData.whatsappUrl && (
                <a
                  href={successData.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-whatsapp hover:brightness-110 active:scale-[0.99] text-obsidian font-bold text-xs uppercase tracking-wider shadow-lg transition-all"
                >
                  <WhatsAppIcon className="w-4 h-4 fill-current shrink-0" />
                  <span>{t("form.whatsappButton")}</span>
                </a>
              )}

              <button
                type="button"
                onClick={handleReset}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-graphite border border-hairline hover:border-platinum-dark text-white text-xs font-semibold tracking-wide transition-colors"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>{t("form.anotherRequest")}</span>
              </button>
            </div>
          </div>
        ) : (
          /* Input Form */
          <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-3.5">
            {/* Error Message */}
            {errorMessage && (
              <div className="flex items-center gap-2 p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs animate-in fade-in duration-200">
                <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Contact Fields: 1 column on mobile, 2 columns on tablet/desktop */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
              {/* Field 1: Name * */}
              <div className="relative flex items-center rounded-xl bg-obsidian-soft border border-hairline focus-within:border-zinc-400/60 transition-colors shadow-xs">
                <div className="pl-3.5 pr-2 py-3 text-silver-muted rtl:pl-2 rtl:pr-3.5">
                  <User className="w-4 h-4" strokeWidth={1.75} />
                </div>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={t("form.namePlaceholder")}
                  className="w-full bg-transparent pr-3.5 py-3 text-xs sm:text-sm text-white placeholder:text-silver-muted/80 focus:outline-none rtl:pr-2 rtl:pl-3.5"
                />
              </div>

              {/* Field 2: E-Mail-Adresse * */}
              <div className="relative flex items-center rounded-xl bg-obsidian-soft border border-hairline focus-within:border-zinc-400/60 transition-colors shadow-xs">
                <div className="pl-3.5 pr-2 py-3 text-silver-muted rtl:pl-2 rtl:pr-3.5">
                  <Mail className="w-4 h-4" strokeWidth={1.75} />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t("form.emailPlaceholder")}
                  className="w-full bg-transparent pr-3.5 py-3 text-xs sm:text-sm text-white placeholder:text-silver-muted/80 focus:outline-none rtl:pr-2 rtl:pl-3.5"
                />
              </div>

              {/* Field 3: Telefonnummer * */}
              <div className="relative flex items-center rounded-xl bg-obsidian-soft border border-hairline focus-within:border-zinc-400/60 transition-colors shadow-xs">
                <div className="pl-3.5 pr-2 py-3 text-silver-muted rtl:pl-2 rtl:pr-3.5">
                  <Phone className="w-4 h-4" strokeWidth={1.75} />
                </div>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder={t("form.phonePlaceholder")}
                  className="w-full bg-transparent pr-3.5 py-3 text-xs sm:text-sm text-white placeholder:text-silver-muted/80 focus:outline-none rtl:pr-2 rtl:pl-3.5"
                />
              </div>

              {/* Field 4: Abholort / Zustelladresse * */}
              <div className="relative flex items-center rounded-xl bg-obsidian-soft border border-hairline focus-within:border-zinc-400/60 transition-colors shadow-xs">
                <div className="pl-3.5 pr-2 py-3 text-silver-muted rtl:pl-2 rtl:pr-3.5">
                  <MapPin className="w-4 h-4" strokeWidth={1.75} />
                </div>
                <input
                  type="text"
                  required
                  value={pickup}
                  onChange={(e) => setPickup(e.target.value)}
                  placeholder={t("form.pickupPlaceholder")}
                  className="w-full bg-transparent pr-3.5 py-3 text-xs sm:text-sm text-white placeholder:text-silver-muted/80 focus:outline-none rtl:pr-2 rtl:pl-3.5"
                />
              </div>
            </div>

            {/* Rental Period Row: Mietbeginn & Mietende (Side-by-Side 2 Columns) */}
            <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
              {/* Field 5: Mietbeginn */}
              <div className="relative flex items-start rounded-xl bg-obsidian-soft border border-hairline focus-within:border-zinc-400/60 transition-colors p-2.5 sm:p-3 shadow-xs">
                <div className="pt-0.5 pr-2 rtl:pr-0 rtl:pl-2 text-silver-muted">
                  <Calendar className="w-4 h-4" strokeWidth={1.75} />
                </div>
                <div className="min-w-0 flex-1">
                  <label htmlFor="rental-start" className="block text-[10px] sm:text-[11px] font-semibold text-white/95 leading-tight tracking-tight">
                    {t("form.startDateLabel")}
                  </label>
                  <input
                    id="rental-start"
                    type="text"
                    required
                    value={startDate}
                    onFocus={(e) => (e.target.type = "datetime-local")}
                    onBlur={(e) => {
                      if (!e.target.value) e.target.type = "text";
                    }}
                    onChange={(e) => setStartDate(e.target.value)}
                    placeholder={t("form.startDatePlaceholder")}
                    className="w-full bg-transparent text-[10.5px] sm:text-xs text-silver-muted placeholder:text-silver-muted/70 focus:outline-none focus:text-white pt-0.5"
                  />
                </div>
              </div>

              {/* Field 6: Mietende */}
              <div className="relative flex items-start rounded-xl bg-obsidian-soft border border-hairline focus-within:border-zinc-400/60 transition-colors p-2.5 sm:p-3 shadow-xs">
                <div className="pt-0.5 pr-2 rtl:pr-0 rtl:pl-2 text-silver-muted">
                  <Clock className="w-4 h-4" strokeWidth={1.75} />
                </div>
                <div className="min-w-0 flex-1">
                  <label htmlFor="rental-end" className="block text-[10px] sm:text-[11px] font-semibold text-white/95 leading-tight tracking-tight">
                    {t("form.endDateLabel")}
                  </label>
                  <input
                    id="rental-end"
                    type="text"
                    required
                    value={endDate}
                    onFocus={(e) => (e.target.type = "datetime-local")}
                    onBlur={(e) => {
                      if (!e.target.value) e.target.type = "text";
                    }}
                    onChange={(e) => setEndDate(e.target.value)}
                    placeholder={t("form.endDatePlaceholder")}
                    className="w-full bg-transparent text-[10.5px] sm:text-xs text-silver-muted placeholder:text-silver-muted/70 focus:outline-none focus:text-white pt-0.5"
                  />
                </div>
              </div>
            </div>

            {/* Field 7: Gewünschtes Fahrzeug / Notizen */}
            <div className="relative flex items-center rounded-xl bg-obsidian-soft border border-hairline focus-within:border-zinc-400/60 transition-colors shadow-xs">
              <div className="pl-3.5 pr-2 py-3 text-silver-muted rtl:pl-2 rtl:pr-3.5">
                <MessageSquare className="w-4 h-4" strokeWidth={1.75} />
              </div>
              <input
                type="text"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder={t("form.notesPlaceholder")}
                className="w-full bg-transparent pr-3.5 py-3 text-xs sm:text-sm text-white placeholder:text-silver-muted/80 focus:outline-none rtl:pr-2 rtl:pl-3.5"
              />
            </div>

            {/* CTA Button: MIETWAGEN ANFRAGEN > */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2 py-3.5 sm:py-4 px-6 rounded-xl sm:rounded-2xl bg-silver-metallic hover:brightness-105 active:scale-[0.99] text-obsidian font-extrabold text-xs sm:text-sm tracking-wider uppercase shadow-[0_4px_24px_rgba(255,255,255,0.18)] transition-all cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
              >
                <span>{isSubmitting ? t("form.submitting") : t("form.submit")}</span>
                <ChevronRight className="w-4 h-4 text-obsidian stroke-[2.5] rtl:rotate-180" />
              </button>
            </div>
          </form>
        )}
      </section>
    </div>
  );
}
