import React from "react";
import { useAnimation, motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useTheme } from "../context/ThemeContext";
import ProjectCard from "../components/ProjectCard";
import { Code, ExternalLink, Github, Layers } from "lucide-react";
import ProjectPreviewModal from "../components/ProjectPreviewModal";
import { useState, useEffect } from "react";
import BackgroundParticles from "../components/common/BackgroundParticles";


export const projects = [
  // 🥇 MyCircle
  {
    title: "MyCircle - Hyperlocal Exchange Platform",
    description: "Web + mobile + backend monorepo for local jobs, services, and goods exchange. Features real-time chat, geospatial discovery, trust scoring, contact-request workflow, Groq AI content moderation, Redis caching + BullMQ queues for push notifications and post lifecycle. JWT/Google OAuth, Cloudinary media uploads.",
    tech: "React 19, React Native, Node.js, MongoDB, Socket.io, Redis, BullMQ, Groq AI",
    link: "https://mycircle-9gm5.onrender.com",
    github: "https://github.com/PARASMANI-KHUNTE/MyCircle",
    year: "2025-2026",
    isLatest: true,
    categories: ["Mobile Apps", "Full Stack"]
  },
  // ⚡ Zuvo - NEW
  {
    title: "Zuvo - Distributed Microservices Platform",
    description: "8-service architecture (API Gateway, Auth, Blog, Media, Interactions, Real-time, Worker, Feed & Search) communicating via Redis Streams. Full OpenTelemetry distributed tracing with Prometheus metrics and Jaeger UI. Circuit breakers, exponential backoff, dead-letter queues, GDPR-compliant audit logging.",
    tech: "Node.js, TypeScript, Redis Streams, MongoDB, OpenTelemetry, Prometheus, Jaeger, Docker",
    link: "",
    github: "https://github.com/PARASMANI-KHUNTE/Zuvo",
    year: "2026",
    categories: ["Full Stack", "Backend"]
  },
  // 🤖 Gravitor - NEW
  {
    title: "Gravitor - Privacy-First Local AI Coding IDE",
    description: "VS Code extension with ghost-text code completions powered entirely by local Ollama LLMs — zero data exfiltration by design. Context-aware intelligence via heuristic AST parsing + cosine similarity search over local codebase embeddings. Sandboxed CLI execution.",
    tech: "VS Code Extension API, TypeScript, Node.js, Ollama, Vector Search, AST Parsing",
    link: "",
    github: "https://github.com/PARASMANI-KHUNTE/Gravitor",
    year: "2026",
    categories: ["AI & Machine Learning"]
  },
  // ⚡ SYNAPSE
  {
    title: "SYNAPSE - Neural Interface AI System",
    description: "Engineered a multi-model AI system with local LLM routing, RAG retrieval, vector search, context-aware response control, real-time streaming, multimodal features, and sandboxed code execution.",
    tech: "MERN, LLMs, RAG, FAISS, WebSockets, Ollama, LangGraph",
    link: "",
    github: "https://github.com/PARASMANI-KHUNTE/LLMContext",
    year: "2026",
    categories: ["AI & Machine Learning"]
  },
  // 📍 NearMe
  {
    title: "NearMe - Location-Based Social Networking",
    description: "Developed privacy-first proximity features including friend requests, live location updates, nearby users, real-time alerts, JWT/OAuth, map discovery, geospatial queries, Redis caching.",
    tech: "TypeScript, Node.js, React Native, MongoDB, Redis, Geospatial Queries",
    link: "",
    github: "https://github.com/PARASMANI-KHUNTE/NearMe",
    year: "2026",
    categories: ["Mobile Apps", "Full Stack"]
  },
  // 💬 Vaani
  {
    title: "Vaani - Real-Time Messaging Platform",
    description: "Built production-style chat workflows for 1-to-1/group messaging, typing indicators, presence, read/delivered states, media/file/voice sharing, reactions, replies, friend requests, group admin controls.",
    tech: "React, Node.js, Express, Socket.io, MongoDB, Cloudinary",
    link: "https://vaani-11o3.onrender.com",
    github: "https://github.com/PARASMANI-KHUNTE/Vaani",
    year: "2026",
    categories: ["Full Stack"]
  },
  // 🎓 CampusCompare
  {
    title: "CampusCompare",
    description: "A full-stack web platform helping students discover, evaluate, and compare colleges. Features advanced search filters, side-by-side comparisons, student reviews, personalized showcase.",
    tech: "React, Node.js, PostgreSQL, Prisma, Cloudinary",
    link: "https://campuscompare-app.onrender.com",
    github: "https://github.com/PARASMANI-KHUNTE/CampusCompare",
    year: "2026",
    isLatest: true,
    categories: ["Full Stack"]
  },
  // 🥈 Modern Developer Portfolio
  {
    title: "Modern Developer Portfolio",
    description: "A premium, high-performance portfolio featuring glassmorphism design, interactive project previews, and advanced UI animations with dark mode support.",
    tech: "React 19, Tailwind CSS, Framer Motion, Lucide React, Vite",
    link: "https://parasmanikhunte.onrender.com/",
    github: "https://github.com/PARASMANI-KHUNTE/PARASMANIKHUNTE",
    year: "2025",
    isLatest: true,
    categories: ["UI/UX & Portfolio"]
  },
  // 🥉 Admin Dashboard
  {
    title: "Admin Dashboard",
    description: "A full-stack web application for managing hotels, vehicles, and regions with CRUD operations. Features secure JWT authentication and modern responsive UI.",
    tech: "React, Node.js, Express, MongoDB, JWT, Tailwind CSS",
    link: "",
    github: "https://github.com/PARASMANI-KHUNTE/Admin-Dashboard",
    year: "2025",
    categories: ["Full Stack"]
  },
  // 🥉 Warehouse Management System
  {
    title: "Warehouse Management System",
    description: "MERN stack application for inventory management, order processing, and warehouse optimization with data visualization and CSV import/export.",
    tech: "React, Vite, Node.js, MongoDB, Recharts, Tailwind CSS",
    link: "",
    github: "https://github.com/PARASMANI-KHUNTE/Warehouse-Management-system",
    year: "2024",
    categories: ["Full Stack"]
  },
  // OrgSync
  {
    title: "OrgSync",
    description: "Organization synchronization and management platform designed to streamline team collaboration and organizational workflows.",
    tech: "JavaScript, Node.js, Express, React, MongoDB",
    link: "",
    github: "https://github.com/PARASMANI-KHUNTE/orgSync",
    year: "2024",
    categories: ["Full Stack"]
  },
  // CafeAutomation
  {
    title: "CafeAutomation",
    description: "Full-stack web application to automate cafe operations including order management, inventory tracking, and customer interactions with real-time updates.",
    tech: "React, Node.js, Express, MongoDB",
    link: "",
    github: "https://github.com/PARASMANI-KHUNTE/CafeAutomation",
    year: "2024",
    categories: ["Full Stack"]
  },
  // Chat Application
  {
    title: "Chat Application",
    description: "Real-time chat application with Google OAuth authentication and modern glassmorphism UI design deployed on Vercel.",
    tech: "React, Node.js, Socket.io, Google OAuth",
    link: "",
    github: "https://github.com/PARASMANI-KHUNTE/ChatApplication",
    year: "2024",
    categories: ["Full Stack"]
  },
  // FaceTrack
  {
    title: "FaceTrack",
    description: "Multi-Branch, Multi-Department Organization Management System with face tracking and recognition capabilities.",
    tech: "React, Redux, Machine Learning, TailwindCSS, Express, MongoDB",
    link: "",
    github: "https://github.com/PARASMANI-KHUNTE/FaceTrack",
    year: "2025",
    categories: ["AI & Machine Learning"]
  },
  // FRAS
  {
    title: "FRAS",
    description: "Facial Recognition Attendance System - Automated attendance tracking using facial recognition for contactless attendance management.",
    tech: "Python, OpenCV, Deep Learning, Flask",
    link: "",
    github: "https://github.com/PARASMANI-KHUNTE/FRAS",
    year: "2024",
    categories: ["AI & Machine Learning"]
  },
  // HRMS
  {
    title: "HRMS",
    description: "Human Resource Management System for managing employee data, attendance, payroll, and organizational hierarchy.",
    tech: "React, Node.js, Express, MongoDB",
    link: "",
    github: "https://github.com/PARASMANI-KHUNTE/HRMS",
    year: "2024",
    categories: ["Full Stack"]
  },
  // Resume Builder
  {
    title: "Resume Builder",
    description: "Intuitive resume builder application that helps users create professional resumes with customizable templates.",
    tech: "React, JavaScript, CSS",
    link: "",
    github: "https://github.com/PARASMANI-KHUNTE/Resume-Builder",
    year: "2024",
    categories: ["Full Stack"]
  }
];

