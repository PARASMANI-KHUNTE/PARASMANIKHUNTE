import React, { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useTheme } from "../context/ThemeContext";
import ExperienceCard from "../components/ExperienceCard";
import { Briefcase, Sun, Moon, ChevronDown } from "lucide-react";

const experienceData = [
  {
    role: "Technical Intern",
    company: "hybrowlabs",
    companyUrl: "https://hybrowlabs.com/",
    duration: "March 2025 - Present",
    location: "Remote",
    description: "Developed scalable web applications using the MERN stack.",
    skills: ["React", "Redux" , "Frappe" , "Pyhton"]
  },
  {
    role: "Web Developer Intern",
    company: "Akkuraa it services",
    companyUrl: "https://internshala.com/company/akkuraa-it-services-1732513752/",
    duration: "Jan 2025 - Present",
    location: "Remote",
    description: "Developed scalable web applications using the MERN stack.",
    skills: ["React", "Node.js", "MongoDB", "Express", "Redux" , "Machine Learning"]
  },
  {
    role: "Software Engineer Intern",
    company: "Bluestock™🔺",
    companyUrl: "https://bluestock.in/",
    duration: "Nov 2024 - Dec 2024 · 2 mos",
    location: "Remote",
    description: "Built modern UI/UX designs using React and TailwindCSS. Improved site performance by 40% through code optimization.",
    skills: ["Pyhton","Django", "CSS", "JavaScript", "HTML", "Jinga"]
  },
  {
    role: "Full Stack Developer",
    company: "ELiteTech Intern",
    companyUrl: "https://www.linkedin.com/company/elite-tech-intern/posts/?feedView=all",
    duration: "Oct 2024 - Nov 2024 · 2 mos",
    location: "Remote",
    description: "-Built a fully functional social media application Photoshare, leveraging React and Node.js.Focused on user engagement through post creation, updates, and interactivity features.",
    skills: ["React", "TailwindCSS", "JavaScript", "Express", "Mongodb"]
  },
];

const Experience = () => {
  const { isDarkMode, toggleTheme } = useTheme();
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

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100, damping: 15 }
    }
  };

  const backgroundPatterns = Array(8).fill().map((_, i) => (
    <motion.div
      key={i}
      className={`absolute rounded-full blur-3xl opacity-20 ${
        isDarkMode ? "bg-amber-600" : "bg-amber-400"
      }`}
      style={{
        width: `${Math.random() * 15 + 10}rem`,
        height: `${Math.random() * 15 + 10}rem`,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        zIndex: 0
      }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ 
        scale: 1, 
        opacity: isDarkMode ? 0.15 : 0.2,
        x: [0, Math.random() * 10 - 5],
        y: [0, Math.random() * 10 - 5],
      }}
      transition={{ 
        duration: 2,
        repeat: Infinity,
        repeatType: "reverse",
        delay: i * 0.2
      }}
    />
  ));

  return (
    <section
      className={`min-h-screen relative py-20 px-6 overflow-hidden transition-all duration-500 ${
        isDarkMode 
        ? "bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white" 
        : "bg-gradient-to-br from-amber-50 via-gray-50 to-white text-gray-800"
      }`}
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {backgroundPatterns}
      </div>
      
      {/* Theme Toggle
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={toggleTheme}
        className={`absolute top-6 right-6 p-3 rounded-full z-10 ${
          isDarkMode 
            ? "bg-gray-800 text-amber-400 hover:bg-gray-700" 
            : "bg-white text-amber-500 hover:bg-gray-100 shadow-md"
        } transition-colors`}
      >
        {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
      </motion.button> */}

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
            <Briefcase className={`h-8 w-8 ${isDarkMode ? "text-amber-400" : "text-amber-500"}`} />
          </motion.div>
          
          <h2 className={`text-4xl md:text-5xl font-bold ${isDarkMode ? "text-white" : "text-gray-800"}`}>
            Work Experience
          </h2>
          
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "80px" }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className={`h-1 mx-auto mt-4 mb-6 rounded-full ${isDarkMode ? "bg-amber-400" : "bg-amber-500"}`}
          />
          
          <p className={`text-lg max-w-2xl mx-auto ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
            A glimpse of my professional journey in the industry, showcasing roles that have shaped my expertise.
          </p>
        </motion.div>

        {/* Experience Timeline */}
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="space-y-12 relative"
        >
          {/* Timeline Connector */}
          <div 
            className={`absolute left-1/2 top-0 bottom-0 w-0.5 -translate-x-1/2 ${
              isDarkMode ? "bg-gray-700" : "bg-gray-200"
            }`}
          />
          
          {experienceData.map((experience, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className={`flex flex-col ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
            >
              {/* Year Marker */}
              <div className="md:w-1/2 flex justify-center md:justify-end md:pr-8 md:text-right relative mb-8 md:mb-0">
                <motion.div 
                  whileHover={{ scale: 1.1 }}
                  className={`absolute md:right-0 left-1/2 md:left-auto top-0 h-5 w-5 -translate-x-1/2 md:translate-x-1/2 rounded-full border-4 ${
                    isDarkMode ? "border-gray-800 bg-amber-400" : "border-white bg-amber-500"
                  }`}
                />
                <div className={`mt-10 md:mt-0 ${isDarkMode ? "text-amber-400" : "text-amber-500"} font-bold text-xl`}>
                  {experience.duration.split(" - ")[0]}
                </div>
              </div>
              
              {/* Experience Card */}
              <div className="md:w-1/2 md:pl-8">
                <ExperienceCard experience={experience} />
              </div>
            </motion.div>
          ))}
          
          {/* Continue Indicator */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0, transition: { delay: 1.2, duration: 0.6 } }}
            className="flex flex-col items-center mt-10"
          >
            <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-500"} mb-2`}>
              Scroll for more
            </p>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              <ChevronDown className={`h-6 w-6 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`} />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;