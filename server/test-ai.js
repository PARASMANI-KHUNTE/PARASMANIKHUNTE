const { GoogleGenerativeAI } = require('@google/generative-ai');
const dotenv = require('dotenv');
const path = require('path');

// Load env vars from .env file in the same directory
dotenv.config({ path: path.join(__dirname, '.env') });

console.log("Testing Gemini API...");

async function testAI() {
    if (!process.env.GEMINI_API_KEY) {
        console.error("Error: GEMINI_API_KEY is missing.");
        return;
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

    try {
        console.log("Trying model: gemini-1.5-flash");
        const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

        // Use the simplest possible input format
        const result = await model.generateContent("Hello");
        const response = await result.response;
        const text = response.text();

        console.log("Success with gemini-1.5-flash:", text);
    } catch (error) {
        console.error("Error with gemini-1.5-flash:", error.message);

        try {
            console.log("Retrying with model: gemini-pro");
            const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
            const result = await model.generateContent("Hello");
            const response = await result.response;
            const text = response.text();
            console.log("Success with gemini-pro:", text);
        } catch (err) {
            console.error("Error with gemini-pro:", err.message);
        }
    }
}

testAI();
