import React, { useState } from "react";
import { motion, AnimatePresence, useMotionTemplate, useMotionValue } from "framer-motion";
import { useTheme } from "../context/ThemeContext";
import BackgroundParticles from "../components/common/BackgroundParticles";
import {
  Code2,
  Terminal,
  Layout,
  Server,
  Database,
  BrainCircuit,
  Cloud,
  Wrench,
  ChevronRight
} from "lucide-react";

// Helper to assign levels. Cloud skills = beginner (~30-45). Others = intermediate/advanced (~75-95).
const skillCategories = [
  {
    id: "languages",
    title: "Languages",
    icon: Code2,
    color: "from-blue-500 to-cyan-400",
    shadow: "shadow-cyan-500/20",
    skills: [
      { name: "JavaScript", level: 90 },
      { name: "TypeScript", level: 85 },
      { name: "Java", level: 85 },
      { name: "Python", level: 80 },
      { name: "SQL", level: 80 }
    ]
  },
  {
    id: "cscore",
    title: "CS Core",
    icon: Terminal,
    color: "from-purple-500 to-fuchsia-400",
    shadow: "shadow-fuchsia-500/20",
    skills: [
      { name: "DSA", level: 85 },
      { name: "OOP", level: 90 },
      { name: "DBMS", level: 85 },
      { name: "OS", level: 75 },
      { name: "Computer Networks", level: 75 },
      { name: "System Design Basics", level: 70 }
    ]
  },
  {
    id: "frontend",
    title: "Frontend",
    icon: Layout,
    color: "from-orange-500 to-amber-400",
    shadow: "shadow-amber-500/20",
    skills: [
      { name: "React", level: 95 },
      { name: "Next.js", level: 85 },
      { name: "React Native", level: 85 },
      { name: "Vite", level: 90 },
      { name: "Tailwind CSS", level: 95 },
      { name: "Redux / Zustand", level: 85 },
      { name: "Framer Motion", level: 75 },
      { name: "Responsive UI", level: 90 }
    ]
  },
  {
    id: "backend",
    title: "Backend",
    icon: Server,
    color: "from-green-500 to-emerald-400",
    shadow: "shadow-emerald-500/20",
    skills: [
      { name: "Node.js", level: 90 },
      { name: "Express", level: 90 },
      { name: "REST APIs", level: 95 },
      { name: "WebSockets/Socket.io", level: 85 },
      { name: "JWT / OAuth", level: 90 },
      { name: "API Security", level: 80 },
      { name: "Rate Limiting", level: 85 },
      { name: "Zod Validation", level: 85 },
      { name: "Queues / Redis", level: 75 },
      { name: "Microservices", level: 70 }
    ]
  },
  {
    id: "databases",
    title: "Databases & Data",
    icon: Database,
    color: "from-red-500 to-rose-400",
    shadow: "shadow-rose-500/20",
    skills: [
      { name: "MongoDB", level: 95 },
      { name: "PostgreSQL", level: 80 },
      { name: "MySQL", level: 80 },
      { name: "Redis", level: 80 },
      { name: "Schema Design", level: 85 },
      { name: "Indexing", level: 75 },
      { name: "Geospatial Queries", level: 70 },
      { name: "Pandas", level: 75 },
      { name: "Data Visualization", level: 70 }
    ]
  },
  {
    id: "aiml",
    title: "AI & ML",
    icon: BrainCircuit,
    color: "from-indigo-500 to-violet-400",
    shadow: "shadow-violet-500/20",
    skills: [
      { name: "Machine Learning", level: 75 },
      { name: "NLP", level: 70 },
      { name: "Computer Vision", level: 70 },
      { name: "TensorFlow / PyTorch", level: 65 },
      { name: "RAG Pipelines", level: 85 },
      { name: "Vector Search", level: 85 },
      { name: "LangGraph", level: 80 },
      { name: "Ollama", level: 85 },
      { name: "Prompt Engineering", level: 90 }
    ]
  },
  {
    id: "cloud",
    title: "Cloud & DevOps",
    icon: Cloud,
    color: "from-sky-500 to-blue-400",
    shadow: "shadow-sky-500/20",
    skills: [
      { name: "AWS Basics", level: 40 },
      { name: "EC2 & S3", level: 45 },
      { name: "Lambda", level: 35 },
      { name: "API Gateway", level: 35 },
      { name: "Docker", level: 45 },
      { name: "Kubernetes Basics", level: 30 },
      { name: "CI/CD & GitHub Actions", level: 45 },
      { name: "Render / Vercel", level: 85 },
      { name: "Firebase", level: 70 },
      { name: "Cloudinary", level: 85 }
    ]
  },
  {
    id: "tools",
    title: "Tools & Pro",
    icon: Wrench,
    color: "from-slate-500 to-gray-400",
    shadow: "shadow-gray-500/20",
    skills: [
      { name: "Git & GitHub", level: 90 },
      { name: "Postman", level: 95 },
      { name: "Linux / Bash", level: 75 },
      { name: "Cursor / Copilot", level: 95 },
      { name: "Technical Docs", level: 85 },
      { name: "Problem-solving", level: 90 }
    ]
  }
];

