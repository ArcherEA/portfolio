'use server';

import { GoogleGenAI, GenerateContentResponse, Chat } from "@google/genai";
import { headers } from "next/headers";
import { GEMINI_SYSTEM_INSTRUCTION } from './constants';
import { getAllPosts } from './blog';

// Fill the {{BLOG_SECTION}} placeholder with real blog posts read from disk,
// so Aiko can talk about them. Done server-side because it touches the filesystem.
const buildSystemInstruction = (): string => {
  const posts = getAllPosts();
  const blogSection = posts.length
    ? `\nARCHIVED MEMORIES (BLOGS):\n${posts
        .map((p) => `- ${p.title}: ${p.excerpt}`)
        .join('\n')}\n`
    : '';
  return GEMINI_SYSTEM_INSTRUCTION.replace('{{BLOG_SECTION}}', blogSection);
};

let aiInstance: GoogleGenAI | null = null;

const getAI = (): GoogleGenAI => {
  if (!aiInstance) {
    // For server-side usage (Vercel), we use the standard environment variable.
    // We also check NEXT_PUBLIC_GEMINI_API_KEY as a fallback if the user set that instead.
    const apiKey = process.env.GEMINI_API_KEY || process.env.NEXT_PUBLIC_GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error('GEMINI_API_KEY is not defined');
    }
    aiInstance = new GoogleGenAI({ apiKey });
  }
  return aiInstance;
};

// --- Abuse guards -----------------------------------------------------------
// This server action is a public, unauthenticated endpoint. Without limits,
// anyone can script it and burn the Gemini quota/bill. These caps keep casual
// abuse cheap. For production-grade protection use a shared store (Upstash /
// Vercel KV) so limits hold across serverless instances.
const MAX_MESSAGE_LENGTH = 1000;      // chars per user message
const MAX_HISTORY_MESSAGES = 20;      // trailing turns kept for context
const RATE_LIMIT_MAX = 15;            // requests per window per IP
const RATE_LIMIT_WINDOW_MS = 60_000;  // 1 minute

const hits = new Map<string, number[]>();

const isRateLimited = (ip: string): boolean => {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter(t => now - t < RATE_LIMIT_WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > RATE_LIMIT_MAX;
};

const getClientIp = async (): Promise<string> => {
  const h = await headers();
  const fwd = h.get('x-forwarded-for');
  return fwd?.split(',')[0]?.trim() || h.get('x-real-ip') || 'unknown';
};

export const sendMessageToGemini = async (
  message: string,
  history: { role: 'user' | 'model'; text: string }[] = []
): Promise<string> => {
  try {
    // Validate input before spending any tokens.
    const trimmed = (message ?? '').trim();
    if (!trimmed) {
      return "Senpai, you didn't say anything! (´･ω･`)";
    }
    if (trimmed.length > MAX_MESSAGE_LENGTH) {
      return `That message is too long! Please keep it under ${MAX_MESSAGE_LENGTH} characters. ✨`;
    }

    const ip = await getClientIp();
    if (isRateLimited(ip)) {
      return "Whoa, slow down Senpai! Too many messages — try again in a minute. ⏳";
    }

    const ai = getAI();
    const modelId = 'gemini-3.6-flash';

    // Keep only the most recent turns to cap token usage.
    const trimmedHistory = history.slice(-MAX_HISTORY_MESSAGES);

    // Create chat session with history and system instructions
    const chat: Chat = ai.chats.create({
      model: modelId,
      config: {
        systemInstruction: buildSystemInstruction(),
        temperature: 0.9,
      },
      history: trimmedHistory.map(h => ({
        role: h.role,
        parts: [{ text: h.text }]
      }))
    });

    const result: GenerateContentResponse = await chat.sendMessage({
      message: trimmed
    });

    return result.text || "System malfunction! (No text returned)";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Critical failure! My communication circuits are jammed (API Error).";
  }
};
