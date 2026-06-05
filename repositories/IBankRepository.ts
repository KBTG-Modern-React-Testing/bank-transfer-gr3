import { Transaction } from "../types/transaction";

export interface IBankRepository {
  getBalance(): Promise<number>;
  saveBalance(balance: number): Promise<void>;
  getTransactions(): Promise<Transaction[]>;
  saveTransactions(transactions: Transaction[]): Promise<void>;
}
