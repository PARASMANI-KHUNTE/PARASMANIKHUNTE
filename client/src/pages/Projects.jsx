import React, { useState } from "react";
import { featuredProjects, moreProjects } from "../data/projects";
import ProjectCard from "../components/ProjectCard";
import ProjectPreviewModal from "../components/ProjectPreviewModal";
import { useTheme } from "../context/ThemeContext";

const Projects = () => {
  const { isDarkMode } = useTheme();
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  const handleOpenPreview = (project) => {
    setSelectedProject(project);
    setIsPreviewModalOpen(true);
  };

  return (
    <div
      className={`min-h-screen py-24 px-6 transition-colors duration-200 ${
        isDarkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"
      }`}
    >
      <div className="container mx-auto max-w-5xl space-y-16">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-semibold uppercase tracking-wider text-amber-500 mb-2 block">
            Portfolio
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-4">
            Projects & Case Studies
          </h1>
          <p className={`text-base sm:text-lg leading-relaxed ${
            isDarkMode ? "text-gray-300" : "text-gray-600"
          }`}>
            Architecture case studies, event-driven backends, and full-stack software applications.
          </p>
        </div>

        {/* 1. Featured Projects with Case Studies */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
                Featured Case Studies
              </h2>
              <p className={`text-xs sm:text-sm ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                Deep-dive architectural implementations with system diagrams
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {featuredProjects.map((project) => (
              <ProjectCard
                key={project.slug}
                project={project}
                onPreview={handleOpenPreview}
              />
            ))}
          </div>
        </section>

        {/* 2. More Projects */}
        <section className="pt-10 border-t border-gray-200 dark:border-gray-800">
          <div className="mb-6">
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight mb-1">
              More Projects
            </h2>
            <p className={`text-xs sm:text-sm ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
              Prototypes, utilities, and applications with available source code or deployments
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {moreProjects.map((project) => (
              <ProjectCard
                key={project.slug}
                project={project}
                onPreview={handleOpenPreview}
              />
            ))}
          </div>
        </section>
      </div>

      {/* Preview Modal */}
      <ProjectPreviewModal
        isOpen={isPreviewModalOpen}
        onClose={() => setIsPreviewModalOpen(false)}
        project={selectedProject}
        isDarkMode={isDarkMode}
      />
    </div>
  );
};

export default Projects;
