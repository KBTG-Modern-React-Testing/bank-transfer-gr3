"use client";

import { ReactElement } from "react";
import { Transaction } from "../../types/transaction";
import { useTransactionPagination } from "../../hooks/useTransactionPagination";
import TransactionItem from "../TransactionItem/TransactionItem";
import cardStyles from "../Card/Card.module.css";
import styles from "./TransactionList.module.css";

interface Props {
  transactions: Transaction[];
}

export default function TransactionList({ transactions }: Props): ReactElement {
  const {
    filter,
    setFilter,
    currentPage,
    setCurrentPage,
    pageSize,
    setPageSize,
    currentTransactions,
    filteredTransactionsCount,
    totalPages
  } = useTransactionPagination(transactions);

  return (
    <section className={cardStyles.card} aria-labelledby="recent-transactions-heading">
      <div className={styles.transactionHeader}>
        <h2 id="recent-transactions-heading" className={`${cardStyles.cardTitle} ${styles.transactionTitle}`}>
          Recent Transactions
        </h2>
      </div>

      <div className={styles.filters} role="group" aria-label="Filter transactions">
        {(["all", "completed", "pending", "failed"] as const).map(f => (
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

      <ul className={styles.transactionList} aria-live="polite" aria-relevant="additions text">
        {currentTransactions.length === 0 ? (
          <li className={styles.transactionEmpty} role="status">
            No transactions found.
          </li>
        ) : (
          currentTransactions.map(tx => <TransactionItem key={tx.id} tx={tx} />)
        )}
      </ul>
      
      {filteredTransactionsCount > 0 && (
        <div className={styles.pagination}>
          <div className={styles.pageInfo}>
            Page {currentPage} of {totalPages} ({filteredTransactionsCount} items)
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
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              aria-label="Previous page"
            >
              Prev
            </button>
            <button 
              type="button"
              className={styles.pageBtn} 
              disabled={currentPage >= totalPages}
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
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
