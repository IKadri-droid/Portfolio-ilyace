import React from 'react';
import { Github, Linkedin, Mail, Shield, Settings, FileText, Send, Briefcase } from 'lucide-react';

const SideBar = ({ activeSection, t, showNotification, lang }) => {
  const email = "ilyace.kadri@exemple.com"; // Adjust if you have a real one

  const copyEmail = (e) => {
    e.preventDefault();
    navigator.clipboard.writeText("ilyace1999@gmail.com");
    const msg = {
      fr: 'Email copié !',
      en: 'Email copied!',
      es: '¡Email copiado!',
      ar: 'تم نسخ البريد!'
    }[lang] || 'Copied';
    showNotification(msg);
  };

  return (
    <aside className={`fixed ${lang === 'ar' ? 'right-8 md:right-10' : 'left-8 md:left-10'} top-1/2 -translate-y-1/2 z-[100] hidden md:flex flex-col items-center gap-5 bg-white/40 dark:bg-black/20 backdrop-blur-md py-6 px-3 rounded-2xl border border-white/60 dark:border-white/10 shadow-glass transition-all duration-1000`}>
      <div className="w-px h-6 bg-gradient-to-b from-transparent via-indie-muted/30 to-transparent" />
      <div className="flex flex-col gap-6">
        {[
          { id: 'hero', label: t.profil, icon: Shield },
          { id: 'stack', label: t.stack, icon: Settings },
          { id: 'cv', label: t.cv, icon: Briefcase },
          { id: 'projects', label: t.projects, icon: FileText },
          { id: 'contact', label: t.contact, icon: Send }
        ].map((item) => (
          <a key={item.id} href={`#${item.id}`} className="relative group/icon flex items-center justify-center w-8 h-8 rounded-lg transition-all duration-300">
            <div className={`absolute inset-0 rounded-lg bg-indie-primary/5 dark:bg-indie-primary/10 transition-all ${activeSection === item.id ? 'scale-100' : 'scale-0 group-hover/icon:scale-100'}`} />
            <item.icon className={`w-[19px] h-[19px] relative z-10 transition-all duration-500 ${activeSection === item.id ? 'text-indie-primary' : 'text-indie-muted group-hover/icon:text-indie-text'}`} />

            <span className={`absolute ${lang === 'ar' ? 'right-12' : 'left-12'} px-3 py-1.5 bg-indie-text text-indie-bg text-[10px] tracking-[0.2em] uppercase rounded-full opacity-0 ${lang === 'ar' ? 'translate-x-3' : '-translate-x-3'} group-hover/icon:opacity-100 group-hover/icon:translate-x-0 transition-all duration-500 pointer-events-none whitespace-nowrap shadow-xl font-bold`}>
              {item.label}
            </span>
          </a>
        ))}
      </div>
      <div className="w-px h-6 bg-gradient-to-b from-transparent via-indie-muted/30 to-transparent" />
      <div className="flex flex-col gap-5 mt-2">
        <a href="https://github.com/IKadri-droid" target="_blank" rel="noopener noreferrer" className="text-indie-muted hover:text-indie-primary hover:-translate-y-0.5 transition-all duration-300" title="GitHub"><Github className="w-[18px] h-[18px]" /></a>
        <a href="https://www.linkedin.com/in/ilyace-kadri-ab2383194/" target="_blank" rel="noopener noreferrer" className="text-indie-muted hover:text-indie-primary hover:-translate-y-0.5 transition-all duration-300" title="LinkedIn"><Linkedin className="w-[18px] h-[18px]" /></a>
        <button onClick={copyEmail} className="text-indie-muted hover:text-indie-primary hover:-translate-y-0.5 transition-all duration-300" title="Copy Email"><Mail className="w-[18px] h-[18px]" /></button>
      </div>
    </aside>
  );
};
export default SideBar;
