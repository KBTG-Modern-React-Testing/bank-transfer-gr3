import { beforeEach, describe, expect, it } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import ThemeToggle from '../../components/ThemeToggle/ThemeToggle';

describe('ThemeToggle', () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.removeAttribute('data-theme');
  });

  it('renders button after mount with dark mode defaults', async () => {
    render(<ThemeToggle />);

    const button = await screen.findByRole('button', {
      name: 'Switch to light mode',
    });

    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent('☀️');
    expect(button).toHaveAttribute('aria-pressed', 'false');
  });

  it('toggles to light mode on first click', async () => {
    render(<ThemeToggle />);

    const button = await screen.findByRole('button', {
      name: 'Switch to light mode',
    });

    fireEvent.click(button);

    expect(button).toHaveTextContent('🌙');
    expect(button).toHaveAttribute('aria-label', 'Switch to dark mode');
    expect(button).toHaveAttribute('aria-pressed', 'true');
  });

  it('updates document data-theme when toggled', async () => {
    render(<ThemeToggle />);

    const button = await screen.findByRole('button', {
      name: 'Switch to light mode',
    });

    fireEvent.click(button);

    expect(document.documentElement.getAttribute('data-theme')).toBe('light');
  });

  it('updates localStorage when toggled', async () => {
    render(<ThemeToggle />);

    const button = await screen.findByRole('button', {
      name: 'Switch to light mode',
    });

    fireEvent.click(button);

    expect(localStorage.getItem('theme')).toBe('light');
  });

  it('toggles back to dark mode on second click', async () => {
    render(<ThemeToggle />);

    const button = await screen.findByRole('button', {
      name: 'Switch to light mode',
    });

    fireEvent.click(button);
    fireEvent.click(button);

    expect(button).toHaveTextContent('☀️');
    expect(button).toHaveAttribute('aria-label', 'Switch to light mode');
    expect(button).toHaveAttribute('aria-pressed', 'false');
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
    expect(localStorage.getItem('theme')).toBe('dark');
  });
});
