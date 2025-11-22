import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ModernLayout from "./components/ModernLayout";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import Contact from "./pages/Contact";
import Education from "./pages/Education";
import Experience from "./pages/Experience";
import Admin from "./pages/Admin";
import { ThemeProvider } from "./context/ThemeContext";

const App = () => {
  return (
    <ThemeProvider>
      <Router>
        <ModernLayout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/education" element={<Education />} />
            <Route path="/experience" element={<Experience />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </ModernLayout>
      </Router>
    </ThemeProvider>
  );
};

export default App;