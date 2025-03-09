import React from "react";
import { motion } from "framer-motion";
import { GraduationCap, Calendar, MapPin, Award, BookOpen } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

const EducationCard = ({ education }) => {
  const { isDarkMode } = useTheme();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 100, damping: 15 }}
      className={`relative overflow-hidden rounded-xl ${
        isDarkMode
          ? "bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700"
          : "bg-gradient-to-br from-white to-gray-50 border border-gray-100 shadow-lg"
      }`}
    >
      {/* Left accent border */}
      <div className="absolute left-0 top-0 h-full w-1 bg-amber-500"></div>
      
      {/* Card content */}
      <div className="p-6">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <motion.div 
              whileHover={{ rotate: 5 }}
              className={`flex h-12 w-12 items-center justify-center rounded-lg ${
                isDarkMode ? "bg-gray-700" : "bg-amber-500/10"
              }`}
            >
              {education.type === "certification" ? (
                <Award className={`h-6 w-6 ${isDarkMode ? "text-amber-400" : "text-amber-500"}`} />
              ) : (
                <GraduationCap className={`h-6 w-6 ${isDarkMode ? "text-amber-400" : "text-amber-500"}`} />
              )}
            </motion.div>
            <div>
              <h3 className={`text-xl font-bold ${isDarkMode ? "text-white" : "text-gray-800"}`}>
                {education.degree}
              </h3>
              <p className={`font-medium ${isDarkMode ? "text-amber-400" : "text-amber-600"}`}>
                {education.institution}
              </p>
            </div>
          </div>
        </div>
        
        {/* Meta information */}
        <div className="mb-4 flex flex-wrap gap-4">
          <div className={`flex items-center gap-2 text-sm ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
            <Calendar className="h-4 w-4" />
            <span>{education.year}</span>
          </div>
          
          {education.location && (
            <div className={`flex items-center gap-2 text-sm ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
              <MapPin className="h-4 w-4" />
              <span>{education.location}</span>
            </div>
          )}
          
          {education.gpa && (
            <div className={`flex items-center gap-2 text-sm ${
              isDarkMode 
                ? education.gpa >= 3.5 ? "text-green-400" : "text-amber-400" 
                : education.gpa >= 3.5 ? "text-green-600" : "text-amber-600"
            }`}>
              <Award className="h-4 w-4" />
              <span>GPA / % : {education.gpa}</span>
            </div>
          )}
        </div>
        
        {/* Description */}
        <p className={`leading-relaxed ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
          {education.description}
        </p>
        
        {/* Courses/Skills */}
        {education.courses && education.courses.length > 0 && (
          <div className="mt-4">
            <div className="flex items-center gap-2 mb-2">
              <BookOpen className={`h-4 w-4 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`} />
              <span className={`text-sm font-medium ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                Key Courses
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {education.courses.map((course, index) => (
                <span 
                  key={index}
                  className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${
                    isDarkMode 
                      ? "bg-gray-700 text-gray-300" 
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {course}
                </span>
              ))}
            </div>
          </div>
        )}
        
        {/* Achievements */}
        {education.achievements && education.achievements.length > 0 && (
          <div className="mt-4">
            <div className="flex items-center gap-2 mb-2">
              <Award className={`h-4 w-4 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`} />
              <span className={`text-sm font-medium ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                Achievements
              </span>
            </div>
            <ul className={`list-disc list-inside text-sm ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
              {education.achievements.map((achievement, index) => (
                <li key={index}>{achievement}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default EducationCard;