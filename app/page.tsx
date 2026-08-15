'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Portfolio() {
  const [currentSection, setCurrentSection] = useState('about');
  const cursorRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // Magnetic Cursor Effect
    const handleMouseMove = (e: MouseEvent) => {
      if (cursorRef.current) {
        gsap.to(cursorRef.current, {
          x: e.clientX,
          y: e.clientY,
          duration: 0.1,
          ease: 'power2.out'
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    // About Me Scrollytelling
    gsap.from('.about-text', {
      y: 100,
      opacity: 0,
      duration: 1.2,
      stagger: 0.3,
      scrollTrigger: {
        trigger: '.about-section',
        start: 'top 80%',
        toggleActions: 'play none none reverse'
      }
    });

    // Skills Stagger Animation
    gsap.from('.skill-item', {
      x: -100,
      opacity: 0,
      duration: 0.8,
      stagger: 0.2,
      scrollTrigger: {
        trigger: '.skills-section',
        start: 'top 70%',
        toggleActions: 'play none none reverse'
      }
    });

    // Hobbies Reveal
    gsap.from('.hobby-item', {
      scale: 0.8,
      opacity: 0,
      duration: 0.6,
      stagger: 0.15,
      scrollTrigger: {
        trigger: '.hobbies-section',
        start: 'top 60%',
        toggleActions: 'play none none reverse'
      }
    });

    // Social Links Animation
    gsap.from('.social-item', {
      y: 50,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
      scrollTrigger: {
        trigger: '.social-section',
        start: 'top 70%',
        toggleActions: 'play none none reverse'
      }
    });

    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleNavClick = (section: string) => {
    setCurrentSection(section);
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative bg-black text-white overflow-hidden">
      {/* Magnetic Cursor */}
      <div
        ref={cursorRef}
        className="fixed w-8 h-8 border-2 border-purple-500 rounded-full pointer-events-none z-50 mix-blend-difference transition-transform duration-100"
        style={{ transform: 'translate(-50%, -50%)' }}
      />

      {/* Snow Effect Background */}
      <div className="snow-container fixed inset-0 pointer-events-none z-40 opacity-30">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="snowflake absolute w-1 h-1 bg-white rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              animation: `snowfall ${3 + Math.random() * 4}s linear infinite`,
              animationDelay: `${Math.random() * 5}s`
            }}
          />
        ))}
      </div>

      {/* Aurora Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-green-500 rounded-full blur-3xl opacity-20 animate-pulse" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-purple-500 rounded-full blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-pink-500 rounded-full blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      {/* Magnetic Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-30 p-6 flex justify-between items-center backdrop-blur-md bg-black/30">
        <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
          NV
        </div>
        <div className="flex gap-8">
          {['about', 'skills', 'hobbies', 'social'].map((item) => (
            <button
              key={item}
              onClick={() => handleNavClick(item)}
              className={`text-sm uppercase tracking-wider transition-colors ${
                currentSection === item ? 'text-purple-400' : 'text-gray-400 hover:text-white'
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center relative z-10 px-8">
        <div className="text-center max-w-4xl">
          <div className="mb-8">
            <img
              src="/avatar.jpg"
              alt="Nguyễn Voi"
              className="w-32 h-32 rounded-full mx-auto object-cover border-4 border-purple-500/30 shadow-2xl"
            />
          </div>
          <h1 className="text-6xl md:text-8xl font-bold mb-4">
            Nguyễn Voi
          </h1>
          <p className="text-2xl md:text-3xl text-purple-400 mb-6">
            Developer & Guitarist
          </p>
          <p className="text-xl text-gray-400 mb-8">
            Where Logic Meets Melody
          </p>
          <button
            onClick={() => handleNavClick('about')}
            className="px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full font-semibold hover:opacity-90 transition-opacity"
          >
            Explore More
          </button>
        </div>
      </section>

      {/* About Me Section */}
      <section id="about" className="about-section min-h-screen py-20 relative z-10 px-8">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-5xl font-bold mb-16 text-center">
            About <span className="text-purple-400">Me</span>
          </h2>

          <div className="space-y-8">
            <p className="about-text text-xl text-gray-300 leading-relaxed">
              Currently a FPT Polytechnic student in Information Technology (2024-2027),
              navigating the crossroads between music and programming.
            </p>

            <p className="about-text text-xl text-gray-300 leading-relaxed">
              When I'm not coding, you'll find me playing electric guitar (6+ months and counting),
              watching anime, enjoying late-night cycling on quiet roads, or diving into Light Novels—especially Sword Art Online.
            </p>

            <p className="about-text text-xl text-gray-300 leading-relaxed">
              Building digital experiences by day, exploring rhythm by night.
            </p>

            <div className="about-text mt-12 p-6 bg-gray-900/50 rounded-2xl border border-purple-500/20">
              <h3 className="text-2xl font-bold mb-4 text-purple-400">Education</h3>
              <div className="text-gray-300">
                <p className="font-semibold text-white">FPT Polytechnic</p>
                <p>Công Nghệ Thông Tin | 2024-2027</p>
                <p className="text-sm text-gray-500 mt-2">Current Status: Student</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="skills-section min-h-screen py-20 relative z-10 px-8 bg-gradient-to-b from-black to-gray-900">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-5xl font-bold mb-16 text-center">
            Skills & <span className="text-purple-400">Expertise</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { category: 'Technical', items: ['React/Next.js', 'TypeScript', 'CSS/Tailwind', 'Database'] },
              { category: 'Music', items: ['Electric Guitar', 'Music Theory'] },
              { category: 'Languages', items: ['IELTS: Current 5.0 | Goal 7.0', 'Vietnamese (Native)'] },
              { category: 'Soft Skills', items: ['Problem-solving', 'Communication'] },
            ].map((skillGroup, groupIndex) => (
              <div key={groupIndex} className="skill-item p-6 bg-gray-900/50 rounded-2xl border border-purple-500/20">
                <h3 className="text-xl font-bold mb-4 text-purple-400">{skillGroup.category}</h3>
                <div className="space-y-2">
                  {skillGroup.items.map((item, itemIndex) => (
                    <div key={itemIndex} className="text-gray-300">{item}</div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Hobbies Section */}
      <section id="hobbies" className="hobbies-section min-h-screen py-20 relative z-10 px-8">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-5xl font-bold mb-16 text-center">
            Hobbies & <span className="text-purple-400">Interests</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: 'Guitar',
                description: '6+ month journey on electric guitar',
                icon: '🎸'
              },
              {
                title: 'Anime',
                description: 'Sword Art Online superfan',
                icon: '⚔️'
              },
              {
                title: 'Night Cycling',
                description: 'Late-night rides and quiet roads',
                icon: '🚲'
              },
              {
                title: 'Light Novels',
                description: 'Sword Art Online favorite',
                icon: '📖'
              }
            ].map((hobby, index) => (
              <div key={index} className="hobby-item p-8 bg-gray-900/50 rounded-2xl border border-purple-500/20 hover:border-purple-500/50 transition-all">
                <div className="text-4xl mb-4">{hobby.icon}</div>
                <h3 className="text-2xl font-bold mb-3 text-white">{hobby.title}</h3>
                <p className="text-gray-400">{hobby.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Section */}
      <section id="social" className="social-section min-h-screen py-20 relative z-10 px-8 bg-gradient-to-b from-gray-900 to-black">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-5xl font-bold mb-16 text-center">
            Get In <span className="text-purple-400">Touch</span>
          </h2>

          <div className="space-y-4">
            {[
              { platform: 'Discord', handle: 'nguyen_voi', color: 'from-indigo-500 to-purple-500' },
              { platform: 'Gmail', handle: 'phinath08326@gmail.com', color: 'from-red-500 to-orange-500' },
              { platform: 'Facebook', handle: 'nguyenvoii', url: 'https://www.facebook.com/nguyenvoii', color: 'from-blue-500 to-cyan-500' }
            ].map((social, index) => (
              <a
                key={index}
                href={social.url || '#'}
                className="social-item block p-6 bg-gray-900/50 rounded-2xl border border-purple-500/20 hover:border-purple-500/50 transition-all group"
                target={social.url ? '_blank' : '_self'}
                rel={social.url ? 'noopener noreferrer' : undefined}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-purple-400 font-semibold">{social.platform}</p>
                    <p className="text-xl text-white mt-1">{social.handle}</p>
                  </div>
                  <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${social.color} opacity-70 group-hover:opacity-100 transition-opacity`} />
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-8 text-center text-gray-500">
        <p>&copy; 2025 Nguyễn Voi. Built with Next.js, GSAP & creativity.</p>
      </footer>

      <style jsx>{`
        @keyframes snowfall {
          0% {
            transform: translateY(-10px) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0.3;
          }
        }

        .snowflake {
          animation: snowfall linear infinite;
        }
      `}</style>
    </div>
  );
}