import React from "react";
import { GraduationCap, Calendar, MapPin, Award, FileText } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

const EducationCard = ({ item, type = "education", onPreview }) => {
  const { isDarkMode } = useTheme();

  const cardStyle = {
    backgroundColor: 'var(--color-paper-2)',
    borderColor: 'var(--color-border)',
  };

  return (
    <article
      className="rounded-2xl border p-6 transition-all duration-200 flex flex-col justify-between"
      style={cardStyle}
      onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--color-accent)'; }}
      onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--color-border)'; }}
    >
      <div>
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-start gap-3">
            <div
              className="p-2.5 rounded-xl shrink-0"
              style={{
                backgroundColor: 'var(--color-accent-subtle)',
                color: 'var(--color-accent)',
              }}
            >
              {type === "hackathon" ? (
                <Award className="w-5 h-5" />
              ) : (
                <GraduationCap className="w-5 h-5" />
              )}
            </div>
            <div>
              <h3 className="text-lg font-bold" style={{ color: 'var(--color-ink)' }}>
                {item.degree || item.title}
              </h3>
              <p className="text-sm font-semibold" style={{ color: 'var(--color-accent)' }}>
                {item.institution || item.organization}
              </p>
            </div>
          </div>

          <span className="text-xs font-semibold px-2.5 py-1 rounded-full shrink-0" style={{
            backgroundColor: 'var(--color-paper-3)',
            color: 'var(--color-ink-muted)',
          }}>
            {item.year}
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-4 text-xs mt-2 mb-4" style={{ color: 'var(--color-ink-muted)' }}>
          {item.location && (
            <div className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5" style={{ color: 'var(--color-ink-muted)' }} />
              <span>{item.location}</span>
            </div>
          )}
          {item.gpa && (
            <div className="font-semibold" style={{ color: 'oklch(0.5 0.15 160)' }}>
              CGPA: {item.gpa}
            </div>
          )}
          {item.status && (
            <div className="font-semibold" style={{ color: 'var(--color-accent)' }}>
              Status: {item.status}
            </div>
          )}
        </div>
      </div>

      {item.certificateUrl && onPreview && (
        <div className="pt-3 border-t" style={{ borderColor: 'var(--color-border)' }}>
          <button
            onClick={() =>
              onPreview({
                title: item.title || item.degree,
                link: item.certificateUrl
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

export default EducationCard;