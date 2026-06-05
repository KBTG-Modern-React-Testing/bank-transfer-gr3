import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useBank } from '../../hooks/useBank';
import { bankRepository } from '../../repositories/bankRepository';

describe('useBank', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('loads initial state from repository on mount safely', async () => {
    const { result } = renderHook(() => useBank(bankRepository));
    
    // Wait for the async fetchData to execute
    await act(async () => {
      // Flush microtasks
      await Promise.resolve();
      // Fast forward any internal delays if necessary (not here, just await)
    });

    expect(result.current.balance).toBe(12450.75);
    expect(result.current.transactions.length).toBeGreaterThan(0);
  });

  it('deducts balance and adds pending transaction immediately on transfer', async () => {
    const { result } = renderHook(() => useBank(bankRepository));
    
    await act(async () => {
      await Promise.resolve();
    });

    const initialBalance = result.current.balance;

    await act(async () => {
      await result.current.handleTransfer(500, 'Test User', 'Test Note');
    });

    expect(result.current.balance).toBe(initialBalance - 500);
    expect(result.current.transactions[0].recipient).toBe('Test User');
    expect(result.current.transactions[0].amount).toBe(-500);
    expect(result.current.transactions[0].status).toBe('pending');
  });

  it('updates pending transaction to completed after 3 seconds', async () => {
    const { result } = renderHook(() => useBank(bankRepository));
    
    await act(async () => {
      await Promise.resolve();
    });

    await act(async () => {
      await result.current.handleTransfer(100, 'Future User', '');
    });

    const txId = result.current.transactions[0].id;
    expect(result.current.transactions[0].status).toBe('pending');

    // Fast-forward timers by 3000ms
    await act(async () => {
      vi.advanceTimersByTime(3000);
      await Promise.resolve(); // allow microtasks from the timeout to flush
    });

    // The transaction should now be completed
    const updatedTx = result.current.transactions.find(t => t.id === txId);
    expect(updatedTx?.status).toBe('completed');
  });
});
