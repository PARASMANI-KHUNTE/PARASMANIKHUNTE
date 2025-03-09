import React, { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useTheme } from "../context/ThemeContext";
import EducationCard from "../components/EducationCard";
import { GraduationCap, Award, BookOpen } from "lucide-react";

const educationData = [
  {
    degree: "Bachelor of  Computer Application",
    institution: "Guru Ghasidas University",
    year: "2022 - 2025",
    location: "Bilaspur, C.G",
    gpa: 8.2,
    description: "Specialized in Artificial Intelligence and Machine Learning with a minor in Human-Computer Interaction.",
    courses: ["Data Structures", "Algorithms", "Machine Learning", "Web Development", "Database Systems"],
    achievements: [
      "IOT Executive GFG Student chapter",
      "Best Programer ",
      "Teaching Assistant for IOT course"
    ]
  },
  {
    degree: "Higher Secondary School",
    institution: "Kendriya Vidyalaya ",
    year: "2020 - 2021",
    location: "Raigrah , C.G",
    gpa: 82.2,
    description: "PCB - Physic , Chemistry , Biology with Computer Science & English",
    courses: ["Physic", "Chemistry", "Biology", "Computer Science","English"],
    achievements: [
      "School Discipline Captian"
    ]
  },
  {
    type: "certification",
    degree: "Python",
    institution: "Great Learning",
    year: "2023",
    description: "Learned about python - mysql and tkinter ",
    achievements: [
    ]
  },
  {
    type: "certification",
    degree: "Cyber Secutiry ",
    institution: "NIT Kanpur",
    year: "2023",
    description: "Comprehensive bootcamp covering modern cyber security threats and best practices.",
    courses: ["Malware detection", "Attacks", "Preventions", "Networking"]
  }
];

const Education = () => {
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

  // Separate formal education and certifications
  const formalEducation = educationData.filter(item => item.type !== "certification");
  const certifications = educationData.filter(item => item.type === "certification");

  return (
    <section
      className={`min-h-screen relative py-20 px-6 overflow-hidden transition-all duration-500 ${
        isDarkMode 
          ? "bg-gradient-to-br from-gray-900 to-gray-800 text-white" 
          : "bg-gradient-to-br from-amber-50 via-gray-50 to-white text-gray-800"
      }`}
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(5)].map((_, i) => (
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
              opacity: isDarkMode ? 0.1 : 0.2,
              x: [0, Math.random() * 10 - 5],
              y: [0, Math.random() * 10 - 5],
            }}
            transition={{ 
              duration: 6,
              repeat: Infinity,
              repeatType: "reverse",
              delay: i * 0.4
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
            <GraduationCap className={`h-8 w-8 ${isDarkMode ? "text-amber-400" : "text-amber-500"}`} />
          </motion.div>
          
          <h2 className={`text-4xl md:text-5xl font-bold ${isDarkMode ? "text-white" : "text-gray-800"}`}>
            Education & Certifications
          </h2>
          
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "80px" }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className={`h-1 mx-auto mt-4 mb-6 rounded-full ${isDarkMode ? "bg-amber-400" : "bg-amber-500"}`}
          />
          
          <p className={`text-lg max-w-2xl mx-auto ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
            My academic journey, qualifications, and professional certifications.
          </p>
        </motion.div>

        {/* Education section */}
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="mb-16"
        >
          <div className="mb-10 flex items-center gap-3">
            <GraduationCap className={`h-6 w-6 ${isDarkMode ? "text-amber-400" : "text-amber-500"}`} />
            <h3 className={`text-2xl font-bold ${isDarkMode ? "text-white" : "text-gray-800"}`}>
              Academic Education
            </h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {formalEducation.map((education, index) => (
              <EducationCard key={index} education={education} />
            ))}
          </div>
        </motion.div>

        {/* Certifications section */}
        {certifications.length > 0 && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={controls}
          >
            <div className="mb-10 flex items-center gap-3">
              <Award className={`h-6 w-6 ${isDarkMode ? "text-amber-400" : "text-amber-500"}`} />
              <h3 className={`text-2xl font-bold ${isDarkMode ? "text-white" : "text-gray-800"}`}>
                Professional Certifications
              </h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              {certifications.map((certification, index) => (
                <EducationCard key={index} education={certification} />
              ))}
            </div>
          </motion.div>
        )}

        {/* Learning philosophy */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className={`mt-16 rounded-xl p-6 ${
            isDarkMode ? "bg-gray-800/50 border border-gray-700" : "bg-white/80 border border-gray-100 shadow-md"
          }`}
        >
          <div className="flex items-center gap-3 mb-4">
            <BookOpen className={`h-5 w-5 ${isDarkMode ? "text-amber-400" : "text-amber-500"}`} />
            <h3 className={`text-xl font-semibold ${isDarkMode ? "text-white" : "text-gray-800"}`}>
              Continuous Learning
            </h3>
          </div>
          <p className={`${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
            I'm passionate about continuous learning and regularly take online courses to stay current with the latest technologies and industry best practices. I believe that education is a lifelong journey.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Education;