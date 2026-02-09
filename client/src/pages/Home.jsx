import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../context/ThemeContext";
import { X, Maximize2, Eye, Monitor } from "lucide-react";
import ProjectPreviewModal from "../components/ProjectPreviewModal";

const Home = () => {
  const { isDarkMode } = useTheme();
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isCvPreviewOpen, setIsCvPreviewOpen] = useState(false);
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
  const [isNameModalOpen, setIsNameModalOpen] = useState(false);
  const [visitorName, setVisitorName] = useState("");
  const [selectedProject, setSelectedProject] = useState(null);

  const handleOpenPreview = (project) => {
    setSelectedProject(project);
    setIsPreviewModalOpen(true);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Email Handler - Stage 1: Open Modal
  const handleHireMeClick = () => {
    setIsNameModalOpen(true);
  };

  // Email Handler - Stage 2: Trigger Email
  const confirmHireMe = (e) => {
    if (e) e.preventDefault();
    if (!visitorName.trim()) return;

    const email = "parasmanikhunte@gmail.com";
    const subject = encodeURIComponent("Job Opportunity Inquiry");
    const body = encodeURIComponent(
      `Hello Paras,\n\nI came across your profile and would love to discuss an opportunity with you. Looking forward to connecting!\n\nBest regards,\n${visitorName}`
    );

    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
    setIsNameModalOpen(false);
  };

  // Download CV Handler
  const handleDownloadCV = () => {
    const cvPath = "/Parasmani_Khunte_Resume_ATS.pdf"; // Updated ATS Resume in 'public' folder
    const link = document.createElement("a");
    link.href = cvPath;
    link.download = "Parasmani_Khunte_Resume_ATS_2025.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  // Profile image URL - you can replace this with your actual image URL
  const profileImageUrl = "https://storage.googleapis.com/ggvians-2c0ed.appspot.com/posts/a5b56b9f-6ddc-4436-8280-8b6add03cc33_newone.jpg?GoogleAccessId=firebase-adminsdk-a9cow%40ggvians-2c0ed.iam.gserviceaccount.com&Expires=16730323200&Signature=DawoUCaE0kJeyn4vAp42qThfHw7uzDerhJ4TiwZPBIXY7xcDADPEiLb7OdfdlVmKstYEbPEFigminbhf48G%2F9pPjpMrG51wQrM46uEsSa01oRFArMAkQmBMieeimnkGHjCuPuwn0udJSsdxEG%2FSyL9c1ObgpnQTF%2BasxxqVyIOoRZdX9KSHcy%2FPR03vV%2BFU4YxS01uQdHciagB2jtCigCAagR5vThtr7nyGcf%2By5GPKkYWZfnmd%2BQhYKNnCciicg%2BqujvWZaYkh2F0Ax2Zv62uWwh7G5jwFQHdIZmLlxf4OV2h6qyfg6SqPArRveh%2Fnx14VmATwVEeeCGB6xPBIOVQ%3D%3D";
  // Set to null or empty string to show the default icon avatar

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        when: "beforeChildren",
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6 }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={`min-h-screen  relative overflow-hidden ${isDarkMode
        ? "bg-gray-900 text-white"
        : "bg-gradient-to-br from-amber-50 to-white text-gray-800"
        }`}
    >
      {/* Abstract shapes background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className={`absolute blur -top-32 -right-32 w-96 h-96 rounded-full ${isDarkMode ? "bg-amber-900/10" : "bg-amber-200/30"}`}></div>
        <div className={`absolute blur top-1/4 -left-16 w-64 h-64 rounded-full ${isDarkMode ? "bg-amber-800/10" : "bg-amber-100/50"}`}></div>
        <div className={`absolute blur bottom-1/4 right-1/3 w-48 h-48 rounded-full ${isDarkMode ? "bg-amber-700/10" : "bg-amber-300/20"}`}></div>
        <div className={`absolute blur -bottom-20 -left-20 w-80 h-80  rounded-full ${isDarkMode ? "bg-amber-600/10" : "bg-amber-100/40"}`}></div>
      </div>

      {/* Content container */}
      <div className="relative z-10 mt-4 container mx-auto px-6 py-16 flex flex-col items-center justify-center  min-h-screen">
        {/* Profile section */}
        <motion.div
          variants={itemVariants}
          className="w-full flex flex-col md:flex-row items-center justify-between mb-16 max-w-5xl mx-auto"
        >
          <div className="md:w-1/2 text-center md:text-left mb-8 md:mb-0">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className={`text-5xl md:text-6xl font-bold mb-4`}>
                Hi, I'm <span className={`${isDarkMode ? "text-amber-400" : "text-amber-500"}`}>Paras</span>
              </h1>
              <p className={`text-xl md:text-2xl mb-6 ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
                Software Development Engineer | MCA Student
              </p>
              <p className={`text-base md:text-lg mb-8 max-w-lg ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                Building scalable full-stack applications with React, Node.js & AI integration. ISRO Hackathon participant. Passionate about creating impactful tech solutions.
              </p>

              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                {/* Hire Me Button */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleHireMeClick}
                  className={`px-8 py-3 rounded-lg font-semibold transition-all duration-300 ${isDarkMode
                    ? "bg-amber-500 text-gray-900 hover:bg-amber-400"
                    : "bg-amber-500 text-white hover:bg-amber-600"
                    }`}
                >
                  <span className="flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-2"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z"
                        clipRule="evenodd"
                      />
                      <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
                    </svg>
                    Hire Me
                  </span>
                </motion.button>

                {/* Download CV Button */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleDownloadCV}
                  className={`px-8 py-3 rounded-lg font-semibold transition-all duration-300 ${isDarkMode
                    ? "bg-transparent border-2 border-amber-500 text-amber-400 hover:bg-amber-900/30"
                    : "bg-transparent border-2 border-amber-500 text-amber-600 hover:bg-amber-50"
                    }`}
                >
                  <span className="flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-2"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Download CV
                  </span>
                </motion.button>

                {/* Preview CV Button */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setIsCvPreviewOpen(true)}
                  className={`p-3 rounded-lg font-semibold transition-all duration-300 border-2 ${isDarkMode
                    ? "border-amber-500 text-amber-400 hover:bg-amber-900/30"
                    : "border-amber-500 text-amber-600 hover:bg-amber-50"
                    }`}
                  title="Preview CV"
                >
                  <Eye className="h-6 w-6" />
                </motion.button>
              </div>
            </motion.div>
          </div>

          {/* Animated avatar/image */}
          <motion.div
            variants={itemVariants}
            className="md:w-1/2 flex justify-center md:justify-end"
          >
            <div
              onClick={() => profileImageUrl && setIsPreviewOpen(true)}
              className={`relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden cursor-pointer group ${isDarkMode ? "bg-amber-800/20" : "bg-amber-100"
                }`}
            >
              {profileImageUrl ? (
                // Display actual profile image if URL is provided
                <>
                  <img
                    src={profileImageUrl}
                    alt="Paras Khunte"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="bg-white/20 backdrop-blur-md p-3 rounded-full border border-white/30">
                      <Maximize2 className="text-white w-6 h-6" />
                    </div>
                  </div>
                </>
              ) : (
                // Fallback to icon if no image URL is provided
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg className={`w-32 h-32 ${isDarkMode ? "text-amber-400" : "text-amber-500"}`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                </div>
              )}
              <motion.div
                className="absolute inset-0 rounded-full pointer-events-none"
                initial={{ borderWidth: "0px" }}
                animate={{ borderWidth: "4px" }}
                transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
                style={{
                  borderColor: isDarkMode ? "rgba(245, 158, 11, 0.3)" : "rgba(245, 158, 11, 0.2)",
                  borderStyle: "solid"
                }}
              />
            </div>
          </motion.div>
        </motion.div>

        {/* Career & Education Summary */}
        <motion.div
          variants={itemVariants}
          className="mb-16 max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {/* Education Summary */}
          <div className={`p-6 rounded-2xl ${isDarkMode ? "bg-gray-800/20 border border-gray-700" : "bg-white/40 border border-gray-100 shadow-sm"}`}>
            <div className="flex items-center gap-3 mb-4">
              <div className={`p-2 rounded-lg ${isDarkMode ? "bg-amber-400/10 text-amber-400" : "bg-amber-100 text-amber-600"}`}>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M12 14l9-5-9-5-9 5 9 5z" />
                  <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                </svg>
              </div>
              <h3 className={`text-xl font-bold ${isDarkMode ? "text-white" : "text-gray-800"}`}>Current Education</h3>
            </div>
            <div className="space-y-2">
              <h4 className={`font-semibold ${isDarkMode ? "text-amber-400" : "text-amber-500"}`}>MCA Student</h4>
              <p className={`text-sm ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>Guru Ghasidas University (2025 - 2027)</p>
              <p className={`text-xs ${isDarkMode ? "text-gray-500" : "text-gray-400"}`}>Developing expertise in Advanced Computing & AI integration.</p>
            </div>
          </div>

          {/* Experience Summary */}
          <div className={`p-6 rounded-2xl ${isDarkMode ? "bg-gray-800/20 border border-gray-700" : "bg-white/40 border border-gray-100 shadow-sm"}`}>
            <div className="flex items-center gap-3 mb-4">
              <div className={`p-2 rounded-lg ${isDarkMode ? "bg-amber-400/10 text-amber-400" : "bg-amber-100 text-amber-600"}`}>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className={`text-xl font-bold ${isDarkMode ? "text-white" : "text-gray-800"}`}>Recent Experience</h3>
            </div>
            <div className="space-y-2">
              <h4 className={`font-semibold ${isDarkMode ? "text-amber-400" : "text-amber-500"}`}>Technical Intern</h4>
              <p className={`text-sm ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>Hybrowlabs / Akkuraa IT Services</p>
              <p className={`text-xs ${isDarkMode ? "text-gray-500" : "text-gray-400"}`}>Specialized in MERN stack and Frappe + React applications.</p>
            </div>
          </div>
        </motion.div>

        {/* Tech Stack Section */}
        <motion.div
          variants={itemVariants}
          className={`mb-16 py-8 px-8 rounded-xl backdrop-blur-sm max-w-5xl w-full ${isDarkMode ? "bg-gray-800/50" : "bg-white/70"
            } shadow-lg`}
        >
          <h2 className={`text-xl md:text-2xl font-semibold mb-8 text-center ${isDarkMode ? "text-amber-400" : "text-amber-600"
            }`}>Tech Stack</h2>

          {/* Tech Icons Grid */}
          <div className="grid grid-cols-4 md:grid-cols-8 gap-4 mb-8">
            {[
              { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
              { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
              { name: "MongoDB", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
              { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
              { name: "TypeScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
              { name: "Tailwind", icon: "https://www.vectorlogo.zone/logos/tailwindcss/tailwindcss-icon.svg" },
              { name: "Express", icon: isDarkMode ? "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" : "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" },
              { name: "Git", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
            ].map((tech, index) => (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.1, y: -5 }}
                className={`p-3 rounded-xl text-center cursor-pointer transition-all flex flex-col items-center justify-center ${isDarkMode ? "bg-gray-700/30 hover:bg-gray-600/50" : "bg-amber-50/50 hover:bg-amber-100"
                  } border border-transparent hover:border-amber-500/30`}
              >
                <div className="w-10 h-10 mb-2 flex items-center justify-center">
                  <img
                    src={tech.icon}
                    alt={tech.name}
                    className={`w-full h-full object-contain ${tech.name === 'Express' && isDarkMode ? 'brightness-200 grayscale-0' : ''}`}
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                </div>
                <span className={`text-xs font-medium ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
                  {tech.name}
                </span>
              </motion.div>
            ))}
          </div>

          {/* Skills Progress Bars */}
          <div className="space-y-4">
            {[
              { skill: "Frontend (React, React Native)", level: 90 },
              { skill: "Backend (Node.js, Express)", level: 85 },
              { skill: "Database (MongoDB, SQL)", level: 80 },
              { skill: "AI & Machine Learning", level: 70 },
            ].map((item, index) => (
              <div key={item.skill}>
                <div className="flex justify-between mb-1">
                  <span className={`text-sm font-medium ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                    {item.skill}
                  </span>
                  <span className={`text-sm font-medium ${isDarkMode ? "text-amber-400" : "text-amber-600"}`}>
                    {item.level}%
                  </span>
                </div>
                <div className={`w-full h-2 rounded-full ${isDarkMode ? "bg-gray-700" : "bg-gray-200"}`}>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${item.level}%` }}
                    transition={{ duration: 1, delay: 0.5 + index * 0.2 }}
                    className="h-2 rounded-full bg-gradient-to-r from-amber-400 to-amber-600"
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Stats Counter Section */}
        <motion.div
          variants={itemVariants}
          className="mb-16 max-w-5xl w-full"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { number: "10+", label: "Projects", iconPath: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" },
              { number: "5+", label: "Internships", iconPath: "M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" },
              { number: "3+", label: "Certifications", iconPath: "M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" },
              { number: "1", label: "ISRO Hackathon", iconPath: "M13 10V3L4 14h7v7l9-11h-7z" },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className={`p-6 rounded-xl text-center ${isDarkMode
                  ? "bg-gray-800/30"
                  : "bg-white/50 shadow-sm"
                  }`}
              >
                <div className={`w-12 h-12 mx-auto mb-3 rounded-full flex items-center justify-center ${isDarkMode ? "bg-gray-700/50" : "bg-amber-50"}`}>
                  <svg className={`w-6 h-6 ${isDarkMode ? "text-amber-400" : "text-amber-500"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={stat.iconPath} />
                  </svg>
                </div>
                <motion.span
                  className={`text-2xl md:text-3xl font-bold block mb-1 ${isDarkMode ? "text-amber-400" : "text-amber-500"}`}
                >
                  {stat.number}
                </motion.span>
                <span className={`text-sm font-medium ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                  {stat.label}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Featured Project - MyCircle */}
        <motion.div
          variants={itemVariants}
          className={`mb-16 max-w-5xl w-full rounded-2xl overflow-hidden ${isDarkMode
            ? "bg-gradient-to-r from-gray-800 to-gray-900 border border-gray-700"
            : "bg-gradient-to-r from-amber-50 to-white border border-amber-100 shadow-xl"
            }`}
        >
          <div className="p-8">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="text-2xl">⭐</span>
                <h3 className={`text-lg font-semibold ${isDarkMode ? "text-amber-400" : "text-amber-600"}`}>
                  Featured Project
                </h3>
              </div>
              <div className="bg-emerald-500 text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-lg flex items-center gap-1 uppercase tracking-wider">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                </span>
                Latest
              </div>
            </div>

            <h4 className={`text-2xl md:text-3xl font-bold mb-4 ${isDarkMode ? "text-white" : "text-gray-800"}`}>
              MyCircle - Hyperlocal Exchange Platform
            </h4>

            <p className={`mb-6 ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
              A full-stack platform connecting neighbors for jobs, services, and local commerce.
              Built with React Native for mobile, React for web, and Node.js backend with real-time
              chat, AI content moderation, and trust scoring system.
            </p>

            {/* Tech badges */}
            <div className="flex flex-wrap gap-2 mb-6">
              {["React Native", "React", "Node.js", "MongoDB", "Socket.io", "Gemini AI"].map((tech) => (
                <span
                  key={tech}
                  className={`px-3 py-1 rounded-full text-xs font-medium ${isDarkMode
                    ? "bg-amber-500/20 text-amber-400"
                    : "bg-amber-100 text-amber-700"
                    }`}
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* Action buttons */}
            <div className="flex flex-wrap gap-4">
              <motion.a
                href="https://mycircle-9gm5.onrender.com"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-6 py-3 rounded-lg font-medium flex items-center gap-2 ${isDarkMode
                  ? "bg-amber-500 text-gray-900 hover:bg-amber-400"
                  : "bg-amber-500 text-white hover:bg-amber-600"
                  }`}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                <span>Live Site</span>
              </motion.a>

              <motion.button
                onClick={() => handleOpenPreview({
                  title: "MyCircle",
                  link: "https://mycircle-9gm5.onrender.com",
                  github: "https://github.com/PARASMANI-KHUNTE/MyCircle"
                })}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-6 py-3 rounded-lg font-medium flex items-center gap-2 border-2 ${isDarkMode
                  ? "border-amber-500 text-amber-400 hover:bg-amber-900/30"
                  : "border-amber-500 text-amber-600 hover:bg-amber-50"
                  }`}
              >
                <Monitor className="w-5 h-5" />
                <span>Preview Live</span>
              </motion.button>

              <motion.a
                href="https://github.com/PARASMANI-KHUNTE/MyCircle"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-6 py-3 rounded-lg font-medium flex items-center gap-2 ${isDarkMode
                  ? "bg-gray-700 text-white hover:bg-gray-600"
                  : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                  }`}
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                View on GitHub
              </motion.a>
            </div>
          </div>
        </motion.div>

        {/* Services Section */}
        <motion.div
          variants={itemVariants}
          className="mb-16 max-w-5xl w-full"
        >
          <h2 className={`text-2xl md:text-3xl font-bold text-center mb-8 ${isDarkMode ? "text-white" : "text-gray-800"}`}>
            What I <span className={isDarkMode ? "text-amber-400" : "text-amber-500"}>Offer</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                iconPath: "M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9",
                title: "Web Development",
                description: "Modern, responsive web apps with React, Next.js, and Tailwind CSS"
              },
              {
                iconPath: "M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z",
                title: "Mobile Apps",
                description: "Cross-platform mobile apps using React Native with native performance"
              },
              {
                iconPath: "M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
                title: "AI Integration",
                description: "Integrate AI/ML models including Gemini, OpenAI for smart features"
              },
              {
                iconPath: "M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01",
                title: "Backend & APIs",
                description: "Scalable Node.js/Express APIs with MongoDB, real-time with Socket.io"
              }
            ].map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className={`p-6 rounded-xl text-center ${isDarkMode
                  ? "bg-gray-800/30"
                  : "bg-white/50 shadow-sm"
                  } transition-all duration-300`}
              >
                <div className={`w-14 h-14 mx-auto mb-4 rounded-full flex items-center justify-center ${isDarkMode ? "bg-gray-700/50" : "bg-amber-50"}`}>
                  <svg className={`w-7 h-7 ${isDarkMode ? "text-amber-400" : "text-amber-500"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={service.iconPath} />
                  </svg>
                </div>
                <h3 className={`text-lg font-semibold mb-2 ${isDarkMode ? "text-white" : "text-gray-800"}`}>
                  {service.title}
                </h3>
                <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                  {service.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
        {/* Achievements & Milestones Section */}
        <motion.div
          variants={itemVariants}
          className="mb-16 max-w-5xl w-full"
        >
          <h2 className={`text-2xl md:text-3xl font-bold text-center mb-8 ${isDarkMode ? "text-white" : "text-gray-800"}`}>
            Recent <span className={isDarkMode ? "text-amber-400" : "text-amber-500"}>Milestones</span>
          </h2>

          <div className={`rounded-2xl p-6 md:p-8 backdrop-blur-sm ${isDarkMode
            ? "bg-gray-800/30 border border-gray-700"
            : "bg-white/50 border border-gray-100 shadow-lg"
            }`}>
            <div className="space-y-8">
              {[
                {
                  date: "2025",
                  title: "Full Stack Software Engineer",
                  organization: "React Native & MERN Stack",
                  description: "Mastered React Native and successfully built cross-platform applications, becoming a proficient Full Stack Software Engineer.",
                  icon: "📱"
                },
                {
                  date: "2025",
                  title: "Bharatiya Antariksh Hackathon 2025",
                  organization: "ISRO - Indian Space Research Organization",
                  description: "Successfully participated in the prestigious national-level space technology hackathon.",
                  icon: "🚀"
                },
                {
                  date: "2024",
                  title: "IoT Executive",
                  organization: "GeeksforGeeks Student Chapter",
                  description: "Led technical initiatives and mentored students in Internet of Things and web integration.",
                  icon: "🌐"
                },
                {
                  date: "2024",
                  title: "GPS Tracking Implementation",
                  organization: "Hybrowlabs Technologies",
                  description: "Successfully created and implemented a real-time GPS tracking feature for a key project during the internship.",
                  iconPath: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                }
              ].map((achievement, index) => (
                <div key={index} className="flex gap-4 md:gap-6 relative group">
                  {index !== 3 && (
                    <div className={`absolute left-5 top-10 bottom-[-32px] w-0.5 ${isDarkMode ? "bg-gray-700" : "bg-gray-200"}`}></div>
                  )}
                  <div className={`w-10 h-10 shrink-0 rounded-full flex items-center justify-center z-10 ${isDarkMode ? "bg-gray-700 text-amber-400" : "bg-amber-100 text-amber-600"
                    } group-hover:scale-110 transition-transform duration-300`}>
                    {achievement.iconPath ? (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={achievement.iconPath} />
                      </svg>
                    ) : (
                      <span className="text-xl">{achievement.icon}</span>
                    )}
                  </div>
                  <div className="flex-1 pb-4">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-1">
                      <h3 className={`text-lg font-bold ${isDarkMode ? "text-white" : "text-gray-800"}`}>
                        {achievement.title}
                      </h3>
                      <span className={`text-sm font-semibold px-2 py-1 rounded ${isDarkMode ? "bg-amber-400/10 text-amber-400" : "bg-amber-100 text-amber-600"
                        }`}>
                        {achievement.date}
                      </span>
                    </div>
                    <p className={`text-sm font-medium mb-2 ${isDarkMode ? "text-amber-400/80" : "text-amber-500"}`}>
                      {achievement.organization}
                    </p>
                    <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                      {achievement.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Contact Section */}
        <motion.div
          variants={itemVariants}
          className="mb-16 max-w-5xl w-full"
        >
          <h2 className={`text-2xl md:text-3xl font-bold text-center mb-12 ${isDarkMode ? "text-white" : "text-gray-800"}`}>
            Get In <span className={isDarkMode ? "text-amber-400" : "text-amber-500"}>Touch</span>
          </h2>

          <div className="max-w-3xl mx-auto space-y-8">
            <p className={`text-lg text-center ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
              Have a project in mind or just want to say hi? Feel free to reach out. I'm always open to discussing new opportunities and creative ideas.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className={`flex items-start gap-4 p-6 rounded-xl ${isDarkMode ? "bg-gray-800/30" : "bg-white/50 shadow-sm"}`}>
                <div className={`p-3 rounded-lg ${isDarkMode ? "bg-amber-400/10 text-amber-400" : "bg-amber-100 text-amber-600"}`}>
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h4 className={`font-bold ${isDarkMode ? "text-white" : "text-gray-800"}`}>Email</h4>
                  <p className={isDarkMode ? "text-gray-400" : "text-gray-600"}>parasmanikhunte@gmail.com</p>
                </div>
              </div>

              <div className={`flex items-start gap-4 p-6 rounded-xl ${isDarkMode ? "bg-gray-800/30" : "bg-white/50 shadow-sm"}`}>
                <div className={`p-3 rounded-lg ${isDarkMode ? "bg-amber-400/10 text-amber-400" : "bg-amber-100 text-amber-600"}`}>
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className={`font-bold ${isDarkMode ? "text-white" : "text-gray-800"}`}>Location</h4>
                  <p className={isDarkMode ? "text-gray-400" : "text-gray-600"}>Bilaspur, Chhattisgarh, India</p>
                </div>
              </div>
            </div>

            <div className="flex justify-center mt-8">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleHireMeClick}
                className={`px-10 py-4 rounded-xl font-bold shadow-lg transition-all ${isDarkMode
                  ? "bg-amber-400 text-gray-900 hover:bg-amber-300 shadow-amber-900/20"
                  : "bg-amber-500 text-white hover:bg-amber-600 shadow-amber-200/50"
                  }`}
              >
                Send Me an Email
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Social links */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col items-center"
        >
          <h3 className={`mb-4 text-center font-medium ${isDarkMode ? "text-gray-300" : "text-gray-600"
            }`}>Connect With Me</h3>
          <div className="flex space-x-4 mb-12">
            <motion.a
              whileHover={{ y: -5, scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              href="https://github.com/PARASMANI-KHUNTE"
              target="_blank"
              rel="noopener noreferrer"
              className={`p-3 rounded-full transition-all duration-300 ${isDarkMode
                ? "bg-gray-800 text-amber-400 hover:bg-gray-700 hover:text-amber-300"
                : "bg-white text-amber-600 hover:bg-amber-50 shadow-md"
                }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
            </motion.a>
            <motion.a
              whileHover={{ y: -5, scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              href="https://www.linkedin.com/in/parasmani-khunte-330488228/"
              target="_blank"
              rel="noopener noreferrer"
              className={`p-3 rounded-full transition-all duration-300 ${isDarkMode
                ? "bg-gray-800 text-amber-400 hover:bg-gray-700 hover:text-amber-300"
                : "bg-white text-amber-600 hover:bg-amber-50 shadow-md"
                }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.784 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
            </motion.a>
            <motion.a
              whileHover={{ y: -5, scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              href="https://www.instagram.com/ll.__.p.a.r.a.s.__.ll/"
              target="_blank"
              rel="noopener noreferrer"
              className={`p-3 rounded-full transition-all duration-300 ${isDarkMode
                ? "bg-gray-800 text-amber-400 hover:bg-gray-700 hover:text-amber-300"
                : "bg-white text-amber-600 hover:bg-amber-50 shadow-md"
                }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </motion.a>
            <motion.a
              whileHover={{ y: -5, scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              href="mailto:parasmanikhunte@gmail.com"  // Corrected
              className={`p-3 rounded-full transition-all duration-300 ${isDarkMode
                ? "bg-gray-800 text-amber-400 hover:bg-gray-700 hover:text-amber-300"
                : "bg-white text-amber-600 hover:bg-amber-50 shadow-md"
                }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </motion.a>

          </div>
        </motion.div>

      </div>

      {/* Back to Top Button */}
      {showScrollTop && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={scrollToTop}
          className={`fixed bottom-8 right-8 p-3 rounded-full z-50 shadow-2xl transition-all ${isDarkMode
            ? "bg-amber-400 text-gray-900 hover:bg-amber-300"
            : "bg-amber-500 text-white hover:bg-amber-600"
            }`}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </motion.button>
      )}

      {/* Profile Image Preview Modal */}
      <AnimatePresence>
        {isPreviewOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={() => setIsPreviewOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative max-w-4xl w-full max-h-[90vh] flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setIsPreviewOpen(false)}
                className="absolute -top-12 right-0 md:-right-12 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
              <img
                src={profileImageUrl}
                alt="Profile Preview"
                className="max-w-full max-h-[85vh] rounded-2xl shadow-2xl object-contain border border-white/10"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CV Preview Modal */}
      <AnimatePresence>
        {isCvPreviewOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={() => setIsCvPreviewOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative max-w-5xl w-full h-[90vh] bg-white rounded-2xl overflow-hidden flex flex-col shadow-2xl shadow-black/50"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gray-50">
                <h3 className="font-bold text-gray-800 flex items-center gap-2">
                  <Eye className="w-5 h-5 text-amber-500" />
                  Resume Preview
                </h3>
                <button
                  onClick={() => setIsCvPreviewOpen(false)}
                  className="p-2 rounded-full hover:bg-gray-200 text-gray-600 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              <div className="flex-1 w-full h-full bg-gray-200">
                <iframe
                  src="/Parasmani_Khunte_Resume_ATS.pdf#toolbar=0"
                  className="w-full h-full border-none"
                  title="CV Preview"
                ></iframe>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Project Preview Modal */}
      <ProjectPreviewModal
        isOpen={isPreviewModalOpen}
        onClose={() => setIsPreviewModalOpen(false)}
        project={selectedProject}
        isDarkMode={isDarkMode}
      />

      {/* Custom Name Prompt Modal */}
      <AnimatePresence>
        {isNameModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsNameModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className={`relative max-w-md w-full p-8 rounded-3xl shadow-2xl ${isDarkMode ? "bg-gray-800 border border-gray-700" : "bg-white border border-amber-100"
                }`}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setIsNameModalOpen(false)}
                className={`absolute top-4 right-4 p-2 rounded-full transition-colors ${isDarkMode ? "hover:bg-gray-700 text-gray-400" : "hover:bg-amber-50 text-amber-500"
                  }`}
              >
                <X className="w-5 h-5" />
              </button>

              <div className="text-center mb-6">
                <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center ${isDarkMode ? "bg-amber-400/10 text-amber-400" : "bg-amber-100 text-amber-600"
                  }`}>
                  <Monitor className="w-8 h-8" />
                </div>
                <h3 className={`text-2xl font-bold mb-2 ${isDarkMode ? "text-white" : "text-gray-800"}`}>
                  Nice to meet you!
                </h3>
                <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                  Please enter your name to personalize your message.
                </p>
              </div>

              <form onSubmit={confirmHireMe} className="space-y-4">
                <div>
                  <input
                    autoFocus
                    type="text"
                    value={visitorName}
                    onChange={(e) => setVisitorName(e.target.value)}
                    placeholder="Your Name"
                    className={`w-full px-6 py-4 rounded-xl outline-none transition-all border-2 ${isDarkMode
                      ? "bg-gray-900 border-gray-700 focus:border-amber-400 text-white"
                      : "bg-amber-50/30 border-amber-100 focus:border-amber-500 text-gray-800"
                      }`}
                  />
                </div>
                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsNameModalOpen(false)}
                    className={`flex-1 py-4 rounded-xl font-bold transition-all ${isDarkMode
                      ? "bg-gray-700 text-white hover:bg-gray-600"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                      }`}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={!visitorName.trim()}
                    className={`flex-1 py-4 rounded-xl font-bold shadow-lg transition-all ${isDarkMode
                      ? "bg-amber-400 text-gray-900 hover:bg-amber-300 shadow-amber-900/20"
                      : "bg-amber-500 text-white hover:bg-amber-600 shadow-amber-200/50"
                      } disabled:opacity-50 disabled:cursor-not-allowed`}
                  >
                    Continue
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Home;