const getProficiencyText = (level) => {
  if (level < 50) return "Beginner";
  if (level < 80) return "Intermediate";
  return "Advanced";
};

// Spotlight wrapper with progress bar
const SpotlightCard = ({ skill, isDarkMode, colorClass }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  const profText = getProficiencyText(skill.level);

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      className={`group relative overflow-hidden rounded-2xl border ${
        isDarkMode 
          ? "border-gray-700 bg-gray-800/40" 
          : "border-amber-200 bg-white/60"
      } p-5 shadow-lg backdrop-blur-sm w-full md:w-[calc(50%-0.5rem)] lg:w-[calc(33.333%-0.667rem)]`}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              250px circle at ${mouseX}px ${mouseY}px,
              ${isDarkMode ? 'rgba(255,255,255,0.08)' : 'rgba(245,158,11,0.1)'},
              transparent 80%
            )
          `,
        }}
      />
      
      <div className="relative z-10 flex flex-col h-full justify-between">
        <div className="flex justify-between items-start mb-4">
          <span className={`font-bold text-lg leading-tight ${isDarkMode ? "text-gray-100" : "text-gray-900"}`}>
            {skill.name}
          </span>
          <span className={`text-[10px] uppercase tracking-wider font-bold px-2 py-1 rounded-md ${
            profText === 'Beginner' ? (isDarkMode ? 'bg-blue-500/20 text-blue-400' : 'bg-blue-100 text-blue-700') :
            profText === 'Intermediate' ? (isDarkMode ? 'bg-amber-500/20 text-amber-400' : 'bg-amber-100 text-amber-700') :
            (isDarkMode ? 'bg-emerald-500/20 text-emerald-400' : 'bg-emerald-100 text-emerald-700')
          }`}>
            {profText}
          </span>
        </div>
        
        <div className="w-full">
          <div className="flex justify-between items-end mb-1">
            <span className={`text-xs font-medium ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
              Proficiency
            </span>
            <span className={`text-xs font-bold bg-clip-text text-transparent bg-gradient-to-r ${colorClass}`}>
              {skill.level}%
            </span>
          </div>
          
          <div className={`h-1.5 w-full rounded-full overflow-hidden ${isDarkMode ? "bg-gray-700" : "bg-gray-200"}`}>
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${skill.level}%` }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.1 }}
              className={`h-full rounded-full bg-gradient-to-r ${colorClass}`}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Skills = () => {
  const { isDarkMode } = useTheme();
  const [activeCategory, setActiveCategory] = useState(skillCategories[0]);

  return (
    <div className={`min-h-screen relative overflow-hidden pt-32 pb-16 px-6 ${
      isDarkMode ? "bg-gray-900 text-white" : "bg-gradient-to-br from-amber-50 to-white text-gray-800"
    }`}>
      
      {/* Background Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <BackgroundParticles />
        <div className={`absolute blur -top-32 -right-32 w-96 h-96 rounded-full ${isDarkMode ? "bg-amber-900/10" : "bg-amber-200/30"}`}></div>
        <div className={`absolute blur top-1/2 -left-32 w-80 h-80 rounded-full ${isDarkMode ? "bg-blue-900/10" : "bg-blue-100/40"}`}></div>
      </div>

      <div className="container mx-auto max-w-7xl relative z-10 flex flex-col lg:flex-row gap-12">
        
        {/* Left Column: Title & Category Selector */}
        <div className="w-full lg:w-1/3 flex flex-col shrink-0">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-10"
          >
            <h1 className={`text-5xl md:text-6xl font-extrabold mb-4 tracking-tight`}>
              My <span className={`text-transparent bg-clip-text bg-gradient-to-r ${isDarkMode ? "from-amber-400 to-amber-600" : "from-amber-500 to-orange-600"}`}>Arsenal</span>
            </h1>
            <p className={`text-lg ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
              The tools, frameworks, and languages I use to build scalable, high-performance systems.
            </p>
          </motion.div>

          <div className="flex flex-col gap-3">
            {skillCategories.map((cat, idx) => {
              const isActive = activeCategory.id === cat.id;
              return (
                <motion.button
                  key={cat.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  onClick={() => setActiveCategory(cat)}
                  className={`relative flex items-center justify-between w-full px-5 py-4 rounded-2xl transition-all duration-300 overflow-hidden ${
                    isActive 
                      ? isDarkMode 
                        ? "bg-gray-800/80 border-gray-600 shadow-xl" 
                        : "bg-white border-amber-200 shadow-[0_10px_30px_rgba(245,158,11,0.15)]"
                      : isDarkMode
                        ? "hover:bg-gray-800/40 border-transparent text-gray-400 hover:text-white"
                        : "hover:bg-white/50 border-transparent text-gray-500 hover:text-gray-900"
                  } border backdrop-blur-sm group`}
                >
                  {/* Active Background Glow */}
                  {isActive && (
                    <motion.div 
                      layoutId="activeCategoryBg"
                      className={`absolute inset-0 opacity-10 bg-gradient-to-r ${cat.color}`}
                      initial={false}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}

                  <div className="flex items-center gap-4 relative z-10">
                    <div className={`p-2.5 rounded-xl transition-colors duration-300 ${
                      isActive 
                        ? `bg-gradient-to-br ${cat.color} text-white ${cat.shadow}` 
                        : isDarkMode ? "bg-gray-700/50" : "bg-amber-50"
                    }`}>
                      <cat.icon className="w-5 h-5" />
                    </div>
                    <span className={`text-lg font-bold ${isActive ? (isDarkMode ? "text-white" : "text-gray-900") : ""}`}>
                      {cat.title}
                    </span>
                  </div>
                  
                  <motion.div
                    animate={{ x: isActive ? 0 : -5, opacity: isActive ? 1 : 0 }}
                    className="relative z-10"
                  >
                    <ChevronRight className={`w-5 h-5 ${isDarkMode ? "text-amber-400" : "text-amber-500"}`} />
                  </motion.div>
                </motion.button>
              )
            })}
          </div>
        </div>

        {/* Right Column: Skill Display Area */}
        <div className="w-full lg:w-2/3 flex flex-col min-h-[600px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory.id}
              initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -30, filter: "blur(10px)" }}
              transition={{ duration: 0.4, type: "spring", bounce: 0 }}
              className={`relative p-6 md:p-10 rounded-3xl border backdrop-blur-xl shadow-2xl h-full flex flex-col ${
                isDarkMode 
                  ? "bg-gray-800/50 border-gray-700" 
                  : "bg-white/70 border-amber-100"
              }`}
            >
              {/* Massive background icon for flair */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.02] pointer-events-none">
                <activeCategory.icon className="w-[30rem] h-[30rem]" />
              </div>

              <div className="relative z-10 flex-grow">
                <div className="flex items-center gap-4 mb-8">
                  <div className={`p-4 rounded-2xl bg-gradient-to-br ${activeCategory.color} ${activeCategory.shadow} text-white`}>
                    <activeCategory.icon className="w-8 h-8" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-extrabold">{activeCategory.title}</h2>
                    <p className={`mt-1 ${isDarkMode ? "text-gray-400" : "text-amber-600/80"}`}>
                      {activeCategory.skills.length} technical proficiencies
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-4">
                  <AnimatePresence>
                    {activeCategory.skills.map((skill, index) => (
                      <SpotlightCard 
                        key={`${activeCategory.id}-${skill.name}`}
                        skill={skill}
                        isDarkMode={isDarkMode}
                        colorClass={activeCategory.color}
                      />
                    ))}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
};

export default Skills;
