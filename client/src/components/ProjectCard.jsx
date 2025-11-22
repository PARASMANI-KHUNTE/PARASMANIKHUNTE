import React from "react";
import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";
import { ExternalLink, Github, Folder } from "lucide-react";

const ProjectCard = ({ project }) => {
  const { isDarkMode } = useTheme();

  return (
    <motion.div
      whileHover={{ y: -8 }}
      className={`card h-full flex flex-col overflow-hidden group ${isDarkMode ? 'hover:border-gray-600' : 'hover:border-gray-300'
        }`}
    >
      {/* Project Image */}
      <div className="relative h-48 -m-6 mb-6 overflow-hidden rounded-t-xl bg-gradient-to-br from-primary-100 to-accent-100 dark:from-gray-700 dark:to-gray-800">
        {project.image ? (
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Folder className={`w-16 h-16 ${isDarkMode ? 'text-gray-600' : 'text-gray-300'}`} />
          </div>
        )}

        {/* Overlay with Links */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
          {project.liveLink && (
            <motion.a
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              href={project.liveLink}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-white/90 rounded-lg hover:bg-white transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              <ExternalLink className="w-5 h-5 text-gray-900" />
            </motion.a>
          )}
          {project.githubLink && (
            <motion.a
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              href={project.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-white/90 rounded-lg hover:bg-white transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              <Github className="w-5 h-5 text-gray-900" />
            </motion.a>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col">
        <h3 className={`text-xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
          {project.title}
        </h3>

        <p className={`text-sm mb-4 line-clamp-3 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'
          }`}>
          {project.description}
        </p>

        {/* Tech Stack */}
        {project.technologies && project.technologies.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-auto">
            {project.technologies.slice(0, 4).map((tech, index) => (
              <span
                key={index}
                className="badge text-xs"
              >
                {tech}
              </span>
            ))}
            {project.technologies.length > 4 && (
              <span className={`text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                +{project.technologies.length - 4} more
              </span>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default ProjectCard;