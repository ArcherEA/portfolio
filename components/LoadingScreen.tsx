'use client';
import React, { useState, useEffect } from 'react';
export default function LoadingScreen({ onComplete }: { onComplete: () => void }) {
    const [progress, setProgress] = useState(0);
      const [logs, setLogs] = useState<string[]>([]);
      const logMessages = [
        "INITIALIZING_CORE_SYSTEMS...",
        "LOADING_ASSETS_PACK_V2...",
        "ESTABLISHING_SECURE_CONNECTION...",
        "SYNCHRONIZING_ANIME_TROPES...",
        "CALIBRATING_CSS_STYLES...",
        "RENDERING_VIRTUAL_DOM...",
        "SYSTEM_READY"
      ];
    
      useEffect(() => {
        let currentLog = 0;
        const logInterval = setInterval(() => {
          if (currentLog < logMessages.length) {
            setLogs(prev => [...prev.slice(-4), logMessages[currentLog]]);
            currentLog++;
          }
        }, 400);
    
        const timer = setInterval(() => {
          setProgress(prev => {
            const diff = Math.random() * 15;
            const newProgress = Math.min(prev + diff, 100);
            if (newProgress >= 100) {
              clearInterval(timer);
              clearInterval(logInterval);
              setTimeout(onComplete, 800);
            }
            return newProgress;
          });
        }, 200);
    
        return () => {
          clearInterval(timer);
          clearInterval(logInterval);
        };
      }, [onComplete]);
    return (
    <div className="fixed inset-0 z-100 bg-slate-950 flex flex-col items-center justify-center text-cyan-400 font-mono overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-size-[40px_40px] opacity-20"></div>
      
      <div className="relative z-10 w-full max-w-md p-8">
        <div className="mb-8 text-center">
          <h1 className="text-6xl font-display text-white tracking-widest mb-2 animate-pulse">LOADING</h1>
          <div className="h-1 w-full bg-slate-800 rounded-full overflow-hidden border border-cyan-900">
            <div 
              className="h-full bg-linear-to-r from-cyan-500 to-pink-500 transition-all duration-200 ease-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <div className="flex justify-between text-xs mt-2 text-cyan-600">
             <span>SYSTEM_CHECK</span>
             <span>{Math.round(progress)}%</span>
          </div>
        </div>

        <div className="h-32 font-mono text-xs space-y-1 text-pink-400 opacity-80">
          {logs.map((log, i) => (
            <div key={i} className="animate-in slide-in-from-left fade-in duration-300">
              {`> ${log}`}
            </div>
          ))}
          <div className="animate-pulse">_</div>
        </div>
      </div>

      {/* Decorative corners */}
      <div className="absolute top-0 left-0 w-32 h-32 border-t-4 border-l-4 border-cyan-500 opacity-50"></div>
      <div className="absolute bottom-0 right-0 w-32 h-32 border-b-4 border-r-4 border-pink-500 opacity-50"></div>
    </div>
  );
}