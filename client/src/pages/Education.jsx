import React, { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useTheme } from "../context/ThemeContext";
import EducationCard from "../components/EducationCard";
import { GraduationCap, Award, BookOpen, Loader2 } from "lucide-react";
import { getEducation } from "../services/api";

const Education = () => {
  const { isDarkMode } = useTheme();
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });
  const [educationData, setEducationData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEducation = async () => {
      try {
        const { data } = await getEducation();
        setEducationData(data);
      } catch (error) {
        console.error("Error fetching education:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchEducation();
  }, []);

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
        staggerChildren: 0.15
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

  // Separate formal education and certifications
  const formalEducation = educationData.filter(item => item.type !== "certification");
  const certifications = educationData.filter(item => item.type === "certification");

  return (
    <div className="py-12 lg:py-20">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-500 to-accent-500 mb-6 shadow-lg"
        >
          <GraduationCap className="w-8 h-8 text-white" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className={`text-4xl md:text-5xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}
        >
          Education & <span className="gradient-text">Certifications</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className={`text-lg ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}
        >
          My academic journey and professional certifications that shaped my knowledge and expertise.
        </motion.p>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex justify-center items-center py-20">
          <Loader2 className="w-12 h-12 animate-spin text-primary-500" />
        </div>
      )}

      {/* Empty State */}
      {!loading && educationData.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`max-w-md mx-auto text-center py-16 px-8 rounded-3xl ${isDarkMode
              ? "bg-gray-800/50 border border-gray-700"
              : "bg-white border border-gray-200 shadow-xl"
            }`}
        >
          <div className={`mx-auto w-20 h-20 rounded-full flex items-center justify-center mb-6 ${isDarkMode ? "bg-gray-700" : "bg-primary-50"}`}>
            <BookOpen className={`w-10 h-10 ${isDarkMode ? "text-gray-500" : "text-primary-500"}`} />
          </div>
          <h3 className={`text-2xl font-bold mb-4 ${isDarkMode ? "text-white" : "text-gray-800"}`}>
            No Education Records
          </h3>
          <p className={`mb-8 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
            Your educational background will be displayed here.
          </p>
        </motion.div>
      )}

      {/* Content */}
      {!loading && educationData.length > 0 && (
        <div className="max-w-6xl mx-auto px-4">
          {/* Education section */}
          {formalEducation.length > 0 && (
            <motion.div
              ref={ref}
              variants={containerVariants}
              initial="hidden"
              animate={controls}
              className="mb-20"
            >
              <div className="flex items-center gap-4 mb-10">
                <div className={`p-3 rounded-xl ${isDarkMode ? "bg-primary-900/30" : "bg-primary-100"}`}>
                  <GraduationCap className={`h-6 w-6 ${isDarkMode ? "text-primary-400" : "text-primary-600"}`} />
                </div>
                <h3 className={`text-2xl md:text-3xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                  Academic Education
                </h3>
              </div>

              <motion.div
                variants={containerVariants}
                className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8"
              >
                {formalEducation.map((education, index) => (
                  <motion.div key={index} variants={itemVariants}>
                    <EducationCard education={education} />
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          )}

          {/* Certifications section */}
          {certifications.length > 0 && (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate={controls}
            >
              <div className="flex items-center gap-4 mb-10">
                <div className={`p-3 rounded-xl ${isDarkMode ? "bg-accent-900/30" : "bg-accent-100"}`}>
                  <Award className={`h-6 w-6 ${isDarkMode ? "text-accent-400" : "text-accent-600"}`} />
                </div>
                <h3 className={`text-2xl md:text-3xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                  Professional Certifications
                </h3>
              </div>

              <motion.div
                variants={containerVariants}
                className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8"
              >
                {certifications.map((certification, index) => (
                  <motion.div key={index} variants={itemVariants}>
                    <EducationCard education={certification} />
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          )}

          {/* Learning philosophy */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className={`mt-20 rounded-3xl p-8 md:p-10 ${isDarkMode
                ? "bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700"
                : "bg-gradient-to-br from-white to-primary-50 border border-primary-100 shadow-lg"
              }`}
          >
            <div className="flex items-center gap-4 mb-6">
              <div className={`p-3 rounded-xl ${isDarkMode ? "bg-gray-700" : "bg-white shadow-sm"}`}>
                <BookOpen className={`h-6 w-6 ${isDarkMode ? "text-primary-400" : "text-primary-500"}`} />
              </div>
              <h3 className={`text-2xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                Continuous Learning
              </h3>
            </div>
            <p className={`text-lg leading-relaxed ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
              I'm passionate about continuous learning and regularly take online courses to stay current with the latest
              technologies and industry best practices. Education is a lifelong journey, and I'm committed to growing
              both personally and professionally.
            </p>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Education;