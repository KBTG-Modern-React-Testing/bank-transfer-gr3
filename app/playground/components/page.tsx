"use client";

import Header from "../../../components/Header/Header";
import BalanceCard from "../../../components/BalanceCard/BalanceCard";
import TransferForm from "../../../components/TransferForm/TransferForm";
import TransactionItem from "../../../components/TransactionItem/TransactionItem";
import TransactionList from "../../../components/TransactionList/TransactionList";
import { Transaction } from "../../../types/transaction";
import styles from "./playground.module.css";
import Link from "next/link";

const dummyTransactions: Transaction[] = [
  { id: "p1", type: "deposit", recipient: "Salary", amount: 5000.00, note: "Monthly Income", status: "completed", date: "2026-06-01" },
  { id: "p2", type: "transfer", recipient: "Coffee Shop", amount: -4.50, note: "Latte", status: "completed", date: "2026-06-02" },
  { id: "p3", type: "transfer", recipient: "Electric Bill", amount: -120.00, note: "Utilities", status: "pending", date: "2026-06-03" },
  { id: "p4", type: "transfer", recipient: "Netflix", amount: -15.99, note: "Subscription", status: "failed", date: "2026-06-04" },
];

const expandedMockTransactions: Transaction[] = [
  ...dummyTransactions,
  { id: "p5", type: "transfer", recipient: "Groceries", amount: -85.20, note: "Supermarket", status: "completed", date: "2026-06-05" },
  { id: "p6", type: "transfer", recipient: "Gym", amount: -45.00, note: "Monthly fee", status: "completed", date: "2026-06-05" },
  { id: "p7", type: "transfer", recipient: "Amazon", amount: -129.99, note: "Electronics", status: "pending", date: "2026-06-06" },
  { id: "p8", type: "deposit", recipient: "Refund", amount: 15.99, note: "Subscription Refund", status: "completed", date: "2026-06-07" },
  { id: "p9", type: "transfer", recipient: "Restaurant", amount: -65.40, note: "Dinner", status: "completed", date: "2026-06-08" },
  { id: "p10", type: "transfer", recipient: "Gas Station", amount: -40.00, note: "Fuel", status: "completed", date: "2026-06-09" },
  { id: "p11", type: "transfer", recipient: "Internet Bill", amount: -75.00, note: "Monthly", status: "failed", date: "2026-06-10" },
  { id: "p12", type: "deposit", recipient: "Freelance", amount: 850.00, note: "Project", status: "completed", date: "2026-06-11" },
];

export default function PlaygroundPage() {
  return (
    <div className={styles.playgroundContainer}>
      <Header />
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem', marginTop: '1rem' }}>
        <h1 className={styles.title}>Component Playground</h1>
        <Link href="/" style={{ color: 'var(--accent-color)', textDecoration: 'none', fontWeight: 600 }}>
          ← Back to App
        </Link>
      </div>

      <section className={styles.componentSection}>
        <h2 className={styles.sectionTitle}>BalanceCard</h2>
        <div className={styles.demoArea}>
          <div style={{ flex: '1', minWidth: '300px' }}>
            <BalanceCard balance={12500.75} />
          </div>
          <div style={{ flex: '1', minWidth: '300px' }}>
            <BalanceCard balance={1000000000} />
          </div>
        </div>
      </section>

      <section className={styles.componentSection}>
        <h2 className={styles.sectionTitle}>TransferForm</h2>
        <div className={styles.demoArea}>
          <div style={{ maxWidth: '500px', width: '100%' }}>
            <TransferForm balance={12500.75} onTransfer={(amount, to) => alert(`Simulated transfer of $${amount} to ${to}`)} />
          </div>
        </div>
      </section>

      <section className={styles.componentSection}>
        <h2 className={styles.sectionTitle}>TransactionList (Interactive)</h2>
        <div className={styles.demoArea}>
          <div style={{ width: '100%', maxWidth: '800px' }}>
            <TransactionList transactions={expandedMockTransactions} />
          </div>
        </div>
      </section>

      <section className={styles.componentSection}>
        <h2 className={styles.sectionTitle}>TransactionItem Variants</h2>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1rem', width: '100%', maxWidth: '600px' }}>
          {dummyTransactions.map(tx => (
            <TransactionItem key={tx.id} tx={tx} />
          ))}
        </ul>
      </section>
      
    </div>
  );
}
