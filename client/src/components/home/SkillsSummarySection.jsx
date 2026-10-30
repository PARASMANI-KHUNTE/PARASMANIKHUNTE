import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { skillGroups } from "../../data/skills";
import { useTheme } from "../../context/ThemeContext";

const SkillsSummarySection = () => {
  const { isDarkMode } = useTheme();

  return (
    <section className="py-14 max-w-6xl mx-auto px-4 border-t" style={{ borderColor: 'var(--color-border)' }}>
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider mb-1 block" style={{ color: 'var(--color-accent)' }}>
            Technical Arsenal
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight" style={{ color: 'var(--color-ink)' }}>
            Core Engineering Stack
          </h2>
        </div>
        <Link
          to="/skills"
          className="inline-flex items-center gap-1.5 text-sm font-semibold transition-colors"
          style={{ color: 'var(--color-accent)' }}
          onMouseEnter={(e) => { e.currentTarget.style.color = 'oklch(0.58 0.18 55)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--color-accent)'; }}
        >
          <span>View all categorized skills</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {skillGroups.map((group) => (
          <div
            key={group.category}
            className="p-6 rounded-2xl border transition-colors"
            style={{
              backgroundColor: 'var(--color-paper-2)',
              borderColor: 'var(--color-border)',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--color-accent)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--color-border)'; }}
          >
            <h3 className="text-base font-bold mb-4 flex items-center justify-between" style={{ color: 'var(--color-ink)' }}>
              <span>{group.category}</span>
              <span className="text-xs font-normal px-2 py-0.5 rounded-full" style={{
                backgroundColor: 'var(--color-paper-3)',
                color: 'var(--color-ink-muted)',
              }}>
                {group.skills.length} skills
              </span>
            </h3>

            <ul className="space-y-2">
              {group.skills.map((skill) => (
                <li
                  key={skill}
                  className="flex items-center gap-2 text-sm font-medium"
                  style={{ color: 'var(--color-ink-muted)' }}
                >
                  <CheckCircle2 className="w-4 h-4 shrink-0" style={{ color: 'var(--color-accent)' }} />
                  <span>{skill}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SkillsSummarySection;