import React from "react";
import { Download, Eye, Github, Linkedin, Mail, MapPin } from "lucide-react";
import { profile } from "../../data/profile";
import { useTheme } from "../../context/ThemeContext";

const HeroSection = ({ onOpenCvPreview }) => {
  const { isDarkMode } = useTheme();

  return (
    <section className="py-12 md:py-16 flex flex-col md:flex-row items-center justify-between gap-8 max-w-6xl mx-auto px-4">
      {/* Left text column */}
      <div className="flex-1 text-center md:text-left max-w-2xl">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium mb-4" style={{
          backgroundColor: 'var(--color-accent-subtle)',
          color: 'var(--color-accent)',
          borderColor: 'var(--color-accent)'
        }}>
          <MapPin className="w-3.5 h-3.5" />
          <span>{profile.location}</span>
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-3" style={{ color: 'var(--color-ink)' }}>
          Hi, I'm <span style={{ color: 'var(--color-accent)' }}>{profile.name}</span>
        </h1>

        <h2 className="text-xl sm:text-2xl font-semibold mb-4" style={{ color: 'var(--color-accent)' }}>
          {profile.headline}
        </h2>

        <p className="text-base sm:text-lg leading-relaxed mb-8 max-w-xl" style={{ color: 'var(--color-ink-muted)' }}>
          {profile.oneLiner}
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
          {/* Download CV - Primary */}
          <a
            href={profile.resumePdf}
            download="Parasmani_Khunte_Resume.pdf"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-colors shadow-sm"
            style={{
              backgroundColor: 'var(--color-accent)',
              color: '#fff',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'oklch(0.58 0.18 55)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'var(--color-accent)'; }}
          >
            <Download className="w-4 h-4" />
            Download CV
          </a>

          {/* Preview CV - Secondary */}
          {onOpenCvPreview && (
            <button
              onClick={onOpenCvPreview}
              type="button"
              className="inline-flex items-center gap-2 px-4 py-3 rounded-xl border text-sm font-medium transition-colors"
              style={{
                borderColor: 'var(--color-border)',
                backgroundColor: 'var(--color-paper-2)',
                color: 'var(--color-ink)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--color-paper-3)';
                e.currentTarget.style.borderColor = 'var(--color-accent)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--color-paper-2)';
                e.currentTarget.style.borderColor = 'var(--color-border)';
              }}
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
              className="p-3 rounded-xl border transition-colors"
              style={{
                borderColor: 'var(--color-border)',
                backgroundColor: 'var(--color-paper-2)',
                color: 'var(--color-ink-muted)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = 'var(--color-ink)';
                e.currentTarget.style.borderColor = 'var(--color-accent)';
                e.currentTarget.style.backgroundColor = 'var(--color-paper-3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'var(--color-ink-muted)';
                e.currentTarget.style.borderColor = 'var(--color-border)';
                e.currentTarget.style.backgroundColor = 'var(--color-paper-2)';
              }}
              title="GitHub Profile"
              aria-label="GitHub Profile"
            >
              <Github className="w-4 h-4" />
            </a>

            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-xl border transition-colors"
              style={{
                borderColor: 'var(--color-border)',
                backgroundColor: 'var(--color-paper-2)',
                color: 'var(--color-ink-muted)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = 'var(--color-ink)';
                e.currentTarget.style.borderColor = 'var(--color-accent)';
                e.currentTarget.style.backgroundColor = 'var(--color-paper-3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'var(--color-ink-muted)';
                e.currentTarget.style.borderColor = 'var(--color-border)';
                e.currentTarget.style.backgroundColor = 'var(--color-paper-2)';
              }}
              title="LinkedIn Profile"
              aria-label="LinkedIn Profile"
            >
              <Linkedin className="w-4 h-4" />
            </a>

            <a
              href={`mailto:${profile.email}`}
              className="p-3 rounded-xl border transition-colors"
              style={{
                borderColor: 'var(--color-border)',
                backgroundColor: 'var(--color-paper-2)',
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
        <div className="relative w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 rounded-full overflow-hidden border-4" style={{
          borderColor: 'var(--color-border)',
          backgroundColor: 'var(--color-paper-2)',
        }}>
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