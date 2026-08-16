import { useState, useEffect } from 'react';
import { Project } from '../types';

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: Project;
}

export const ProjectModal = ({ isOpen, onClose, project }: ProjectModalProps) => {
  const [currentImage, setCurrentImage] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true);
      document.body.style.overflow = 'hidden';
    } else {
      setIsAnimating(false);
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen && !isAnimating) return null;

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
      className={`fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-8 transition-all duration-300 ${
        isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
      onClick={onClose}
    >
      {/* Backdrop - blur only, not blocking */}
      <div className="absolute inset-0 backdrop-blur-sm bg-midnight/60">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-aurora/15 rounded-full blur-3xl animate-pulse-soft" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-sky-blue/15 rounded-full blur-3xl animate-pulse-soft" style={{ animationDelay: '1s' }} />
        </div>
      </div>

      {/* Modal Content */}
      <div
        className={`relative w-full max-w-7xl max-h-[90vh] overflow-hidden glass-panel rounded-2xl border border-aurora/40 shadow-2xl transition-all duration-300 ${
          isOpen ? 'scale-100 translate-y-0 opacity-100' : 'scale-95 translate-y-8 opacity-0'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-12 h-12 rounded-full bg-aurora/20 backdrop-blur-sm border-2 border-aurora/50 flex items-center justify-center hover:bg-aurora/30 hover:border-aurora hover:scale-110 transition-all duration-300 group"
        >
          <svg className="w-6 h-6 text-aurora group-hover:rotate-90 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="flex flex-col lg:flex-row h-full">
          {/* Left Side - Project Card */}
          <div className="lg:w-2/5 p-6 md:p-8 bg-midnight/40">
            <div className="space-y-6">
              {/* Project Card */}
              <div className="glass-panel p-6 border border-aurora/30">
                {/* Project Image */}
                <div className="aspect-[16/9] mb-6 bg-midnight/50 rounded-lg overflow-hidden">
                  <img
                    src={project.image || images[0]}
                    alt={project.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="800" height="450"%3E%3Crect fill="%231a1a2e" width="800" height="450"/%3E%3Ctext fill="%2300f5ff" x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-size="20"%3EHotel Management System%3C/text%3E%3C/svg%3E';
                    }}
                  />
                </div>

                {/* Project Title & Status */}
                <div className="mb-4">
                  <h3 className="text-2xl font-bold text-gradient mb-2">{project.title}</h3>
                  <span className={`inline-block px-4 py-1.5 text-sm font-semibold rounded-full border ${
                    project.status === 'completed'
                      ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
                      : project.status === 'in-progress'
                        ? 'bg-amber-500/20 text-amber-400 border-amber-500/40'
                        : 'bg-sky-blue/20 text-sky-blue border-sky-blue/40'
                  }`}>
                    {project.status.toUpperCase()}
                  </span>
                </div>

                {/* Description */}
                <p className="text-gray-300 text-sm leading-relaxed mb-5">
                  {project.description}
                </p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, index) => (
                    <span
                      key={index}
                      className="px-3 py-1.5 bg-aurora/15 border border-aurora/40 rounded-lg text-sm text-aurora font-medium hover:bg-aurora/25 transition-colors"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Mini Gallery */}
              <div>
                <h4 className="text-sm font-semibold text-soft-white mb-3 flex items-center gap-2">
                  <div className="w-2 h-2 bg-aurora rounded-full animate-pulse" />
                  Project Gallery
                </h4>
                <div className="grid grid-cols-3 gap-2">
                  {images.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImage(index)}
                      className={`aspect-[16/9] rounded-lg overflow-hidden border-2 transition-all hover:scale-105 hover:border-aurora ${
                        currentImage === index ? 'border-aurora shadow-lg shadow-aurora/30' : 'border-transparent'
                      }`}
                    >
                      <img
                        src={img}
                        alt={`Gallery ${index + 1}`}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                        }}
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Detailed Description */}
          <div className="lg:w-3/5 p-6 md:p-8 overflow-y-auto max-h-[90vh]">
            <div className="space-y-6">
              {/* Large Image Viewer */}
              <div className="relative aspect-[16/9] bg-midnight/50 rounded-xl overflow-hidden border-2 border-aurora/30">
                <img
                  src={images[currentImage]}
                  alt={`${project.title} - Screenshot ${currentImage + 1}`}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="1600" height="900"%3E%3Crect fill="%231a1a2e" width="1600" height="900"/%3E%3Ctext fill="%2300f5ff" x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-size="24"%3EHotel Management System%3C/text%3E%3C/svg%3E';
                  }}
                />

                {/* Gallery Controls Overlay */}
                <div className="absolute inset-0 flex items-center justify-between opacity-0 hover:opacity-100 transition-opacity duration-300">
                  <button
                    onClick={prevImage}
                    className="absolute left-4 w-12 h-12 rounded-full bg-aurora/20 backdrop-blur-sm border-2 border-aurora/50 flex items-center justify-center hover:bg-aurora/30 hover:border-aurora hover:scale-110 transition-all duration-300"
                  >
                    <svg className="w-6 h-6 text-aurora" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>

                  <button
                    onClick={nextImage}
                    className="absolute right-4 w-12 h-12 rounded-full bg-aurora/20 backdrop-blur-sm border-2 border-aurora/50 flex items-center justify-center hover:bg-aurora/30 hover:border-aurora hover:scale-110 transition-all duration-300"
                  >
                    <svg className="w-6 h-6 text-aurora" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>

                {/* Image Counter */}
                <div className="absolute top-4 left-4 px-4 py-2 rounded-full bg-aurora/20 backdrop-blur-sm border-2 border-aurora/50">
                  <span className="text-sm font-bold text-aurora">
                    {currentImage + 1} / {images.length}
                  </span>
                </div>
              </div>

              {/* Detailed Information */}
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-gradient mb-6">{project.title}</h2>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 mb-8">
                  <div className="text-center p-5 rounded-xl bg-midnight/50 border border-aurora/30 hover:border-aurora/50 transition-colors">
                    <div className="text-3xl font-bold text-aurora">66</div>
                    <div className="text-xs text-gray-400 mt-2">Java Files</div>
                  </div>
                  <div className="text-center p-5 rounded-xl bg-midnight/50 border border-sky-blue/30 hover:border-sky-blue/50 transition-colors">
                    <div className="text-3xl font-bold text-sky-blue">8</div>
                    <div className="text-xs text-gray-400 mt-2">DB Tables</div>
                  </div>
                  <div className="text-center p-5 rounded-xl bg-midnight/50 border border-purple-400/30 hover:border-purple-400/50 transition-colors">
                    <div className="text-3xl font-bold text-purple-400">15+</div>
                    <div className="text-xs text-gray-400 mt-2">Features</div>
                  </div>
                </div>

                {/* Key Features */}
                <div className="mb-8">
                  <h3 className="text-xl font-semibold text-soft-white mb-5 flex items-center gap-2">
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
                        <div className="w-6 h-6 rounded-full bg-aurora/20 border-2 border-aurora/50 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <svg className="w-3.5 h-3.5 text-aurora" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <span className="text-gray-300 text-sm leading-relaxed">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Database Architecture */}
                <div className="mb-8">
                  <h3 className="text-xl font-semibold text-soft-white mb-5 flex items-center gap-2">
                    <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" />
                    Database Architecture
                  </h3>
                  <div className="grid grid-cols-4 gap-2">
                    {['Users', 'Customers', 'Rooms', 'Bookings', 'Services', 'Bills', 'Employees', 'Vouchers'].map((table, index) => (
                      <div key={index} className="px-4 py-3 bg-midnight/50 border border-purple-400/30 rounded-lg text-center hover:border-purple-400/50 transition-colors">
                        <span className="text-sm text-gray-300 font-medium">{table}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Close Button */}
                <div className="flex justify-end pt-4">
                  <button
                    onClick={onClose}
                    className="px-8 py-3 bg-aurora/20 border-2 border-aurora/50 rounded-xl hover:bg-aurora/30 hover:border-aurora transition-all duration-300 font-semibold text-aurora"
                  >
                    Close Project
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};