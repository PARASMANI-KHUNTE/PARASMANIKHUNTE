import React from "react";
import { Link } from "react-router-dom";
import { Github, Linkedin, Instagram, Globe, Copy, Check } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import { useToast } from "../context/ToastContext";

const Footer = () => {
  const { isDarkMode } = useTheme();
  const { showToast } = useToast();
  const [copied, setCopied] = React.useState(false);

  const handleCopyEmail = (e) => {
    e.preventDefault();
    const email = "parasmanikhunte@gmail.com";
    navigator.clipboard.writeText(email);
    setCopied(true);
    showToast("Email copied: parasmanikhunte@gmail.com");
    setTimeout(() => setCopied(false), 2000);
  };

  const socialLinks = [
    { name: "GitHub", icon: Github, href: "https://github.com/PARASMANI-KHUNTE" },
    { name: "LinkedIn", icon: Linkedin, href: "https://www.linkedin.com/in/parasmani-khunte-330488228/" },
    { name: "Instagram", icon: Instagram, href: "https://www.instagram.com/ll.__.p.a.r.a.s.__.ll/" },
  ];

  const quickLinks = [
    { name: "Home", path: "/" },
    { name: "Projects", path: "/projects" },
    { name: "Skills", path: "/skills" },
    { name: "Education", path: "/education" },
    { name: "Experience", path: "/experience" },
  ];

  return (
    <footer className={`relative py-12 px-6 overflow-hidden transition-all duration-300 border-t ${
      isDarkMode
        ? "bg-gray-900 border-gray-800 text-white"
        : "bg-white border-gray-200 text-gray-800"
    }`}>
      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-8">
          {/* Branding */}
          <div className="md:col-span-5 text-center md:text-left">
            <h2 className="text-2xl font-bold tracking-tight mb-3 text-amber-500">
              Parasmani Khunte
            </h2>
            <p className={`text-sm mb-4 max-w-sm leading-relaxed ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
              Backend / Full-Stack Developer building event-driven backends and local-first AI systems in Node.js/TypeScript and Python.
            </p>
          </div>

          {/* Quick Navigation Links */}
          <div className="md:col-span-3 text-center md:text-left">
            <h3 className={`text-xs font-semibold uppercase tracking-wider mb-4 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
              Navigation
            </h3>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className={`text-sm transition-colors duration-200 ${
                      isDarkMode ? "text-gray-300 hover:text-amber-400" : "text-gray-600 hover:text-amber-600"
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
            <h3 className={`text-xs font-semibold uppercase tracking-wider mb-4 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
              Connect
            </h3>
            <div className="flex flex-wrap justify-center md:justify-end gap-2.5 mb-5">
              {socialLinks.map((social) => {
                const IconComponent = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-2.5 rounded-xl transition-all duration-200 border ${
                      isDarkMode
                        ? "bg-gray-800 border-gray-700 text-gray-300 hover:text-amber-400 hover:border-amber-500/40"
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
              className={`inline-flex items-center gap-2 text-xs font-medium transition-colors cursor-pointer ${
                isDarkMode ? "text-gray-400 hover:text-amber-400" : "text-gray-600 hover:text-amber-600"
              }`}
              title="Click to copy email"
              type="button"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>parasmanikhunte@gmail.com</span>
              <span className={`text-[10px] px-1.5 py-0.5 rounded font-semibold ${
                isDarkMode ? "bg-amber-500/10 text-amber-400" : "bg-amber-100 text-amber-700"
              }`}>
                {copied ? "Copied" : "Copy"}
              </span>
            </button>
          </div>
        </div>

        {/* Bottom Line */}
        <div className={`pt-6 border-t flex flex-col sm:flex-row justify-between items-center gap-3 text-xs ${
          isDarkMode ? "border-gray-800 text-gray-400" : "border-gray-200 text-gray-600"
        }`}>
          <div className="flex items-center gap-1.5">
            <Globe className="w-3.5 h-3.5" />
            <span>Bilaspur, Chhattisgarh, India (open to remote)</span>
          </div>
          <p>© {new Date().getFullYear()} Parasmani Khunte. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
