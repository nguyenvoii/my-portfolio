// === PORTFOLIO DATA TYPES ===

export interface Skill {
  category: string;
  items: string[];
}

export interface Hobby {
  title: string;
  description: string;
  icon: string;
}

export interface SocialLink {
  platform: string;
  handle: string;
  url?: string;
}

// === PORTFOLIO CONSTANTS ===

export const PERSONAL_INFO = {
  name: 'Nguyễn Voi',
  realName: 'Nguyễn Anh Phi',
  title: 'Developer & Guitarist',
  tagline: 'Where Logic Meets Melody — Building Digital Experiences, Strumming Real Ones'
} as const;

export const EDUCATION = {
  institution: 'FPT Polytechnic',
  major: 'Information Technology',
  period: '2024–2027',
  status: 'Current Student',
  direction: 'Exploring the crossroads between programming and music'
} as const;

export const SKILLS: Skill[] = [
  {
    category: 'Technical',
    items: ['React / Next.js', 'TypeScript', 'CSS / Tailwind CSS', 'Database']
  },
  {
    category: 'Music',
    items: ['Electric Guitar', '6+ months of learning']
  },
  {
    category: 'Soft Skills',
    items: ['Problem-solving', 'Communication']
  },
  {
    category: 'English',
    items: ['IELTS Current: 5.0 | Goal: 7.0']
  }
];

export const HOBBIES: Hobby[] = [
  {
    title: 'Guitar',
    description: '6+ months and counting',
    icon: '🎸'
  },
  {
    title: 'Anime',
    description: 'Sword Art Online is my favorite',
    icon: '⚔️'
  },
  {
    title: 'Night Cycling',
    description: 'Late-night rides and quiet roads',
    icon: '🚲'
  },
  {
    title: 'Light Novels',
    description: 'Favorite: Sword Art Online',
    icon: '📖'
  }
];

export const SOCIAL_LINKS: SocialLink[] = [
  {
    platform: 'Discord',
    handle: 'nguyen_voi'
  },
  {
    platform: 'Email',
    handle: 'phinath08326@gmail.com',
    url: 'mailto:phinath08326@gmail.com'
  },
  {
    platform: 'Facebook',
    handle: 'nguyenvoii',
    url: 'https://www.facebook.com/nguyenvoiii/'
  }
];

export const ABOUT_STORY = `Currently a FPT Polytechnic student in Information Technology, navigating the crossroads between music and programming. When I'm not coding, you'll find me playing electric guitar (6+ months and counting), watching anime, enjoying late-night cycling on quiet roads, or diving into Light Novels—especially Sword Art Online. Building digital experiences by day, exploring rhythm by night.`;

export const CODE_MUSIC_CONCEPT = {
  code: {
    title: 'CODE',
    items: ['React', 'TypeScript', 'Next.js', 'Database'],
    represents: ['Logic', 'Systems', 'Structure', 'Problem solving']
  },
  music: {
    title: 'MUSIC',
    items: ['Electric Guitar', 'Rhythm', 'Practice', 'Expression'],
    represents: ['Rhythm', 'Emotion', 'Expression', 'Practice']
  },
  bridge: 'Different tools. Same mindset.'
} as const;