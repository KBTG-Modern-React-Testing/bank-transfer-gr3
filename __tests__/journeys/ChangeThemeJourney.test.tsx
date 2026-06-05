import Home from '@/app/page'
import { render, screen, waitFor, act } from '@testing-library/react'
import { beforeEach, describe, expect, it } from 'vitest'

describe('User Journey: Change Theme', () => {
  beforeEach(() => {
    // Clear localStorage to ensure the user gets the fresh "default" state
    localStorage.clear()
  })

  it('Scenario: User changes the theme', async () => {
    // 1. User goes to the web app (Render the Home page)
    await act(async () => {
      render(<Home />)
      // Wait for React concurrent microtasks & the ThemeToggle setTimeout
      await new Promise((resolve) => setTimeout(resolve, 0))
    })

    // 2. The app fetches the bank data asynchronously (wait for microtask to resolve)
    // We use waitFor to wait until the UI updates with the fetched balance
    await waitFor(() => {
      // 3. User expects to see the "Total Balance" section
      expect(screen.getByText('Total Balance')).toBeInTheDocument();
    });

    // 4. User expects the theme to be dark by check html tag with data-theme value "dark"
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');

    // 5. User clicks the "Toggle Theme" button to switch to light mode
    const toggleButton = await screen.findByRole('button', { name: /switch to light mode/i });
    
    await act(async () => {
      toggleButton.click();
    });

    // 6. User expects the theme to change to light by check html tag with data-theme value "light"
    await waitFor(() => {
      expect(document.documentElement.getAttribute('data-theme')).toBe('light');
    });
    
    // 7. User clicks the "Toggle Theme" button again to switch back to dark mode
    await act(async () => {
      toggleButton.click();
    });

    // 8. User expects the theme to change back to dark by check html tag with data-theme value "dark"
    await waitFor(() => {
      expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
    });
  })
})
