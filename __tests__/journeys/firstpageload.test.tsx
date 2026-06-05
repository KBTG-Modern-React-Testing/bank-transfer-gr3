import Home from '@/app/page'
import { render, screen, waitFor } from '@testing-library/react'
import { beforeEach, describe, expect, it } from 'vitest'

describe('User Journey: First Page Load', () => {
  beforeEach(() => {
    // Clear localStorage to ensure the user gets the fresh "default" state
    localStorage.clear()
  })

  it('Scenario: User logs in and checks their account balance', async () => {
    // 1. User goes to the web app (Render the Home page)
    render(<Home />)

    // 2. The app fetches the bank data asynchronously (wait for microtask to resolve)
    // We use waitFor to wait until the UI updates with the fetched balance
    await waitFor(() => {
      // 3. User expects to see the "Total Balance" section
      expect(screen.getByText('Total Balance')).toBeInTheDocument();
    });

    // 4. User expects the theme to be dark by check html tag with data-theme value "dark"
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');

    // 5. User expects to see their exact initial balance of $12,450.75
    expect(screen.getByText('$12,450.75')).toBeInTheDocument();
    
    // 6. User expects to see the recent transactions list populated
    expect(screen.getByText('Recent Transactions')).toBeInTheDocument();
    
    // 7. Check that at least one of the default mock transactions loaded (e.g., Alex Developer)
    expect(screen.getByText('Alex Developer')).toBeInTheDocument();

    // 8. User expects to see the "React Bank" form on the page
    expect(screen.getByText('React Bank')).toBeInTheDocument();

    // 9. User expects to see the empty transfer form with "Transfer Money" title
    expect(screen.getByText('Transfer Money')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Name or Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('0.00')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('What is this for?')).toBeInTheDocument();
  })
})
