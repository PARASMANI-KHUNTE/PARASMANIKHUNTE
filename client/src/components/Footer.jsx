import React from "react";
import { Github, Linkedin, Mail, Globe, Copy, Check } from "lucide-react";
import { profile } from "../data/profile";
import { useTheme } from "../context/ThemeContext";
import { useToast } from "../context/ToastContext";

const Footer = () => {
  const { isDarkMode } = useTheme();
  const { showToast } = useToast();
  const [copied, setCopied] = React.useState(false);

  const handleCopyEmail = (e) => {
    e.preventDefault();
    navigator.clipboard.writeText(profile.email);
    setCopied(true);
    showToast(`Email copied: ${profile.email}`);
    setTimeout(() => setCopied(false), 2000);
  };

  const socialLinks = [
    { name: "GitHub", icon: Github, href: profile.github },
    { name: "LinkedIn", icon: Linkedin, href: profile.linkedin },
    { name: "Email", icon: Mail, href: `mailto:${profile.email}` },
  ];

  return (
    <footer
      className={`relative py-10 px-6 transition-colors duration-200 border-t ${
        isDarkMode
          ? "bg-gray-900 border-gray-800 text-white"
          : "bg-white border-gray-200 text-gray-800"
      }`}
    >
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-gray-200 dark:border-gray-800">
          {/* Branding & Headline */}
          <div>
            <div className="text-xl font-bold tracking-tight text-amber-500 mb-1">
              {profile.name}<span className="text-gray-400">.</span>
            </div>
            <p className={`text-xs sm:text-sm max-w-md ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
              {profile.headline} — {profile.oneLiner}
            </p>
          </div>

          {/* Connect & Direct Actions */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="flex items-center gap-2">
              {socialLinks.map((social) => {
                const IconComponent = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target={social.href.startsWith("mailto:") ? "_self" : "_blank"}
                    rel="noopener noreferrer"
                    className={`p-2.5 rounded-xl border transition-colors ${
                      isDarkMode
                        ? "bg-gray-800/80 border-gray-700 text-gray-300 hover:text-amber-400 hover:border-amber-500/40"
                        : "bg-gray-50 border-gray-200 text-gray-600 hover:text-amber-600 hover:border-amber-300"
                    }`}
                    title={social.name}
                    aria-label={social.name}
                  >
                    <IconComponent className="h-4 w-4" />
                  </a>
                );
              })}
            </div>

            <button
              onClick={handleCopyEmail}
              className={`inline-flex items-center gap-2 px-3 py-2 rounded-xl border text-xs font-medium transition-colors cursor-pointer ${
                isDarkMode
                  ? "bg-gray-800/80 border-gray-700 text-gray-300 hover:border-amber-500/40"
                  : "bg-gray-50 border-gray-200 text-gray-700 hover:border-amber-300"
              }`}
              title="Click to copy email address"
              type="button"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-gray-400" />}
              <span>{profile.email}</span>
              <span
                className={`text-[10px] px-1.5 py-0.5 rounded font-semibold ${
                  copied
                    ? "bg-emerald-500/20 text-emerald-400"
                    : isDarkMode
                    ? "bg-amber-500/10 text-amber-400"
                    : "bg-amber-100 text-amber-700"
                }`}
              >
                {copied ? "Copied" : "Copy"}
              </span>
            </button>
          </div>
        </div>

        {/* Bottom Line */}
        <div className={`pt-6 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs ${
          isDarkMode ? "text-gray-400" : "text-gray-500"
        }`}>
          <div className="flex items-center gap-1.5">
            <Globe className="w-3.5 h-3.5 text-amber-500" />
            <span>{profile.location}</span>
          </div>
          <p>© {new Date().getFullYear()} {profile.name}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
