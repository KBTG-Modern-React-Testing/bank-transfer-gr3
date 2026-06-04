"use client";

import { useState, FormEvent, ReactElement } from "react";

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
    <section className="card">
      <h2 className="card-title">Transfer Money</h2>
      <form onSubmit={handleTransfer}>
        <div className="form-group">
          <label>Recipient</label>
          <input 
            type="text" 
            className="form-control" 
            placeholder="Name or Email" 
            value={form.recipient}
            onChange={e => setForm({...form, recipient: e.target.value})}
            required
          />
        </div>
        <div className="form-group">
          <label>Amount ($)</label>
          <input 
            type="number" 
            className="form-control" 
            placeholder="0.00" 
            min="0.01"
            step="0.01"
            value={form.amount}
            onChange={e => setForm({...form, amount: e.target.value})}
            required
          />
        </div>
        <div className="form-group">
          <label>Note (Optional)</label>
          <input 
            type="text" 
            className="form-control" 
            placeholder="What is this for?" 
            value={form.note}
            onChange={e => setForm({...form, note: e.target.value})}
          />
        </div>
        <button type="submit" className="btn-primary" disabled={isSubmitting}>
          {isSubmitting ? 'Processing...' : 'Send Money'}
        </button>
      </form>
    </section>
  );
}
