import React from "react";
import { motion } from "framer-motion";
import { ExternalLink, Github, Code, Layers } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

const ProjectCard = ({ project, onPreview }) => {
  const { isDarkMode } = useTheme();

  // Determine icon based on project type or technologies
  const getProjectIcon = (tech) => {
    if (tech.toLowerCase().includes("react")) return Layers;
    return Code;
  };

  const ProjectIcon = getProjectIcon(project.tech);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 100, damping: 15 }}
      className={`group relative overflow-hidden rounded-xl h-full flex flex-col ${isDarkMode
          ? "bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700"
          : "bg-gradient-to-br from-white to-gray-50 border border-gray-100 shadow-lg"
        } ${project.isLatest ? (isDarkMode ? "shadow-emerald-900/20 ring-1 ring-emerald-500/30" : "shadow-emerald-200/50 ring-1 ring-emerald-500/20") : ""}`}
    >
      {/* Latest Badge */}
      {project.isLatest && (
        <div className="absolute top-0 right-0 z-20">
          <div className="bg-emerald-500 text-white text-[10px] font-bold px-3 py-1 rounded-bl-xl shadow-lg flex items-center gap-1 uppercase tracking-wider">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
            </span>
            Latest
          </div>
        </div>
      )}

      {/* Accent color gradient overlay */}
      <div className="absolute overflow-hidden pointer-events-none inset-0 bg-gradient-to-br from-amber-500 to-amber-600 opacity-0 transition-opacity duration-300 group-hover:opacity-10"></div>

      {/* Card content */}
      <div className="p-6 flex-1 flex flex-col">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${isDarkMode ? "bg-gray-700" : "bg-amber-500/10"
              }`}>
              <ProjectIcon className={`h-5 w-5 ${isDarkMode ? "text-amber-400" : "text-amber-500"}`} />
            </div>
            <h3 className={`text-xl font-bold ${isDarkMode ? "text-white" : "text-gray-800"}`}>
              {project.title}
            </h3>
          </div>

          {/* Preview Pulse (only if there's a link) */}
          {project.link && (
            <div className="flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </div>
          )}
        </div>

        <p className={`mb-4 flex-1 ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
          {project.description}
        </p>

        {/* Tech tags */}
        <div className="mb-6 flex flex-wrap gap-2">
          {project.tech.split(", ").map((tech, index) => (
            <span
              key={index}
              className={`rounded-full px-3 py-1 text-xs font-medium ${isDarkMode
                ? "bg-gray-700 text-amber-400"
                : "bg-amber-100 text-amber-800"
                }`}
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Action buttons */}
        <div className="mt-auto flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-800">
          <div className="text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">
            {project.year || "Featured"}
          </div>

          <div className="flex items-center gap-2">
            {project.link && (
              <motion.button
                onClick={() => onPreview && onPreview(project)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className={`flex h-8 w-8 items-center justify-center rounded-full ${isDarkMode
                  ? "bg-amber-500/20 text-amber-400 hover:bg-amber-500/30"
                  : "bg-amber-100 text-amber-600 hover:bg-amber-200"
                  } transition-colors`}
                title="Preview Live"
              >
                <Layers className="h-4 w-4" />
              </motion.button>
            )}

            {project.github && (
              <motion.a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className={`flex h-8 w-8 items-center justify-center rounded-full ${isDarkMode
                  ? "bg-gray-700 text-white hover:bg-gray-600"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  } transition-colors`}
                title="GitHub Code"
              >
                <Github className="h-4 w-4" />
              </motion.a>
            )}

            {project.link && (
              <motion.a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className={`flex h-8 w-8 items-center justify-center rounded-full ${isDarkMode
                  ? "bg-amber-500 text-white hover:bg-amber-600"
                  : "bg-amber-500 text-white hover:bg-amber-600"
                  } transition-colors`}
                title="Open Live Site"
              >
                <ExternalLink className="h-4 w-4" />
              </motion.a>
            )}
          </div>
        </div>
      </div>

      {/* Bottom accent bar */}
      <motion.div
        initial={{ width: "0%" }}
        whileHover={{ width: "100%" }}
        transition={{ duration: 0.3 }}
        className="absolute bottom-0 left-0 h-1 bg-amber-500"
      ></motion.div>
    </motion.div>
  );
};

export default ProjectCard;