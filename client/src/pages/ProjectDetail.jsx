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
      <div className={`min-h-[70vh] flex flex-col items-center justify-center p-6 text-center ${
        isDarkMode ? "text-white" : "text-gray-900"
      }`}>
        <h1 className="text-3xl font-bold mb-4">Project Not Found</h1>
        <p className={`mb-6 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
          The project you are looking for does not exist or has been moved.
        </p>
        <Link
          to="/projects"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 text-white font-medium hover:bg-amber-600 transition-colors"
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
    <div className={`min-h-screen py-24 px-6 transition-colors duration-200 ${
      isDarkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"
    }`}>
      <div className="container mx-auto max-w-4xl">
        {/* Navigation Breadcrumb */}
        <div className="mb-8">
          <Link
            to="/projects"
            className={`inline-flex items-center gap-2 text-sm font-medium transition-colors ${
              isDarkMode ? "text-amber-400 hover:text-amber-300" : "text-amber-600 hover:text-amber-700"
            }`}
          >
            <ArrowLeft className="w-4 h-4" />
            Back to All Projects
          </Link>
        </div>

        {/* Case Study Header */}
        <header className="mb-10 pb-8 border-b border-gray-200 dark:border-gray-800">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className={`text-xs font-semibold px-3 py-1 rounded-full ${
              isDarkMode ? "bg-amber-500/10 text-amber-400 border border-amber-500/20" : "bg-amber-50 text-amber-700 border border-amber-200"
            }`}>
              {project.category || "Case Study"}
            </span>
            {project.featured && (
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                Featured Case Study
              </span>
            )}
          </div>

          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4">
            {project.title}
          </h1>

          <p className={`text-lg md:text-xl leading-relaxed mb-6 ${
            isDarkMode ? "text-gray-300" : "text-gray-700"
          }`}>
            {project.oneLiner}
          </p>

          {/* Links Bar */}
          <div className="flex flex-wrap gap-3">
            {isFilled(project.liveUrl) && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-medium text-sm transition-colors shadow-sm"
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
                className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border text-sm font-medium transition-colors ${
                  isDarkMode
                    ? "bg-gray-800 border-gray-700 text-white hover:bg-gray-700"
                    : "bg-white border-gray-300 text-gray-800 hover:bg-gray-50"
                }`}
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
                className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border text-sm font-medium transition-colors ${
                  isDarkMode
                    ? "bg-gray-800 border-gray-700 text-white hover:bg-gray-700"
                    : "bg-white border-gray-300 text-gray-800 hover:bg-gray-50"
                }`}
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
            <h2 className="text-xl font-bold mb-4">Impact & Metrics</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {validMetrics.map((metric, i) => (
                <div
                  key={i}
                  className={`p-5 rounded-2xl border ${
                    isDarkMode ? "bg-gray-800/60 border-gray-700" : "bg-white border-gray-200"
                  }`}
                >
                  <div className="text-2xl md:text-3xl font-extrabold text-amber-500 mb-1">
                    {metric.value}
                  </div>
                  <div className={`text-xs font-medium ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
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
            <h2 className="text-xl font-bold mb-3">Problem & Context</h2>
            <div className={`p-6 rounded-2xl border leading-relaxed ${
              isDarkMode ? "bg-gray-800/40 border-gray-800 text-gray-300" : "bg-white border-gray-200 text-gray-700"
            }`}>
              <p>{project.problem}</p>
            </div>
          </section>
        )}

        {/* My Role & Architecture (if filled) */}
        {isFilled(project.myRole) && (
          <section className="mb-12">
            <h2 className="text-xl font-bold mb-3">My Responsibilities & Role</h2>
            <div className={`p-6 rounded-2xl border leading-relaxed ${
              isDarkMode ? "bg-gray-800/40 border-gray-800 text-gray-300" : "bg-white border-gray-200 text-gray-700"
            }`}>
              <p>{project.myRole}</p>
            </div>
          </section>
        )}

        {/* Architecture Section */}
        <section className="mb-12">
          <h2 className="text-xl font-bold mb-3">System Architecture</h2>
          <div className={`p-6 rounded-2xl border ${
            isDarkMode ? "bg-gray-800/40 border-gray-800" : "bg-white border-gray-200"
          }`}>
            {project.architectureImage ? (
              <img
                src={project.architectureImage}
                alt={`${project.title} Architecture Diagram`}
                className="w-full rounded-xl object-contain mb-4"
              />
            ) : project.architectureMermaid ? (
              <div className="space-y-4">
                <div className={`p-4 rounded-xl font-mono text-xs overflow-x-auto ${
                  isDarkMode ? "bg-gray-950 text-amber-300 border border-gray-800" : "bg-gray-100 text-gray-800 border border-gray-200"
                }`}>
                  <div className="text-[11px] font-semibold uppercase tracking-wider text-gray-400 mb-2">
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
            <h2 className="text-xl font-bold mb-3">Hardest Technical Challenge & Solution</h2>
            <div className={`p-6 rounded-2xl border leading-relaxed ${
              isDarkMode ? "bg-gray-800/40 border-gray-800 text-gray-300" : "bg-white border-gray-200 text-gray-700"
            }`}>
              <p>{project.hardestProblem}</p>
            </div>
          </section>
        )}

        {/* Tech Stack */}
        <section className="mb-12">
          <h2 className="text-xl font-bold mb-3">Technology Stack</h2>
          <div className="flex flex-wrap gap-2">
            {project.stack.map((item, index) => (
              <span
                key={index}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold border ${
                  isDarkMode
                    ? "bg-gray-800 text-amber-300 border-gray-700"
                    : "bg-white text-gray-800 border-gray-200 shadow-sm"
                }`}
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-500" />
                {item}
              </span>
            ))}
          </div>
        </section>

        {/* Footer Navigation */}
        <div className="pt-8 border-t border-gray-200 dark:border-gray-800 flex justify-between items-center">
          <Link
            to="/projects"
            className={`inline-flex items-center gap-2 text-sm font-semibold transition-colors ${
              isDarkMode ? "text-amber-400 hover:text-amber-300" : "text-amber-600 hover:text-amber-700"
            }`}
          >
            ← View All Projects
          </Link>
          <Link
            to="/experience"
            className={`inline-flex items-center gap-2 text-sm font-semibold transition-colors ${
              isDarkMode ? "text-amber-400 hover:text-amber-300" : "text-amber-600 hover:text-amber-700"
            }`}
          >
            Work Experience →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
