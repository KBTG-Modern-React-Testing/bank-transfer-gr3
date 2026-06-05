import { http, HttpResponse } from 'msw';
import { Transaction } from '../types/transaction';

// In-memory data store for the mock server
let balanceDb = 12450.75;
let transactionsDb: Transaction[] = [
  { id: "tx1", type: "transfer", recipient: "John Doe", amount: -150.00, note: "Dinner", status: "completed", date: "2026-06-03" },
  { id: "tx2", type: "deposit", recipient: "Salary", amount: 4200.00, note: "Monthly Salary", status: "completed", date: "2026-06-01" },
  { id: "tx3", type: "transfer", recipient: "Netflix", amount: -15.99, note: "Subscription", status: "pending", date: "2026-06-04" },
  { id: "tx4", type: "transfer", recipient: "Amazon", amount: -89.50, note: "Gift", status: "failed", date: "2026-06-02" },
];

export const handlers = [
  // GET Balance
  http.get('/api/balance', () => {
    return HttpResponse.json({ balance: balanceDb });
  }),

  // POST Balance
  http.post('/api/balance', async ({ request }) => {
    const data = await request.json() as { balance: number };
    balanceDb = data.balance;
    return HttpResponse.json({ success: true, balance: balanceDb });
  }),

  // GET Transactions
  http.get('/api/transactions', () => {
    return HttpResponse.json({ transactions: transactionsDb });
  }),

  // POST Transactions
  http.post('/api/transactions', async ({ request }) => {
    const data = await request.json() as { transactions: Transaction[] };
    transactionsDb = data.transactions;
    return HttpResponse.json({ success: true, transactions: transactionsDb });
  })
];
