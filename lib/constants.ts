
import { Project, Stat, Skill, BlogPost, Experience, Education } from './types';
import { WORK_EXPERIENCE, PROJECTS_LIST, SKILLS_LIST, INTRODUCTION, PERSONAL_INFO } from './personal_data';

export const NAV_LINKS = [
  { name: 'Home', href: '#home' },
  { name: 'Skills', href: '#stats' },
  { name: 'Projects', href: '#projects' },
  // { name: 'Blogs', href: '#blog' },
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

export const BLOG_POSTS: BlogPost[] = [
  {
    id: '1',
    title: 'MASTERING SCROLL SNAP',
    excerpt: 'How I built a smooth, component-driven page structure using CSS Scroll Snap and IntersectionObserver for this portfolio.',
    content: `
# Mastering Scroll Snap in React

Creating a full-screen immersive experience often requires precise control over scrolling. In this portfolio, I leveraged CSS Scroll Snap to create a presentation-like feel for each section.

## The Core CSS
The magic happens with just a few lines of Tailwind CSS classes:
\`\`\`css
.snap-y { scroll-snap-type: y mandatory; }
.snap-start { scroll-snap-align: start; }
\`\`\`

## Intersection Observer Integration
While scroll snap handles the physics, we need to know "where" we are to update the navigation. I used the \`IntersectionObserver\` API (or a manual scroll spy in \`useEffect\`) to detect which section is currently in view.

### Key Challenges
1. **Mobile Address Bar**: On mobile browsers, the address bar resizing can cause jank. I had to ensure the container height handled \`100dvh\` (dynamic viewport height) correctly.
2. **Accessibility**: Scroll hijacking can be annoying. Scroll snap is a native CSS feature, so it respects keyboard navigation and accessibility settings better than JavaScript libraries.

## Conclusion
CSS Scroll Snap is a powerful tool for storytelling on the web. It guides the user through the journey you've crafted, ensuring they see exactly what you want them to see.
    `,
    date: '2024.03.20',
    category: 'CSS/UX',
    readTime: '5 MIN READ',
    imageUrl: 'https://picsum.photos/600/400?random=201'
  },
  {
    id: '2',
    title: 'CHROME EXTENSION ARCHITECTURE',
    excerpt: 'Bridging the gap between background scripts, content scripts, and a React frontend in browser extension development.',
    content: `
# Building a React-Based Chrome Extension

Browser extensions are powerful tools, but their architecture differs significantly from standard web apps. Here's how I structured my vocabulary tracking extension.

## The Manifest V3 Challenge
Moving from V2 to V3 meant replacing background pages with service workers. This implies no persistent DOM in the background. State must be persisted in \`chrome.storage\`.

## Messaging System
Communication between the **Content Script** (running on the webpage), the **Popup** (React app), and the **Background Service Worker** relies on a message passing system.

\`\`\`typescript
// Sending a message from content script
chrome.runtime.sendMessage({ type: "NEW_WORD_DETECTED", payload: word });

// Listening in background
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "NEW_WORD_DETECTED") {
    // Handle storage logic
  }
});
\`\`\`

## Shared UI Components
I used a monorepo structure to share UI components between the extension popup and the companion web dashboard, ensuring a consistent design language across the entire ecosystem.
    `,
    date: '2024.02.15',
    category: 'DEV',
    readTime: '8 MIN READ',
    imageUrl: 'https://picsum.photos/600/400?random=202'
  },
  {
    id: '3',
    title: 'ELECTRON: LOCAL FIRST',
    excerpt: 'Building an audio editor without a backend. Lessons learned handling binary data and the Web Audio API locally.',
    content: `
# Electron & The Web Audio API

For my local audio editor project, I wanted to avoid uploading large audio files to a server. Electron was the perfect solution for a "Local First" architecture.

## Handling Files
Electron provides access to the Node.js \`fs\` module. This allows us to read audio files directly from the disk into an \`ArrayBuffer\`.

## Visualizing Audio
I used the Canvas API to draw waveforms.
1. Decode audio data using \`AudioContext.decodeAudioData()\`.
2. Sample the PCM data (e.g., take the peak of every 100 samples).
3. Draw lines on the canvas representing amplitude.

## Performance
Processing 100MB+ wav files in JavaScript can block the main thread. I offloaded the waveform generation to a **Web Worker**, keeping the UI responsive while the file loaded.
    `,
    date: '2024.01.10',
    category: 'ELECTRON',
    readTime: '6 MIN READ',
    imageUrl: 'https://picsum.photos/600/400?random=203'
  },
  {
    id: '4',
    title: 'SUPABASE RLS STRATEGIES',
    excerpt: 'Implementing secure many-to-many relationships for a social feed app using Postgres Row Level Security policies.',
    content: `
# Securing Data with Row Level Security (RLS)

When using Supabase (or any PostgREST system), security is handled at the database level, not the API middleware level.

## The Scenario
I built a feed aggregator where users can follow multiple feeds.
- Table: \`users\`
- Table: \`feeds\`
- Table: \`user_feeds\` (Many-to-Many junction)

## The Policy
To allow a user to see entries from feeds they follow, the SQL policy looks something like this:

\`\`\`sql
CREATE POLICY "User can view entries from followed feeds"
ON entries
FOR SELECT
USING (
  feed_id IN (
    SELECT feed_id FROM user_feeds WHERE user_id = auth.uid()
  )
);
\`\`\`

This ensures that even if someone tries to query all entries via the API, the database only returns rows they are authorized to see.
    `,
    date: '2023.12.05',
    category: 'BACKEND',
    readTime: '7 MIN READ',
    imageUrl: 'https://picsum.photos/600/400?random=204'
  },
  {
    id: '5',
    title: 'COMFYUI & CUDA WORKFLOWS',
    excerpt: 'My journey setting up local AI generation environments and debugging complex CUDA dependencies.',
    content: `
# Deep Dive into Local AI Generation

Running Stable Diffusion locally offers incredible control, but setting up the environment can be a dependency nightmare.

## The Stack
- **Python 3.10**: Specific version required for torch compatibility.
- **PyTorch + CUDA 11.8**: Matching the drivers on my RTX card.
- **ComfyUI**: A node-based GUI that lets you chain model components visually.

## Custom Nodes
The power of ComfyUI comes from custom nodes. I wrote a simple Python node to automate the naming convention of generated images based on the prompt seed, which required understanding how data flows between the latent space decoders and the file saver nodes.

## Dockerizing
I eventually containerized the setup. Passing the GPU to Docker requires the NVIDIA Container Toolkit, but once set up, it makes switching between different AI environments (e.g., text generation vs image generation) trivial.
    `,
    date: '2023.11.20',
    category: 'AI/OPS',
    readTime: '4 MIN READ',
    imageUrl: 'https://picsum.photos/600/400?random=205'
  },
  {
    id: '6',
    title: 'NEXT.JS vs VITE',
    excerpt: 'When to choose a meta-framework like Next.js versus a swift SPA build tool like Vite for your personal projects.',
    content: `
# Next.js vs Vite: Choosing the Right Tool

In the React ecosystem, we have two dominant players for starting a project. Here is how I decide which to use.

## Use Next.js If:
- **SEO is critical**: Server Side Rendering (SSR) is built-in.
- **You need a backend**: API routes allow you to build a full-stack app in one repo.
- **Image Optimization**: The \`<Image/>\` component is a lifesaver for Core Web Vitals.

## Use Vite If:
- **It's a dashboard**: If the app is behind a login, SEO doesn't matter.
- **Client-heavy logic**: Games, editors, or complex SPAs often benefit from the simpler client-side model.
- **Build speed**: Vite is incredibly fast during development.

## Verdict
For this portfolio, I chose Next.js because I wanted the metadata controls and the potential to add server-side logic for the AI chat integration later on.
    `,
    date: '2023.10.31',
    category: 'OPINION',
    readTime: '5 MIN READ',
    imageUrl: 'https://picsum.photos/600/400?random=206'
  }
];

// Automatically inject portfolio data into the AI system instruction
export const GEMINI_SYSTEM_INSTRUCTION = `
You are 'Aiko', a high-energy, anime-style digital assistant for a developer's portfolio website.
Your Master (the developer) is ${PERSONAL_INFO.name}.

--- SYSTEM DATABASE (USE THIS TO ANSWER QUESTIONS) ---

CURRENT STATUS / SUMMARY:
${PROFESSIONAL_SUMMARY}

TOP SKILLS (ARSENAL):
${SKILLS.filter(s => s.level >= 85).map(s => `- ${s.name} (Lv.${s.level})`).join('\n')}

QUEST HISTORY (EXPERIENCE):
${EXPERIENCES.map(e => `- ${e.role} @ ${e.company} (${e.period}): ${e.description} [Achievements: ${e.achievements.join('; ')}]`).join('\n')}

COMPLETED MISSIONS (PROJECTS):
${PROJECTS.map(p => `- ${p.title}: ${p.description} [Tech: ${p.tech.join(', ')}]`).join('\n')}

ARCHIVED MEMORIES (BLOGS):
${BLOG_POSTS.map(b => `- ${b.title}: ${b.excerpt}`).join('\n')}

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
