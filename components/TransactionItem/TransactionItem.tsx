import { ReactElement } from "react";
import { Transaction } from "../../types/transaction";
import styles from "../TransactionList/TransactionList.module.css";

interface Props {
  tx: Transaction;
}

export default function TransactionItem({ tx }: Props): ReactElement {
  const statusClass = tx.status === 'completed' ? styles.statusCompleted : tx.status === 'pending' ? styles.statusPending : styles.statusFailed;
  const amountClass = tx.amount > 0 ? styles.txAmountPositive : styles.txAmountNegative;
  const amountText = `${tx.amount > 0 ? '+' : ''}$${Math.abs(tx.amount).toFixed(2)}`;

  return (
    <li
      className={styles.transactionItem}
      aria-label={`${tx.recipient} ${tx.status} transaction for ${amountText} on ${tx.date}. Note: ${tx.note}`}
    >
      <div className={styles.txInfo}>
        <span className={styles.txIcon} aria-hidden="true">
          {tx.type === 'deposit' ? '↓' : '↑'}
        </span>
        <span className="sr-only">{tx.type === 'deposit' ? 'Deposit' : 'Transfer'}</span>
        <div>
          <h4 className={styles.txDetailsH4}>{tx.recipient}</h4>
          <p className={styles.txDetailsP}>{tx.date} • {tx.note}</p>
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
}
