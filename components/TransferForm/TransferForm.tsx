"use client";

import { useState, FormEvent, ReactElement } from "react";
import cardStyles from "../Card/Card.module.css";
import styles from "./TransferForm.module.css";

interface Props {
  balance: number;
  onTransfer: (amount: number, recipient: string, note: string) => void;
}

export default function TransferForm({ balance, onTransfer }: Props): ReactElement {
  const [form, setForm] = useState({ recipient: "", amount: "", note: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState("");

  const handleTransfer = (e: FormEvent) => {
    e.preventDefault();

    if (!form.recipient || !form.amount) {
      setFormError("Recipient and amount are required.");
      return;
    }

    const amountNum = parseFloat(form.amount);
    if (isNaN(amountNum) || amountNum <= 0) {
      setFormError("Enter a valid amount greater than zero.");
      return;
    }

    if (amountNum > balance) {
      setFormError("Insufficient funds.");
      return;
    }

    setFormError("");
    setIsSubmitting(true);

    setTimeout(() => {
      onTransfer(amountNum, form.recipient, form.note);
      setForm({ recipient: "", amount: "", note: "" });
      setIsSubmitting(false);
    }, 800);
  };

  return (
    <section className={cardStyles.card} aria-labelledby="transfer-form-heading">
      <h2 id="transfer-form-heading" className={cardStyles.cardTitle}>Transfer Money</h2>
      <form onSubmit={handleTransfer} noValidate>
        <div className={styles.formGroup}>
          <label htmlFor="recipient">Recipient</label>
          <input
            id="recipient"
            type="text"
            className={styles.formControl}
            placeholder="Name or Email"
            value={form.recipient}
            onChange={e => setForm({ ...form, recipient: e.target.value })}
            required
            aria-required="true"
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="amount">Amount ($)</label>
          <input
            id="amount"
            type="number"
            className={styles.formControl}
            placeholder="0.00"
            min="0.01"
            step="0.01"
            value={form.amount}
            onChange={e => setForm({ ...form, amount: e.target.value })}
            required
            aria-required="true"
            aria-invalid={formError ? "true" : "false"}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="note">Note (Optional)</label>
          <input
            id="note"
            type="text"
            className={styles.formControl}
            placeholder="What is this for?"
            value={form.note}
            onChange={e => setForm({ ...form, note: e.target.value })}
          />
        </div>

        {formError ? (
          <p className={styles.formError} role="alert" aria-live="assertive">
            {formError}
          </p>
        ) : null}

        <button type="submit" className={styles.btnPrimary} disabled={isSubmitting}>
          {isSubmitting ? "Processing..." : "Send Money"}
        </button>
      </form>
    </section>
  );
}
