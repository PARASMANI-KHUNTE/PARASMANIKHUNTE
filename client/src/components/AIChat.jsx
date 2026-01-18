import React, { useState, useRef, useEffect } from "react";
import api from '../api';
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, Send, X, Bot, User, Sparkles } from "lucide-react";
import GlassCard from "./ui/GlassCard";

const AIChat = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { role: 'model', text: "Hi! I'm the AI assistant for this portfolio. Ask me anything about my experience, projects, or skills!" }
    ]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isOpen]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMessage = input;
        setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
        setInput("");
        setLoading(true);

        try {
            const { data } = await api.post('/ai/chat', { message: userMessage });
            setMessages(prev => [...prev, { role: 'model', text: data.reply }]);
        } catch (error) {
            setMessages(prev => [...prev, { role: 'model', text: "Sorry, I'm having trouble connecting right now. Please try again later." }]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <motion.button
                onClick={() => setIsOpen(true)}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="fixed bottom-6 right-6 p-4 bg-indigo-600 rounded-full text-white shadow-[0_0_20px_rgba(99,102,241,0.5)] z-50 hover:bg-indigo-500 transition-colors border border-white/10"
            >
                <div className="absolute inset-0 rounded-full animate-ping bg-indigo-500/30" />
                <MessageSquare size={24} className="relative z-10" />
            </motion.button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 100, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 100, scale: 0.9 }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        className="fixed bottom-24 right-6 w-80 md:w-96 h-[500px] z-50"
                    >
                        <GlassCard className="!p-0 h-full flex flex-col overflow-hidden border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)]">
                            {/* Header */}
                            <div className="p-4 bg-indigo-600/20 border-b border-white/10 flex justify-between items-center backdrop-blur-md">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-indigo-500/20 rounded-lg">
                                        <Sparkles size={18} className="text-indigo-400" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-white font-space-grotesk">AI Assistant</h3>
                                        <div className="flex items-center gap-1.5">
                                            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                            <span className="text-xs text-gray-400">Online</span>
                                        </div>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="p-2 hover:bg-white/10 rounded-lg transition-colors text-gray-400 hover:text-white"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            {/* Messages */}
                            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-950/50">
                                {messages.map((msg, idx) => (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        key={idx}
                                        className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                                    >
                                        {msg.role === 'model' && (
                                            <div className="w-8 h-8 rounded-full bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center flex-shrink-0">
                                                <Bot size={16} className="text-indigo-400" />
                                            </div>
                                        )}
                                        <div
                                            className={`max-w-[80%] p-3.5 rounded-2xl text-sm leading-relaxed ${msg.role === 'user'
                                                ? 'bg-indigo-600 text-white rounded-tr-none shadow-lg shadow-indigo-500/20'
                                                : 'bg-white/5 text-gray-300 border border-white/10 rounded-tl-none'
                                                }`}
                                        >
                                            {msg.text}
                                        </div>
                                        {msg.role === 'user' && (
                                            <div className="w-8 h-8 rounded-full bg-gray-800 border border-white/10 flex items-center justify-center flex-shrink-0">
                                                <User size={16} className="text-gray-400" />
                                            </div>
                                        )}
                                    </motion.div>
                                ))}
                                {loading && (
                                    <div className="flex gap-3 justify-start">
                                        <div className="w-8 h-8 rounded-full bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center">
                                            <Bot size={16} className="text-indigo-400" />
                                        </div>
                                        <div className="bg-white/5 p-4 rounded-2xl rounded-tl-none border border-white/10 flex gap-1.5 items-center">
                                            <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce" />
                                            <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce delay-100" />
                                            <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce delay-200" />
                                        </div>
                                    </div>
                                )}
                                <div ref={messagesEndRef} />
                            </div>

                            {/* Input */}
                            <form onSubmit={handleSubmit} className="p-4 border-t border-white/10 bg-gray-900/50 backdrop-blur-md flex gap-2">
                                <input
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    placeholder="Ask anything..."
                                    className="flex-1 p-3 bg-white/5 border border-white/10 rounded-xl outline-none focus:border-indigo-500 focus:bg-white/10 transition-all text-white placeholder-gray-500"
                                />
                                <button
                                    type="submit"
                                    disabled={loading || !input.trim()}
                                    className="p-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-indigo-500/20"
                                >
                                    <Send size={20} />
                                </button>
                            </form>
                        </GlassCard>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default AIChat;
