import { z } from "zod";

export const onboardingSchema = z.object({
  name: z.string().min(2, "Last name must be at least 2 characters long"),
  address: z.string().min(5, "Address must be at least 5 characters long"),
});

export const invoiceSchema = z.object({
  invoiceName: z.string().min(1, "invoice name is required"),
  total: z.number().min(1, "1$ is minimum"),
  status: z.enum(["PAID", "PENDING"]).default("PENDING"),
  date: z.string().min(1, "Date is required"),
  dueDate: z.number().min(0, "Due Date is required"),
  fromName: z.string().min(1, "Your name is required"),
  fromEmail: z.string().email(),
  fromAddress: z.string().min(2, "Address is required"),
  clientName: z.string().min(1, "client name is required"),
  clientEmail: z.string().email("Invalid Email address"),
  clientAddress: z.string().min(1, "Client address is required"),
  currency: z.string().min(1, "Currency is required"),
  invoiceNumber: z.number().min(1, "Minimum invoice number of 1"),
  note: z.string().optional(),
  invoiceItemDescription: z.string().min(1, "Description is required"),
  invoiceItemQuantity: z.number().min(1, "Quantity minimum is 1"),
  invoiceItemRate: z.number().min(1, "Min Rate 1"),
  iban: z.string().min(10).max(27, "IBAN is 27 characters long"),
  swift: z.string().min(8, "SWIFT code is 8 characters long"),
  bic: z.string().min(8, "BIC code is 8 characters long"),
  bankName: z.string().min(1),
});
