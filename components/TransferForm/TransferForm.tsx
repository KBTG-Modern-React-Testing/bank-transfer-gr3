"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import cardStyles from "../Card/Card.module.css";
import styles from "./TransferForm.module.css";
import {
  createTransactionSchema,
  type CreateTransactionInput,
} from "@/types/transaction";

interface Props {
  balance: number;
  onTransfer: (amount: number, recipient: string, note: string) => void;
}

export default function TransferForm({
  balance,
  onTransfer,
}: Props) {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
    // reset,
  } = useForm<CreateTransactionInput>({
    resolver: zodResolver(createTransactionSchema),
  });

  const handleTransfer = (data: CreateTransactionInput) => {
    if (data.amount > balance) {
      setError("amount", {
        type: "validate",
        message: "Insufficient funds",
      });
      return;
    }

    onTransfer(data.amount, data.recipient, data.description ?? "");
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
            disabled={isSubmitting}
            required
            aria-required="true"
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
            min="0.01"
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
            disabled={isSubmitting}
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
