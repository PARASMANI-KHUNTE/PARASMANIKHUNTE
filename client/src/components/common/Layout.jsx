import React, { useEffect, useState } from "react";
import { motion, useScroll, useSpring, AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";
import ScrollToTop from "./ScrollToTop";
import { sounds } from "../../utils/SoundManager";

const CustomCursor = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [mood, setMood] = useState(0); 
  const { isDarkMode } = useTheme();

  useEffect(() => {
    const handleMouseMove = (e) => {
      sounds.init();
      setMousePos({ x: e.clientX, y: e.clientY });
      const target = e.target;
      setIsHovering(
        target.closest('button') || 
        target.closest('a') || 
        window.getComputedStyle(target).cursor === 'pointer'
      );
    };

    const handleMouseDown = (e) => {
      sounds.init();
      
      // Don't play ghost sounds if clicking Navbar links
      if (e.target.closest('nav')) return;

      setIsClicked(true);
      const newMood = Math.floor(Math.random() * 3) + 1;
      setMood(newMood);
      sounds.playMood(newMood);
      
      setTimeout(() => {
        setIsClicked(false);
        setMood(0);
      }, 500);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
    };
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[9999] hidden md:block"
      animate={{ 
        x: mousePos.x - 20, 
        y: mousePos.y - 20,
        scale: isClicked ? 0.8 : (isHovering ? 1.4 : 1),
        rotate: mood === 1 ? 360 : ((mousePos.x / 15) % 8 - 4)
      }}
      transition={{ 
        rotate: mood === 1 ? { duration: 0.5, ease: "easeInOut" } : { type: "spring", damping: 25, stiffness: 350 },
        scale: { type: "spring", stiffness: 500, damping: 15 }
      }}
    >
      <svg width="60" height="60" viewBox="0 0 40 40" className="drop-shadow-lg overflow-visible">
        {/* Glow Aura */}
        <motion.circle 
          cx="20" cy="20" r="10" 
          fill={isDarkMode ? "#fbbf24" : "#f59e0b"} 
          animate={{ 
            opacity: isClicked ? 0.6 : [0.1, 0.3, 0.1], 
            scale: isClicked ? 2 : [1, 1.3, 1] 
          }}
          transition={{ repeat: isClicked ? 0 : Infinity, duration: 2.5 }}
          className="blur-xl"
        />
        
        {/* Cute Ghost Body */}
        <motion.path
          d="M20 10C15 10 11 14 11 19V30L14 27L17 30L20 27L23 30L26 27L29 30V19C29 14 25 10 20 10Z"
          fill={isDarkMode ? "rgba(255,255,255,0.95)" : "rgba(31,41,55,0.95)"}
          animate={{ 
            y: mood === 2 ? [0, 5, 0] : [0, -2, 0],
            scaleX: mood === 2 ? [1, 1.4, 1] : 1,
            scaleY: mood === 2 ? [1, 0.6, 1] : 1
          }}
          transition={{ 
            repeat: mood === 0 ? Infinity : 0, 
            duration: mood === 2 ? 0.3 : 2, 
            ease: "easeInOut" 
          }}
        />
        
        {/* Heart Eyes if Mood is Love (3) */}
        {mood === 3 ? (
          <g>
            <motion.path d="M15 17 Q15 14 17 14 Q19 14 19 17 Q19 19 17 21 L17 21 L15 17" fill="#f472b6" />
            <motion.path d="M21 17 Q21 14 23 14 Q25 14 25 17 Q25 19 23 21 L23 21 L21 17" fill="#f472b6" />
          </g>
        ) : (
          <g>
            <motion.circle cx="17" cy="18" r="1.2" fill={isDarkMode ? "black" : "white"} 
              animate={{ scaleY: [1, 0.1, 1] }} transition={{ repeat: Infinity, duration: 3, repeatDelay: 2 }} />
            <motion.circle cx="23" cy="18" r="1.2" fill={isDarkMode ? "black" : "white"}
              animate={{ scaleY: [1, 0.1, 1] }} transition={{ repeat: Infinity, duration: 3, repeatDelay: 2 }} />
          </g>
        )}
        
        {/* Blush */}
        <motion.g
          animate={{ opacity: mood === 3 ? 1 : 0.4 }}
        >
          <circle cx="15" cy="20" r="1" fill="#f472b6" />
          <circle cx="25" cy="20" r="1" fill="#f472b6" />
        </motion.g>

        {/* Click Particles */}
        {isClicked && [...Array(5)].map((_, i) => (
          <motion.circle
            key={i}
            cx="20" cy="20" r="2"
            fill={isDarkMode ? "#fbbf24" : "#f59e0b"}
            initial={{ opacity: 1, scale: 1 }}
            animate={{ 
              x: (Math.random() - 0.5) * 60, 
              y: (Math.random() - 0.5) * 60,
              opacity: 0,
              scale: 0
            }}
            transition={{ duration: 0.5 }}
          />
        ))}
      </svg>
    </motion.div>
  );
};

const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-amber-500 origin-left z-[100]"
      style={{ scaleX }}
    />
  );
};

const Layout = ({ children }) => {
  const location = useLocation();

  useEffect(() => {
    // Play sci-fi sweep on route change
    if (location.pathname !== "/") {
      sounds.playInit();
    }
  }, [location.pathname]);

  return (
    <>
      <CustomCursor />
      <ScrollProgress />
      <ScrollToTop />
      <AnimatePresence mode="wait">
        <motion.main
          key={location.pathname}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="flex-grow"
        >
          {children}
        </motion.main>
      </AnimatePresence>
    </>
  );
};

export default Layout;
