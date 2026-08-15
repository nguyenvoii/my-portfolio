// Music artists and bands - personal music interests
// These are genuine artists that Nguyễn Voi listens to
// Each now includes official website links for direct access

import { Artist } from '../types';

export const artists: Artist[] = [
  // Bands / Groups
  {
    name: 'Kessoku Band',
    type: 'band',
    note: 'Bocchi the Rock!',
    url: 'https://bocchi.rocks/', // Official website
  },
  {
    name: 'Togenashi Togeari',
    type: 'band',
    note: 'Girls Band Cry',
    url: 'https://www.girlsbandcry.info/', // Official website
  },
  {
    name: 'Ave Mujica',
    type: 'band',
    note: 'BanG Dream!',
    url: 'https://ave-mujica.bangdream.info/', // Official website
  },

  // Solo Artists
  {
    name: 'ReoNa',
    type: 'artist',
    url: 'https://reonajp.com/', // Official website
  },
  {
    name: 'LiSA',
    type: 'artist',
    url: 'https://www.lisa.jp/', // Official website
  },
  {
    name: 'Aimer',
    type: 'artist',
    url: 'https://www.aimer.net/', // Official website
  },
  {
    name: 'Haruka Tomatsu',
    type: 'artist',
    url: 'https://www.harukatomatsu.com/', // Official website
  },
];

// Helper functions for filtering artists
export const getBands = () => artists.filter(artist => artist.type === 'band');
export const getSoloArtists = () => artists.filter(artist => artist.type === 'artist');
