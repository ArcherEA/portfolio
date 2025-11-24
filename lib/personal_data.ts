import { Project, Skill, Experience, Education } from './types';

export const PERSONAL_INFO = {
    name: "Yukuan Hao",
    email: "haogenmao@gmail.com",
    phone: "+1 4379-985-5088",
    hobby: "programming, anime, music, movies",
    target: "full stack developer",
    github: "https://github.com/ArcherEA",
    linkedin: "https://www.linkedin.com/in/yukuan-hao-6a2b77171/",
    resume: "https://resume.com/",
    birthday: "1995-09-24",
    location: "Sherbrooke, Quebec, Canada",
    get age() {
        const today = new Date();
        const birthDate = new Date(this.birthday);
        let age = today.getFullYear() - birthDate.getFullYear();
        const m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    }
};



export const WORK_EXPERIENCE: Experience[] = [
    {
        id: '1',
        role: 'Software Engineer',
        company: 'Panda communication corp.',
        period: '2022-2025',
        type: 'full-time',
        description: "develop and maintain the company's website and mobile app.",
        achievements: [
            "Using react.js and vue.js to build (different website) backend management system website.",
            "Using objective c and swift to build iOS app.",
            "collaborate with team members to develop and maintain the company's website and mobile app.",
            "work together with design team to create a user-friendly and visually appealing interface.",
            "work with test team to ensure the quality of the app."
        ]
    },
    {
        id: '2',
        role: 'Computer Science',
        company: "Bishop's University",
        period: '2019-2021',
        type: 'education',
        description: "Bachelor's Degree",
        achievements: []
    },
    {
        id: '3',
        role: 'Surveying and mapping engineering',
        company: "jilin university",
        period: '2013-2017',
        type: 'education',
        description: "Bachelor's Degree",
        achievements: []
    }
];

export const PROJECTS_LIST: Project[] = [
    {
        id: '1',
        title: 'portfolio website',
        description: 'My personal portfolio website.',
        tech: ['React', 'Next.js', 'Tailwind'],
        imageUrl: 'https://picsum.photos/600/400?random=1',
        githubUrl: 'https://github.com/',
        demoUrl: ''
    },
    {
        id: '2',
        title: 'Tower defense game',
        description: 'A tower defense game using Unity.',
        tech: ['Unity3d', 'C#'],
        imageUrl: 'https://picsum.photos/600/400?random=2',
        githubUrl: ''
    },
    {
        id: '3',
        title: '3D wizard chess game',
        description: 'A 3D chess game using Unity.',
        tech: ['Unity3d', 'C#'],
        imageUrl: 'https://picsum.photos/600/400?random=2',
        githubUrl: ''
    },
    {
        id: '4',
        title: 'RSS reader project',
        description: 'An RSS reader application.',
        tech: ['React', 'Node.js'],
        imageUrl: 'https://picsum.photos/600/400?random=3',
        githubUrl: ''
    },
    {
        id: '5',
        title: 'backend management system',
        description: 'A backend management system for Panda communication corp.',
        tech: ['React.js', 'Vue.js'],
        imageUrl: 'https://picsum.photos/600/400?random=4',
        githubUrl: ''
    },
    {
        id: '6',
        title: 'Mobile reading app',
        description: 'An iOS app for reading books.',
        tech: ['Objective-C', 'Swift'],
        imageUrl: 'https://picsum.photos/600/400?random=5',
        githubUrl: ''
    }
];

export const SKILLS_LIST: Skill[] = [
    // Frontend
    { name: 'React.js', level: 5, category: 'frontend', iconKey: 'react' },
    { name: 'Vue.js', level: 4, category: 'frontend', iconKey: 'vue' },
    { name: 'TailwindCSS', level: 5, category: 'frontend', iconKey: 'tailwind' },
    { name: 'ShadcnUI', level: 4, category: 'frontend', iconKey: 'shadcnui' },
    { name: 'TypeScript', level: 4, category: 'frontend', iconKey: 'typescript' },
    { name: 'JavaScript', level: 5, category: 'frontend', iconKey: 'javascript' },
    { name: 'HTML5', level: 5, category: 'frontend', iconKey: 'html5' },
    { name: 'CSS', level: 5, category: 'frontend', iconKey: 'css3' },

    // Backend
    { name: 'Node.js', level: 4, category: 'backend', iconKey: 'nodejs' },
    { name: 'Python', level: 3, category: 'backend', iconKey: 'python' },
    { name: 'Supabase', level: 4, category: 'backend', iconKey: 'supabase' },

    // Database
    { name: 'PostgreSQL', level: 4, category: 'database', iconKey: 'postgresql' },
    { name: 'MongoDB', level: 3, category: 'database', iconKey: 'mongodb' },

    // Mobile
    { name: 'Objective-C', level: 3, category: 'mobile', iconKey: 'objectivec' },
    { name: 'Swift', level: 3, category: 'mobile', iconKey: 'swift' },

    // Game
    { name: 'Unity3d', level: 4, category: 'tools', iconKey: 'unity' },

    // DevOps/Tools
    { name: 'Docker', level: 3, category: 'devops', iconKey: 'docker' },
    { name: 'AWS', level: 2, category: 'devops', iconKey: 'aws' },
    { name: 'Git', level: 4, category: 'tools', iconKey: 'git' },
    { name: 'GitHub', level: 4, category: 'tools', iconKey: 'github' },
    { name: 'GitHub Actions', level: 3, category: 'devops', iconKey: 'githubactions' },
    { name: 'Linux', level: 3, category: 'tools', iconKey: 'linux' },
    { name: 'VSCode', level: 5, category: 'tools', iconKey: 'vscode' },
    { name: 'Jira', level: 4, category: 'tools', iconKey: 'jira' },
    { name: 'Electron', level: 3, category: 'tools', iconKey: 'electron' },
];

export const INTRODUCTION = `
I'm a developer who genuinely loves the craft of programming. There's something magical about understanding how things work under the hood—from network protocols to backend architectures. While I'm still growing my skills, I'm eager to learn and contribute to a team that values curiosity and continuous improvement. I spend my free time exploring new technologies, vibe coding on personal projects, and diving deep into computer science fundamentals. I'm actively seeking opportunities where I can learn from experienced developers while bringing my enthusiasm and fresh perspective to real-world challenges.
`;
