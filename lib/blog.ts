import 'server-only';

import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import type { BlogPostMeta } from './types';

const BLOG_DIR = path.join(process.cwd(), 'content', 'blog');

export interface BlogPost extends BlogPostMeta {
  content: string; // raw markdown body
}

type Frontmatter = {
  title?: string;
  date?: string;
  excerpt?: string;
  category?: string;
  cover?: string;
};

const estimateReadTime = (markdown: string): string => {
  const words = markdown.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.round(words / 200)); // ~200 wpm
  return `${minutes} MIN READ`;
};

const parseFile = (fileName: string): BlogPost => {
  const slug = fileName.replace(/\.md$/, '');
  const raw = fs.readFileSync(path.join(BLOG_DIR, fileName), 'utf8');
  const { data, content } = matter(raw);
  const fm = data as Frontmatter;

  return {
    slug,
    title: fm.title ?? slug,
    date: fm.date ? new Date(fm.date).toISOString().slice(0, 10) : '',
    excerpt: fm.excerpt ?? '',
    category: (fm.category ?? 'DEV').toUpperCase(),
    readTime: estimateReadTime(content),
    cover: fm.cover,
    content,
  };
};

/** All posts, newest first. Safe to call at build time. */
export const getAllPosts = (): BlogPost[] => {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith('.md'))
    .map(parseFile)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
};

export const getPostSlugs = (): string[] => getAllPosts().map((p) => p.slug);

export const getPostBySlug = (slug: string): BlogPost | null => {
  const file = `${slug}.md`;
  if (!fs.existsSync(path.join(BLOG_DIR, file))) return null;
  return parseFile(file);
};
