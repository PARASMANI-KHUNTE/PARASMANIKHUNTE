import React from "react";
import { Briefcase, Calendar, MapPin, ExternalLink, FileText } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

const ExperienceCard = ({ experience, onPreview }) => {
  const { isDarkMode } = useTheme();

  const hasResult =
    experience.result &&
    experience.result !== "TODO" &&
    !experience.result.startsWith("TODO");

  return (
    <article
      className={`relative overflow-hidden rounded-2xl border p-6 transition-all duration-200 ${
        isDarkMode
          ? "bg-gray-800/40 border-gray-800 hover:border-gray-700 hover:shadow-md"
          : "bg-white border-gray-200 hover:border-gray-300 hover:shadow-sm"
      }`}
    >
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
        <div className="flex items-start gap-3">
          <div
            className={`p-2.5 rounded-xl shrink-0 ${
              isDarkMode ? "bg-amber-500/10 text-amber-400" : "bg-amber-50 text-amber-600"
            }`}
          >
            <Briefcase className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold">
              {experience.role}
            </h3>
            <div className="flex items-center gap-2 mt-0.5">
              <span className={`text-sm font-semibold ${isDarkMode ? "text-amber-400" : "text-amber-600"}`}>
                {experience.company}
              </span>
              {experience.companyUrl && (
                <a
                  href={experience.companyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-amber-500 transition-colors"
                  aria-label={`Visit ${experience.company} website`}
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-wrap sm:flex-col sm:items-end gap-2 text-xs text-gray-500 dark:text-gray-400 shrink-0">
          <div className="flex items-center gap-1 font-semibold text-gray-700 dark:text-gray-300">
            <Calendar className="w-3.5 h-3.5" />
            <span>{experience.duration}</span>
          </div>
          <div className="flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5" />
            <span>{experience.location}</span>
          </div>
        </div>
      </div>

      {hasResult && (
        <div className={`mt-3 p-3.5 rounded-xl border text-sm font-medium ${
          isDarkMode
            ? "bg-emerald-950/20 border-emerald-900/40 text-emerald-300"
            : "bg-emerald-50/70 border-emerald-200 text-emerald-800"
        }`}>
          <span className="font-bold mr-1">Result:</span>
          {experience.result}
        </div>
      )}

      {experience.certificateUrl && onPreview && (
        <div className="mt-4 pt-3 border-t border-gray-100 dark:border-gray-800/80">
          <button
            onClick={() =>
              onPreview({
                title: `${experience.role} - ${experience.company}`,
                link: experience.certificateUrl
              })
            }
            type="button"
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              isDarkMode
                ? "bg-gray-700 text-amber-300 hover:bg-gray-600"
                : "bg-amber-50 text-amber-700 border border-amber-200 hover:bg-amber-100"
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            View Certificate
          </button>
        </div>
      )}
    </article>
  );
};

export default ExperienceCard;
