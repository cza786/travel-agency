"use client";

import { useState, useEffect } from "react";
import { getLivePrices, PricingEntry, DEFAULT_PRICES } from "./pricing";

export function useLivePricing() {
  const [prices, setPrices] = useState<PricingEntry[]>(DEFAULT_PRICES);

  useEffect(() => {
    getLivePrices().then(setPrices);

    const handleUpdate = (e: Event) => {
      const customEvent = e as CustomEvent<PricingEntry[]>;
      if (customEvent.detail) {
        setPrices(customEvent.detail);
      }
    };

    window.addEventListener("fcd_pricing_updated", handleUpdate);
    return () => {
      window.removeEventListener("fcd_pricing_updated", handleUpdate);
    };
  }, []);

  const getPrice = (id: string, fallbackDefault?: string): string => {
    const item = prices.find((p) => p.id === id);
    return item ? item.price : fallbackDefault || "";
  };

  const getNumericPrice = (id: string, fallbackDefault: number = 0): number => {
    const item = prices.find((p) => p.id === id);
    return item ? item.numericPrice : fallbackDefault;
  };

  return { prices, getPrice, getNumericPrice };
}
