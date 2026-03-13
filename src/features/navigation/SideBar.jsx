import React from 'react';
import { Github, Linkedin, Mail, Shield, Settings, FileText, Send, Briefcase } from 'lucide-react';

const SideBar = ({ activeSection }) => (
  <aside className="fixed left-8 md:left-10 top-1/2 -translate-y-1/2 z-[100] hidden md:flex flex-col items-center gap-5 bg-white/40 dark:bg-black/20 backdrop-blur-md py-6 px-3 rounded-2xl border border-white/60 dark:border-white/10 shadow-glass transition-all duration-1000">
    <div className="w-px h-6 bg-gradient-to-b from-transparent via-indie-muted/30 to-transparent" />
    <div className="flex flex-col gap-6">
      {[
        { id: 'hero', label: 'profil', icon: Shield },
        { id: 'stack', label: 'stack', icon: Settings },
        { id: 'cv', label: 'cv', icon: Briefcase },
        { id: 'projects', label: 'projets', icon: FileText },
        { id: 'contact', label: 'contact', icon: Send }
      ].map((item) => (
        <a key={item.id} href={`#${item.id}`} className="relative group/icon flex items-center justify-center w-8 h-8 rounded-lg transition-all duration-300">
          <div className={`absolute inset-0 rounded-lg bg-indie-text/5 dark:bg-indie-text/10 transition-all ${activeSection === item.id ? 'scale-100' : 'scale-0 group-hover/icon:scale-100'}`} />
          <item.icon className={`w-[18px] h-[18px] relative z-10 transition-all duration-500 ${activeSection === item.id ? 'text-indie-primary' : 'text-indie-muted group-hover/icon:text-indie-text'}`} />
          
          <span className="absolute left-10 px-2 py-1 bg-indie-text text-indie-bg text-[18px] tracking-widest uppercase rounded opacity-0 -translate-x-3 group-hover/icon:opacity-100 group-hover/icon:translate-x-0 transition-all duration-300 pointer-events-none whitespace-nowrap shadow-sm">
            {item.label}
          </span>
        </a>
      ))}
    </div>
    <div className="w-px h-6 bg-gradient-to-b from-transparent via-indie-muted/30 to-transparent" />
    <div className="flex flex-col gap-5 mt-2">
      <a href="https://github.com/IKadri-droid" target="_blank" rel="noopener noreferrer" className="text-indie-muted hover:text-indie-text hover:-translate-y-0.5 transition-all"><Github className="w-4 h-4" /></a>
      <a href="https://www.linkedin.com/in/ilyace-kadri-ab2383194/" target="_blank" rel="noopener noreferrer" className="text-indie-muted hover:text-indie-text hover:-translate-y-0.5 transition-all"><Linkedin className="w-4 h-4" /></a>
      <a href="mailto:votre.email@exemple.com" className="text-indie-muted hover:text-indie-text hover:-translate-y-0.5 transition-all"><Mail className="w-4 h-4" /></a>
    </div>
  </aside>
);
export default SideBar;
