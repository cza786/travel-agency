import { createClient } from "./supabase/client";

export interface PricingEntry {
  id: string;
  category: "service" | "fixed_route" | "airport_route" | "km_rate" | "taximeter";
  service: string;
  price: string;
  numericPrice: number;
  unit?: string;
  status: "Active" | "Inactive";
  iconType: "plane" | "car" | "mountain" | "briefcase" | "users" | "bike";
  description?: string;
}

export const DEFAULT_PRICES: PricingEntry[] = [
  // 1. General Services (Admin Design Screen 3)
  {
    id: "srv-airport",
    category: "service",
    service: "Airport Transfer",
    price: "€ 80.00",
    numericPrice: 80,
    status: "Active",
    iconType: "plane",
  },
  {
    id: "srv-city",
    category: "service",
    service: "City Ride",
    price: "€ 50.00",
    numericPrice: 50,
    status: "Active",
    iconType: "car",
  },
  {
    id: "srv-excursion",
    category: "service",
    service: "Excursion Tour",
    price: "€ 120.00",
    numericPrice: 120,
    status: "Active",
    iconType: "mountain",
  },
  {
    id: "srv-business",
    category: "service",
    service: "Business Transfer",
    price: "€ 90.00",
    numericPrice: 90,
    status: "Active",
    iconType: "briefcase",
  },
  {
    id: "srv-group",
    category: "service",
    service: "Group Transfer",
    price: "€ 150.00",
    numericPrice: 150,
    status: "Active",
    iconType: "users",
  },
  {
    id: "srv-bicycle",
    category: "service",
    service: "Bicycle Transfer",
    price: "€ 40.00",
    numericPrice: 40,
    status: "Active",
    iconType: "bike",
  },

  // 2. Main Fixed Routes (PricesSection)
  {
    id: "szg-zas",
    category: "fixed_route",
    service: "Salzburg Flughafen → Zell am See / Kaprun",
    price: "220 €",
    numericPrice: 220,
    status: "Active",
    iconType: "plane",
  },
  {
    id: "szg-saalbach",
    category: "fixed_route",
    service: "Salzburg Flughafen → Saalbach",
    price: "240 €",
    numericPrice: 240,
    status: "Active",
    iconType: "plane",
  },
  {
    id: "muc-zas",
    category: "fixed_route",
    service: "München Flughafen → Zell am See / Kaprun",
    price: "480 €",
    numericPrice: 480,
    status: "Active",
    iconType: "plane",
  },
  {
    id: "muc-saalbach",
    category: "fixed_route",
    service: "München Flughafen → Saalbach",
    price: "500 €",
    numericPrice: 500,
    status: "Active",
    iconType: "plane",
  },
  {
    id: "vie-zas",
    category: "fixed_route",
    service: "Wien Flughafen → Zell am See / Kaprun",
    price: "800 €",
    numericPrice: 800,
    status: "Active",
    iconType: "plane",
  },
  {
    id: "mil-zas",
    category: "fixed_route",
    service: "Mailand → Zell am See / Kaprun",
    price: "1.200 €",
    numericPrice: 1200,
    status: "Active",
    iconType: "car",
  },
  {
    id: "inl-zas",
    category: "fixed_route",
    service: "Interlaken → Zell am See",
    price: "1.200 €",
    numericPrice: 1200,
    status: "Active",
    iconType: "mountain",
  },
  {
    id: "inn-zas",
    category: "fixed_route",
    service: "Innsbruck Flughafen → Zell am See / Kaprun",
    price: "400 €",
    numericPrice: 400,
    status: "Active",
    iconType: "plane",
  },

  // 3. Airport Transfers Page Routes
  {
    id: "air-r1",
    category: "airport_route",
    service: "Zell am See ↔ Salzburg",
    price: "220 €",
    numericPrice: 220,
    status: "Active",
    iconType: "plane",
  },
  {
    id: "air-r2",
    category: "airport_route",
    service: "Zell am See ↔ München",
    price: "480 €",
    numericPrice: 480,
    status: "Active",
    iconType: "plane",
  },
  {
    id: "air-r3",
    category: "airport_route",
    service: "Zell am See ↔ Innsbruck",
    price: "450 €",
    numericPrice: 450,
    status: "Active",
    iconType: "plane",
  },
  {
    id: "air-r4",
    category: "airport_route",
    service: "Zell am See ↔ Wien",
    price: "800 €",
    numericPrice: 800,
    status: "Active",
    iconType: "plane",
  },

  // 4. Kilometer Rates for Calculator & Tariffs
  {
    id: "km-short",
    category: "km_rate",
    service: "Kurzstrecken (< 50 km)",
    price: "3.10 € / km",
    numericPrice: 3.1,
    unit: "€ / km",
    status: "Active",
    iconType: "car",
  },
  {
    id: "km-long",
    category: "km_rate",
    service: "Langstrecken (> 50 km)",
    price: "2.80 € / km",
    numericPrice: 2.8,
    unit: "€ / km",
    status: "Active",
    iconType: "car",
  },

  // 5. Taximeter Tariffs (Official Salzburg Taxi Regulation: Saalbach-Hinterglemm & Zell am See/Kaprun)
  {
    id: "saalbach-base-day",
    category: "taximeter",
    service: "Saalbach-Hinterglemm Grundtaxe (Tag 6:00 - 21:00)",
    price: "€ 8,80",
    numericPrice: 8.8,
    status: "Active",
    iconType: "car",
    description: "Inkl. 500 m Wegstrecke und 170,34 s Wartezeit",
  },
  {
    id: "saalbach-base-night",
    category: "taximeter",
    service: "Saalbach-Hinterglemm Grundtaxe (Nacht / Sonn- & Feiertage)",
    price: "€ 9,80",
    numericPrice: 9.8,
    status: "Active",
    iconType: "car",
    description: "Inkl. 500 m Wegstrecke und 170,34 s Wartezeit",
  },
  {
    id: "saalbach-dist-1",
    category: "taximeter",
    service: "Saalbach Streckentaxe I",
    price: "€ 0,30",
    numericPrice: 0.3,
    status: "Active",
    iconType: "car",
    description: "je begonnene 61,17 m",
  },
  {
    id: "saalbach-dist-2",
    category: "taximeter",
    service: "Saalbach Streckentaxe II",
    price: "€ 0,30",
    numericPrice: 0.3,
    status: "Active",
    iconType: "car",
    description: "je begonnene 97,78 m",
  },
  {
    id: "saalbach-time",
    category: "taximeter",
    service: "Saalbach Zeittaxe",
    price: "€ 0,30",
    numericPrice: 0.3,
    status: "Active",
    iconType: "car",
    description: "je angefangene 20,85 Sekunden",
  },
  {
    id: "zell-base-day",
    category: "taximeter",
    service: "Zell am See/Kaprun Grundtaxe (Tag 6:00 - 21:00)",
    price: "€ 7,60",
    numericPrice: 7.6,
    status: "Active",
    iconType: "car",
    description: "Inkl. 1.350 m Wegstrecke oder 322,07 s Wartezeit",
  },
  {
    id: "zell-base-night",
    category: "taximeter",
    service: "Zell am See/Kaprun Grundtaxe (Nacht / Sonn- & Feiertage)",
    price: "€ 8,80",
    numericPrice: 8.8,
    status: "Active",
    iconType: "car",
    description: "Inkl. 1.350 m Wegstrecke oder 322,07 s Wartezeit",
  },
  {
    id: "zell-dist",
    category: "taximeter",
    service: "Zell am See/Kaprun Streckentaxe",
    price: "€ 0,30",
    numericPrice: 0.3,
    status: "Active",
    iconType: "car",
    description: "je begonnene 97,78 m",
  },
  {
    id: "zell-time",
    category: "taximeter",
    service: "Zell am See/Kaprun Zeittaxe",
    price: "€ 0,30",
    numericPrice: 0.3,
    status: "Active",
    iconType: "car",
    description: "je angefangene 23,34 Sekunden",
  },
  {
    id: "zell-surcharge",
    category: "taximeter",
    service: "Zell am See/Kaprun Zuschlag",
    price: "€ 3,70",
    numericPrice: 3.7,
    status: "Active",
    iconType: "car",
  },
];

