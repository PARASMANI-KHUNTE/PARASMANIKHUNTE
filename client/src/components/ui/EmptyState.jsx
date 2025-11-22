import React from "react";
import { motion } from "framer-motion";
import { useTheme } from "../../context/ThemeContext";
import Button from "./Button";
import { Plus } from "lucide-react";

const EmptyState = ({
    icon: Icon,
    title,
    description,
    actionText = "Add Content",
    actionLink = "/admin",
    showAction = true
}) => {
    const { isDarkMode } = useTheme();

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className={`max-w-md mx-auto text-center py-20 px-8 rounded-3xl relative overflow-hidden ${isDarkMode
                    ? "bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700"
                    : "bg-gradient-to-br from-white to-gray-50 border border-gray-200 shadow-2xl"
                }`}
        >
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-amber-600/10 rounded-full blur-3xl" />

            <div className="relative z-10">
                {/* Icon with animation */}
                <motion.div
                    className={`mx-auto w-24 h-24 rounded-full flex items-center justify-center mb-6 relative ${isDarkMode ? "bg-gray-700" : "bg-amber-50"
                        }`}
                    animate={{
                        scale: [1, 1.05, 1],
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                >
                    {/* Pulsing ring */}
                    <motion.div
                        className={`absolute inset-0 rounded-full ${isDarkMode ? "bg-amber-500/20" : "bg-amber-400/30"
                            }`}
                        animate={{
                            scale: [1, 1.3],
                            opacity: [0.5, 0]
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeOut"
                        }}
                    />
                    <Icon className={`w-12 h-12 relative z-10 ${isDarkMode ? "text-gray-500" : "text-amber-500"}`} />
                </motion.div>

                {/* Title */}
                <h3 className={`text-2xl md:text-3xl font-bold mb-4 ${isDarkMode ? "text-white" : "text-gray-800"}`}>
                    {title}
                </h3>

                {/* Description */}
                <p className={`mb-8 text-base leading-relaxed ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                    {description}
                </p>

                {/* Action Button */}
                {showAction && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        <Button
                            onClick={() => window.location.href = actionLink}
                            icon={<Plus className="w-5 h-5" />}
                            size="lg"
                            className="shadow-lg"
                        >
                            {actionText}
                        </Button>
                    </motion.div>
                )}

                {/* Decorative dots */}
                <div className="flex justify-center gap-2 mt-8">
                    {[...Array(3)].map((_, i) => (
                        <motion.div
                            key={i}
                            className={`w-2 h-2 rounded-full ${isDarkMode ? "bg-gray-700" : "bg-gray-300"
                                }`}
                            animate={{
                                scale: [1, 1.5, 1],
                                opacity: [0.5, 1, 0.5]
                            }}
                            transition={{
                                duration: 1.5,
                                repeat: Infinity,
                                delay: i * 0.2
                            }}
                        />
                    ))}
                </div>
            </div>
        </motion.div>
    );
};

export default EmptyState;
