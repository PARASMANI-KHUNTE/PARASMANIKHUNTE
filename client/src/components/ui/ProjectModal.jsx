import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Github, ExternalLink, Code } from "lucide-react";
import GlassCard from "./GlassCard";

const ProjectModal = ({ project, isOpen, onClose }) => {
    if (!project) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 20 }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        className="relative w-full max-w-5xl max-h-[90vh] overflow-hidden"
                    >
                        <GlassCard className="!p-0 h-full overflow-y-auto custom-scrollbar border-indigo-500/30 shadow-[0_0_50px_rgba(99,102,241,0.2)]">
                            {/* Close Button */}
                            <button
                                onClick={onClose}
                                className="absolute top-4 right-4 z-50 p-2 rounded-full bg-black/50 text-white hover:bg-white/20 transition-all border border-white/10"
                            >
                                <X size={24} />
                            </button>

                            <div className="grid grid-cols-1 lg:grid-cols-2 h-full">
                                {/* Image Side */}
                                <div className="relative h-[300px] lg:h-full bg-gray-900 border-b lg:border-b-0 lg:border-r border-white/10 overflow-hidden">
                                    {project.image ? (
                                        <img
                                            src={project.image}
                                            alt={project.title}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center">
                                            <Code size={80} className="text-white/10" />
                                        </div>
                                    )}
                                    <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-transparent to-transparent opacity-60" />
                                </div>

                                {/* Info Side */}
                                <div className="p-8 lg:p-12 flex flex-col h-full bg-black/40">
                                    <motion.div
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.2 }}
                                    >
                                        <h2 className="text-4xl md:text-5xl font-bold text-white font-space-grotesk tracking-tight mb-4">
                                            {project.title}
                                        </h2>

                                        <div className="flex flex-wrap gap-2 mb-8">
                                            {project.tech && project.tech.split(',').map((t, i) => (
                                                <span
                                                    key={i}
                                                    className="px-3 py-1 rounded-lg bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 text-sm font-medium"
                                                >
                                                    {t.trim()}
                                                </span>
                                            ))}
                                        </div>

                                        <div className="space-y-6">
                                            <div>
                                                <h4 className="text-sm uppercase tracking-widest text-indigo-400 font-bold mb-3">About the project</h4>
                                                <p className="text-gray-300 leading-relaxed text-lg">
                                                    {project.description}
                                                </p>
                                            </div>

                                            {/* Add more project details if you have them in the schema */}
                                            {/* For example, if there were longDescription or features array */}
                                        </div>

                                        <div className="flex flex-wrap gap-4 mt-12 pt-8 border-t border-white/10">
                                            {project.link && (
                                                <a
                                                    href={project.link}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex items-center gap-2 px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl transition-all shadow-[0_0_20px_rgba(99,102,241,0.3)] hover:shadow-[0_0_30px_rgba(99,102,241,0.5)]"
                                                >
                                                    <ExternalLink size={20} /> Launch Live Demo
                                                </a>
                                            )}
                                            {project.github && (
                                                <a
                                                    href={project.github}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex items-center gap-2 px-8 py-4 bg-white/5 hover:bg-white/10 text-white font-bold rounded-xl transition-all border border-white/10"
                                                >
                                                    <Github size={20} /> View Source Code
                                                </a>
                                            )}
                                        </div>
                                    </motion.div>
                                </div>
                            </div>
                        </GlassCard>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default ProjectModal;
