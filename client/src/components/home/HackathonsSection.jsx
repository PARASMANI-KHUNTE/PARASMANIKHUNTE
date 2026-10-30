import React from "react";
import { Award, FileText } from "lucide-react";
import { hackathons } from "../../data/education";
import { useTheme } from "../../context/ThemeContext";

const HackathonsSection = ({ onPreviewCertificate }) => {
  const { isDarkMode } = useTheme();

  return (
    <section className="py-14 max-w-6xl mx-auto px-4 border-t" style={{ borderColor: 'var(--color-border)' }}>
      <div className="mb-8">
        <span className="text-xs font-semibold uppercase tracking-wider mb-1 block" style={{ color: 'var(--color-accent)' }}>
          Competitive Achievements
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight" style={{ color: 'var(--color-ink)' }}>
          Hackathons & Recognition
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {hackathons.map((hackathon) => (
          <div
            key={hackathon.id}
            className="p-6 rounded-2xl border transition-colors flex flex-col justify-between"
            style={{
              backgroundColor: 'var(--color-paper-2)',
              borderColor: 'var(--color-border)',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--color-accent)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--color-border)'; }}
          >
            <div>
              <div className="flex items-start justify-between gap-3 mb-2">
                <div className="flex items-center gap-2.5">
                  <div
                    className="p-2 rounded-lg"
                    style={{
                      backgroundColor: 'var(--color-accent-subtle)',
                      color: 'var(--color-accent)',
                    }}
                  >
                    <Award className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-base sm:text-lg" style={{ color: 'var(--color-ink)' }}>
                    {hackathon.title}
                  </h3>
                </div>
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full shrink-0" style={{
                  backgroundColor: 'var(--color-paper-3)',
                  color: 'var(--color-ink-muted)',
                }}>
                  {hackathon.year}
                </span>
              </div>

              <p className="text-sm mb-4" style={{ color: 'var(--color-ink-muted)' }}>
                {hackathon.organization}
              </p>
            </div>

            {hackathon.certificateUrl && onPreviewCertificate && (
              <button
                onClick={() =>
                  onPreviewCertificate({
                    title: hackathon.title,
                    link: hackathon.certificateUrl
                  })
                }
                type="button"
                className="self-start inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors"
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
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default HackathonsSection;