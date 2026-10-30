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

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="preview-modal-title"
      className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className={`relative max-w-5xl w-full h-[85vh] rounded-2xl overflow-hidden flex flex-col shadow-2xl border ${
          isDarkMode ? "bg-gray-900 border-gray-700 text-white" : "bg-white border-gray-200 text-gray-900"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div
          className={`flex items-center justify-between px-5 py-3.5 border-b ${
            isDarkMode ? "bg-gray-800/90 border-gray-700" : "bg-gray-50 border-gray-200"
          }`}
        >
          <div className="flex items-center gap-3">
            <div
              className={`p-2 rounded-lg ${
                isDarkMode ? "bg-amber-400/10 text-amber-400" : "bg-amber-50 text-amber-600"
              }`}
            >
              <Monitor className="w-4 h-4" />
            </div>
            <div>
              <h2 id="preview-modal-title" className="font-bold text-sm sm:text-base leading-tight">
                {project.title}
              </h2>
              <span className={`text-xs ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
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
                className={`p-2 rounded-lg transition-colors ${
                  isDarkMode ? "hover:bg-gray-700 text-gray-300" : "hover:bg-gray-200 text-gray-600"
                }`}
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
                className={`p-2 rounded-lg transition-colors ${
                  isDarkMode ? "hover:bg-gray-700 text-gray-300" : "hover:bg-gray-200 text-gray-600"
                }`}
                title="View Source on GitHub"
                aria-label="View source code on GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
            )}
            <div className="w-px h-5 mx-1 bg-gray-300 dark:bg-gray-700" />
            <button
              ref={closeButtonRef}
              onClick={onClose}
              className={`p-2 rounded-lg transition-colors focus:ring-2 focus:ring-amber-500 outline-none ${
                isDarkMode ? "hover:bg-gray-700 text-gray-300" : "hover:bg-gray-200 text-gray-600"
              }`}
              aria-label="Close modal"
              type="button"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="flex-1 w-full h-full relative bg-gray-100 dark:bg-gray-950 overflow-hidden flex flex-col">
          {url ? (
            <div className="w-full h-full relative">
              {/* Loading Spinner */}
              {isLoading && (
                <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-gray-900/40 backdrop-blur-xs text-white">
                  <Loader2 className="w-8 h-8 animate-spin text-amber-500 mb-2" />
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
                  className="w-full h-full border-none bg-white"
                  title={`${project.title} Preview`}
                  loading="lazy"
                  onLoad={() => setIsLoading(false)}
                />
              )}

              {/* Graceful Fallback bar at bottom for cold starts / iframe blocks */}
              <div className="absolute inset-x-0 bottom-0 py-2.5 px-4 bg-gray-900/90 text-white text-xs flex flex-wrap items-center justify-between gap-2 border-t border-gray-800">
                <div className="flex items-center gap-1.5 text-gray-300">
                  <AlertCircle className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>Render free-tier instances may take ~30s to wake up if sleeping.</span>
                </div>
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-amber-400 hover:text-amber-300 inline-flex items-center gap-1 underline"
                >
                  Open directly in new tab <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center p-8">
              <div
                className={`w-16 h-16 mb-4 rounded-2xl flex items-center justify-center ${
                  isDarkMode ? "bg-gray-800 text-gray-400" : "bg-gray-200 text-gray-600"
                }`}
              >
                <Monitor className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold mb-2">Live Preview Not Available</h3>
              <p className={`text-sm max-w-sm mb-6 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                This project runs in an isolated local or distributed environment. You can explore the source code directly on GitHub.
              </p>
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-medium text-sm transition-colors"
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
