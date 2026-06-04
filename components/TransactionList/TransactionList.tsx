"use client";

import { useState, useMemo, ReactElement } from "react";
import { Transaction, TxStatus } from "../../types";
import cardStyles from "../Card/Card.module.css";
import styles from "./TransactionList.module.css";

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
    <section className={cardStyles.card}>
      <div className={styles.transactionHeader}>
        <h2 className={`${cardStyles.cardTitle} ${styles.transactionTitle}`}>Recent Transactions</h2>
      </div>

      <div className={styles.filters}>
        {(["all", "completed", "pending", "failed"] as const).map(f => (
          <button 
            key={f}
            className={`${styles.filterBtn} ${filter === f ? styles.filterBtnActive : ''}`}
            onClick={() => setFilter(f)}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      <div className={styles.transactionList}>
        {filteredTransactions.length === 0 ? (
          <div className={styles.transactionEmpty}>
            No transactions found.
          </div>
        ) : (
          filteredTransactions.map(tx => {
            const statusClass = tx.status === 'completed' ? styles.statusCompleted : tx.status === 'pending' ? styles.statusPending : styles.statusFailed;
            const amountClass = tx.amount > 0 ? styles.txAmountPositive : styles.txAmountNegative;
            
            return (
              <div key={tx.id} className={styles.transactionItem}>
                <div className={styles.txInfo}>
                  <div className={styles.txIcon}>
                    {tx.type === 'deposit' ? '↓' : '↑'}
                  </div>
                  <div>
                    <h4 className={styles.txDetailsH4}>{tx.recipient}</h4>
                    <p className={styles.txDetailsP}>{tx.date} • {tx.note}</p>
                  </div>
                </div>
                <div className={styles.txAmountStatus}>
                  <div className={`${styles.txAmount} ${amountClass}`}>
                    {tx.amount > 0 ? '+' : ''}${Math.abs(tx.amount).toFixed(2)}
                  </div>
                  <div className={`${styles.txStatus} ${statusClass}`}>
                    {tx.status}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </section>
  );
}
