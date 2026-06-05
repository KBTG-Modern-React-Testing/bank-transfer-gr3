"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import cardStyles from "../Card/Card.module.css";
import styles from "./TransferForm.module.css";
import {
  createTransactionSchema,
  sanitizeInput,
  type CreateTransactionInput,
} from "@/types/transaction";

interface Props {
  balance: number;
  onTransfer: (amount: number, recipient: string, note: string) => void;
}

export default function TransferForm({ balance, onTransfer }: Props) {
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<CreateTransactionInput>({
    resolver: zodResolver(createTransactionSchema),
  });

  const recipientValue = watch("recipient");
  const descriptionValue = watch("description");

  const handleInputBlur = (fieldName: "recipient" | "description") => {
    const value = fieldName === "recipient" ? recipientValue : descriptionValue;
    if (value && /[;'"%]/g.test(value)) {
      clearErrors(fieldName);
    }
  };

  const handleTransfer = (data: CreateTransactionInput) => {
    if (data.amount > balance) {
      setError("amount", {
        type: "validate",
        message: "Insufficient funds",
      });
      return;
    }

    // Sanitize inputs before sending to backend
    const sanitizedRecipient = sanitizeInput(data.recipient);
    const sanitizedDescription = sanitizeInput(data.description ?? "");

    onTransfer(data.amount, sanitizedRecipient, sanitizedDescription);
  };

  return (
    <section className={cardStyles.card}>
      <h2 className={cardStyles.cardTitle}>Transfer Money</h2>
      <form onSubmit={handleSubmit((data) => handleTransfer(data))}>
        <div className={styles.formGroup}>
          <label>Recipient</label>
          <input
            type="text"
            className={styles.formControl}
            placeholder="Name or Email"
            {...register("recipient")}
            onBlur={() => handleInputBlur("recipient")}
            disabled={isSubmitting}
            required
            aria-required="true"
            aria-invalid={errors.recipient ? "true" : "false"}
            title="Recipient name or email"
          />
          {errors.recipient && (
            <p className="mt-1 text-sm text-red-500">
              {errors.recipient.message}
            </p>
          )}
        </div>
        <div className={styles.formGroup}>
          <label>Amount ($)</label>
          <input
            type="number"
            className={styles.formControl}
            placeholder="0.00"
            // min="0.01"
            step="0.01"
            {...register("amount", { valueAsNumber: true })}
            disabled={isSubmitting}
            required
            aria-required="true"
            aria-invalid={errors.amount ? "true" : "false"}
          />
          {errors.amount && (
            <p className="mt-1 text-sm text-red-600">{errors.amount.message}</p>
          )}
        </div>
        <div className={styles.formGroup}>
          <label>Note (Optional)</label>
          <input
            type="text"
            className={styles.formControl}
            placeholder="What is this for?"
            {...register("description")}
            onBlur={() => handleInputBlur("description")}
            disabled={isSubmitting}
            aria-invalid={errors.description ? "true" : "false"}
            title="Transaction note or description"
          />
          {errors.description && (
            <p className="mt-1 text-sm text-red-600">
              {errors.description.message}
            </p>
          )}
        </div>
        <button
          type="submit"
          className={styles.btnPrimary}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Processing..." : "Send Money"}
        </button>
      </form>
    </section>
  );
}
