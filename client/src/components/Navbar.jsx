import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

const Navbar = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const location = useLocation();

  // Define navigation links
  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Projects", path: "/projects" },
    { name: "Education", path: "/education" },
    { name: "Experience", path: "/experience" },
    // { name: "Contact", path: "/contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 p-4">
      <div className="container mx-auto flex justify-between items-center px-4">
        {/* Logo */}
        <Link
          to="/"
          className={`text-xl font-bold ${
            isDarkMode ? "text-white" : "text-gray-800"
          }`}
        >
          PARAS
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center space-x-6">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`relative px-3 py-2 transition duration-300 ${
                isDarkMode ? "text-white" : "text-gray-800"
              } hover:text-amber-500 ${
                location.pathname === link.path
                  ? "font-bold text-amber-500"
                  : ""
              }`}
            >
              {link.name}
              {location.pathname === link.path && (
                <span className="absolute left-0 bottom-0 w-full h-1 bg-amber-500 rounded-md transition-all duration-300"></span>
              )}
            </Link>
          ))}

          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className={`p-2 rounded-full transition duration-300 ${
              isDarkMode
                ? "bg-gray-700 hover:bg-gray-600"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            {isDarkMode ? "🌙" : "☀️"}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
