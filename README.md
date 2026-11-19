# First Class Drive (`firstclassdrive.at`)

> **VIP Chauffeur, Airport Transfer & Private Taxi Service**  
> Based in Zell am See – Kaprun, Salzburg, Austria.

---

## 1. Overview & Tech Stack

A high-performance, mobile-first web application built with a dark automotive luxury aesthetic tailored for high-net-worth travelers, alpine tourists, and international VIP guests in Zell am See and the Austrian Alps.

- **Framework:** Next.js 16.4 (App Router) + React 19 + TypeScript (`strict: true`)
- **Styling:** Tailwind CSS v4 using CSS-first `@theme` design tokens
- **Icons:** `lucide-react` with uniform hairline weight (`strokeWidth={1.5}`)
- **Internationalization (i18n):** `next-intl` supporting German (`de` - default), English (`en`), and Arabic (`ar` with native RTL layout)
- **Validation & Email Notification:** `zod` schema validation + `resend` via Next.js Server Actions (`submitBookingInquiry`)
- **Direct Dispatch Fallbacks:** Pre-formatted WhatsApp dispatch messages (`wa.me`) and 24/7 one-touch telephone calling

---

## 2. Design System & Tailwind v4 Tokens (`app/globals.css`)

Configured with the exact dark automotive luxury palette:

```css
@import "tailwindcss";

@theme {
  --color-obsidian: #080A0C;
  --color-obsidian-soft: #0D1014;
  --color-graphite: #14171C;
  --color-graphite-elevated: #1B1F26;
  --color-hairline: #2E343E;
  --color-platinum-light: #FFFFFF;
  --color-platinum-mid: #E4E7EC;
  --color-platinum-dark: #B8BFC9;
  --color-silver-muted: #9CA3AF;
  --color-whatsapp: #25D366;
}
```

---

## 3. Key Pages & Features

1. **Home / Startseite (`/[locale]`):**
   - Brand header with alpine peaks logo and language switcher dropdown.
   - Sticky tab sub-navigation (*Startseite*, *Leistungen*, *Preise*, *Über uns*, *Kontakt*).
   - Alpine location badge (`📍 Zell am See, Österreich`).
   - Hero: `Your Journey. Our Excellence.` with Mercedes-Benz V-Class VIP Van by Lake Zell.
   - 3 Feature Badges: *Zuverlässig & sicher*, *Komfortabel & exklusiv*, *Bis 8 Personen*.
   - Services Showcase: Airport Transfers, Excursions, Bike Transfers, Regular Taxi, Car Rental.
   - Fixed mobile CTA: Brushed metallic `BUCHUNGSANFRAGE >` button.

2. **Prices & Tariffs (`/[locale]/prices`):**
   - Fixed Rates table with stylized slanted brushed silver badges:
     - Salzburg Airport ↔ Zell am See / Kaprun: **220 €**
     - Salzburg Airport ↔ Saalbach: **240 €**
     - Munich Airport ↔ Zell am See / Kaprun: **480 €**
     - Munich Airport ↔ Saalbach: **500 €**
     - Vienna Airport ↔ Zell am See / Kaprun: **800 €**
     - Milan ↔ Zell am See / Kaprun: **1.200 €**
     - Interlaken ↔ Zell am See: **1.200 €**
     - Innsbruck Airport ↔ Zell am See: **450 €**
   - Kilometer tariffs card: *Bis 50 km: 3,10 € / km · Ab 50 km: 2,80 € / km*.
   - Interactive Route & Fare Calculator with real-time distance slider, round-trip discount, and 1-click booking prefill.

3. **Booking / Fahrt anfragen (`/[locale]/booking` & Modal):**
   - 3-Step guided flow (*Fahrtdaten* ➔ *Ihre Angaben* ➔ *Anfrage senden*).
   - Address swap button, date/time pickers, flight number, passenger/luggage counts, and vehicle class selector.
   - Server Action submission with instant reference code (e.g. `FCD-284910`) and automated email dispatch via Resend.
   - Direct WhatsApp instant inquiry generation.

4. **Arabic (RTL) Support (`/ar`):**
   - Full right-to-left layout direction (`dir="rtl"`).
   - Culturally tailored VIP phrasing for Middle Eastern and Gulf travelers visiting Zell am See & Kaprun.

---

## 4. Setup & Running

### Prerequisites
- Node.js 18+ (tested with Node.js v24)
- npm 10+

### Installation & Development
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build production bundle
npm run build

# Start production server
npm run start
```

### Environment Variables
Copy `.env.example` to `.env`:
```env
RESEND_API_KEY=re_your_api_key_here
```
*(If `RESEND_API_KEY` is omitted, the app operates in simulation mode, logging inquiries and returning reservation reference codes with WhatsApp links).*
