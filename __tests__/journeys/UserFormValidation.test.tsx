import { describe, it, expect, beforeEach } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Home from "../../app/page";

describe("User Journey: Transfer Validation", () => {
  beforeEach(() => {
    // Clear localStorage to ensure the user gets the fresh "default" state
    localStorage.clear();
  });

  it("Scenario: Negative amount", async () => {
    // 1. User goes to the web app (Render the Home page)
    render(<Home />);

    // 2. The app fetches the bank data asynchronously (wait for microtask to resolve)
    // We use waitFor to wait until the UI updates with the fetched balance
    await waitFor(() => {
      // 3. User expects to see the "Total Balance" section
      expect(screen.getByText("Total Balance")).toBeInTheDocument();
    });

    // 4. User enter negative amount -100.75
    const recipientInput = screen.getByPlaceholderText(
      "Name or Email",
    ) as HTMLInputElement;
    const amountInput = screen.getByPlaceholderText("0.00") as HTMLInputElement;
    const descriptionInput = screen.getByPlaceholderText(
      "What is this for?",
    ) as HTMLInputElement;
    const sendButton = screen.getByRole("button", { name: /send money/i });

    // Fill in the form with invalid negative amount
    fireEvent.change(recipientInput, { target: { value: "Jane Doe" } });
    fireEvent.change(amountInput, { target: { value: "-100.75" } });
    fireEvent.change(descriptionInput, {
      target: { value: "Test transfer with negative amount" },
    });

    // Simulate form submission
    sendButton.click();

    // 5. User expects to see validation error message "Amount must be greater than 0"
    await waitFor(() => {
      expect(
        screen.getByText("Amount must be greater than 0"),
      ).toBeInTheDocument();
    });
  });

  it("Scenario: Insufficient funds", async () => {
    // 1. User goes to the web app (Render the Home page)
    render(<Home />);

    // 2. The app fetches the bank data asynchronously (wait for microtask to resolve)
    // We use waitFor to wait until the UI updates with the fetched balance
    await waitFor(() => {
      // 3. User expects to see the "Total Balance" section
      expect(screen.getByText("Total Balance")).toBeInTheDocument();
    });

    // 4. User enter Insufficient funds 999999.75
    const recipientInput = screen.getByPlaceholderText(
      "Name or Email",
    ) as HTMLInputElement;
    const amountInput = screen.getByPlaceholderText("0.00") as HTMLInputElement;
    const descriptionInput = screen.getByPlaceholderText(
      "What is this for?",
    ) as HTMLInputElement;
    const sendButton = screen.getByRole("button", { name: /send money/i });

    // Fill in the form with invalid Insufficient funds
    fireEvent.change(recipientInput, { target: { value: "Jane Doe" } });
    fireEvent.change(amountInput, { target: { value: "999999.75" } });
    fireEvent.change(descriptionInput, {
      target: { value: "Test transfer with Insufficient funds" },
    });

    // Simulate form submission
    sendButton.click();

    // 5. User expects to see validation error message "Insufficient funds"
    await waitFor(() => {
      expect(
        screen.getByText("Insufficient funds"),
      ).toBeInTheDocument();
    });
  });

  it("Scenario: Sql injection", async () => {
    // 1. User goes to the web app (Render the Home page)
    render(<Home />);

    // 2. The app fetches the bank data asynchronously (wait for microtask to resolve)
    // We use waitFor to wait until the UI updates with the fetched balance
    await waitFor(() => {
      // 3. User expects to see the "Total Balance" section
      expect(screen.getByText("Total Balance")).toBeInTheDocument();
    });

    // 4. User enter Sql injection attempt
    const recipientInput = screen.getByPlaceholderText(
      "Name or Email",
    ) as HTMLInputElement;
    const amountInput = screen.getByPlaceholderText("0.00") as HTMLInputElement;
    const descriptionInput = screen.getByPlaceholderText(
      "What is this for?",
    ) as HTMLInputElement;
    const sendButton = screen.getByRole("button", { name: /send money/i });

    // Fill in the form with invalid Sql injection attempt
    fireEvent.change(recipientInput, { target: { value: "DELETE FROM users WHERE 1=1;" } });
    fireEvent.change(amountInput, { target: { value: "999999.75" } });
    fireEvent.change(descriptionInput, {
      target: { value: "Test transfer with Sql injection attempt" },
    });

    // Simulate form submission
    sendButton.click();

    // 5. User expects to see validation error message "contains SQL keywords or suspicious characters"
    await waitFor(() => {
      expect(
        screen.getByText("Invalid input: contains SQL keywords or suspicious characters"),
      ).toBeInTheDocument();
    });
  });
});
