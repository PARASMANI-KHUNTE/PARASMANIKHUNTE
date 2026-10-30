import React, { useEffect, useRef, useState } from "react";
import { X, ExternalLink, Github, Monitor, AlertCircle, Loader2 } from "lucide-react";

const ProjectPreviewModal = ({ isOpen, onClose, project, isDarkMode }) => {
  const [isLoading, setIsLoading] = useState(true);
  const closeButtonRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setIsLoading(true);
      // Keyboard handler for Escape
      const handleKeyDown = (e) => {
        if (e.key === "Escape") {
          onClose();
        }
      };
      window.addEventListener("keydown", handleKeyDown);
      // Focus the close button for accessibility
      setTimeout(() => {
        closeButtonRef.current?.focus();
      }, 50);

      return () => {
        window.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [isOpen, onClose]);

  if (!isOpen || !project) return null;

  const url = project.link || project.liveUrl || project.certificateUrl;
  const isImageOrPdf = url && (url.endsWith(".pdf") || url.endsWith(".jpg") || url.endsWith(".png"));

  const modalStyle = {
    backgroundColor: 'var(--color-paper)',
    borderColor: 'var(--color-border)',
    color: 'var(--color-ink)',
  };

  const headerStyle = {
    backgroundColor: 'var(--color-paper-2)',
    borderColor: 'var(--color-border)',
  };

  const bodyStyle = {
    backgroundColor: 'var(--color-paper-3)',
  };

  const buttonStyle = {
    backgroundColor: 'var(--color-paper-2)',
    color: 'var(--color-ink-muted)',
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="preview-modal-title"
      className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative max-w-5xl w-full h-[85vh] rounded-2xl overflow-hidden flex flex-col shadow-2xl border"
        style={modalStyle}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div
          className="flex items-center justify-between px-5 py-3.5 border-b"
          style={headerStyle}
        >
          <div className="flex items-center gap-3">
            <div
              className="p-2 rounded-lg"
              style={{
                backgroundColor: 'var(--color-accent-subtle)',
                color: 'var(--color-accent)',
              }}
            >
              <Monitor className="w-4 h-4" />
            </div>
            <div>
              <h2 id="preview-modal-title" className="font-bold text-sm sm:text-base leading-tight" style={{ color: 'var(--color-ink)' }}>
                {project.title}
              </h2>
              <span className="text-xs" style={{ color: 'var(--color-ink-muted)' }}>
                {isImageOrPdf ? "Document Viewer" : "Live Web Preview"}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {url && (
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg transition-colors"
                style={buttonStyle}
                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'var(--color-paper-3)'; e.currentTarget.style.color = 'var(--color-ink)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'var(--color-paper-2)'; e.currentTarget.style.color = 'var(--color-ink-muted)'; }}
                title="Open in new tab"
                aria-label="Open preview in new tab"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg transition-colors"
                style={buttonStyle}
                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'var(--color-paper-3)'; e.currentTarget.style.color = 'var(--color-ink)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'var(--color-paper-2)'; e.currentTarget.style.color = 'var(--color-ink-muted)'; }}
                title="View Source on GitHub"
                aria-label="View source code on GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
            )}
            <div className="w-px h-5 mx-1" style={{ backgroundColor: 'var(--color-border)' }} />
            <button
              ref={closeButtonRef}
              onClick={onClose}
              className="p-2 rounded-lg transition-colors focus:ring-2 focus:ring-amber-500 outline-none"
              style={buttonStyle}
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'var(--color-paper-3)'; e.currentTarget.style.color = 'var(--color-ink)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'var(--color-paper-2)'; e.currentTarget.style.color = 'var(--color-ink-muted)'; }}
              aria-label="Close modal"
              type="button"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="flex-1 w-full h-full relative overflow-hidden flex flex-col" style={bodyStyle}>
          {url ? (
            <div className="w-full h-full relative">
              {/* Loading Spinner */}
              {isLoading && (
                <div className="absolute inset-0 z-10 flex flex-col items-center justify-center" style={{ backgroundColor: 'oklch(0.13 0.005 85 / 0.4)', color: '#fff' }}>
                  <Loader2 className="w-8 h-8 animate-spin" style={{ color: 'var(--color-accent)' }} mb-2 />
                  <p className="text-xs font-medium">Loading live preview...</p>
                </div>
              )}

              {url.endsWith(".jpg") || url.endsWith(".png") ? (
                <div className="w-full h-full flex items-center justify-center p-4 overflow-auto">
                  <img
                    src={url}
                    alt={project.title}
                    className="max-w-full max-h-full object-contain rounded-lg shadow-md"
                    onLoad={() => setIsLoading(false)}
                  />
                </div>
              ) : (
                <iframe
                  src={url}
                  className="w-full h-full border-none"
                  style={{ backgroundColor: 'var(--color-paper)' }}
                  title={`${project.title} Preview`}
                  loading="lazy"
                  onLoad={() => setIsLoading(false)}
                />
              )}

              {/* Graceful Fallback bar at bottom for cold starts / iframe blocks */}
              <div className="absolute inset-x-0 bottom-0 py-2.5 px-4 text-white text-xs flex flex-wrap items-center justify-between gap-2 border-t" style={{ backgroundColor: 'oklch(0.13 0.005 85 / 0.9)', borderColor: 'var(--color-border)' }}>
                <div className="flex items-center gap-1.5" style={{ color: 'var(--color-ink-muted)' }}>
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" style={{ color: 'var(--color-accent)' }} />
                  <span>Render free-tier instances may take ~30s to wake up if sleeping.</span>
                </div>
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold underline inline-flex items-center gap-1"
                  style={{ color: 'var(--color-accent)' }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = 'oklch(0.58 0.18 55)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--color-accent)'; }}
                >
                  Open directly in new tab <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center p-8" style={{ color: 'var(--color-ink-muted)' }}>
              <div
                className="w-16 h-16 mb-4 rounded-2xl flex items-center justify-center"
                style={{ backgroundColor: 'var(--color-paper-3)', color: 'var(--color-ink-muted)' }}
              >
                <Monitor className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold mb-2" style={{ color: 'var(--color-ink)' }}>Live Preview Not Available</h3>
              <p className="text-sm max-w-sm mb-6">
                This project runs in an isolated local or distributed environment. You can explore the source code directly on GitHub.
              </p>
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm transition-colors"
                  style={{
                    backgroundColor: 'var(--color-accent)',
                    color: '#fff',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'oklch(0.58 0.18 55)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'var(--color-accent)'; }}
                >
                  <Github className="w-4 h-4" />
                  View on GitHub
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectPreviewModal;