import React, { useEffect, useState } from "react";
import { Eye } from "lucide-react";
import { getVisitorCount, incrementVisitor } from "../services/api";
import { useTheme } from "../context/ThemeContext";

const VisitorCounter = () => {
    const [count, setCount] = useState(0);
    const { isDarkMode } = useTheme();

    useEffect(() => {
        const initVisitor = async () => {
            try {
                // Check if visited in this session
                const hasVisited = sessionStorage.getItem("hasVisited");
                if (!hasVisited) {
                    const { data } = await incrementVisitor();
                    setCount(data.count);
                    sessionStorage.setItem("hasVisited", "true");
                } else {
                    const { data } = await getVisitorCount();
                    setCount(data.count);
                }
            } catch (error) {
                console.error("Error fetching visitor count:", error);
            }
        };
        initVisitor();
    }, []);

    return (
        <div className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium ${isDarkMode ? "bg-gray-800 text-amber-400" : "bg-white text-amber-600 shadow-md"
            }`}>
            <Eye size={16} />
            <span>{count} Views</span>
        </div>
    );
};

export default VisitorCounter;
