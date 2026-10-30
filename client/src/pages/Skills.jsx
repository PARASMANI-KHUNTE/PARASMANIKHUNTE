import React from "react";
import { CheckCircle2, Code2, Database, Wrench } from "lucide-react";
import { skillGroups } from "../data/skills";
import { useTheme } from "../context/ThemeContext";

const Skills = () => {
  const { isDarkMode } = useTheme();

  const getCategoryIcon = (category) => {
    switch (category) {
      case "Backend":
        return Code2;
      case "Data and AI":
        return Database;
      default:
        return Wrench;
    }
  };

  return (
    <div
      className="min-h-screen py-24 px-6"
      style={{
        backgroundColor: 'var(--color-paper)',
        color: 'var(--color-ink)',
      }}
    >
      <div className="container mx-auto max-w-4xl px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-xs font-semibold uppercase tracking-wider mb-2 block" style={{ color: 'var(--color-accent)' }}>
            Technical Proficiency
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4" style={{ color: 'var(--color-ink)' }}>
            Technical Skills
          </h1>
          <p className="text-base max-w-xl mx-auto leading-relaxed" style={{ color: 'var(--color-ink-muted)' }}>
            Core languages, distributed data systems, and tooling I use across production and engineering environments.
          </p>
        </div>

        {/* 3 Grouped Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {skillGroups.map((group) => {
            const Icon = getCategoryIcon(group.category);
            return (
              <div
                key={group.category}
                className="p-6 rounded-2xl border transition-all"
                style={{
                  backgroundColor: 'var(--color-paper-2)',
                  borderColor: 'var(--color-border)',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--color-accent)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--color-border)'; }}
              >
                <div className="flex items-center gap-3 mb-5">
                  <div
                    className="p-2.5 rounded-xl"
                    style={{
                      backgroundColor: 'var(--color-accent-subtle)',
                      color: 'var(--color-accent)',
                    }}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <h2 className="text-lg font-bold" style={{ color: 'var(--color-ink)' }}>
                    {group.category}
                  </h2>
                </div>

                <ul className="space-y-3" aria-label={`${group.category} skills`}>
                  {group.skills.map((skill) => (
                    <li
                      key={skill}
                      className="flex items-center gap-2.5 text-sm font-medium"
                      style={{ color: 'var(--color-ink-muted)' }}
                    >
                      <CheckCircle2 className="w-4 h-4 shrink-0" style={{ color: 'var(--color-accent)' }} />
                      <span>{skill}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Skills;