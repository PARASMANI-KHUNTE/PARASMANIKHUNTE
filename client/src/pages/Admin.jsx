import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import ProjectsManager from "../components/admin/ProjectsManager";
import ExperienceManager from "../components/admin/ExperienceManager";
import EducationManager from "../components/admin/EducationManager";
import Inbox from "../components/admin/Inbox";
import AIContextManager from "../components/admin/AIContextManager";
import Settings from "../components/admin/Settings";
import GlassCard from "../components/ui/GlassCard";
import {
  LayoutDashboard,
  Briefcase,
  GraduationCap,
  MessageSquare,
  LogOut,
  FolderOpen,
  Brain,
  Settings as SettingsIcon
} from "lucide-react";

const Admin = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("projects");

  // Login State
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    await login(username, password);
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center p-4 relative overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-[100px] pointer-events-none" />

        <GlassCard className="w-full max-w-md p-8 !rounded-2xl">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold font-space-grotesk text-white mb-2">Admin Portal</h2>
            <p className="text-gray-400">Enter your credentials to access the dashboard</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500 transition-colors"
                placeholder="admin"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500 transition-colors"
                placeholder="••••••••"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3 rounded-xl transition-all shadow-[0_0_20px_rgba(99,102,241,0.3)] hover:shadow-[0_0_30px_rgba(99,102,241,0.5)]"
            >
              Authenticate
            </button>
          </form>
        </GlassCard>
      </div>
    );
  }

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const navItems = [
    { id: "projects", label: "Projects", icon: FolderOpen },
    { id: "experience", label: "Experience", icon: Briefcase },
    { id: "education", label: "Education", icon: GraduationCap },
    { id: "inbox", label: "Inbox", icon: MessageSquare },
    { id: "ai-context", label: "AI Context", icon: Brain },
    { id: "settings", label: "Settings", icon: SettingsIcon },
  ];

  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col md:flex-row font-inter">
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 p-4 md:h-screen sticky top-0 md:fixed">
        <GlassCard className="h-full flex flex-col justify-between !p-4 !rounded-xl">
          <div>
            <div className="flex items-center gap-3 mb-8 px-2 mt-2">
              <LayoutDashboard className="text-indigo-400" size={28} />
              <h1 className="text-xl font-bold font-space-grotesk tracking-wide text-glow">Admin Panel</h1>
            </div>

            <nav className="space-y-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${activeTab === item.id
                    ? "bg-indigo-600/20 text-indigo-300 border border-indigo-500/30"
                    : "text-gray-400 hover:bg-white/5 hover:text-white"
                    }`}
                >
                  <item.icon size={20} />
                  <span className="font-medium">{item.label}</span>
                </button>
              ))}
            </nav>
          </div>

          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 transition-colors mt-4 md:mt-0"
          >
            <LogOut size={20} />
            <span className="font-medium">Logout</span>
          </button>
        </GlassCard>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 md:ml-64 p-4 md:p-8 overflow-y-auto">
        <header className="mb-8">
          <div>
            <h2 className="text-3xl font-bold font-space-grotesk text-white">
              {navItems.find(i => i.id === activeTab)?.label}
            </h2>
            <p className="text-gray-400 mt-1">Manage your portfolio content</p>
          </div>
        </header>

        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="min-h-[500px]"
        >
          {activeTab === "projects" && <ProjectsManager />}
          {activeTab === "experience" && <ExperienceManager />}
          {activeTab === "education" && <EducationManager />}
          {activeTab === "inbox" && <Inbox />}
          {activeTab === "ai-context" && <AIContextManager />}
          {activeTab === "settings" && <Settings />}
        </motion.div>
      </main>
    </div>
  );
};

export default Admin;