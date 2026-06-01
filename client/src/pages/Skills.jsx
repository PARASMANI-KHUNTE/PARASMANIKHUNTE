import React from "react";
import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";
import { 
  Code2, 
  Terminal, 
  Layout, 
  Server, 
  Database, 
  BrainCircuit, 
  Cloud, 
  Wrench 
} from "lucide-react";

const skillCategories = [
  {
    title: "Languages",
    icon: Code2,
    skills: ["JavaScript", "TypeScript", "Java", "Python", "SQL"]
  },
  {
    title: "CS Core",
    icon: Terminal,
    skills: ["DSA", "OOP", "DBMS", "OS", "Computer Networks", "System Design Basics"]
  },
  {
    title: "Frontend",
    icon: Layout,
    skills: ["React", "Next.js", "React Native", "Vite", "Tailwind CSS", "Redux", "Zustand", "Framer Motion", "Responsive UI"]
  },
  {
    title: "Backend",
    icon: Server,
    skills: ["Node.js", "Express", "REST APIs", "WebSockets/Socket.io", "JWT", "Google OAuth", "API Security", "Rate Limiting", "Zod Validation", "Queues", "Microservices Basics"]
  },
  {
    title: "Databases & Data",
    icon: Database,
    skills: ["MongoDB", "PostgreSQL", "MySQL", "Redis", "Schema Design", "Indexing", "Geospatial Queries", "Pandas", "Data Preprocessing", "Data Visualization"]
  },
  {
    title: "AI/ML",
    icon: BrainCircuit,
    skills: ["Artificial Intelligence", "Machine Learning", "NLP", "Computer Vision", "Predictive Modeling", "Feature Engineering", "TensorFlow", "PyTorch", "Scikit-learn", "Statistics", "Neural Networks", "Model Evaluation", "Model Optimization", "RAG", "Vector Search", "LangGraph", "Ollama", "Prompt Engineering"]
  },
  {
    title: "Cloud/DevOps",
    icon: Cloud,
    skills: ["AWS Basics", "EC2", "S3", "IAM", "Lambda", "API Gateway", "VPC", "Load Balancer", "Docker", "Kubernetes Basics", "CI/CD", "GitHub Actions", "Render", "Vercel", "Firebase", "Cloudinary", "Serverless Basics", "Monitoring/Logging"]
  },
  {
    title: "Tools & Professional",
    icon: Wrench,
    skills: ["Git", "GitHub", "Postman", "Linux", "Bash", "Cursor", "GitHub Copilot", "Technical Documentation", "Analytical Thinking", "Problem-solving", "Curiosity"]
  }
];

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
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.5, ease: "easeOut" }
  }
};

const Skills = () => {
  const { isDarkMode } = useTheme();

  return (
    <div className={`min-h-screen pt-32 pb-16 px-6 ${isDarkMode ? "bg-gray-900 text-white" : "bg-gradient-to-br from-amber-50 to-white text-gray-800"}`}>
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className={`text-4xl md:text-5xl font-bold mb-4`}>
            Technical <span className={isDarkMode ? "text-amber-400" : "text-amber-500"}>Skills</span>
          </h1>
          <p className={`text-lg max-w-2xl mx-auto ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
            A comprehensive overview of my technical expertise, ranging from core computer science concepts to modern web development, AI, and cloud infrastructure.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
        >
          {skillCategories.map((category) => (
            <motion.div
              key={category.title}
              variants={itemVariants}
              whileHover={{ y: -5 }}
              className={`p-6 rounded-2xl backdrop-blur-md border transition-all duration-300 ${
                isDarkMode 
                  ? "bg-gray-800/40 border-gray-700 hover:border-amber-500/50 hover:shadow-[0_0_20px_rgba(245,158,11,0.1)]" 
                  : "bg-white/60 border-amber-100 hover:border-amber-300 hover:shadow-xl hover:shadow-amber-100"
              }`}
            >
              <div className="flex items-center gap-4 mb-6">
                <div className={`p-3 rounded-xl ${isDarkMode ? "bg-amber-400/10 text-amber-400" : "bg-amber-100 text-amber-600"}`}>
                  <category.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold">{category.title}</h3>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <span
                    key={skill}
                    className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${
                      isDarkMode
                        ? "bg-gray-700/50 text-gray-300 hover:bg-amber-500/20 hover:text-amber-400 border border-gray-600 hover:border-amber-500/30"
                        : "bg-amber-50 text-amber-800 hover:bg-amber-100 border border-amber-100 hover:border-amber-300"
                    }`}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Skills;
