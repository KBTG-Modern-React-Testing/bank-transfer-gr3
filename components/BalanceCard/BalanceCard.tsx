import { ReactElement } from "react";
import cardStyles from "../Card/Card.module.css";
import styles from "./BalanceCard.module.css";

interface Props {
  balance: number;
}

export default function BalanceCard({ balance }: Props): ReactElement {
  return (
    <section className={cardStyles.card}>
      <h2 className={cardStyles.cardTitle}>Total Balance</h2>
      <div className={styles.balanceAmount}>
        ${balance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
      </div>
      <p className={styles.balanceSubtitle}>
        Available funds
      </p>
    </section>
  );
}
