import React, { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useTheme } from "../context/ThemeContext";
import ExperienceCard, { ExperienceGroupCard } from "../components/ExperienceCard";
import { Briefcase, ChevronDown } from "lucide-react";

const experienceData = [
  {
    role: "Technical Intern",
    company: "hybrowlabs",
    companyUrl: "https://hybrowlabs.com/",
    logoUrl: "/logos/hybrowlabs.png",
    duration: "March 2025 - May 2025 · 3 mos",
    location: "Remote",
    description: "Developed scalable web applications using React and Frappe frameworks.",
    skills: ["React", "Redux", "Frappe", "Python", "React.js"],
    certificateUrl: "/certificates/hybrowlabs.pdf"
  },
  {
    role: "Full Stack Developer Freelancer",
    company: "Akkuraa it services",
    companyUrl: "https://internshala.com/company/akkuraa-it-services-1732513752/",
    logoUrl: "/akkuraItLogo.png",
    duration: "April 2025 - April 2025 · 1 mo",
    location: "Remote",
    description: "Developed scalable web applications using the MERN stack as a freelancer.",
    skills: ["React", "Node.js", "MongoDB", "Express", "Redux", "Machine Learning"],
    certificateUrl: "/certificates/akkuraa-freelancer.pdf"
  },
  {
    role: "Web Developer Intern",
    company: "Akkuraa it services",
    companyUrl: "https://internshala.com/company/akkuraa-it-services-1732513752/",
    logoUrl: "/akkuraItLogo.png",
    duration: "Jan 2025 - April 2025 · 4 mos",
    location: "Remote",
    description: "Developed scalable web applications using the MERN stack.",
    skills: ["React", "Node.js", "MongoDB", "Express", "Redux", "Machine Learning"],
    certificateUrl: "/IntershipCertificate.pdf"
  },
  {
    role: "Software Engineer Intern",
    company: "Bluestock™🔺",
    companyUrl: "https://bluestock.in/",
    logoUrl: "/logos/bluestock.png",
    duration: "Nov 2024 - Dec 2024 · 2 mos",
    location: "Remote",
    description: "Built modern UI/UX designs using HTML, CSS, JavaScript, and Jinja templates. Improved site performance by 40% through code optimization.",
    skills: ["Python", "Django", "CSS", "JavaScript", "HTML", "Jinja"],
    certificateUrl: "/certificates/bluestock.pdf"
  },
  {
    role: "Full Stack Developer Intern",
    company: "ELiteTech Intern",
    companyUrl: "https://www.linkedin.com/company/elite-tech-intern/posts/?feedView=all",
    logoUrl: "/logos/elitetech.png",
    duration: "Oct 2024 - Nov 2024 · 2 mos",
    location: "Remote",
    description: "Built a fully functional social media application 'Photoshare' leveraging React and Node.js. Focused on user engagement through post creation, updates, and interactivity features.",
    skills: ["React", "Tailwind CSS", "JavaScript", "Express", "MongoDB"],
    certificateUrl: "/certificates/elitetech.pdf"
  },
];

// Group experiences by company
const grouped = experienceData.reduce((acc, exp) => {
  const key = exp.company;
  if (!acc[key]) acc[key] = [];
  acc[key].push(exp);
  return acc;
}, {});
const groupedList = Object.values(grouped);

