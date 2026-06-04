import { ReactElement } from "react";
import ThemeToggle from "../ThemeToggle/ThemeToggle";
import styles from "./Header.module.css";

export default function Header(): ReactElement {
  return (
    <header className={styles.header}>
      <h1 className={styles.headerTitle}>React Bank</h1>
      <div className={styles.userInfo}>
        <ThemeToggle />
        <div className={styles.userText}>
          <div className={styles.userGreeting}>Welcome back,</div>
          <div className={styles.userName}>Alex Developer</div>
        </div>
        <div className={styles.userAvatar} aria-hidden="true"></div>
      </div>
    </header>
  );
}
