'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Clock, CheckCircle, Send } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import PageTransition from '@/components/ui/PageTransition';

const SOCIAL = [
  {
    name: 'Instagram',
    href: 'https://instagram.com/foody.uz',
    color: '#E4405F',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    ),
  },
  {
    name: 'Telegram',
    href: 'https://t.me/foody_uz',
    color: '#26A5E4',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
      </svg>
    ),
  },
  {
    name: 'TikTok',
    href: 'https://tiktok.com/@foody.uz',
    color: '#000000',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.79a8.18 8.18 0 004.78 1.52V6.87a4.85 4.85 0 01-1.01-.18z" />
      </svg>
    ),
  },
  {
    name: 'Facebook',
    href: 'https://facebook.com/foody.uz',
    color: '#1877F2',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
  {
    name: 'YouTube',
    href: 'https://youtube.com/@foody_uz',
    color: '#FF0000',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
  {
    name: 'X',
    href: 'https://x.com/foody_uz',
    color: '#000000',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  }),
};

export default function ContactPage() {
  const t = useTranslations('contact');

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'general',
    message: '',
  });
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSent(true);
    }, 1200);
  }

  const infoCards = [
    { Icon: Phone, title: t('phone_title'), value: t('phone_value'), href: 'tel:+998711234567' },
    { Icon: Mail,  title: t('email_title'), value: t('email_value'), href: 'mailto:info@foody.uz' },
    { Icon: MapPin, title: t('address_title'), value: t('address_value'), href: null },
    { Icon: Clock,  title: t('hours_title'),   value: t('hours_value'),   href: null },
  ];

  return (
    <PageTransition>
      <div className="min-h-screen bg-[#F5ECDE]">
        <Navbar />

        {/* Hero */}
        <section className="bg-[#E8594F] text-white py-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4"
            >
              {t('hero_title')}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-lg text-red-100 max-w-xl mx-auto"
            >
              {t('hero_subtitle')}
            </motion.p>
          </div>
        </section>

        <div className="max-w-5xl mx-auto px-4 py-14">
          {/* Info cards */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-14"
          >
            {infoCards.map(({ Icon, title, value, href }, i) => (
              <motion.div
                key={title}
                custom={i}
                variants={fadeUp}
                className="bg-white rounded-2xl p-6 flex flex-col gap-3 shadow-sm border border-slate-100"
              >
                <div className="w-11 h-11 rounded-xl bg-[#FAD6CC] flex items-center justify-center">
                  <Icon className="w-5 h-5 text-[#E8594F]" />
                </div>
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">{title}</p>
                {href ? (
                  <a href={href} className="text-sm font-semibold text-slate-800 hover:text-[#E8594F] transition-colors leading-snug">
                    {value}
                  </a>
                ) : (
                  <p className="text-sm font-semibold text-slate-800 leading-snug">{value}</p>
                )}
              </motion.div>
            ))}
          </motion.div>

          {/* Form + Map */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-14">
            {/* Contact form */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100"
            >
              <h2 className="text-xl font-bold text-slate-900 mb-6">{t('form_title')}</h2>

              {sent ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center gap-4 py-10 text-center"
                >
                  <CheckCircle className="w-16 h-16 text-[#E8594F]" />
                  <p className="text-xl font-bold text-slate-800">{t('form_success_title')}</p>
                  <p className="text-slate-500 text-sm">{t('form_success_text')}</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-semibold text-slate-500">{t('form_name')}</label>
                      <input
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        required
                        className="px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#E8594F] focus:border-transparent transition"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-semibold text-slate-500">{t('form_email')}</label>
                      <input
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        required
                        className="px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#E8594F] focus:border-transparent transition"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-semibold text-slate-500">{t('form_phone')}</label>
                      <input
                        name="phone"
                        type="tel"
                        value={form.phone}
                        onChange={handleChange}
                        className="px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#E8594F] focus:border-transparent transition"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-semibold text-slate-500">{t('form_subject')}</label>
                      <select
                        name="subject"
                        value={form.subject}
                        onChange={handleChange}
                        className="px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#E8594F] focus:border-transparent transition bg-white"
                      >
                        <option value="general">{t('form_subject_general')}</option>
                        <option value="partnership">{t('form_subject_partnership')}</option>
                        <option value="complaint">{t('form_subject_complaint')}</option>
                        <option value="other">{t('form_subject_other')}</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-slate-500">{t('form_message')}</label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#E8594F] focus:border-transparent transition resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="mt-1 bg-[#E8594F] hover:bg-[#D14840] text-white font-bold py-3 px-6 rounded-xl flex items-center justify-center gap-2 transition-colors disabled:opacity-60"
                  >
                    {submitting ? (
                      <span className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                    ) : (
                      <Send className="w-4 h-4" />
                    )}
                    {t('form_send')}
                  </button>
                </form>
              )}
            </motion.div>

            {/* Map */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={1}
              variants={fadeUp}
              className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 flex flex-col"
            >
              <div className="p-6 pb-3">
                <h2 className="text-xl font-bold text-slate-900">{t('map_title')}</h2>
              </div>
              <div className="flex-1 min-h-[300px]">
                <iframe
                  src="https://www.openstreetmap.org/export/embed.html?bbox=69.30496%2C41.29503%2C69.32496%2C41.31103&layer=mapnik&marker=41.30303%2C69.31496"
                  width="100%"
                  height="100%"
                  style={{ border: 0, minHeight: 300 }}
                  loading="lazy"
                  title="Foody Moody location"
                />
              </div>
            </motion.div>
          </div>

          {/* Social media */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100 text-center"
          >
            <h2 className="text-xl font-bold text-slate-900 mb-6">{t('social_title')}</h2>
            <div className="flex items-center justify-center gap-4 flex-wrap">
              {SOCIAL.map(({ name, href, color, icon }) => (
                <a
                  key={name}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center gap-2 group"
                >
                  <span
                    className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400 transition-all duration-200 group-hover:scale-110"
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.color = color;
                      (e.currentTarget as HTMLElement).style.backgroundColor = color + '20';
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.color = '';
                      (e.currentTarget as HTMLElement).style.backgroundColor = '';
                    }}
                  >
                    {icon}
                  </span>
                  <span className="text-xs font-medium text-slate-500 group-hover:text-slate-700 transition-colors">{name}</span>
                </a>
              ))}
            </div>
          </motion.div>
        </div>

        <Footer />
      </div>
    </PageTransition>
  );
}
