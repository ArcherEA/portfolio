
export interface Project {
  id: string;
  title: string;
  description: string;
  tech: string[];
  imageUrl: string;
  demoUrl?: string;
  githubUrl?: string;
}

export interface Stat {
  label: string;
  value: number; // 0-100
  color: string;
}

export interface Skill {
  name: string;
  level: number; // 0-100
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

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  category: string;
  imageUrl: string;
  readTime: string;
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
