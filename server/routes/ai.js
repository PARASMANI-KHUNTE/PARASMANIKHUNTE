const express = require('express');
const router = express.Router();
const { GoogleGenerativeAI } = require('@google/generative-ai');
const Project = require('../models/Project');
const Experience = require('../models/Experience');
const Education = require('../models/Education');

// @route   POST /api/ai/chat
// @desc    Chat with AI about the portfolio
// @access  Public
router.post('/chat', async (req, res) => {
    try {
        const { message } = req.body;

        if (!process.env.GEMINI_API_KEY) {
            return res.status(500).json({ message: "Gemini API Key not configured" });
        }

        // 1. Fetch Context from DB
        const projects = await Project.find({}, 'title description tech');
        const experience = await Experience.find({}, 'role company description technologies');
        const education = await Education.find({}, 'degree institution description');

        // 2. Construct System Prompt with Context
        const context = `
      You are an AI assistant for a Portfolio website. You represent the owner of this portfolio.
      Here is the data about the owner:
      
      Projects: ${JSON.stringify(projects)}
      
      Experience: ${JSON.stringify(experience)}
      
      Education: ${JSON.stringify(education)}
      
      Answer the user's question based on this data. Be professional, friendly, and concise.
      If the answer is not in the data, verify if it's a general question or politely say you don't know specific personal details not listed.
    `;

        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash-lite" });

        const chat = model.startChat({
            history: [
                {
                    role: "user",
                    parts: [{ text: context }],
                },
                {
                    role: "model",
                    parts: [{ text: "Understood. I am ready to answer questions about your portfolio and experience." }],
                },
            ],
        });

        const result = await chat.sendMessage(message);
        const response = await result.response;
        const text = response.text();

        res.json({ reply: text });

    } catch (error) {
        console.error("AI Error:", error);
        res.status(500).json({ message: 'AI Service Error' });
    }
});

// @route   POST /api/ai/suggest
// @desc    Get AI suggestions for form fields
// @access  Private (requires auth)
router.post('/suggest', async (req, res) => {
    try {
        const { type, field, context, partialInput } = req.body;

        if (!process.env.GEMINI_API_KEY) {
            return res.status(500).json({ message: "Gemini API Key not configured" });
        }

        // Try to fetch user's portfolio context if authenticated
        let userContext = null;
        if (req.user) {
            const PortfolioContext = require('../models/PortfolioContext');
            userContext = await PortfolioContext.findOne({ userId: req.user._id });
        }

        // Build specialized prompt based on field type
        let systemPrompt = '';

        if (type === 'project') {
            if (field === 'description') {
                systemPrompt = `You are a professional portfolio writer. Generate 3 compelling project descriptions.\n\nProject Title: ${context.title || 'Untitled Project'}\nTech Stack: ${context.tech || 'Not specified'}\n\nGenerate 3 professional, concise descriptions (2-3 sentences each) that:\n- Highlight key features and achievements\n- Use action verbs\n- Sound authentic and technical\n- Are formatted as a numbered list`;
            } else if (field === 'tech') {
                systemPrompt = `Given this project: "${context.title}"\nDescription: "${context.description || ''}"\n\nSuggest 6-8 relevant technologies commonly used for this type of project. Format as comma-separated list.`;
            }
        } else if (type === 'experience') {
            if (field === 'description') {
                systemPrompt = `Generate 3 professional achievement descriptions for:\n\nRole: ${context.role}\nCompany: ${context.company}\nTechnologies: ${context.technologies || ''}\n\nEach description should:\n- Start with an action verb\n- Include quantifiable results if possible\n- Be 2-3 sentences\n- Format as numbered list`;
            } else if (field === 'technologies') {
                systemPrompt = `For the role "${context.role}" at "${context.company}", suggest 5-7 commonly used technologies. Format as comma-separated list.`;
            }
        } else if (type === 'education') {
            if (field === 'description') {
                systemPrompt = `Generate 3 academic descriptions for:\n\nDegree: ${context.degree}\nInstitution: ${context.institution}\n\nEach should highlight academic achievements, skills gained, or notable projects. Format as numbered list.`;
            }
        }

        // Add user context if available
        if (userContext) {
            const contextInfo = `\n\nUser Background:\n- Current Role: ${userContext.currentRole}\n- Specializations: ${userContext.specializations.join(', ')}\n- Tech Stack: ${Object.values(userContext.technicalSkills || {}).flat().join(', ')}\n- Writing Tone: ${userContext.writingTone}\n\nCustom Instructions: ${userContext.customInstructions || 'None'}`;
            systemPrompt += contextInfo;
        }

        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash-lite" });

        const result = await model.generateContent(systemPrompt);
        const response = await result.response;
        const text = response.text();

        // Parse suggestions (assuming numbered list format)
        const suggestions = text.split('\n').filter(line => line.trim().match(/^\d+\./)).map(line => line.replace(/^\d+\.\s*/, '').trim());

        res.json({
            suggestions: suggestions.length > 0 ? suggestions : [text],
            enhancedText: text
        });

    } catch (error) {
        console.error("AI Suggestion Error:", error);
        res.status(500).json({ message: 'AI Suggestion Service Error' });
    }
});

module.exports = router;
