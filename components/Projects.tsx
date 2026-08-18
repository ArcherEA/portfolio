'use client';
import Link from 'next/link';
import { PROJECTS } from '@/lib/constants';
import { Globe, Code, FileText } from 'lucide-react';

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
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />

                                    {/* Scanline Effect (subtle, keeps the screenshot readable) */}
                                    <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.5)_50%)] bg-[size:100%_4px] pointer-events-none opacity-10"></div>

                                    {/* Status Badge */}
                                    <div className="absolute top-2 left-2 bg-black/70 backdrop-blur-sm text-white text-[10px] font-mono px-2 py-0.5 border border-white/20">
                                        MISSION_0{index + 1}
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

                                    {/* Footer Actions */}
                                    <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex items-center gap-2">
                                        {project.blogSlug ? (
                                            <Link
                                                href={`/blog/${project.blogSlug}`}
                                                className="inline-flex items-center gap-1.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-3 py-1.5 text-xs font-bold font-tech tracking-wider hover:bg-pink-600 dark:hover:bg-pink-500 dark:hover:text-white transition-colors"
                                            >
                                                <FileText size={14} /> DEV LOG
                                            </Link>
                                        ) : (
                                            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">// Confidential</span>
                                        )}
                                        <div className="flex items-center gap-2 ml-auto">
                                            {project.demoUrl && (
                                                <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" aria-label="Live demo" className="p-2 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 hover:bg-cyan-500 hover:text-white transition-all">
                                                    <Globe size={18} />
                                                </a>
                                            )}
                                            {project.githubUrl && (
                                                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" aria-label="Source code" className="p-2 rounded-full bg-pink-500/10 text-pink-600 dark:text-pink-400 hover:bg-pink-500 hover:text-white transition-all">
                                                    <Code size={18} />
                                                </a>
                                            )}
                                        </div>
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