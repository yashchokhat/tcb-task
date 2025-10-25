"use client";

import { createContext, useContext, useEffect, useState, useCallback } from "react";

const ThemeContext = createContext();

function getInitialTheme() {
  if (typeof window === "undefined") return "dark";
  return localStorage.getItem("theme") || "dark";
}

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => getInitialTheme());

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === "theme" && e.newValue) {
        setTheme(e.newValue);
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => {
      const newTheme = prev === "dark" ? "light" : "dark";
      localStorage.setItem("theme", newTheme);
      return newTheme;
    });
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
}
