"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { MapPin, Plane, Building2, Mountain, Loader2, X, Search } from "lucide-react";
import { useLocale } from "next-intl";

export interface AddressSuggestion {
  id: string;
  primary: string;
  secondary: string;
  fullAddress: string;
  type?: "airport" | "city" | "hotel" | "mountain" | "address";
}

interface AddressAutocompleteProps {
  name: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  className?: string;
  icon?: React.ReactNode;
}

// Curated top destinations in Salzburg & the Austrian Alps for instant matching
const POPULAR_DESTINATIONS: AddressSuggestion[] = [
  {
    id: "pop-szg",
    primary: "Flughafen Salzburg (SZG)",
    secondary: "Innsbrucker Bundesstraße 95, 5020 Salzburg",
    fullAddress: "Flughafen Salzburg (SZG), 5020 Salzburg",
    type: "airport",
  },
  {
    id: "pop-muc",
    primary: "Flughafen München (MUC)",
    secondary: "Nordallee 25, 85356 München-Flughafen, Deutschland",
    fullAddress: "Flughafen München (MUC), Deutschland",
    type: "airport",
  },
  {
    id: "pop-vie",
    primary: "Flughafen Wien-Schwechat (VIE)",
    secondary: "Einfahrtsstraße, 1300 Wien-Flughafen",
    fullAddress: "Flughafen Wien-Schwechat (VIE), 1300 Wien",
    type: "airport",
  },
  {
    id: "pop-inn",
    primary: "Flughafen Innsbruck (INN)",
    secondary: "Fürstenweg 180, 6020 Innsbruck",
    fullAddress: "Flughafen Innsbruck (INN), 6020 Innsbruck",
    type: "airport",
  },
  {
    id: "pop-zas-center",
    primary: "Zell am See (Zentrum / Altstadt)",
    secondary: "5700 Zell am See, Salzburg, Österreich",
    fullAddress: "Zell am See, 5700 Salzburg, Österreich",
    type: "city",
  },
  {
    id: "pop-zas-station",
    primary: "Bahnhof Zell am See",
    secondary: "Bahnhofplatz 1, 5700 Zell am See",
    fullAddress: "Bahnhof Zell am See, 5700 Zell am See",
    type: "city",
  },
  {
    id: "pop-kaprun",
    primary: "Kaprun (Kitzsteinhorn & Tauern Spa)",
    secondary: "5710 Kaprun, Salzburg, Österreich",
    fullAddress: "Kaprun, 5710 Salzburg, Österreich",
    type: "mountain",
  },
  {
    id: "pop-uttendorf",
    primary: "Uttendorf (Weißsee Gletscherwelt)",
    secondary: "5723 Uttendorf, Salzburg, Österreich",
    fullAddress: "Uttendorf, 5723 Salzburg, Österreich",
    type: "city",
  },
  {
    id: "pop-saalbach",
    primary: "Saalbach-Hinterglemm",
    secondary: "5753 Saalbach, Salzburg, Österreich",
    fullAddress: "Saalbach-Hinterglemm, 5753 Salzburg, Österreich",
    type: "mountain",
  },
  {
    id: "pop-kitz",
    primary: "Kitzbühel",
    secondary: "6370 Kitzbühel, Tirol, Österreich",
    fullAddress: "Kitzbühel, 6370 Tirol, Österreich",
    type: "mountain",
  },
];

