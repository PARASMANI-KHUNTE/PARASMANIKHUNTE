import React, { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import EducationCard from "../components/EducationCard";
import { GraduationCap, Award, BookOpen } from "lucide-react";
import api from '../api';
import ThreeBackground from "../components/ThreeBackground";

const Education = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [educationList, setEducationList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEducation = async () => {
      try {
        const { data } = await api.get('/education');
        setEducationList(data);
      } catch (error) {
        console.error("Failed to load education");
      } finally {
        setLoading(false);
      }
    };
    fetchEducation();
  }, []);

  useEffect(() => {
    if (inView) controls.start("visible");
  }, [controls, inView]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
  };

  // Separate formal education and certifications if needed (assuming type property exists or just display all)
  // The current backend model might not distinguish types yet, so we'll just list them.
  // If we want to separate, we should ensure the backend provides a 'type' field.
  // For now, let's treat all as Education entries.

  return (
    <section className="min-h-screen relative py-20 px-6 overflow-hidden bg-gray-950">
      <ThreeBackground />

      <div className="container mx-auto max-w-6xl relative z-10">
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
            <GraduationCap className="h-8 w-8 text-indigo-400" />
          </motion.div>

          <h2 className="text-4xl md:text-5xl font-bold text-white font-space-grotesk tracking-tight">
            Education & <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400 text-glow">Certifications</span>
          </h2>

          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "80px" }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="h-1 mx-auto mt-6 mb-6 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500"
          />

          <p className="text-lg max-w-2xl mx-auto text-gray-400">
            My academic journey, qualifications, and professional certifications.
          </p>
        </motion.div>

        {loading ? (
          <div className="text-center py-20 text-xl text-indigo-400 animate-pulse">Loading Education...</div>
        ) : (
          <motion.div
            ref={ref}
            variants={containerVariants}
            initial="hidden"
            animate={controls}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-16"
          >
            {educationList.map((education, index) => (
              <EducationCard key={index} education={education} />
            ))}
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="mt-16 rounded-2xl p-8 bg-white/5 border border-white/10 backdrop-blur-md relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl -translate-y-32 translate-x-32" />
          <div className="flex items-center gap-4 mb-4 relative z-10">
            <div className="p-3 rounded-lg bg-indigo-500/20 text-indigo-400">
              <BookOpen className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold text-white font-space-grotesk">
              Continuous Learning
            </h3>
          </div>
          <p className="text-gray-400 relative z-10 leading-relaxed">
            I'm passionate about continuous learning and regularly take online courses to stay current with the latest technologies and industry best practices. I believe that education is a lifelong journey.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Education;