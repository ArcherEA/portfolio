'use client';
import { useState } from 'react';
import { SKILLS, STRENGTHS, EXPERIENCES, TITLES, PREFIX} from '@/lib/constants';
import { PERSONAL_INFO } from '@/lib/personal_data';
import {
    Cpu, Briefcase, Award, Zap,
} from 'lucide-react';
import Typewriter from './features/Typewriter';

// Icon mapping for skills using Simple Icons CDN
const SkillIcon = ({ iconKey, size = 24, className = "" }: { iconKey: string, size?: number, className?: string }) => {
    // List of icons that are black by default and need to be white in dark mode contexts
    const darkIcons = ['nextdotjs', 'vercel', 'github', 'express', 'flask', 'objectivec', 'notion', 'unity', 'react', 'nextjs', 'aws', 'apple'];
    const isDarkIcon = darkIcons.includes(iconKey);

    const url = `${PREFIX}/${iconKey}.svg`;

    return (
        <img
            src={url}
            alt={iconKey}
            width={size}
            height={size}
            className={`object-contain ${className} ${isDarkIcon ? 'dark:invert' : ''}`}
            loading="lazy"
        />
    );
};

const getRank = (level: number) => {
    if (level >= 5) return { label: 'S', color: 'text-yellow-500 dark:text-yellow-400', border: 'border-yellow-500 dark:border-yellow-400' };
    if (level >= 4) return { label: 'A', color: 'text-purple-500 dark:text-purple-400', border: 'border-purple-500 dark:border-purple-400' };
    if (level >= 3) return { label: 'B', color: 'text-blue-500 dark:text-blue-400', border: 'border-blue-500 dark:border-blue-400' };
    return { label: 'C', color: 'text-green-500 dark:text-green-400', border: 'border-green-500 dark:border-green-400' };
};

