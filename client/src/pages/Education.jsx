import React, { useState } from "react";
import { GraduationCap, Award } from "lucide-react";
import { formalEducation, hackathons } from "../data/education";
import EducationCard from "../components/EducationCard";
import ProjectPreviewModal from "../components/ProjectPreviewModal";
import { useTheme } from "../context/ThemeContext";

const Education = () => {
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
      <div className="container mx-auto max-w-4xl space-y-16 px-4">
        {/* Academic Education Section */}
        <section>
          <div className="mb-8">
            <span className="text-xs font-semibold uppercase tracking-wider mb-2 block" style={{ color: 'var(--color-accent)' }}>
              Academic Background
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-3" style={{ color: 'var(--color-ink)' }}>
              Education
            </h1>
            <p className="text-base max-w-xl leading-relaxed" style={{ color: 'var(--color-ink-muted)' }}>
              University computer science degrees and ongoing master's coursework.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {formalEducation.map((edu) => (
              <EducationCard key={edu.id} item={edu} type="education" onPreview={handleOpenPreview} />
            ))}
          </div>
        </section>

        {/* Hackathons Section */}
        <section className="pt-8 border-t" style={{ borderColor: 'var(--color-border)' }}>
          <div className="mb-8">
            <span className="text-xs font-semibold uppercase tracking-wider mb-2 block" style={{ color: 'var(--color-accent)' }}>
              National Recognition
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-3" style={{ color: 'var(--color-ink)' }}>
              Hackathons & Certifications
            </h2>
            <p className="text-base max-w-xl leading-relaxed" style={{ color: 'var(--color-ink-muted)' }}>
              Competitive national hackathons with verifiable certificates.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {hackathons.map((h) => (
              <EducationCard key={h.id} item={h} type="hackathon" onPreview={handleOpenPreview} />
            ))}
          </div>
        </section>
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

export default Education;