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

  const footerStyle = {
    backgroundColor: 'var(--color-paper)',
    borderColor: 'var(--color-border)',
    color: 'var(--color-ink)',
  };

  return (
    <footer className="relative py-12 px-6 overflow-hidden transition-all duration-300 border-t" style={footerStyle}>
      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-8">
          {/* Branding */}
          <div className="md:col-span-5 text-center md:text-left">
            <h2 className="text-2xl font-bold tracking-tight mb-3" style={{ color: 'var(--color-accent)' }}>
              Parasmani Khunte
            </h2>
            <p className="text-sm mb-4 max-w-sm leading-relaxed" style={{ color: 'var(--color-ink-muted)' }}>
              Backend / Full-Stack Developer building event-driven backends and local-first AI systems in Node.js/TypeScript and Python.
            </p>
          </div>

          {/* Quick Navigation Links */}
          <div className="md:col-span-3 text-center md:text-left">
            <h3 className="text-xs font-semibold uppercase tracking-wider mb-4" style={{ color: 'var(--color-ink-muted)' }}>
              Navigation
            </h3>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-sm transition-colors duration-200"
                    style={{ color: 'var(--color-ink-muted)' }}
                    onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--color-accent)'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--color-ink-muted)'; }}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect Ecosystem */}
          <div className="md:col-span-4 text-center md:text-right flex flex-col md:items-end">
            <h3 className="text-xs font-semibold uppercase tracking-wider mb-4" style={{ color: 'var(--color-ink-muted)' }}>
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
                    className="p-2.5 rounded-xl transition-all duration-200 border"
                    style={{
                      backgroundColor: 'var(--color-paper-2)',
                      borderColor: 'var(--color-border)',
                      color: 'var(--color-ink-muted)',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = 'var(--color-accent)';
                      e.currentTarget.style.borderColor = 'var(--color-accent)';
                      e.currentTarget.style.backgroundColor = 'var(--color-paper-3)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = 'var(--color-ink-muted)';
                      e.currentTarget.style.borderColor = 'var(--color-border)';
                      e.currentTarget.style.backgroundColor = 'var(--color-paper-2)';
                    }}
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
              className="inline-flex items-center gap-2 text-xs font-medium transition-colors cursor-pointer"
              style={{ color: 'var(--color-ink-muted)' }}
              onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--color-accent)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--color-ink-muted)'; }}
              title="Click to copy email"
              type="button"
            >
              {copied ? <Check className="w-3.5 h-3.5" style={{ color: 'oklch(0.5 0.15 160)' }} /> : <Copy className="w-3.5 h-3.5" />}
              <span>parasmanikhunte@gmail.com</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded font-semibold" style={{
                backgroundColor: copied ? 'oklch(0.85 0.15 160 / 0.2)' : 'var(--color-accent-subtle)',
                color: copied ? 'oklch(0.5 0.15 160)' : 'var(--color-accent)',
              }}>
                {copied ? "Copied" : "Copy"}
              </span>
            </button>
          </div>
        </div>

        {/* Bottom Line */}
        <div className="pt-6 border-t flex flex-col sm:flex-row justify-between items-center gap-3 text-xs" style={{ borderColor: 'var(--color-border)', color: 'var(--color-ink-muted)' }}>
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