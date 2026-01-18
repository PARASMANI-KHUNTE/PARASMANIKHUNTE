import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto text-center">
        <p>© 2024 PARAS. All rights reserved.</p>
        <div className="flex justify-center space-x-4 mt-2">
          <a href="https://github.com/PARASMANI-KHUNTE" className="hover:text-blue-500">
            GitHub
          </a>
          <a href="https://www.linkedin.com/in/paras-mani-khunte-4a9a08233/" className="hover:text-blue-500">
            LinkedIn
          </a>
          <a href="https://www.instagram.com/parasmani_khunte/" className="hover:text-blue-500">
            Instagram
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;