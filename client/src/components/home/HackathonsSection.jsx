import React from "react";
import { Award, FileText } from "lucide-react";
import { hackathons } from "../../data/education";
import { useTheme } from "../../context/ThemeContext";

const HackathonsSection = ({ onPreviewCertificate }) => {
  const { isDarkMode } = useTheme();

  return (
    <section className="py-14 max-w-5xl mx-auto border-t border-gray-200 dark:border-gray-800">
      <div className="mb-8">
        <span className="text-xs font-semibold uppercase tracking-wider text-amber-500 mb-1 block">
          Competitive Achievements
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
          Hackathons & Recognition
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {hackathons.map((hackathon) => (
          <div
            key={hackathon.id}
            className={`p-6 rounded-2xl border transition-colors flex flex-col justify-between ${
              isDarkMode
                ? "bg-gray-800/40 border-gray-800 hover:border-gray-700"
                : "bg-white border-gray-200 hover:border-gray-300"
            }`}
          >
            <div>
              <div className="flex items-start justify-between gap-3 mb-2">
                <div className="flex items-center gap-2.5">
                  <div
                    className={`p-2 rounded-lg ${
                      isDarkMode ? "bg-amber-500/10 text-amber-400" : "bg-amber-50 text-amber-600"
                    }`}
                  >
                    <Award className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-base sm:text-lg">
                    {hackathon.title}
                  </h3>
                </div>
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full shrink-0 ${
                  isDarkMode ? "bg-gray-700 text-gray-300" : "bg-gray-100 text-gray-600"
                }`}>
                  {hackathon.year}
                </span>
              </div>

              <p className={`text-sm mb-4 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                {hackathon.organization}
              </p>
            </div>

            {hackathon.certificateUrl && onPreviewCertificate && (
              <button
                onClick={() =>
                  onPreviewCertificate({
                    title: hackathon.title,
                    link: hackathon.certificateUrl
                  })
                }
                type="button"
                className={`self-start inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                  isDarkMode
                    ? "bg-gray-700 text-amber-300 hover:bg-gray-600"
                    : "bg-amber-50 text-amber-700 border border-amber-200 hover:bg-amber-100"
                }`}
              >
                <FileText className="w-3.5 h-3.5" />
                View Certificate
              </button>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default HackathonsSection;
