import { z } from "zod";

export type TxStatus = "completed" | "pending" | "failed";
export type TransactionType = "transfer" | "deposit" | "withdrawal";

export type Transaction = {
  id: string;
  type: TransactionType;
  recipient: string;
  amount: number;
  note: string;
  status: TxStatus;
  date: string;
};

export const createTransactionSchema = z.object({
  amount: z.number().positive("Amount must be positive"),
  recipient: z.string().min(1, "Recipient is required"),
  description: z.string().max(255, "Description too long").optional(),
});

export type CreateTransactionInput = z.infer<typeof createTransactionSchema>;
