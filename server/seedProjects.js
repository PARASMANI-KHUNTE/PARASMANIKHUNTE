/**
 * Seed script to populate the database with featured projects
 * Run with: node seedProjects.js
 */

require('dotenv').config();
const mongoose = require('mongoose');
const Project = require('./models/Project');

const featuredProjects = [
    // 🥇 TOP PROJECT - MyCircle
    {
        title: "MyCircle",
        description: "A hyperlocal exchange platform for neighbors to post and discover jobs, services, and items for sale/rent. Features include real-time chat with Socket.io, AI content moderation via Gemini, trust & reputation system, interactive map view, and post analytics.",
        tech: "React Native, React 19, Vite, Node.js, Express, MongoDB, Socket.io, Tailwind CSS, NativeWind, Cloudinary, Google OAuth, Gemini AI",
        link: "",
        github: "https://github.com/PARASMANI-KHUNTE/MyCircle",
        year: "2025",
        image: ""
    },
    // 🥈 Admin Dashboard
    {
        title: "Admin Dashboard",
        description: "A full-stack web application for managing hotels, vehicles, and regions with CRUD operations. Features user-friendly interface, secure JWT authentication, protected routes, and modern responsive UI built with Tailwind CSS.",
        tech: "React, React Router, Axios, Tailwind CSS, Node.js, Express, MongoDB, JWT, Render",
        link: "",
        github: "https://github.com/PARASMANI-KHUNTE/Admin-Dashboard",
        year: "2024",
        image: ""
    },
    // 🥉 Warehouse Management System
    {
        title: "Warehouse Management System",
        description: "A MERN stack application for inventory management, order processing, and warehouse space optimization. Includes data visualization with Recharts, user role-based authentication, and CSV import/export for bulk operations.",
        tech: "React, Vite, Tailwind CSS, Node.js, Express, MongoDB, Mongoose, Multer, Recharts, Headless UI",
        link: "",
        github: "https://github.com/PARASMANI-KHUNTE/Warehouse-Management-system",
        year: "2024",
        image: ""
    },
    // OrgSync
    {
        title: "OrgSync",
        description: "An organization synchronization and management platform designed to streamline team collaboration and organizational workflows with modern web technologies.",
        tech: "JavaScript, Node.js, Express, React, MongoDB",
        link: "",
        github: "https://github.com/PARASMANI-KHUNTE/orgSync",
        year: "2024",
        image: ""
    },
    // CafeAutomation
    {
        title: "CafeAutomation",
        description: "A full-stack web application to automate cafe operations including order management, inventory tracking, and customer interactions. Features real-time updates, role-based access control, and responsive design.",
        tech: "React, Node.js, Express, MongoDB, JavaScript",
        link: "",
        github: "https://github.com/PARASMANI-KHUNTE/CafeAutomation",
        year: "2024",
        image: ""
    },
    // Chat Application
    {
        title: "Chat Application",
        description: "A real-time chat application with Google OAuth authentication, modern glassmorphism UI design, and seamless messaging experience deployed on Vercel.",
        tech: "React, Node.js, Express, Socket.io, Google OAuth, Vercel",
        link: "https://chat-application-snowy-eight.vercel.app",
        github: "https://github.com/PARASMANI-KHUNTE/ChatApplication",
        year: "2024",
        image: ""
    },
    // FaceTrack
    {
        title: "FaceTrack",
        description: "A face tracking and recognition system implementing computer vision techniques for real-time face detection and tracking applications.",
        tech: "Python, OpenCV, Machine Learning",
        link: "",
        github: "https://github.com/PARASMANI-KHUNTE/FaceTrack",
        year: "2024",
        image: ""
    },
    // FRAS - Facial Recognition Attendance System
    {
        title: "FRAS",
        description: "Facial Recognition Attendance System - An automated attendance tracking solution using facial recognition technology for efficient and contactless attendance management.",
        tech: "Python, OpenCV, Deep Learning, Flask",
        link: "",
        github: "https://github.com/PARASMANI-KHUNTE/FRAS",
        year: "2024",
        image: ""
    },
    // HRMS
    {
        title: "HRMS",
        description: "Human Resource Management System - A comprehensive HR solution for managing employee data, attendance, payroll, and organizational hierarchy.",
        tech: "React, Node.js, Express, MongoDB",
        link: "",
        github: "https://github.com/PARASMANI-KHUNTE/HRMS",
        year: "2024",
        image: ""
    },
    // Resume Builder
    {
        title: "Resume Builder",
        description: "An intuitive resume builder application that helps users create professional resumes with customizable templates and easy-to-use interface.",
        tech: "React, JavaScript, CSS",
        link: "",
        github: "https://github.com/PARASMANI-KHUNTE/Resume-Builder",
        year: "2024",
        image: ""
    }
];

async function seedProjects() {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGO_URI);
        console.log('✅ Connected to MongoDB');

        // Clear existing projects
        await Project.deleteMany({});
        console.log('🗑️  Cleared existing projects');

        // Insert new projects
        const result = await Project.insertMany(featuredProjects);
        console.log(`✨ Inserted ${result.length} featured projects:`);

        result.forEach((project, index) => {
            console.log(`   ${index + 1}. ${project.title}`);
        });

        console.log('\n🎉 Database seeded successfully!');
    } catch (error) {
        console.error('❌ Error seeding database:', error);
    } finally {
        await mongoose.connection.close();
        console.log('📤 Disconnected from MongoDB');
    }
}

seedProjects();
