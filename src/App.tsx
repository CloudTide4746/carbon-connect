import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import Themes from './components/Themes';
import DigitalHuman from './components/DigitalHuman';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <Navbar />
      <main>
        <Hero />
        <Themes />
        <Features />
        <DigitalHuman />
      </main>
      <Footer />
    </div>
  );
}

export default App;