const LOCAL_STORAGE_KEY = "fcd_live_pricing_store";
const SYNC_EVENT_NAME = "fcd_pricing_updated";

/**
 * Get all prices with fallback cascade:
 * 1. Supabase 'prices' table (if created)
 * 2. Local storage cache
 * 3. Default preset catalog
 */
export async function getLivePrices(): Promise<PricingEntry[]> {
  // Try to fetch latest live prices from Supabase first
  try {
    const supabase = createClient();
    const { data, error } = await supabase.from("prices").select("*");
    if (!error && data && data.length > 0) {
      let needsDbSync = false;
      const mapped: PricingEntry[] = data.map((d) => {
        // Auto-heal legacy airport routes if they still have old Salzburg origin or outdated mock prices
        if (d.id === "air-r1" && (d.service === "Salzburg → München" || !d.service.includes("Zell am See"))) {
          needsDbSync = true;
          return { id: "air-r1", category: "airport_route", service: "Zell am See ↔ Salzburg", price: "220 €", numericPrice: 220, status: d.status || "Active", iconType: "plane" };
        }
        if (d.id === "air-r2" && (d.service === "Salzburg → Wien" || d.numeric_price === 240 || !d.service.includes("Zell am See"))) {
          needsDbSync = true;
          return { id: "air-r2", category: "airport_route", service: "Zell am See ↔ München", price: "480 €", numericPrice: 480, status: d.status || "Active", iconType: "plane" };
        }
        if (d.id === "air-r3" && (d.service === "Salzburg → Innsbruck" || d.numeric_price === 280 || d.numeric_price === 320 || !d.service.includes("Zell am See"))) {
          needsDbSync = true;
          return { id: "air-r3", category: "airport_route", service: "Zell am See ↔ Innsbruck", price: "450 €", numericPrice: 450, status: d.status || "Active", iconType: "plane" };
        }
        if (d.id === "inn-zas" && (d.numeric_price === 320 || d.price === "320 €" || d.numeric_price === 450 || d.price === "450 €")) {
          needsDbSync = true;
          return { id: "inn-zas", category: "fixed_route", service: "Innsbruck Flughafen → Zell am See / Kaprun", price: "400 €", numericPrice: 400, status: d.status || "Active", iconType: "plane" };
        }
        if (d.id === "air-r4" && (d.service === "München → Salzburg" || d.numeric_price === 220 || !d.service.includes("Zell am See"))) {
          needsDbSync = true;
          return { id: "air-r4", category: "airport_route", service: "Zell am See ↔ Wien", price: "800 €", numericPrice: 800, status: d.status || "Active", iconType: "plane" };
        }
        return {
          id: d.id,
          category: d.category || "service",
          service: d.service,
          price: d.price,
          numericPrice: Number(d.numeric_price) || 0,
          unit: d.unit || undefined,
          status: d.status || "Active",
          iconType: d.icon || "car",
        };
      });

      if (needsDbSync) {
        try {
          const toSync = mapped.filter((m) => ["air-r1", "air-r2", "air-r3", "air-r4", "inn-zas"].includes(m.id));
          for (const item of toSync) {
            await supabase.from("prices").upsert({
              id: item.id,
              category: item.category,
              service: item.service,
              price: item.price,
              numeric_price: item.numericPrice,
              status: item.status,
              icon: item.iconType,
              updated_at: new Date().toISOString(),
            });
          }
        } catch {
          // ignore
        }
      }

      // Cache locally
      if (typeof window !== "undefined") {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(mapped));
      }
      return mapped;
    }
  } catch {
    // ignore
  }

  // Fallback to local storage cache if offline/error
  if (typeof window !== "undefined") {
    try {
      const cached = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (cached) {
        const parsed: PricingEntry[] = JSON.parse(cached);
        const hasLegacy = parsed.some(
          (p) =>
            (p.id === "air-r2" && (p.price === "240 €" || p.service === "Salzburg → Wien")) ||
            (p.id === "inn-zas" && (p.price === "320 €" || p.price === "450 €"))
        );
        if (hasLegacy) {
          localStorage.removeItem(LOCAL_STORAGE_KEY);
          return DEFAULT_PRICES;
        }
        return parsed;
      }
    } catch {
      // ignore
    }
  }

  return DEFAULT_PRICES;
}

