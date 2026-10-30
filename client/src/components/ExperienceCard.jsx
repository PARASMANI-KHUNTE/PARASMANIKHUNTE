import React from "react";
import { Briefcase, Calendar, MapPin, ExternalLink, FileText } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

const ExperienceCard = ({ experience, onPreview }) => {
  const { isDarkMode } = useTheme();

  const hasResult =
    experience.result &&
    experience.result !== "TODO" &&
    !experience.result.startsWith("TODO");

  const cardStyle = {
    backgroundColor: 'var(--color-paper-2)',
    borderColor: 'var(--color-border)',
  };

  return (
    <article
      className="relative overflow-hidden rounded-2xl border p-6 transition-all duration-200"
      style={cardStyle}
      onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--color-accent)'; }}
      onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--color-border)'; }}
    >
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
        <div className="flex items-start gap-3">
          <div
            className="p-2.5 rounded-xl shrink-0"
            style={{
              backgroundColor: 'var(--color-accent-subtle)',
              color: 'var(--color-accent)',
            }}
          >
            <Briefcase className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold" style={{ color: 'var(--color-ink)' }}>
              {experience.role}
            </h3>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="text-sm font-semibold" style={{ color: 'var(--color-accent)' }}>
                {experience.company}
              </span>
              {experience.companyUrl && (
                <a
                  href={experience.companyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors"
                  style={{ color: 'var(--color-ink-muted)' }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--color-accent)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--color-ink-muted)'; }}
                  aria-label={`Visit ${experience.company} website`}
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-wrap sm:flex-col sm:items-end gap-2 text-xs shrink-0" style={{ color: 'var(--color-ink-muted)' }}>
          <div className="flex items-center gap-1 font-semibold" style={{ color: 'var(--color-ink)' }}>
            <Calendar className="w-3.5 h-3.5" style={{ color: 'var(--color-ink-muted)' }} />
            <span>{experience.duration}</span>
          </div>
          <div className="flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5" style={{ color: 'var(--color-ink-muted)' }} />
            <span>{experience.location}</span>
          </div>
        </div>
      </div>

      {hasResult && (
        <div className="mt-3 p-3.5 rounded-xl border text-sm font-medium" style={{
          backgroundColor: 'oklch(0.85 0.15 160 / 0.1)',
          borderColor: 'oklch(0.5 0.15 160 / 0.3)',
          color: 'oklch(0.5 0.15 160)',
        }}>
          <span className="font-bold mr-1">Result:</span>
          {experience.result}
        </div>
      )}

      {experience.certificateUrl && onPreview && (
        <div className="mt-4 pt-3 border-t" style={{ borderColor: 'var(--color-border)' }}>
          <button
            onClick={() =>
              onPreview({
                title: `${experience.role} - ${experience.company}`,
                link: experience.certificateUrl
              })
            }
            type="button"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors"
            style={{
              backgroundColor: 'var(--color-accent-subtle)',
              color: 'var(--color-accent)',
              borderColor: 'var(--color-accent)',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'var(--color-accent)'; e.currentTarget.style.color = '#fff'; }}
            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'var(--color-accent-subtle)'; e.currentTarget.style.color = 'var(--color-accent)'; }}
          >
            <FileText className="w-3.5 h-3.5" />
            View Certificate
          </button>
        </div>
      )}
    </article>
  );
};

export default ExperienceCard;