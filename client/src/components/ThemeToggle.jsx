import React from "react";
import { useTheme } from "../context/ThemeContext";
import { Sun, Moon } from "lucide-react";
import { motion } from "framer-motion";

const ThemeToggle = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={toggleTheme}
      className={`p-2 rounded-full transition-all duration-300 ${isDarkMode
          ? "bg-gray-800 text-amber-400 hover:bg-gray-700 shadow-lg shadow-amber-900/10"
          : "bg-amber-100 text-amber-600 hover:bg-amber-200 shadow-md shadow-amber-200/50"
        }`}
    >
      {isDarkMode ? (
        <Moon className="w-5 h-5" />
      ) : (
        <Sun className="w-5 h-5" />
      )}
    </motion.button>
  );
};

export default ThemeToggle;