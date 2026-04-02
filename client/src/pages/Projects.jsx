import React from "react";
import { useAnimation, motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useTheme } from "../context/ThemeContext";
import ProjectCard from "../components/ProjectCard";
import { Code, ExternalLink, Github, Layers } from "lucide-react";
import ProjectPreviewModal from "../components/ProjectPreviewModal";
import { useState, useEffect } from "react";
import BackgroundParticles from "../components/common/BackgroundParticles";


const projects = [
  // 🚀 LinkUp
  {
    title: "LinkUp",
    description: "A premium, full-stack real-time communication platform featuring 1-to-1 and group messaging, media sharing, and social relationship management. Built with a modular monorepo architecture and real-time Socket.io integration.",
    tech: "React 19, TypeScript, Vite, Tailwind CSS, Zustand, Socket.io, Node.js, Express, MongoDB, Cloudinary",
    link: "https://vaani-11o3.onrender.com",
    github: "https://github.com/PARASMANI-KHUNTE/Vaani",
    year: "2026",
    isLatest: true
  },
  // 🏆 EliteBoards
  {
    title: "EliteBoards",
    description: "A high-performance, real-time leaderboard platform designed for students and educational cohorts. It features a premium glassmorphic UI, real-time socket updates, and robust handling of student rankings including tie-breaking logic.",
    tech: "React, Vite, React Native, Expo, Node.js, Express, Socket.io, MongoDB",
    link: "https://leaderboard-xgi1.onrender.com/",
    github: "https://github.com/PARASMANI-KHUNTE/Leaderboard",
    year: "2026",
    isLatest: true
  },
  // ⚡ SYNAPSE
  {
    title: "SYNAPSE - Neural Interface AI",
    description: "A local-first AI ecosystem featuring a glassmorphic interface, dynamic neural routing across multiple LLMs (Qwen2.5, DeepSeek, Llama), local RAG memory (FAISS), and dual multi-modal hubs.",
    tech: "React, Vite, Tailwind CSS, Node.js, Express, Python, Socket.io, Ollama, FAISS",
    link: "",
    github: "https://github.com/PARASMANI-KHUNTE/LLMContext",
    year: "2026"
  },
  // 🧠 Kimiko AI
  {
    title: "Kimiko AI",
    description: "A local-first, privacy-centric AI agent with multimodal vision, a three-tier cognitive memory system (Redis, Qdrant, PostgreSQL), and OS-level automation for proactive intelligence.",
    tech: "LangGraph, Ollama, FastAPI, Celery, Redis, PostgreSQL, Electron",
    link: "",
    github: "https://github.com/PARASMANI-KHUNTE/Kimiko",
    year: "2026"
  },
  // 👁️ EyesforAi
  {
    title: "EyesforAi - Vision AI Assistant",
    description: "A continuous, voice-controlled vision assistant that captures images from an ESP32-CAM and processes them with Ollama's Llava model for vivid audio descriptions. Features contextual memory and text-to-speech feedback.",
    tech: "Python, Ollama, Llava, ESP32",
    link: "",
    github: "https://github.com/PARASMANI-KHUNTE/EyesforAi",
    year: "2026"
  },
  // 🥇 TOP PROJECT - MyCircle
  {
    title: "MyCircle",
    description: "A hyperlocal exchange platform for neighbors to post and discover jobs, services, and items for sale/rent. Features real-time chat, AI moderation, trust system, and interactive map view.",
    tech: "React Native, React 19, Node.js, MongoDB, Socket.io, Gemini AI",
    link: "https://mycircle-9gm5.onrender.com",
    github: "https://github.com/PARASMANI-KHUNTE/MyCircle",
    year: "2025"
  },
  // 🥈 Modern Developer Portfolio
  {
    title: "Modern Developer Portfolio",
    description: "A premium, high-performance portfolio featuring glassmorphism design, interactive project previews, and advanced UI animations with dark mode support.",
    tech: "React 19, Tailwind CSS, Framer Motion, Lucide React, Vite",
    link: "https://parasmanikhunte.onrender.com/",
    github: "https://github.com/PARASMANI-KHUNTE/PARASMANIKHUNTE",
    year: "2025",
    isLatest: true
  },
  // 🥉 Admin Dashboard
  {
    title: "Admin Dashboard",
    description: "A full-stack web application for managing hotels, vehicles, and regions with CRUD operations. Features secure JWT authentication and modern responsive UI.",
    tech: "React, Node.js, Express, MongoDB, JWT, Tailwind CSS",
    link: "",
    github: "https://github.com/PARASMANI-KHUNTE/Admin-Dashboard",
    year: "2025"
  },
  // 🥉 Warehouse Management System
  {
    title: "Warehouse Management System",
    description: "MERN stack application for inventory management, order processing, and warehouse optimization with data visualization and CSV import/export.",
    tech: "React, Vite, Node.js, MongoDB, Recharts, Tailwind CSS",
    link: "",
    github: "https://github.com/PARASMANI-KHUNTE/Warehouse-Management-system",
    year: "2024"
  },
  // OrgSync
  {
    title: "OrgSync",
    description: "Organization synchronization and management platform designed to streamline team collaboration and organizational workflows.",
    tech: "JavaScript, Node.js, Express, React, MongoDB",
    link: "",
    github: "https://github.com/PARASMANI-KHUNTE/orgSync",
    year: "2024"
  },
  // CafeAutomation
  {
    title: "CafeAutomation",
    description: "Full-stack web application to automate cafe operations including order management, inventory tracking, and customer interactions with real-time updates.",
    tech: "React, Node.js, Express, MongoDB",
    link: "",
    github: "https://github.com/PARASMANI-KHUNTE/CafeAutomation",
    year: "2024"
  },
  // Chat Application
  {
    title: "Chat Application",
    description: "Real-time chat application with Google OAuth authentication and modern glassmorphism UI design deployed on Vercel.",
    tech: "React, Node.js, Socket.io, Google OAuth",
    link: "",
    github: "https://github.com/PARASMANI-KHUNTE/ChatApplication",
    year: "2024"
  },
  // FaceTrack
  {
    title: "FaceTrack",
    description: "Multi-Branch, Multi-Department Organization Management System with face tracking and recognition capabilities.",
    tech: "React, Redux, Machine Learning, TailwindCSS, Express, MongoDB",
    link: "",
    github: "https://github.com/PARASMANI-KHUNTE/FaceTrack",
    year: "2025"
  },
  // FRAS
  {
    title: "FRAS",
    description: "Facial Recognition Attendance System - Automated attendance tracking using facial recognition for contactless attendance management.",
    tech: "Python, OpenCV, Deep Learning, Flask",
    link: "",
    github: "https://github.com/PARASMANI-KHUNTE/FRAS",
    year: "2024"
  },
  // HRMS
  {
    title: "HRMS",
    description: "Human Resource Management System for managing employee data, attendance, payroll, and organizational hierarchy.",
    tech: "React, Node.js, Express, MongoDB",
    link: "",
    github: "https://github.com/PARASMANI-KHUNTE/HRMS",
    year: "2024"
  },
  // Resume Builder
  {
    title: "Resume Builder",
    description: "Intuitive resume builder application that helps users create professional resumes with customizable templates.",
    tech: "React, JavaScript, CSS",
    link: "",
    github: "https://github.com/PARASMANI-KHUNTE/Resume-Builder",
    year: "2024"
  }
];

