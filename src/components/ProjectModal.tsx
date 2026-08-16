import { useState, useEffect } from 'react';
import { Project } from '../types';

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: Project;
}

const CLOSE_ANIMATION_MS = 200;

export const ProjectModal = ({ isOpen, onClose, project }: ProjectModalProps) => {
  const [currentImage, setCurrentImage] = useState(0);
  const [shouldRender, setShouldRender] = useState(isOpen);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      setIsClosing(false);
      document.body.style.overflow = 'hidden';
      return;
    }

    if (!shouldRender) return;

    setIsClosing(true);
    document.body.style.overflow = 'unset';
    const timer = setTimeout(() => {
      setShouldRender(false);
      setIsClosing(false);
    }, CLOSE_ANIMATION_MS);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  useEffect(() => () => {
    document.body.style.overflow = 'unset';
  }, []);

  if (!shouldRender) return null;

  const imageNames = project.gallery && project.gallery.length > 0
    ? project.gallery
    : project.image
      ? [project.image.replace(/^projects\//, '')]
      : [];

  return (
    <div
      className={`fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-8 ${
        isClosing ? 'animate-modal-backdrop-out' : 'animate-modal-backdrop-in'
      }`}
      onClick={onClose}
    >
      <div className="absolute inset-0 backdrop-blur-md bg-midnight/70" />

      <div
        className={`relative w-full max-w-7xl h-[90vh] overflow-hidden glass-panel rounded-2xl border-2 border-aurora/50 shadow-2xl ${
          isClosing ? 'animate-modal-panel-out' : 'animate-modal-panel-in'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-12 h-12 rounded-full bg-aurora/30 backdrop-blur-sm border-2 border-aurora/60 flex items-center justify-center hover:bg-aurora/40 hover:scale-110 transition-all duration-300"
        >
          <svg className="w-6 h-6 text-aurora" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="flex flex-col lg:flex-row h-full min-h-0">
          <div className="lg:w-2/5 p-8 bg-midnight/30 overflow-y-auto min-h-0">
            <div className="space-y-6">
              <div className="glass-panel p-6 border border-aurora/40">
                <div className="aspect-[16/9] mb-6 bg-midnight/50 rounded-lg overflow-hidden">
                  <img
                    src={`${import.meta.env.BASE_URL}${project.image}`}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                <h3 className="text-2xl font-bold text-gradient mb-3">{project.title}</h3>

                <p className="text-gray-300 text-sm leading-relaxed mb-5">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, index) => (
                    <span key={index} className="px-3 py-1.5 bg-aurora/20 border border-aurora/50 rounded-lg text-sm text-aurora">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2">
                {imageNames.map((name, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImage(index)}
                    className={`aspect-[16/9] rounded-lg overflow-hidden border-2 transition-all hover:scale-105 ${
                      currentImage === index ? 'border-aurora shadow-lg shadow-aurora/40' : 'border-transparent'
                    }`}
                  >
                    <img
                      src={`${import.meta.env.BASE_URL}projects/${name}`}
                      alt={`Gallery ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:w-3/5 p-8 overflow-y-auto min-h-0">
            <div className="space-y-8">
              <div className="relative aspect-[16/9] bg-midnight/50 rounded-xl overflow-hidden border-2 border-aurora/40">
                <img
                  src={`${import.meta.env.BASE_URL}projects/${imageNames[currentImage]}`}
                  alt="Project screenshot"
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />

                {imageNames.length > 0 && (
                  <div className="absolute top-4 left-4 px-5 py-2.5 rounded-full bg-aurora/30 backdrop-blur-sm border-2 border-aurora/60">
                    <span className="text-sm font-bold text-aurora">
                      {currentImage + 1} / {imageNames.length}
                    </span>
                  </div>
                )}
              </div>

              <div>
                <h2 className="text-4xl font-bold text-gradient mb-6">{project.title}</h2>

                {project.stats && project.stats.length > 0 && (
                  <div className="grid grid-cols-3 gap-5 mb-8">
                    {project.stats.map((stat, index) => (
                      <div
                        key={index}
                        className={`text-center p-6 rounded-xl bg-midnight/50 border-2 ${
                          ['border-aurora/40', 'border-sky-blue/40', 'border-purple-400/40'][index % 3]
                        }`}
                      >
                        <div
                          className={`text-4xl font-bold ${
                            ['text-aurora', 'text-sky-blue', 'text-purple-400'][index % 3]
                          }`}
                        >
                          {stat.value}
                        </div>
                        <div className="text-sm text-gray-400 mt-2">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                )}

                {project.features && project.features.length > 0 && (
                  <div className="mb-8">
                    <h3 className="text-xl font-semibold text-soft-white mb-4 flex items-center gap-2">
                      <div className="w-2 h-2 bg-aurora rounded-full animate-pulse" />
                      Key Features
                    </h3>
                    <div className="space-y-3">
                      {project.features.map((feature, index) => (
                        <div key={index} className="flex items-start gap-3">
                          <div className="w-6 h-6 rounded-full bg-aurora/30 border-2 border-aurora/60 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <svg className="w-3.5 h-3.5 text-aurora" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </div>
                          <span className="text-gray-300 text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {project.dbTables && project.dbTables.length > 0 && (
                  <div>
                    <h3 className="text-xl font-semibold text-soft-white mb-4 flex items-center gap-2">
                      <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" />
                      Database Architecture
                    </h3>
                    <div className="grid grid-cols-4 gap-3">
                      {project.dbTables.map((table, index) => (
                        <div key={index} className="px-4 py-3 bg-midnight/50 border-2 border-purple-400/40 rounded-lg text-center">
                          <span className="text-sm text-gray-300 font-medium">{table}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};