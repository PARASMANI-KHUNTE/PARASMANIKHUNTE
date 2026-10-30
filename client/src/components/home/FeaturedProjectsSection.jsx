import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { featuredProjects } from "../../data/projects";
import ProjectCard from "../ProjectCard";
import { useTheme } from "../../context/ThemeContext";

const FeaturedProjectsSection = ({ onPreview }) => {
  const { isDarkMode } = useTheme();

  return (
    <section className="py-14 max-w-5xl mx-auto border-t border-gray-200 dark:border-gray-800">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-amber-500 mb-1 block">
            Selected Work
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Featured Projects & Case Studies
          </h2>
        </div>
        <Link
          to="/projects"
          className={`inline-flex items-center gap-1.5 text-sm font-semibold transition-colors ${
            isDarkMode ? "text-amber-400 hover:text-amber-300" : "text-amber-600 hover:text-amber-700"
          }`}
        >
          <span>View all projects</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {featuredProjects.map((project) => (
          <ProjectCard key={project.slug} project={project} onPreview={onPreview} />
        ))}
      </div>
    </section>
  );
};

export default FeaturedProjectsSection;
