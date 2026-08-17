import Link from 'next/link';
import { Clock, Tag, ArrowRight, BookOpen } from 'lucide-react';
import type { BlogPostMeta } from '@/lib/types';

export default function Blog({ posts }: { posts: BlogPostMeta[] }) {
  const recent = posts.slice(0, 4);

  return (
    <section
      id="blog"
      className="h-screen w-full snap-start relative flex flex-col overflow-hidden tech-grid bg-transparent"
    >
      <div className="flex-1 overflow-y-auto pt-24 pb-10 px-4 w-full">
        <div className="max-w-7xl mx-auto w-full relative z-10">
          {/* Header */}
          <div className="flex items-end justify-between mb-12 border-b-4 border-slate-900 dark:border-white pb-4">
            <h2 className="font-display text-5xl md:text-6xl text-slate-900 dark:text-white drop-shadow-[3px_3px_0px_rgba(0,0,0,0.2)] dark:drop-shadow-[3px_3px_0px_#000]">
              Blog
            </h2>
            <span className="font-mono text-pink-600 dark:text-pink-500 text-xl animate-pulse hidden md:block">
              /// DEV JOURNAL
            </span>
          </div>

          {recent.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <BookOpen size={64} className="text-slate-400 dark:text-slate-600 mb-4" />
              <p className="font-mono text-slate-500 dark:text-gray-400">
                No entries yet — new logs incoming.
              </p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {recent.map((post, index) => (
                  <Link
                    key={post.slug}
                    href={`/blog/${post.slug}`}
                    className="group relative flex flex-col bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 hover:border-pink-500 dark:hover:border-pink-500 transition-colors duration-300 overflow-hidden"
                    style={{ clipPath: 'polygon(0 0, 100% 0, 100% 92%, 96% 100%, 0 100%)' }}
                  >
                    {/* Accent bar */}
                    <div className="h-1 w-full bg-slate-200 dark:bg-slate-800 flex">
                      <div className={`h-full w-1/3 ${index % 2 === 0 ? 'bg-cyan-500' : 'bg-pink-500'}`} />
                    </div>

                    <div className="p-6 flex flex-col flex-grow">
                      <div className="flex flex-wrap gap-2 mb-3 font-mono text-[10px]">
                        <span className="bg-pink-600 text-white px-2 py-1 flex items-center gap-1">
                          <Tag size={12} /> {post.category}
                        </span>
                        <span className="bg-slate-800 text-cyan-400 px-2 py-1 border border-cyan-500 flex items-center gap-1">
                          <Clock size={12} /> {post.readTime}
                        </span>
                      </div>

                      <h3 className="font-display text-2xl md:text-3xl text-slate-900 dark:text-white uppercase tracking-wide leading-tight mb-3 group-hover:text-pink-600 dark:group-hover:text-pink-500 transition-colors">
                        {post.title}
                      </h3>

                      <p className="text-sm text-slate-600 dark:text-slate-400 font-sans leading-relaxed flex-grow">
                        {post.excerpt}
                      </p>

                      <div className="pt-4 mt-4 border-t border-slate-200 dark:border-slate-800 flex justify-between items-center text-[10px] font-mono text-slate-400 uppercase">
                        <span>{post.date || 'UNDATED'}</span>
                        <span className="group-hover:text-pink-500 transition-colors">READ_LOG →</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              {/* View all */}
              <div className="flex justify-center mt-10">
                <Link
                  href="/blog"
                  className="fire-btn inline-flex items-center gap-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 border-2 border-black dark:border-white px-6 py-3 font-display tracking-widest text-lg shadow-[4px_4px_0px_rgba(0,0,0,0.2)] dark:shadow-[4px_4px_0px_rgba(255,255,255,0.3)]"
                >
                  VIEW ALL LOGS <ArrowRight size={20} strokeWidth={3} />
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
