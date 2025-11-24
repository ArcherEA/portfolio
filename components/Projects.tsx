'use client';
import { PROJECTS } from '@/lib/constants';
import { Globe, Code } from 'lucide-react';

export default function Projects() {
    return (
        <section id="projects" className="h-screen w-full snap-start relative flex flex-col overflow-hidden speed-lines dark:speed-lines light-speed-lines bg-transparent">

            {/* Scrollable content container */}
            <div className="flex-1 overflow-y-auto pt-24 pb-10 px-4 w-full">
                <div className="max-w-7xl mx-auto w-full relative z-10">
                    <div className="flex items-end justify-between mb-12 border-b-4 border-slate-900 dark:border-white pb-4">
                        <h2 className="font-display text-5xl md:text-6xl text-slate-900 dark:text-white drop-shadow-[3px_3px_0px_rgba(0,0,0,0.2)] dark:drop-shadow-[3px_3px_0px_#000]">
                            Projects
                        </h2>
                        <span className="font-mono text-pink-600 dark:text-pink-500 text-xl animate-pulse hidden md:block">/// SELECT MISSION</span>
                    </div>

                    {/* REDESIGNED PROJECT GRID: CYBER DOSSIER STYLE */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-8">
                        {PROJECTS.map((project, index) => (
                            <div
                                key={project.id}
                                className="relative group bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 hover:border-pink-500 dark:hover:border-pink-500 transition-colors duration-300 flex flex-col overflow-hidden"
                                style={{ clipPath: 'polygon(0 0, 100% 0, 100% 90%, 92% 100%, 0 100%)' }} // Tech corner cut
                            >
                                {/* Header Bar */}
                                <div className="h-1 w-full bg-slate-200 dark:bg-slate-800 flex">
                                    <div className={`h-full w-1/3 ${index % 2 === 0 ? 'bg-cyan-500' : 'bg-pink-500'}`}></div>
                                </div>

                                {/* Image Area with Overlay */}
                                <div className="relative aspect-video w-full overflow-hidden border-b border-slate-200 dark:border-slate-800">
                                    <img
                                        src={project.imageUrl}
                                        alt={project.title}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-90 group-hover:opacity-100"
                                    />

                                    {/* Scanline Effect */}
                                    <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.5)_50%)] bg-[size:100%_4px] pointer-events-none opacity-30"></div>

                                    {/* Status Badge */}
                                    <div className="absolute top-2 left-2 bg-black/70 backdrop-blur-sm text-white text-[10px] font-mono px-2 py-0.5 border border-white/20">
                                        MISSION_0{index + 1}
                                    </div>

                                    {/* Hover Overlay Actions */}
                                    <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                                        {project.demoUrl && (
                                            <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="p-3 rounded-full bg-cyan-500 text-white hover:bg-cyan-400 hover:scale-110 transition-all shadow-[0_0_15px_rgba(6,182,212,0.6)]">
                                                <Globe size={24} />
                                            </a>
                                        )}
                                        {project.githubUrl && (
                                            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="p-3 rounded-full bg-pink-500 text-white hover:bg-pink-400 hover:scale-110 transition-all shadow-[0_0_15px_rgba(236,72,153,0.6)]">
                                                <Code size={24} />
                                            </a>
                                        )}
                                    </div>
                                </div>

                                {/* Content Body */}
                                <div className="p-5 flex flex-col flex-grow">
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="font-display text-2xl text-slate-900 dark:text-white leading-none uppercase tracking-wide">
                                            {project.title}
                                        </h3>
                                        {project.demoUrl ? <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse mt-2"></div> : <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>}
                                    </div>

                                    {/* Tech Stack - Terminal Style */}
                                    <div className="flex flex-wrap gap-1.5 mb-4 font-mono text-[10px] text-cyan-700 dark:text-cyan-400">
                                        {project.tech.map(t => (
                                            <span key={t} className="border border-slate-300 dark:border-slate-700 px-1.5 py-0.5 rounded-sm bg-slate-100 dark:bg-slate-800">
                                                {t}
                                            </span>
                                        ))}
                                    </div>

                                    <p className="text-sm text-slate-600 dark:text-slate-400 font-sans leading-relaxed mb-4 flex-grow">
                                        {project.description}
                                    </p>

                                    {/* Footer Info */}
                                    <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex justify-between items-center text-[10px] font-mono text-slate-400 uppercase">
                                        <span>Secured Data</span>
                                        <span className="group-hover:text-pink-500 transition-colors">Access Granted</span>
                                    </div>
                                </div>

                                {/* Decorative Corner */}
                                <div className="absolute bottom-0 right-0 w-4 h-4 bg-slate-200 dark:bg-slate-800" style={{ clipPath: 'polygon(100% 0, 0 100%, 100% 100%)' }}></div>
                            </div>
                        ))}
                    </div>

                </div>
            </div>
        </section>
    );
}