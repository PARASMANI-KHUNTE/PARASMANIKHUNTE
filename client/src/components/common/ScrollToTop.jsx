import React, { useEffect, useState } from "react";
import { ChevronUp } from "lucide-react";

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    window.addEventListener("scroll", toggleVisibility, { passive: true });
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  if (!isVisible) return null;

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-6 right-6 z-40 flex items-center justify-center w-11 h-11 rounded-full bg-amber-500 hover:bg-amber-600 text-white shadow-md transition-all duration-200 cursor-pointer"
      title="Scroll to top"
      aria-label="Scroll to top"
      type="button"
    >
      <ChevronUp className="w-5 h-5" />
    </button>
  );
};

export default ScrollToTop;
