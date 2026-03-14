'use client';

import { useTranslations } from 'next-intl';
import { Leaf, Target, BookOpen, Eye } from 'lucide-react';
import { motion } from 'framer-motion';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import PageTransition from '@/components/ui/PageTransition';
import CountUp from '@/components/ui/CountUp';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  }),
};

export default function AboutPage() {
  const t = useTranslations('about');

  const impactStats = [
    { end: 10000, suffix: '+',  decimals: 0, label: t('impact1_label') },
    { end: 2.5,   suffix: ' t', decimals: 1, label: t('impact2_label') },
    { end: 150,   suffix: '+',  decimals: 0, label: t('impact3_label') },
    { end: 50000, suffix: '+',  decimals: 0, label: t('impact4_label') },
  ];

  return (
    <PageTransition>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="bg-gradient-to-br from-emerald-600 to-teal-700 text-white py-20 px-6">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex p-4 rounded-2xl bg-white/10 mb-6">
              <Leaf className="w-8 h-8 text-emerald-200" />
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight mb-5">
              {t('hero_title')}
            </h1>
            <p className="text-lg text-emerald-100 max-w-xl mx-auto">
              {t('hero_subtitle')}
            </p>
          </div>
        </section>

        {/* Mission */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={fadeUp}
          className="py-20 px-6 bg-white"
        >
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-3 mb-5">
              <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-600">
                <Target className="w-5 h-5" />
              </div>
              <h2 className="text-2xl font-extrabold text-slate-900">{t('mission_title')}</h2>
            </div>
            <p className="text-slate-600 text-lg leading-relaxed">{t('mission_text')}</p>
          </div>
        </motion.section>

        {/* Impact stats */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={fadeUp}
          className="py-16 px-6 bg-[#FAD6CC]"
        >
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-extrabold text-center text-slate-900 mb-10">{t('impact_title')}</h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {impactStats.map(({ end, suffix, decimals, label }, i) => (
                <motion.div key={label} custom={i} variants={fadeUp} className="text-center">
                  <p className="text-3xl sm:text-4xl font-extrabold mb-1 text-[#E8594F]">
                    <CountUp end={end} suffix={suffix} decimals={decimals} />
                  </p>
                  <p className="text-sm text-slate-600 font-medium">{label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Story */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={fadeUp}
          className="py-20 px-6 bg-white"
        >
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-3 mb-5">
              <div className="p-2.5 rounded-xl bg-amber-50 text-amber-600">
                <BookOpen className="w-5 h-5" />
              </div>
              <h2 className="text-2xl font-extrabold text-slate-900">{t('story_title')}</h2>
            </div>
            <p className="text-slate-600 text-lg leading-relaxed">{t('story_text')}</p>
          </div>
        </motion.section>

        {/* Team */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={fadeUp}
          className="py-20 px-6 bg-[#F5ECDE]"
        >
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-extrabold text-slate-900 text-center mb-10">{t('team_title')}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                { name: t('founder1_name'), role: t('founder1_role'), initials: 'MS', color: 'bg-[#E8594F]' },
                { name: t('founder2_name'), role: t('founder2_role'), initials: 'SA', color: 'bg-[#E8594F]' },
              ].map(({ name, role, initials, color }, i) => (
                <motion.div
                  key={name}
                  custom={i}
                  variants={fadeUp}
                  className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 flex items-center gap-4 hover:shadow-md transition-shadow"
                >
                  <div className={`shrink-0 w-14 h-14 rounded-2xl ${color} text-white font-extrabold text-xl flex items-center justify-center`}>
                    {initials}
                  </div>
                  <div>
                    <p className="font-bold text-slate-900">{name}</p>
                    <p className="text-sm text-slate-500">{role}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Vision */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={fadeUp}
          className="py-20 px-6 bg-white"
        >
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-3 mb-5">
              <div className="p-2.5 rounded-xl bg-violet-50 text-violet-600">
                <Eye className="w-5 h-5" />
              </div>
              <h2 className="text-2xl font-extrabold text-slate-900">{t('vision_title')}</h2>
            </div>
            <p className="text-slate-600 text-lg leading-relaxed">{t('vision_text')}</p>
          </div>
        </motion.section>
      </main>
      <Footer />
    </PageTransition>
  );
}
