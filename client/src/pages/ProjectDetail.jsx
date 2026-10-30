import React from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, ExternalLink, Github, Layers, CheckCircle2 } from "lucide-react";
import { projects } from "../data/projects";
import { useTheme } from "../context/ThemeContext";

const ProjectDetail = () => {
  const { slug } = useParams();
  const { isDarkMode } = useTheme();

  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    return (
      <div
        className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center"
        style={{ color: 'var(--color-ink)' }}
      >
        <h1 className="text-3xl font-bold mb-4" style={{ color: 'var(--color-ink)' }}>Project Not Found</h1>
        <p className="mb-6" style={{ color: 'var(--color-ink-muted)' }}>
          The project you are looking for does not exist or has been moved.
        </p>
        <Link
          to="/projects"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium transition-colors"
          style={{
            backgroundColor: 'var(--color-accent)',
            color: '#fff',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'oklch(0.58 0.18 55)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'var(--color-accent)'; }}
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Projects
        </Link>
      </div>
    );
  }

  // Only display filled fields that are not placeholder "TODO"
  const isFilled = (value) => {
    if (!value) return false;
    if (typeof value === "string" && (value.trim() === "TODO" || value.trim().startsWith("TODO"))) {
      return false;
    }
    return true;
  };

  const validMetrics = Array.isArray(project.metrics)
    ? project.metrics.filter((m) => m && m.label && isFilled(m.value))
    : [];

  return (
    <div
      className="min-h-screen py-24 px-6"
      style={{
        backgroundColor: 'var(--color-paper)',
        color: 'var(--color-ink)',
      }}
    >
      <div className="container mx-auto max-w-4xl px-4">
        {/* Navigation Breadcrumb */}
        <div className="mb-8">
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 text-sm font-medium transition-colors"
            style={{ color: 'var(--color-accent)' }}
            onMouseEnter={(e) => { e.currentTarget.style.color = 'oklch(0.58 0.18 55)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--color-accent)'; }}
          >
            <ArrowLeft className="w-4 h-4" />
            Back to All Projects
          </Link>
        </div>

        {/* Case Study Header */}
        <header className="mb-10 pb-8 border-b" style={{ borderColor: 'var(--color-border)' }}>
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="text-xs font-semibold px-3 py-1 rounded-full border" style={{
              backgroundColor: 'var(--color-accent-subtle)',
              color: 'var(--color-accent)',
              borderColor: 'var(--color-accent)',
            }}>
              {project.category || "Case Study"}
            </span>
            {project.featured && (
              <span className="text-xs font-semibold px-3 py-1 rounded-full border" style={{
                backgroundColor: 'oklch(0.85 0.15 160 / 0.1)',
                color: 'oklch(0.5 0.15 160)',
                borderColor: 'oklch(0.5 0.15 160 / 0.3)',
              }}>
                Featured Case Study
              </span>
            )}
          </div>

          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4" style={{ color: 'var(--color-ink)' }}>
            {project.title}
          </h1>

          <p className="text-lg md:text-xl leading-relaxed mb-6" style={{ color: 'var(--color-ink-muted)' }}>
            {project.oneLiner}
          </p>

          {/* Links Bar */}
          <div className="flex flex-wrap gap-3">
            {isFilled(project.liveUrl) && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm transition-colors shadow-sm"
                style={{
                  backgroundColor: 'var(--color-accent)',
                  color: '#fff',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'oklch(0.58 0.18 55)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'var(--color-accent)'; }}
              >
                <ExternalLink className="w-4 h-4" />
                Live Demo
              </a>
            )}
            {isFilled(project.repoUrl) && (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border text-sm font-medium transition-colors"
                style={{
                  backgroundColor: 'var(--color-paper-2)',
                  borderColor: 'var(--color-border)',
                  color: 'var(--color-ink)',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--color-accent)'; e.currentTarget.style.backgroundColor = 'var(--color-paper-3)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--color-border)'; e.currentTarget.style.backgroundColor = 'var(--color-paper-2)'; }}
              >
                <Github className="w-4 h-4" />
                Source Code
              </a>
            )}
            {isFilled(project.demoVideoUrl) && (
              <a
                href={project.demoVideoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border text-sm font-medium transition-colors"
                style={{
                  backgroundColor: 'var(--color-paper-2)',
                  borderColor: 'var(--color-border)',
                  color: 'var(--color-ink)',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--color-accent)'; e.currentTarget.style.backgroundColor = 'var(--color-paper-3)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--color-border)'; e.currentTarget.style.backgroundColor = 'var(--color-paper-2)'; }}
              >
                <Layers className="w-4 h-4" />
                Demo Video
              </a>
            )}
          </div>
        </header>

        {/* Metrics Section (if present and filled) */}
        {validMetrics.length > 0 && (
          <section className="mb-12">
            <h2 className="text-xl font-bold mb-4" style={{ color: 'var(--color-ink)' }}>Impact & Metrics</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {validMetrics.map((metric, i) => (
                <div
                  key={i}
                  className="p-5 rounded-2xl border"
                  style={{
                    backgroundColor: 'var(--color-paper-2)',
                    borderColor: 'var(--color-border)',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--color-accent)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--color-border)'; }}
                >
                  <div className="text-2xl md:text-3xl font-extrabold mb-1" style={{ color: 'var(--color-accent)' }}>
                    {metric.value}
                  </div>
                  <div className="text-xs font-medium" style={{ color: 'var(--color-ink-muted)' }}>
                    {metric.label}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Problem Statement (if filled) */}
        {isFilled(project.problem) && (
          <section className="mb-12">
            <h2 className="text-xl font-bold mb-3" style={{ color: 'var(--color-ink)' }}>Problem & Context</h2>
            <div className="p-6 rounded-2xl border leading-relaxed" style={{
              backgroundColor: 'var(--color-paper-2)',
              borderColor: 'var(--color-border)',
              color: 'var(--color-ink-muted)',
            }}>
              <p>{project.problem}</p>
            </div>
          </section>
        )}

        {/* My Role & Architecture (if filled) */}
        {isFilled(project.myRole) && (
          <section className="mb-12">
            <h2 className="text-xl font-bold mb-3" style={{ color: 'var(--color-ink)' }}>My Responsibilities & Role</h2>
            <div className="p-6 rounded-2xl border leading-relaxed" style={{
              backgroundColor: 'var(--color-paper-2)',
              borderColor: 'var(--color-border)',
              color: 'var(--color-ink-muted)',
            }}>
              <p>{project.myRole}</p>
            </div>
          </section>
        )}

        {/* Architecture Section */}
        <section className="mb-12">
          <h2 className="text-xl font-bold mb-3" style={{ color: 'var(--color-ink)' }}>System Architecture</h2>
          <div className="p-6 rounded-2xl border" style={{
            backgroundColor: 'var(--color-paper-2)',
            borderColor: 'var(--color-border)',
          }}>
            {project.architectureImage ? (
              <img
                src={project.architectureImage}
                alt={`${project.title} Architecture Diagram`}
                className="w-full rounded-xl object-contain mb-4"
              />
            ) : project.architectureMermaid ? (
              <div className="space-y-4">
                <div className="p-4 rounded-xl font-mono text-xs overflow-x-auto" style={{
                  backgroundColor: 'var(--color-paper-3)',
                  color: 'var(--color-accent)',
                  borderColor: 'var(--color-border)',
                }}>
                  <div className="text-[11px] font-semibold uppercase tracking-wider mb-2" style={{ color: 'var(--color-ink-muted)' }}>
                    Service Flow Diagram
                  </div>
                  <pre className="whitespace-pre">{project.architectureMermaid}</pre>
                </div>
              </div>
            ) : null}
          </div>
        </section>

        {/* Hardest Problem & Technical Solution (if filled) */}
        {isFilled(project.hardestProblem) && (
          <section className="mb-12">
            <h2 className="text-xl font-bold mb-3" style={{ color: 'var(--color-ink)' }}>Hardest Technical Challenge & Solution</h2>
            <div className="p-6 rounded-2xl border leading-relaxed" style={{
              backgroundColor: 'var(--color-paper-2)',
              borderColor: 'var(--color-border)',
              color: 'var(--color-ink-muted)',
            }}>
              <p>{project.hardestProblem}</p>
            </div>
          </section>
        )}

        {/* Tech Stack */}
        <section className="mb-12">
          <h2 className="text-xl font-bold mb-3" style={{ color: 'var(--color-ink)' }}>Technology Stack</h2>
          <div className="flex flex-wrap gap-2">
            {project.stack.map((item, index) => (
              <span
                key={index}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold border"
                style={{
                  backgroundColor: 'var(--color-paper-2)',
                  borderColor: 'var(--color-border)',
                  color: 'var(--color-ink)',
                }}
              >
                <CheckCircle2 className="w-3.5 h-3.5" style={{ color: 'var(--color-accent)' }} />
                {item}
              </span>
            ))}
          </div>
        </section>

        {/* Footer Navigation */}
        <div className="pt-8 border-t flex justify-between items-center" style={{ borderColor: 'var(--color-border)' }}>
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 text-sm font-semibold transition-colors"
            style={{ color: 'var(--color-accent)' }}
            onMouseEnter={(e) => { e.currentTarget.style.color = 'oklch(0.58 0.18 55)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--color-accent)'; }}
          >
            ← View All Projects
          </Link>
          <Link
            to="/experience"
            className="inline-flex items-center gap-2 text-sm font-semibold transition-colors"
            style={{ color: 'var(--color-accent)' }}
            onMouseEnter={(e) => { e.currentTarget.style.color = 'oklch(0.58 0.18 55)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--color-accent)'; }}
          >
            Work Experience →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;