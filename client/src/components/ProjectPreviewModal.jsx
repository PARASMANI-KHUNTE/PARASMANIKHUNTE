import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, Github, Monitor, AlertCircle } from "lucide-react";

const ProjectPreviewModal = ({ isOpen, onClose, project, isDarkMode }) => {
    if (!project) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
                    onClick={onClose}
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 20 }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        className={`relative max-w-6xl w-full h-[85vh] rounded-2xl overflow-hidden flex flex-col shadow-2xl ${isDarkMode ? "bg-gray-900 border border-gray-700" : "bg-white border border-gray-200"
                            }`}
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Modal Header */}
                        <div className={`flex items-center justify-between p-4 border-b ${isDarkMode ? "bg-gray-800 border-gray-700" : "bg-gray-50 border-gray-200"
                            }`}>
                            <div className="flex items-center gap-3">
                                <div className={`p-2 rounded-lg ${isDarkMode ? "bg-amber-400/10 text-amber-400" : "bg-amber-100 text-amber-600"}`}>
                                    <Monitor className="w-5 h-5" />
                                </div>
                                <div>
                                    <h3 className={`font-bold ${isDarkMode ? "text-white" : "text-gray-800"}`}>
                                        {project.title}
                                    </h3>
                                    <p className={`text-xs ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                                        Live Preview
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-2">
                                {project.link && (
                                    <a
                                        href={project.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={`p-2 rounded-lg transition-colors ${isDarkMode ? "hover:bg-gray-700 text-gray-300" : "hover:bg-gray-200 text-gray-600"
                                            }`}
                                        title="Open in new tab"
                                    >
                                        <ExternalLink className="w-5 h-5" />
                                    </a>
                                )}
                                {project.github && (
                                    <a
                                        href={project.github}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={`p-2 rounded-lg transition-colors ${isDarkMode ? "hover:bg-gray-700 text-gray-300" : "hover:bg-gray-200 text-gray-600"
                                            }`}
                                        title="View Source"
                                    >
                                        <Github className="w-5 h-5" />
                                    </a>
                                )}
                                <div className="w-px h-6 mx-2 bg-gray-300 dark:bg-gray-700"></div>
                                <button
                                    onClick={onClose}
                                    className={`p-2 rounded-lg transition-colors ${isDarkMode ? "hover:bg-gray-700 text-gray-300" : "hover:bg-gray-200 text-gray-600"
                                        }`}
                                >
                                    <X className="w-6 h-6" />
                                </button>
                            </div>
                        </div>

                        {/* Modal Content - Iframe */}
                        <div className="flex-1 w-full h-full bg-gray-100 dark:bg-gray-950 relative">
                            {project.link ? (
                                <div className="w-full h-full relative group">
                                    <iframe
                                        src={project.link}
                                        className="w-full h-full border-none bg-white"
                                        title={`${project.title} Preview`}
                                        loading="lazy"
                                    ></iframe>

                                    {/* Overlay for sites that might Block Iframes */}
                                    <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/60 to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
                                        <p className="text-white text-xs text-center flex items-center justify-center gap-2">
                                            <AlertCircle className="w-4 h-4" />
                                            If the preview doesn't load, use the external link button above.
                                        </p>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex flex-col items-center justify-center h-full text-center p-8">
                                    <div className={`w-20 h-20 mb-4 rounded-full flex items-center justify-center ${isDarkMode ? "bg-gray-800" : "bg-gray-100"
                                        }`}>
                                        <Monitor className={`w-10 h-10 ${isDarkMode ? "text-gray-600" : "text-gray-400"}`} />
                                    </div>
                                    <h4 className={`text-xl font-bold mb-2 ${isDarkMode ? "text-white" : "text-gray-800"}`}>
                                        Preview not available
                                    </h4>
                                    <p className={`max-w-md ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                                        This project might not have a live URL or requires a specific environment to run.
                                        Check the source code on GitHub for more details.
                                    </p>
                                    {project.github && (
                                        <a
                                            href={project.github}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="mt-6 px-6 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors flex items-center gap-2"
                                        >
                                            <Github className="w-4 h-4" />
                                            View on GitHub
                                        </a>
                                    )}
                                </div>
                            )}
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default ProjectPreviewModal;