const Projects = () => {
  const { isDarkMode } = useTheme();
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  const handleOpenPreview = (project) => {
    setSelectedProject(project);
    setIsPreviewModalOpen(true);
  };

  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  // Pagination Logic
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 6;
  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = projects.slice(indexOfFirstProject, indexOfLastProject);
  const totalPages = Math.ceil(projects.length / projectsPerPage);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    controls.start("hidden").then(() => controls.start("visible"));
  };

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);



  return (
    <section
      className={`min-h-screen relative py-20 px-6 overflow-hidden transition-all duration-500 ${isDarkMode
        ? "bg-gradient-to-br from-gray-900 to-gray-800 text-white"
        : "bg-gradient-to-br from-white to-gray-50 text-gray-800"
        }`}
    >
      <BackgroundParticles count={15} />

      <div className="container mx-auto max-w-6xl relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 100, delay: 0.2 }}
            className={`mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full ${isDarkMode ? "bg-gray-800" : "bg-white shadow-md"
              }`}
          >
            <Code className={`h-8 w-8 ${isDarkMode ? "text-amber-400" : "text-amber-500"}`} />
          </motion.div>

          <h2 className={`text-4xl md:text-5xl font-bold ${isDarkMode ? "text-white" : "text-gray-800"}`}>
            Featured Projects
          </h2>

          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "80px" }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className={`h-1 mx-auto mt-4 mb-6 rounded-full ${isDarkMode ? "bg-amber-400" : "bg-amber-500"}`}
          />

          <p className={`text-lg max-w-2xl mx-auto ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
            A collection of my recent work, spanning from web applications to design systems.
          </p>
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 overflow-visible"
        >
          {currentProjects.map((project, index) => (
            <ProjectCard
              key={index + indexOfFirstProject}
              project={project}
              onPreview={handleOpenPreview}
            />
          ))}
        </motion.div>

        {/* Project Preview Modal */}
        <React.Suspense fallback={null}>
          <ProjectPreviewModal
            isOpen={isPreviewModalOpen}
            onClose={() => setIsPreviewModalOpen(false)}
            project={selectedProject}
            isDarkMode={isDarkMode}
          />
        </React.Suspense>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="flex justify-center items-center mt-12 space-x-2"
          >
            <button
              onClick={() => paginate(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className={`p-2 rounded-full transition-all ${
                currentPage === 1
                  ? "opacity-30 cursor-not-allowed"
                  : isDarkMode
                  ? "hover:bg-gray-800 text-amber-400"
                  : "hover:bg-amber-100 text-amber-600"
              }`}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            </button>

            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => paginate(i + 1)}
                className={`w-10 h-10 rounded-full font-bold transition-all ${
                  currentPage === i + 1
                    ? isDarkMode
                      ? "bg-amber-400 text-gray-900 shadow-lg shadow-amber-900/20"
                      : "bg-amber-500 text-white shadow-lg shadow-amber-200/50"
                    : isDarkMode
                    ? "bg-gray-800/50 text-gray-400 hover:bg-gray-700 hover:text-amber-400"
                    : "bg-white text-gray-500 hover:bg-amber-50 hover:text-amber-600 shadow-sm"
                }`}
              >
                {i + 1}
              </button>
            ))}

            <button
              onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className={`p-2 rounded-full transition-all ${
                currentPage === totalPages
                  ? "opacity-30 cursor-not-allowed"
                  : isDarkMode
                  ? "hover:bg-gray-800 text-amber-400"
                  : "hover:bg-amber-100 text-amber-600"
              }`}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </button>
          </motion.div>
        )}

      </div>
    </section>
  );
};

export default Projects;