/**
 * Update an existing price entry or add a new one.
 * Broadcasts an update event so all open pages instantly re-render with the new price!
 */
export async function updateLivePrice(updatedEntry: PricingEntry): Promise<void> {
  let currentPrices = await getLivePrices();
  const exists = currentPrices.some((p) => p.id === updatedEntry.id);

  if (exists) {
    currentPrices = currentPrices.map((p) => (p.id === updatedEntry.id ? updatedEntry : p));
  } else {
    currentPrices.push(updatedEntry);
  }

  // Save to LocalStorage immediately
  if (typeof window !== "undefined") {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(currentPrices));
    window.dispatchEvent(new CustomEvent(SYNC_EVENT_NAME, { detail: currentPrices }));
  }

  // Persist to Supabase
  try {
    const supabase = createClient();
    await supabase.from("prices").upsert({
      id: updatedEntry.id,
      category: updatedEntry.category,
      service: updatedEntry.service,
      price: updatedEntry.price,
      numeric_price: updatedEntry.numericPrice,
      unit: updatedEntry.unit || null,
      status: updatedEntry.status,
      icon: updatedEntry.iconType,
      updated_at: new Date().toISOString(),
    });
  } catch (err) {
    console.warn("Supabase prices sync fallback:", err);
  }
}

/**
 * Delete a price entry
 */
export async function deleteLivePrice(id: string): Promise<void> {
  let currentPrices = await getLivePrices();
  currentPrices = currentPrices.filter((p) => p.id !== id);

  if (typeof window !== "undefined") {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(currentPrices));
    window.dispatchEvent(new CustomEvent(SYNC_EVENT_NAME, { detail: currentPrices }));
  }

  try {
    const supabase = createClient();
    await supabase.from("prices").delete().eq("id", id);
  } catch (err) {
    console.warn("Supabase delete price error:", err);
  }
}
