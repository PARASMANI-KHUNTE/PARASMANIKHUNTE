import React, { createContext, useContext, useState, useEffect, useRef } from "react";

const ThemeContext = createContext();

const DEFAULT_IS_DARK = true;

export const ThemeProvider = ({ children }) => {
  // Server and first client render must match. Persisted/local preferences are
  // applied after hydration to avoid a hydration mismatch.
  const [isDarkMode, setIsDarkMode] = useState(DEFAULT_IS_DARK);
  const hasSyncedTheme = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined" || !window.localStorage) return;

    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setIsDarkMode(savedTheme === "dark");
      return;
    }

    if (window.matchMedia) {
      setIsDarkMode(window.matchMedia("(prefers-color-scheme: dark)").matches);
    }
  }, []);

  useEffect(() => {
    if (typeof document === "undefined") return;

    document.documentElement.classList.toggle("dark", isDarkMode);
    document.documentElement.classList.toggle("light", !isDarkMode);

    if (!hasSyncedTheme.current) {
      hasSyncedTheme.current = true;
      return;
    }

    if (typeof window !== "undefined" && window.localStorage) {
      localStorage.setItem("theme", isDarkMode ? "dark" : "light");
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
