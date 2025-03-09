import React from "react";
import { motion } from "framer-motion";
import { Briefcase, Calendar, MapPin, ExternalLink } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

const ExperienceCard = ({ experience }) => {
  const { isDarkMode } = useTheme();
  
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    hover: { 
      scale: 1.02,
      boxShadow: isDarkMode ? "0 10px 25px -5px rgba(0, 0, 0, 0.2)" : "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
    }
  };

  const iconVariants = {
    hover: { rotate: 5, scale: 1.1 }
  };
  
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      whileHover="hover"
      variants={cardVariants}
      transition={{ type: "spring", stiffness: 100, damping: 15 }}
      className={`relative overflow-hidden rounded-xl ${
        isDarkMode 
          ? "bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700" 
          : "bg-gradient-to-br from-white to-gray-50 border-gray-100"
      } border p-6 shadow-lg`}
    >
      {/* Accent border */}
      <div className={`absolute left-0 top-0 h-full w-1 bg-amber-500`}></div>
      
      {/* Company badge */}
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <motion.div 
            variants={iconVariants}
            className="flex h-12 w-12 items-center justify-center rounded-lg bg-amber-500/10"
          >
            <Briefcase className="h-6 w-6 text-amber-500" />
          </motion.div>
          <div>
            <h3 className={`text-xl font-bold ${isDarkMode ? "text-white" : "text-gray-800"}`}>
              {experience.role}
            </h3>
            <p className={`font-medium ${isDarkMode ? "text-amber-400" : "text-amber-600"}`}>
              {experience.company}
            </p>
          </div>
        </div>
        
        {experience.companyUrl && (
          <motion.a
            href={experience.companyUrl}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1 }}
            className={`flex h-8 w-8 items-center justify-center rounded-full ${
              isDarkMode ? "bg-gray-700 text-gray-300 hover:bg-gray-600" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            } transition-colors`}
          >
            <ExternalLink className="h-4 w-4" />
          </motion.a>
        )}
      </div>

      {/* Meta information */}
      <div className="mb-4 flex flex-wrap gap-4">
        <div className={`flex items-center gap-2 text-sm ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
          <Calendar className="h-4 w-4" />
          <span>{experience.duration}</span>
        </div>
        
        {experience.location && (
          <div className={`flex items-center gap-2 text-sm ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
            <MapPin className="h-4 w-4" />
            <span>{experience.location}</span>
          </div>
        )}
      </div>
      
      {/* Description */}
      <div className="mt-4">
        <p className={`leading-relaxed ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
          {experience.description}
        </p>
        
        {/* Skills/Technologies (if available) */}
        {experience.skills && experience.skills.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {experience.skills.map((skill, index) => (
              <span 
                key={index}
                className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${
                  isDarkMode 
                    ? "bg-gray-700 text-gray-300" 
                    : "bg-gray-100 text-gray-600"
                }`}
              >
                {skill}
              </span>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default ExperienceCard;