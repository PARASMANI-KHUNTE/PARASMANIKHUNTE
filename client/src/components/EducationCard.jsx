import React from "react";
import { motion } from "framer-motion";
import { GraduationCap, Award, Calendar, MapPin, TrendingUp, BookOpen } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import Card from "./ui/Card";
import Badge from "./ui/Badge";

const EducationCard = ({ education }) => {
  const { isDarkMode } = useTheme();
  const isCertification = education.type === "certification";

  return (
    <Card className="h-full p-6 group">
      {/* Icon and Type */}
      <div className="flex items-start justify-between mb-4">
        <motion.div
          whileHover={{ rotate: 5, scale: 1.1 }}
          className={`p-3 rounded-xl ${isDarkMode
              ? "bg-amber-500/20"
              : "bg-gradient-to-br from-amber-400 to-amber-500"
            }`}
        >
          {isCertification ? (
            <Award className={`w-6 h-6 ${isDarkMode ? "text-amber-400" : "text-white"}`} />
          ) : (
            <GraduationCap className={`w-6 h-6 ${isDarkMode ? "text-amber-400" : "text-white"}`} />
          )}
        </motion.div>

        {education.year && (
          <div className={`flex items-center gap-1 text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"
            }`}>
            <Calendar className="w-4 h-4" />
            <span>{education.year}</span>
          </div>
        )}
      </div>

      {/* Title */}
      <h3 className={`text-xl font-bold mb-2 group-hover:text-amber-500 transition-colors ${isDarkMode ? "text-white" : "text-gray-800"
        }`}>
        {education.degree || education.certification}
      </h3>

      {/* Institution */}
      <p className={`font-medium mb-3 ${isDarkMode ? "text-amber-400" : "text-amber-600"
        }`}>
        {education.institution || education.issuer}
      </p>

      {/* Location / GPA */}
      <div className="flex flex-wrap gap-3 mb-4">
        {education.location && (
          <div className={`flex items-center gap-1 text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"
            }`}>
            <MapPin className="w-4 h-4" />
            <span>{education.location}</span>
          </div>
        )}

        {education.gpa && (
          <div className={`flex items-center gap-1 text-sm ${isDarkMode ? "text-green-400" : "text-green-600"
            }`}>
            <TrendingUp className="w-4 h-4" />
            <span>GPA: {education.gpa}</span>
          </div>
        )}
      </div>

      {/* Description */}
      {education.description && (
        <p className={`text-sm mb-4 ${isDarkMode ? "text-gray-400" : "text-gray-600"
          }`}>
          {education.description}
        </p>
      )}

      {/* Courses */}
      {education.majorCourses && education.majorCourses.length > 0 && (
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-2 text-sm font-medium">
            <BookOpen className={`w-4 h-4 ${isDarkMode ? "text-amber-400" : "text-amber-600"}`} />
            <span>Key Courses</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {education.majorCourses.slice(0, 4).map((course, index) => (
              <Badge key={index} variant="info" size="sm">
                {course}
              </Badge>
            ))}
            {education.majorCourses.length > 4 && (
              <Badge variant="info" size="sm">
                +{education.majorCourses.length - 4}
              </Badge>
            )}
          </div>
        </div>
      )}

      {/* Achievements */}
      {education.achievements && education.achievements.length > 0 && (
        <div>
          <p className="text-sm font-medium mb-2">Achievements:</p>
          <ul className={`text-sm space-y-1 list-disc list-inside ${isDarkMode ? "text-gray-400" : "text-gray-600"
            }`}>
            {education.achievements.slice(0, 3).map((achievement, index) => (
              <li key={index}>{achievement}</li>
            ))}
          </ul>
        </div>
      )}
    </Card>
  );
};

export default EducationCard;