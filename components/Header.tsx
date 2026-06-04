import { ReactElement } from "react";

export default function Header(): ReactElement {
  return (
    <header className="header">
      <h1>Aura Bank</h1>
      <div className="header-user-info">
        <div className="header-user-text">
          <div className="header-user-greeting">Welcome back,</div>
          <div className="header-user-name">Alex Developer</div>
        </div>
        <div className="header-user-avatar"></div>
      </div>
    </header>
  );
}
