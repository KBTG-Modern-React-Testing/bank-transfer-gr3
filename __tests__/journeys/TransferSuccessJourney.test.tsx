import { describe, it, expect, beforeEach } from 'vitest';
import { act, fireEvent, render, screen, within } from '@testing-library/react';
import Home from '../../app/page';

describe('User Journey: Transfer success', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('Scenario: User fills transfer form and sees the transaction complete', async () => {
    render(<Home />);

    await screen.findByText(/John Doe/i);

    const recipientInput = screen.getByPlaceholderText(/Name or Email/i);
    const amountInput = screen.getByPlaceholderText(/0.00/i);
    const noteInput = screen.getByPlaceholderText(/What is this for\?/i);
    const sendButton = screen.getByRole('button', { name: /Send Money/i });

    await act(async () => {
      fireEvent.change(recipientInput, { target: { value: 'Alice' } });
      fireEvent.change(amountInput, { target: { value: '50' } });
      fireEvent.change(noteInput, { target: { value: 'Dinner tonight' } });
      fireEvent.click(sendButton);
    });

    expect(await screen.findByText(/12,400\.75/)).toBeInTheDocument();
    expect(screen.getByText('Alice')).toBeInTheDocument();
    expect(screen.getByText(/\$50\.00/)).toBeInTheDocument();

    const pendingTransaction = screen.getByLabelText(/Alice pending transaction/i);
    expect(within(pendingTransaction).getByText(/pending/i)).toBeInTheDocument();

    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 3100));
    });

    expect(screen.getByLabelText(/Alice completed transaction/i)).toBeInTheDocument();
  });
});
  