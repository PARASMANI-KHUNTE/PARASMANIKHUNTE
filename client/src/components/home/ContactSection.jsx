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
    <section className="py-14 max-w-6xl mx-auto px-4 border-t" style={{ borderColor: 'var(--color-border)' }}>
      <div className="text-center max-w-2xl mx-auto mb-10">
        <span className="text-xs font-semibold uppercase tracking-wider mb-1 block" style={{ color: 'var(--color-accent)' }}>
          Get in Touch
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-3" style={{ color: 'var(--color-ink)' }}>
          Let's Build Something Together
        </h2>
        <p className="text-sm sm:text-base leading-relaxed" style={{ color: 'var(--color-ink-muted)' }}>
          I am currently open to full-time Backend and Full-Stack engineering roles and remote opportunities.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto mb-8">
        {/* Email card with copy */}
        <button
          onClick={handleCopyEmail}
          type="button"
          className="p-5 rounded-2xl border text-left transition-colors cursor-pointer group"
          style={{
            backgroundColor: 'var(--color-paper-2)',
            borderColor: 'var(--color-border)',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--color-accent)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--color-border)'; }}
          title="Click to copy email address"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="p-2 rounded-lg" style={{
              backgroundColor: 'var(--color-accent-subtle)',
              color: 'var(--color-accent)',
            }}>
              <Mail className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-semibold px-2 py-0.5 rounded" style={{
              backgroundColor: copied ? 'oklch(0.85 0.15 160 / 0.2)' : 'var(--color-paper-3)',
              color: copied ? 'oklch(0.5 0.15 160)' : 'var(--color-ink-muted)',
            }}>
              {copied ? "Copied!" : "Click to copy"}
            </span>
          </div>
          <div className="text-xs font-medium" style={{ color: 'var(--color-ink-muted)' }}>Direct Email</div>
          <div className="text-sm font-bold truncate mt-0.5" style={{ color: 'var(--color-ink)' }}>{profile.email}</div>
        </button>

        {/* Location card */}
        <div
          className="p-5 rounded-2xl border text-left"
          style={{
            backgroundColor: 'var(--color-paper-2)',
            borderColor: 'var(--color-border)',
          }}
        >
          <div className="flex items-center justify-between mb-3">
            <div className="p-2 rounded-lg" style={{
              backgroundColor: 'var(--color-accent-subtle)',
              color: 'var(--color-accent)',
            }}>
              <MapPin className="w-5 h-5" />
            </div>
          </div>
          <div className="text-xs font-medium" style={{ color: 'var(--color-ink-muted)' }}>Location</div>
          <div className="text-sm font-bold mt-0.5" style={{ color: 'var(--color-ink)' }}>Bilaspur, CG, India</div>
          <div className="text-xs mt-0.5" style={{ color: 'oklch(0.5 0.15 160)' }}>
            Open to remote
          </div>
        </div>

        {/* Professional Profiles */}
        <div
          className="p-5 rounded-2xl border text-left"
          style={{
            backgroundColor: 'var(--color-paper-2)',
            borderColor: 'var(--color-border)',
          }}
        >
          <div className="text-xs font-medium mb-3" style={{ color: 'var(--color-ink-muted)' }}>Professional Links</div>
          <div className="flex flex-col gap-2">
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs font-semibold transition-colors"
              style={{ color: 'var(--color-ink)' }}
              onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--color-accent)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--color-ink)'; }}
            >
              <Github className="w-4 h-4" />
              <span>GitHub Profile</span>
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs font-semibold transition-colors"
              style={{ color: 'var(--color-ink)' }}
              onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--color-accent)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--color-ink)'; }}
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
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-semibold text-sm transition-colors shadow-sm"
          style={{
            backgroundColor: 'var(--color-accent)',
            color: '#fff',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'oklch(0.58 0.18 55)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'var(--color-accent)'; }}
        >
          <Mail className="w-4 h-4" />
          Send Email Directly
        </a>
      </div>
    </section>
  );
};

export default ContactSection;