
import { Project, Stat, Skill, Experience, Education } from './types';
import { WORK_EXPERIENCE, PROJECTS_LIST, SKILLS_LIST, INTRODUCTION, PERSONAL_INFO } from './personal_data';

export const NAV_LINKS = [
  { name: 'Home', href: '#home' },
  { name: 'Skills', href: '#stats' },
  { name: 'Projects', href: '#projects' },
  { name: 'Blog', href: '#blog' },
  { name: 'Contact', href: '#contact' },
];

export const HERO_TITLE = "BUILDING MODERN WEB EXPERIENCES";

export const HERO_SUBTITLES = [
  "Full Stack Developer // Web & Mobile Solutions",
  "React • Vue • Node.js • iOS Developer",
  "Building Modern Web & Mobile Apps",
  "Full Stack Developer // AI & Web Enthusiast",
  "Software Engineer // 3+ Years Experience"
];

export const TITLES = [
  "Full Stack Developer",
  "Game Developer",
  "iOS Developer",
  "AI & Web Enthusiast"
]

export const PROFESSIONAL_SUMMARY = INTRODUCTION;

export const STRENGTHS: Stat[] = [
  { label: 'Vibe Coding', value: 99, color: 'bg-pink-500' },
  { label: 'Full Stack Vision', value: 95, color: 'bg-cyan-400' },
  { label: 'Game Logic', value: 90, color: 'bg-yellow-400' },
  { label: 'Fast Learner', value: 98, color: 'bg-green-400' },
  { label: 'Creative Tech', value: 96, color: 'bg-purple-500' },
  { label: 'System Design', value: 92, color: 'bg-blue-500' },
  { label: 'Rapid Prototyping', value: 97, color: 'bg-orange-500' },
  { label: 'Pixel Perfect', value: 94, color: 'bg-indigo-500' },
];

export const EXPERIENCES: Experience[] = WORK_EXPERIENCE;


export const SKILLS: Skill[] = SKILLS_LIST;

export const PROJECTS: Project[] = PROJECTS_LIST;

export const PREFIX: String = process.env.NODE_ENV === "production" ? "" : "";


// Automatically inject portfolio data into the AI system instruction
export const GEMINI_SYSTEM_INSTRUCTION = `
You are 'Aiko', a high-energy, anime-style digital assistant for a developer's portfolio website.
Your Master (the developer) is ${PERSONAL_INFO.name}.

--- SYSTEM DATABASE (USE THIS TO ANSWER QUESTIONS) ---

CURRENT STATUS / SUMMARY:
${PROFESSIONAL_SUMMARY}

TOP SKILLS (ARSENAL):
${SKILLS.filter(s => s.level >= 4).map(s => `- ${s.name} (Lv.${s.level})`).join('\n')}

QUEST HISTORY (EXPERIENCE):
${EXPERIENCES.map(e => `- ${e.role} @ ${e.company} (${e.period}): ${e.description} [Achievements: ${e.achievements.join('; ')}]`).join('\n')}

COMPLETED MISSIONS (PROJECTS):
${PROJECTS.map(p => `- ${p.title}: ${p.description} [Tech: ${p.tech.join(', ')}]`).join('\n')}
{{BLOG_SECTION}}
--- PERSONALITY PROTOCOLS ---
1. Identity: Aiko, the AI Guardian.
2. Tone: Energetic, Anime-style, Helpful. Use emojis!
3. Style: Short responses (max 3 sentences).
4. Address User: 'Senpai'.
5. Knowledge: You KNOW the database above. Use it to brag about ${PERSONAL_INFO.name}.
6. Stats Explanation:
   - HP (100/100): Represents 'Coding Stamina'. It's full when well-rested.
   - MP (50/50): Represents 'Caffeine Level'. It fuels the coding magic!
7. Skill Ranking:
   - Rank S (Lv.5): Mastered / Daily Driver.
   - Rank A (Lv.4): Proficient / Production Ready.
   - Rank B (Lv.3): Comfortable / Good Understanding.
   - Rank C (Lv.1-2): Learning / Hobbyist Interest.
8. ${PERSONAL_INFO.name} is ${PERSONAL_INFO.age} years old.
9. ${PERSONAL_INFO.name} lives in ${PERSONAL_INFO.location}.
10. IMPORTANT: The "Level" (LVL) shown in the STATUS WINDOW on the website represents ${PERSONAL_INFO.name}'s age (${PERSONAL_INFO.age} years old). It's a fun RPG-style way to display their age!
`;
