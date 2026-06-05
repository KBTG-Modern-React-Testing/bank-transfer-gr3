import { describe, it, expect, beforeEach } from 'vitest';
import { bankRepository } from '../../repositories/bankRepository';

describe('bankRepository', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  describe('getBalance', () => {
    it('returns default balance when local storage is empty', async () => {
      const balance = await bankRepository.getBalance();
      expect(balance).toBe(12450.75);
    });

    it('returns parsed balance when local storage has data', async () => {
      localStorage.setItem('bank_balance', '500.50');
      const balance = await bankRepository.getBalance();
      expect(balance).toBe(500.50);
    });
  });

  describe('saveBalance', () => {
    it('saves balance to local storage as string', async () => {
      await bankRepository.saveBalance(1024.99);
      expect(localStorage.getItem('bank_balance')).toBe('1024.99');
    });
  });

  describe('getTransactions', () => {
    it('returns initial transactions when local storage is empty', async () => {
      const txs = await bankRepository.getTransactions();
      expect(txs.length).toBeGreaterThan(0);
      expect(txs[0].id).toBe('tx1');
    });

    it('returns parsed transactions when local storage has valid JSON', async () => {
      const mockTxs = [{ id: 'mock1', amount: 100, type: 'deposit' }];
      localStorage.setItem('bank_transactions', JSON.stringify(mockTxs));
      
      const txs = await bankRepository.getTransactions();
      expect(txs).toEqual(mockTxs);
    });

    it('returns initial transactions when JSON is invalid', async () => {
      localStorage.setItem('bank_transactions', 'invalid json string');
      const txs = await bankRepository.getTransactions();
      expect(txs[0].id).toBe('tx1');
    });
  });

  describe('saveTransactions', () => {
    it('saves transactions array as JSON string', async () => {
      const mockTxs = [{ id: 'mock2', amount: -50 }] as unknown as import('../../types/transaction').Transaction[];
      await bankRepository.saveTransactions(mockTxs);
      
      const stored = localStorage.getItem('bank_transactions');
      expect(stored).toBe(JSON.stringify(mockTxs));
    });
  });
});
