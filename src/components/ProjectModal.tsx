import { useState, useEffect } from 'react';
import { Project } from '../types';

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: Project;
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
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-8"
      onClick={onClose}
    >
      {/* Aurora backdrop */}
      <div className="absolute inset-0 bg-midnight/95 backdrop-blur-md">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-aurora/20 rounded-full blur-3xl animate-pulse-soft" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-sky-blue/20 rounded-full blur-3xl animate-pulse-soft" style={{ animationDelay: '1s' }} />
        </div>
      </div>

      {/* Modal Content */}
      <div
        className="relative w-full max-w-7xl max-h-[90vh] overflow-hidden glass-panel rounded-2xl border border-aurora/30 shadow-2xl"
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
          {/* Left Side - Project Card */}
          <div className="lg:w-2/5 p-6 md:p-8 bg-midnight/30">
            <div className="space-y-6">
              {/* Project Card */}
              <div className="glass-panel p-6 border border-aurora/20">
                {/* Project Image */}
                <div className="aspect-video mb-6 bg-midnight/50 rounded-lg overflow-hidden">
                  <img
                    src={project.image || '/projects/dashboard.png'}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Project Title & Status */}
                <div className="mb-4">
                  <h3 className="text-2xl font-bold text-gradient mb-2">{project.title}</h3>
                  <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                    project.status === 'completed' ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' :
                    project.status === 'in-progress' ? 'bg-amber-500/20 text-amber-400 border-amber-500/30' :
                    'bg-sky-blue/20 text-sky-blue border-sky-blue/30'
                  }`}>
                    {project.status.toUpperCase()}
                  </span>
                </div>

                {/* Description */}
                <p className="text-gray-300 text-sm leading-relaxed mb-4">
                  {project.description}
                </p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-aurora/10 border border-aurora/30 rounded-full text-xs text-soft-white"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Mini Gallery */}
              <div>
                <h4 className="text-sm font-semibold text-soft-white mb-3">Project Gallery</h4>
                <div className="grid grid-cols-3 gap-2">
                  {images.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImage(index)}
                      className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                        currentImage === index ? 'border-aurora' : 'border-transparent hover:border-aurora/50'
                      }`}
                    >
                      <img src={img} alt={`Gallery ${index + 1}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Detailed Description */}
          <div className="lg:w-3/5 p-6 md:p-8 overflow-y-auto max-h-[90vh]">
            <div className="space-y-8">
              {/* Large Image Viewer */}
              <div className="relative aspect-video bg-midnight/50 rounded-xl overflow-hidden border border-aurora/20">
                <img
                  src={images[currentImage]}
                  alt={`${project.title} - Screenshot ${currentImage + 1}`}
                  className="w-full h-full object-cover"
                />

                {/* Gallery Controls Overlay */}
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                  <button
                    onClick={prevImage}
                    className="w-10 h-10 rounded-full bg-aurora/20 backdrop-blur-sm border border-aurora/40 flex items-center justify-center hover:bg-aurora/30 transition-all duration-300"
                  >
                    <svg className="w-5 h-5 text-aurora" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>

                  <div className="px-4 py-2 rounded-full bg-aurora/20 backdrop-blur-sm border border-aurora/40">
                    <span className="text-sm font-semibold text-aurora">
                      {currentImage + 1} / {images.length}
                    </span>
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
              </div>

              {/* Detailed Information */}
              <div>
                <h2 className="text-3xl font-bold text-gradient mb-4">{project.title}</h2>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 mb-8">
                  <div className="text-center p-4 rounded-lg bg-midnight/50 border border-aurora/20">
                    <div className="text-2xl font-bold text-aurora">66</div>
                    <div className="text-xs text-gray-400 mt-1">Java Files</div>
                  </div>
                  <div className="text-center p-4 rounded-lg bg-midnight/50 border border-sky-blue/20">
                    <div className="text-2xl font-bold text-sky-blue">8</div>
                    <div className="text-xs text-gray-400 mt-1">DB Tables</div>
                  </div>
                  <div className="text-center p-4 rounded-lg bg-midnight/50 border border-purple-400/20">
                    <div className="text-2xl font-bold text-purple-400">15+</div>
                    <div className="text-xs text-gray-400 mt-1">Features</div>
                  </div>
                </div>

                {/* Key Features */}
                <div className="mb-8">
                  <h3 className="text-xl font-semibold text-soft-white mb-4 flex items-center gap-2">
                    <div className="w-2 h-2 bg-aurora rounded-full animate-pulse" />
                    Key Features
                  </h3>
                  <div className="space-y-3">
                    {[
                      'Online booking system with room type selection',
                      'Real-time room status tracking and management',
                      'Customer & employee management system',
                      'Complete billing & invoicing workflow',
                      'Revenue reports & KPI dashboard analytics',
                      'Voucher & discount code system',
                      'Role-based authentication (Admin, Staff)',
                      'System activity logs and audit trail'
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
                <div className="mb-8">
                  <h3 className="text-xl font-semibold text-soft-white mb-4 flex items-center gap-2">
                    <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" />
                    Database Architecture
                  </h3>
                  <div className="grid grid-cols-4 gap-2">
                    {['Users', 'Customers', 'Rooms', 'Bookings', 'Services', 'Bills', 'Employees', 'Vouchers'].map((table, index) => (
                      <div key={index} className="px-3 py-2 bg-midnight/50 border border-purple-400/20 rounded text-center">
                        <span className="text-xs text-gray-300">{table}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Project Links */}
                <div className="flex gap-4">
                  {project.github && (
                    <a
                      href={project.github}
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
                  )}

                  {project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 px-6 py-3 bg-sky-blue/20 border-2 border-sky-blue/40 rounded-xl hover:bg-sky-blue/30 hover:border-sky-blue/60 transition-all duration-300 text-center group"
                    >
                      <div className="flex items-center justify-center gap-3">
                        <svg className="w-5 h-5 text-sky-blue group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                        <span className="text-sky-blue font-semibold">Live Demo</span>
                      </div>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};