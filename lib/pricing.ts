import { createClient } from "./supabase/client";

export interface PricingEntry {
  id: string;
  category: "service" | "fixed_route" | "airport_route" | "km_rate";
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
    price: "320 €",
    numericPrice: 320,
    status: "Active",
    iconType: "plane",
  },

  // 3. Airport Transfers Page Routes
  {
    id: "air-r1",
    category: "airport_route",
    service: "Salzburg → München",
    price: "220 €",
    numericPrice: 220,
    status: "Active",
    iconType: "plane",
  },
  {
    id: "air-r2",
    category: "airport_route",
    service: "Salzburg → Wien",
    price: "240 €",
    numericPrice: 240,
    status: "Active",
    iconType: "plane",
  },
  {
    id: "air-r3",
    category: "airport_route",
    service: "Salzburg → Innsbruck",
    price: "280 €",
    numericPrice: 280,
    status: "Active",
    iconType: "plane",
  },
  {
    id: "air-r4",
    category: "airport_route",
    service: "München → Salzburg",
    price: "220 €",
    numericPrice: 220,
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
  if (typeof window !== "undefined") {
    try {
      const cached = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (cached) {
        return JSON.parse(cached);
      }
    } catch {
      // ignore
    }
  }

  // Try to fetch from Supabase
  try {
    const supabase = createClient();
    const { data, error } = await supabase.from("prices").select("*");
    if (!error && data && data.length > 0) {
      const mapped: PricingEntry[] = data.map((d) => ({
        id: d.id,
        category: d.category || "service",
        service: d.service,
        price: d.price,
        numericPrice: Number(d.numeric_price) || 0,
        unit: d.unit || undefined,
        status: d.status || "Active",
        iconType: d.icon || "car",
      }));

      // Cache locally
      if (typeof window !== "undefined") {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(mapped));
      }
      return mapped;
    }
  } catch {
    // ignore
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
