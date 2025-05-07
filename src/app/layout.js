"use client";
import "../styles/globals.css";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function RootLayout({ children }) {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const saved = localStorage.getItem("theme") || "light";
    setTheme(saved);
    document.documentElement.className = saved;
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.className = newTheme;
  };

  return (
    <html lang="en">
      <body>
        <nav
          style={{
            display: "flex",
            gap: "1rem",
            justifyContent: "center",
            padding: "1rem",
            background: theme === "light" ? "#eaeaea" : "#333",
            borderBottom: "1px solid #999",
          }}
        >
          <Link href="/">Oluştur</Link>
          <Link href="/list">Anketler</Link>
          <Link href="/results">Sonuçlar</Link>
          <button onClick={toggleTheme} style={{ marginLeft: "auto" }}>
            {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
          </button>
        </nav>
        {children}
      </body>
    </html>
  );
}
