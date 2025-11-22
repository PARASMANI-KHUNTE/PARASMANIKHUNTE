const { GoogleGenerativeAI } = require('@google/generative-ai');
const asyncHandler = require('express-async-handler');
const dotenv = require('dotenv');

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const resumeContext = `
You are an AI assistant for Parasmani Khunte's portfolio website. Your job is to answer questions about Paras based on his resume and portfolio.
Here is Paras's background:

**Summary:**
Full Stack Developer & Creative Problem Solver. Specialized in React, Node.js, MongoDB, and modern web technologies.

**Education:**
- Bachelor of Computer Application, Guru Ghasidas University (2022 - 2025). GPA: 8.2.
- Higher Secondary School, Kendriya Vidyalaya (2020 - 2021).

**Experience:**
- Technical Intern at Hybrowlabs (March 2025 - Present): React + Frappe, Python.
- Full Stack Developer Freelancer at Akkuraa IT Services (April 2025 - Present): MERN Stack.
- Web Developer Intern at Akkuraa IT Services (Jan 2025 - April 2025).
- Software Engineer Intern at Bluestock (Nov 2024 - Dec 2024): Python, Django.
- Full Stack Developer Intern at EliteTech Intern (Oct 2024 - Nov 2024).

**Projects:**
- PhotoShare: Social media for photographers (React, Node, MongoDB).
- FaceTrack: Organization Management System (React, Redux, ML).
- Hotel Management System: Admin panel for hotels.

**Skills:**
Frontend: React, Tailwind CSS, Redux, HTML, CSS, JavaScript.
Backend: Node.js, Express, Python, Django.
Database: MongoDB.
Other: IoT, Machine Learning.

**Contact:**
Email: parasmanikhunte@gmail.com
LinkedIn: https://www.linkedin.com/in/parasmani-khunte-330488228/

**Instructions:**
- Answer in the first person as if you are representing Paras, or as a helpful assistant "I can tell you about Paras...".
- Keep answers concise and professional.
- If asked about something not in this context, say you don't have that information but they can contact Paras directly.
`;

const chatWithAI = asyncHandler(async (req, res) => {
    const { message } = req.body;

    console.log("AI Chat Request Received:", message);

    if (!process.env.GEMINI_API_KEY) {
        console.error("Error: GEMINI_API_KEY is missing in environment variables.");
        res.status(500);
        throw new Error('Gemini API Key not configured');
    } else {
        console.log("GEMINI_API_KEY is present.");
    }

    try {
        // Try using the newer flash model first
        const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

        const chat = model.startChat({
            history: [
                {
                    role: 'user',
                    parts: [{ text: 'Who are you?' }],
                },
                {
                    role: 'model',
                    parts: [{ text: 'I am an AI assistant for Parasmani Khunte. I can answer questions about his skills, experience, and projects.' }],
                },
            ],
            generationConfig: {
                maxOutputTokens: 200,
            },
        });

        const result = await chat.sendMessage(`${resumeContext}\n\nUser Question: ${message}`);
        const response = await result.response;
        const text = response.text();

        res.json({ reply: text });

    } catch (error) {
        console.error('AI Error Details:', error);

        // Fallback Mock Response with Enhanced Keyword Matching
        console.log("Using Fallback Mock Response due to API failure.");

        const lowerMessage = message.toLowerCase();
        let reply = "";

        // Duration/time-related questions (CHECK FIRST to avoid being caught by skill/experience keywords)
        if (lowerMessage.includes("how long") || lowerMessage.includes("how many") || lowerMessage.includes("duration") || lowerMessage.includes("count") || (lowerMessage.includes("months") || lowerMessage.includes("years"))) {
            if (lowerMessage.includes("skill") || lowerMessage.includes("experience") || lowerMessage.includes("work")) {
                reply = "Paras has been actively developing his skills since 2022 when he started his Bachelor's degree. He has professional work experience starting from October 2024, which is about 4-5 months of hands-on industry experience. He's been coding and building projects for over 2 years.";
            } else {
                reply = "Paras started his Bachelor of Computer Application in 2022 and is currently in his final year (graduating in 2025). He has been working professionally since October 2024.";
            }
        }
        // Contact information
        else if (lowerMessage.includes("contact") || lowerMessage.includes("email") || lowerMessage.includes("phone") || lowerMessage.includes("reach")) {
            reply = "You can contact Paras via email at parasmanikhunte@gmail.com or call him at +91 8103713757. You can also use the Contact form on this website.";
        }
        // Projects
        else if (lowerMessage.includes("project") || lowerMessage.includes("portfolio")) {
            reply = "Paras has worked on several impressive projects like PhotoShare (Social Media), FaceTrack (Organization Management), and a Hotel Management System. Check out the Projects page for more details!";
        }
        // Skills and technologies
        else if (lowerMessage.includes("skill") || lowerMessage.includes("stack") || lowerMessage.includes("technology") || lowerMessage.includes("tech")) {
            reply = "Paras is a Full Stack Developer skilled in React, Node.js, MongoDB, Express, Python, and Django. He also has experience with IoT and Machine Learning.";
        }
        // Experience and jobs
        else if (lowerMessage.includes("experience") || lowerMessage.includes("job") || lowerMessage.includes("intern") || lowerMessage.includes("work")) {
            reply = "Paras has experience as a Technical Intern at Hybrowlabs (March 2025 - Present), Full Stack Developer Freelancer at Akkuraa IT Services (April 2025 - Present), and has also interned at Bluestock and EliteTech. He has been actively working in the industry since October 2024.";
        }
        // Education
        else if (lowerMessage.includes("education") || lowerMessage.includes("degree") || lowerMessage.includes("university") || lowerMessage.includes("college")) {
            reply = "Paras is pursuing a Bachelor of Computer Application from Guru Ghasidas University (2022-2025) with a GPA of 8.2. He completed his Higher Secondary School from Kendriya Vidyalaya in 2021.";
        }
        // Greeting
        else if (lowerMessage.includes("hello") || lowerMessage.includes("hi") || lowerMessage.includes("hey")) {
            reply = "Hello! I'm Paras's AI assistant. I'm currently operating in offline mode, but I can still help you with basic information about Paras. What would you like to know?";
        }
        // Who/what questions
        else if (lowerMessage.includes("who") || lowerMessage.includes("what is") || lowerMessage.includes("tell me about")) {
            reply = "Paras is a Full Stack Developer and Creative Problem Solver specializing in React, Node.js, MongoDB, and modern web technologies. He's currently pursuing his BCA from Guru Ghasidas University with an 8.2 GPA and has professional experience at companies like Hybrowlabs and Akkuraa IT Services.";
        }
        // Default fallback
        else {
            reply = "I'm currently in offline mode and can provide basic information about Paras. You can ask me about his skills, projects, experience, education, or contact information. For detailed answers, please contact Paras directly at parasmanikhunte@gmail.com.";
        }

        res.json({ reply });
    }
});

const pingAI = asyncHandler(async (req, res) => {
    // Simple health check – returns status ok if API key is present
    if (!process.env.GEMINI_API_KEY) {
        return res.status(500).json({ status: 'error', message: 'GEMINI_API_KEY missing' });
    }
    try {
        // Optionally we could make a lightweight request to Gemini to verify connectivity
        // For now just respond OK
        res.json({ status: 'online' });
    } catch (err) {
        console.error('Ping AI error:', err);
        res.status(500).json({ status: 'error', message: err.message });
    }
});

module.exports = { chatWithAI, pingAI };
