import React from "react";
import { motion } from "framer-motion";
import { Briefcase, Calendar, MapPin, ExternalLink, FileText } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

const ExperienceCard = ({ experience, onPreview }) => {
  const { isDarkMode } = useTheme();

  // Helper to get logo URL for skills
  const getSkillLogo = (skill) => {
    const s = skill.toLowerCase().trim();
    if (s.includes("react")) return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg";
    if (s.includes("node")) return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg";
    if (s.includes("mongodb")) return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg";
    if (s.includes("express")) return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg"; // Note: Express usually needs dark/light handling but Devicon original is ok
    if (s.includes("python")) return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg";
    if (s.includes("redux")) return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg";
    if (s.includes("tailwind")) return "https://www.vectorlogo.zone/logos/tailwindcss/tailwindcss-icon.svg";
    if (s.includes("javascript") || s === "js") return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg";
    if (s.includes("typescript") || s === "ts") return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg";
    if (s.includes("html")) return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg";
    if (s.includes("css")) return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg";
    if (s.includes("django")) return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg";
    if (s.includes("git")) return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg";
    if (s.includes("frappe")) return "https://frappe.io/files/frappe-framework-logo.png"; // Fallback URL for Frappe
    if (s.includes("machine learning") || s.includes("ai")) return "https://www.vectorlogo.zone/logos/tensorflow/tensorflow-icon.svg"; // AI/ML general icon
    if (s.includes("jinja")) return "https://www.vectorlogo.zone/logos/pocoo_jinja/pocoo_jinja-icon.svg";
    if (s.includes("google maps") || s.includes("maps")) return "https://www.vectorlogo.zone/logos/google_maps/google_maps-icon.svg";
    return null;
  };

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

  const handleViewCertificate = () => {
    if (experience.certificateUrl) {
      if (onPreview) {
        onPreview(experience);
      } else {
        window.open(experience.certificateUrl, '_blank');
      }
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      whileHover="hover"
      variants={cardVariants}
      transition={{ type: "spring", stiffness: 100, damping: 15 }}
      className={`relative overflow-hidden rounded-xl ${isDarkMode
        ? "bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700"
        : "bg-gradient-to-br from-white to-gray-50 border-gray-100"
        } border p-6 shadow-lg`}
    >
      {/* Accent border */}
      <div className={`absolute left-0 top-0 h-full w-1 ${experience.isCurrent ? "bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]" : "bg-amber-500"}`}></div>

      {/* Company badge */}
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <motion.div
            variants={iconVariants}
            className={`flex h-12 w-12 items-center justify-center rounded-lg ${experience.isCurrent ? "bg-emerald-500/10 text-emerald-500" : "bg-amber-500/10 text-amber-500"
              }`}
          >
            <Briefcase className="h-6 w-6" />
          </motion.div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h3 className={`text-xl font-bold ${isDarkMode ? "text-white" : "text-gray-800"}`}>
                {experience.role}
              </h3>
              {experience.isCurrent && (
                <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-wider">Active</span>
                </div>
              )}
            </div>
            <p className={`font-medium ${experience.isCurrent ? (isDarkMode ? "text-emerald-400" : "text-emerald-600") : (isDarkMode ? "text-amber-400" : "text-amber-600")}`}>
              {experience.company}
            </p>
          </div>
        </div>

        <div className="flex gap-2">
          {experience.companyUrl && (
            <motion.a
              href={experience.companyUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              className={`flex h-8 w-8 items-center justify-center rounded-full ${isDarkMode ? "bg-gray-700 text-gray-300 hover:bg-gray-600" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}
              transition-colors`}
            >
              <ExternalLink className="h-4 w-4" />
            </motion.a>
          )}
        </div>
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
            {experience.skills.map((skill, index) => {
              const logo = getSkillLogo(skill);
              return (
                <span
                  key={index}
                  className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium border transition-colors ${isDarkMode
                    ? "bg-gray-800/50 text-gray-300 border-gray-700 hover:bg-gray-700"
                    : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50 shadow-sm"
                    }`}
                >
                  {logo && <img src={logo} alt={skill} className="w-3 h-3 object-contain" />}
                  {skill}
                </span>
              );
            })}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export const ExperienceGroupCard = ({ company, logoUrl, companyUrl, roles, onPreview }) => {
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

  // Helper to get logo URL for skills
  const getSkillLogo = (skill) => {
    const s = skill.toLowerCase().trim();
    if (s.includes("react")) return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg";
    if (s.includes("node")) return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg";
    if (s.includes("mongodb")) return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg";
    if (s.includes("express")) return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg"; // Note: Express usually needs dark/light handling but Devicon original is ok
    if (s.includes("python")) return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg";
    if (s.includes("redux")) return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg";
    if (s.includes("tailwind")) return "https://www.vectorlogo.zone/logos/tailwindcss/tailwindcss-icon.svg";
    if (s.includes("javascript") || s === "js") return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg";
    if (s.includes("typescript") || s === "ts") return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg";
    if (s.includes("html")) return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg";
    if (s.includes("css")) return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg";
    if (s.includes("django")) return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg";
    if (s.includes("git")) return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg";
    if (s.includes("frappe")) return "https://frappe.io/files/frappe-framework-logo.png"; // Fallback URL for Frappe
    if (s.includes("machine learning") || s.includes("ai")) return "https://www.vectorlogo.zone/logos/tensorflow/tensorflow-icon.svg"; // AI/ML general icon
    if (s.includes("jinja")) return "https://www.vectorlogo.zone/logos/pocoo_jinja/pocoo_jinja-icon.svg";
    if (s.includes("google maps") || s.includes("maps")) return "https://www.vectorlogo.zone/logos/google_maps/google_maps-icon.svg";
    return null;
  };

  // Check if all skills are the same
  const allSkills = roles.map(r => (r.skills || []).join(','));
  const showSkillsOnce = allSkills.every(s => s === allSkills[0]);
  const sharedSkills = roles[0]?.skills || [];

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      whileHover="hover"
      variants={cardVariants}
      transition={{ type: "spring", stiffness: 100, damping: 15 }}
      className={`relative overflow-hidden rounded-xl ${isDarkMode
        ? "bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700"
        : "bg-gradient-to-br from-white to-gray-50 border-gray-100"
        } border p-6 shadow-lg`}
    >
      {/* Accent border */}
      <div className={`absolute left-0 top-0 h-full w-0.5 ${roles.some(r => r.isCurrent) ? "bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]" : "bg-amber-500"}`}></div>
      {/* Company badge */}
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <motion.div
            variants={iconVariants}
            className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500/10"
          >
            {logoUrl ? (
              <img src={logoUrl} alt={company} className="w-7 h-7 object-contain" />
            ) : (
              <Briefcase className="h-5 w-5 text-amber-500" />
            )}
          </motion.div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className={`text-xl font-bold ${isDarkMode ? "text-white" : "text-gray-800"}`}>{company}</h3>
              {roles.some(r => r.isCurrent) && (
                <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-wider">Active Group</span>
                </div>
              )}
            </div>
            <p className={`font-medium ${roles.some(r => r.isCurrent) ? (isDarkMode ? "text-emerald-400" : "text-emerald-600") : (isDarkMode ? "text-amber-400" : "text-amber-600")}`}>{roles.length} roles</p>
          </div>
        </div>
        {companyUrl && (
          <motion.a
            href={companyUrl}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1 }}
            className={`flex h-8 w-8 items-center justify-center rounded-full ${isDarkMode ? "bg-gray-700 text-gray-300 hover:bg-gray-600" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}
            transition-colors`}
          >
            <ExternalLink className="h-4 w-4" />
          </motion.a>
        )}
      </div>

      {/* Timeline of roles */}
      <div className="relative flex">
        {/* Timeline column with vertical line */}
        <div className="relative flex-none w-6 mr-4">
          <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-amber-500 transform -translate-x-1/2 rounded-full"></div>
        </div>

        {/* Content column */}
        <div className="flex-1">
          {roles.map((role, idx) => (
            <div key={idx} className={`relative pb-8 ${idx === roles.length - 1 ? "" : "mb-2"}`}>
              {/* Timeline dot perfectly aligned with the vertical line */}
              <div className="absolute -left-10 mt-1.5" style={{ transform: 'translateX(3.75px)' }}>
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 15, delay: idx * 0.1 }}
                >
                  <div
                    className={`w-3.5 h-3.5 rounded-full border-2 ${isDarkMode ? "border-gray-900" : "border-white"} ${role.isCurrent ? "bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.6)]" : "bg-amber-400"} flex items-center justify-center shadow-md z-10`}
                    style={{ boxShadow: role.isCurrent ? '0 0 0 1.5px #10b981' : '0 0 0 1.5px #f59e0b' }}
                  />
                </motion.div>
              </div>

              {/* Role content */}
              <div>
                <div className="flex items-center justify-between">
                  <div className="font-semibold text-base">{role.role}</div>
                  <span className="text-xs text-gray-500">{role.duration}</span>
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">{role.location}</div>
                <div className="text-sm text-gray-700 dark:text-gray-300 mb-2">{role.description}</div>

                {/* Certificate button */}
                <button
                  onClick={() => onPreview && onPreview(role)}
                  className={`inline-flex items-center gap-1 px-3 py-1 rounded-full font-medium text-xs transition-colors duration-200 shadow-sm ${isDarkMode
                    ? "bg-emerald-500 text-gray-900 hover:bg-emerald-400"
                    : "bg-emerald-500 text-white hover:bg-emerald-600"
                    }`}
                >
                  <FileText className="h-3 w-3" /> Certificate
                </button>

                {/* Skills per role */}
                {!showSkillsOnce && role.skills && role.skills.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {role.skills.map((skill, skillIdx) => {
                      const logo = getSkillLogo(skill);
                      return (
                        <span
                          key={skillIdx}
                          className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium border transition-colors ${isDarkMode
                            ? "bg-gray-800/50 text-gray-300 border-gray-700 hover:bg-gray-700"
                            : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50 shadow-sm"
                            }`}
                        >
                          {logo && <img src={logo} alt={skill} className="w-3 h-3 object-contain" />}
                          {skill}
                        </span>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Shared skills at the bottom if all roles have the same skills */}
      {showSkillsOnce && sharedSkills.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-4 ml-10">
          {sharedSkills.map((skill, idx) => {
            const logo = getSkillLogo(skill);
            return (
              <span
                key={idx}
                className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium border transition-colors ${isDarkMode
                  ? "bg-gray-800/50 text-gray-300 border-gray-700 hover:bg-gray-700"
                  : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50 shadow-sm"
                  }`}
              >
                {logo && <img src={logo} alt={skill} className="w-3 h-3 object-contain" />}
                {skill}
              </span>
            );
          })}
        </div>
      )}
    </motion.div>
  );
};

export default ExperienceCard;