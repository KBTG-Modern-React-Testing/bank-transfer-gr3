import { useState, useEffect } from "react";
import { Transaction } from "../types/transaction";
import { bankRepository } from "../repositories/bankRepository";

export function useBank() {
  const [balance, setBalance] = useState<number>(12450.75);
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  // Load from repository on mount safely
  useEffect(() => {
    Promise.resolve().then(() => {
      setBalance(bankRepository.getBalance());
      setTransactions(bankRepository.getTransactions());
    });
  }, []);

  const handleTransfer = (amountNum: number, recipient: string, note: string) => {
    const newBalance = balance - amountNum;
    setBalance(newBalance);
    bankRepository.saveBalance(newBalance);

    const newTx: Transaction = {
      id: `tx${Date.now()}`,
      type: "transfer",
      recipient: recipient,
      amount: -amountNum,
      note: note || "Transfer",
      status: "pending",
      date: new Date().toISOString().split("T")[0]
    };
    
    const newTransactions = [newTx, ...transactions];
    setTransactions(newTransactions);
    bankRepository.saveTransactions(newTransactions);

    // Simulate status change after a while
    setTimeout(() => {
      setTransactions(curr => {
        const updated = curr.map(t => t.id === newTx.id ? { ...t, status: "completed" as const } : t);
        bankRepository.saveTransactions(updated);
        return updated;
      });
    }, 3000);
  };

  return { balance, transactions, handleTransfer };
}
