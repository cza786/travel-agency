import { z } from "zod";

export const rentalFormSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email address is required"),
  phone: z.string().min(5, "Valid phone number is required"),
  pickup: z.string().min(2, "Pickup address is required"),
  startDate: z.string().min(1, "Start date & time is required"),
  endDate: z.string().min(1, "End date & time is required"),
  notes: z.string().optional().default(""),
  locale: z.string().default("de"),
});

export type RentalFormData = z.infer<typeof rentalFormSchema>;

export interface RentalResponse {
  success: boolean;
  referenceId?: string;
  error?: string;
  message?: string;
  whatsappUrl?: string;
}
