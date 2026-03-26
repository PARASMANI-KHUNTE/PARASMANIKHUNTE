const Groq = require('groq-sdk');
const dotenv = require('dotenv');
const path = require('path');

// Load env vars from .env file in the same directory
dotenv.config({ path: path.join(__dirname, '.env') });

console.log("Testing Groq API...");

async function testAI() {
    if (!process.env.GROQ_API_KEY) {
        console.error("Error: GROQ_API_KEY is missing.");
        return;
    }

    const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

    try {
        console.log("Trying model: llama-3.1-8b-instant");
        const chatCompletion = await groq.chat.completions.create({
            messages: [
                {
                    role: "user",
                    content: "Hello",
                },
            ],
            model: "llama-3.1-8b-instant",
            temperature: 0.5,
            max_tokens: 100,
        });

        const text = chatCompletion.choices[0]?.message?.content || "";
        console.log("Success with llama3-8b-8192:", text);
    } catch (error) {
        console.error("Error with llama3-8b-8192:", error.message);
    }
}

testAI();
