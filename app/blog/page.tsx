import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Clock, Tag, BookOpen } from 'lucide-react';
import { getAllPosts } from '@/lib/blog';

export const metadata: Metadata = {
  title: 'Blog | Yukuan Hao',
  description: 'Notes and lessons from building software — frontend, backend, game dev, and everything in between.',
};

export default function BlogIndexPage() {
  const posts = getAllPosts();

  return (
    <div className="h-screen w-full overflow-y-auto bg-slate-50 dark:bg-anime-dark text-slate-900 dark:text-white selection:bg-pink-500 selection:text-white tech-grid">
      {/* Header / Nav */}
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-white/10">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 text-slate-600 dark:text-gray-300 hover:text-pink-600 dark:hover:text-pink-400 transition-colors font-mono text-sm font-bold"
          >
            <ArrowLeft size={20} />
            GO_BACK
          </Link>
          <div className="font-display text-xl bg-gradient-to-r from-pink-600 to-cyan-600 dark:from-pink-500 dark:to-cyan-400 bg-clip-text text-transparent">
            DATA LOGS
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 pt-16 pb-24">
        {/* Title */}
        <div className="flex items-end justify-between mb-12 border-b-4 border-slate-900 dark:border-white pb-4">
          <h1 className="font-display text-5xl md:text-7xl drop-shadow-[3px_3px_0px_rgba(0,0,0,0.2)] dark:drop-shadow-[3px_3px_0px_#000]">
            Blog
          </h1>
          <span className="font-mono text-pink-600 dark:text-pink-500 text-lg md:text-xl animate-pulse hidden md:block">
            /// DEV JOURNAL
          </span>
        </div>

        {posts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <BookOpen size={64} className="text-slate-400 dark:text-slate-600 mb-4" />
            <p className="font-mono text-slate-500 dark:text-gray-400">
              No entries yet. Add a <code>.md</code> file to <code>content/blog/</code>.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {posts.map((post, index) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group relative flex flex-col bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 hover:border-pink-500 dark:hover:border-pink-500 transition-colors duration-300 overflow-hidden"
                style={{ clipPath: 'polygon(0 0, 100% 0, 100% 92%, 94% 100%, 0 100%)' }}
              >
                {/* Accent bar */}
                <div className="h-1 w-full bg-slate-200 dark:bg-slate-800 flex">
                  <div className={`h-full w-1/3 ${index % 2 === 0 ? 'bg-cyan-500' : 'bg-pink-500'}`} />
                </div>

                <div className="p-6 flex flex-col flex-grow">
                  {/* Meta badges */}
                  <div className="flex flex-wrap gap-2 mb-3 font-mono text-[10px]">
                    <span className="bg-pink-600 text-white px-2 py-1 flex items-center gap-1">
                      <Tag size={12} /> {post.category}
                    </span>
                    <span className="bg-slate-800 text-cyan-400 px-2 py-1 border border-cyan-500 flex items-center gap-1">
                      <Clock size={12} /> {post.readTime}
                    </span>
                  </div>

                  <h2 className="font-display text-2xl md:text-3xl uppercase tracking-wide leading-tight mb-3 group-hover:text-pink-600 dark:group-hover:text-pink-500 transition-colors">
                    {post.title}
                  </h2>

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
        )}
      </main>
    </div>
  );
}
