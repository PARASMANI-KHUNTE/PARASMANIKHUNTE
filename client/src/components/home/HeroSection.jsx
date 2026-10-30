import React from "react";
import { Download, Eye, Github, Linkedin, Mail, MapPin } from "lucide-react";
import { profile } from "../../data/profile";
import { useTheme } from "../../context/ThemeContext";

const HeroSection = ({ onOpenCvPreview }) => {
  const { isDarkMode } = useTheme();

  return (
    <section className="py-12 md:py-20 flex flex-col md:flex-row items-center justify-between gap-10 max-w-5xl mx-auto">
      {/* Left text column */}
      <div className="flex-1 text-center md:text-left">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold mb-4 bg-amber-500/10 text-amber-500 border border-amber-500/20">
          <MapPin className="w-3.5 h-3.5" />
          <span>{profile.location}</span>
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-3">
          Hi, I'm <span className="text-amber-500">{profile.name}</span>
        </h1>

        <h2 className={`text-xl sm:text-2xl font-semibold mb-4 ${
          isDarkMode ? "text-amber-400/90" : "text-amber-600"
        }`}>
          {profile.headline}
        </h2>

        <p className={`text-base sm:text-lg leading-relaxed mb-8 max-w-xl ${
          isDarkMode ? "text-gray-300" : "text-gray-600"
        }`}>
          {profile.oneLiner}
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
          {/* Download CV - Primary */}
          <a
            href={profile.resumePdf}
            download="Parasmani_Khunte_Resume.pdf"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-semibold text-sm transition-colors shadow-sm"
          >
            <Download className="w-4 h-4" />
            Download CV
          </a>

          {/* Preview CV - Secondary */}
          {onOpenCvPreview && (
            <button
              onClick={onOpenCvPreview}
              type="button"
              className={`inline-flex items-center gap-2 px-4 py-3 rounded-xl border text-sm font-medium transition-colors ${
                isDarkMode
                  ? "border-gray-700 bg-gray-800 text-gray-200 hover:bg-gray-700"
                  : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
              }`}
              title="Preview CV in modal"
            >
              <Eye className="w-4 h-4" />
              Preview
            </button>
          )}

          {/* Social Links */}
          <div className="flex items-center gap-2 ml-1">
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className={`p-3 rounded-xl border transition-colors ${
                isDarkMode
                  ? "border-gray-700 bg-gray-800 text-gray-300 hover:text-white hover:bg-gray-700"
                  : "border-gray-300 bg-white text-gray-700 hover:text-black hover:bg-gray-50"
              }`}
              title="GitHub Profile"
              aria-label="GitHub Profile"
            >
              <Github className="w-4 h-4" />
            </a>

            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className={`p-3 rounded-xl border transition-colors ${
                isDarkMode
                  ? "border-gray-700 bg-gray-800 text-gray-300 hover:text-white hover:bg-gray-700"
                  : "border-gray-300 bg-white text-gray-700 hover:text-blue-600 hover:bg-gray-50"
              }`}
              title="LinkedIn Profile"
              aria-label="LinkedIn Profile"
            >
              <Linkedin className="w-4 h-4" />
            </a>

            <a
              href={`mailto:${profile.email}`}
              className={`p-3 rounded-xl border transition-colors ${
                isDarkMode
                  ? "border-gray-700 bg-gray-800 text-gray-300 hover:text-amber-400 hover:bg-gray-700"
                  : "border-gray-300 bg-white text-gray-700 hover:text-amber-600 hover:bg-gray-50"
              }`}
              title="Email Parasmani"
              aria-label="Email Parasmani"
            >
              <Mail className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>

      {/* Right photo column */}
      <div className="shrink-0 flex justify-center">
        <div className={`relative w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 rounded-full overflow-hidden border-4 ${
          isDarkMode ? "border-gray-800 bg-gray-800" : "border-white bg-amber-100 shadow-md"
        }`}>
          <img
            src={profile.profileImage}
            alt="Parasmani Khunte - Software Engineer"
            className="w-full h-full object-cover"
            width="256"
            height="256"
            loading="eager"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
