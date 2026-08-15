'use client';

import { useEffect } from 'react';
import gsap from 'gsap';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import CodeMusicConcept from './components/CodeMusicConcept';
import Hobbies from './components/Hobbies';
import Portfolio from './components/Portfolio';
import Connect from './components/Connect';
import Footer from './components/Footer';

export default function PortfolioPage() {
  useEffect(() => {
    gsap.from('body', { opacity: 0, duration: 0.5 });
  }, []);

  return (
    <main className="min-h-screen">
      <Navigation />
      <Hero />
      <About />
      <Skills />
      <CodeMusicConcept />
      <Hobbies />
      <Portfolio />
      <Connect />
      <Footer />
    </main>
  );
}