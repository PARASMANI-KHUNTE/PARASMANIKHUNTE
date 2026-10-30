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

  const navStyle = {
    backgroundColor: isDarkMode ? 'oklch(0.13 0.005 85 / 0.8)' : 'oklch(0.985 0.002 85 / 0.8)',
    borderColor: 'var(--color-border)',
    color: 'var(--color-ink)',
  };

  return (
    <header className="fixed top-4 left-0 w-full z-50 px-4 flex justify-center">
      <nav
        aria-label="Primary Navigation"
        className="flex items-center gap-4 md:gap-6 px-5 py-2.5 rounded-full border backdrop-blur-xl shadow-lg transition-colors duration-200"
        style={navStyle}
      >
        {/* Logo */}
        <Link
          to="/"
          className="text-lg font-bold tracking-tight transition-colors"
          style={{ color: 'var(--color-accent)' }}
          onMouseEnter={(e) => { e.currentTarget.style.color = 'oklch(0.58 0.18 55)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--color-accent)'; }}
          aria-label="Parasmani Khunte Home"
        >
          Parasmani<span style={{ color: 'var(--color-ink-muted)' }}>.</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.name}
                to={link.path}
                className="relative px-3.5 py-1.5 text-sm font-medium rounded-full transition-colors duration-150"
                style={{
                  color: isActive ? 'var(--color-accent)' : 'var(--color-ink-muted)',
                  backgroundColor: isActive ? 'var(--color-accent-subtle)' : 'transparent',
                  fontWeight: isActive ? 600 : 500,
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.color = 'var(--color-ink)';
                    e.currentTarget.style.backgroundColor = 'var(--color-paper-3)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.color = 'var(--color-ink-muted)';
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }
                }}
              >
                {link.name}
              </Link>
            );
          })}
        </div>

        <div className="h-5 w-[1px] hidden md:block" style={{ backgroundColor: 'var(--color-border)' }} />

        {/* Controls: Theme Toggle & Mobile Menu */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full transition-colors duration-150"
            style={{
              backgroundColor: 'var(--color-paper-2)',
              color: 'var(--color-accent)',
              borderColor: 'var(--color-border)',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'var(--color-paper-3)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'var(--color-paper-2)'; }}
            title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            aria-label={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            type="button"
          >
            {isDarkMode ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
          </button>

          <button
            onClick={toggleMenu}
            className="md:hidden p-2 rounded-full transition-colors"
            style={{ color: 'var(--color-accent)' }}
            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'var(--color-accent-subtle)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; }}
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
          className="absolute top-16 left-4 right-4 p-5 rounded-2xl shadow-xl border backdrop-blur-xl md:hidden"
          style={{
            backgroundColor: isDarkMode ? 'oklch(0.13 0.005 85 / 0.95)' : 'oklch(0.985 0.002 85 / 0.95)',
            borderColor: 'var(--color-border)',
            color: 'var(--color-ink)',
          }}
        >
          <div className="flex flex-col space-y-3">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setMenuOpen(false)}
                  className="px-4 py-2 text-base font-medium rounded-lg transition-colors"
                  style={{
                    color: isActive ? 'var(--color-accent)' : 'var(--color-ink-muted)',
                    backgroundColor: isActive ? 'var(--color-accent-subtle)' : 'transparent',
                    fontWeight: isActive ? 600 : 500,
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.color = 'var(--color-ink)';
                      e.currentTarget.style.backgroundColor = 'var(--color-paper-3)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.color = 'var(--color-ink-muted)';
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }
                  }}
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