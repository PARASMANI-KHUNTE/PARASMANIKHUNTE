import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";
import ProjectCard from "../components/ProjectCard";
import EmptyState from "../components/ui/EmptyState";
import { Code2, FolderOpen, Github, ExternalLink } from "lucide-react";
import { getProjects } from "../services/api";

const Projects = () => {
  const { isDarkMode } = useTheme();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const { data } = await getProjects();
        setProjects(data);
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  return (
    <div className="space-y-12">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-4"
      >
        <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 mb-4">
          <Code2 size={32} />
        </div>

        <h1 className="text-4xl md:text-5xl font-bold">
          Featured <span className="text-gradient">Projects</span>
        </h1>

        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          A showcase of my recent work, demonstrating creativity, technical expertise, and problem-solving skills.
        </p>
      </motion.div>

      {/* Loading State */}
      {loading && (
        <div className="flex justify-center items-center py-20">
          <div className="spinner"></div>
        </div>
      )}

      {/* Empty State */}
      {!loading && projects.length === 0 && (
        <EmptyState
          icon={FolderOpen}
          title="No Projects Yet"
          description="Projects will be showcased here soon. Stay tuned!"
          showAction={false}
        />
      )}

      {/* Projects Grid */}
      {!loading && projects.length > 0 && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {projects.map((project, index) => (
              <motion.div
                key={project._id || index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </motion.div>

          {/* View More */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-center pt-8"
          >
            <a
              href="https://github.com/PARASMANI-KHUNTE"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary"
            >
              <Github className="w-5 h-5" />
              <span>View More on GitHub</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </motion.div>
        </>
      )}
    </div>
  );
};

export default Projects;