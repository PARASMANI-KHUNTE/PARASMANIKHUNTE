import React, { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== "undefined" && window.localStorage) {
      const savedTheme = localStorage.getItem("theme");
      if (savedTheme) return savedTheme === "dark";
      if (window.matchMedia) {
        return window.matchMedia("(prefers-color-scheme: dark)").matches;
      }
    }
    return true; // Default to dark mode
  });

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  useEffect(() => {
    if (typeof window !== "undefined" && window.localStorage) {
      localStorage.setItem("theme", isDarkMode ? "dark" : "light");
      if (isDarkMode) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    }
  }, [isDarkMode]);

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
