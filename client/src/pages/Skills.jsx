import React, { useState, useMemo } from "react";
import { motion, AnimatePresence, useMotionTemplate, useMotionValue } from "framer-motion";
import { useTheme } from "../context/ThemeContext";
import BackgroundParticles from "../components/common/BackgroundParticles";
import {
  Cpu,
  Code2,
  Server,
  BrainCircuit,
  Database,
  Cloud,
  Terminal,
  Search,
  Zap,
  CheckCircle2,
  Sparkles,
  Layers,
  Activity,
  Workflow
} from "lucide-react";

// Curated skill domains aligned with Resume Technical Skills
const skillDomains = [
  {
    id: "languages",
    title: "Programming Languages",
    category: "Languages",
    icon: Code2,
    tagline: "Core algorithmic foundations & multi-paradigm software development",
    skills: [
      { name: "JavaScript", level: "Production", highlight: true },
      { name: "TypeScript", level: "Production", highlight: true },
      { name: "Python", level: "Advanced", highlight: true },
      { name: "SQL", level: "Advanced", highlight: true },
      { name: "Java", level: "Proficient", highlight: false },
      { name: "C", level: "Proficient", highlight: false }
    ]
  },
  {
    id: "backend",
    title: "Backend Engineering",
    category: "Backend",
    icon: Server,
    tagline: "Scalable REST APIs, event-driven services, microservices & authentication",
    skills: [
      { name: "Node.js", level: "Production", highlight: true },
      { name: "Express.js", level: "Production", highlight: true },
      { name: "REST APIs", level: "Production", highlight: true },
      { name: "WebSockets / Socket.io", level: "Production", highlight: true },
      { name: "JWT Authentication", level: "Production", highlight: true },
      { name: "Google OAuth", level: "Production", highlight: true },
      { name: "Microservices Architecture", level: "Advanced", highlight: true },
      { name: "Rate Limiting & Security", level: "Advanced", highlight: false }
    ]
  },
  {
    id: "frontend-mobile",
    title: "Frontend & Mobile",
    category: "Frontend & Mobile",
    icon: Layers,
    tagline: "Reactive component ecosystems, mobile apps & performance-tuned styling",
    skills: [
      { name: "React", level: "Production", highlight: true },
      { name: "Next.js", level: "Advanced", highlight: true },
      { name: "React Native", level: "Advanced", highlight: true },
      { name: "Tailwind CSS", level: "Production", highlight: true },
      { name: "Redux", level: "Advanced", highlight: true },
      { name: "Vite", level: "Production", highlight: true }
    ]
  },
  {
    id: "databases-queues",
    title: "Databases & Queues",
    category: "Databases & Queues",
    icon: Database,
    tagline: "High-throughput persistence, in-memory caching & distributed event streams",
    skills: [
      { name: "MongoDB", level: "Production", highlight: true },
      { name: "PostgreSQL", level: "Advanced", highlight: true },
      { name: "Redis", level: "Production", highlight: true },
      { name: "Redis Streams", level: "Advanced", highlight: true },
      { name: "BullMQ", level: "Advanced", highlight: true },
      { name: "Geospatial Queries", level: "Advanced", highlight: false }
    ]
  },
  {
    id: "ai-llm",
    title: "AI / LLM Engineering",
    category: "AI / LLM",
    icon: BrainCircuit,
    tagline: "Retrieval-augmented generation, vector similarity & local model inference",
    skills: [
      { name: "RAG Pipelines", level: "Advanced", highlight: true },
      { name: "Vector Search", level: "Advanced", highlight: true },
      { name: "Qdrant", level: "Advanced", highlight: true },
      { name: "FAISS", level: "Advanced", highlight: true },
      { name: "Ollama", level: "Advanced", highlight: true },
      { name: "Groq API", level: "Production", highlight: true },
      { name: "Prompt Engineering", level: "Advanced", highlight: true },
      { name: "LLaVA (Vision)", level: "Proficient", highlight: false },
      { name: "Whisper (STT)", level: "Proficient", highlight: false },
      { name: "Qwen-TTS", level: "Proficient", highlight: false }
    ]
  },
  {
    id: "devops-tools",
    title: "DevOps & Tools",
    category: "DevOps & Tools",
    icon: Cloud,
    tagline: "Containerization, CI/CD pipelines, cloud infrastructure & distributed tracing",
    skills: [
      { name: "Docker", level: "Advanced", highlight: true },
      { name: "GitHub Actions", level: "Advanced", highlight: true },
      { name: "AWS EC2", level: "Advanced", highlight: true },
      { name: "AWS S3", level: "Advanced", highlight: true },
      { name: "OpenTelemetry", level: "Advanced", highlight: true },
      { name: "Vercel", level: "Production", highlight: true },
      { name: "Render", level: "Production", highlight: true },
      { name: "Cloudinary", level: "Production", highlight: true },
      { name: "Git", level: "Production", highlight: true },
      { name: "Postman", level: "Production", highlight: true },
      { name: "Linux", level: "Advanced", highlight: true }
    ]
  }
];

