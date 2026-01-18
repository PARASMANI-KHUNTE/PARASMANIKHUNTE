const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Project = require('./models/Project');
const Experience = require('./models/Experience');
const Education = require('./models/Education');

dotenv.config();

const projects = [
    {
        title: "PhotoShare",
        description: "A social media platform for photographers to share their work and connect with other creatives.",
        tech: "React, Node.js, MongoDB, Tailwind CSS, Firebase",
        link: "https://photoshare-ctj3.onrender.com/",
        github: "https://github.com/username/photoshare",
        year: "2023",
        image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1000&auto=format&fit=crop"
    },
    {
        title: "FaceTrack",
        description: "Multi-Branch, Multi-Department Organization Management System with Machine Learning integration.",
        tech: "React, Redux, Machine Learning, TailwindCSS, Express, MongoDB",
        link: "https://facetrack-0s10.onrender.com",
        github: "https://github.com/PARASMANI-KHUNTE/FaceTrack",
        year: "2025",
        image: "https://images.unsplash.com/photo-1555421689-491a97ff2040?q=80&w=1000&auto=format&fit=crop"
    },
    {
        title: "Hotel Management System",
        description: "A comprehensive admin panel for managing hotel bookings, guest check-ins, room availability, and analytics.",
        tech: "MERN Stack, Tailwind CSS",
        link: "https://admin-dashboard-js6u.onrender.com/",
        github: "https://github.com/PARASMANI-KHUNTE/Admin-Dashboard",
        year: "2025",
        image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1000&auto=format&fit=crop"
    }
];

const experience = [
    {
        company: "Tech Innovators Inc",
        role: "Full Stack Developer Intern",
        year: "2024 - Present",
        description: "Developed and maintained web applications using React and Node.js. Collaborated with cross-functional teams to define features.",
        technologies: "React, Node.js, MongoDB, Git"
    }
];

const education = [
    {
        institution: "University of Technology",
        degree: "B.Tech in Computer Science",
        year: "2021 - 2025",
        description: "Focused on Software Engineering, Data Structures, and AI."
    }
];

const User = require('./models/User');
const argon2 = require('argon2');

// ... existing code ...

const seedDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected');

        // Seed Admin User
        await User.deleteMany({});
        const hashedPassword = await argon2.hash('password');
        await User.create({
            username: 'admin',
            password: hashedPassword
        });
        console.log('👤 Admin User Created (admin/password)');

        await Project.deleteMany({});
        await Experience.deleteMany({});
        await Education.deleteMany({});

        await Project.insertMany(projects);
        await Experience.insertMany(experience);
        await Education.insertMany(education);

        console.log('✅ Database Seeded Successfully!');
        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

seedDB();
