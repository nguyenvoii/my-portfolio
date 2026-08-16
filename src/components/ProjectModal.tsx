import { useState, useEffect } from 'react';

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: {
    title: string;
    description: string;
    technologies: string[];
    image?: string;
  };
}

export const ProjectModal = ({ isOpen, onClose, project }: ProjectModalProps) => {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const images = [
    '/projects/dashboard.png',
    '/projects/room-list.png',
    '/projects/booking-form.png',
    '/projects/customer-list.png',
    '/projects/room-detail.png',
    '/projects/khachvanglai.png',
    '/projects/nhatkyhethong.png',
    '/projects/quanlynhanvien.png',
    '/projects/voucher.png',
  ];

  const nextImage = () => setCurrentImage((prev) => (prev + 1) % images.length);
  const prevImage = () => setCurrentImage((prev) => (prev - 1 + images.length) % images.length);

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Aurora backdrop */}
      <div className="absolute inset-0 bg-midnight/90 backdrop-blur-sm">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-aurora/20 rounded-full blur-3xl animate-pulse-soft" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-sky-blue/20 rounded-full blur-3xl animate-pulse-soft" style={{ animationDelay: '1s' }} />
        </div>
      </div>

      {/* Modal Content */}
      <div
        className="relative w-full max-w-5xl max-h-[90vh] overflow-hidden glass-panel rounded-2xl border border-aurora/30 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-aurora/20 border border-aurora/40 flex items-center justify-center hover:bg-aurora/30 transition-all duration-300 group"
        >
          <svg className="w-5 h-5 text-aurora group-hover:rotate-90 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="flex flex-col lg:flex-row h-full">
          {/* Image Gallery - Left Side */}
          <div className="lg:w-1/2 relative bg-midnight/50">
            <div className="relative aspect-square lg:aspect-auto lg:h-full">
              <img
                src={images[currentImage]}
                alt={`${project.title} - Screenshot ${currentImage + 1}`}
                className="w-full h-full object-cover"
              />

              {/* Gallery Controls */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between gap-2">
                <button
                  onClick={prevImage}
                  className="w-10 h-10 rounded-full bg-aurora/20 backdrop-blur-sm border border-aurora/40 flex items-center justify-center hover:bg-aurora/30 transition-all duration-300"
                >
                  <svg className="w-5 h-5 text-aurora" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>

                <div className="flex gap-1">
                  {images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImage(index)}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        index === currentImage ? 'bg-aurora w-6' : 'bg-white/30'
                      }`}
                    />
                  ))}
                </div>

                <button
                  onClick={nextImage}
                  className="w-10 h-10 rounded-full bg-aurora/20 backdrop-blur-sm border border-aurora/40 flex items-center justify-center hover:bg-aurora/30 transition-all duration-300"
                >
                  <svg className="w-5 h-5 text-aurora" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>

              {/* Image Counter */}
              <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-aurora/20 backdrop-blur-sm border border-aurora/40">
                <span className="text-xs font-semibold text-aurora">
                  {currentImage + 1} / {images.length}
                </span>
              </div>
            </div>
          </div>

          {/* Project Details - Right Side */}
          <div className="lg:w-1/2 p-8 lg:p-12 overflow-y-auto max-h-[90vh] lg:max-h-full">
            <div className="space-y-8">
              {/* Header */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-aurora/20 border border-aurora/40 flex items-center justify-center">
                    <span className="text-2xl">🏨</span>
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-gradient">{project.title}</h2>
                    <p className="text-sm text-sky-blue mt-1">Graduation Project • FPT College</p>
                  </div>
                </div>

                <p className="text-gray-300 leading-relaxed text-base">
                  {project.description}
                </p>
              </div>

              {/* Project Stats */}
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-4 rounded-lg bg-midnight/50 border border-aurora/20">
                  <div className="text-2xl font-bold text-aurora">66</div>
                  <div className="text-xs text-gray-400 mt-1">Java Files</div>
                </div>
                <div className="text-center p-4 rounded-lg bg-midnight/50 border border-sky-blue/20">
                  <div className="text-2xl font-bold text-sky-blue">8</div>
                  <div className="text-xs text-gray-400 mt-1">Database Tables</div>
                </div>
                <div className="text-center p-4 rounded-lg bg-midnight/50 border border-purple-400/20">
                  <div className="text-2xl font-bold text-purple-400">15+</div>
                  <div className="text-xs text-gray-400 mt-1">Features</div>
                </div>
              </div>

              {/* Technologies */}
              <div>
                <h3 className="text-lg font-semibold text-soft-white mb-4 flex items-center gap-2">
                  <div className="w-2 h-2 bg-aurora rounded-full animate-pulse" />
                  Technologies
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 bg-aurora/10 border border-aurora/30 rounded-lg text-sm font-medium text-soft-white hover:bg-aurora/20 transition-colors"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Key Features */}
              <div>
                <h3 className="text-lg font-semibold text-soft-white mb-4 flex items-center gap-2">
                  <div className="w-2 h-2 bg-sky-blue rounded-full animate-pulse" />
                  Key Features
                </h3>
                <div className="space-y-3">
                  {[
                    'Online booking system with room type selection',
                    'Real-time room status tracking',
                    'Customer & employee management',
                    'Complete billing & invoicing system',
                    'Revenue reports & KPI dashboard',
                    'Voucher & discount system',
                    'Role-based authentication',
                    'System activity logs'
                  ].map((feature, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-aurora/20 border border-aurora/40 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <svg className="w-3 h-3 text-aurora" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span className="text-gray-300 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Database Architecture */}
              <div>
                <h3 className="text-lg font-semibold text-soft-white mb-4 flex items-center gap-2">
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" />
                  Database Architecture
                </h3>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {['Users', 'Customers', 'Rooms', 'Bookings', 'Services', 'Bills', 'Employees', 'Vouchers'].map((table, index) => (
                    <div key={index} className="px-3 py-2 bg-midnight/50 border border-purple-400/20 rounded text-center text-gray-300">
                      {table}
                    </div>
                  ))}
                </div>
              </div>

              {/* Project Links */}
              <div className="flex gap-4 pt-4">
                <a
                  href="https://github.com/nguyenvoii/hotel-management-system"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 px-6 py-3 bg-aurora/20 border-2 border-aurora/40 rounded-xl hover:bg-aurora/30 hover:border-aurora/60 transition-all duration-300 text-center group"
                >
                  <div className="flex items-center justify-center gap-3">
                    <svg className="w-5 h-5 text-aurora group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                    <span className="text-aurora font-semibold">View Code</span>
                  </div>
                </a>

                <button
                  onClick={onClose}
                  className="px-6 py-3 bg-midnight/50 border border-gray-600 rounded-xl hover:border-aurora/40 transition-all duration-300"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};