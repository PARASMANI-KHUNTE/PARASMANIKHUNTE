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

  return (
    <article
      className={`relative overflow-hidden rounded-2xl border transition-all duration-200 flex flex-col h-full hover:-translate-y-1 ${
        isDarkMode
          ? "bg-gray-800/60 border-gray-700/80 hover:border-amber-500/40 hover:shadow-lg hover:shadow-black/30"
          : "bg-white border-gray-200 hover:border-amber-300 hover:shadow-md"
      }`}
    >
      <div className="p-6 flex-1 flex flex-col">
        {/* Header */}
        <div className="mb-3 flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div
              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
                isDarkMode ? "bg-amber-500/10 text-amber-400" : "bg-amber-50 text-amber-600"
              }`}
            >
              <ProjectIcon className="h-5 w-5" />
            </div>
            <div>
              <h3 className={`text-lg font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                {projectUrl ? (
                  <Link to={projectUrl} className="hover:text-amber-500 transition-colors">
                    {project.title}
                  </Link>
                ) : (
                  project.title
                )}
              </h3>
              {project.category && (
                <span className={`text-xs ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                  {project.category}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* One-Liner / Description */}
        <p className={`text-sm mb-5 leading-relaxed flex-1 ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
          {project.oneLiner || project.description}
        </p>

        {/* Tech Tags */}
        <div className="mb-6 flex flex-wrap gap-1.5" aria-label="Technologies used">
          {techList.slice(0, 6).map((tech, index) => (
            <span
              key={index}
              className={`rounded-md px-2.5 py-1 text-xs font-medium ${
                isDarkMode
                  ? "bg-gray-700/70 text-amber-300"
                  : "bg-amber-50 text-amber-800 border border-amber-100"
              }`}
            >
              {tech}
            </span>
          ))}
          {techList.length > 6 && (
            <span className={`rounded-md px-2 py-1 text-xs ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
              +{techList.length - 6} more
            </span>
          )}
        </div>

        {/* Action Buttons */}
        <div className={`mt-auto pt-4 border-t flex items-center justify-between text-xs ${
          isDarkMode ? "border-gray-700/60" : "border-gray-100"
        }`}>
          {projectUrl ? (
            <Link
              to={projectUrl}
              className={`font-semibold transition-colors ${
                isDarkMode ? "text-amber-400 hover:text-amber-300" : "text-amber-600 hover:text-amber-700"
              }`}
            >
              Case Study →
            </Link>
          ) : (
            <span className="text-gray-400">Project</span>
          )}

          <div className="flex items-center gap-2">
            {project.liveUrl || project.link ? (
              <>
                {onPreview && (
                  <button
                    onClick={() => onPreview({ ...project, link: project.liveUrl || project.link })}
                    className={`px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                      isDarkMode
                        ? "bg-gray-700 text-gray-200 hover:bg-gray-600"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
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
                  className="p-1.5 rounded-lg text-amber-500 hover:text-amber-400 transition-colors"
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
                className={`p-1.5 rounded-lg transition-colors ${
                  isDarkMode ? "text-gray-300 hover:text-white" : "text-gray-600 hover:text-gray-900"
                }`}
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
