import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { Menu, X, Sun, Moon } from "lucide-react";

const Navbar = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Projects", path: "/projects" },
    { name: "Skills", path: "/skills" },
    { name: "Education", path: "/education" },
    { name: "Experience", path: "/experience" },
  ];

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <header className="fixed top-4 left-0 w-full z-50 px-4 flex justify-center">
      <nav
        aria-label="Primary Navigation"
        className={`flex items-center gap-4 md:gap-6 px-5 py-2.5 rounded-full border backdrop-blur-xl shadow-lg transition-colors duration-200 ${
          isDarkMode
            ? "bg-gray-900/80 border-gray-800 text-white"
            : "bg-white/80 border-gray-200 text-gray-900"
        }`}
      >
        {/* Logo */}
        <Link
          to="/"
          className="text-lg font-bold tracking-tight text-amber-500 hover:text-amber-400 transition-colors"
          aria-label="Parasmani Khunte Home"
        >
          Parasmani<span className="text-gray-400">.</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.name}
                to={link.path}
                className={`relative px-3.5 py-1.5 text-sm font-medium rounded-full transition-colors duration-150 ${
                  isActive
                    ? isDarkMode
                      ? "bg-amber-500/10 text-amber-400 font-semibold"
                      : "bg-amber-50 text-amber-700 font-semibold"
                    : isDarkMode
                    ? "text-gray-300 hover:text-white hover:bg-gray-800/60"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-100/70"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </div>

        <div className="h-5 w-[1px] bg-gray-300 dark:bg-gray-700 hidden md:block" />

        {/* Controls: Theme Toggle & Mobile Menu */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={toggleTheme}
            className={`p-2 rounded-full transition-colors duration-150 ${
              isDarkMode
                ? "bg-gray-800 text-amber-400 hover:bg-gray-700"
                : "bg-gray-100 text-amber-600 hover:bg-gray-200"
            }`}
            title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            aria-label={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            type="button"
          >
            {isDarkMode ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
          </button>

          <button
            onClick={toggleMenu}
            className="md:hidden p-2 rounded-full transition-colors hover:bg-amber-500/10 text-amber-500"
            aria-label={menuOpen ? "Close Menu" : "Open Menu"}
            aria-expanded={menuOpen}
            type="button"
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Navigation Menu */}
      {menuOpen && (
        <div
          className={`absolute top-16 left-4 right-4 p-5 rounded-2xl shadow-xl border backdrop-blur-xl md:hidden ${
            isDarkMode
              ? "bg-gray-900/95 border-gray-800 text-white"
              : "bg-white/95 border-gray-200 text-gray-900"
          }`}
        >
          <div className="flex flex-col space-y-3">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setMenuOpen(false)}
                  className={`px-4 py-2 text-base font-medium rounded-lg transition-colors ${
                    isActive
                      ? "text-amber-500 font-bold bg-amber-500/10"
                      : isDarkMode
                      ? "text-gray-300 hover:text-white hover:bg-gray-800"
                      : "text-gray-700 hover:text-gray-900 hover:bg-gray-100"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
