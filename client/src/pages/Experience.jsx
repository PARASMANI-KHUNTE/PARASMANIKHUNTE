import React, { useState } from "react";
import { Briefcase } from "lucide-react";
import { experienceData } from "../data/experience";
import ExperienceCard from "../components/ExperienceCard";
import ProjectPreviewModal from "../components/ProjectPreviewModal";
import { useTheme } from "../context/ThemeContext";

const Experience = () => {
  const { isDarkMode } = useTheme();
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleOpenPreview = (item) => {
    setSelectedItem(item);
    setIsPreviewModalOpen(true);
  };

  return (
    <div
      className="min-h-screen py-24 px-6"
      style={{
        backgroundColor: 'var(--color-paper)',
        color: 'var(--color-ink)',
      }}
    >
      <div className="container mx-auto max-w-4xl px-4">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="text-xs font-semibold uppercase tracking-wider mb-2 block" style={{ color: 'var(--color-accent)' }}>
            Work History
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4" style={{ color: 'var(--color-ink)' }}>
            Professional Experience
          </h1>
          <p className="text-base max-w-xl mx-auto leading-relaxed" style={{ color: 'var(--color-ink-muted)' }}>
            Engineering internships spanning distributed systems, API development, and production application delivery.
          </p>
        </div>

        {/* Timeline List */}
        <div className="relative pl-6 sm:pl-8 border-l-2 space-y-8 ml-2 sm:ml-4" style={{ borderColor: 'var(--color-accent)' }}>
          {experienceData.map((exp) => (
            <div key={exp.id} className="relative group">
              {/* Timeline dot */}
              <div
                className="absolute -left-[31px] sm:-left-[39px] top-6 w-3.5 h-3.5 rounded-full border-2"
                style={{
                  backgroundColor: 'var(--color-accent)',
                  borderColor: 'var(--color-paper)',
                }}
              />
              <ExperienceCard experience={exp} onPreview={handleOpenPreview} />
            </div>
          ))}
        </div>
      </div>

      {/* Certificate Preview Modal */}
      <ProjectPreviewModal
        isOpen={isPreviewModalOpen}
        onClose={() => setIsPreviewModalOpen(false)}
        project={selectedItem}
        isDarkMode={isDarkMode}
      />
    </div>
  );
};

export default Experience;