import { useState, useEffect } from "react";
import { Transaction } from "../types/transaction";
import { IBankRepository } from "../repositories/IBankRepository";

export function useBank(repository: IBankRepository) {
  const [balance, setBalance] = useState<number>(12450.75);
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  // Load from repository on mount asynchronously
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [fetchedBalance, fetchedTxs] = await Promise.all([
          repository.getBalance(),
          repository.getTransactions()
        ]);
        setBalance(fetchedBalance);
        setTransactions(fetchedTxs);
      } catch (err) {
        console.error("Failed to fetch bank data:", err);
      }
    };
    
    fetchData();
  }, [repository]);

  const handleTransfer = async (amountNum: number, recipient: string, note: string) => {
    // 1. Optimistic UI Updates
    const newBalance = balance - amountNum;
    setBalance(newBalance);

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

    // 2. Asynchronous Remote/Local Storage Persistence
    try {
      await Promise.all([
        repository.saveBalance(newBalance),
        repository.saveTransactions(newTransactions)
      ]);
    } catch (err) {
      console.error("Failed to save transaction state:", err);
      // In a real app, you would rollback the state here
    }

    // 3. Simulate external status change after a delay
    setTimeout(async () => {
      setTransactions(curr => {
        const updated = curr.map(t => t.id === newTx.id ? { ...t, status: "completed" as const } : t);
        // Save the updated list asynchronously without blocking UI
        repository.saveTransactions(updated).catch(console.error);
        return updated;
      });
    }, 3000);
  };

  return { balance, transactions, handleTransfer };
}
