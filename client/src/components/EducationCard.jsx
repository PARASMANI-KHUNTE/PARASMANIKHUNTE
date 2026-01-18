import React from "react";
import { GraduationCap, Calendar, MapPin, Award, BookOpen } from "lucide-react";
import GlassCard from "./ui/GlassCard";

const EducationCard = ({ education }) => {
  return (
    <GlassCard className="!p-6 relative group overflow-hidden h-full flex flex-col">
      {/* Hover Highlight */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl -translate-y-16 translate-x-16 transition-all group-hover:bg-indigo-500/20" />

      {/* Left accent border */}
      <div className="absolute left-0 top-0 h-full w-1 bg-indigo-500"></div>

      {/* Card content */}
      <div className="relative z-10 flex-grow">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-500/20 ring-1 ring-indigo-500/30 transition-transform duration-500 group-hover:rotate-12`}>
              {education.type === "certification" ? (
                <Award className="h-6 w-6 text-indigo-400" />
              ) : (
                <GraduationCap className="h-6 w-6 text-indigo-400" />
              )}
            </div>
            <div>
              <h3 className="text-xl font-bold text-white group-hover:text-indigo-300 transition-colors">
                {education.degree}
              </h3>
              <p className="font-medium text-indigo-400">
                {education.institution}
              </p>
            </div>
          </div>
        </div>

        {/* Meta information */}
        <div className="mb-5 flex flex-wrap gap-3">
          <div className="flex items-center gap-2 text-sm text-gray-400 bg-white/5 px-3 py-1.5 rounded-lg border border-white/5">
            <Calendar className="h-4 w-4 text-indigo-400" />
            <span>{education.year}</span>
          </div>

          {education.location && (
            <div className="flex items-center gap-2 text-sm text-gray-400 bg-white/5 px-3 py-1.5 rounded-lg border border-white/5">
              <MapPin className="h-4 w-4 text-indigo-400" />
              <span>{education.location}</span>
            </div>
          )}

          {education.gpa && (
            <div className={`flex items-center gap-2 text-sm px-3 py-1.5 rounded-lg border border-white/5 ${education.gpa >= 3.5 || education.gpa >= 80 ? "text-emerald-400 bg-emerald-500/10" : "text-purple-300 bg-purple-500/10"
              }`}>
              <Award className="h-4 w-4" />
              <span>GPA / % : {education.gpa}</span>
            </div>
          )}
        </div>

        {/* Description */}
        <p className="leading-relaxed text-gray-300 mb-6 text-sm">
          {education.description}
        </p>

        <div className="mt-auto space-y-4">
          {/* Courses/Skills */}
          {education.courses && education.courses.length > 0 && (
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-indigo-400" />
                <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Key Courses
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {education.courses.map((course, index) => (
                  <span
                    key={index}
                    className="inline-block rounded-lg px-2.5 py-1 text-xs font-medium bg-indigo-500/10 text-indigo-300 border border-indigo-500/20"
                  >
                    {course}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Achievements */}
          {education.achievements && education.achievements.length > 0 && (
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Award className="h-4 w-4 text-indigo-400" />
                <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Achievements
                </span>
              </div>
              <ul className="space-y-1">
                {education.achievements.map((achievement, index) => (
                  <li key={index} className="text-sm text-gray-400 flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-indigo-400 flex-shrink-0" />
                    {achievement}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </GlassCard>
  );
};

export default EducationCard;