export default function Skills() {
    const [statsTab, setStatsTab] = useState<'skills' | 'experience'>('skills');
    const [skillFilter, setSkillFilter] = useState<'all' | 'frontend' | 'backend' | 'database' | 'devops' | 'mobile' | 'tools'>('all');

    const filteredSkills = skillFilter === 'all'
        ? SKILLS
        : SKILLS.filter(s => s.category === skillFilter);

    const skillCategories = ['all', 'frontend', 'backend', 'database', 'devops', 'mobile', 'tools'];

    return (
        <section id="stats" className="h-screen w-full snap-start relative flex flex-col bg-transparent border-t-4 border-pink-500 overflow-hidden tech-grid">
            {/* Scrollable content container */}
            <div className="flex-1 overflow-y-auto pt-24 pb-10 px-4 w-full">
                <div className="max-w-7xl mx-auto w-full relative z-10">

                    {/* Header */}
                    <div className="flex items-center gap-4 mb-8 border-b-2 border-slate-300 dark:border-slate-700 pb-4 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm p-4 rounded-lg relative z-10">
                        <div className="bg-pink-500 p-2 border-2 border-slate-900 dark:border-white transform rotate-45 shadow-[0_0_10px_rgba(236,72,153,0.8)]">
                            <Cpu className="text-white transform -rotate-45" size={24} />
                        </div>
                        <h2 className="font-display text-4xl text-slate-900 dark:text-white tracking-wider drop-shadow-md">STATUS WINDOW</h2>
                        <div className="flex-1 h-px bg-gradient-to-r from-pink-500 to-transparent"></div>
                        <div className="font-mono text-cyan-600 dark:text-cyan-400 text-sm animate-pulse">SYSTEM_READY</div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10">

                        {/* Left Panel: Character Profile */}
                        <div className="lg:col-span-4 space-y-6">
                            {/* Avatar & Info Card */}
                            <div className="bg-white/80 dark:bg-slate-800/80 border-4 border-slate-300 dark:border-slate-600 p-1 relative shadow-xl backdrop-blur-md">
                                <div className="absolute top-2 right-2 flex gap-1">
                                    <div className="w-3 h-3 rounded-full bg-red-500 border border-black"></div>
                                    <div className="w-3 h-3 rounded-full bg-yellow-500 border border-black"></div>
                                    <div className="w-3 h-3 rounded-full bg-green-500 border border-black"></div>
                                </div>

                                <div className="bg-slate-50 dark:bg-slate-900 p-6 border-2 border-slate-200 dark:border-slate-700 flex flex-col items-center text-center">
                                    <div className="w-32 h-32 bg-gradient-to-br from-cyan-400 to-pink-500 rounded-full mb-4 p-1 shadow-[0_0_20px_rgba(34,211,238,0.3)]">
                                        <div className="w-full h-full bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center overflow-hidden border-2 border-white">
                                            <img src={`${PREFIX}/avatar.jpg`} alt="Avatar" className="w-full h-full object-cover" />
                                        </div>
                                    </div>

                                    <h3 className="font-display text-3xl text-slate-900 dark:text-white mb-1">YUKUAN HAO</h3>

                                    <p className="font-mono text-pink-600 dark:text-pink-400 text-sm mb-4">&lt;<Typewriter texts={TITLES} typingSpeed={80} deletingSpeed={40} pauseDuration={2500} />/&gt;</p>

                                    <div className="w-full space-y-3 font-mono text-xs">
                                        <div className="flex justify-between items-center bg-white dark:bg-slate-800 p-2 border border-slate-300 dark:border-slate-600 rounded">
                                            <span className="text-slate-500 dark:text-gray-400">LVL</span>
                                            <span className="text-yellow-600 dark:text-yellow-400 font-bold text-lg">{PERSONAL_INFO.age}</span>
                                        </div>
                                        <div className="space-y-1">
                                            <div className="flex justify-between text-cyan-700 dark:text-cyan-300">
                                                <span>HP</span>
                                                <span>100/100</span>
                                            </div>
                                            <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden border border-slate-300 dark:border-slate-600">
                                                <div className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 w-full"></div>
                                            </div>
                                        </div>
                                        <div className="space-y-1">
                                            <div className="flex justify-between text-pink-700 dark:text-pink-300">
                                                <span>MP (COFFEE)</span>
                                                <span>45/50</span>
                                            </div>
                                            <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden border border-slate-300 dark:border-slate-600">
                                                <div className="h-full bg-gradient-to-r from-pink-500 to-purple-500 w-[90%]"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Equipment / Bio */}
                            <div className="bg-white/80 dark:bg-slate-800/80 border-4 border-slate-300 dark:border-slate-600 p-4 backdrop-blur-md">
                                <h4 className="font-tech text-sm text-slate-500 dark:text-gray-400 mb-3 uppercase border-b border-slate-300 dark:border-gray-600 pb-1">
                                    PASSIVE SKILLS
                                </h4>
                                <div className="grid grid-cols-2 gap-3">
                                    {STRENGTHS.map((strength) => (
                                        <div key={strength.label} className={`relative group overflow-hidden border-2 ${strength.color.replace('bg-', 'border-')} bg-slate-100 dark:bg-slate-900 rounded-md p-2 transition-all hover:scale-[1.02]`}>
                                            {/* Hover Glow */}
                                            <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 ${strength.color} transition-opacity`}></div>

                                            <div className="flex items-center gap-2 relative z-10 mb-1">
                                                <div className={`p-1 rounded ${strength.color} text-white shadow-sm`}>
                                                    <Zap size={12} fill="currentColor" />
                                                </div>
                                                <div className="flex flex-col min-w-0">
                                                    <span className="font-mono text-xs font-bold text-slate-700 dark:text-slate-200 leading-none truncate">{strength.label}</span>
                                                    <span className="font-mono text-[10px] text-slate-500 dark:text-slate-400">RATE:{strength.value}%</span>
                                                </div>
                                            </div>

                                            {/* Progress Bar */}
                                            <div className="absolute bottom-0 left-0 h-1 bg-slate-200 dark:bg-slate-700 w-full">
                                                <div className={`h-full ${strength.color}`} style={{ width: `${strength.value}%` }}></div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Right Panel: Skills & Experience */}
                        <div className="lg:col-span-8">
                            <div className="bg-white/60 dark:bg-slate-800/60 border-4 border-slate-300 dark:border-slate-600 p-6 h-full backdrop-blur-md flex flex-col shadow-lg min-h-[500px]">

                                {/* Main Category Tabs */}
                                <div className="flex gap-6 mb-6 border-b-2 border-slate-300 dark:border-slate-600">
                                    <button
                                        onClick={() => setStatsTab('skills')}
                                        className={`font-display text-xl tracking-wider pb-2 border-b-4 transition-colors ${statsTab === 'skills'
                                            ? 'border-cyan-500 text-cyan-600 dark:text-cyan-400'
                                            : 'border-transparent text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'
                                            }`}
                                    >
                                        SKILL TREE
                                    </button>
                                    <button
                                        onClick={() => setStatsTab('experience')}
                                        className={`font-display text-xl tracking-wider pb-2 border-b-4 transition-colors ${statsTab === 'experience'
                                            ? 'border-pink-500 text-pink-600 dark:text-pink-400'
                                            : 'border-transparent text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'
                                            }`}
                                    >
                                        Experience
                                    </button>
                                </div>

                                {/* Content Area */}
                                {statsTab === 'skills' ? (
                                    <>
                                        {/* Sub-filter for Skills */}
                                        <div className="flex flex-wrap gap-2 mb-6 animate-in fade-in duration-300">
                                            {skillCategories.map((filter) => (
                                                <button
                                                    key={filter}
                                                    onClick={() => setSkillFilter(filter as any)}
                                                    className={`
                            px-3 py-1 font-tech text-xs sm:text-sm uppercase tracking-wider transition-all border-b-4
                            ${skillFilter === filter
                                                            ? 'border-pink-500 text-slate-900 dark:text-white bg-pink-500/10'
                                                            : 'border-transparent text-slate-500 dark:text-gray-500 hover:text-slate-700 dark:hover:text-gray-300 hover:bg-slate-200 dark:hover:bg-slate-700'}
                        `}
                                                >
                                                    {filter}
                                                </button>
                                            ))}
                                        </div>

                                        {/* Skills Grid */}
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 overflow-y-auto pr-2 custom-scrollbar max-h-[60vh] animate-in slide-in-from-bottom-4 duration-500">
                                            {filteredSkills.map((skill) => {
                                                const rank = getRank(skill.level);
                                                return (
                                                    <div key={skill.name} className="group relative bg-white dark:bg-slate-900 border-2 border-slate-300 dark:border-slate-700 p-3 hover:border-cyan-400 transition-colors flex items-center gap-4 h-full shadow-sm">
                                                        {/* Hover Effect */}
                                                        <div className="absolute inset-0 bg-cyan-400/5 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300"></div>

                                                        {/* Icon Box */}
                                                        <div className="w-12 h-12 bg-slate-100 dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-600 flex items-center justify-center shrink-0 shadow-inner group-hover:border-cyan-400 transition-colors p-2">
                                                            <SkillIcon iconKey={skill.iconKey} size={28} />
                                                        </div>

                                                        {/* Details */}
                                                        <div className="flex-1 z-10">
                                                            <div className="flex justify-between items-end mb-1">
                                                                <span className="font-display text-lg tracking-wide text-slate-800 dark:text-white">{skill.name}</span>
                                                                <span className={`font-mono text-xs ${rank.color} font-bold`}>LV.{skill.level}</span>
                                                            </div>
                                                            {/* Progress Bar */}
                                                            <div className="h-3 bg-slate-200 dark:bg-black border border-slate-300 dark:border-slate-700 relative overflow-hidden">
                                                                {/* Grid lines on bar */}
                                                                <div className="absolute inset-0 flex justify-between px-1 opacity-30 z-10">
                                                                    {[...Array(9)].map((_, i) => <div key={i} className="w-px h-full bg-slate-500"></div>)}
                                                                </div>
                                                                <div
                                                                    className={`h-full ${skill.level >= 5 ? 'bg-gradient-to-r from-cyan-500 to-pink-500' : 'bg-cyan-600'} transition-all duration-1000 ease-out group-hover:brightness-125`}
                                                                    style={{ width: `${skill.level * 20}%` }}
                                                                ></div>
                                                            </div>
                                                        </div>

                                                        {/* Rank Badge */}
                                                        <div className={`w-10 h-10 flex items-center justify-center border-2 ${rank.border} ${rank.color} bg-slate-50 dark:bg-slate-900 font-display text-xl shadow-[2px_2px_0px_rgba(0,0,0,0.1)] dark:shadow-[2px_2px_0px_rgba(0,0,0,0.5)] shrink-0`}>
                                                            {rank.label}
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </>
                                ) : (
                                    /* Experience List (Quest Log) */
                                    <div className="space-y-6 overflow-y-auto pr-4 custom-scrollbar max-h-[60vh] animate-in slide-in-from-right-4 duration-500">
                                        {EXPERIENCES.map((exp) => (
                                            <div key={exp.id} className="relative pl-8 border-l-4 border-slate-300 dark:border-slate-700 group">
                                                {/* Timeline Dot */}
                                                <div className="absolute -left-[10px] top-0 w-4 h-4 rounded-full bg-pink-500 border-2 border-white dark:border-slate-900 group-hover:scale-125 transition-transform"></div>

                                                {/* Card */}
                                                <div className="bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-700 p-6 relative hover:border-pink-500 dark:hover:border-pink-500 transition-colors shadow-sm">
                                                    {/* Header */}
                                                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-4 gap-2">
                                                        <div>
                                                            <h3 className="font-display text-2xl text-slate-800 dark:text-white">{exp.role}</h3>
                                                            <div className="flex items-center gap-2 text-cyan-600 dark:text-cyan-400 font-bold font-mono text-sm mt-1">
                                                                <Briefcase size={14} />
                                                                <span>{exp.company}</span>
                                                                <span className="text-slate-400 dark:text-slate-600">|</span>
                                                                <span className="text-xs bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded border border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 uppercase">{exp.type}</span>
                                                            </div>
                                                        </div>
                                                        <div className="bg-slate-100 dark:bg-slate-800 px-3 py-1 font-mono text-xs font-bold border border-slate-300 dark:border-slate-600 rounded text-slate-600 dark:text-slate-400 shrink-0">
                                                            {exp.period}
                                                        </div>
                                                    </div>

                                                    {/* Description */}
                                                    <p className="text-slate-600 dark:text-slate-300 text-sm mb-4 font-sans leading-relaxed">
                                                        {exp.description}
                                                    </p>

                                                    {/* Achievements */}
                                                    <div className="space-y-2">
                                                        {exp.achievements.map((achievement, i) => (
                                                            <div key={i} className="flex gap-3 items-start text-sm text-slate-700 dark:text-slate-400">
                                                                <Award size={16} className="text-yellow-500 shrink-0 mt-0.5" />
                                                                <span>{achievement}</span>
                                                            </div>
                                                        ))}
                                                    </div>

                                                    {/* Watermark/Deco */}
                                                    <div className="absolute bottom-2 right-2 opacity-5 dark:opacity-10 text-6xl font-display text-slate-900 dark:text-white pointer-events-none">
                                                        XP
                                                    </div>
                                                </div>
                                            </div>
                                        ))}

                                        {/* Start of Timeline */}
                                        <div className="relative pl-8">
                                            <div className="absolute -left-[7px] top-1 w-3 h-3 rounded-full bg-slate-400 dark:bg-slate-600"></div>
                                            <div className="text-slate-400 dark:text-slate-600 font-mono text-xs">BEGINNING OF JOURNEY...</div>
                                        </div>
                                    </div>
                                )}

                            </div>
                        </div>

                    </div>

                </div>
            </div>
        </section>
    );
}
