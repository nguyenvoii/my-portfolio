import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { projects } from '../data/projects';

export const ProjectsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const projectsGridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
        end: 'top 20%',
        toggleActions: 'play none none reverse',
      },
    });

    if (titleRef.current) {
      tl.from(titleRef.current, {
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
      });
    }

    if (subtitleRef.current) {
      tl.from(
        subtitleRef.current,
        {
          y: 30,
          opacity: 0,
          duration: 0.6,
          ease: 'power2.out',
        },
        '-=0.4'
      );
    }

    if (projectsGridRef.current) {
      tl.from(
        projectsGridRef.current.children,
        {
          y: 60,
          opacity: 0,
          stagger: 0.15,
          duration: 0.5,
          ease: 'power2.out',
        },
        '-=0.2'
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const statusColors = {
    completed: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
    'in-progress': 'bg-amber-500/20 text-amber-400 border-amber-500/30',
    learning: 'bg-sky-blue/20 text-sky-blue border-sky-blue/30',
  };

  return (
    <section
      id="section-projects"
      ref={sectionRef}
      className="container-section relative"
    >
      <div className="container-content">
        <div className="max-w-6xl mx-auto">
          {/* Section header */}
          <div className="text-center mb-16">
            <h2
              ref={titleRef}
              className="text-6xl md:text-7xl font-display font-bold text-gradient mb-6"
            >
              THINGS I'VE BUILT
            </h2>
            <p
              ref={subtitleRef}
              className="text-xl text-muted-blue max-w-2xl mx-auto"
            >
              Projects, experiments, and things I'm learning through.
            </p>
          </div>

          {/* Projects grid */}
          <div
            ref={projectsGridRef}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {projects.map((project) => (
              <div
                key={project.id}
                className="group relative glass-panel p-6 hover:border-aurora/50 transition-all duration-500 interactive"
              >
                {/* Project status badge */}
                <div className="absolute top-4 right-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium border ${
                      statusColors[project.status]
                    }`}
                  >
                    {project.status.replace('-', ' ').toUpperCase()}
                  </span>
                </div>

                {/* Project icon/art area */}
                <div className="aspect-video mb-6 bg-midnight/50 rounded-lg overflow-hidden relative">
                  {project.image ? (
                    <img
                      src={`${import.meta.env.BASE_URL}${project.image}`}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="text-4xl opacity-20 group-hover:opacity-40 transition-opacity duration-300">
                        💻
                      </div>
                    </div>
                  )}

                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-aurora/0 group-hover:bg-aurora/10 transition-all duration-300" />
                </div>

                {/* Project content */}
                <div className="space-y-4">
                  <h3 className="text-xl font-display font-semibold text-soft-white group-hover:text-aurora transition-colors duration-300">
                    {project.title}
                  </h3>

                  <p className="text-muted-blue text-sm leading-relaxed">
                    {project.description}
                  </p>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-midnight/80 text-xs text-sky-blue/80 rounded border border-sky-blue/20"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Links */}
                  <div className="flex gap-4 pt-4">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-muted-blue hover:text-aurora transition-colors duration-300 flex items-center gap-2"
                      >
                        <span>GitHub</span>
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                          />
                        </svg>
                      </a>
                    )}
                    {project.demo && (
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-muted-blue hover:text-aurora transition-colors duration-300 flex items-center gap-2"
                      >
                        <span>Live Demo</span>
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                          />
                        </svg>
                      </a>
                    )}
                  </div>
                </div>

                {/* Corner accent */}
                <div className="absolute bottom-0 right-0 w-8 h-8 border-r-2 border-b-2 border-aurora/30 group-hover:border-aurora/60 transition-colors duration-300" />
              </div>
            ))}
          </div>

          {/* Empty state / Add projects prompt */}
          {projects.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-blue italic">
                Projects will be added here as I continue building and learning.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
