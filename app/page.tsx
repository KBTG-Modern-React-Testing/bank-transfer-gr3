"use client";

import Header from "../components/Header/Header";
import BalanceCard from "../components/BalanceCard/BalanceCard";
import TransferForm from "../components/TransferForm/TransferForm";
import TransactionList from "../components/TransactionList/TransactionList";
import styles from "./page.module.css";
import { useBank } from "../hooks/useBank";

export default function Home() {
  const { balance, transactions, handleTransfer } = useBank();

  return (
    <div className="container">
      <Header />
      <div className={styles.dashboardGrid}>
        <div className={styles.flexColumnGap2}>
          <BalanceCard balance={balance} />
          <TransferForm balance={balance} onTransfer={handleTransfer} />
        </div>
        <TransactionList transactions={transactions} />
      </div>
    </div>
  );
}
