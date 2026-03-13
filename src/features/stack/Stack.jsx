import { SiKalilinux, SiPython, SiLinux, SiGithub, SiGit, SiDocker, SiGnubash } from 'react-icons/si';
import { VscCode } from 'react-icons/vsc';

const Stack = ({ className, t }) => {
  const technologies = [
    { name: 'Kali Linux', icon: SiKalilinux, description: t.kali },
    { name: 'Python', icon: SiPython, description: t.python },
    { name: 'Linux', icon: SiLinux, description: t.linux },
    { name: 'GitHub', icon: SiGithub, description: t.github },
    { name: 'VS Code', icon: VscCode, description: t.vscode },
    { name: 'Git', icon: SiGit, description: t.git },
    { name: 'Docker', icon: SiDocker, description: t.docker },
    { name: 'Bash', icon: SiGnubash, description: t.bash },
  ];

  return (
    <section id="stack" className={`min-h-screen py-32 px-8 sm:px-12 flex flex-col justify-center ${className}`}>
      <div className="mb-16">
        <h2 className="text-[16px] font-semibold tracking-[0.2em] text-indie-primary uppercase mb-2">{t.title}</h2>
        <h3 className="text-4xl font-serif text-indie-text transition-colors duration-500">{t.subtitle}</h3>
        <div className="w-12 h-px bg-indie-primary/30 mt-6" />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {technologies.map((tech, idx) => (
          <div key={idx} className="flex flex-col items-start p-6 bg-white/40 dark:bg-black/20 backdrop-blur-md border border-white/60 dark:border-white/10 rounded-3xl shadow-ethereal hover:shadow-ethereal-hover hover:-translate-y-1 transition-all duration-500 group cursor-none">
            <div className="w-10 h-10 bg-indie-surface rounded-xl flex items-center justify-center mb-6 shadow-sm border border-slate-100 dark:border-white/5 group-hover:border-indie-primary/30 transition-colors duration-500">
              <tech.icon className="w-5 h-5 text-indie-muted group-hover:text-indie-primary transition-colors" />
            </div>
            <h3 className="text-[17px] font-semibold tracking-wider uppercase text-indie-text mb-2 transition-colors duration-500">{tech.name}</h3>
            <p className="text-[17px] text-indie-muted leading-relaxed font-light">{tech.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Stack;
