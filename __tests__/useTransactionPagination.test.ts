import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useTransactionPagination } from '../hooks/useTransactionPagination';
import { Transaction } from '../types/transaction';

const mockTransactions: Transaction[] = [
  { id: '1', type: 'transfer', status: 'completed', amount: -10, recipient: 'A', note: '', date: '' },
  { id: '2', type: 'transfer', status: 'completed', amount: -20, recipient: 'B', note: '', date: '' },
  { id: '3', type: 'deposit', status: 'pending', amount: 30, recipient: 'C', note: '', date: '' },
  { id: '4', type: 'transfer', status: 'failed', amount: -40, recipient: 'D', note: '', date: '' },
  { id: '5', type: 'transfer', status: 'completed', amount: -50, recipient: 'E', note: '', date: '' },
  { id: '6', type: 'transfer', status: 'completed', amount: -60, recipient: 'F', note: '', date: '' },
];

describe('useTransactionPagination', () => {
  it('initializes with default values', () => {
    const { result } = renderHook(() => useTransactionPagination(mockTransactions));
    
    expect(result.current.filter).toBe('all');
    expect(result.current.currentPage).toBe(1);
    expect(result.current.pageSize).toBe(5);
    expect(result.current.filteredTransactionsCount).toBe(6);
    expect(result.current.totalPages).toBe(2);
    expect(result.current.currentTransactions.length).toBe(5);
  });

  it('filters transactions by status and resets page', () => {
    const { result } = renderHook(() => useTransactionPagination(mockTransactions));
    
    act(() => {
      result.current.setFilter('completed');
    });

    expect(result.current.filter).toBe('completed');
    expect(result.current.filteredTransactionsCount).toBe(4); // 4 completed txs
    expect(result.current.totalPages).toBe(1);
    expect(result.current.currentPage).toBe(1); // Page resets
  });

  it('calculates pages correctly when changing page size', () => {
    const { result } = renderHook(() => useTransactionPagination(mockTransactions));
    
    act(() => {
      result.current.setPageSize(2);
    });

    expect(result.current.pageSize).toBe(2);
    expect(result.current.totalPages).toBe(3); // 6 items / 2
    expect(result.current.currentTransactions.length).toBe(2);
  });

  it('safely handles out of bounds pages', () => {
    const { result } = renderHook(() => useTransactionPagination(mockTransactions));
    
    act(() => {
      result.current.setCurrentPage(5); // Request out of bounds page
    });
    
    // totalPages is 2, so safeCurrentPage should clamp it or the effect should fix it
    // Because we use safe derivation on render, it evaluates strictly on derived states
    // wait, if safeCurrentPage = Math.min(5, 2), it should be 2!
    expect(result.current.currentPage).toBe(2);
  });
});
