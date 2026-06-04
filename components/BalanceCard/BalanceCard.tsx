import { ReactElement } from "react";
import cardStyles from "../Card/Card.module.css";
import styles from "./BalanceCard.module.css";

interface Props {
  balance: number;
}

export default function BalanceCard({ balance }: Props): ReactElement {
  const formattedBalance = balance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  
  // Decide the font size class based on string length to prevent overflow
  let amountClass = styles.balanceAmount;
  if (formattedBalance.length > 18) {
    amountClass = `${styles.balanceAmount} ${styles.balanceAmountSmallest}`;
  } else if (formattedBalance.length > 12) {
    amountClass = `${styles.balanceAmount} ${styles.balanceAmountSmall}`;
  }

  return (
    <section className={cardStyles.card}>
      <h2 className={cardStyles.cardTitle}>Total Balance</h2>
      <div className={amountClass}>
        ${formattedBalance}
      </div>
      <p className={styles.balanceSubtitle}>
        Available funds
      </p>
    </section>
  );
}