const Experience = () => {
  const { isDarkMode } = useTheme();
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

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
    <section
      className={`min-h-screen relative py-20 px-6 overflow-hidden transition-all duration-500 ${isDarkMode
        ? "bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white"
        : "bg-gradient-to-br from-amber-50 via-gray-50 to-white text-gray-800"
        }`}
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {Array(8).fill().map((_, i) => (
          <motion.div
            key={i}
            className={`absolute rounded-full blur-3xl opacity-20 ${isDarkMode ? "bg-amber-600" : "bg-amber-400"
              }`}
            style={{
              width: `${Math.random() * 15 + 10}rem`,
              height: `${Math.random() * 15 + 10}rem`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              zIndex: 0
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{
              scale: 1,
              opacity: isDarkMode ? 0.15 : 0.2,
              x: [0, Math.random() * 10 - 5],
              y: [0, Math.random() * 10 - 5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse",
              delay: i * 0.2
            }}
          />
        ))}
      </div>

      <div className="container mx-auto max-w-6xl relative z-10">
        {/* Section Header */}
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
            className={`mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full ${isDarkMode ? "bg-gray-800" : "bg-white shadow-md"
              }`}
          >
            <Briefcase className={`h-8 w-8 ${isDarkMode ? "text-amber-400" : "text-amber-500"}`} />
          </motion.div>

          <h2 className={`text-4xl md:text-5xl font-bold ${isDarkMode ? "text-white" : "text-gray-800"}`}>
            Work Experience
          </h2>

          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "80px" }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className={`h-1 mx-auto mt-4 mb-3 rounded-full ${isDarkMode ? "bg-amber-400" : "bg-amber-500"}`}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="mb-8"
          >
            <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-full font-bold text-sm tracking-wide shadow-lg ${isDarkMode
              ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
              : "bg-emerald-50 text-emerald-600 border border-emerald-100"
              }`}>
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              1.4+ Years of Professional Experience
            </span>
          </motion.div>

          <p className={`text-lg max-w-2xl mx-auto ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
            A glimpse of my professional journey in the industry, showcasing roles that have shaped my expertise.
          </p>
        </motion.div>

        {/* Experience Timeline */}
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="space-y-12 relative"
        >
          {/* Timeline Connector */}
          <div
            className={`absolute left-1/2 top-0 bottom-0 w-0.5 -translate-x-1/2 ${isDarkMode ? "bg-gray-700" : "bg-gray-200"
              }`}
          />

          {groupedList.map((roles, index) => {
            const first = roles[0];
            if (roles.length === 1) {
              return (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className={`flex flex-col ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
                >
                  <div className="md:w-1/2 flex justify-center md:justify-end md:pr-8 md:text-right relative mb-8 md:mb-0">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      className={`absolute md:right-0 left-1/2 md:left-auto top-0 h-5 w-5 -translate-x-1/2 md:translate-x-1/2 rounded-full border-4 ${isDarkMode
                        ? `border-gray-800 ${first.isCurrent ? "bg-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.5)]" : "bg-amber-400"}`
                        : `border-white ${first.isCurrent ? "bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]" : "bg-amber-500"}`
                        }`}
                    />
                    <div className={`mt-10 md:mt-0 ${first.isCurrent ? (isDarkMode ? "text-emerald-400" : "text-emerald-600") : (isDarkMode ? "text-amber-400" : "text-amber-500")} font-bold text-xl`}>
                      {first.duration.split(" - ")[0]}
                    </div>
                  </div>

                  {/* Experience Card */}
                  <div className="md:w-1/2 md:pl-8">
                    <ExperienceCard experience={first} />
                  </div>
                </motion.div>
              );
            } else {
              // Grouped card for promotions
              return (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className={`flex flex-col ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
                >
                  <div className="md:w-1/2 flex justify-center md:justify-end md:pr-8 md:text-right relative mb-8 md:mb-0">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      className={`absolute md:right-0 left-1/2 md:left-auto top-0 h-5 w-5 -translate-x-1/2 md:translate-x-1/2 rounded-full border-4 ${isDarkMode
                        ? `border-gray-800 ${first.isCurrent ? "bg-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.5)]" : "bg-amber-400"}`
                        : `border-white ${first.isCurrent ? "bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]" : "bg-amber-500"}`
                        }`}
                    />
                    <div className={`mt-10 md:mt-0 ${first.isCurrent ? (isDarkMode ? "text-emerald-400" : "text-emerald-600") : (isDarkMode ? "text-amber-400" : "text-amber-500")} font-bold text-xl`}>
                      {roles[0].duration.split(" - ")[0]}
                    </div>
                  </div>
                  <div className="md:w-1/2 md:pl-8">
                    <ExperienceGroupCard company={first.company} logoUrl={first.logoUrl} companyUrl={first.companyUrl} roles={roles} />
                  </div>
                </motion.div>
              );
            }
          })}

          {/* Continue Indicator */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0, transition: { delay: 1.2, duration: 0.6 } }}
            className="flex flex-col items-center mt-10"
          >
            <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-500"} mb-2`}>Scroll for more</p>
            <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>
              <ChevronDown className={`h-6 w-6 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`} />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;