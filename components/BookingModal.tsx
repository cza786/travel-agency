"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { X } from "lucide-react";
import { BookingForm } from "./BookingForm";

interface BookingModalContextType {
  isOpen: boolean;
  openBooking: (initialData?: { pickup?: string; dropoff?: string }) => void;
  closeBooking: () => void;
}

const BookingModalContext = createContext<BookingModalContextType>({
  isOpen: false,
  openBooking: () => {},
  closeBooking: () => {},
});

export function useBookingModal() {
  return useContext(BookingModalContext);
}

export function BookingModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [initialData, setInitialData] = useState<{ pickup?: string; dropoff?: string }>({});

  const openBooking = (data?: { pickup?: string; dropoff?: string }) => {
    if (data) setInitialData(data);
    setIsOpen(true);
  };

  const closeBooking = () => {
    setIsOpen(false);
    setInitialData({});
  };

  return (
    <BookingModalContext.Provider value={{ isOpen, openBooking, closeBooking }}>
      {children}

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 lg:p-8 overflow-y-auto">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity"
            onClick={closeBooking}
          />

          {/* Modal Container (Adaptive width from phone to widescreen) */}
          <div className="relative w-full max-w-lg sm:max-w-2xl lg:max-w-3xl my-auto z-10 animate-in fade-in zoom-in-95 duration-200">
            {/* Close Button */}
            <button
              type="button"
              onClick={closeBooking}
              className="absolute -top-3 -right-2 sm:-top-4 sm:-right-4 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-graphite-elevated border border-hairline text-platinum-mid hover:text-white flex items-center justify-center shadow-xl z-20 hover:scale-105 transition-all"
              aria-label="Close"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5" strokeWidth={1.5} />
            </button>

            <BookingForm
              initialPickup={initialData.pickup}
              initialDropoff={initialData.dropoff}
              onSuccess={() => {}}
            />
          </div>
        </div>
      )}
    </BookingModalContext.Provider>
  );
}
