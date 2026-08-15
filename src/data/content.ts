// Personal content and interests data
// Accurate information about Nguyễn Voi's actual interests and experiences

import { Hobby, Skill, SocialLink } from '../types';

// Skills - current learning areas, not exaggerated
export const skills: Skill[] = [
  // Development
  {
    category: 'development',
    name: 'JavaScript',
  },
  {
    category: 'development',
    name: 'HTML',
  },
  {
    category: 'development',
    name: 'CSS',
  },

  // Data
  {
    category: 'data',
    name: 'SQL',
  },
  {
    category: 'data',
    name: 'Database Fundamentals',
  },
];

// Hobbies and interests
export const hobbies: Hobby[] = [
  {
    id: 'guitar',
    title: 'Electric Guitar',
    icon: '🎸',
    description: '6+ months of practice. Currently working on rhythm, chords, riffs, bending, and lead guitar fundamentals.',
    items: ['Rhythm', 'Chords', 'Riffs', 'Bending', 'Lead Fundamentals'],
  },
  {
    id: 'movies',
    title: 'Movies',
    icon: '🎬',
    description: 'Anime enthusiast. Sword Art Online is my favorite.',
    items: ['Sword Art Online', 'Girls Band Cry', 'Ave Mujica'],
  },
  {
    id: 'light-novels',
    title: 'Light Novels',
    icon: '📚',
    description: 'Japanese light novels, particularly Sword Art Online.',
    items: ['Sword Art Online'],
  },
  {
    id: 'night-cycling',
    title: 'Night Cycling',
    icon: '🚴',
    description: 'Night rides for staying active, relaxing, and enjoying quiet roads.',
  },
];

// Social media links
export const socialLinks: SocialLink[] = [
  {
    platform: 'Discord',
    username: 'nguyen_voi',
    icon: '💬',
  },
  {
    platform: 'Email',
    username: 'phinath08326@gmail.com',
    url: 'mailto:phinath08326@gmail.com',
    icon: '📧',
  },
  {
    platform: 'Facebook',
    username: 'nguyenvoiii',
    url: 'https://www.facebook.com/nguyenvoiii',
    icon: '👤',
  },
];

// Personal information
export const personalInfo = {
  name: 'Nguyễn "Voi" Anh Phi',
  fullName: 'Nguyễn "Voi" Anh Phi',
  tagline: 'Guitarist / Developer',
  taglineExtended: 'Stay cool.',

  // 3 Separate Learning Paths
  education: {
    institution: 'FPT Polytechnic',
    field: 'Information Technology - Software Development',
    period: '2024–2027',
    status: 'Sinh viên hiện tại',
  },

  english: {
    institution: 'DOL English',
    field: 'IELTS Preparation',
    level: '5.0 → 7.0',
    period: 'Đang học',
    status: 'Học viên hiện tại',
    url: 'https://www.facebook.com/dolenglish.hanoi?locale=vi_VN',
  },

  guitar: {
    institution: 'GuitarPlus Academy',
    field: 'Electric Guitar',
    level: '6+ months',
    period: 'Đang học',
    status: 'Học viên hiện tại',
    url: 'https://www.facebook.com/guitarplusacademy?locale=vi_VN',
  },
  bio: `I'm currently studying Information Technology at FPT Polytechnic while exploring software development, music, and the things that inspire me.

I'm curious, creative, and interested in technology, Japanese music and anime, and always learning. I'm still exploring my future rather than pretending I have everything figured out.

Hope we can learn and grow together.`,
};

// Guitar journey timeline
export const guitarJourney = {
  duration: '6+ MONTHS OF ELECTRIC GUITAR',
  stages: [
    { stage: 'Started', description: 'First picked up electric guitar' },
    { stage: 'Practicing', description: 'Building fundamentals and technique' },
    { stage: 'Exploring', description: 'Discovering different styles' },
    { stage: 'Improving', description: 'Developing skills and musicality' },
    { stage: 'Currently Learning', description: 'Always growing and practicing' },
  ],
  currentFocus: ['Rhythm', 'Chords', 'Riffs', 'Bending', 'Lead Fundamentals'],
};

// Favorite music
export const favoriteMusic = [
  {
    title: 'Sword Art Online',
    artist: 'Various Artists',
    note: 'Soundtracks that inspired my journey with anime and music',
  },
  {
    title: 'Girls Band Cry',
    artist: 'Togenashi Togeari',
    note: 'Recent favorite with compelling storytelling',
  },
  {
    title: 'Ave Mujica',
    artist: 'BanG Dream!',
    note: 'Mysterious and captivating performances',
  },
];

// Featured music track for player
export const featuredTrack = {
  title: 'unlasting',
  artist: 'LiSA',
  // Note: Actual audio source to be provided separately
  // This is for demonstration of the player architecture
};
