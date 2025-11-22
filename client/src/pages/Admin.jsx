import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { login } from "../services/api";
import AdminDashboard from "../components/AdminDashboard";
import { toast } from "react-toastify";
import { Lock, User, Loader2, ShieldCheck } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

const Admin = () => {
  const { isDarkMode } = useTheme();
  const [userInfo, setUserInfo] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // Auto-login removed as per user request
  // useEffect(() => {
  //   const storedUserInfo = localStorage.getItem("userInfo");
  //   if (storedUserInfo) {
  //     setUserInfo(JSON.parse(storedUserInfo));
  //   }
  // }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await login(username, password);
      setUserInfo(data);
      localStorage.setItem("userInfo", JSON.stringify(data));
      toast.success("Welcome back, Admin!");
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    setUserInfo(null);
    toast.info("Logged out successfully");
  };

  if (userInfo) {
    return <AdminDashboard userInfo={userInfo} onLogout={handleLogout} />;
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={`w-full max-w-md p-8 rounded-3xl ${isDarkMode
          ? 'bg-gray-800 border border-gray-700 shadow-2xl'
          : 'bg-white border border-gray-100 shadow-xl'
          }`}
      >
        <div className="text-center mb-8">
          <div className={`mx-auto w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center mb-4 shadow-lg`}>
            <ShieldCheck className="w-8 h-8 text-white" />
          </div>
          <h1 className={`text-3xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Admin Portal
          </h1>
          <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            Secure access for portfolio management
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label className={`text-sm font-semibold ml-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Username
            </label>
            <div className="relative">
              <User className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className={`w-full pl-12 pr-4 py-3 rounded-xl outline-none transition-all border-2 ${isDarkMode
                  ? 'bg-gray-900/50 border-gray-700 focus:border-primary-500 text-white placeholder-gray-600'
                  : 'bg-gray-50 border-gray-200 focus:border-primary-500 text-gray-900 placeholder-gray-400'
                  }`}
                placeholder="Enter username"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className={`text-sm font-semibold ml-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Password
            </label>
            <div className="relative">
              <Lock className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full pl-12 pr-4 py-3 rounded-xl outline-none transition-all border-2 ${isDarkMode
                  ? 'bg-gray-900/50 border-gray-700 focus:border-primary-500 text-white placeholder-gray-600'
                  : 'bg-gray-50 border-gray-200 focus:border-primary-500 text-gray-900 placeholder-gray-400'
                  }`}
                placeholder="Enter password"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3.5 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all hover-lift ${loading ? 'opacity-70 cursor-not-allowed' : ''
              } ${isDarkMode
                ? 'bg-gradient-to-r from-primary-600 to-accent-600 text-white shadow-lg shadow-primary-900/20'
                : 'bg-gradient-to-r from-primary-500 to-accent-500 text-white shadow-lg shadow-primary-500/30'
              }`}
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Verifying...</span>
              </>
            ) : (
              <span>Login to Dashboard</span>
            )}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default Admin;