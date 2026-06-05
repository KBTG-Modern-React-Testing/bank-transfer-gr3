import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import Home from '../../app/page';

describe('User Journey: Dashboard', () => {
  beforeEach(() => {
    // Clear localStorage to ensure the user gets the fresh "default" state
    localStorage.clear();
  });

  it('Scenario: User logs in and checks their account balance', async () => {
    // 1. User goes to the web app (Render the Home page)
    render(<Home />);

    // 2. The app fetches the bank data asynchronously (wait for microtask to resolve)
    // We use waitFor to wait until the UI updates with the fetched balance
    await waitFor(() => {
      // 3. User expects to see the "Total Balance" section
      expect(screen.getByText('Total Balance')).toBeInTheDocument();
    });

    // 4. User expects to see their exact initial balance of $12,450.75
    expect(screen.getByText('$12,450.75')).toBeInTheDocument();
    
    // 5. User expects to see the recent transactions list populated
    expect(screen.getByText('Recent Transactions')).toBeInTheDocument();
    
    // Check that at least one of the default mock transactions loaded (e.g., John Doe)
    expect(screen.getByText('John Doe')).toBeInTheDocument();
  });
});
