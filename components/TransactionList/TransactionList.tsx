"use client";

import { useState, useMemo, useEffect, ReactElement } from "react";
import { Transaction, TxStatus } from "../../types";
import cardStyles from "../Card/Card.module.css";
import styles from "./TransactionList.module.css";

interface Props {
  transactions: Transaction[];
}

export default function TransactionList({ transactions }: Props): ReactElement {
  const [filter, setFilter] = useState<TxStatus | "all">("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  const filteredTransactions = useMemo(() => {
    if (filter === "all") return transactions;
    return transactions.filter((t) => t.status === filter);
  }, [transactions, filter]);

  const totalPages = Math.ceil(filteredTransactions.length / pageSize) || 1;

  // Reset to page 1 whenever filter or page size changes.
  useEffect(() => {
    setTimeout(() => {
      setCurrentPage(1);
    }, 0);
  }, [filter, pageSize]);

  // Also ensure currentPage does not exceed totalPages if transactions array shrinks
  useEffect(() => {
    if (currentPage > totalPages) {
      setTimeout(() => {
        setCurrentPage(totalPages);
      }, 0);
    }
  }, [totalPages, currentPage]);

  const currentTransactions = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return filteredTransactions.slice(startIndex, startIndex + pageSize);
  }, [filteredTransactions, currentPage, pageSize]);

  return (
    <section
      className={cardStyles.card}
      aria-labelledby="recent-transactions-heading"
    >
      <div className={styles.transactionHeader}>
        <h2
          id="recent-transactions-heading"
          className={`${cardStyles.cardTitle} ${styles.transactionTitle}`}
        >
          Recent Transactions
        </h2>
      </div>

      <div
        className={styles.filters}
        role="group"
        aria-label="Filter transactions"
      >
        {(["all", "completed", "pending", "failed"] as const).map((f) => (
          <button
            key={f}
            type="button"
            className={`${styles.filterBtn} ${filter === f ? styles.filterBtnActive : ""}`}
            onClick={() => setFilter(f)}
            aria-pressed={filter === f}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      <ul
        className={styles.transactionList}
        aria-live="polite"
        aria-relevant="additions text"
      >
        {currentTransactions.length === 0 ? (
          <li className={styles.transactionEmpty} role="status">
            No transactions found.
          </li>
        ) : (
          currentTransactions.map((tx) => {
            const statusClass =
              tx.status === "completed"
                ? styles.statusCompleted
                : tx.status === "pending"
                  ? styles.statusPending
                  : styles.statusFailed;
            const amountClass =
              tx.amount > 0 ? styles.txAmountPositive : styles.txAmountNegative;
            const amountText = `${tx.amount > 0 ? "+" : ""}$${Math.abs(tx.amount).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

            return (
              <li
                key={tx.id}
                className={styles.transactionItem}
                aria-label={`${tx.recipient} ${tx.status} transaction for ${amountText} on ${tx.date}. Note: ${tx.note}`}
              >
                <div className={styles.txInfo}>
                  <span className={styles.txIcon} aria-hidden="true">
                    {tx.type === "deposit" ? "↓" : "↑"}
                  </span>
                  <span className="sr-only">
                    {tx.type === "deposit" ? "Deposit" : "Transfer"}
                  </span>
                  <div>
                    <h4 className={styles.txDetailsH4}>{tx.recipient}</h4>
                    <p className={styles.txDetailsP}>
                      {tx.date} • {tx.note}
                    </p>
                  </div>
                </div>
                <div className={styles.txAmountStatus}>
                  <div className={`${styles.txAmount} ${amountClass}`}>
                    {amountText}
                  </div>
                  <div className={`${styles.txStatus} ${statusClass}`}>
                    {tx.status}
                  </div>
                </div>
              </li>
            );
          })
        )}
      </ul>

      {filteredTransactions.length > 0 && (
        <div className={styles.pagination}>
          <div className={styles.pageInfo}>
            Page {currentPage} of {totalPages} ({filteredTransactions.length}{" "}
            items)
          </div>
          <div className={styles.pageControls}>
            <select
              value={pageSize}
              onChange={(e) => setPageSize(Number(e.target.value))}
              className={styles.pageSelect}
              aria-label="Items per page"
            >
              <option value={5}>5 per page</option>
              <option value={10}>10 per page</option>
              <option value={20}>20 per page</option>
            </select>
            <button
              type="button"
              className={styles.pageBtn}
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
              aria-label="Previous page"
            >
              Prev
            </button>
            <button
              type="button"
              className={styles.pageBtn}
              disabled={currentPage >= totalPages}
              onClick={() =>
                setCurrentPage((prev) => Math.min(totalPages, prev + 1))
              }
              aria-label="Next page"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
