import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { skillGroups } from "../../data/skills";
import { useTheme } from "../../context/ThemeContext";

const SkillsSummarySection = () => {
  const { isDarkMode } = useTheme();

  return (
    <section className="py-14 max-w-5xl mx-auto border-t border-gray-200 dark:border-gray-800">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-amber-500 mb-1 block">
            Technical Arsenal
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Core Engineering Stack
          </h2>
        </div>
        <Link
          to="/skills"
          className={`inline-flex items-center gap-1.5 text-sm font-semibold transition-colors ${
            isDarkMode ? "text-amber-400 hover:text-amber-300" : "text-amber-600 hover:text-amber-700"
          }`}
        >
          <span>View all categorized skills</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {skillGroups.map((group) => (
          <div
            key={group.category}
            className={`p-6 rounded-2xl border transition-colors ${
              isDarkMode
                ? "bg-gray-800/40 border-gray-800 hover:border-gray-700"
                : "bg-white border-gray-200 hover:border-gray-300"
            }`}
          >
            <h3 className="text-base font-bold mb-4 flex items-center justify-between">
              <span>{group.category}</span>
              <span className={`text-xs font-normal px-2 py-0.5 rounded-full ${
                isDarkMode ? "bg-gray-700 text-gray-300" : "bg-gray-100 text-gray-600"
              }`}>
                {group.skills.length} skills
              </span>
            </h3>

            <ul className="space-y-2">
              {group.skills.map((skill) => (
                <li
                  key={skill}
                  className={`flex items-center gap-2 text-sm font-medium ${
                    isDarkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0" />
                  <span>{skill}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SkillsSummarySection;