const Projects = () => {
  const { isDarkMode } = useTheme();
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", "Full Stack", "Backend", "AI & Machine Learning", "Mobile Apps", "UI/UX & Portfolio"];

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

  // Filtering Logic
  const filteredProjects = selectedCategory === "All" 
    ? projects 
    : projects.filter(project => project.categories.includes(selectedCategory));

  // Pagination Logic
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 6;
  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = filteredProjects.slice(indexOfFirstProject, indexOfLastProject);
  const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
    controls.start("hidden").then(() => controls.start("visible"));
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory]);

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);



  return (
    <section
      className={`min-h-screen relative py-20 px-6 overflow-hidden transition-all duration-500 ${
        isDarkMode
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
            className={`mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full ${
              isDarkMode ? "bg-gray-800" : "bg-white shadow-md"
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
            A collection of my recent work, spanning from web applications to distributed systems and AI/ML solutions.
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                selectedCategory === category
                  ? isDarkMode
                    ? "bg-amber-400 text-gray-900 shadow-lg shadow-amber-900/20"
                    : "bg-amber-500 text-white shadow-lg shadow-amber-200/50"
                  : isDarkMode
                  ? "bg-gray-800/50 text-gray-400 hover:bg-gray-700 hover:text-amber-400 border border-gray-700/50"
                  : "bg-white text-gray-500 hover:bg-amber-50 hover:text-amber-600 border border-gray-100 shadow-sm"
              }`}
            >
              {category}
              <span className={`ml-2 text-xs opacity-60`}>
                ({category === "All" ? projects.length : projects.filter(p => p.categories.includes(category)).length})
              </span>
            </button>
          ))}
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