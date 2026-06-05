import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import BalanceCard from '../../components/BalanceCard/BalanceCard';
import styles from '../../components/BalanceCard/BalanceCard.module.css';

describe('BalanceCard', () => {
  it('renders standard balance correctly with standard formatting', () => {
    render(<BalanceCard balance={1500} />);
    expect(screen.getByText('Total Balance')).toBeInTheDocument();
    expect(screen.getByText('$1,500.00')).toBeInTheDocument();
    expect(screen.getByText('Available funds')).toBeInTheDocument();
  });

  it('renders large balances with appropriate commas', () => {
    render(<BalanceCard balance={1234567.89} />);
    expect(screen.getByText('$1,234,567.89')).toBeInTheDocument();
  });

  it('applies default font size class for standard balances', () => {
    render(<BalanceCard balance={1500} />);
    const amountDiv = screen.getByText('$1,500.00');
    expect(amountDiv.className).toBe(styles.balanceAmount);
  });

  it('applies small font size class for balances > 12 chars', () => {
    render(<BalanceCard balance={1000000000} />);
    // 1,000,000,000.00 is 16 chars long > 12
    const amountDiv = screen.getByText('$1,000,000,000.00');
    expect(amountDiv.className).toContain(styles.balanceAmountSmall);
    expect(amountDiv.className).not.toContain(styles.balanceAmountSmallest);
  });

  it('applies smallest font size class for extremely large balances > 18 chars', () => {
    // We use a high number that translates to > 18 length
    // 10000000000000000 produces "10,000,000,000,000,000.00" which is 25 chars > 18
    render(<BalanceCard balance={10000000000000000} />);
    const amountDiv = screen.getByText('$10,000,000,000,000,000.00');
    expect(amountDiv.className).toContain(styles.balanceAmountSmallest);
  });
});
