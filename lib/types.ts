
export interface Project {
  id: string;
  title: string;
  description: string;
  tech: string[];
  imageUrl: string;
  demoUrl?: string;
  githubUrl?: string;
  blogSlug?: string; // slug of the matching post in content/blog/*.md
}

export interface Stat {
  label: string;
  value: number; // 0-100
  color: string;
}

export interface Skill {
  name: string;
  level: number; // 1-5 (rendered as rank S/A/B/C and level*20% bars)
  category: 'frontend' | 'backend' | 'database' | 'devops' | 'mobile' | 'tools';
  iconKey: string;
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  description: string;
  type: 'full-time' | 'contract' | 'freelance' | 'education';
  achievements: string[];
}

export interface Education {
  school: string;
  period: string;
  degree: string;
}

// Blog post metadata (no body) — safe to pass into client components.
export interface BlogPostMeta {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  category: string;
  readTime: string;
  cover?: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  isError?: boolean;
}

export enum Section {
  HERO = 'HERO',
  STATS = 'STATS',
  PROJECTS = 'PROJECTS',
  BLOG = 'BLOG',
  CHAT = 'CHAT'
}
