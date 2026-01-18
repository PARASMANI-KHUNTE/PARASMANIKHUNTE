import React, { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import ExperienceCard from "../components/ExperienceCard";
import { Briefcase, ChevronDown } from "lucide-react";
import api from '../api';
import ThreeBackground from "../components/ThreeBackground";

const Experience = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExperience = async () => {
      try {
        const { data } = await api.get('/experience');
        setExperiences(data);
      } catch (error) {
        console.error("Failed to load experience");
      } finally {
        setLoading(false);
      }
    };
    fetchExperience();
  }, []);

  useEffect(() => {
    if (inView) controls.start("visible");
  }, [controls, inView]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100, damping: 15 } }
  };

  return (
    <section className="min-h-screen relative py-20 px-6 overflow-hidden bg-gray-950">
      <ThreeBackground />

      <div className="container mx-auto max-w-4xl relative z-10">
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
            className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-white/5 border border-white/10 shadow-[0_0_30px_rgba(99,102,241,0.3)]"
          >
            <Briefcase className="h-8 w-8 text-indigo-400" />
          </motion.div>

          <h2 className="text-4xl md:text-5xl font-bold text-white font-space-grotesk tracking-tight">
            Work <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400 text-glow">Experience</span>
          </h2>

          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "80px" }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="h-1 mx-auto mt-6 mb-6 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500"
          />

          <p className="text-lg max-w-2xl mx-auto text-gray-400">
            A glimpse of my professional journey in the industry, showcasing roles that have shaped my expertise.
          </p>
        </motion.div>

        {loading ? (
          <div className="text-center py-20 text-xl text-indigo-400 animate-pulse">Loading Experience...</div>
        ) : (
          <motion.div
            ref={ref}
            variants={containerVariants}
            initial="hidden"
            animate={controls}
            className="space-y-12 relative"
          >
            {/* Timeline Connector */}
            <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-0.5 md:-translate-x-1/2 bg-white/10 ml-6 md:ml-0" />

            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className={`flex flex-col ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"} relative pl-16 md:pl-0`}
              >
                <div className={`md:w-1/2 flex justify-start ${index % 2 === 0 ? "md:justify-end md:pr-12 md:text-right" : "md:justify-start md:pl-12"} relative mb-4 md:mb-0`}>
                  <motion.div
                    whileHover={{ scale: 1.2 }}
                    className="absolute left-[-2.5rem] md:left-auto md:right-[-0.6rem] top-0 h-5 w-5 rounded-full border-4 border-gray-900 bg-indigo-500 z-10"
                    style={index % 2 !== 0 ? { right: 'auto', left: '-0.6rem' } : {}}
                  />
                  <div className="font-bold text-xl text-indigo-400">
                    {exp.years || exp.duration}
                  </div>
                </div>

                <div className={`md:w-1/2 ${index % 2 === 0 ? "md:pl-12" : "md:pr-12"}`}>
                  <ExperienceCard experience={exp} />
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Experience;