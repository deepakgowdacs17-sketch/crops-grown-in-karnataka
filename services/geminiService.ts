import { GoogleGenAI } from "@google/genai";
import { cropsData } from "../constants";
import { Language } from "../types";

// Fix: Initialize the GoogleGenAI client. The API key must be an environment variable.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

// System instruction to guide the model's behavior
const getSystemInstruction = (language: Language) => {
    const cropInfo = cropsData.map(crop => ({
        name: crop.name[language],
        description: crop.description[language],
        detailedDescription: crop.detailedDescription[language]
    })).join('\n\n');

    const languageInstruction = language === 'kannada' 
        ? "You must respond ONLY in Kannada. Use Kannada script."
        : "You must respond ONLY in English.";

    return `You are an expert agricultural assistant for farmers in Karnataka.
Your goal is to provide helpful, accurate, and concise information about crops grown in the region.
You have access to the following data about major crops in Karnataka. Base your answers strictly on this information. Do not use any external knowledge.

START OF CROP DATA:
${cropInfo}
END OF CROP DATA.

RULES:
1.  Answer questions based *only* on the provided CROP DATA.
2.  If the user's question is not related to the provided crop data (e.g., asking about weather, other crops, politics, etc.), politely state that you can only answer questions about the listed crops of Karnataka.
3.  ${languageInstruction}
4.  Keep your answers concise and easy to understand for a farmer.
5.  If a user asks to switch languages, for example "can you speak in english", you should respond with "Please use the language switcher to change the language."
`;
};

export const getGeminiResponse = async (question: string, language: Language, chatHistory: { role: 'user' | 'model', parts: { text: string }[] }[]) => {
    try {
        const model = 'gemini-2.5-flash'; // Basic text task model
        
        // Fix: Use ai.models.generateContent to query GenAI
        const response = await ai.models.generateContent({
            model: model,
            contents: [...chatHistory, { role: 'user', parts: [{ text: question }] }],
            config: {
                systemInstruction: getSystemInstruction(language),
                temperature: 0.5,
                topK: 40,
                topP: 0.95,
            }
        });

        // Fix: Correctly access the text response
        const text = response.text;
        if (!text) {
            return "Sorry, I couldn't generate a response. Please try again.";
        }
        return text;

    } catch (error) {
        console.error("Error calling Gemini API:", error);
        if (language === 'kannada') {
            return "ಕ್ಷಮಿಸಿ, ಪ್ರತಿಕ್ರಿಯೆಯನ್ನು ರಚಿಸಲು ನನಗೆ ಸಾಧ್ಯವಾಗಲಿಲ್ಲ. ದಯವಿಟ್ಟು ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ.";
        }
        return "Sorry, I couldn't generate a response. Please try again.";
    }
};
