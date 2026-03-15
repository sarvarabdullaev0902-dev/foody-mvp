'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Clock, CheckCircle, Send } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import PageTransition from '@/components/ui/PageTransition';

const SOCIAL = [
  { name: 'Instagram', href: 'https://instagram.com/foody.uz', color: '#E4405F' },
  { name: 'Telegram',  href: 'https://t.me/foody_uz',          color: '#26A5E4' },
  { name: 'TikTok',   href: 'https://tiktok.com/@foody.uz',    color: '#EE1D52' },
  { name: 'Facebook', href: 'https://facebook.com/foody.uz',   color: '#1877F2' },
  { name: 'YouTube',  href: 'https://youtube.com/@foody_uz',   color: '#FF0000' },
  { name: 'X',        href: 'https://x.com/foody_uz',          color: '#888888' },
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
                  src="https://www.openstreetmap.org/export/embed.html?bbox=69.300%2C41.295%2C69.340%2C41.325&layer=mapnik&marker=41.3100%2C69.3200"
                  width="100%"
                  height="100%"
                  style={{ border: 0, minHeight: 300 }}
                  loading="lazy"
                  title="Foody location"
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
              {SOCIAL.map(({ name, href, color }) => (
                <a
                  key={name}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center gap-2 group"
                >
                  <span
                    className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-500 font-bold text-xs transition-all duration-200 group-hover:scale-110"
                    style={{ color }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.backgroundColor = color + '20';
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.backgroundColor = '';
                    }}
                  >
                    {name.slice(0, 2)}
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
