import React, { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useTheme } from "../context/ThemeContext";
import ExperienceCard, { ExperienceGroupCard } from "../components/ExperienceCard";
import { Briefcase, ChevronDown, Building2, Plus, Loader2 } from "lucide-react";
import { getExperience } from "../services/api";

const Experience = () => {
  const { isDarkMode } = useTheme();
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });
  const [experienceData, setExperienceData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExperience = async () => {
      try {
        const { data } = await getExperience();
        setExperienceData(data);
      } catch (error) {
        console.error("Error fetching experience:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchExperience();
  }, []);

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  // Group experiences by company
  const grouped = experienceData.reduce((acc, exp) => {
    const key = exp.company;
    if (!acc[key]) acc[key] = [];
    acc[key].push(exp);
    return acc;
  }, {});
  const groupedList = Object.values(grouped);

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

  return (
    <div className="py-12 lg:py-20">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-500 to-accent-500 mb-6 shadow-lg"
        >
          <Briefcase className="w-8 h-8 text-white" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className={`text-4xl md:text-5xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}
        >
          Work <span className="gradient-text">Experience</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className={`text-lg ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}
        >
          A journey through my professional growth, showcasing the roles and companies that have shaped my expertise.
        </motion.p>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex justify-center items-center py-20">
          <Loader2 className="w-12 h-12 animate-spin text-primary-500" />
        </div>
      )}

      {/* Empty State */}
      {!loading && experienceData.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`max-w-md mx-auto text-center py-16 px-8 rounded-3xl ${isDarkMode
              ? "bg-gray-800/50 border border-gray-700"
              : "bg-white border border-gray-200 shadow-xl"
            }`}
        >
          <div className={`mx-auto w-20 h-20 rounded-full flex items-center justify-center mb-6 ${isDarkMode ? "bg-gray-700" : "bg-primary-50"}`}>
            <Building2 className={`w-10 h-10 ${isDarkMode ? "text-gray-500" : "text-primary-500"}`} />
          </div>
          <h3 className={`text-2xl font-bold mb-4 ${isDarkMode ? "text-white" : "text-gray-800"}`}>
            No Experience Added
          </h3>
          <p className={`mb-8 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
            Your professional journey will be displayed here once you add your work experience.
          </p>
        </motion.div>
      )}

      {/* Experience Timeline */}
      {!loading && experienceData.length > 0 && (
        <div className="max-w-5xl mx-auto px-4">
          <motion.div
            ref={ref}
            variants={containerVariants}
            initial="hidden"
            animate={controls}
            className="space-y-12 relative"
          >
            {/* Timeline Connector */}
            <div className={`absolute left-0 md:left-1/2 top-4 bottom-4 w-0.5 -translate-x-1/2 hidden md:block ${isDarkMode ? "bg-gray-800" : "bg-gray-200"}`} />

            {groupedList.map((roles, index) => {
              const first = roles[0];
              const isLeft = index % 2 === 0;

              return (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className={`flex flex-col md:flex-row gap-8 ${isLeft ? "" : "md:flex-row-reverse"}`}
                >
                  {/* Date / Timeline Dot */}
                  <div className={`md:w-1/2 flex md:items-start ${isLeft ? "md:justify-end md:text-right" : "md:justify-start md:text-left"}`}>
                    <div className="hidden md:block sticky top-24">
                      <div className={`text-xl font-bold mb-2 ${isDarkMode ? "text-primary-400" : "text-primary-600"}`}>
                        {first.duration.split(" - ")[0]}
                      </div>
                    </div>

                    {/* Mobile Date */}
                    <div className="md:hidden mb-2">
                      <span className={`text-sm font-bold px-3 py-1 rounded-full ${isDarkMode ? "bg-primary-900/30 text-primary-400" : "bg-primary-100 text-primary-700"}`}>
                        {first.duration.split(" - ")[0]}
                      </span>
                    </div>
                  </div>

                  {/* Timeline Dot (Center) */}
                  <div className="absolute left-1/2 -translate-x-1/2 hidden md:flex items-center justify-center w-8 h-8">
                    <div className={`w-4 h-4 rounded-full border-4 ${isDarkMode ? "border-gray-900 bg-primary-500" : "border-white bg-primary-500 shadow-sm"}`} />
                  </div>

                  {/* Card Content */}
                  <div className="md:w-1/2">
                    {roles.length === 1 ? (
                      <ExperienceCard experience={first} />
                    ) : (
                      <ExperienceGroupCard company={first.company} logoUrl={first.logoUrl} companyUrl={first.companyUrl} roles={roles} />
                    )}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Experience;