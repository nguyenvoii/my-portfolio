import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { personalInfo } from '../data/content';

export const AboutSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const bioRef = useRef<HTMLDivElement>(null);
  const educationRef = useRef<HTMLDivElement>(null);

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

    if (contentRef.current) {
      tl.from(
        contentRef.current.children,
        {
          y: 30,
          opacity: 0,
          stagger: 0.15,
          duration: 0.6,
          ease: 'power2.out',
        },
        '-=0.3'
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section
      id="section-about"
      ref={sectionRef}
      className="container-section relative"
    >
      <div className="container-content">
        <div className="max-w-4xl mx-auto">
          {/* Section title */}
          <h2
            ref={titleRef}
            className="text-6xl md:text-7xl font-display font-bold text-gradient mb-16"
          >
            ABOUT
          </h2>

          <div ref={contentRef} className="space-y-12">
            {/* Bio */}
            <div ref={bioRef} className="glass-panel p-8 md:p-12">
              <h3 className="text-2xl font-display font-semibold text-soft-white mb-6">
                Hello, I'm {personalInfo.name}
              </h3>
              <div className="space-y-4 text-body-large text-muted-blue leading-relaxed">
                {personalInfo.bio.split('\n\n').map((paragraph, index) => (
                  <p key={index} className="text-soft-white/90">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>

            {/* Education */}
            <div ref={educationRef} className="glass-panel p-8 md:p-12">
              <h3 className="text-xl font-display font-semibold text-sky-blue mb-6">
                Education
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-2 h-2 mt-2 bg-aurora rounded-full flex-shrink-0 aurora-glow" />
                  <div>
                    <h4 className="text-lg font-medium text-soft-white">
                      {personalInfo.education.field}
                    </h4>
                    <p className="text-muted-blue mt-1">
                      {personalInfo.education.institution}
                    </p>
                    <p className="text-muted-blue/70 text-sm mt-2">
                      {personalInfo.education.period} • {personalInfo.education.status}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Identity statement */}
            <div className="glass-panel p-8 md:p-12 border-l-4 border-l-aurora">
              <blockquote className="text-xl md:text-2xl font-display text-soft-white/80 italic">
                "Stay cool."
              </blockquote>
              <p className="mt-6 text-muted-blue">— Nguyễn Voi</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