// Spotlight interactive card component matching portfolio theme
const DomainCard = ({ domain, isDarkMode, searchQuery }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  const IconComponent = domain.icon;

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      whileHover={{ y: -5 }}
      className={`group relative flex flex-col justify-between overflow-hidden rounded-3xl border transition-all duration-300 backdrop-blur-xl ${
        isDarkMode
          ? "bg-gray-800/40 border-gray-700/80 hover:border-amber-500/40 hover:shadow-2xl hover:shadow-black/50"
          : "bg-white/70 border-amber-100 hover:border-amber-300 hover:shadow-xl hover:shadow-amber-500/10"
      } p-6 md:p-8`}
    >
      {/* Subtle radial spotlight glow on hover */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              320px circle at ${mouseX}px ${mouseY}px,
              ${isDarkMode ? "rgba(245, 158, 11, 0.15)" : "rgba(245, 158, 11, 0.12)"},
              transparent 80%
            )
          `
        }}
      />

      <div className="relative z-10">
        {/* Card Header */}
        <div className="flex items-start justify-between gap-4 mb-5">
          <div className="flex items-center gap-3.5">
            <div
              className={`p-3 rounded-2xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110 ${
                isDarkMode
                  ? "bg-amber-500/10 text-amber-400 border border-amber-500/20 shadow-[0_0_15px_rgba(245,158,11,0.15)]"
                  : "bg-amber-50 text-amber-600 border border-amber-200/80 shadow-sm"
              }`}
            >
              <IconComponent className="w-6 h-6" />
            </div>
            <div>
              <h3 className={`text-xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                {domain.title}
              </h3>
              <p className={`text-xs mt-0.5 ${isDarkMode ? "text-amber-400/80" : "text-amber-600"}`}>
                {domain.skills.length} core technologies
              </p>
            </div>
          </div>
        </div>

        {/* Tagline / Architectural Description */}
        <p className={`text-sm mb-6 leading-relaxed ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
          {domain.tagline}
        </p>

        {/* Skills Pills Grid */}
        <div className="flex flex-wrap gap-2">
          {domain.skills.map((skill) => {
            const isMatch =
              searchQuery &&
              skill.name.toLowerCase().includes(searchQuery.toLowerCase());

            return (
              <motion.div
                key={skill.name}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.98 }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200 border ${
                  isMatch
                    ? "bg-amber-500 text-gray-950 font-bold border-amber-400 shadow-md"
                    : skill.highlight
                    ? isDarkMode
                      ? "bg-amber-500/10 text-amber-300 border-amber-500/30 hover:bg-amber-500/20"
                      : "bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100"
                    : isDarkMode
                    ? "bg-gray-800/80 text-gray-300 border-gray-700 hover:bg-gray-700/80 hover:text-white"
                    : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100"
                }`}
              >
                {skill.highlight && (
                  <Sparkles className={`w-3 h-3 shrink-0 ${isMatch ? "text-gray-900" : "text-amber-400"}`} />
                )}
                <span>{skill.name}</span>
                {skill.level === "Production" && (
                  <span
                    className={`ml-1 text-[9px] px-1.5 py-0.2 rounded-full font-bold uppercase tracking-wider ${
                      isDarkMode ? "bg-emerald-500/20 text-emerald-400" : "bg-emerald-100 text-emerald-700"
                    }`}
                  >
                    PROD
                  </span>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};

const Skills = () => {
  const { isDarkMode } = useTheme();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    "All",
    "Languages",
    "Backend",
    "Frontend & Mobile",
    "Databases & Queues",
    "AI / LLM",
    "DevOps & Tools"
  ];

  // Filter skills domains based on category and search query
  const filteredDomains = useMemo(() => {
    return skillDomains
      .filter((domain) => {
        if (selectedCategory === "All") return true;
        return domain.category === selectedCategory;
      })
      .filter((domain) => {
        if (!searchQuery.trim()) return true;
        const query = searchQuery.toLowerCase();
        const matchesDomain =
          domain.title.toLowerCase().includes(query) ||
          domain.tagline.toLowerCase().includes(query);
        const matchesSkills = domain.skills.some((s) =>
          s.name.toLowerCase().includes(query)
        );
        return matchesDomain || matchesSkills;
      });
  }, [selectedCategory, searchQuery]);

  return (
    <div
      className={`min-h-screen relative overflow-hidden py-24 px-6 transition-colors duration-500 ${
        isDarkMode
          ? "bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800 text-white"
          : "bg-gradient-to-br from-amber-50/70 via-white to-amber-50/50 text-gray-800"
      }`}
    >
      {/* Abstract background ambient particles & glows */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <BackgroundParticles count={20} />
        <div
          className={`absolute blur -top-32 -right-32 w-96 h-96 rounded-full ${
            isDarkMode ? "bg-amber-900/10" : "bg-amber-200/30"
          }`}
        />
        <div
          className={`absolute blur top-1/3 -left-20 w-80 h-80 rounded-full ${
            isDarkMode ? "bg-amber-800/10" : "bg-amber-100/50"
          }`}
        />
        <div
          className={`absolute blur bottom-1/4 right-1/4 w-72 h-72 rounded-full ${
            isDarkMode ? "bg-amber-700/10" : "bg-amber-300/20"
          }`}
        />
      </div>

      <div className="container mx-auto max-w-6xl relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          {/* Header Icon Circle */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 100, delay: 0.2 }}
            className={`mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full ${
              isDarkMode ? "bg-gray-800 border border-gray-700" : "bg-white shadow-md border border-amber-100"
            }`}
          >
            <Cpu className={`h-8 w-8 ${isDarkMode ? "text-amber-400" : "text-amber-500"}`} />
          </motion.div>

          <h1 className={`text-4xl md:text-5xl font-bold tracking-tight ${isDarkMode ? "text-white" : "text-gray-900"}`}>
            Technical <span className={isDarkMode ? "text-amber-400" : "text-amber-500"}>Arsenal</span>
          </h1>

          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "80px" }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className={`h-1 mx-auto mt-4 mb-3 rounded-full ${isDarkMode ? "bg-amber-400" : "bg-amber-500"}`}
          />

          {/* Badge Tag */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="mb-6"
          >
            <span
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full font-bold text-sm tracking-wide shadow-lg ${
                isDarkMode
                  ? "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                  : "bg-amber-50 text-amber-600 border border-amber-200"
              }`}
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
              </span>
              Full-Stack • Distributed Systems • Local LLM Pipelines
            </span>
          </motion.div>

          <p className={`text-lg max-w-2xl mx-auto leading-relaxed ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
            A comprehensive matrix of production languages, cloud architectures, AI models, and real-time infrastructure I engineer with.
          </p>
        </motion.div>

        {/* Featured Production Stack Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className={`mb-12 p-6 md:p-8 rounded-3xl border backdrop-blur-xl transition-all ${
            isDarkMode
              ? "bg-gray-800/30 border-gray-700 shadow-2xl"
              : "bg-white/60 border-amber-100 shadow-xl"
          }`}
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-3">
              <div className={`p-2.5 rounded-xl ${isDarkMode ? "bg-amber-400/10 text-amber-400" : "bg-amber-100 text-amber-600"}`}>
                <Zap className="w-5 h-5" />
              </div>
              <div>
                <h2 className={`text-lg font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                  Primary Production Stack
                </h2>
                <p className={`text-xs ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                  Battle-tested architectural pillars across live production deployments
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${
                isDarkMode ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" : "bg-emerald-50 text-emerald-700 border-emerald-200"
              }`}>
                ⚡ End-to-End Ready
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
            {[
              { title: "MERN Stack", subtitle: "React 19 & Node.js" },
              { title: "Real-Time Engine", subtitle: "Socket.io & Redis" },
              { title: "Local AI & RAG", subtitle: "Ollama & LangGraph" },
              { title: "Microservices", subtitle: "Redis Streams & Queues" },
              { title: "Observability", subtitle: "OpenTelemetry & Jaeger" },
              { title: "Containerization", subtitle: "Docker & Cloud Deploy" }
            ].map((pillar) => (
              <div
                key={pillar.title}
                className={`p-4 rounded-2xl text-center border transition-transform hover:scale-105 duration-300 ${
                  isDarkMode
                    ? "bg-gray-900/60 border-gray-700/60 hover:border-amber-500/30"
                    : "bg-white/80 border-amber-100 hover:border-amber-300 shadow-sm"
                }`}
              >
                <div className={`text-sm font-bold mb-1 ${isDarkMode ? "text-amber-400" : "text-amber-600"}`}>
                  {pillar.title}
                </div>
                <div className={`text-[11px] ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                  {pillar.subtitle}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Search Bar & Category Filter Bar */}
        <div className="mb-10 space-y-6">
          {/* Search Input */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="relative max-w-xl mx-auto"
          >
            <Search className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search technologies... (e.g., Redis, Ollama, Docker, React, Socket.io)"
              className={`w-full pl-12 pr-10 py-3.5 rounded-2xl text-sm font-medium transition-all outline-none border ${
                isDarkMode
                  ? "bg-gray-800/60 border-gray-700 focus:border-amber-400 text-white placeholder-gray-500 focus:shadow-[0_0_20px_rgba(245,158,11,0.15)]"
                  : "bg-white/80 border-amber-200 focus:border-amber-500 text-gray-800 placeholder-gray-400 focus:shadow-[0_0_20px_rgba(245,158,11,0.15)]"
              }`}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className={`absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold px-2 py-1 rounded-md ${
                  isDarkMode ? "bg-gray-700 text-gray-300 hover:text-white" : "bg-gray-200 text-gray-600 hover:text-black"
                }`}
              >
                Clear
              </button>
            )}
          </motion.div>

          {/* Category Filter Pills */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-wrap justify-center gap-2 md:gap-3"
          >
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-5 py-2.5 rounded-full text-xs md:text-sm font-semibold transition-all duration-300 cursor-pointer ${
                    isSelected
                      ? isDarkMode
                        ? "bg-amber-500 text-gray-900 shadow-lg shadow-amber-500/20 font-bold"
                        : "bg-amber-500 text-white shadow-lg shadow-amber-500/25 font-bold"
                      : isDarkMode
                      ? "bg-gray-800/60 text-gray-400 hover:text-white hover:bg-gray-700/60 border border-gray-700/60"
                      : "bg-white/70 text-gray-600 hover:text-gray-900 hover:bg-white border border-amber-100/80 shadow-sm"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </motion.div>
        </div>

        {/* Skills Grid */}
        <AnimatePresence mode="wait">
          {filteredDomains.length > 0 ? (
            <motion.div
              key={`${selectedCategory}-${searchQuery}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filteredDomains.map((domain) => (
                <DomainCard
                  key={domain.id}
                  domain={domain}
                  isDarkMode={isDarkMode}
                  searchQuery={searchQuery}
                />
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className={`p-12 text-center rounded-3xl border ${
                isDarkMode ? "bg-gray-800/30 border-gray-700" : "bg-white/60 border-amber-100"
              }`}
            >
              <div className={`w-14 h-14 mx-auto mb-4 rounded-2xl flex items-center justify-center ${isDarkMode ? "bg-gray-700 text-gray-400" : "bg-amber-50 text-amber-500"}`}>
                <Search className="w-7 h-7" />
              </div>
              <h3 className={`text-xl font-bold mb-2 ${isDarkMode ? "text-white" : "text-gray-800"}`}>
                No matching technologies found
              </h3>
              <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                Try adjusting your search query "{searchQuery}" or switch categories.
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("All");
                }}
                className={`mt-6 px-6 py-2.5 rounded-full text-xs font-bold transition-all ${
                  isDarkMode ? "bg-amber-400 text-gray-900 hover:bg-amber-300" : "bg-amber-500 text-white hover:bg-amber-600"
                }`}
              >
                Reset Filters
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Skills;
