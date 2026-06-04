"use client";
import { useEffect, useState, ReactElement } from "react";
import styles from "./ThemeToggle.module.css";

export default function ThemeToggle(): ReactElement | null {
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const savedTheme = (localStorage.getItem("theme") as "dark" | "light") || "dark";
    document.documentElement.setAttribute("data-theme", savedTheme);
    // Use timeout to avoid synchronous setState warning during initial effect
    setTimeout(() => {
      setTheme(savedTheme);
      setMounted(true);
    }, 0);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  if (!mounted) return null;

  return (
    <button className={styles.toggleBtn} onClick={toggleTheme} aria-label="Toggle Theme">
      {theme === "dark" ? "☀️" : "🌙"}
    </button>
  );
}
