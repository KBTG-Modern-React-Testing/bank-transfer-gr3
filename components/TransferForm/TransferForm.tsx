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

  const handleTransfer = (e: FormEvent) => {
    e.preventDefault();
    if (!form.recipient || !form.amount) return;

    const amountNum = parseFloat(form.amount);
    if (isNaN(amountNum) || amountNum <= 0) return;
    if (amountNum > balance) {
      alert("Insufficient funds!");
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      onTransfer(amountNum, form.recipient, form.note);
      setForm({ recipient: "", amount: "", note: "" });
      setIsSubmitting(false);
    }, 800);
  };

  return (
    <section className={cardStyles.card}>
      <h2 className={cardStyles.cardTitle}>Transfer Money</h2>
      <form onSubmit={handleTransfer}>
        <div className={styles.formGroup}>
          <label>Recipient</label>
          <input 
            type="text" 
            className={styles.formControl} 
            placeholder="Name or Email" 
            value={form.recipient}
            onChange={e => setForm({...form, recipient: e.target.value})}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label>Amount ($)</label>
          <input 
            type="number" 
            className={styles.formControl} 
            placeholder="0.00" 
            min="0.01"
            step="0.01"
            value={form.amount}
            onChange={e => setForm({...form, amount: e.target.value})}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label>Note (Optional)</label>
          <input 
            type="text" 
            className={styles.formControl} 
            placeholder="What is this for?" 
            value={form.note}
            onChange={e => setForm({...form, note: e.target.value})}
          />
        </div>
        <button type="submit" className={styles.btnPrimary} disabled={isSubmitting}>
          {isSubmitting ? 'Processing...' : 'Send Money'}
        </button>
      </form>
    </section>
  );
}
