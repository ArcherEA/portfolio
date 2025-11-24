'use client';
import { HERO_SUBTITLES, PROFESSIONAL_SUMMARY, PREFIX } from '@/lib/constants';
import Typewriter from './features/Typewriter';
import {
    Sword, Zap, MapPin, Calendar
} from 'lucide-react';
import { PERSONAL_INFO } from '@/lib/personal_data';


export default function Home({ scrollToSection }: { scrollToSection: (sectionId: string) => void }) {
    return (

        <section id="home" className="h-screen w-full snap-start relative flex flex-col overflow-hidden tech-grid bg-transparent">
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-slate-200/50 to-transparent dark:from-slate-900 dark:to-transparent opacity-50"></div>

            {/* Scrollable Inner Container for Mobile Compatibility */}
            <div className="flex-1 overflow-y-auto w-full no-scrollbar">
                <div className="min-h-full flex items-center justify-center px-4 py-20 lg:py-0">
                    <div className="relative z-10 max-w-7xl mx-auto w-full">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 items-center w-full">

                            {/* Left Column: Intro Text */}
                            <div className="order-2 lg:order-1 text-left space-y-6 lg:space-y-8">
                                <div className="space-y-2 animate-in slide-in-from-left duration-1000 fade-in">
                                    <div className="inline-flex items-center gap-2 px-3 py-1 border border-pink-600 dark:border-pink-500 bg-pink-100 dark:bg-pink-500/10 text-pink-600 dark:text-pink-400 text-xs font-mono font-bold rounded-sm">
                                        <span className="w-2 h-2 bg-pink-600 dark:bg-pink-500 rounded-full animate-pulse"></span>
                                        OPEN TO OPPORTUNITIES
                                    </div>
                                    <h2 className="font-tech text-cyan-600 dark:text-cyan-400 text-lg md:text-2xl tracking-[0.3em] h-14 md:h-16 flex items-center">
                                        <Typewriter texts={HERO_SUBTITLES} typingSpeed={80} deletingSpeed={40} pauseDuration={2500} />
                                    </h2>
                                    <h1 className="font-display text-5xl md:text-8xl leading-[0.9] text-slate-900 dark:text-white drop-shadow-[2px_2px_0px_#ec4899] dark:drop-shadow-[4px_4px_0px_#ec4899]">
                                        FULL STACK <br />
                                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-700 to-slate-400 dark:from-white dark:to-slate-400">DEVELOPER</span>
                                    </h1>
                                </div>

                                <div className="relative z-10 p-4 lg:p-6 border-l-4 border-cyan-500 dark:border-cyan-400 bg-white/80 dark:bg-slate-800/80 backdrop-blur-md animate-in slide-in-from-bottom duration-1000 delay-300 fade-in shadow-sm dark:shadow-none">
                                    <p className="text-base lg:text-lg text-slate-800 dark:text-slate-200 font-sans leading-relaxed max-w-xl font-medium whitespace-pre-line">
                                        {PROFESSIONAL_SUMMARY}
                                    </p>

                                    <div className="flex gap-6 mt-4 font-mono text-xs text-slate-500 dark:text-gray-400">
                                        <div className="flex items-center gap-2">
                                            <MapPin size={14} className="text-pink-600 dark:text-pink-500" /> REMOTE / CANADA
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Calendar size={14} className="text-cyan-600 dark:text-cyan-400" /> FULL STACK CAPABLE
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-col sm:flex-row gap-4 pt-2 lg:pt-4 animate-in slide-in-from-bottom duration-1000 delay-500 fade-in pb-8 lg:pb-0 relative z-10">
                                    <button onClick={() => scrollToSection('projects')} className="fire-btn group relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white transition-all duration-200 bg-pink-600 font-display uppercase tracking-wider border-4 border-transparent hover:border-slate-900 dark:hover:border-white shadow-[4px_4px_0px_0px_rgba(0,0,0,0.5)] dark:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,0.8)] dark:hover:shadow-[6px_6px_0px_0px_rgba(255,255,255,1)] w-full sm:w-auto">
                                        <span className="mr-2">View Missions</span>
                                        <Sword size={20} className="group-hover:rotate-90 transition-transform" />
                                    </button>

                                    {/* UPDATED CONTACT BUTTON: Compact Style */}
                                    <button onClick={() => scrollToSection('contact')} className="fire-btn group relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-cyan-700 dark:text-cyan-400 transition-all duration-200 bg-transparent border-4 border-cyan-600 dark:border-cyan-400 font-display uppercase tracking-wider hover:text-white hover:bg-cyan-600 dark:hover:bg-cyan-500 w-full sm:w-auto">
                                        <span>Initialize Comms</span>
                                        <Zap size={20} className="ml-2 group-hover:animate-bounce" />
                                    </button>
                                </div>
                            </div>

                            {/* Right Column: Photo Place */}
                            <div className="order-1 lg:order-2 flex justify-center lg:justify-end relative animate-in zoom-in duration-1000 delay-200 fade-in pt-4 lg:pt-0">
                                {/* Decorative Spinning Rings */}
                                <div className="hidden md:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] border border-cyan-500/20 rounded-full animate-spin-slow pointer-events-none"></div>
                                <div className="hidden md:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] border border-pink-500/10 rounded-full animate-spin-reverse-slow pointer-events-none" style={{ animationDuration: '20s' }}></div>

                                {/* Photo Frame */}
                                <div className="relative w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 group z-10">
                                    {/* Background Offset Shapes */}
                                    <div className="absolute inset-0 bg-pink-600 transform translate-x-2 translate-y-2 lg:translate-x-4 lg:translate-y-4 clip-path-polygon"></div>
                                    <div className="absolute inset-0 bg-cyan-400 transform -translate-x-1 -translate-y-1 lg:-translate-x-2 lg:-translate-y-2 opacity-50"></div>

                                    {/* Main Image Container */}
                                    <div className="relative w-full h-full bg-slate-100 dark:bg-slate-800 border-2 lg:border-4 border-slate-900 dark:border-white overflow-hidden shadow-2xl z-10">
                                        {/* User photo */}
                                        <img
                                            src={`${PREFIX}/avatar.jpg`}
                                            alt="Yukuan Portrait"
                                            className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
                                        />

                                        {/* Overlay Glitch/Scanline effect */}
                                        <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.5)_50%)] bg-[size:100%_4px] pointer-events-none opacity-20"></div>
                                        <div className="absolute bottom-0 left-0 right-0 p-2 lg:p-4 bg-gradient-to-t from-white/90 dark:from-black/80 to-transparent">
                                            <div className="text-slate-900 dark:text-white font-display tracking-widest text-lg lg:text-xl">{PERSONAL_INFO.name}</div>
                                            <div className="text-cyan-700 dark:text-cyan-400 font-mono text-[10px] lg:text-xs">STATUS: ONLINE</div>
                                        </div>
                                    </div>

                                    {/* Floating Badge */}
                                    <div className="absolute -top-2 -right-2 lg:-top-4 lg:-right-4 bg-yellow-400 text-black font-bold font-mono text-[10px] lg:text-xs px-2 py-1 lg:px-3 lg:py-1 border-2 border-black shadow-[2px_2px_0px_black] lg:shadow-[4px_4px_0px_black] z-20 transform rotate-12 group-hover:rotate-0 transition-transform">
                                        LVL. 30
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}