import React, { useState } from "react";
import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";
import BackgroundParticles from "../components/common/BackgroundParticles";

const Admin = () => {
  const { isDarkMode } = useTheme();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === "admin" && password === "password") {
      setIsLoggedIn(true);
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div className={`min-h-screen relative py-20 px-4 overflow-hidden transition-all duration-500 ${isDarkMode
      ? "bg-gray-900 text-white"
      : "bg-amber-50 text-gray-800"
      }`}>
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <BackgroundParticles />
        <div className={`absolute blur -top-32 -right-32 w-96 h-96 rounded-full ${isDarkMode ? "bg-amber-900/10" : "bg-amber-200/30"}`}></div>
        <div className={`absolute blur bottom-1/4 -left-16 w-64 h-64 rounded-full ${isDarkMode ? "bg-amber-800/10" : "bg-amber-100/50"}`}></div>
      </div>

      <div className="container mx-auto max-w-6xl relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mb-12"
        >
          <h1 className={`text-4xl md:text-5xl font-bold mb-4 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
            Admin <span className={isDarkMode ? "text-amber-400" : "text-amber-600"}>Panel</span>
          </h1>
          <div className={`h-1 w-20 mx-auto rounded-full ${isDarkMode ? "bg-amber-400" : "bg-amber-500"}`} />
        </motion.div>

        {!isLoggedIn ? (
          <motion.form
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 100, delay: 0.2 }}
            onSubmit={handleLogin}
            className={`max-w-md mx-auto p-8 rounded-3xl backdrop-blur-md border shadow-2xl ${isDarkMode
              ? "bg-gray-800/40 border-gray-700"
              : "bg-white/60 border-white"
              }`}
          >
            <div className="mb-6 text-left">
              <label className={`block mb-2 font-medium ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className={`w-full px-5 py-3 rounded-xl border outline-none transition-all ${isDarkMode
                  ? "bg-gray-900/50 border-gray-700 focus:border-amber-400 text-white"
                  : "bg-white/50 border-gray-200 focus:border-amber-500 text-gray-800"
                  }`}
                required
              />
            </div>
            <div className="mb-8 text-left">
              <label className={`block mb-2 font-medium ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full px-5 py-3 rounded-xl border outline-none transition-all ${isDarkMode
                  ? "bg-gray-900/50 border-gray-700 focus:border-amber-400 text-white"
                  : "bg-white/50 border-gray-200 focus:border-amber-500 text-gray-800"
                  }`}
                required
              />
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className={`w-full py-4 rounded-xl font-bold shadow-lg transition-all ${isDarkMode
                ? "bg-amber-400 text-gray-900 hover:bg-amber-300 shadow-amber-900/20"
                : "bg-amber-500 text-white hover:bg-amber-600 shadow-amber-200/50"
                }`}
            >
              Login
            </motion.button>
          </motion.form>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`max-w-2xl mx-auto p-12 rounded-3xl backdrop-blur-md border shadow-xl ${isDarkMode
              ? "bg-gray-800/40 border-gray-700"
              : "bg-white/60 border-white"
              }`}
          >
            <h2 className="text-3xl font-bold mb-4">Welcome back!</h2>
            <p className={isDarkMode ? "text-gray-400" : "text-gray-600"}>Ready to manage your professional presence.</p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Admin;