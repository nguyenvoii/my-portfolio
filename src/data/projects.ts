// Projects data - using actual school projects and learning experiences
// Do not fabricate independent projects, freelance clients, or fake achievements

import { Project } from '../types';

export const projects: Project[] = [
  // Graduation Project - Featured
  {
    id: 'hotel-management',
    title: 'Hotel Management System',
    description: 'Comprehensive web-based hotel management solution built as graduation project at FPT College. Features room booking, customer management, billing, and admin dashboard for efficient hotel operations.',
    technologies: ['Java', 'JSP', 'MySQL', 'Servlet', 'HTML/CSS', 'JavaScript'],
    status: 'completed',
    featured: true,
    // Add image after taking screenshots
    // image: '/projects/hotel-management.png',
  },

  // Placeholder for other academic projects
  {
    id: 'academic-placeholder',
    title: 'More Projects Coming Soon',
    description: 'Continuing to build and learn through hands-on projects at FPT Polytechnic.',
    technologies: ['Learning', 'Building', 'Growing'],
    status: 'learning',
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
