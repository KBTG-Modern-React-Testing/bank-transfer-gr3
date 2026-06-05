import { Transaction } from "../types/transaction";

const initialTransactions: Transaction[] = [
  { id: "tx1", type: "transfer", recipient: "John Doe", amount: -150.00, note: "Dinner", status: "completed", date: "2026-06-03" },
  { id: "tx2", type: "deposit", recipient: "Salary", amount: 4200.00, note: "Monthly Salary", status: "completed", date: "2026-06-01" },
  { id: "tx3", type: "transfer", recipient: "Netflix", amount: -15.99, note: "Subscription", status: "pending", date: "2026-06-04" },
  { id: "tx4", type: "transfer", recipient: "Amazon", amount: -89.50, note: "Gift", status: "failed", date: "2026-06-02" },
];

export const bankRepository = {
  getBalance: (): number => {
    if (typeof window === "undefined") return 12450.75;
    const saved = localStorage.getItem("bank_balance");
    return saved ? parseFloat(saved) : 12450.75;
  },
  saveBalance: (balance: number): void => {
    if (typeof window !== "undefined") {
      localStorage.setItem("bank_balance", balance.toString());
    }
  },
  getTransactions: (): Transaction[] => {
    if (typeof window === "undefined") return initialTransactions;
    const saved = localStorage.getItem("bank_transactions");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return initialTransactions;
      }
    }
    return initialTransactions;
  },
  saveTransactions: (transactions: Transaction[]): void => {
    if (typeof window !== "undefined") {
      localStorage.setItem("bank_transactions", JSON.stringify(transactions));
    }
  }
};
