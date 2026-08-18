import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { ArrowLeft, Clock, Tag } from 'lucide-react';
import { getAllPosts, getPostBySlug } from '@/lib/blog';
import ThemeToggle from '@/components/ThemeToggle';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: 'Not Found | Yukuan Hao' };

  return {
    title: `${post.title} | Yukuan Hao`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.date || undefined,
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) notFound();

  return (
    <div className="h-screen w-full overflow-y-auto bg-slate-50 dark:bg-anime-dark text-slate-900 dark:text-white selection:bg-pink-500 selection:text-white tech-grid">
      {/* Header / Nav */}
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-white/10">
        <div className="max-w-3xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link
            href="/blog"
            className="flex items-center gap-2 text-slate-600 dark:text-gray-300 hover:text-pink-600 dark:hover:text-pink-400 transition-colors font-mono text-sm font-bold"
          >
            <ArrowLeft size={20} />
            ALL_LOGS
          </Link>
          <div className="flex items-center gap-3">
            <div className="font-display text-xl bg-gradient-to-r from-pink-600 to-cyan-600 dark:from-pink-500 dark:to-cyan-400 bg-clip-text text-transparent">
              DATA LOG
            </div>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="pt-16 pb-24 px-4">
        <article className="max-w-3xl mx-auto">
          {/* Title block */}
          <div className="mb-10 border-b-4 border-slate-900 dark:border-white pb-6">
            <div className="flex flex-wrap gap-2 mb-4 font-mono text-[10px]">
              <span className="bg-pink-600 text-white px-2 py-1 flex items-center gap-1">
                <Tag size={12} /> {post.category}
              </span>
              <span className="bg-slate-800 text-cyan-400 px-2 py-1 border border-cyan-500 flex items-center gap-1">
                <Clock size={12} /> {post.readTime}
              </span>
              {post.date && (
                <span className="text-slate-500 dark:text-gray-400 px-2 py-1">
                  POST_DATE: {post.date}
                </span>
              )}
            </div>
            <h1 className="font-display text-4xl md:text-6xl leading-none drop-shadow-[2px_2px_0px_rgba(0,0,0,0.15)] dark:drop-shadow-[3px_3px_0px_#000]">
              {post.title}
            </h1>
          </div>

          {/* Optional cover */}
          {post.cover && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={post.cover}
              alt={post.title}
              className="w-full aspect-video object-cover rounded-lg border-2 border-slate-900 dark:border-white mb-10"
            />
          )}

          {/* Markdown body */}
          <div className="prose prose-slate dark:prose-invert max-w-none prose-lg prose-headings:font-display prose-headings:tracking-wide prose-a:text-pink-600 dark:prose-a:text-pink-400 prose-code:font-mono prose-code:before:content-none prose-code:after:content-none prose-pre:border-2 prose-pre:border-slate-700">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.content}</ReactMarkdown>
          </div>

          {/* Footer */}
          <div className="mt-12 pt-6 border-t-2 border-slate-200 dark:border-slate-700 flex justify-between items-center font-mono text-sm text-slate-500 dark:text-gray-500">
            <span>END_OF_LOG</span>
            <Link href="/blog" className="hover:text-pink-500 transition-colors">
              ← MORE LOGS
            </Link>
          </div>
        </article>
      </main>
    </div>
  );
}
