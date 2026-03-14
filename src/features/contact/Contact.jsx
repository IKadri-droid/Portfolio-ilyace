import React, { useState } from 'react';
import emailjs from '@emailjs/browser';

const Contact = ({ className, t, showNotification, lang }) => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    // Si les clés ne sont pas encore configurées, on prévient l'utilisateur (vous)
    if (!serviceId || serviceId === 'your_service_id') {
      setIsSubmitting(false);
      showNotification(lang === 'fr' ? '⚙️ Configurez vos clés dans le fichier .env' : '⚙️ Configure your keys in .env');
      return;
    }

    const templateParams = {
      from_name: formData.name,
      reply_to: formData.email,
      message: formData.message,
      to_name: 'Ilyace',
    };

    emailjs.send(serviceId, templateId, templateParams, publicKey)
      .then(() => {
        setIsSubmitting(false);
        setFormData({ name: '', email: '', message: '' });
        showNotification(lang === 'fr' ? '🚀 Message envoyé avec succès !' : '🚀 Message sent successfully!');
      })
      .catch((err) => {
        setIsSubmitting(false);
        console.error('EmailJS Error:', err);
        showNotification(lang === 'fr' ? '❌ Erreur d\'envoi' : '❌ Send error');
      });
  };

  return (
    <section id="contact" className={`min-h-screen py-32 px-8 sm:px-12 flex flex-col justify-center ${className}`}>
      <div className="w-full max-w-3xl">
        <div className="text-left mb-16">
          <h2 className="text-[16px] font-semibold tracking-[0.2em] text-indie-primary uppercase mb-2">
            {{ fr: 'Contact', en: 'Connect', es: 'Conectemos', ar: 'تواصل معي' }[lang]}
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
              {{ fr: 'Nom / Prénom', en: 'Name / Full Name', es: 'Nombre / Apellido', ar: 'الاسم الكامل' }[lang]}
            </label>
            <input
              type="text" required
              className="w-full bg-white/60 dark:bg-black/20 border border-slate-200 dark:border-white/10 rounded-2xl py-4 px-6 outline-none focus:border-indie-primary focus:bg-indie-surface shadow-sm transition-all duration-300 text-indie-text text-[16px] font-light placeholder:text-indie-muted/40 cursor-none"
              value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-[17px] uppercase tracking-widest text-indie-muted mb-3 ml-1">
              {{ fr: 'Adresse Email', en: 'Email Address', es: 'Correo Electrónico', ar: 'البريد الإلكتروني' }[lang]}
            </label>
            <input
              type="email" required placeholder="example@mail.com"
              className="w-full bg-white/60 dark:bg-black/20 border border-slate-200 dark:border-white/10 rounded-2xl py-4 px-6 outline-none focus:border-indie-primary focus:bg-indie-surface shadow-sm transition-all duration-300 text-indie-text text-[16px] font-light placeholder:text-indie-muted/40 cursor-none"
              value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-[17px] uppercase tracking-widest text-indie-muted mb-3 ml-1">
              {{ fr: 'Message', en: 'Message', es: 'Mensaje', ar: 'الرسالة' }[lang]}
            </label>
            <textarea
              rows="4" required
              className="w-full bg-white/60 dark:bg-black/20 border border-slate-200 dark:border-white/10 rounded-2xl py-4 px-6 outline-none focus:border-indie-primary focus:bg-indie-surface shadow-sm transition-all duration-300 text-indie-text text-[16px] font-light resize-none placeholder:text-indie-muted/40 cursor-none"
              value={formData.message} onChange={e => setFormData({ ...formData, message: e.target.value })}
            />
          </div>
          <button className="w-full mt-2 py-4 bg-indie-text text-indie-bg rounded-2xl hover:bg-indie-primary hover:-translate-y-0.5 hover:shadow-lg hover:shadow-indie-primary/10 transition-all duration-500 uppercase tracking-[0.2em] text-[17px] font-medium shadow-md flex justify-center items-center cursor-none group">
            {isSubmitting ? (
              <span className="opacity-80">{{ fr: 'Envoi en cours...', en: 'Sending...', es: 'Enviando...', ar: 'جاري الإرسال...' }[lang]}</span>
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