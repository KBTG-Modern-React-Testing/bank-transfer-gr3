import { useState, useEffect } from "react";
import { Transaction } from "../types";

const initialTransactions: Transaction[] = [
  { id: "tx1", type: "transfer", recipient: "John Doe", amount: -150.00, note: "Dinner", status: "completed", date: "2026-06-03" },
  { id: "tx2", type: "deposit", recipient: "Salary", amount: 4200.00, note: "Monthly Salary", status: "completed", date: "2026-06-01" },
  { id: "tx3", type: "transfer", recipient: "Netflix", amount: -15.99, note: "Subscription", status: "pending", date: "2026-06-04" },
  { id: "tx4", type: "transfer", recipient: "Amazon", amount: -89.50, note: "Gift", status: "failed", date: "2026-06-02" },
];

export function useBank() {
  const [balance, setBalance] = useState<number>(12450.75);
  const [transactions, setTransactions] = useState<Transaction[]>(initialTransactions);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    const savedBalance = localStorage.getItem("bank_balance");
    const savedTransactions = localStorage.getItem("bank_transactions");
    
    setTimeout(() => {
      if (savedBalance) {
        setBalance(parseFloat(savedBalance));
      }
      if (savedTransactions) {
        try {
          setTransactions(JSON.parse(savedTransactions));
        } catch (e) {
          console.error("Failed to parse transactions", e);
        }
      }
      setIsLoaded(true);
    }, 0);
  }, []);

  // Save to localStorage when state changes
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("bank_balance", balance.toString());
      localStorage.setItem("bank_transactions", JSON.stringify(transactions));
    }
  }, [balance, transactions, isLoaded]);

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

  return { balance, transactions, isLoaded, handleTransfer };
}
