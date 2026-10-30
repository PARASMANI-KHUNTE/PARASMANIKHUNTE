import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import ProjectDetail from "./pages/ProjectDetail";
import Education from "./pages/Education";
import Experience from "./pages/Experience";
import Skills from "./pages/Skills";
import { ThemeProvider } from "./context/ThemeContext";
import { ToastProvider } from "./context/ToastContext";
import Layout from "./components/common/Layout";

export const AppRoutes = () => {
  return (
    <div className="flex flex-col min-h-screen font-inter overflow-x-hidden">
      <Navbar />
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:slug" element={<ProjectDetail />} />
          <Route path="/education" element={<Education />} />
          <Route path="/experience" element={<Experience />} />
          <Route path="/skills" element={<Skills />} />
        </Routes>
      </Layout>
      <Footer />
    </div>
  );
};

const App = () => {
  return (
    <ThemeProvider>
      <ToastProvider>
        <Router>
          <AppRoutes />
        </Router>
      </ToastProvider>
    </ThemeProvider>
  );
};

export default App;
