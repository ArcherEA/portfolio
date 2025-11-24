'use client';

import Link from 'next/link';
import { Bot, AlertTriangle, ArrowLeft } from 'lucide-react';

export default function NotFound() {
    return (
        <div className="h-screen w-full flex flex-col items-center justify-center bg-slate-950 text-white relative overflow-hidden">
            {/* Background Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

            <div className="relative z-10 flex flex-col items-center text-center p-4">
                {/* Glitch 404 */}
                <div className="relative font-display text-9xl font-bold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-cyan-500 animate-pulse select-none">
                    404
                    <div className="absolute inset-0 text-pink-500 opacity-50 translate-x-1 animate-ping">404</div>
                    <div className="absolute inset-0 text-cyan-500 opacity-50 -translate-x-1 animate-pulse">404</div>
                </div>

                {/* Warning Box */}
                <div className="mt-8 border-2 border-red-500 bg-red-500/10 p-6 rounded-lg backdrop-blur-sm max-w-md w-full relative overflow-hidden group hover:bg-red-500/20 transition-colors duration-300">
                    <div className="flex items-center justify-center gap-3 text-red-500 mb-2">
                        <AlertTriangle size={24} className="animate-bounce" />
                        <h2 className="font-mono text-xl font-bold tracking-wider">SYSTEM ERROR</h2>
                    </div>
                    <p className="font-mono text-sm text-red-300">
                        The requested data segment could not be located in the neural network.
                    </p>
                </div>

                {/* Robot Icon */}
                <div className="mt-8 relative">
                    <div className="absolute inset-0 bg-cyan-500 blur-xl opacity-20 animate-pulse"></div>
                    <Bot size={64} className="text-slate-300 relative z-10" />
                </div>

                {/* Return Button */}
                <Link
                    href="/"
                    className="mt-12 group relative inline-flex items-center gap-2 px-8 py-3 bg-slate-900 border-2 border-cyan-500 text-cyan-400 font-display tracking-wider hover:bg-cyan-500 hover:text-slate-900 transition-all duration-300 overflow-hidden rounded-sm"
                >
                    <span className="relative z-10 flex items-center gap-2">
                        <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                        RETURN TO BASE
                    </span>
                </Link>

                <div className="mt-8 font-mono text-xs text-slate-600">
                    ERROR_CODE: PAGE_NOT_FOUND // INITIATING_RECOVERY_PROTOCOL
                </div>
            </div>
        </div>
    );
}
