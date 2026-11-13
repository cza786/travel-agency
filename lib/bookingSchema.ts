import { z } from "zod";

export const bookingFormSchema = z.object({
  fullName: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email address is required"),
  phone: z.string().min(5, "Valid phone number is required"),
  pickup: z.string().min(2, "Pickup address is required"),
  dropoff: z.string().min(2, "Destination address is required"),
  date: z.string().min(1, "Date is required"),
  time: z.string().min(1, "Time is required"),
  flightNumber: z.string().optional().default(""),
  passengers: z.coerce.number().int().min(1).max(8).default(2),
  luggage: z.coerce.number().int().min(0).max(16).default(2),
  vehicle: z.string().default("Mercedes-Benz V-Klasse VIP"),
  notes: z.string().optional().default(""),
  locale: z.string().default("de"),
});

export type BookingFormData = z.infer<typeof bookingFormSchema>;

export interface BookingResponse {
  success: boolean;
  referenceId?: string;
  error?: string;
  message?: string;
  whatsappUrl?: string;
}

