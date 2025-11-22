import React from "react";
import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";
import Hero3D from "../components/Hero3D";
import {
  ArrowRight,
  Github,
  Linkedin,
  Mail,
  Code2,
  Database,
  Layout,
  Server,
  Cpu,
  Globe
} from "lucide-react";
import { Link } from "react-router-dom";

const Home = () => {
  const { isDarkMode } = useTheme();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen flex flex-col gap-20 py-10">

      {/* Hero Section */}
      <section className="relative grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-8 z-10"
        >
          <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 text-sm font-medium border border-primary-100 dark:border-primary-800">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-500"></span>
            </span>
            Available for new projects
          </motion.div>

          <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl font-bold tracking-tight leading-tight">
            Building <span className="text-gradient">Digital</span> <br />
            Experiences.
          </motion.h1>

          <motion.p variants={itemVariants} className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-lg leading-relaxed">
            I'm Parasmani Khunte, a Full Stack Developer passionate about creating intuitive, scalable, and beautiful web applications.
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-wrap gap-4">
            <Link to="/projects" className="btn btn-primary group">
              View Projects
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <a href="https://github.com/PARASMANI-KHUNTE" target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
              <Github className="w-5 h-5" />
              GitHub
            </a>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="relative h-[400px] lg:h-[600px] w-full flex items-center justify-center"
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-primary-500/20 to-accent-500/20 rounded-full blur-3xl -z-10 animate-pulse"></div>
          <Hero3D />
        </motion.div>
      </section>

      {/* Bento Grid Skills Section */}
      <section className="space-y-10">
        <div className="flex flex-col items-center text-center space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold">What I Do</h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl">
            I combine technical expertise with design thinking to build comprehensive solutions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Frontend */}
          <motion.div
            whileHover={{ y: -5 }}
            className="glass-card p-8 md:col-span-2 flex flex-col justify-between relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <Layout size={120} />
            </div>
            <div className="space-y-4 relative z-10">
              <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
                <Layout size={24} />
              </div>
              <h3 className="text-2xl font-bold">Frontend Development</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Crafting responsive, interactive, and accessible user interfaces using modern frameworks like React, Next.js, and Tailwind CSS.
              </p>
              <div className="flex flex-wrap gap-2 mt-4">
                {['React', 'Next.js', 'TypeScript', 'Tailwind', 'Framer Motion'].map(tech => (
                  <span key={tech} className="px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-xs font-medium">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Card 2: Backend */}
          <motion.div
            whileHover={{ y: -5 }}
            className="glass-card p-8 flex flex-col justify-between relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <Server size={100} />
            </div>
            <div className="space-y-4 relative z-10">
              <div className="w-12 h-12 rounded-xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 dark:text-purple-400">
                <Server size={24} />
              </div>
              <h3 className="text-2xl font-bold">Backend</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Building robust APIs and scalable server-side architectures.
              </p>
              <div className="flex flex-wrap gap-2 mt-4">
                {['Node.js', 'Express', 'Python', 'Django'].map(tech => (
                  <span key={tech} className="px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-xs font-medium">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Card 3: Database */}
          <motion.div
            whileHover={{ y: -5 }}
            className="glass-card p-8 flex flex-col justify-between relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <Database size={100} />
            </div>
            <div className="space-y-4 relative z-10">
              <div className="w-12 h-12 rounded-xl bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600 dark:text-green-400">
                <Database size={24} />
              </div>
              <h3 className="text-2xl font-bold">Database</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Designing efficient data schemas and managing storage solutions.
              </p>
              <div className="flex flex-wrap gap-2 mt-4">
                {['MongoDB', 'PostgreSQL', 'Redis'].map(tech => (
                  <span key={tech} className="px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-xs font-medium">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Card 4: Other Tech */}
          <motion.div
            whileHover={{ y: -5 }}
            className="glass-card p-8 md:col-span-2 flex flex-col justify-between relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <Cpu size={120} />
            </div>
            <div className="space-y-4 relative z-10">
              <div className="w-12 h-12 rounded-xl bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center text-orange-600 dark:text-orange-400">
                <Cpu size={24} />
              </div>
              <h3 className="text-2xl font-bold">Emerging Tech</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Exploring the frontiers of technology with Machine Learning and IoT integration.
              </p>
              <div className="flex flex-wrap gap-2 mt-4">
                {['Machine Learning', 'IoT', 'Git', 'Docker', 'AWS'].map(tech => (
                  <span key={tech} className="px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-xs font-medium">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="glass-card p-12 text-center space-y-6 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-primary-500/10 to-accent-500/10 z-0"></div>
          <div className="relative z-10 max-w-2xl mx-auto space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold">Ready to start a project?</h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              Let's collaborate and bring your ideas to life with cutting-edge technology and design.
            </p>
            <Link to="/contact" className="btn btn-primary text-lg px-8 py-3">
              Let's Talk
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;