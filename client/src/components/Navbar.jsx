import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  // Define navigation links
  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Projects", path: "/projects" },
    { name: "Education", path: "/education" },
    { name: "Experience", path: "/experience" },
    { name: "Contact", path: "/contact" },
  ];

  // Toggle mobile menu
  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 p-4">
      {/* Glassmorphism Background */}
      <div className="absolute inset-0 bg-gray-950/80 backdrop-blur-md border-b border-white/5" />

      <div className="container mx-auto flex justify-between items-center px-4 relative z-10">

        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-3 text-2xl font-bold text-white font-space-grotesk tracking-wide group"
        >
          <div className="w-10 h-10 rounded-lg overflow-hidden border border-white/10 shadow-[0_0_15px_rgba(99,102,241,0.3)] group-hover:shadow-[0_0_20px_rgba(99,102,241,0.5)] transition-all">
            <img src="/logo-cosmic.png" alt="Logo" className="w-full h-full object-cover" />
          </div>
          <span>PARAS<span className="text-indigo-500">.</span></span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`relative px-1 py-2 text-sm font-medium transition-colors duration-300 ${location.pathname === link.path ? "text-white" : "text-gray-400 hover:text-white"
                }`}
            >
              {link.name}
              {location.pathname === link.path && (
                <motion.span
                  layoutId="nav-underline"
                  className="absolute left-0 bottom-0 w-full h-0.5 bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.5)]"
                />
              )}
            </Link>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          className="md:hidden p-2 text-gray-300 hover:text-white transition-colors"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-gray-900/95 backdrop-blur-xl border-t border-white/5 overflow-hidden"
          >
            <div className="flex flex-col p-4 space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setMenuOpen(false)}
                  className={`px-4 py-3 rounded-xl text-lg font-medium transition-all ${location.pathname === link.path
                    ? "bg-indigo-500/20 text-indigo-300 border border-indigo-500/30"
                    : "text-gray-400 hover:bg-white/5 hover:text-white"
                    }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
