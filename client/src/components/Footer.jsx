import React from "react";
import { Heart } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import BackgroundParticles from "./common/BackgroundParticles";

const Footer = () => {
  const { isDarkMode } = useTheme();

  return (
    <footer className={`relative py-12 px-6 overflow-hidden transition-all duration-500 border-t ${isDarkMode
      ? "bg-gray-900/80 border-white/5 text-white"
      : "bg-amber-50/80 border-black/5 text-gray-800"
      } backdrop-blur-xl`}>
      <BackgroundParticles count={10} />

      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 text-center md:text-left">
          <div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent mb-2">
              PARASMANI KHUNTE
            </h2>
            <p className={isDarkMode ? "text-gray-400" : "text-gray-600"}>
              Full Stack AI Engineer crafting the future of digital experiences.
            </p>
          </div>

          <div className="flex flex-col items-center md:items-end gap-4">
            <p className={`text-sm flex items-center gap-1.5 ${isDarkMode ? "text-gray-500" : "text-gray-500"}`}>
              Built with <Heart className="h-4 w-4 text-red-500 fill-red-500" /> & Passion © {new Date().getFullYear()}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;