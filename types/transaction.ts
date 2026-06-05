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

// SQL Injection prevention regex - detects common SQL keywords and dangerous patterns
const SQL_INJECTION_REGEX =
  /(\b(SELECT|INSERT|UPDATE|DELETE|DROP|CREATE|ALTER|EXEC|EXECUTE|UNION|DECLARE|CAST|CONVERT)\b|--|;|\/\*|\*\/|xp_|sp_)/gi;

// Sanitization helper to remove or escape dangerous characters
export const sanitizeInput = (input: string): string => {
  return input.replace(/[;'"%]/g, "").trim();
};

// Validation function for SQL injection
const validateSQLInjection = (input: string) => {
  return !SQL_INJECTION_REGEX.test(input);
};

export const createTransactionSchema = z.object({
  amount: z.number().min(0.01, "Amount must be greater than 0"),
  recipient: z
    .string()
    .min(1, "Recipient is required")
    .max(255, "Recipient too long")
    .refine(
      validateSQLInjection,
      "Invalid input: contains SQL keywords or suspicious characters",
    ),
  description: z
    .string()
    .max(255, "Description too long")
    .refine(
      (val) => !val || validateSQLInjection(val),
      "Invalid input: contains SQL keywords or suspicious characters",
    )
    .optional(),
});

export type CreateTransactionInput = z.infer<typeof createTransactionSchema>;
