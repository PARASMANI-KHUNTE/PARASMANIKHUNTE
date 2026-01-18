import React from "react";
import { Briefcase, Calendar, MapPin, ExternalLink, FileText } from "lucide-react";
import GlassCard from "./ui/GlassCard";

const ExperienceCard = ({ experience }) => {
  const handleViewCertificate = () => {
    if (experience.certificateUrl) {
      window.open(experience.certificateUrl, '_blank');
    }
  };

  return (
    <GlassCard className="!p-6 relative group overflow-hidden">
      {/* Hover Highlight */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl -translate-y-16 translate-x-16 transition-all group-hover:bg-indigo-500/20" />

      {/* Company badge */}
      <div className="mb-4 flex items-center justify-between relative z-10">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-500/20 text-indigo-400 ring-1 ring-indigo-500/30">
            {experience.logoUrl ? (
              <img src={experience.logoUrl} alt={experience.company} className="w-8 h-8 object-contain" />
            ) : (
              <Briefcase className="h-6 w-6" />
            )}
          </div>
          <div>
            <h3 className="text-xl font-bold text-white group-hover:text-indigo-300 transition-colors">
              {experience.role}
            </h3>
            <p className="font-medium text-indigo-400">
              {experience.company}
            </p>
          </div>
        </div>

        <div className="flex gap-2">
          {experience.certificateUrl && (
            <button
              onClick={handleViewCertificate}
              className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-600/20 text-indigo-300 hover:bg-indigo-600 hover:text-white transition-all border border-indigo-500/30"
              title="View Certificate"
            >
              <FileText className="h-4 w-4" />
            </button>
          )}

          {experience.companyUrl && (
            <a
              href={experience.companyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white transition-all border border-white/10"
              title="Visit Company"
            >
              <ExternalLink className="h-4 w-4" />
            </a>
          )}
        </div>
      </div>

      {/* Meta information */}
      <div className="mb-5 flex flex-wrap gap-4 relative z-10">
        <div className="flex items-center gap-2 text-sm text-gray-400 bg-white/5 px-3 py-1.5 rounded-lg border border-white/5">
          <Calendar className="h-4 w-4 text-indigo-400" />
          <span>{experience.duration}</span>
        </div>

        {experience.location && (
          <div className="flex items-center gap-2 text-sm text-gray-400 bg-white/5 px-3 py-1.5 rounded-lg border border-white/5">
            <MapPin className="h-4 w-4 text-indigo-400" />
            <span>{experience.location}</span>
          </div>
        )}
      </div>

      {/* Description */}
      <div className="relative z-10">
        <p className="leading-relaxed text-gray-300 mb-5 text-sm md:text-base">
          {experience.description}
        </p>

        {/* Skills/Technologies (if available) */}
        {experience.skills && experience.skills.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {/* Handle both array of strings and comma-separated string */}
            {(Array.isArray(experience.skills) ? experience.skills : experience.skills.split(',')).map((skill, index) => (
              <span
                key={index}
                className="inline-block rounded-lg px-3 py-1 text-xs font-medium bg-indigo-500/10 text-indigo-300 border border-indigo-500/20"
              >
                {skill.trim()}
              </span>
            ))}
          </div>
        )}
      </div>
    </GlassCard>
  );
};

export default ExperienceCard;