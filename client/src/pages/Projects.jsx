import React, { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useTheme } from "../context/ThemeContext";
import ProjectCard from "../components/ProjectCard";
import { Code, ArrowRight } from "lucide-react";

const projects = [
  // 🥇 TOP PROJECT - MyCircle
  {
    title: "MyCircle",
    description: "A hyperlocal exchange platform for neighbors to post and discover jobs, services, and items for sale/rent. Features real-time chat, AI moderation, trust system, and interactive map view.",
    tech: "React Native, React 19, Node.js, MongoDB, Socket.io, Gemini AI",
    link: "https://mycircle-71hh.onrender.com",
    github: "https://github.com/PARASMANI-KHUNTE/MyCircle",
    year: "2025"
  },
  // 🥈 Admin Dashboard
  {
    title: "Admin Dashboard",
    description: "A full-stack web application for managing hotels, vehicles, and regions with CRUD operations. Features secure JWT authentication and modern responsive UI.",
    tech: "React, Node.js, Express, MongoDB, JWT, Tailwind CSS",
    link: "https://admin-dashboard-js6u.onrender.com/",
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
    link: "https://chat-application-snowy-eight.vercel.app",
    github: "https://github.com/PARASMANI-KHUNTE/ChatApplication",
    year: "2024"
  },
  // FaceTrack
  {
    title: "FaceTrack",
    description: "Multi-Branch, Multi-Department Organization Management System with face tracking and recognition capabilities.",
    tech: "React, Redux, Machine Learning, TailwindCSS, Express, MongoDB",
    link: "https://facetrack-0s10.onrender.com",
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
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  return (
    <section
      className={`min-h-screen relative py-20 px-6 overflow-hidden transition-all duration-500 ${isDarkMode
        ? "bg-gradient-to-br from-gray-900 to-gray-800 text-white"
        : "bg-gradient-to-br from-white to-gray-50 text-gray-800"
        }`}
    >
      {/* Animated background shapes */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute rounded-full blur-3xl opacity-10 ${isDarkMode ? "bg-amber-600" : "bg-amber-400"
              }`}
            style={{
              width: `${Math.random() * 20 + 10}rem`,
              height: `${Math.random() * 20 + 10}rem`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              zIndex: 0
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{
              scale: 1,
              opacity: isDarkMode ? 0.1 : 0.15,
              x: [0, Math.random() * 20 - 10],
              y: [0, Math.random() * 20 - 10],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              repeatType: "reverse",
              delay: i * 0.3
            }}
          />
        ))}
      </div>

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
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} />
          ))}
        </motion.div>

        {/* View More Projects Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="flex justify-center mt-12"
        >
          <motion.a
            href="https://github.com/PARASMANI-KHUNTE"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`group flex items-center gap-2 rounded-full px-6 py-3 font-medium transition-all ${isDarkMode
              ? "bg-gray-800 text-white hover:bg-gray-700"
              : "bg-white text-gray-800 shadow-md hover:shadow-lg"
              }`}
          >
            View All Projects
            <motion.span
              animate={{ x: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              <ArrowRight className={`h-4 w-4 ${isDarkMode ? "text-amber-400" : "text-amber-500"}`} />
            </motion.span>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;