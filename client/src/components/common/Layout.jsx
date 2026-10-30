import React from "react";
import { useLocation } from "react-router-dom";
import ScrollToTop from "./ScrollToTop";

const Layout = ({ children }) => {
  const location = useLocation();

  return (
    <>
      <ScrollToTop />
      <main key={location.pathname} className="flex-grow transition-opacity duration-200">
        {children}
      </main>
    </>
  );
};

export default Layout;
