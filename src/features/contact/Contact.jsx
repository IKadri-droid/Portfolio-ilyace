import React, { useState } from 'react';

const Contact = ({ className, t }) => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Determine language from t.title
  const isEn = t.title === 'Contact';

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setFormData({ name: '', email: '', message: '' });
      alert(isEn ? 'Message sent successfully.' : 'Message envoyé avec succès.');
    }, 1500);
  };

  return (
    <section id="contact" className={`min-h-screen py-32 px-8 sm:px-12 flex flex-col justify-center ${className}`}>
      <div className="w-full max-w-3xl">
        <div className="text-left mb-16">
          <h2 className="text-[16px] font-semibold tracking-[0.2em] text-indie-primary uppercase mb-2">
            {isEn ? 'Connect' : 'Échangeons'}
          </h2>
          <h3 className="text-4xl font-serif text-indie-text transition-colors duration-500">{t.subtitle}</h3>
          <div className="w-12 h-px bg-indie-primary/30 mt-6" />
          <p className="mt-8 text-indie-muted text-[15px] font-light">
            {t.description}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 bg-white/40 dark:bg-black/20 backdrop-blur-md p-8 sm:p-12 rounded-[2.5rem] border border-white/60 dark:border-white/10 shadow-glass transition-all duration-1000 cursor-none">
          <div>
            <label className="block text-[17px] uppercase tracking-widest text-indie-muted mb-3 ml-1">
              {isEn ? 'Name / Firstname' : 'Nom / Prénom'}
            </label>
            <input
              type="text" required
              className="w-full bg-white/60 dark:bg-black/20 border border-slate-200 dark:border-white/10 rounded-2xl py-4 px-6 outline-none focus:border-indie-primary focus:bg-indie-surface shadow-sm transition-all duration-300 text-indie-text text-[16px] font-light placeholder:text-indie-muted/40 cursor-none"
              value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-[17px] uppercase tracking-widest text-indie-muted mb-3 ml-1">
              {isEn ? 'Email Address' : 'Adresse Email'}
            </label>
            <input
              type="email" required placeholder="test@gmail.com"
              className="w-full bg-white/60 dark:bg-black/20 border border-slate-200 dark:border-white/10 rounded-2xl py-4 px-6 outline-none focus:border-indie-primary focus:bg-indie-surface shadow-sm transition-all duration-300 text-indie-text text-[16px] font-light placeholder:text-indie-muted/40 cursor-none"
              value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-[17px] uppercase tracking-widest text-indie-muted mb-3 ml-1">Message</label>
            <textarea
              rows="4" required
              className="w-full bg-white/60 dark:bg-black/20 border border-slate-200 dark:border-white/10 rounded-2xl py-4 px-6 outline-none focus:border-indie-primary focus:bg-indie-surface shadow-sm transition-all duration-300 text-indie-text text-[16px] font-light resize-none placeholder:text-indie-muted/40 cursor-none"
              value={formData.message} onChange={e => setFormData({ ...formData, message: e.target.value })}
            />
          </div>
          <button className="w-full mt-2 py-4 bg-indie-text text-indie-bg rounded-2xl hover:bg-indie-primary hover:-translate-y-0.5 hover:shadow-lg hover:shadow-indie-primary/10 transition-all duration-500 uppercase tracking-[0.2em] text-[17px] font-medium shadow-md flex justify-center items-center cursor-none group">
            {isSubmitting ? (
              <span className="opacity-80">{isEn ? 'Sending...' : 'Envoi en cours...'}</span>
            ) : (
              <span className="group-hover:tracking-[0.25em] transition-all duration-500">{t.email_me}</span>
            )}
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;