export function AddressAutocomplete({
  name,
  value,
  onChange,
  placeholder = "Adresse eingeben...",
  required = false,
  className = "",
  icon,
}: AddressAutocompleteProps) {
  const [query, setQuery] = useState(value || "");
  const [suggestions, setSuggestions] = useState<AddressSuggestion[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const isSelectedRef = useRef(false);
  const locale = useLocale();

  // Sync external value changes into local query state
  useEffect(() => {
    setQuery(value || "");
  }, [value]);

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Fetch address suggestions (Google Places API if key configured, otherwise high-precision Photon Geocoding)
  const fetchSuggestions = useCallback(async (searchQuery: string) => {
    if (!searchQuery || searchQuery.trim().length < 2) {
      setSuggestions([]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);

    try {
      // 1. Check if Google Maps Places Autocomplete is active in the browser
      const googleMaps = (window as unknown as { google?: { maps?: { places?: { AutocompleteService: new () => { getPlacePredictions: (req: unknown, cb: (res: Array<{ place_id: string; structured_formatting?: { main_text?: string; secondary_text?: string }; description: string }>) => void) => void } } } } }).google;

      if (googleMaps?.maps?.places?.AutocompleteService) {
        const service = new googleMaps.maps.places.AutocompleteService();
        service.getPlacePredictions(
          {
            input: searchQuery,
            componentRestrictions: { country: ["at", "de", "ch", "it"] },
          },
          (predictions) => {
            if (predictions && predictions.length > 0) {
              const mapped: AddressSuggestion[] = predictions.slice(0, 6).map((p) => ({
                id: p.place_id,
                primary: p.structured_formatting?.main_text || p.description.split(",")[0],
                secondary: p.structured_formatting?.secondary_text || p.description,
                fullAddress: p.description,
                type: "address",
              }));
              setSuggestions(mapped);
              setIsLoading(false);
            } else {
              fallbackToPhoton(searchQuery);
            }
          }
        );
        return;
      }

      // 2. High-speed Live Photon Geocoding (OpenStreetMap / Komoot API biased to Austria & Alps)
      await fallbackToPhoton(searchQuery);
    } catch {
      // Fallback to local curated suggestions on any error
      const filtered = POPULAR_DESTINATIONS.filter((item) =>
        item.fullAddress.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSuggestions(filtered);
      setIsLoading(false);
    }
  }, []);

  const fallbackToPhoton = async (searchQuery: string) => {
    try {
      // Biased coordinates for Zell am See / Salzburg Alps (lat: 47.3235, lon: 12.7968)
      const url = `https://photon.komoot.io/api/?q=${encodeURIComponent(
        searchQuery
      )}&limit=6&lat=47.3235&lon=12.7968`;

      const response = await fetch(url, { headers: { Accept: "application/json" } });
      if (!response.ok) throw new Error("Network response not ok");

      const data = await response.json();
      const features = data?.features || [];

      // Combine matched curated destinations first
      const localMatches = POPULAR_DESTINATIONS.filter((d) =>
        d.primary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.secondary.toLowerCase().includes(searchQuery.toLowerCase())
      );

      const apiResults: AddressSuggestion[] = features.map(
        (f: { properties: Record<string, string | number>; geometry?: { coordinates: [number, number] } }, idx: number) => {
          const p = f.properties || {};
          const name = (p.name as string) || (p.street as string) || searchQuery;
          const street = p.street as string;
          const housenumber = p.housenumber as string;
          const city = (p.city as string) || (p.town as string) || (p.village as string) || (p.district as string) || "";
          const postcode = (p.postcode as string) || "";
          const state = (p.state as string) || "";
          const country = (p.country as string) || "";

          // Secondary detail line
          const locationParts = [
            street && housenumber ? `${street} ${housenumber}` : street,
            postcode && city ? `${postcode} ${city}` : city || postcode,
            state,
            country,
          ].filter(Boolean);

          const secondary = locationParts.join(", ");
          const fullAddress = [name, secondary].filter(Boolean).join(", ");

          let type: AddressSuggestion["type"] = "address";
          const osmValue = String(p.osm_value || "").toLowerCase();
          if (osmValue.includes("air") || String(name).toLowerCase().includes("flughafen") || String(name).toLowerCase().includes("airport")) {
            type = "airport";
          } else if (osmValue.includes("hotel") || osmValue.includes("tourism")) {
            type = "hotel";
          } else if (osmValue.includes("peak") || osmValue.includes("mountain")) {
            type = "mountain";
          } else if (p.type === "city" || p.type === "town" || p.type === "village") {
            type = "city";
          }

          return {
            id: `photon-${p.osm_id || idx}-${idx}`,
            primary: name,
            secondary,
            fullAddress,
            type,
          };
        }
      );

      // Deduplicate by primary name
      const combined = [...localMatches, ...apiResults];
      const seen = new Set<string>();
      const unique = combined.filter((item) => {
        const key = item.fullAddress.toLowerCase();
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
      }).slice(0, 6);

      setSuggestions(unique);
    } catch {
      const filtered = POPULAR_DESTINATIONS.filter((item) =>
        item.fullAddress.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSuggestions(filtered);
    } finally {
      setIsLoading(false);
    }
  };

  // Debounced search trigger
  useEffect(() => {
    if (isSelectedRef.current) {
      isSelectedRef.current = false;
      return;
    }

    if (!query || query.trim().length < 2) {
      setSuggestions(POPULAR_DESTINATIONS.slice(0, 5));
      setIsLoading(false);
      return;
    }

    const timer = setTimeout(() => {
      fetchSuggestions(query);
    }, 200);

    return () => clearTimeout(timer);
  }, [query, fetchSuggestions]);

  const handleSelect = (item: AddressSuggestion) => {
    isSelectedRef.current = true;
    setQuery(item.fullAddress);
    onChange(item.fullAddress);
    setIsOpen(false);
    setSelectedIndex(-1);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen || suggestions.length === 0) {
      if (e.key === "ArrowDown") setIsOpen(true);
      return;
    }

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev < suggestions.length - 1 ? prev + 1 : 0));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : suggestions.length - 1));
    } else if (e.key === "Enter") {
      if (selectedIndex >= 0 && selectedIndex < suggestions.length) {
        e.preventDefault();
        handleSelect(suggestions[selectedIndex]);
      }
    } else if (e.key === "Escape") {
      setIsOpen(false);
    }
  };

  const getIcon = (type?: AddressSuggestion["type"]) => {
    switch (type) {
      case "airport":
        return <Plane className="w-3.5 h-3.5 text-[#DFBA73] shrink-0" strokeWidth={1.8} />;
      case "mountain":
        return <Mountain className="w-3.5 h-3.5 text-[#DFBA73] shrink-0" strokeWidth={1.8} />;
      case "hotel":
        return <Building2 className="w-3.5 h-3.5 text-[#DFBA73] shrink-0" strokeWidth={1.8} />;
      default:
        return <MapPin className="w-3.5 h-3.5 text-[#DFBA73] shrink-0" strokeWidth={1.8} />;
    }
  };

  const handleClear = () => {
    setQuery("");
    onChange("");
    setSuggestions(POPULAR_DESTINATIONS.slice(0, 5));
  };

  return (
    <div ref={wrapperRef} className="relative w-full">
      {/* Left Icon */}
      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-silver-muted z-10">
        {icon || <MapPin className="w-4 h-4" strokeWidth={1.5} />}
      </div>

      {/* Main Address Input */}
      <input
        type="text"
        name={name}
        value={query}
        autoComplete="off"
        required={required}
        placeholder={placeholder}
        onFocus={() => {
          setIsOpen(true);
          if (suggestions.length === 0) {
            setSuggestions(POPULAR_DESTINATIONS.slice(0, 5));
          }
        }}
        onChange={(e) => {
          setQuery(e.target.value);
          onChange(e.target.value);
          setIsOpen(true);
        }}
        onKeyDown={handleKeyDown}
        className={`w-full pl-10 pr-9 py-3 sm:py-3.5 bg-obsidian border border-hairline rounded-xl text-base sm:text-sm text-platinum-light placeholder:text-silver-muted focus:border-platinum-mid focus:outline-none transition-colors ${className}`}
      />

      {/* Clear or Loading Indicator on Right */}
      <div className="absolute inset-y-0 right-0 pr-3 flex items-center gap-1.5 z-10">
        {isLoading ? (
          <Loader2 className="w-3.5 h-3.5 text-[#DFBA73] animate-spin" />
        ) : query ? (
          <button
            type="button"
            onClick={handleClear}
            className="text-silver-muted hover:text-white transition-colors p-1"
            tabIndex={-1}
          >
            <X className="w-3.5 h-3.5" />
          </button>
        ) : null}
      </div>

      {/* Google Maps Styled Suggestions Dropdown */}
      {isOpen && suggestions.length > 0 && (
        <div className="absolute left-0 right-0 top-full mt-1.5 z-50 bg-[#12151B] border border-hairline/90 rounded-xl shadow-2xl overflow-hidden backdrop-blur-md animate-in fade-in zoom-in-95 duration-150">
          {/* Header Badge */}
          <div className="px-3.5 py-1.5 bg-[#0C0E12] border-b border-hairline/60 flex items-center justify-between text-[10px] font-semibold tracking-wider text-silver-muted/80 uppercase">
            <span className="flex items-center gap-1.5">
              <Search className="w-3 h-3 text-[#DFBA73]" />
              {query.trim().length < 2 ? "Beliebte Ziele / Schnellwahl" : "Google Maps Vorschläge"}
            </span>
            <span className="text-[9px] text-[#DFBA73] font-mono lowercase">maps suggestions</span>
          </div>

          {/* Suggestion List */}
          <ul className="max-h-60 overflow-y-auto divide-y divide-hairline/30 py-1">
            {suggestions.map((item, index) => {
              const isSelected = index === selectedIndex;
              return (
                <li
                  key={item.id}
                  onClick={() => handleSelect(item)}
                  onMouseEnter={() => setSelectedIndex(index)}
                  className={`px-3.5 py-2.5 flex items-start gap-2.5 cursor-pointer transition-colors ${
                    isSelected ? "bg-white/[0.08]" : "hover:bg-white/[0.04]"
                  }`}
                >
                  <div className="mt-0.5 p-1.5 rounded-lg bg-obsidian border border-hairline shrink-0">
                    {getIcon(item.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs sm:text-sm font-semibold text-white truncate">
                      {item.primary}
                    </div>
                    {item.secondary && (
                      <div className="text-[11px] text-silver-muted truncate mt-0.5">
                        {item.secondary}
                      </div>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
