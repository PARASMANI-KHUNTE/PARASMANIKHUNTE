import React from "react";
import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";

const SectionTitle = ({ title, subtitle }) => {
  const { isDarkMode } = useTheme();

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="text-center mb-12"
    >
      <h1
        className={`text-4xl font-bold mb-2 ${
          isDarkMode ? "text-white" : "text-gray-800"
        }`}
      >
        {title}
      </h1>
      <p
        className={`text-lg ${
          isDarkMode ? "text-gray-300" : "text-gray-600"
        }`}
      >
        {subtitle}
      </p>
    </motion.div>
  );
};

export default SectionTitle;