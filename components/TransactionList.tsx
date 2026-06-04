"use client";

import { useState, useMemo, ReactElement } from "react";
import { Transaction, TxStatus } from "../types";

interface Props {
  transactions: Transaction[];
}

export default function TransactionList({ transactions }: Props): ReactElement {
  const [filter, setFilter] = useState<TxStatus | "all">("all");

  const filteredTransactions = useMemo(() => {
    if (filter === "all") return transactions;
    return transactions.filter(t => t.status === filter);
  }, [transactions, filter]);

  return (
    <section className="card">
      <div className="transaction-header">
        <h2 className="card-title transaction-title">Recent Transactions</h2>
      </div>

      <div className="filters">
        {(["all", "completed", "pending", "failed"] as const).map(f => (
          <button 
            key={f}
            className={`filter-btn ${filter === f ? 'active' : ''}`}
            onClick={() => setFilter(f)}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      <div className="transaction-list">
        {filteredTransactions.length === 0 ? (
          <div className="transaction-empty">
            No transactions found.
          </div>
        ) : (
          filteredTransactions.map(tx => (
            <div key={tx.id} className="transaction-item">
              <div className="tx-info">
                <div className="tx-icon">
                  {tx.type === 'deposit' ? '↓' : '↑'}
                </div>
                <div className="tx-details">
                  <h4>{tx.recipient}</h4>
                  <p>{tx.date} • {tx.note}</p>
                </div>
              </div>
              <div className="tx-amount-status">
                <div className={`tx-amount ${tx.amount > 0 ? 'positive' : 'negative'}`}>
                  {tx.amount > 0 ? '+' : ''}${Math.abs(tx.amount).toFixed(2)}
                </div>
                <div className={`tx-status status-${tx.status}`}>
                  {tx.status}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
