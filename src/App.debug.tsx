import { useState, useEffect } from 'react';

function App() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    console.log('App mounted');
  }, []);

  if (!mounted) {
    return <div className="min-h-screen bg-midnight">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-midnight text-white">
      {/* Debug header */}
      <div className="p-4 bg-red-600 text-white">
        <h1>DEBUG MODE - Website Should Work</h1>
      </div>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-6">
        <div className="text-center max-w-4xl">
          <h1 className="text-6xl font-bold text-white mb-6">
            NGUYỄN VOI
          </h1>
          <p className="text-2xl text-sky-blue mb-4">
            Guitarist / Developer
          </p>
          <p className="text-lg text-gray-400">
            Where logic meets melody
          </p>
        </div>
      </section>

      {/* About Section */}
      <section className="min-h-screen flex items-center justify-center px-6 py-20 bg-midnight/50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl font-bold text-white mb-8">ABOUT</h2>
          <p className="text-lg text-gray-300 leading-relaxed">
            I'm currently studying Information Technology at FPT Polytechnic while exploring
            software development, music, and the things that inspire me.
          </p>
        </div>
      </section>

      {/* Skills Section */}
      <section className="min-h-screen flex items-center justify-center px-6 py-20">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-5xl font-bold text-white mb-8">BUILDING WITH CODE</h2>
          <div className="grid md:grid-cols-2 gap-8 mt-12">
            <div className="bg-blue-900/30 p-8 rounded-lg border border-sky-blue/20">
              <h3 className="text-2xl text-sky-blue mb-6">DEVELOPMENT</h3>
              <div className="space-y-4">
                <div className="text-white">JavaScript</div>
                <div className="text-white">HTML</div>
                <div className="text-white">CSS</div>
              </div>
            </div>

            <div className="bg-purple-900/30 p-8 rounded-lg border border-purple-400/20">
              <h3 className="text-2xl text-purple-400 mb-6">DATA</h3>
              <div className="space-y-4">
                <div className="text-white">SQL</div>
                <div className="text-white">Database Fundamentals</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center text-gray-500">
        <p className="text-sm">© 2025 Nguyễn Voi. Built with logic & melody.</p>
      </footer>
    </div>
  );
}

export default App;
