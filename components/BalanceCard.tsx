import { ReactElement } from "react";

interface Props {
  balance: number;
}

export default function BalanceCard({ balance }: Props): ReactElement {
  return (
    <section className="card">
      <h2 className="card-title">Total Balance</h2>
      <div className="balance-amount">
        ${balance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
      </div>
      <p className="balance-subtitle">
        Available funds
      </p>
    </section>
  );
}
