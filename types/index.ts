export type TxStatus = "completed" | "pending" | "failed";
export type TransactionType = "transfer" | "deposit" | "withdrawal";

export type Transaction = {
  id: string;
  type: TransactionType;
  recipient: string;
  amount: number;
  note: string;
  status: TxStatus;
  date: string;
};
