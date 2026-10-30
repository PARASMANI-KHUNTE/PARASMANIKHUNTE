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
      className="min-h-screen py-24 px-6"
      style={{
        backgroundColor: 'var(--color-paper)',
        color: 'var(--color-ink)',
      }}
    >
      <div className="container mx-auto max-w-6xl space-y-16 px-4">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-semibold uppercase tracking-wider mb-2 block" style={{ color: 'var(--color-accent)' }}>
            Portfolio
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-4" style={{ color: 'var(--color-ink)' }}>
            Projects & Case Studies
          </h1>
          <p className="text-base sm:text-lg leading-relaxed" style={{ color: 'var(--color-ink-muted)' }}>
            Architecture case studies, event-driven backends, and full-stack software applications.
          </p>
        </div>

        {/* 1. Featured Projects with Case Studies */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight" style={{ color: 'var(--color-ink)' }}>
                Featured Case Studies
              </h2>
              <p className="text-xs sm:text-sm" style={{ color: 'var(--color-ink-muted)' }}>
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
        <section className="pt-10 border-t" style={{ borderColor: 'var(--color-border)' }}>
          <div className="mb-6">
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight mb-1" style={{ color: 'var(--color-ink)' }}>
              More Projects
            </h2>
            <p className="text-xs sm:text-sm" style={{ color: 'var(--color-ink-muted)' }}>
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