import React from "react";
import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";

const Home = () => {
  const { isDarkMode } = useTheme();
  // Email Handler
  const handleHireMeClick = () => {
    const email = "parasmanikhunte@gmail.com"; // Replace with your email
    const subject = encodeURIComponent("Job Opportunity Inquiry");
    const body = encodeURIComponent(
      "Hello Paras,\n\nI came across your profile and would love to discuss an opportunity with you. Looking forward to connecting!\n\nBest regards,\n[Your Name]"
    );

    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
  };

  // Download CV Handler
  const handleDownloadCV = () => {
    const cvPath = "/ParasmaniKhunte_2025.pdf"; // File in 'public' folder
    const link = document.createElement("a");
    link.href = cvPath;
    link.download = "PARASMANIKHUNTE_2025.pdf";
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
      className={`min-h-screen relative overflow-hidden ${
        isDarkMode 
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
      <div className="relative z-10 container mx-auto px-6 py-16 flex flex-col items-center justify-center  min-h-screen">
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
                A Full Stack Developer & Creative Problem Solver
              </p>
              <p className={`text-base md:text-lg mb-8 max-w-lg ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                Turning complex challenges into elegant solutions with modern web technologies and creative thinking.
              </p>

              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
      {/* Hire Me Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.98 }}
        onClick={handleHireMeClick}
        className={`px-8 py-3 rounded-lg font-semibold transition-all duration-300 ${
          isDarkMode
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
        className={`px-8 py-3 rounded-lg font-semibold transition-all duration-300 ${
          isDarkMode
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
    </div>
            </motion.div>
          </div>

          {/* Animated avatar/image */}
          <motion.div 
            variants={itemVariants}
            className="md:w-1/2 flex justify-center md:justify-end"
          >
            <div className={`relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden ${
              isDarkMode ? "bg-amber-800/20" : "bg-amber-100"
            }`}>
              {profileImageUrl ? (
                // Display actual profile image if URL is provided
                <img 
                  src={profileImageUrl} 
                  alt="Paras Khunte" 
                  className="w-full h-full object-cover"
                />
              ) : (
                // Fallback to icon if no image URL is provided
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg className={`w-32 h-32 ${isDarkMode ? "text-amber-400" : "text-amber-500"}`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                </div>
              )}
              <motion.div 
                className="absolute inset-0 rounded-full"
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

        {/* Skills section */}
        <motion.div 
          variants={itemVariants}
          className={`mb-16 py-6 px-8 rounded-xl backdrop-blur-sm max-w-5xl w-full ${
            isDarkMode ? "bg-gray-800/50" : "bg-white/70"
          } shadow-lg`}
        >
          <h2 className={`text-xl md:text-2xl font-semibold mb-6 ${
            isDarkMode ? "text-amber-400" : "text-amber-600"
          }`}>My Expertise</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className={`p-4 rounded-lg text-center ${
              isDarkMode ? "bg-gray-700/50" : "bg-amber-50"
            }`}>
              <svg xmlns="http://www.w3.org/2000/svg" className={`h-8 w-8 mx-auto mb-2 ${isDarkMode ? "text-amber-400" : "text-amber-500"}`} viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
              <h3 className="font-medium">Frontend</h3>
            </div>
            <div className={`p-4 rounded-lg text-center ${
              isDarkMode ? "bg-gray-700/50" : "bg-amber-50"
            }`}>
              <svg xmlns="http://www.w3.org/2000/svg" className={`h-8 w-8 mx-auto mb-2 ${isDarkMode ? "text-amber-400" : "text-amber-500"}`} viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M2 5a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V5zm3.293 1.293a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 01-1.414-1.414L7.586 10 5.293 7.707a1 1 0 010-1.414zM11 12a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
              </svg>
              <h3 className="font-medium">Backend</h3>
            </div>
            <div className={`p-4 rounded-lg text-center ${
              isDarkMode ? "bg-gray-700/50" : "bg-amber-50"
            }`}>
              <svg xmlns="http://www.w3.org/2000/svg" className={`h-8 w-8 mx-auto mb-2 ${isDarkMode ? "text-amber-400" : "text-amber-500"}`} viewBox="0 0 20 20" fill="currentColor">
                <path d="M3 12v3c0 1.657 3.134 3 7 3s7-1.343 7-3v-3c0 1.657-3.134 3-7 3s-7-1.343-7-3z" />
                <path d="M3 7v3c0 1.657 3.134 3 7 3s7-1.343 7-3V7c0 1.657-3.134 3-7 3S3 8.657 3 7z" />
                <path d="M17 5c0 1.657-3.134 3-7 3S3 6.657 3 5s3.134-3 7-3 7 1.343 7 3z" />
              </svg>
              <h3 className="font-medium">Database</h3>
            </div>
            <div className={`p-4 rounded-lg text-center ${
              isDarkMode ? "bg-gray-700/50" : "bg-amber-50"
            }`}>
              <svg xmlns="http://www.w3.org/2000/svg" className={`h-8 w-8 mx-auto mb-2 ${isDarkMode ? "text-amber-400" : "text-amber-500"}`} viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
              </svg>
              <h3 className="font-medium">DevOps</h3>
            </div>
          </div>
        </motion.div>
        
        {/* Social links */}
        <motion.div 
          variants={itemVariants}
          className="flex flex-col items-center"
        >
          <h3 className={`mb-4 text-center font-medium ${
            isDarkMode ? "text-gray-300" : "text-gray-600"
          }`}>Connect With Me</h3>
          <div className="flex space-x-4 mb-12">
            <motion.a
              whileHover={{ y: -5, scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              href="https://github.com/PARASMANI-KHUNTE"
              target="_blank"
              rel="noopener noreferrer"
              className={`p-3 rounded-full transition-all duration-300 ${
                isDarkMode
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
              className={`p-3 rounded-full transition-all duration-300 ${
                isDarkMode
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
              className={`p-3 rounded-full transition-all duration-300 ${
                isDarkMode
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
  className={`p-3 rounded-full transition-all duration-300 ${
    isDarkMode
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
     
    </motion.div>
  );
};

export default Home;