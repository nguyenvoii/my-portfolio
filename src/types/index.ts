// Core type definitions for the portfolio

// Section type for navigation
export type Section = 'hero' | 'about' | 'build' | 'projects' | 'music' | 'explore' | 'connect';

export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  status: 'completed' | 'in-progress' | 'learning';
  image?: string;
  github?: string;
  demo?: string;
  featured?: boolean;
}

export interface Artist {
  name: string;
  type: 'band' | 'artist';
  note?: string;
  url?: string; // Official website link
}

export interface Hobby {
  id: string;
  title: string;
  icon: string;
  description: string;
  items?: string[];
}

export interface SocialLink {
  platform: string;
  username: string;
  url?: string;
  icon: string;
}

export interface Skill {
  category: 'development' | 'data';
  name: string;
  level?: string;
}

export interface MusicTrack {
  title: string;
  artist: string;
  duration?: string;
  audioSrc?: string;
}

// Animation state types
export interface AnimationState {
  isLoading: boolean;
  isScrolling: boolean;
  currentSection: string;
  reducedMotion: boolean;
}

// Education type for the 3 separate learning paths
export interface Education {
  institution: string;
  field: string;
  period: string;
  status: string;
  level?: string;
  url?: string;
  graduationProject?: {
    title: string;
    institution: string;
    description: string;
    path: string;
    technologies: string[];
  };
}
