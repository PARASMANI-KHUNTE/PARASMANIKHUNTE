import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Github, Linkedin, Instagram, Twitter, Heart, Activity, Globe, MessageSquare } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import BackgroundParticles from "./common/BackgroundParticles";

const Footer = () => {
  const { isDarkMode } = useTheme();

  const socialLinks = [
    { name: "GitHub", icon: Github, href: "https://github.com/PARASMANI-KHUNTE" },
    { name: "LinkedIn", icon: Linkedin, href: "https://www.linkedin.com/in/parasmani-khunte-330488228/" },
    { name: "Instagram", icon: Instagram, href: "https://www.instagram.com/ll.__.p.a.r.a.s.__.ll/" },
    { name: "Twitter", icon: Twitter, href: "#" },
  ];

  const quickLinks = [
    { name: "Home", path: "/" },
    { name: "Projects", path: "/projects" },
    { name: "Education", path: "/education" },
    { name: "Experience", path: "/experience" },
  ];

  return (
    <footer className={`relative py-16 px-6 overflow-hidden transition-all duration-500 border-t ${isDarkMode
      ? "bg-gray-900/90 border-white/5 text-white"
      : "bg-white/90 border-black/5 text-gray-800"
      } backdrop-blur-3xl`}>
      <BackgroundParticles count={15} />

      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-12">
          {/* Branding & Pulse */}
          <div className="md:col-span-5 text-center md:text-left">
            <h2 className="text-3xl font-extrabold tracking-tighter mb-4 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 bg-clip-text text-transparent italic">
              PARASMANI KHUNTE
            </h2>
            <p className={`text-sm mb-6 max-w-sm leading-relaxed ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
              Full-Stack Systems Engineer specializing in scalable architecture and AI-enabled product lifecycles. 
              Designing clean interface logic and resilient backend ecosystems.
            </p>
            
            {/* System Status Hub */}
            <div className={`inline-flex items-center gap-3 px-4 py-2 rounded-full text-xs font-bold border ${isDarkMode 
              ? "bg-emerald-500/5 text-emerald-400 border-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.1)]" 
              : "bg-emerald-50 text-emerald-600 border-emerald-100 shadow-sm"
              }`}>
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <Activity className="w-3.5 h-3.5" />
              SYSTEM STATUS: STABLE // BUILD: {new Date().getFullYear()}.04
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div className="md:col-span-3 text-center md:text-left mt-4 md:mt-0">
            <h3 className={`text-sm font-black uppercase tracking-widest mb-6 ${isDarkMode ? "text-amber-400/80" : "text-amber-500"}`}>
              Quick Navigation
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className={`text-sm font-medium transition-all duration-300 hover:tracking-wider ${isDarkMode ? "text-gray-400 hover:text-white" : "text-gray-500 hover:text-amber-600"
                    }`}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect Ecosystem */}
          <div className="md:col-span-4 text-center md:text-right flex flex-col md:items-end">
            <h3 className={`text-sm font-black uppercase tracking-widest mb-6 ${isDarkMode ? "text-amber-400/80" : "text-amber-500"}`}>
              Connect Ecosystem
            </h3>
            <div className="flex flex-wrap justify-center md:justify-end gap-3 mb-8">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className={`p-3.5 rounded-2xl transition-all duration-500 border ${isDarkMode
                    ? "bg-gray-800/50 border-white/5 text-gray-400 hover:text-amber-400 hover:border-amber-500/30 hover:shadow-2xl hover:shadow-amber-500/10"
                    : "bg-white border-black/5 text-gray-500 hover:text-amber-600 hover:shadow-xl shadow-amber-500/5"
                    }`}
                  title={social.name}
                >
                  <social.icon className="h-5 w-5" />
                </motion.a>
              ))}
            </div>
            
            <a 
              href="mailto:parasmanikhunte@gmail.com"
              className={`inline-flex items-center gap-2 text-sm font-bold transition-all ${isDarkMode ? "text-gray-400 hover:text-amber-400" : "text-gray-500 hover:text-amber-600"}`}
            >
              <MessageSquare className="w-4 h-4" />
              parasmanikhunte@gmail.com
            </a>
          </div>
        </div>

        {/* Bottom Line */}
        <div className={`pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4 ${isDarkMode ? "border-white/5" : "border-black/5"}`}>
          <div className="flex items-center gap-2">
            <Globe className={`w-4 h-4 ${isDarkMode ? "text-gray-500" : "text-gray-400"}`} />
            <p className={`text-xs font-medium ${isDarkMode ? "text-gray-500" : "text-gray-400"}`}>
              Chhattisgarh, India // GMT +5:30
            </p>
          </div>
          
          <p className={`text-xs font-bold flex items-center gap-1.5 uppercase tracking-tighter ${isDarkMode ? "text-gray-500" : "text-gray-400"}`}>
            Built with <Heart className="h-4 w-4 text-red-500 fill-red-500 animate-pulse" /> & Passion © {new Date().getFullYear()} // v2.0-STABLE
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;