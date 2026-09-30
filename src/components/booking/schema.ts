import { z } from "zod";

export const customerSchema = z.object({
  name: z.string().trim().min(2, "Name required"),
  email: z.string().trim().email("Valid email required"),
  phone: z.string().trim().regex(/^[+\d\s-]{7,15}$/, "Valid phone required"),
  businessName: z.string().trim().min(1, "Business name required"),
  businessType: z.string().min(1, "Select business type"),
  gstStatus: z.string().min(1, "Select GST status"),
  address: z.string().trim().min(5, "Address required"),
});

export type CustomerInfo = z.infer<typeof customerSchema>;
