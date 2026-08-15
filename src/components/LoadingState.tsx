export const LoadingState = () => (
  <div className="fixed inset-0 bg-midnight z-[100] flex items-center justify-center">
    <div className="text-center">
      <div className="w-20 h-20 mx-auto mb-6 relative">
        {/* Aurora loading animation */}
        <div className="absolute inset-0 border-4 border-aurora/20 rounded-full" />
        <div className="absolute inset-0 border-4 border-transparent border-t-aurora rounded-full animate-spin" />
        <div className="absolute inset-2 border-4 border-transparent border-r-sky-blue rounded-full animate-spin animation-delay-200" />
        <div className="absolute inset-4 border-4 border-transparent border-b-purple-400 rounded-full animate-spin animation-delay-400" />
      </div>

      {/* Loading text */}
      <div className="space-y-3">
        <h2 className="text-xl sm:text-2xl font-bold text-gradient">Loading Experience</h2>
        <div className="flex items-center justify-center gap-2">
          <div className="w-2 h-2 bg-aurora rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
          <div className="w-2 h-2 bg-sky-blue rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
          <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
        </div>
        <p className="text-sm text-gray-400">Initializing aurora effects & snow system...</p>
      </div>

      {/* Progress bar */}
      <div className="w-48 h-1 mx-auto mt-6 bg-midnight/50 rounded-full overflow-hidden">
        <div className="h-full bg-gradient-to-r from-aurora via-sky-blue to-purple-400 rounded-full animate-loading" />
      </div>
    </div>

    <style>{`
      @keyframes loading {
        0% { width: 0%; }
        100% { width: 100%; }
      }
      .animate-loading {
        animation: loading 2s ease-in-out infinite;
      }
      .animation-delay-200 {
        animation-delay: 0.2s;
      }
      .animation-delay-400 {
        animation-delay: 0.4s;
      }
    `}</style>
  </div>
);