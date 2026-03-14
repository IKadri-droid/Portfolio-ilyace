import React, { useState, useEffect, useRef } from 'react';
import { Moon, Sun, Github, ExternalLink } from 'lucide-react';
import BackgroundEffects from "./components/BackgroundEffects";

import SideBar from "./features/navigation/SideBar";
import ProfilePhoto from "./features/hero/ProfilePhoto";
import Stack from "./features/stack/Stack";
import Contact from "./features/contact/Contact";
import Experience from "./features/cv/Experience";
import { translations } from "./translations";
import './index.css';

import groupieImg from './assets/groupie.png';
import discordImg from './assets/discord_bot.png';
import puissance4Img from './assets/puissance4.png';
import pocketLeafImg from './assets/pocket_leaf.png';

function App() {
  const [activeSection, setActiveSection] = useState('hero');
  const [visibleSections, setVisibleSections] = useState(new Set());
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [lang, setLang] = useState('fr');
  const [isLangOpen, setIsLangOpen] = useState(false);
  const langRef = useRef(null);
  const cursorRef = useRef(null);
  const [selectedPresentation, setSelectedPresentation] = useState(null);
  const [isClosing, setIsClosing] = useState(false);
  const [notification, setNotification] = useState(null);

  const openPresentation = (url) => {
    setSelectedPresentation(url);
    setIsClosing(false);
    document.body.style.overflow = 'hidden';
  };

  const closePresentation = () => {
    setIsClosing(true);
    setTimeout(() => {
      setSelectedPresentation(null);
      setIsClosing(false);
      document.body.style.overflow = 'unset';
    }, 400); // Duration matches animation-out
  };

  const showNotification = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  const T = translations[lang];

  // Update Meta Tags dynamically
  useEffect(() => {
    document.title = T.meta.title;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', T.meta.description);
    } else {
      const newMeta = document.createElement('meta');
      newMeta.name = 'description';
      newMeta.content = T.meta.description;
      document.head.appendChild(newMeta);
    }
  }, [lang, T.meta.title, T.meta.description]);

  // Instant cursor tracking (No delay)
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (cursorRef.current) {
        requestAnimationFrame(() => {
          cursorRef.current.style.transform = `translate3d(${e.clientX - 7}px, ${e.clientY - 7}px, 0)`;
        });
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

      {/* Global Notifications */}
      {notification && (
        <div className={`fixed bottom-10 left-1/2 -translate-x-1/2 z-[1000] px-6 py-3 bg-indie-text text-indie-bg text-[10px] tracking-[0.3em] uppercase font-bold rounded-full shadow-2xl transition-all duration-700 animate-fade-in`}>
          {notification}
        </div>
      )}

      {/* Theme & Language Selectors */}
      <div className={`fixed top-8 ${lang === 'ar' ? 'left-8 md:left-12' : 'right-8 md:right-12'} z-[200] flex gap-3`}>
        {/* Language Selector Dropdown */}
        <div className="relative" ref={langRef}>
          <button
            aria-label="Toggle Language"
            onClick={() => setIsLangOpen(!isLangOpen)}
            className="w-12 h-12 rounded-full bg-white/40 dark:bg-black/20 backdrop-blur-md border border-white/60 dark:border-white/10 shadow-glass flex items-center justify-center text-indie-text hover:text-indie-primary transition-all duration-500 group uppercase text-[10px] font-bold tracking-widest"
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
      <SideBar activeSection={activeSection} t={T.nav} showNotification={showNotification} lang={lang} />
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
            {/* Project 1 - Groupie Tracker */}
            <div className="group flex flex-col cursor-none" onClick={() => openPresentation(`/presentations/groupie/index${lang === 'fr' ? '' : '_' + lang}.html`)}>
              <div className="aspect-[4/3] bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800/40 dark:to-slate-900/60 rounded-3xl mb-6 overflow-hidden relative shadow-ethereal border border-slate-200/50 dark:border-white/5 transition-all duration-500 hover:shadow-ethereal-hover">
                <img src={groupieImg} alt="Groupie Tracker" className="absolute inset-0 w-full h-full object-cover scale-100 group-hover:scale-110 transition-transform duration-1000 opacity-90 group-hover:opacity-100" />
                <div className="absolute inset-0 bg-black/5 group-hover:bg-black/20 transition-colors duration-700" />

                {/* Visual Hint on Hover */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-700 scale-95 group-hover:scale-100 gap-4">
                  <button
                    onClick={(e) => { e.stopPropagation(); openPresentation(`/presentations/groupie/index${lang === 'fr' ? '' : '_' + lang}.html`); }}
                    className="px-6 py-2 bg-white/10 dark:bg-black/20 backdrop-blur-md border border-white/20 rounded-full text-white text-[10px] tracking-[0.4em] uppercase font-bold shadow-2xl hover:bg-white/20 transition-all active:scale-95 flex items-center gap-2"
                  >
                    {lang === 'ar' ? 'عرض' : lang === 'en' ? 'VIEW' : lang === 'es' ? 'VER' : 'VOIR'}
                  </button>
                  <a
                    href="https://github.com/IKadri-droid/groupie-tracker"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="w-10 h-10 bg-white/10 dark:bg-black/20 backdrop-blur-md border border-white/20 rounded-full text-white flex items-center justify-center shadow-2xl hover:bg-white/20 transition-all active:scale-95"
                    title="Source Code"
                  >
                    <Github className="w-4 h-4" />
                  </a>
                </div>

                <div className="absolute top-5 left-5 right-5 flex flex-wrap gap-2">
                  <span className="px-3 py-1.5 bg-white/80 dark:bg-black/40 backdrop-blur-md rounded-full text-[10px] uppercase tracking-widest text-indie-text transition-colors duration-500 font-medium">Golang</span>
                  <span className="px-3 py-1.5 bg-white/80 dark:bg-black/40 backdrop-blur-md rounded-full text-[10px] uppercase tracking-widest text-indie-text transition-colors duration-500 font-medium">Stripe</span>
                  <span className="px-3 py-1.5 bg-white/80 dark:bg-black/40 backdrop-blur-md rounded-full text-[10px] uppercase tracking-widest text-indie-text transition-colors duration-500 font-medium">PostgreSQL</span>
                  <span className="px-3 py-1.5 bg-white/80 dark:bg-black/40 backdrop-blur-md rounded-full text-[10px] uppercase tracking-widest text-indie-text transition-colors duration-500 font-medium">Docker</span>
                </div>
              </div>
              <span className="text-indie-muted text-[11px] tracking-[0.1em] font-medium uppercase mb-2">{T.projects.p1_cat}</span>
              <h3 className="text-xl font-serif text-indie-text mb-2 group-hover:text-indie-primary transition-colors duration-300">{T.projects.p1_title}</h3>
              <p className="text-indie-muted text-[13px] font-light leading-relaxed">
                {T.projects.p1_desc}
              </p>
            </div>

            {/* Project 2 - Discord Bot */}
            <div className="group flex flex-col md:mt-16 cursor-none">
              <div className="aspect-[4/3] bg-gradient-to-br from-[#E2E8F0] to-[#F1F5F9] dark:from-[#1E293B]/60 dark:to-[#0F172A]/80 rounded-3xl mb-6 overflow-hidden relative shadow-ethereal border border-slate-200/50 dark:border-white/5 transition-all duration-500 hover:shadow-ethereal-hover">
                <img src={discordImg} alt="Discord Bot" className="absolute inset-0 w-full h-full object-cover scale-100 group-hover:scale-110 transition-transform duration-1000 opacity-90 group-hover:opacity-100" />
                <div className="absolute inset-0 bg-black/5 group-hover:bg-black/20 transition-colors duration-700" />

                {/* Visual Hint on Hover Project 2 */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-700 scale-95 group-hover:scale-100 gap-4">
                  <a
                    href="https://github.com/IKadri-droid/Bot-Discord-JS"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="px-6 py-2 bg-white/10 dark:bg-black/20 backdrop-blur-md border border-white/20 rounded-full text-white text-[10px] tracking-[0.4em] uppercase font-bold shadow-2xl hover:bg-white/20 transition-all active:scale-95 flex items-center gap-2"
                  >
                    CODE
                  </a>
                  <a
                    href="https://github.com/IKadri-droid"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="w-10 h-10 bg-white/10 dark:bg-black/20 backdrop-blur-md border border-white/20 rounded-full text-white flex items-center justify-center shadow-2xl hover:bg-white/20 transition-all active:scale-95"
                    title="Live Preview"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>

                <div className="absolute top-5 left-5 right-5 flex flex-wrap gap-2">
                  <span className="px-3 py-1.5 bg-white/80 dark:bg-black/40 backdrop-blur-md rounded-full text-[10px] uppercase tracking-widest text-indie-text transition-colors duration-500 font-medium">TypeScript</span>
                  <span className="px-3 py-1.5 bg-white/80 dark:bg-black/40 backdrop-blur-md rounded-full text-[10px] uppercase tracking-widest text-indie-text transition-colors duration-500 font-medium">Node.js</span>
                  <span className="px-3 py-1.5 bg-white/80 dark:bg-black/40 backdrop-blur-md rounded-full text-[10px] uppercase tracking-widest text-indie-text transition-colors duration-500 font-medium">Neon DB</span>
                  <span className="px-3 py-1.5 bg-white/80 dark:bg-black/40 backdrop-blur-md rounded-full text-[10px] uppercase tracking-widest text-indie-text transition-colors duration-500 font-medium">Excalidraw</span>
                </div>
              </div>
              <span className="text-indie-muted text-[11px] tracking-[0.1em] font-medium uppercase mb-2">{T.projects.p2_cat}</span>
              <h3 className="text-xl font-serif text-indie-text mb-2 group-hover:text-indie-primary transition-colors duration-300">{T.projects.p2_title}</h3>
              <p className="text-indie-muted text-[13px] font-light leading-relaxed">
                {T.projects.p2_desc}
              </p>
            </div>

            {/* Project 3 - Puissance 4 */}
            <div className="group flex flex-col cursor-none" onClick={() => openPresentation(`/presentations/puissance4/index${lang === 'fr' ? '' : '_' + lang}.html`)}>
              <div className="aspect-[4/3] bg-gradient-to-br from-[#f8f9fa] to-[#e9ecef] dark:from-[#212529]/60 dark:to-[#1a1d20]/80 rounded-3xl mb-6 overflow-hidden relative shadow-ethereal border border-slate-200/50 dark:border-white/5 transition-all duration-500 hover:shadow-ethereal-hover">
                <img src={puissance4Img} alt="Puissance 4" className="absolute inset-0 w-full h-full object-cover scale-100 group-hover:scale-110 transition-transform duration-1000 opacity-90 group-hover:opacity-100" />
                <div className="absolute inset-0 bg-black/5 group-hover:bg-black/20 transition-colors duration-700" />

                {/* Visual Hint on Hover Project 3 */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-700 scale-95 group-hover:scale-100 gap-4">
                  <button
                    onClick={(e) => { e.stopPropagation(); openPresentation(`/presentations/puissance4/index${lang === 'fr' ? '' : '_' + lang}.html`); }}
                    className="px-6 py-2 bg-white/10 dark:bg-black/20 backdrop-blur-md border border-white/20 rounded-full text-white text-[10px] tracking-[0.4em] uppercase font-bold shadow-2xl hover:bg-white/20 transition-all active:scale-95 flex items-center gap-2"
                  >
                    {lang === 'ar' ? 'عرض' : lang === 'en' ? 'VIEW' : lang === 'es' ? 'VER' : 'VOIR'}
                  </button>
                  <a
                    href="https://github.com/IKadri-droid"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="w-10 h-10 bg-white/10 dark:bg-black/20 backdrop-blur-md border border-white/20 rounded-full text-white flex items-center justify-center shadow-2xl hover:bg-white/20 transition-all active:scale-95"
                    title="Source Code"
                  >
                    <Github className="w-4 h-4" />
                  </a>
                </div>

                <div className="absolute top-5 left-5 right-5 flex flex-wrap gap-2">
                  <span className="px-3 py-1.5 bg-white/80 dark:bg-black/40 backdrop-blur-md rounded-full text-[10px] uppercase tracking-widest text-indie-text transition-colors duration-500 font-medium">Golang</span>
                  <span className="px-3 py-1.5 bg-white/80 dark:bg-black/40 backdrop-blur-md rounded-full text-[10px] uppercase tracking-widest text-indie-text transition-colors duration-500 font-medium">WebSockets</span>
                  <span className="px-3 py-1.5 bg-white/80 dark:bg-black/40 backdrop-blur-md rounded-full text-[10px] uppercase tracking-widest text-indie-text transition-colors duration-500 font-medium">HTML/CSS</span>
                </div>
              </div>
              <span className="text-indie-muted text-[11px] tracking-[0.1em] font-medium uppercase mb-2">{T.projects.p3_cat}</span>
              <h3 className="text-xl font-serif text-indie-text mb-2 group-hover:text-indie-primary transition-colors duration-300">{T.projects.p3_title}</h3>
              <p className="text-indie-muted text-[13px] font-light leading-relaxed">
                {T.projects.p3_desc}
              </p>
            </div>

            {/* Project 4 - Pocket Leaf */}
            <div className="group flex flex-col md:mt-16 cursor-none">
              <div className="aspect-[4/3] border border-indie-muted/20 dark:border-white/10 rounded-3xl mb-6 flex items-center justify-center bg-transparent transition-all duration-500 relative overflow-hidden group-hover:shadow-ethereal-hover">
                <img src={pocketLeafImg} alt="Pocket Leaf" className="absolute inset-0 w-full h-full object-cover scale-100 group-hover:scale-110 transition-transform duration-1000 opacity-90 group-hover:opacity-100" />

                {/* Progress Overlay */}
                <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] flex items-center justify-center group-hover:bg-black/20 group-hover:backdrop-blur-none transition-all duration-700">
                  <div className="px-5 py-2.5 bg-white/10 backdrop-blur-xl border border-white/30 rounded-full shadow-2xl transition-all duration-500 group-hover:scale-90 group-hover:opacity-0">
                    <span className="text-[10px] tracking-[0.3em] uppercase text-white font-bold">{T.projects.p4_status}</span>
                  </div>
                  {/* Hover Hint */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-700 scale-95 group-hover:scale-100 gap-4">
                    <div className="px-6 py-2 bg-white/10 dark:bg-black/20 backdrop-blur-md border border-white/20 rounded-full text-white text-[10px] tracking-[0.4em] uppercase font-bold shadow-2xl">
                      {lang === 'ar' ? 'عرض' : lang === 'en' ? 'VIEW' : lang === 'es' ? 'VER' : 'VOIR'}
                    </div>
                    <a
                      href="https://github.com/IKadri-droid"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-white/10 dark:bg-black/20 backdrop-blur-md border border-white/20 rounded-full text-white flex items-center justify-center shadow-2xl hover:bg-white/20 transition-all active:scale-95"
                      title="Source Code"
                    >
                      <Github className="w-4 h-4" />
                    </a>
                  </div>
                </div>

                <div className="absolute top-5 left-5 right-5 flex flex-wrap gap-2">
                  <span className="px-3 py-1.5 bg-white/30 dark:bg-black/20 backdrop-blur-md rounded-full text-[10px] uppercase tracking-widest text-indie-text font-medium">React Native</span>
                  <span className="px-3 py-1.5 bg-white/30 dark:bg-black/20 backdrop-blur-md rounded-full text-[10px] uppercase tracking-widest text-indie-text font-medium">Node.js</span>
                  <span className="px-3 py-1.5 bg-white/30 dark:bg-black/20 backdrop-blur-md rounded-full text-[10px] uppercase tracking-widest text-indie-text font-medium">MongoDB</span>
                </div>
              </div>
              <span className="text-indie-muted text-[11px] tracking-[0.1em] font-medium uppercase mb-2">{T.projects.p4_cat}</span>
              <h3 className="text-xl font-serif text-indie-text mb-2 transition-colors duration-500">{T.projects.p4_title}</h3>
              <p className="text-indie-muted text-[13px] font-light leading-relaxed">
                {T.projects.p4_desc}
              </p>
            </div>
          </div>
        </section>

        <Contact t={T.contact} showNotification={showNotification} lang={lang} className={`transition-all duration-1000 ${visibleSections.has('contact') ? 'animate-fade-in' : 'opacity-0'}`} />
      </main>

      {/* Presentation Modal */}
      {selectedPresentation && (
        <div className={`fixed inset-0 z-[300] flex items-center justify-center p-4 md:p-10 transition-all duration-500`}>
          {/* Transparent Blurred Background */}
          <div
            className={`absolute inset-0 backdrop-blur-3xl transition-opacity duration-500 ${isClosing ? 'opacity-0' : 'opacity-100'} ${isDarkMode ? 'bg-black/20' : 'bg-white/10'}`}
            onClick={closePresentation}
          />

          <div className={`relative w-full h-full max-w-6xl bg-white/5 dark:bg-black/5 rounded-3xl overflow-hidden border border-white/20 dark:border-white/10 shadow-[0_0_100px_rgba(0,0,0,0.1)] flex flex-col transition-all duration-500 ${isClosing ? 'opacity-0 scale-95 blur-md' : 'opacity-100 scale-100 blur-0 animate-modal-pop'}`}>
            <div className="absolute top-6 right-6 z-20">
              <button
                onClick={closePresentation}
                className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 dark:bg-black/20 dark:hover:bg-black/30 backdrop-blur-xl border border-white/30 dark:border-white/10 flex items-center justify-center text-indie-text dark:text-white transition-all hover:scale-110 active:scale-90"
              >
                <span className="text-xl">✕</span>
              </button>
            </div>

            <iframe
              src={selectedPresentation}
              className="w-full h-full border-none relative z-10"
              title="Project Presentation"
            />
          </div>
        </div>
      )}
    </div>
  );
}
export default App;