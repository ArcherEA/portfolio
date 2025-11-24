'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles, XCircle } from 'lucide-react';
import { sendMessageToGemini } from '@/lib/gemini';
import { ChatMessage } from '@/lib/types';
import { PERSONAL_INFO } from '@/lib/personal_data';

export const ChatAssistant: React.FC = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'model',
      text: "Konnichiwa! I am Aiko, the AI Guardian of this portfolio. Ask me anything about " + PERSONAL_INFO.name + "'s skills!"
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // useEffect(() => {
  //   scrollToBottom();
  // }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: input
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      // Convert current chat state to history format for the service
      const history = messages.map(m => ({ role: m.role, text: m.text }));
      const responseText = await sendMessageToGemini(userMsg.text, history);

      const botMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: responseText
      };
      setMessages(prev => [...prev, botMsg]);
    } catch (error) {
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        role: 'model',
        text: "Connection to the anime dimension failed...",
        isError: true
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[600px] w-full max-w-4xl mx-auto border-4 border-purple-500 bg-white/95 dark:bg-slate-900/95 relative overflow-hidden rounded-lg transition-colors duration-300 shadow-2xl">
      {/* Header */}
      <div className="bg-purple-600 p-4 flex items-center justify-between border-b-4 border-black z-10 relative">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center border-2 border-black shadow-[2px_2px_0px_rgba(0,0,0,0.3)]">
            <Bot className="text-purple-600" />
          </div>
          <div>
            <h3 className="font-display text-2xl text-white tracking-wide drop-shadow-md">AI ASSISTANT AIKO</h3>
            <div className="flex items-center gap-2 text-xs text-purple-200 font-mono">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse shadow-[0_0_5px_#4ade80]"></span>
              ONLINE // GEMINI-2.5-FLASH
            </div>
          </div>
        </div>
        <Sparkles className="text-yellow-300 animate-spin-slow drop-shadow-md" />
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6 bg-slate-50 dark:bg-slate-800/50 scroll-smooth">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-in slide-in-from-bottom-2 fade-in duration-300`}
          >
            <div className={`
              max-w-[85%] flex gap-3 group
              ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}
            `}>
              {/* Avatar */}
              <div className={`
                w-10 h-10 shrink-0 rounded-full border-2 border-black flex items-center justify-center shadow-[2px_2px_0px_rgba(0,0,0,0.2)] transition-transform group-hover:scale-110 duration-200
                ${msg.role === 'user' ? 'bg-cyan-400' : 'bg-pink-500'}
              `}>
                {msg.role === 'user' ? <User size={20} className="text-white" /> : <Bot size={20} className="text-white" />}
              </div>

              {/* Message Bubble */}
              <div className={`
                p-4 border-2 border-black relative shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)] transition-all duration-200 group-hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,0.2)] group-hover:-translate-y-0.5
                ${msg.role === 'user'
                  ? 'bg-cyan-50 text-cyan-900 rounded-l-2xl rounded-tr-2xl rounded-br-sm'
                  : 'bg-white text-slate-800 rounded-r-2xl rounded-tl-2xl rounded-bl-sm'}
              `}>
                <p className="font-medium leading-relaxed text-sm md:text-base font-sans whitespace-pre-wrap">
                  {msg.text}
                </p>
                {msg.isError && <XCircle className="text-red-500 mt-2 animate-pulse" size={16} />}
              </div>
            </div>
          </div>
        ))}

        {/* Typing Indicator */}
        {isLoading && (
          <div className="flex justify-start animate-in fade-in duration-300">
            <div className="flex gap-3">
              <div className="w-10 h-10 shrink-0 rounded-full border-2 border-black bg-pink-500 flex items-center justify-center shadow-[2px_2px_0px_rgba(0,0,0,0.2)]">
                <Bot size={20} className="text-white" />
              </div>
              <div className="bg-white border-2 border-black p-4 rounded-r-2xl rounded-tl-2xl rounded-bl-sm shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)] flex items-center gap-1 h-14">
                <div className="w-2 h-2 bg-pink-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                <div className="w-2 h-2 bg-pink-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                <div className="w-2 h-2 bg-pink-500 rounded-full animate-bounce"></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 bg-slate-100 dark:bg-slate-800 border-t-4 border-purple-500 transition-colors duration-300 relative z-10">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Send a message to Aiko..."
            className="flex-1 bg-white dark:bg-slate-900 text-slate-900 dark:text-white border-2 border-purple-400 p-3 rounded-lg focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 font-mono placeholder-slate-500 transition-all duration-300 shadow-inner"
          />
          <button
            onClick={handleSend}
            disabled={isLoading}
            className="group bg-pink-500 hover:bg-pink-600 text-white p-3 border-2 border-purple-400 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95 shadow-[0_4px_0_rgb(168,85,247)] hover:shadow-[0_2px_0_rgb(168,85,247)] hover:translate-y-[2px] active:shadow-none active:translate-y-[4px]"
          >
            <Send size={24} className="group-hover:rotate-12 transition-transform duration-300" />
          </button>
        </div>
      </div>
    </div>
  );
};