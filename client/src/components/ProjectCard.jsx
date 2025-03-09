import React from "react";
import { motion } from "framer-motion";
import { ExternalLink, Github, Code, Layers } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

const ProjectCard = ({ project }) => {
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
      className={`group relative overflow-hidden rounded-xl ${
        isDarkMode
          ? "bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700"
          : "bg-gradient-to-br from-white to-gray-50 border border-gray-100 shadow-lg"
      }`}
    >
      {/* Accent color gradient overlay */}
      <div className="absolute overflow-hidden pointer-events-none inset-0 bg-gradient-to-br from-amber-500 to-amber-600 opacity-0 transition-opacity duration-300 group-hover:opacity-10"></div>
      
      {/* Card content */}
      <div className="p-6">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${
              isDarkMode ? "bg-gray-700" : "bg-amber-500/10"
            }`}>
              <ProjectIcon className={`h-5 w-5 ${isDarkMode ? "text-amber-400" : "text-amber-500"}`} />
            </div>
            <h3 className={`text-xl font-bold ${isDarkMode ? "text-white" : "text-gray-800"}`}>
              {project.title}
            </h3>
          </div>
        </div>
        
        <p className={`mb-4 ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
          {project.description}
        </p>
        
        {/* Tech tags */}
        <div className="mb-6 flex flex-wrap gap-2">
          {project.tech.split(", ").map((tech, index) => (
            <span
              key={index}
              className={`rounded-full px-3 py-1 text-xs font-medium ${
                isDarkMode
                  ? "bg-gray-700 text-amber-400"
                  : "bg-amber-100 text-amber-800"
              }`}
            >
              {tech}
            </span>
          ))}
        </div>
        
        {/* Action buttons */}
        <div className="mt-auto flex items-center justify-between">
          <div className="text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">
            {project.year || "Featured Project"}
          </div>
          
          <div className="flex space-x-2">
            {project.github && (
             <motion.a
             href={project.github}
             target="_blank"
             rel="noopener noreferrer"
             whileHover={{ scale: 1.1 }}
             whileTap={{ scale: 0.9 }}
             className={`pointer-events-auto flex h-8 w-8 items-center justify-center rounded-full ${
               isDarkMode
                 ? "bg-gray-700 text-white hover:bg-gray-600"
                 : "bg-gray-100 text-gray-700 hover:bg-gray-200"
             } transition-colors`}
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
                className={`flex h-8 w-8 items-center justify-center rounded-full ${
                  isDarkMode
                    ? "bg-amber-500 text-white hover:bg-amber-600"
                    : "bg-amber-500 text-white hover:bg-amber-600"
                } transition-colors`}
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