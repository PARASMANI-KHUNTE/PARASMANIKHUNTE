import React from "react";
import { Link } from "react-router-dom";
import { Briefcase, ArrowRight } from "lucide-react";
import { experienceData } from "../../data/experience";
import { useTheme } from "../../context/ThemeContext";

const ExperienceSummarySection = () => {
  const { isDarkMode } = useTheme();

  return (
    <section className="py-14 max-w-5xl mx-auto border-t border-gray-200 dark:border-gray-800">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-amber-500 mb-1 block">
            Career History
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Work Experience
          </h2>
        </div>
        <Link
          to="/experience"
          className={`inline-flex items-center gap-1.5 text-sm font-semibold transition-colors ${
            isDarkMode ? "text-amber-400 hover:text-amber-300" : "text-amber-600 hover:text-amber-700"
          }`}
        >
          <span>View full timeline & certificates</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="space-y-3">
        {experienceData.map((exp) => {
          const hasResult = exp.result && exp.result !== "TODO" && !exp.result.startsWith("TODO");
          return (
            <div
              key={exp.id}
              className={`p-4 sm:p-5 rounded-xl border transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                isDarkMode
                  ? "bg-gray-800/40 border-gray-800 hover:border-gray-700"
                  : "bg-white border-gray-200 hover:border-gray-300"
              }`}
            >
              <div className="flex items-start sm:items-center gap-3">
                <div
                  className={`p-2 rounded-lg shrink-0 ${
                    isDarkMode ? "bg-gray-800 text-amber-400" : "bg-amber-50 text-amber-600"
                  }`}
                >
                  <Briefcase className="w-4 h-4" />
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-bold text-sm sm:text-base">
                      {exp.role}
                    </span>
                    <span className={`text-xs ${isDarkMode ? "text-amber-400" : "text-amber-600"}`}>
                      @ {exp.company}
                    </span>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      isDarkMode ? "bg-gray-700 text-gray-300" : "bg-gray-100 text-gray-600"
                    }`}>
                      {exp.location}
                    </span>
                  </div>
                  {hasResult && (
                    <p className={`text-xs sm:text-sm mt-1 font-medium ${
                      isDarkMode ? "text-emerald-400" : "text-emerald-700"
                    }`}>
                      • {exp.result}
                    </p>
                  )}
                </div>
              </div>

              <span className={`text-xs font-semibold shrink-0 sm:text-right ${
                isDarkMode ? "text-gray-400" : "text-gray-500"
              }`}>
                {exp.duration}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default ExperienceSummarySection;
