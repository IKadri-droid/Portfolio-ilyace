import React from 'react';

const Experience = ({ className }) => {
    const experiences = [
        {
            title: "Educateur sportif",
            company: "CREPS d'Ile de France",
            period: "2024 — 2025",
            description: "Encadrement de groupes d'enfants et d'adolescents lors de stages sportifs.",
            type: "exp"
        },
        {
            title: "Bachelor Cybersécurité",
            company: "Ynov Campus",
            period: "2025 — 2026",
            description: "Formation en réseaux, systèmes, et sécurité informatique.",
            type: "edu"
        }
    ];

    return (
        <section id="cv" className={`min-h-screen py-32 px-8 sm:px-12 flex flex-col justify-center relative ${className}`}>
            <div className="max-w-4xl w-full">
                <div className="mb-20">
                    <h2 className="text-[16px] font-semibold tracking-[0.2em] text-indie-primary uppercase mb-2">Parcours</h2>
                    <h3 className="text-4xl font-serif text-indie-text">Expériences & Formation</h3>
                    <div className="w-12 h-px bg-indie-primary/30 mt-6" />
                </div>

                <div className="relative border-l border-indie-muted/20 pl-10 space-y-16 ml-2">
                    {experiences.map((item, index) => (
                        <div key={index} className="relative group">
                            {/* Dot / Indicator */}
                            <div className="absolute -left-[45px] top-1.5 w-[9px] h-[9px] bg-white border-2 border-indie-primary rounded-full z-10 group-hover:scale-150 transition-transform duration-500 shadow-sm" />

                            <div className="flex flex-col md:flex-row gap-4 md:gap-12 items-start md:items-baseline">
                                <div className="md:w-32 flex-shrink-0">
                                    <span className="text-indie-muted text-[17px] tracking-[0.1em] font-medium uppercase">{item.period}</span>
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-2xl font-serif text-indie-text mb-1 group-hover:text-indie-primary transition-colors">
                                        {item.title}
                                    </h3>
                                    <p className="text-indie-accent text-[18px] uppercase tracking-widest font-medium mb-3">{item.company}</p>
                                    <p className="text-indie-muted text-[18px] font-light leading-relaxed max-w-xl">
                                        {item.description}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Experience;
