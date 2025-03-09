import React, { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useTheme } from "../context/ThemeContext";
import ProjectCard from "../components/ProjectCard";
import { Code, ArrowRight } from "lucide-react";

const projects = [
  {
    title: "PhotoShare",
    description: "A social media platform for photographers to share their work and connect with other creatives.",
    tech: "React, Node.js, MongoDB, Tailwind CSS, Firebase",
    link: "https://photoshare-ctj3.onrender.com/",
    github: "https://github.com/username/photoshare",
    year: "2023"
  },
  {
    title: "FaceTrack",
    description: "Multi-Branch, Multi-Department Organization Management System",
    tech: "React, Redux, Machine learning, TailwindCSS, Express , Mongodb", 
    link: "https://facetrack-0s10.onrender.com",
    github: "https://github.com/PARASMANI-KHUNTE/FaceTrack",
    year: "2025"
  },
  {
    title: "Hotel Management System",
    description: "A comprehensive admin panel for managing hotel bookings, guest check-ins and check-outs, room availability, and analytics for hotel operations.",
    tech: "Mern, MongoDB, Tailwind CSS",
    link: "https://admin-dashboard-js6u.onrender.com/",
    github: "https://github.com/PARASMANI-KHUNTE/Admin-Dashboard",
    year: "2025"
  },
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
      className={`min-h-screen relative py-20 px-6 overflow-hidden transition-all duration-500 ${
        isDarkMode 
          ? "bg-gradient-to-br from-gray-900 to-gray-800 text-white" 
          : "bg-gradient-to-br from-white to-gray-50 text-gray-800"
      }`}
    >
      {/* Animated background shapes */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute rounded-full blur-3xl opacity-10 ${
              isDarkMode ? "bg-amber-600" : "bg-amber-400"
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
            className={`group flex items-center gap-2 rounded-full px-6 py-3 font-medium transition-all ${
              isDarkMode
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