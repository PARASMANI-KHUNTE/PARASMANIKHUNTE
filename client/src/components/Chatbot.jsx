import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Bot, User, Sparkles, AlertCircle } from "lucide-react";
import { chatWithAI } from "../services/api";
import { useTheme } from "../context/ThemeContext";

const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { role: "assistant", text: "Hi! I'm Paras's AI assistant. Ask me anything about his skills, experience, or projects!" }
    ]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);
    const { isDarkMode } = useTheme();

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMessage = input;
        setMessages((prev) => [...prev, { role: "user", text: userMessage }]);
        setInput("");
        setIsLoading(true);

        try {
            const { data } = await chatWithAI(userMessage);
            setMessages((prev) => [...prev, { role: "assistant", text: data.reply }]);
        } catch (error) {
            console.error("Chatbot Error:", error);
            setMessages((prev) => [...prev, {
                role: "assistant",
                text: "I'm currently having trouble connecting to the server. Please try again later or contact Paras directly via email.",
                isError: true
            }]);
        } finally {
            setIsLoading(false);
        }
    };

    const quickReplies = [
        "Tell me about his skills",
        "What projects has he worked on?",
        "How can I contact him?"
    ];

    const handleQuickReply = (reply) => {
        setInput(reply);
    };

    return (
        <div className="fixed bottom-6 right-6 z-50 print:hidden">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: 20 }}
                        className="mb-4 w-[90vw] md:w-96 rounded-3xl overflow-hidden flex flex-col shadow-2xl glass border border-white/20 dark:border-gray-700"
                        style={{ height: "600px", maxHeight: "80vh" }}
                    >
                        {/* Header */}
                        <div className="bg-gradient-to-r from-primary-600 to-accent-600 p-4 flex justify-between items-center text-white">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
                                    <Bot size={20} />
                                </div>
                                <div>
                                    <span className="font-bold block leading-tight">AI Assistant</span>
                                    <span className="text-xs text-primary-100 flex items-center gap-1">
                                        <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></span>
                                        Online
                                    </span>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="p-2 hover:bg-white/20 rounded-full transition-colors"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/50 dark:bg-gray-900/50">
                            {messages.map((msg, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className={`flex gap-3 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                                >
                                    {msg.role === "assistant" && (
                                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center flex-shrink-0 mt-1">
                                            <Bot size={14} className="text-white" />
                                        </div>
                                    )}

                                    <div
                                        className={`max-w-[80%] p-3 rounded-2xl text-sm ${msg.role === "user"
                                                ? "bg-primary-600 text-white rounded-br-none"
                                                : msg.isError
                                                    ? "bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 border border-red-100 dark:border-red-800 rounded-bl-none"
                                                    : "bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-700 rounded-bl-none shadow-sm"
                                            }`}
                                    >
                                        {msg.isError && <AlertCircle size={16} className="inline mr-1 mb-0.5" />}
                                        {msg.text}
                                    </div>
                                </motion.div>
                            ))}

                            {/* Loading Indicator */}
                            {isLoading && (
                                <div className="flex gap-3">
                                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center flex-shrink-0">
                                        <Bot size={14} className="text-white" />
                                    </div>
                                    <div className="bg-white dark:bg-gray-800 p-3 rounded-2xl rounded-bl-none shadow-sm border border-gray-200 dark:border-gray-700">
                                        <div className="flex gap-1">
                                            <span className="w-2 h-2 bg-primary-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></span>
                                            <span className="w-2 h-2 bg-primary-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></span>
                                            <span className="w-2 h-2 bg-primary-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></span>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Quick Replies */}
                            {messages.length === 1 && !isLoading && (
                                <div className="flex flex-wrap gap-2 mt-4">
                                    {quickReplies.map((reply, i) => (
                                        <button
                                            key={i}
                                            onClick={() => handleQuickReply(reply)}
                                            className="text-xs bg-white dark:bg-gray-800 hover:bg-primary-50 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700 px-3 py-1.5 rounded-full transition-colors text-primary-600 dark:text-primary-400"
                                        >
                                            {reply}
                                        </button>
                                    ))}
                                </div>
                            )}

                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input Area */}
                        <form onSubmit={handleSubmit} className="p-3 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    placeholder="Ask me anything..."
                                    className="flex-1 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                                />
                                <button
                                    type="submit"
                                    disabled={!input.trim() || isLoading}
                                    className="bg-primary-600 hover:bg-primary-700 text-white p-2 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                >
                                    <Send size={18} />
                                </button>
                            </div>
                            <div className="text-center mt-2">
                                <span className="text-[10px] text-gray-400">Powered by Gemini AI</span>
                            </div>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(!isOpen)}
                className="bg-gradient-to-r from-primary-600 to-accent-600 text-white p-4 rounded-full shadow-lg hover:shadow-primary-500/30 transition-all relative"
            >
                {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
                {!isOpen && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white dark:border-gray-900"></span>
                )}
            </motion.button>
        </div>
    );
};

export default Chatbot;
