import React from "react";
import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";
import ThreeBackground from "../components/ThreeBackground";
import GlassCard from "../components/ui/GlassCard";
import GlowButton from "../components/ui/GlowButton";
import { Download, Mail, Github, Linkedin, Instagram } from "lucide-react";

const Home = () => {
  const { isDarkMode } = useTheme();

  const handleHireMeClick = () => {
    window.location.href = "mailto:parasmanikhunte@gmail.com?subject=Job Opportunity";
  };

  const handleDownloadCV = () => {
    const link = document.createElement("a");
    link.href = "/ParasmaniKhunteResume.pdf";
    link.download = "PARASMANI_KHUNTE_CV.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gray-950 text-white selection:bg-indigo-500/30">
      <ThreeBackground />

      {/* Cosmic Gradient Blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-[100px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 container mx-auto px-6 py-20 flex flex-col items-center justify-center min-h-screen">

        {/* HERO SECTION */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center max-w-4xl mx-auto mb-20"
        >
          <motion.div variants={itemVariants} className="mb-6 inline-block">
            <span className="px-4 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 text-sm font-medium tracking-wide">
              AVAILABLE FOR WORK
            </span>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-6xl md:text-8xl font-bold mb-6 tracking-tight font-space-grotesk"
          >
            I build <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400 text-glow">digital</span> <br />
            experiences.
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed"
          >
            Full Stack Developer specializing in building exceptional digital experiences.
            Merging technical expertise with creative design.
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center">
            <GlowButton onClick={handleHireMeClick} icon={Mail}>Hire Me</GlowButton>
            <GlowButton variant="secondary" onClick={handleDownloadCV} icon={Download}>Download CV</GlowButton>
          </motion.div>
        </motion.div>

        {/* BENTO GRID SKILLS */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-6xl mb-24"
        >
          <h2 className="text-3xl font-bold mb-10 text-center font-space-grotesk"><span className="text-indigo-400">01.</span> Expertise</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <GlassCard className="md:col-span-2 hover:bg-indigo-900/10 transition-colors">
              <h3 className="text-2xl font-bold mb-4 text-indigo-300">Frontend Engineering</h3>
              <p className="text-gray-400 mb-4">Crafting responsive, high-performance user interfaces with modern React ecosystems.</p>
              <div className="flex flex-wrap gap-2">
                {['React', 'Next.js', 'Tailwind', 'Three.js', 'Framer Motion', 'Redux'].map(tech => (
                  <span key={tech} className="px-3 py-1 bg-white/5 rounded-lg text-sm border border-white/5">{tech}</span>
                ))}
              </div>
            </GlassCard>

            <GlassCard className="hover:bg-purple-900/10 transition-colors">
              <h3 className="text-2xl font-bold mb-4 text-purple-300">Backend Systems</h3>
              <p className="text-gray-400 mb-4">Scalable server-side architectures.</p>
              <div className="flex flex-wrap gap-2">
                {['Node.js', 'Express', 'MongoDB', 'PostgreSQL', 'Redis'].map(tech => (
                  <span key={tech} className="px-3 py-1 bg-white/5 rounded-lg text-sm border border-white/5">{tech}</span>
                ))}
              </div>
            </GlassCard>

            <GlassCard className="md:col-span-3 flex flex-col md:flex-row items-center justify-between gap-6 hover:bg-cyan-900/10 transition-colors">
              <div className="text-left">
                <h3 className="text-2xl font-bold mb-2 text-cyan-300">AI & Cloud Integration</h3>
                <p className="text-gray-400">Leveraging LLMs and Cloud Services for smart applications.</p>
              </div>
              <div className="flex gap-3">
                {['Gemini API', 'OpenAI', 'AWS', 'Docker', 'Firebase'].map(tech => (
                  <span key={tech} className="px-3 py-1 bg-white/5 rounded-lg text-sm border border-white/5">{tech}</span>
                ))}
              </div>
            </GlassCard>
          </div>
        </motion.div>

        {/* SOCIALS */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="flex gap-6 mt-10"
        >
          {[
            { icon: Github, href: "https://github.com/PARASMANI-KHUNTE" },
            { icon: Linkedin, href: "https://www.linkedin.com/in/parasmani-khunte-330488228/" },
            { icon: Instagram, href: "https://www.instagram.com/ll.__.p.a.r.a.s.__.ll/" }
          ].map((social, i) => (
            <a
              key={i}
              href={social.href}
              target="_blank"
              rel="noreferrer"
              className="p-3 rounded-full bg-white/5 hover:bg-white/10 hover:text-indigo-400 transition-all border border-white/5"
            >
              <social.icon size={24} />
            </a>
          ))}
        </motion.div>

      </div>
    </div>
  );
};

export default Home;