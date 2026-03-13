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
  const [isLangOpen, setIsLangOpen] = useState(false);
  const langRef = useRef(null);
  const cursorRef = useRef(null);

  const T = translations[lang];

  // Instant cursor tracking (No delay)
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${e.clientX - 7}px, ${e.clientY - 7}px, 0)`;
      }
    };
    const handleClickOutside = (event) => {
      if (langRef.current && !langRef.current.contains(event.target)) {
        setIsLangOpen(false);
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleClickOutside);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleClickOutside);
    };
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

  // Handle RTL for Arabic
  useEffect(() => {
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  }, [lang]);

  return (
    <div className={`min-h-screen relative bg-indie-bg text-indie-text selection:bg-indie-primary/30 selection:text-indie-text overflow-x-hidden font-sans transition-colors duration-1000 ease-in-out ${lang === 'ar' ? 'font-arabic' : ''}`}>

      {/* Super smooth generic cursor */}
      <div ref={cursorRef} className="custom-cursor hidden md:block" />

      {/* Theme & Language Selectors */}
      <div className={`fixed top-8 ${lang === 'ar' ? 'left-8 md:left-12' : 'right-8 md:right-12'} z-[200] flex gap-3`}>
        {/* Language Selector Dropdown */}
        <div className="relative" ref={langRef}>
          <button
            onClick={() => setIsLangOpen(!isLangOpen)}
            className="w-12 h-12 rounded-full bg-white/40 dark:bg-black/20 backdrop-blur-md border border-white/60 dark:border-white/10 shadow-glass flex items-center justify-center text-indie-text hover:text-indie-primary transition-all duration-500 group uppercase text-[10px] font-bold tracking-widest"
            title="Choose Language"
          >
            <div className="absolute inset-0 rounded-full bg-indie-primary/0 group-hover:bg-indie-primary/10 transition-colors duration-500" />
            <span className="relative z-10">{lang}</span>
          </button>

          {/* Dropdown Menu */}
          <div className={`absolute top-14 ${lang === 'ar' ? 'left-0' : 'right-0'} bg-white/60 dark:bg-black/40 backdrop-blur-xl border border-white/60 dark:border-white/10 rounded-2xl shadow-2xl transition-all duration-500 overflow-hidden ${isLangOpen ? 'opacity-100 translate-y-0 visible' : 'opacity-0 -translate-y-4 invisible'}`}>
            <div className="py-2 w-32">
              {[
                { id: 'fr', label: 'Français' },
                { id: 'en', label: 'English' },
                { id: 'es', label: 'Español' },
                { id: 'ar', label: 'العربية' }
              ].map((l) => (
                <button
                  key={l.id}
                  onClick={() => {
                    setLang(l.id);
                    setIsLangOpen(false);
                  }}
                  className={`w-full px-4 py-2.5 text-left flex items-center justify-between text-[11px] font-medium tracking-wide transition-colors ${lang === l.id ? 'text-indie-primary bg-indie-primary/10' : 'text-indie-text hover:bg-white/40 dark:hover:bg-white/10'}`}
                >
                  <span className={l.id === 'ar' ? 'font-arabic text-sm' : ''}>{l.label}</span>
                  {lang === l.id && <div className="w-1.5 h-1.5 rounded-full bg-indie-primary shadow-[0_0_8px_rgba(var(--indie-primary-rgb),0.6)]" />}
                </button>
              ))}
            </div>
          </div>
        </div>

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

      <main className={`relative z-10 max-w-6xl mx-auto ${lang === 'ar' ? 'md:pr-24' : 'md:pl-24'}`}>
        <section id="hero" className={`min-h-screen flex items-center justify-start transition-all duration-1000 ${visibleSections.has('hero') ? 'animate-fade-in' : 'opacity-0'}`}>
          <div className={`${lang === 'ar' ? 'text-right' : 'text-left'} space-y-8 px-8 sm:px-12 w-full max-w-3xl pt-24 md:pt-0`}>
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

            <div className={`flex flex-col sm:flex-row gap-6 pt-10 ${lang === 'ar' ? 'sm:flex-row-reverse' : ''}`}>
              <a href="#projects" className="group px-8 py-4 bg-indie-text text-indie-bg rounded-full hover:bg-indie-primary hover:shadow-lg hover:shadow-indie-primary/20 transition-all duration-500 uppercase tracking-[0.2em] text-[11px] font-medium flex items-center justify-center gap-3">
                {T.hero.cta_work}
                <span className={`${lang === 'ar' ? 'group-hover:-translate-x-1' : 'group-hover:translate-x-1'} transition-transform`}>{lang === 'ar' ? '←' : '→'}</span>
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
                  href={
                    lang === 'fr' ? (isDarkMode ? "/CV_Ilyace_KADRI_Dark.html" : "/CV_Ilyace_KADRI_Light.html") :
                      lang === 'en' ? (isDarkMode ? "/CV_Ilyace_KADRI_Dark_EN.html" : "/CV_Ilyace_KADRI_Light_EN.html") :
                        lang === 'es' ? (isDarkMode ? "/CV_Ilyace_KADRI_Dark_ES.html" : "/CV_Ilyace_KADRI_Light_ES.html") :
                          (isDarkMode ? "/CV_Ilyace_KADRI_Dark_AR.html" : "/CV_Ilyace_KADRI_Light_AR.html")
                  }
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