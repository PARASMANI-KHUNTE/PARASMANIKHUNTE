import React, { useState } from "react";
import HeroSection from "../components/home/HeroSection";
import FeaturedProjectsSection from "../components/home/FeaturedProjectsSection";
import ExperienceSummarySection from "../components/home/ExperienceSummarySection";
import SkillsSummarySection from "../components/home/SkillsSummarySection";
import HackathonsSection from "../components/home/HackathonsSection";
import ContactSection from "../components/home/ContactSection";
import ProjectPreviewModal from "../components/ProjectPreviewModal";
import { useTheme } from "../context/ThemeContext";
import { Eye, X } from "lucide-react";
import { profile } from "../data/profile";

const Home = () => {
  const { isDarkMode } = useTheme();
  const [isCvPreviewOpen, setIsCvPreviewOpen] = useState(false);
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
  const [selectedPreview, setSelectedPreview] = useState(null);

  const handleOpenPreview = (item) => {
    setSelectedPreview(item);
    setIsPreviewModalOpen(true);
  };

  return (
    <div
      className="min-h-screen px-4 sm:px-6"
      style={{
        backgroundColor: 'var(--color-paper)',
        color: 'var(--color-ink)',
      }}
    >
      <div className="pt-20">
        {/* 1. Hero */}
        <HeroSection onOpenCvPreview={() => setIsCvPreviewOpen(true)} />

        {/* 2. Featured Projects */}
        <FeaturedProjectsSection onPreview={handleOpenPreview} />

        {/* 3. Experience Summary */}
        <ExperienceSummarySection />

        {/* 4. Skills (3 Groups) */}
        <SkillsSummarySection />

        {/* 5. Hackathons */}
        <HackathonsSection onPreviewCertificate={handleOpenPreview} />

        {/* 6. Contact */}
        <ContactSection />
      </div>

      {/* CV Preview Modal */}
      {isCvPreviewOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
          onClick={() => setIsCvPreviewOpen(false)}
        >
          <div
            className="relative max-w-4xl w-full h-[85vh] rounded-2xl overflow-hidden flex flex-col shadow-2xl border"
            style={{
              backgroundColor: 'var(--color-paper)',
              borderColor: 'var(--color-border)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-4 border-b" style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-paper-2)' }}>
              <h3 className="font-bold text-sm sm:text-base flex items-center gap-2" style={{ color: 'var(--color-ink)' }}>
                <Eye className="w-4 h-4" style={{ color: 'var(--color-accent)' }} />
                Resume Preview - {profile.name}
              </h3>
              <button
                onClick={() => setIsCvPreviewOpen(false)}
                className="p-1.5 rounded-lg transition-colors"
                style={{
                  backgroundColor: 'var(--color-paper-2)',
                  color: 'var(--color-ink-muted)',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'var(--color-paper-3)'; e.currentTarget.style.color = 'var(--color-ink)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'var(--color-paper-2)'; e.currentTarget.style.color = 'var(--color-ink-muted)'; }}
                aria-label="Close CV preview"
                type="button"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex-1 w-full h-full" style={{ backgroundColor: 'var(--color-paper-3)' }}>
              <iframe
                src={`${profile.resumePdf}#toolbar=0`}
                className="w-full h-full border-none"
                title="Resume PDF"
              />
            </div>
          </div>
        </div>
      )}

      {/* Project & Certificate Preview Modal */}
      <ProjectPreviewModal
        isOpen={isPreviewModalOpen}
        onClose={() => setIsPreviewModalOpen(false)}
        project={selectedPreview}
        isDarkMode={isDarkMode}
      />
    </div>
  );
};

export default Home;