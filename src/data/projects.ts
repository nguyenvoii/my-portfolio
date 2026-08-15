// Projects data - using actual school projects and learning experiences
// Do not fabricate independent projects, freelance clients, or fake achievements

import { Project } from '../types';

export const projects: Project[] = [
  // Start with placeholder structure - add real projects as they are completed
  // This architecture allows easy addition of new projects

  {
    id: 'project-1',
    title: 'Academic Project', // Replace with actual project name
    description: 'School project completed during FPT Polytechnic coursework.', // Update with real description
    technologies: ['JavaScript', 'HTML', 'CSS'], // Add actual technologies used
    status: 'completed',
    // Add actual image, github, demo when available
  },

  // Future project template:
  // {
  //   id: 'project-2',
  //   title: 'Real Project Name',
  //   description: 'Actual description of what was built and learned',
  //   technologies: ['React', 'TypeScript', 'GSAP'],
  //   status: 'in-progress',
  //   image: '/path/to/screenshot',
  //   github: 'https://github.com/nguyenvoi/project',
  //   demo: 'https://demo-url',
  //   featured: true,
  // },
];

// Helper function to filter projects by status
export const getProjectsByStatus = (status: Project['status']) =>
  projects.filter(project => project.status === status);

// Helper function to get featured projects
export const getFeaturedProjects = () =>
  projects.filter(project => project.featured);

// Helper function to get project by ID
export const getProjectById = (id: string) =>
  projects.find(project => project.id === id);
