import React from "react";
import { Link } from "react-router-dom";
import { Briefcase, ArrowRight } from "lucide-react";
import { experienceData } from "../../data/experience";
import { useTheme } from "../../context/ThemeContext";

const ExperienceSummarySection = () => {
  const { isDarkMode } = useTheme();

  return (
    <section className="py-14 max-w-6xl mx-auto px-4 border-t" style={{ borderColor: 'var(--color-border)' }}>
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider mb-1 block" style={{ color: 'var(--color-accent)' }}>
            Career History
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight" style={{ color: 'var(--color-ink)' }}>
            Work Experience
          </h2>
        </div>
        <Link
          to="/experience"
          className="inline-flex items-center gap-1.5 text-sm font-semibold transition-colors"
          style={{ color: 'var(--color-accent)' }}
          onMouseEnter={(e) => { e.currentTarget.style.color = 'oklch(0.58 0.18 55)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--color-accent)'; }}
        >
          <span>View full timeline & certificates</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="space-y-3">
        {experienceData.map((exp) => {
          const hasResult = exp.result && exp.result !== "TODO" && !exp.result.startsWith("TODO");
          return (
            <div
              key={exp.id}
              className="p-4 sm:p-5 rounded-xl border transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              style={{
                backgroundColor: 'var(--color-paper-2)',
                borderColor: 'var(--color-border)',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--color-accent)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--color-border)'; }}
            >
              <div className="flex items-start sm:items-center gap-3">
                <div
                  className="p-2 rounded-lg shrink-0"
                  style={{
                    backgroundColor: 'var(--color-accent-subtle)',
                    color: 'var(--color-accent)',
                  }}
                >
                  <Briefcase className="w-4 h-4" />
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-bold text-sm sm:text-base" style={{ color: 'var(--color-ink)' }}>
                      {exp.role}
                    </span>
                    <span className="text-xs" style={{ color: 'var(--color-accent)' }}>
                      @ {exp.company}
                    </span>
                    <span className="text-xs px-2 py-0.5 rounded-full" style={{
                      backgroundColor: 'var(--color-paper-3)',
                      color: 'var(--color-ink-muted)',
                    }}>
                      {exp.location}
                    </span>
                  </div>
                  {hasResult && (
                    <p className="text-xs sm:text-sm mt-1 font-medium" style={{ color: 'oklch(0.5 0.15 160)' }}>
                      • {exp.result}
                    </p>
                  )}
                </div>
              </div>

              <span className="text-xs font-semibold shrink-0 sm:text-right" style={{ color: 'var(--color-ink-muted)' }}>
                {exp.duration}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default ExperienceSummarySection;