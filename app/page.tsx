'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Portfolio() {
  const heroRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Hero animations - multiple scroll triggers
    const heroCtx = gsap.context(() => {
      // Initial load animations
      gsap.from('.hero-title', {
        y: 100,
        opacity: 0,
        duration: 1.5,
        ease: 'power4.out'
      });

      gsap.from('.hero-subtitle', {
        y: 50,
        opacity: 0,
        duration: 1.2,
        delay: 0.3,
        ease: 'power3.out'
      });

      // Parallax background on scroll
      gsap.to('.hero-bg', {
        yPercent: 50,
        ease: 'none',
        scrollTrigger: {
          trigger: '.hero-section',
          start: 'top top',
          end: 'bottom top',
          scrub: true
        }
      });

      // Text morphing effect
      gsap.to('.hero-morph', {
        scale: 1.5,
        rotation: 360,
        borderRadius: '50%',
        scrollTrigger: {
          trigger: '.hero-section',
          start: 'top top',
          end: 'bottom top',
          scrub: 1
        }
      });
    }, heroRef);

    // Skills section animations
    const skillsCtx = gsap.context(() => {
      // Staggered card reveals
      gsap.from('.skill-card', {
        y: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        scrollTrigger: {
          trigger: '.skills-section',
          start: 'top 80%',
          end: 'top 20%',
          toggleActions: 'play none none reverse'
        }
      });

      // Animated progress bars
      gsap.from('.skill-progress', {
        width: 0,
        duration: 1.5,
        stagger: 0.1,
        scrollTrigger: {
          trigger: '.skills-section',
          start: 'top 60%',
          end: 'top 20%',
          scrub: 1
        }
      });

      // Horizontal scroll for skills
      const skillsSection = document.querySelector('.skills-section') as HTMLElement;
      const skillsCards = gsap.utils.toArray('.skill-card');
      if (skillsSection && skillsCards.length > 0) {
        gsap.to(skillsCards, {
          xPercent: -100 * (skillsCards.length - 1),
          ease: 'none',
          scrollTrigger: {
            trigger: skillsSection,
            pin: true,
            scrub: 1,
            end: () => `+=${skillsSection.offsetWidth}`
          }
        });
      }
    }, skillsRef);

    // Projects parallax gallery
    const projectsCtx = gsap.context(() => {
      gsap.from('.project-card', {
        y: 150,
        opacity: 0,
        duration: 1,
        stagger: 0.3,
        scrollTrigger: {
          trigger: '.projects-section',
          start: 'top 70%',
          end: 'top 20%',
          toggleActions: 'play none none reverse'
        }
      });

      // Parallax effect on project images
      gsap.utils.toArray<Element>('.project-image').forEach((img) => {
        gsap.to(img, {
          yPercent: -30,
          ease: 'none',
          scrollTrigger: {
            trigger: img,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true
          }
        });
      });

      // Hover-like effect on scroll
      gsap.utils.toArray<Element>('.project-card').forEach((card) => {
        gsap.to(card, {
          scale: 1.05,
          boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
          scrollTrigger: {
            trigger: card,
            start: 'top 80%',
            end: 'top 20%',
            scrub: 1
          }
        });
      });
    }, projectsRef);

    // Contact micro-animations
    const contactCtx = gsap.context(() => {
      // Form reveal
      gsap.from('.contact-form', {
        x: -100,
        opacity: 0,
        duration: 1,
        scrollTrigger: {
          trigger: '.contact-section',
          start: 'top 70%',
          toggleActions: 'play none none reverse'
        }
      });

      // Input animations on scroll
      gsap.from('.form-group', {
        x: -50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        scrollTrigger: {
          trigger: '.contact-section',
          start: 'top 60%',
          toggleActions: 'play none none reverse'
        }
      });

      // Button pulse effect
      gsap.to('.submit-btn', {
        scale: 1.1,
        boxShadow: '0 0 30px rgba(99, 102, 241, 0.5)',
        repeat: -1,
        yoyo: true,
        duration: 0.8,
        scrollTrigger: {
          trigger: '.submit-btn',
          start: 'top 90%',
          toggleActions: 'play pause pause pause'
        }
      });
    }, contactRef);

    // Cleanup
    return () => {
      heroCtx.revert();
      skillsCtx.revert();
      projectsCtx.revert();
      contactCtx.revert();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div className="relative">
      {/* Hero Section - Multiple scroll triggers */}
      <section ref={heroRef} className="hero-section min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900">
        <div className="hero-bg absolute inset-0 opacity-20">
          <div className="hero-morph absolute w-96 h-96 bg-purple-500 rounded-full blur-3xl top-20 left-20" />
          <div className="hero-morph absolute w-80 h-80 bg-blue-500 rounded-full blur-3xl bottom-20 right-20" />
        </div>

        <div className="relative z-10 text-center px-8 max-w-4xl">
          <h1 className="hero-title text-6xl md:text-8xl font-bold text-white mb-6">
            Developer
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
              Portfolio
            </span>
          </h1>
          <p className="hero-subtitle text-xl md:text-2xl text-gray-300 mb-8">
            Creating experiences that matter
          </p>
          <div className="flex gap-4 justify-center">
            <a href="#skills" className="px-8 py-3 bg-white text-gray-900 rounded-full font-semibold hover:bg-opacity-90 transition-all">
              Explore Skills
            </a>
            <a href="#projects" className="px-8 py-3 border-2 border-white text-white rounded-full font-semibold hover:bg-white hover:text-gray-900 transition-all">
              View Projects
            </a>
          </div>
        </div>
      </section>

      {/* Skills Section - Horizontal scroll + Animated grid */}
      <section ref={skillsRef} className="skills-section min-h-screen bg-black py-20 overflow-hidden">
        <div className="container mx-auto px-8">
          <h2 className="text-5xl font-bold text-white mb-16 text-center">
            Technical <span className="text-purple-400">Skills</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: 'React/Next.js', level: 90, color: 'from-cyan-400 to-blue-500' },
              { name: 'TypeScript', level: 85, color: 'from-blue-400 to-indigo-500' },
              { name: 'Node.js', level: 80, color: 'from-green-400 to-emerald-500' },
              { name: 'CSS/Tailwind', level: 88, color: 'from-pink-400 to-rose-500' },
              { name: 'Python', level: 75, color: 'from-yellow-400 to-orange-500' },
              { name: 'Database', level: 82, color: 'from-purple-400 to-violet-500' },
            ].map((skill, index) => (
              <div key={index} className="skill-card bg-gray-900 p-8 rounded-2xl border border-purple-500/20">
                <h3 className="text-2xl font-bold text-white mb-4">{skill.name}</h3>
                <div className="h-4 bg-gray-800 rounded-full overflow-hidden">
                  <div
                    className={`skill-progress h-full bg-gradient-to-r ${skill.color} rounded-full`}
                    style={{ width: `${skill.level}%` }}
                  />
                </div>
                <p className="text-gray-400 mt-4">{skill.level}% proficiency</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Gallery - Parallax heavy */}
      <section ref={projectsRef} className="projects-section min-h-screen bg-gradient-to-b from-gray-900 to-black py-20">
        <div className="container mx-auto px-8">
          <h2 className="text-5xl font-bold text-white mb-16 text-center">
            Featured <span className="text-purple-400">Projects</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {[
              { title: 'Project One', desc: 'Full-stack application with modern tech stack', img: 'from-purple-500 to-pink-500' },
              { title: 'Project Two', desc: 'Interactive web experience with animations', img: 'from-blue-500 to-cyan-500' },
              { title: 'Project Three', desc: 'E-commerce platform with real-time features', img: 'from-green-500 to-teal-500' },
              { title: 'Project Four', desc: 'Data visualization dashboard', img: 'from-orange-500 to-red-500' },
            ].map((project, index) => (
              <div key={index} className="project-card bg-gray-900 rounded-3xl overflow-hidden border border-purple-500/20">
                <div className={`project-image h-48 bg-gradient-to-br ${project.img} flex items-center justify-center`}>
                  <span className="text-white text-2xl font-bold">Demo</span>
                </div>
                <div className="p-8">
                  <h3 className="text-3xl font-bold text-white mb-4">{project.title}</h3>
                  <p className="text-gray-400 mb-6">{project.desc}</p>
                  <button className="px-6 py-2 bg-purple-500 text-white rounded-full hover:bg-purple-600 transition-colors">
                    Learn More
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section - Micro-animations */}
      <section ref={contactRef} className="contact-section min-h-screen bg-black py-20 flex items-center">
        <div className="container mx-auto px-8 max-w-2xl">
          <h2 className="text-5xl font-bold text-white mb-4 text-center">
            Get In <span className="text-purple-400">Touch</span>
          </h2>
          <p className="text-gray-400 text-center mb-12">
            Let's create something amazing together
          </p>

          <form className="contact-form space-y-6">
            <div className="form-group">
              <label className="block text-gray-300 mb-2">Name</label>
              <input
                type="text"
                className="w-full px-4 py-3 bg-gray-900 border border-purple-500/30 rounded-lg text-white focus:outline-none focus:border-purple-500 transition-colors"
                placeholder="Your name"
              />
            </div>

            <div className="form-group">
              <label className="block text-gray-300 mb-2">Email</label>
              <input
                type="email"
                className="w-full px-4 py-3 bg-gray-900 border border-purple-500/30 rounded-lg text-white focus:outline-none focus:border-purple-500 transition-colors"
                placeholder="your@email.com"
              />
            </div>

            <div className="form-group">
              <label className="block text-gray-300 mb-2">Message</label>
              <textarea
                rows={5}
                className="w-full px-4 py-3 bg-gray-900 border border-purple-500/30 rounded-lg text-white focus:outline-none focus:border-purple-500 transition-colors resize-none"
                placeholder="Your message..."
              />
            </div>

            <button
              type="submit"
              className="submit-btn w-full py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-lg hover:opacity-90 transition-opacity"
            >
              Send Message
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}