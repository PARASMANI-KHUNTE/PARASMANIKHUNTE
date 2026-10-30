import React, { useState } from "react";
import { Mail, Copy, Check, MapPin, Github, Linkedin } from "lucide-react";
import { profile } from "../../data/profile";
import { useTheme } from "../../context/ThemeContext";
import { useToast } from "../../context/ToastContext";

const ContactSection = () => {
  const { isDarkMode } = useTheme();
  const { showToast } = useToast();
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(profile.email);
    setCopied(true);
    showToast(`Email copied: ${profile.email}`);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="py-14 max-w-5xl mx-auto border-t border-gray-200 dark:border-gray-800">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <span className="text-xs font-semibold uppercase tracking-wider text-amber-500 mb-1 block">
          Get in Touch
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-3">
          Let's Build Something Together
        </h2>
        <p className={`text-sm sm:text-base leading-relaxed ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
          I am currently open to full-time Backend and Full-Stack engineering roles and remote opportunities.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto mb-8">
        {/* Email card with copy */}
        <button
          onClick={handleCopyEmail}
          type="button"
          className={`p-5 rounded-2xl border text-left transition-colors cursor-pointer group ${
            isDarkMode
              ? "bg-gray-800/40 border-gray-800 hover:border-amber-500/40"
              : "bg-white border-gray-200 hover:border-amber-300"
          }`}
          title="Click to copy email address"
        >
          <div className="flex items-center justify-between mb-3">
            <div className={`p-2 rounded-lg ${isDarkMode ? "bg-amber-500/10 text-amber-400" : "bg-amber-50 text-amber-600"}`}>
              <Mail className="w-5 h-5" />
            </div>
            <span className={`text-[10px] font-semibold px-2 py-0.5 rounded ${
              copied
                ? "bg-emerald-500/20 text-emerald-400"
                : isDarkMode
                ? "bg-gray-700 text-gray-300"
                : "bg-gray-100 text-gray-600"
            }`}>
              {copied ? "Copied!" : "Click to copy"}
            </span>
          </div>
          <div className="text-xs text-gray-400 font-medium">Direct Email</div>
          <div className="text-sm font-bold truncate mt-0.5">{profile.email}</div>
        </button>

        {/* Location card */}
        <div
          className={`p-5 rounded-2xl border text-left ${
            isDarkMode ? "bg-gray-800/40 border-gray-800" : "bg-white border-gray-200"
          }`}
        >
          <div className="flex items-center justify-between mb-3">
            <div className={`p-2 rounded-lg ${isDarkMode ? "bg-amber-500/10 text-amber-400" : "bg-amber-50 text-amber-600"}`}>
              <MapPin className="w-5 h-5" />
            </div>
          </div>
          <div className="text-xs text-gray-400 font-medium">Location</div>
          <div className="text-sm font-bold mt-0.5">Bilaspur, CG, India</div>
          <div className={`text-xs mt-0.5 ${isDarkMode ? "text-emerald-400" : "text-emerald-600"}`}>
            Open to remote
          </div>
        </div>

        {/* Professional Profiles */}
        <div
          className={`p-5 rounded-2xl border text-left ${
            isDarkMode ? "bg-gray-800/40 border-gray-800" : "bg-white border-gray-200"
          }`}
        >
          <div className="text-xs text-gray-400 font-medium mb-3">Professional Links</div>
          <div className="flex flex-col gap-2">
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs font-semibold hover:text-amber-500 transition-colors"
            >
              <Github className="w-4 h-4" />
              <span>GitHub Profile</span>
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs font-semibold hover:text-amber-500 transition-colors"
            >
              <Linkedin className="w-4 h-4" />
              <span>LinkedIn Profile</span>
            </a>
          </div>
        </div>
      </div>

      <div className="text-center">
        <a
          href={`mailto:${profile.email}?subject=Engineering%20Opportunity`}
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-semibold text-sm transition-colors shadow-sm"
        >
          <Mail className="w-4 h-4" />
          Send Email Directly
        </a>
      </div>
    </section>
  );
};

export default ContactSection;
