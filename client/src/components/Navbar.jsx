import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sun, Moon } from "lucide-react";

const Navbar = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  // Define navigation links
  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Projects", path: "/projects" },
    { name: "Education", path: "/education" },
    { name: "Experience", path: "/experience" },
  ];

  // Toggle mobile menu
  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 p-4 bg-opacity-90 backdrop-blur-lg">
      <div className="container mx-auto flex justify-between items-center px-4">

        {/* Logo */}
        <Link
          to="/"
          className={`text-2xl font-bold ${isDarkMode ? "text-white" : "text-gray-800"
            }`}
        >
          PARAS
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`relative px-3 py-2 transition duration-300 ${isDarkMode ? "text-white" : "text-gray-800"
                } hover:text-amber-500 ${location.pathname === link.path ? "font-bold text-amber-500" : ""
                }`}
            >
              {link.name}
              {location.pathname === link.path && (
                <span className="absolute left-0 bottom-0 w-full h-1 bg-amber-500 rounded-md transition-all duration-300"></span>
              )}
            </Link>
          ))}

          {/* Theme Toggle Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={toggleTheme}
            className={`p-2 rounded-full transition-all duration-300 ${isDarkMode
                ? "bg-gray-800 text-amber-400 hover:bg-gray-700"
                : "bg-amber-100 text-amber-600 hover:bg-amber-200"
              }`}
          >
            {isDarkMode ? (
              <Moon className="w-5 h-5" />
            ) : (
              <Sun className="w-5 h-5" />
            )}
          </motion.button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          className="md:hidden p-2 rounded-md transition"
        >
          {menuOpen ? <X className="w-6 h-6 text-amber-500" /> : <Menu className="w-6 h-6 text-amber-500" />}
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`absolute top-16 left-0 w-full bg-opacity-95 backdrop-blur-md px-6 py-4 shadow-lg ${isDarkMode ? "bg-gray-900 text-white" : "bg-white text-gray-800"
              } md:hidden`}
          >
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setMenuOpen(false)}
                  className="text-lg font-medium hover:text-amber-500 transition"
                >
                  {link.name}
                </Link>
              ))}

              {/* Theme Toggle for Mobile */}
              <button
                onClick={toggleTheme}
                className={`mt-4 p-3 rounded-xl flex items-center justify-center gap-3 transition-all duration-300 ${isDarkMode
                    ? "bg-gray-800 text-amber-400"
                    : "bg-amber-100 text-amber-600"
                  }`}
              >
                {isDarkMode ? (
                  <>
                    <Moon className="w-5 h-5" />
                    <span>Dark Mode</span>
                  </>
                ) : (
                  <>
                    <Sun className="w-5 h-5" />
                    <span>Light Mode</span>
                  </>
                )}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
