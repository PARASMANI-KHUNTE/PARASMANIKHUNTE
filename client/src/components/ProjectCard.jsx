import React from "react";
import { ExternalLink, Github, Code } from "lucide-react";
import GlassCard from "./ui/GlassCard";

const ProjectCard = ({ project, onClick }) => {
  return (
    <GlassCard
      onClick={onClick}
      className="!p-0 overflow-hidden h-full flex flex-col group cursor-pointer hover:border-indigo-500/50 transition-all duration-300"
    >
      <div className="relative h-48 overflow-hidden">
        {project.image ? (
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-full bg-gray-900 flex items-center justify-center">
            <Code className="text-gray-700 h-12 w-12" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/20 to-transparent" />
      </div>

      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-bold mb-2 text-white group-hover:text-indigo-400 transition-colors">
          {project.title}
        </h3>

        <div className="flex flex-wrap gap-2 mb-4">
          {project.tech && project.tech.split(',').slice(0, 3).map((tech, i) => (
            <span key={i} className="text-xs font-medium px-2.5 py-1 rounded bg-white/5 text-indigo-300 border border-indigo-500/20">
              {tech.trim()}
            </span>
          ))}
        </div>

        <p className="text-gray-400 text-sm mb-6 line-clamp-3">
          {project.description}
        </p>

        <div className="mt-auto flex gap-4 pt-4 border-t border-white/5">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
            >
              <Github size={16} /> Code
            </a>
          )}
          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-indigo-400 hover:text-indigo-300 transition-colors ml-auto"
            >
              Live Demo <ExternalLink size={16} />
            </a>
          )}
        </div>
      </div>
    </GlassCard>
  );
};

export default ProjectCard;