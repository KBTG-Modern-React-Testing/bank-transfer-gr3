"use client";

import { useState } from "react";
import { Transaction } from "../types";
import Header from "../components/Header/Header";
import BalanceCard from "../components/BalanceCard/BalanceCard";
import TransferForm from "../components/TransferForm/TransferForm";
import TransactionList from "../components/TransactionList/TransactionList";
import styles from "./page.module.css";

const initialTransactions: Transaction[] = [
  { id: "tx1", type: "transfer", recipient: "John Doe", amount: -150.00, note: "Dinner", status: "completed", date: "2026-06-03" },
  { id: "tx2", type: "deposit", recipient: "Salary", amount: 4200.00, note: "Monthly Salary", status: "completed", date: "2026-06-01" },
  { id: "tx3", type: "transfer", recipient: "Netflix", amount: -15.99, note: "Subscription", status: "pending", date: "2026-06-04" },
  { id: "tx4", type: "transfer", recipient: "Amazon", amount: -89.50, note: "Gift", status: "failed", date: "2026-06-02" },
];

export default function Home() {
  const [balance, setBalance] = useState<number>(12450.75);
  const [transactions, setTransactions] = useState<Transaction[]>(initialTransactions);

  const handleTransfer = (amountNum: number, recipient: string, note: string) => {
    setBalance(prev => prev - amountNum);
    const newTx: Transaction = {
      id: `tx${Date.now()}`,
      type: "transfer",
      recipient: recipient,
      amount: -amountNum,
      note: note || "Transfer",
      status: "pending",
      date: new Date().toISOString().split("T")[0]
    };
    
    setTransactions(prev => [newTx, ...prev]);

    // Simulate status change after a while
    setTimeout(() => {
      setTransactions(curr => 
        curr.map(t => t.id === newTx.id ? { ...t, status: "completed" } : t)
      );
    }, 3000);
  };

  return (
    <main id="maincontent" className="container">
      <Header />
      <div className={styles.dashboardGrid}>
        <div className={styles.flexColumnGap2}>
          <BalanceCard balance={balance} />
          <TransferForm balance={balance} onTransfer={handleTransfer} />
        </div>
        <TransactionList transactions={transactions} />
      </div>
    </main>
  );
}
