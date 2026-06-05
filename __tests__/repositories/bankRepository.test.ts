import { describe, it, expect, beforeEach } from 'vitest';
import { bankRepository } from '../../repositories/bankRepository';

describe('bankRepository', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  describe('getBalance', () => {
    it('returns default balance when local storage is empty', () => {
      const balance = bankRepository.getBalance();
      expect(balance).toBe(12450.75);
    });

    it('returns parsed balance when local storage has data', () => {
      localStorage.setItem('bank_balance', '500.50');
      const balance = bankRepository.getBalance();
      expect(balance).toBe(500.50);
    });
  });

  describe('saveBalance', () => {
    it('saves balance to local storage as string', () => {
      bankRepository.saveBalance(1024.99);
      expect(localStorage.getItem('bank_balance')).toBe('1024.99');
    });
  });

  describe('getTransactions', () => {
    it('returns initial transactions when local storage is empty', () => {
      const txs = bankRepository.getTransactions();
      expect(txs.length).toBeGreaterThan(0);
      expect(txs[0].id).toBe('tx1');
    });

    it('returns parsed transactions when local storage has valid JSON', () => {
      const mockTxs = [{ id: 'mock1', amount: 100, type: 'deposit' }];
      localStorage.setItem('bank_transactions', JSON.stringify(mockTxs));
      
      const txs = bankRepository.getTransactions();
      expect(txs).toEqual(mockTxs);
    });

    it('returns initial transactions when JSON is invalid', () => {
      localStorage.setItem('bank_transactions', 'invalid json string');
      const txs = bankRepository.getTransactions();
      expect(txs[0].id).toBe('tx1');
    });
  });

  describe('saveTransactions', () => {
    it('saves transactions array as JSON string', () => {
      const mockTxs: any = [{ id: 'mock2', amount: -50 }];
      bankRepository.saveTransactions(mockTxs);
      
      const stored = localStorage.getItem('bank_transactions');
      expect(stored).toBe(JSON.stringify(mockTxs));
    });
  });
});
