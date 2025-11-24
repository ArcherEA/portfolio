import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { GEMINI_SYSTEM_INSTRUCTION } from '../lib/constants';

let aiClient: GoogleGenAI | null = null;

const getClient = (): GoogleGenAI => {
  if (!aiClient) {
    // The API key is expected to be in the environment variable
    aiClient = new GoogleGenAI({ apiKey: process.env.API_KEY });
  }
  return aiClient;
};

export const sendMessageToGemini = async (
  message: string,
  history: { role: 'user' | 'model'; text: string }[] = []
): Promise<string> => {
  try {
    const client = getClient();
    
    // We use generateContent with system instructions for a simple stateless-feeling chat 
    // or we could use chat sessions. For this portfolio, a simple generateContent with 
    // manual history context or just system instruction + current prompt is often sufficient 
    // to save tokens, but let's do it properly with a chat session for context awareness if needed.
    // However, to keep it simple and robust per instructions:
    
    const model = 'gemini-2.5-flash';
    
    // Construct a prompt that includes history context manually if not using chat.sendMessage
    // Or use the Chat API. Let's use the Chat API for better conversational flow.
    
    const chat = client.chats.create({
      model: model,
      config: {
        systemInstruction: GEMINI_SYSTEM_INSTRUCTION,
        temperature: 0.9, // High creativity for anime personality
      },
      history: history.map(h => ({
        role: h.role,
        parts: [{ text: h.text }]
      }))
    });

    const result: GenerateContentResponse = await chat.sendMessage({
      message: message
    });

    return result.text || "System malfunction! (No text returned)";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Critical failure! My communication circuits are jammed (API Error).";
  }
};