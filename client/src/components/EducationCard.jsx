import React from "react";
import { GraduationCap, Calendar, MapPin, Award, FileText } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

const EducationCard = ({ item, type = "education", onPreview }) => {
  const { isDarkMode } = useTheme();

  return (
    <article
      className={`rounded-2xl border p-6 transition-all duration-200 flex flex-col justify-between ${
        isDarkMode
          ? "bg-gray-800/40 border-gray-800 hover:border-gray-700"
          : "bg-white border-gray-200 hover:border-gray-300 shadow-sm"
      }`}
    >
      <div>
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-start gap-3">
            <div
              className={`p-2.5 rounded-xl shrink-0 ${
                isDarkMode ? "bg-amber-500/10 text-amber-400" : "bg-amber-50 text-amber-600"
              }`}
            >
              {type === "hackathon" ? (
                <Award className="w-5 h-5" />
              ) : (
                <GraduationCap className="w-5 h-5" />
              )}
            </div>
            <div>
              <h3 className="text-lg font-bold">
                {item.degree || item.title}
              </h3>
              <p className={`text-sm font-semibold ${isDarkMode ? "text-amber-400" : "text-amber-600"}`}>
                {item.institution || item.organization}
              </p>
            </div>
          </div>

          <span className={`text-xs font-semibold px-2.5 py-1 rounded-full shrink-0 ${
            isDarkMode ? "bg-gray-700 text-gray-300" : "bg-gray-100 text-gray-600"
          }`}>
            {item.year}
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500 dark:text-gray-400 mt-2 mb-4">
          {item.location && (
            <div className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5" />
              <span>{item.location}</span>
            </div>
          )}
          {item.gpa && (
            <div className="font-semibold text-emerald-600 dark:text-emerald-400">
              CGPA: {item.gpa}
            </div>
          )}
          {item.status && (
            <div className="font-semibold text-amber-600 dark:text-amber-400">
              Status: {item.status}
            </div>
          )}
        </div>
      </div>

      {item.certificateUrl && onPreview && (
        <div className="pt-3 border-t border-gray-100 dark:border-gray-800">
          <button
            onClick={() =>
              onPreview({
                title: item.title || item.degree,
                link: item.certificateUrl
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

export default EducationCard;
