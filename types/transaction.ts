import { z } from "zod";

export const createTransactionSchema = z.object({
  amount: z.number().positive("Amount must be positive"),
  recipient: z.string().min(1, "Recipient is required"),
  description: z.string().max(255, "Description too long").optional(),
});

export type CreateTransactionInput = z.infer<typeof createTransactionSchema>;
