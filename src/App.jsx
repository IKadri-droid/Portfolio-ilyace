import React, { useState, useEffect, useRef } from 'react';
import { Moon, Sun } from 'lucide-react';
import BackgroundEffects from "./components/BackgroundEffects";

import SideBar from "./features/navigation/SideBar";
import ProfilePhoto from "./features/hero/ProfilePhoto";
import Stack from "./features/stack/Stack";
import Contact from "./features/contact/Contact";
import Experience from "./features/cv/Experience";
import { translations } from "./translations";
import './index.css';

function App() {
  const [activeSection, setActiveSection] = useState('hero');
  const [visibleSections, setVisibleSections] = useState(new Set());
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [lang, setLang] = useState('fr');
  const cursorRef = useRef(null);
  
  const T = translations[lang];

  // Instant cursor tracking (No delay)
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${e.clientX - 7}px, ${e.clientY - 7}px, 0)`;
      }
    };
    window.addEventListener('mousemove', handleMouseMove);

    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observerOptions = { threshold: 0.15 };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setVisibleSections(prev => new Set([...prev, entry.target.id]));
          setActiveSection(entry.target.id);
        }
      });
    }, observerOptions);

    const sections = ['hero', 'stack', 'cv', 'projects', 'contact'];
    sections.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Sync state with HTML dark class for Tailwind
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  return (
    <div className="min-h-screen relative bg-indie-bg text-indie-text selection:bg-indie-primary/30 selection:text-indie-text overflow-x-hidden font-sans transition-colors duration-1000 ease-in-out">

      {/* Super smooth generic cursor */}
      <div ref={cursorRef} className="custom-cursor hidden md:block" />

      {/* Theme & Language Toggles */}
      <div className="fixed top-8 right-8 md:right-12 z-[200] flex gap-3">
        {/* Language Toggle */}
        <button 
          onClick={() => setLang(lang === 'fr' ? 'en' : 'fr')}
          className="w-12 h-12 rounded-full bg-white/40 dark:bg-black/20 backdrop-blur-md border border-white/60 dark:border-white/10 shadow-glass flex items-center justify-center text-indie-text hover:text-indie-primary transition-all duration-500 group uppercase text-[10px] font-bold tracking-widest"
        >
          <div className="absolute inset-0 rounded-full bg-indie-primary/0 group-hover:bg-indie-primary/10 transition-colors duration-500" />
          <span className="relative z-10">{lang === 'fr' ? 'EN' : 'FR'}</span>
        </button>

        {/* Theme Toggle Button */}
        <button 
          onClick={() => setIsDarkMode(!isDarkMode)}
          className="w-12 h-12 rounded-full bg-white/40 dark:bg-black/20 backdrop-blur-md border border-white/60 dark:border-white/10 shadow-glass flex items-center justify-center text-indie-text hover:text-indie-primary transition-all duration-500 group"
        >
          <div className="absolute inset-0 rounded-full bg-indie-primary/0 group-hover:bg-indie-primary/10 transition-colors duration-500" />
          {isDarkMode ? <Sun className="w-[18px] h-[18px]" /> : <Moon className="w-[18px] h-[18px] transition-transform group-hover:-rotate-12" />}
        </button>
      </div>

      <BackgroundEffects />
      <SideBar activeSection={activeSection} t={T.nav} />
      <ProfilePhoto />

      <main className="relative z-10 max-w-6xl mx-auto md:pl-24">
        <section id="hero" className={`min-h-screen flex items-center justify-start transition-all duration-1000 ${visibleSections.has('hero') ? 'animate-fade-in' : 'opacity-0'}`}>
          <div className="text-left space-y-8 px-8 sm:px-12 w-full max-w-3xl pt-24 md:pt-0">
            <div className="space-y-4">
              <span className="inline-block text-indie-primary text-[11px] font-semibold tracking-[0.3em] uppercase">
                {T.hero.subtitle}
              </span>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif text-indie-text font-medium tracking-tight">
                {T.hero.title}
              </h1>
            </div>

            <p className="text-indie-muted max-w-xl text-[15px] md:text-[16px] font-light leading-relaxed">
              {T.hero.description}
            </p>

            <div className="flex flex-col sm:flex-row gap-6 pt-10">
              <a href="#projects" className="group px-8 py-4 bg-indie-text text-indie-bg rounded-full hover:bg-indie-primary hover:shadow-lg hover:shadow-indie-primary/20 transition-all duration-500 uppercase tracking-[0.2em] text-[11px] font-medium flex items-center justify-center gap-3">
                {T.hero.cta_work}
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </a>
              <div className="flex flex-col gap-3">
                <a
                  href="/CV_Ilyace_KADRI.pdf"
                  download="CV_Ilyace_KADRI.pdf"
                  className="px-8 py-4 bg-transparent text-indie-text border border-indie-text/20 rounded-full hover:border-indie-text hover:bg-indie-text/5 transition-all duration-500 uppercase tracking-[0.2em] text-[11px] font-medium text-center shadow-sm"
                >
                  {T.hero.cta_cv}
                </a>
                <a
                  href={isDarkMode ? "/CV_Ilyace_KADRI_Dark.html" : "/CV_Ilyace_KADRI_Light.html"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-center text-[10px] tracking-[0.2em] uppercase text-indie-muted hover:text-indie-primary transition-colors"
                >
                  {T.hero.cta_web}
                </a>
              </div>
            </div>
          </div>
        </section>

        <Stack t={T.stack} className={`transition-all duration-1000 ${visibleSections.has('stack') ? 'animate-fade-in' : 'opacity-0'}`} />

        <Experience t={T.experience} className={`transition-all duration-1000 ${visibleSections.has('cv') ? 'animate-fade-in' : 'opacity-0'}`} />

        <section id="projects" className={`min-h-screen py-32 px-8 sm:px-12 flex flex-col justify-center transition-all duration-1000 ${visibleSections.has('projects') ? 'animate-fade-in' : 'opacity-0'}`}>
          <div className="mb-20">
            <h2 className="text-sm font-semibold tracking-[0.2em] text-indie-primary uppercase mb-2">{T.projects.title}</h2>
            <h3 className="text-3xl font-serif text-indie-text transition-colors duration-500">{T.projects.subtitle}</h3>
            <div className="w-12 h-px bg-indie-primary/30 mt-6" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16">
            {/* Project 1 */}
            <div className="group flex flex-col cursor-none">
              <div className="aspect-[4/3] bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800/40 dark:to-slate-900/60 rounded-3xl mb-6 overflow-hidden relative shadow-ethereal border border-slate-200/50 dark:border-white/5 transition-all duration-500 hover:shadow-ethereal-hover">
                <div className="absolute inset-0 bg-indie-bg/5 group-hover:bg-transparent transition-colors duration-700" />
                <div className="absolute top-5 left-5 flex gap-2">
                  <span className="px-3 py-1.5 bg-white/80 dark:bg-black/40 backdrop-blur-md rounded-full text-[10px] uppercase tracking-widest text-indie-text transition-colors duration-500 font-medium">Golang</span>
                </div>
              </div>
              <span className="text-indie-muted text-[11px] tracking-[0.1em] font-medium uppercase mb-2">{T.projects.p1_cat}</span>
              <h3 className="text-xl font-serif text-indie-text mb-2 group-hover:text-indie-primary transition-colors duration-300">{T.projects.p1_title}</h3>
              <p className="text-indie-muted text-[13px] font-light leading-relaxed">
                {T.projects.p1_desc}
              </p>
            </div>

            {/* Project 2 */}
            <div className="group flex flex-col md:mt-16 cursor-none">
              <div className="aspect-[4/3] bg-gradient-to-br from-[#E2E8F0] to-[#F1F5F9] dark:from-[#1E293B]/60 dark:to-[#0F172A]/80 rounded-3xl mb-6 overflow-hidden relative shadow-ethereal border border-slate-200/50 dark:border-white/5 transition-all duration-500 hover:shadow-ethereal-hover">
                <div className="absolute inset-0 bg-indie-bg/5 group-hover:bg-transparent transition-colors duration-700" />
                <div className="absolute top-5 left-5 flex gap-2">
                  <span className="px-3 py-1.5 bg-white/80 dark:bg-black/40 backdrop-blur-md rounded-full text-[10px] uppercase tracking-widest text-indie-text transition-colors duration-500 font-medium">React Native</span>
                  <span className="px-3 py-1.5 bg-white/80 dark:bg-black/40 backdrop-blur-md rounded-full text-[10px] uppercase tracking-widest text-indie-text transition-colors duration-500 font-medium">Node.js</span>
                </div>
              </div>
              <span className="text-indie-muted text-[11px] tracking-[0.1em] font-medium uppercase mb-2">{T.projects.p2_cat}</span>
              <h3 className="text-xl font-serif text-indie-text mb-2 group-hover:text-indie-primary transition-colors duration-300">{T.projects.p2_title}</h3>
              <p className="text-indie-muted text-[13px] font-light leading-relaxed">
                {T.projects.p2_desc}
              </p>
            </div>

            {/* Project 3 */}
            <div className="group flex flex-col cursor-none">
              <div className="aspect-[4/3] bg-gradient-to-br from-[#f8f9fa] to-[#e9ecef] dark:from-[#212529]/60 dark:to-[#1a1d20]/80 rounded-3xl mb-6 overflow-hidden relative shadow-ethereal border border-slate-200/50 dark:border-white/5 transition-all duration-500 hover:shadow-ethereal-hover">
                <div className="absolute text-center flex items-center justify-center w-full h-full text-slate-400 dark:text-slate-600 transition-colors duration-500">
                  <span className="font-serif italic text-lg opacity-40">{T.projects.p3_no_preview}</span>
                </div>
                <div className="absolute inset-0 bg-indie-bg/5 group-hover:bg-transparent transition-colors duration-700" />
                <div className="absolute top-5 left-5 flex gap-2">
                  <span className="px-3 py-1.5 bg-white/80 dark:bg-black/40 backdrop-blur-md rounded-full text-[10px] uppercase tracking-widest text-indie-text transition-colors duration-500 font-medium">React</span>
                  <span className="px-3 py-1.5 bg-white/80 dark:bg-black/40 backdrop-blur-md rounded-full text-[10px] uppercase tracking-widest text-indie-text transition-colors duration-500 font-medium">Stripe</span>
                </div>
              </div>
              <span className="text-indie-muted text-[11px] tracking-[0.1em] font-medium uppercase mb-2">{T.projects.p3_cat}</span>
              <h3 className="text-xl font-serif text-indie-text mb-2 group-hover:text-indie-primary transition-colors duration-300">{T.projects.p3_title}</h3>
              <p className="text-indie-muted text-[13px] font-light leading-relaxed">
                {T.projects.p3_desc}
              </p>
            </div>

            {/* Project 4 */}
            <div className="group flex flex-col md:mt-16 opacity-60 hover:opacity-100 transition-opacity duration-700 cursor-none">
              <div className="aspect-[4/3] border border-dashed border-indie-muted/40 rounded-3xl mb-6 flex items-center justify-center bg-transparent transition-colors duration-500">
                <span className="text-[10px] tracking-widest uppercase text-indie-muted">{T.projects.p4_status}</span>
              </div>
              <span className="text-indie-muted text-[11px] tracking-[0.1em] font-medium uppercase mb-2">{T.projects.p4_cat}</span>
              <h3 className="text-xl font-serif text-indie-text mb-2 transition-colors duration-500">{T.projects.p4_title}</h3>
              <p className="text-indie-muted text-[13px] font-light leading-relaxed">
                {T.projects.p4_desc}
              </p>
            </div>
          </div>
        </section>

        <Contact t={T.contact} className={`transition-all duration-1000 ${visibleSections.has('contact') ? 'animate-fade-in' : 'opacity-0'}`} />
      </main>
    </div>
  );
}
export default App;