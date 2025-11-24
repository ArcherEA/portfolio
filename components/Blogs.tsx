'use client';
import { BLOG_POSTS } from '@/lib/constants';

import {
    FileText, Clock, Tag, ArrowRight
} from 'lucide-react';
export default function Blogs() {
    return (
        <section id="blog" className="h-screen w-full snap-start relative flex flex-col bg-transparent border-t-4 border-cyan-500 overflow-hidden tech-grid">
            <div className="flex-1 overflow-y-auto pt-24 pb-10 px-4 w-full">
                <div className="max-w-7xl mx-auto w-full relative z-10">

                {/* Blog Header */}
                <div className="flex items-center gap-4 mb-10 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm p-4 rounded-lg relative z-10">
                    <div className="bg-yellow-400 text-black p-3 border-2 border-black shadow-[4px_4px_0px_rgba(0,0,0,0.2)] dark:shadow-[4px_4px_0px_rgba(255,255,255,0.5)]">
                    <FileText size={28} />
                    </div>
                    <div>
                    <h2 className="font-display text-5xl text-slate-900 dark:text-white tracking-wide">DATA LOGS</h2>
                    <p className="font-mono text-cyan-600 dark:text-cyan-400 text-sm">/// ARCHIVED MEMORIES & TECH NOTES</p>
                    </div>
                </div>

                {/* Blog Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-8 relative z-10">
                    {BLOG_POSTS.map((post) => (
                    <div key={post.id} className="group relative bg-white dark:bg-slate-800 border-l-4 border-pink-500 p-6 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors overflow-hidden shadow-md dark:shadow-none">
                        {/* Decorative background number */}
                        <div className="absolute -right-4 -bottom-8 text-9xl font-display text-slate-100 dark:text-white/5 group-hover:text-slate-200 dark:group-hover:text-white/10 transition-colors select-none pointer-events-none">
                        0{post.id}
                        </div>

                        {/* Content Container with Higher Z-Index */}
                        <div className="relative z-10">
                        <div className="flex justify-between items-start mb-4">
                            <div className="flex items-center gap-2 text-xs font-mono text-cyan-700 dark:text-cyan-400 bg-cyan-100 dark:bg-cyan-900/30 px-2 py-1 border border-cyan-200 dark:border-cyan-700 rounded">
                            <Tag size={12} /> {post.category}
                            </div>
                            <div className="text-xs font-mono text-slate-500 dark:text-gray-500 flex items-center gap-1">
                            <Clock size={12} /> {post.readTime}
                            </div>
                        </div>

                        <h3 className="font-display text-2xl text-slate-900 dark:text-white mb-3 group-hover:text-pink-600 dark:group-hover:text-pink-400 transition-colors leading-tight">
                            {post.title}
                        </h3>

                        <p className="text-slate-600 dark:text-gray-300 text-sm mb-6 line-clamp-3 font-sans font-medium">
                            {post.excerpt}
                        </p>

                        <div className="flex justify-between items-center border-t border-slate-200 dark:border-gray-700 pt-4">
                            <span className="font-mono text-xs text-slate-400 dark:text-gray-500">{post.date}</span>
                            <a href={`/blog/${post.id}`} className="text-slate-900 dark:text-white font-bold text-sm uppercase tracking-wider hover:text-cyan-600 dark:hover:text-cyan-400 flex items-center gap-1 transition-colors">
                            Read Log <ArrowRight size={16} />
                            </a>
                        </div>
                        </div>
                    </div>
                    ))}
                </div>

                </div>
            </div>
        </section>
    );
}