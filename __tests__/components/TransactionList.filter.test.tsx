import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import TransactionList from '../../components/TransactionList/TransactionList';
import { Transaction } from '../../types/transaction';

function tx(overrides: Partial<Transaction>): Transaction {
  return {
    id: overrides.id ?? 'tx-default',
    type: overrides.type ?? 'transfer',
    recipient: overrides.recipient ?? 'Unknown',
    amount: overrides.amount ?? -1,
    note: overrides.note ?? 'Note',
    status: overrides.status ?? 'pending',
    date: overrides.date ?? '2026-06-05',
  };
}

const mixedTransactions: Transaction[] = [
  tx({ id: 'tx1', recipient: 'John Doe', status: 'completed', amount: -150 }),
  tx({ id: 'tx2', recipient: 'Salary', type: 'deposit', status: 'completed', amount: 4200 }),
  tx({ id: 'tx3', recipient: 'Netflix', status: 'pending', amount: -15.99 }),
  tx({ id: 'tx4', recipient: 'Grab', status: 'pending', amount: -35.5 }),
  tx({ id: 'tx5', recipient: 'Amazon', status: 'failed', amount: -89.5 }),
];

describe('TransactionList filter actions', () => {
  it('FILTER-01: defaults to All and shows all items', () => {
    render(<TransactionList transactions={mixedTransactions} />);

    expect(screen.getByRole('button', { name: 'All' })).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Salary')).toBeInTheDocument();
    expect(screen.getByText('Netflix')).toBeInTheDocument();
    expect(screen.getByText('Grab')).toBeInTheDocument();
    expect(screen.getByText('Amazon')).toBeInTheDocument();
  });

  it('FILTER-02: clicking Completed shows completed items only', () => {
    render(<TransactionList transactions={mixedTransactions} />);

    fireEvent.click(screen.getByRole('button', { name: 'Completed' }));

    expect(screen.getByRole('button', { name: 'Completed' })).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Salary')).toBeInTheDocument();
    expect(screen.queryByText('Netflix')).not.toBeInTheDocument();
    expect(screen.queryByText('Grab')).not.toBeInTheDocument();
    expect(screen.queryByText('Amazon')).not.toBeInTheDocument();
  });

  it('FILTER-03: clicking Pending shows pending items only', () => {
    render(<TransactionList transactions={mixedTransactions} />);

    fireEvent.click(screen.getByRole('button', { name: 'Pending' }));

    expect(screen.getByRole('button', { name: 'Pending' })).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getByText('Netflix')).toBeInTheDocument();
    expect(screen.getByText('Grab')).toBeInTheDocument();
    expect(screen.queryByText('John Doe')).not.toBeInTheDocument();
    expect(screen.queryByText('Salary')).not.toBeInTheDocument();
    expect(screen.queryByText('Amazon')).not.toBeInTheDocument();
  });

  it('FILTER-04: clicking Failed shows failed items only', () => {
    render(<TransactionList transactions={mixedTransactions} />);

    fireEvent.click(screen.getByRole('button', { name: 'Failed' }));

    expect(screen.getByRole('button', { name: 'Failed' })).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getByText('Amazon')).toBeInTheDocument();
    expect(screen.queryByText('John Doe')).not.toBeInTheDocument();
    expect(screen.queryByText('Salary')).not.toBeInTheDocument();
    expect(screen.queryByText('Netflix')).not.toBeInTheDocument();
    expect(screen.queryByText('Grab')).not.toBeInTheDocument();
  });

  it('FILTER-05: shows empty state when selected filter has no items', () => {
    const noFailedTransactions: Transaction[] = [
      tx({ id: 'tx11', recipient: 'A', status: 'completed', amount: -10 }),
      tx({ id: 'tx12', recipient: 'B', status: 'pending', amount: -20 }),
    ];

    render(<TransactionList transactions={noFailedTransactions} />);

    fireEvent.click(screen.getByRole('button', { name: 'Failed' }));

    expect(screen.getByText('No transactions found.')).toBeInTheDocument();
  });

  it('FILTER-06: resets pagination to page 1 when filter changes', () => {
    const pagedTransactions: Transaction[] = [
      tx({ id: 'a1', recipient: 'C1', status: 'completed' }),
      tx({ id: 'a2', recipient: 'C2', status: 'completed' }),
      tx({ id: 'a3', recipient: 'C3', status: 'completed' }),
      tx({ id: 'a4', recipient: 'C4', status: 'completed' }),
      tx({ id: 'a5', recipient: 'C5', status: 'completed' }),
      tx({ id: 'a6', recipient: 'C6', status: 'completed' }),
      tx({ id: 'p1', recipient: 'P1', status: 'pending' }),
    ];

    render(<TransactionList transactions={pagedTransactions} />);

    fireEvent.click(screen.getByRole('button', { name: 'Next page' }));
    expect(screen.getByText('Page 2 of 2 (7 items)')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Pending' }));
    expect(screen.getByText('Page 1 of 1 (1 items)')).toBeInTheDocument();
    expect(screen.getByText('P1')).toBeInTheDocument();
  });
});
