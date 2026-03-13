import { SiKalilinux, SiPython, SiLinux, SiGithub, SiGit, SiDocker, SiGnubash, SiGo, SiReact, SiTypescript, SiTailwindcss, SiJavascript, SiNodedotjs, SiMongodb, SiPostgresql } from 'react-icons/si';
import { VscCode } from 'react-icons/vsc';

const Stack = ({ className, t }) => {
  const technologies = [
    { name: 'Golang', icon: SiGo, description: t.golang },
    { name: 'React', icon: SiReact, description: t.react },
    { name: 'TypeScript', icon: SiTypescript, description: t.ts },
    { name: 'Python', icon: SiPython, description: t.python },
    { name: 'Docker', icon: SiDocker, description: t.docker },
    { name: 'Linux', icon: SiLinux, description: t.linux },
    { name: 'Kali Linux', icon: SiKalilinux, description: t.kali },
    { name: 'Bash', icon: SiGnubash, description: t.bash },
  ];

  const arsenal = [
    { icon: SiGo, label: "Golang" },
    { icon: SiReact, label: "React" },
    { icon: SiTypescript, label: "TypeScript" },
    { icon: SiJavascript, label: "JavaScript" },
    { icon: SiTailwindcss, label: "Tailwind" },
    { icon: SiNodedotjs, label: "Node.js" },
    { icon: SiMongodb, label: "MongoDB" },
    { icon: SiPostgresql, label: "PostgreSQL" },
    { icon: SiGithub, label: "GitHub" },
    { icon: SiGit, label: "Git" },
    { icon: SiDocker, label: "Docker" },
    { icon: SiLinux, label: "Linux" },
    { icon: SiKalilinux, label: "Kali" },
    { icon: SiGnubash, label: "Bash" },
    { icon: VscCode, label: "VS Code" },
  ];

  return (
    <section id="stack" className={`py-32 px-8 sm:px-12 flex flex-col justify-center ${className}`}>
      <div className="mb-16">
        <h2 className="text-[16px] font-semibold tracking-[0.2em] text-indie-primary uppercase mb-2">{t.title}</h2>
        <h3 className="text-4xl font-serif text-indie-text transition-colors duration-500">{t.subtitle}</h3>
        <div className="w-12 h-px bg-indie-primary/30 mt-6" />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-24">
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

      {/* Interactive Arsenal Marquee */}
      <div className="relative py-12 px-4 bg-white/30 dark:bg-black/10 backdrop-blur-md border border-white/60 dark:border-white/5 rounded-[40px] overflow-hidden shadow-glass group/arsenal">
        <div className="absolute top-4 left-1/2 -translate-x-1/2 flex items-center gap-2 mb-8 opacity-40 group-hover/arsenal:opacity-80 transition-opacity">
          <span className="w-1.5 h-1.5 rounded-full bg-indie-primary animate-pulse" />
          <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-indie-text">{t.arsenal_title}</p>
          <span className="w-1.5 h-1.5 rounded-full bg-indie-primary animate-pulse" />
        </div>

        <div className="flex gap-12 animate-marquee whitespace-nowrap pt-8">
          {[...arsenal, ...arsenal].map((item, idx) => (
            <div key={idx} className="flex items-center gap-4 px-8 py-4 bg-white/40 dark:bg-white/5 border border-white/60 dark:border-white/5 rounded-2xl hover:border-indie-primary/40 hover:bg-indie-primary/5 transition-all duration-500">
              <item.icon className="w-6 h-6 text-indie-text group-hover/arsenal:text-indie-primary transition-colors" />
              <span className="text-[13px] font-medium tracking-wider uppercase text-indie-text">{item.label}</span>
            </div>
          ))}
        </div>

        {/* Gradient overlays for smooth fading edges */}
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-indie-bg/90 to-transparent pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-indie-bg/90 to-transparent pointer-events-none" />
      </div>
    </section>
  );
};

export default Stack;
