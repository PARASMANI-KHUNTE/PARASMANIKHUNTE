import React, { useState } from "react";
import api from "../../api";
import { Sparkles, Loader2, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const AIFormAssistant = ({ type, field, context, onSelect }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [suggestions, setSuggestions] = useState([]);

    const fetchSuggestions = async () => {
        setLoading(true);
        setIsOpen(true);
        try {
            const { data } = await api.post("/ai/suggest", {
                type,
                field,
                context
            });
            setSuggestions(data.suggestions || []);
        } catch (error) {
            console.error("AI suggestion error:", error);
            setSuggestions(["Unable to fetch suggestions. Please try again."]);
        } finally {
            setLoading(false);
        }
    };

    const handleSelect = (suggestion) => {
        onSelect(suggestion);
        setIsOpen(false);
        setSuggestions([]);
    };

    return (
        <div className="relative">
            {/* Sparkles Trigger Button */}
            <button
                type="button"
                onClick={fetchSuggestions}
                className="p-2 rounded-lg bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-400 hover:text-indigo-300 transition-all hover:scale-110 active:scale-95"
                title="Get AI suggestions"
            >
                <Sparkles size={18} className="animate-pulse" />
            </button>

            {/* Suggestions Popup */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        className="absolute right-0 top-12 z-50 w-96 max-h-96 overflow-y-auto"
                    >
                        <div className="bg-gray-900/95 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl shadow-indigo-500/10 p-4">
                            <div className="flex items-center justify-between mb-3">
                                <div className="flex items-center gap-2 text-indigo-300 font-medium">
                                    <Sparkles size={16} />
                                    <span className="text-sm">AI Suggestions</span>
                                </div>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="text-gray-400 hover:text-white transition-colors"
                                >
                                    ✕
                                </button>
                            </div>

                            {loading ? (
                                <div className="flex items-center justify-center py-8">
                                    <Loader2 className="animate-spin text-indigo-400" size={24} />
                                    <span className="ml-2 text-gray-400">Generating suggestions...</span>
                                </div>
                            ) : (
                                <div className="space-y-2">
                                    {suggestions.map((suggestion, index) => (
                                        <motion.button
                                            key={index}
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: index * 0.1 }}
                                            onClick={() => handleSelect(suggestion)}
                                            className="w-full text-left p-3 rounded-lg bg-white/5 hover:bg-indigo-500/10 border border-white/5 hover:border-indigo-500/30 text-gray-300 hover:text-white transition-all group"
                                        >
                                            <div className="flex items-start gap-2">
                                                <Check className="text-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 mt-0.5" size={16} />
                                                <p className="text-sm leading-relaxed">{suggestion}</p>
                                            </div>
                                        </motion.button>
                                    ))}
                                </div>
                            )}

                            {!loading && suggestions.length === 0 && (
                                <p className="text-gray-500 text-sm text-center py-4">
                                    No suggestions available. Try filling in more details first.
                                </p>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default AIFormAssistant;
