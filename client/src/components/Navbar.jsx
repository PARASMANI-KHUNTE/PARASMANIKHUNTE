import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import { Menu, X, Sun, Moon, Volume2, VolumeX } from "lucide-react";
import { sounds } from "../utils/SoundManager";

const MagneticLink = ({ children, to, isActive, isDarkMode, onClick }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseX = useSpring(x, { stiffness: 350, damping: 25 });
  const mouseY = useSpring(y, { stiffness: 350, damping: 25 });

  function handleMouseMove(e) {
    const { clientX, clientY, currentTarget } = e;
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    x.set((clientX - centerX) * 0.3);
    y.set((clientY - centerY) * 0.3);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: mouseX, y: mouseY }}
      className="relative"
    >
      <Link
        to={to}
        onClick={onClick}
        className={`relative z-10 px-4 py-2 transition-colors duration-300 ${isDarkMode ? "text-white" : "text-gray-800"
          } hover:text-amber-500`}
      >
        <span className="relative z-10">{children}</span>
        {isActive && (
          <motion.span
            layoutId="nav-pill"
            className={`absolute inset-0 z-0 rounded-full ${isDarkMode ? "bg-amber-500/10" : "bg-amber-500/10"
              }`}
            transition={{ type: "spring", stiffness: 350, damping: 30 }}
          />
        )}
      </Link>
    </motion.div>
  );
};

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

  const [isMuted, setIsMuted] = useState(false);

  const toggleMute = () => {
    const newMuted = !isMuted;
    setIsMuted(newMuted);
    sounds.setMuted(newMuted);
    if (!newMuted) sounds.playBloop();
  };

  return (
    <div className="fixed top-6 left-0 w-full z-50 px-4 flex justify-center">
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className={`flex items-center gap-6 px-6 py-2 rounded-full border backdrop-blur-xl shadow-2xl transition-all duration-500 ${isDarkMode
          ? "bg-gray-900/40 border-white/10 shadow-black/50"
          : "bg-white/60 border-black/5 shadow-amber-500/5"
          }`}
      >
        {/* Logo */}
        <Link
          to="/"
          className={`text-xl font-bold tracking-tighter ${isDarkMode ? "text-white" : "text-gray-900"
            }`}
        >
          P<span className="text-amber-500">.</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <MagneticLink
              key={link.name}
              to={link.path}
              isActive={location.pathname === link.path}
              isDarkMode={isDarkMode}
            >
              {link.name}
            </MagneticLink>
          ))}
        </div>

        <div className="h-6 w-[1px] bg-gray-500/20 hidden md:block" />

        {/* Controls: Theme & Audio */}
        <div className="flex items-center gap-2">
          {/* Audio Toggle */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={toggleMute}
            className={`p-2 rounded-full transition-all duration-300 ${isDarkMode
              ? "bg-amber-500/10 text-amber-400 hover:bg-amber-500/20"
              : "bg-amber-100 text-amber-600 hover:bg-amber-200"
              }`}
            title={isMuted ? "Unmute" : "Mute"}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </motion.button>

          {/* Theme Toggle */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={toggleTheme}
            className={`p-2 rounded-full transition-all duration-300 ${isDarkMode
              ? "bg-amber-500/10 text-amber-400 hover:bg-amber-500/20"
              : "bg-amber-100 text-amber-600 hover:bg-amber-200"
              }`}
          >
            {isDarkMode ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
          </motion.button>

          <button
            onClick={toggleMenu}
            className="md:hidden p-2 rounded-full transition-colors hover:bg-amber-500/10"
          >
            {menuOpen ? <X className="w-5 h-5 text-amber-500" /> : <Menu className="w-5 h-5 text-amber-500" />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            className={`absolute top-24 left-4 right-4 bg-opacity-95 backdrop-blur-xl px-6 py-8 rounded-3xl shadow-2xl border ${isDarkMode
              ? "bg-gray-900/90 border-white/10 text-white shadow-black"
              : "bg-white/90 border-black/5 text-gray-800 shadow-amber-500/10"
              } md:hidden`}
          >
            <div className="flex flex-col space-y-6">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setMenuOpen(false)}
                  className={`text-2xl font-bold transition-all ${location.pathname === link.path ? "text-amber-500 scale-105" : "text-gray-500 hover:text-amber-400"
                    }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Navbar;
