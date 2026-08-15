import { personalInfo } from '../data/content';

export const HeroSection = () => {
  return (
    <section className="min-h-screen relative flex items-center justify-center px-6 py-20">
      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="relative z-10 max-w-4xl">
          {/* Avatar */}
          <div className="absolute -right-20 top-1/2 -translate-y-1/2 w-[500px] h-[500px] opacity-100">
            <div className="relative w-full h-full">
              <div className="absolute inset-0 bg-aurora/20 rounded-full blur-3xl" />
              <div className="relative w-full h-full rounded-full overflow-hidden">
                <img
                  src="/assets/avatar.jpg"
                  alt="Nguyễn Voi - Guitarist & Developer"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="relative z-10 max-w-4xl">
            <h1 className="text-6xl md:text-8xl font-bold text-white mb-6">
              {personalInfo.name}
            </h1>

            <p className="text-2xl md:text-3xl text-sky-blue mb-4">
              {personalInfo.tagline}
            </p>

            <p className="text-xl text-gray-400 max-w-2xl">
              {personalInfo.taglineExtended}
            </p>

            <div className="absolute bottom-10 left-0">
              <div className="flex items-center gap-2 text-gray-500">
                <span className="text-sm">Scroll to enter</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
