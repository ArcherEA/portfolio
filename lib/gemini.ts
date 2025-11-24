import { GoogleGenAI, GenerateContentResponse, Chat } from "@google/genai";
import { GEMINI_SYSTEM_INSTRUCTION } from './constants';

let aiInstance: GoogleGenAI | null = null;

const getAI = (): GoogleGenAI => {
  if (!aiInstance) {
    // For client-side usage, the API key must be exposed via NEXT_PUBLIC_ prefix
    const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error('NEXT_PUBLIC_GEMINI_API_KEY is not defined');
    }
    aiInstance = new GoogleGenAI({ apiKey });
  }
  return aiInstance;
};

export const sendMessageToGemini = async (
  message: string,
  history: { role: 'user' | 'model'; text: string }[] = []
): Promise<string> => {
  try {
    const ai = getAI();
    const modelId = 'gemini-2.5-flash';

    // Create chat session with history and system instructions
    const chat: Chat = ai.chats.create({
      model: modelId,
      config: {
        systemInstruction: GEMINI_SYSTEM_INSTRUCTION,
        temperature: 0.9,
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