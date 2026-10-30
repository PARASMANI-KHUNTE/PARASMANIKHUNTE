import React from "react";
import { Link } from "react-router-dom";
import { ExternalLink, Github, Code, Layers } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

const ProjectCard = ({ project, onPreview }) => {
  const { isDarkMode } = useTheme();

  const getProjectIcon = (tech = "") => {
    if (tech.toLowerCase().includes("react")) return Layers;
    return Code;
  };

  const ProjectIcon = getProjectIcon(Array.isArray(project.stack) ? project.stack.join(" ") : project.tech);

  const techList = Array.isArray(project.stack)
    ? project.stack
    : typeof project.tech === "string"
    ? project.tech.split(",").map((t) => t.trim())
    : [];

  const projectUrl = project.slug ? `/projects/${project.slug}` : null;

  const cardStyle = {
    backgroundColor: 'var(--color-paper-2)',
    borderColor: 'var(--color-border)',
  };

  const cardHoverStyle = {
    borderColor: 'var(--color-accent)',
  };

  return (
    <article
      className="relative overflow-hidden rounded-2xl border transition-all duration-200 flex flex-col h-full hover:-translate-y-1 hover:shadow-lg"
      style={cardStyle}
      onMouseEnter={(e) => { Object.assign(e.currentTarget.style, cardHoverStyle); }}
      onMouseLeave={(e) => { Object.assign(e.currentTarget.style, cardStyle); }}
    >
      <div className="p-6 flex-1 flex flex-col">
        {/* Header */}
        <div className="mb-3 flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
              style={{
                backgroundColor: 'var(--color-accent-subtle)',
                color: 'var(--color-accent)',
              }}
            >
              <ProjectIcon className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold" style={{ color: 'var(--color-ink)' }}>
                {projectUrl ? (
                  <Link to={projectUrl} className="hover:underline transition-colors" style={{ color: 'inherit' }}>
                    {project.title}
                  </Link>
                ) : (
                  project.title
                )}
              </h3>
              {project.category && (
                <span className="text-xs" style={{ color: 'var(--color-ink-muted)' }}>
                  {project.category}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* One-Liner / Description */}
        <p className="text-sm mb-5 leading-relaxed flex-1" style={{ color: 'var(--color-ink-muted)' }}>
          {project.oneLiner || project.description}
        </p>

        {/* Tech Tags */}
        <div className="mb-6 flex flex-wrap gap-1.5" aria-label="Technologies used">
          {techList.slice(0, 6).map((tech, index) => (
            <span
              key={index}
              className="rounded-md px-2.5 py-1 text-xs font-medium"
              style={{
                backgroundColor: 'var(--color-accent-subtle)',
                color: 'var(--color-accent)',
                borderColor: 'var(--color-accent)',
              }}
            >
              {tech}
            </span>
          ))}
          {techList.length > 6 && (
            <span className="rounded-md px-2 py-1 text-xs" style={{ color: 'var(--color-ink-muted)' }}>
              +{techList.length - 6} more
            </span>
          )}
        </div>

        {/* Action Buttons */}
        <div className="mt-auto pt-4 border-t flex items-center justify-between text-xs" style={{ borderColor: 'var(--color-border)' }}>
          {projectUrl ? (
            <Link
              to={projectUrl}
              className="font-semibold transition-colors"
              style={{ color: 'var(--color-accent)' }}
              onMouseEnter={(e) => { e.currentTarget.style.color = 'oklch(0.58 0.18 55)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--color-accent)'; }}
            >
              Case Study →
            </Link>
          ) : (
            <span style={{ color: 'var(--color-ink-muted)' }}>Project</span>
          )}

          <div className="flex items-center gap-2">
            {project.liveUrl || project.link ? (
              <>
                {onPreview && (
                  <button
                    onClick={() => onPreview({ ...project, link: project.liveUrl || project.link })}
                    className="px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors"
                    style={{
                      backgroundColor: 'var(--color-paper-3)',
                      color: 'var(--color-ink)',
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'var(--color-accent-subtle)'; e.currentTarget.style.color = 'var(--color-accent)'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'var(--color-paper-3)'; e.currentTarget.style.color = 'var(--color-ink)'; }}
                    title="Preview Live"
                    type="button"
                  >
                    Preview
                  </button>
                )}
                <a
                  href={project.liveUrl || project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 rounded-lg transition-colors"
                  style={{ color: 'var(--color-accent)' }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = 'oklch(0.58 0.18 55)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--color-accent)'; }}
                  title="Open live link"
                  aria-label={`Open live demo for ${project.title}`}
                >
                  <ExternalLink className="h-4 w-4" />
                </a>
              </>
            ) : null}

            {project.repoUrl || project.github ? (
              <a
                href={project.repoUrl || project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 rounded-lg transition-colors"
                style={{ color: 'var(--color-ink-muted)' }}
                onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--color-ink)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--color-ink-muted)'; }}
                title="View Source Code"
                aria-label={`View source code for ${project.title}`}
              >
                <Github className="h-4 w-4" />
              </a>
            ) : null}
          </div>
        </div>
      </div>
    </article>
  );
};

export default ProjectCard;