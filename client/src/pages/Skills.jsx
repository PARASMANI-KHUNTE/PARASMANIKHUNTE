import React from "react";
import { CheckCircle2, Code2, Database, Wrench } from "lucide-react";
import { skillGroups } from "../data/skills";
import { useTheme } from "../context/ThemeContext";

const Skills = () => {
  const { isDarkMode } = useTheme();

  const getCategoryIcon = (category) => {
    switch (category) {
      case "Backend":
        return Code2;
      case "Data and AI":
        return Database;
      default:
        return Wrench;
    }
  };

  return (
    <div
      className={`min-h-screen py-24 px-6 transition-colors duration-200 ${
        isDarkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"
      }`}
    >
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-xs font-semibold uppercase tracking-wider text-amber-500 mb-2 block">
            Technical Proficiency
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
            Technical Skills
          </h1>
          <p className={`text-base max-w-xl mx-auto leading-relaxed ${
            isDarkMode ? "text-gray-300" : "text-gray-600"
          }`}>
            Core languages, distributed data systems, and tooling I use across production and engineering environments.
          </p>
        </div>

        {/* 3 Grouped Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {skillGroups.map((group) => {
            const Icon = getCategoryIcon(group.category);
            return (
              <div
                key={group.category}
                className={`p-6 rounded-2xl border transition-all ${
                  isDarkMode
                    ? "bg-gray-800/50 border-gray-800 hover:border-gray-700"
                    : "bg-white border-gray-200 hover:border-gray-300 shadow-sm"
                }`}
              >
                <div className="flex items-center gap-3 mb-5">
                  <div
                    className={`p-2.5 rounded-xl ${
                      isDarkMode ? "bg-amber-500/10 text-amber-400" : "bg-amber-50 text-amber-600"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <h2 className="text-lg font-bold">
                    {group.category}
                  </h2>
                </div>

                <ul className="space-y-3" aria-label={`${group.category} skills`}>
                  {group.skills.map((skill) => (
                    <li
                      key={skill}
                      className={`flex items-center gap-2.5 text-sm font-medium ${
                        isDarkMode ? "text-gray-200" : "text-gray-700"
                      }`}
                    >
                      <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0" />
                      <span>{skill}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Skills;
