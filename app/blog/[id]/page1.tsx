
import React from 'react';
import Link from 'next/link';
import { BLOG_POSTS } from '@/lib/constants';
import { ArrowLeft, Clock, Tag, AlertTriangle } from 'lucide-react';

export function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({
    id: post.id,
  }));
}

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function BlogPostPage({ params }: PageProps) {
  const { id } = await params;
  const post = BLOG_POSTS.find((p) => p.id === id);

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 dark:bg-anime-dark text-slate-900 dark:text-white">
        <AlertTriangle size={64} className="text-yellow-500 mb-4" />
        <h1 className="font-display text-4xl mb-2">DATA LOG NOT FOUND</h1>
        <p className="font-mono text-slate-500 dark:text-gray-400 mb-8">ERROR 404: Memory corrupted or missing.</p>
        <Link href="/" className="fire-btn bg-pink-600 text-white px-6 py-3 border-2 border-black font-display tracking-widest">
          RETURN TO BASE
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-anime-dark text-slate-900 dark:text-white selection:bg-pink-500 selection:text-white overflow-y-auto tech-grid">
      
      {/* Header / Nav */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-white/10">
        <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/#blog" className="flex items-center gap-2 text-slate-600 dark:text-gray-300 hover:text-pink-600 dark:hover:text-pink-400 transition-colors font-mono text-sm font-bold">
            <ArrowLeft size={20} />
            GO_BACK
          </Link>
          <div className="font-display text-xl bg-linear-to-r from-pink-600 to-cyan-600 bg-clip-text text-transparent">
            Yukuan's  BLOGS
          </div>
        </div>
      </header>

      <main className="pt-24 pb-20 px-4">
        <article className="max-w-3xl mx-auto">
          
          {/* Hero Image */}
          <div className="relative w-full aspect-video rounded-lg overflow-hidden border-4 border-slate-900 dark:border-white mb-8 shadow-xl">
            <img src={post.imageUrl} alt={post.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-linear-to-t from-black/80 to-transparent"></div>
            
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
              <div className="flex gap-3 mb-3">
                 <span className="bg-pink-600 text-white text-xs font-mono px-2 py-1 border border-black dark:border-white flex items-center gap-1">
                   <Tag size={12} /> {post.category}
                 </span>
                 <span className="bg-slate-800 text-cyan-400 text-xs font-mono px-2 py-1 border border-cyan-500 flex items-center gap-1">
                   <Clock size={12} /> {post.readTime}
                 </span>
              </div>
              <h1 className="font-display text-4xl md:text-6xl text-white leading-none drop-shadow-[3px_3px_0px_#000]">
                {post.title}
              </h1>
              <p className="font-mono text-slate-300 mt-2 text-sm">POST_DATE: {post.date}</p>
            </div>
          </div>

          {/* Content */}
          <div className="prose prose-slate dark:prose-invert max-w-none prose-lg prose-headings:font-display prose-headings:tracking-wide prose-p:font-sans prose-code:font-mono prose-code:bg-slate-100 dark:prose-code:bg-slate-800 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:before:content-none prose-code:after:content-none prose-pre:bg-slate-900 prose-pre:border-2 prose-pre:border-slate-700">
            <div dangerouslySetInnerHTML={{ 
                // Simple render of markdown content. In a real app, use a markdown parser like react-markdown
                __html: post.content.replace(/\n/g, '<br/>').replace(/# (.*)/g, '<h2>$1</h2>').replace(/## (.*)/g, '<h3>$1</h3>').replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>') 
            }} />
          </div>

          {/* Footer of Article */}
          <div className="mt-12 pt-8 border-t-2 border-slate-200 dark:border-slate-700 flex justify-between items-center">
             <div className="font-mono text-sm text-slate-500 dark:text-gray-500">
               END_OF_BLOG
             </div>
             <div className="flex gap-4">
               <button className="p-2 bg-slate-100 dark:bg-slate-800 rounded-full hover:bg-pink-100 dark:hover:bg-pink-900/30 transition-colors">
                 <Link href="#" className="text-slate-900 dark:text-white">Share</Link>
               </button>
             </div>
          </div>

        </article>
      </main>

    </div>
  );
}
