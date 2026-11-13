"use client";

import React, { useState, useTransition } from "react";
import { useTranslations, useLocale } from "next-intl";
import { submitContactMessage } from "@/app/actions/contact";
import { ArrowRight, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";

export function ContactForm() {
  const t = useTranslations("contact");
  const locale = useLocale();
  const [isPending, startTransition] = useTransition();
  const [status, setStatus] = useState<{
    success?: boolean;
    message?: string;
    error?: string;
  } | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus(null);

    const formData = new FormData(e.currentTarget);
    formData.set("locale", locale);

    startTransition(async () => {
      try {
        const res = await submitContactMessage(formData);
        if (res.success) {
          setStatus({ success: true, message: res.message });
          (e.target as HTMLFormElement).reset();
        } else {
          setStatus({ success: false, error: res.error });
        }
      } catch (err) {
        setStatus({
          success: false,
          error: "Ein unerwarteter Fehler ist aufgetreten. Bitte versuchen Sie es erneut.",
        });
      }
    });
  };

  return (
    <div className="w-full bg-[#0C0E12] border border-white/10 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-9 shadow-2xl relative">
      <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight mb-6">
        {t("formTitle")}
      </h2>

      {status?.success && (
        <div className="mb-6 p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/30 flex items-start gap-3 text-emerald-300">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
          <div className="text-sm">
            <div className="font-semibold">{t("successTitle")}</div>
            <div className="text-xs text-emerald-200/80 mt-0.5">{status.message}</div>
          </div>
        </div>
      )}

      {status?.error && (
        <div className="mb-6 p-4 rounded-xl bg-red-950/40 border border-red-500/30 flex items-start gap-3 text-red-300">
          <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
          <div className="text-sm">{status.error}</div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
        {/* Name */}
        <div>
          <label htmlFor="contact-name" className="block text-xs sm:text-sm font-medium text-silver-muted mb-1.5">
            {t("nameLabel")}
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            required
            placeholder={t("namePlaceholder")}
            disabled={isPending}
            className="w-full bg-[#07090C] border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder:text-silver-muted/40 focus:outline-none focus:border-[#DFBA73] focus:ring-1 focus:ring-[#DFBA73] transition-all disabled:opacity-50"
          />
        </div>

        {/* E-Mail */}
        <div>
          <label htmlFor="contact-email" className="block text-xs sm:text-sm font-medium text-silver-muted mb-1.5">
            {t("emailLabel")}
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            required
            placeholder={t("emailPlaceholder")}
            disabled={isPending}
            className="w-full bg-[#07090C] border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder:text-silver-muted/40 focus:outline-none focus:border-[#DFBA73] focus:ring-1 focus:ring-[#DFBA73] transition-all disabled:opacity-50"
          />
        </div>

        {/* Nachricht */}
        <div>
          <label htmlFor="contact-message" className="block text-xs sm:text-sm font-medium text-silver-muted mb-1.5">
            {t("messageLabel")}
          </label>
          <textarea
            id="contact-message"
            name="message"
            rows={4}
            required
            placeholder={t("messagePlaceholder")}
            disabled={isPending}
            className="w-full bg-[#07090C] border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder:text-silver-muted/40 focus:outline-none focus:border-[#DFBA73] focus:ring-1 focus:ring-[#DFBA73] transition-all resize-none min-h-[120px] disabled:opacity-50"
          />
        </div>

        {/* Submit Button */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={isPending}
            className="w-full rounded-full py-3.5 px-6 font-bold text-obsidian bg-gradient-to-r from-[#DFBA73] via-[#E8CD90] to-[#DFBA73] hover:brightness-105 active:scale-[0.99] transition-all shadow-lg flex items-center justify-center gap-2 text-sm sm:text-base cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isPending ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-obsidian" />
                <span>{t("submitting")}</span>
              </>
            ) : (
              <>
                <span>{t("sendButton")}</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

