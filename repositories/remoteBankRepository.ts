import { Transaction } from "../types/transaction";
import { IBankRepository } from "./IBankRepository";

export const remoteBankRepository: IBankRepository = {
  getBalance: async (): Promise<number> => {
    try {
      const response = await fetch('/api/balance');
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      return data.balance;
    } catch (err) {
      console.error('Fetch error:', err);
      return 0; // Fallback
    }
  },

  saveBalance: async (balance: number): Promise<void> => {
    try {
      await fetch('/api/balance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ balance })
      });
    } catch (err) {
      console.error('Fetch error:', err);
    }
  },

  getTransactions: async (): Promise<Transaction[]> => {
    try {
      const response = await fetch('/api/transactions');
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      return data.transactions;
    } catch (err) {
      console.error('Fetch error:', err);
      return []; // Fallback
    }
  },

  saveTransactions: async (transactions: Transaction[]): Promise<void> => {
    try {
      await fetch('/api/transactions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ transactions })
      });
    } catch (err) {
      console.error('Fetch error:', err);
    }
  }
};
