'use client';

import { useTranslations } from 'next-intl';
import { Leaf, Target, BookOpen, Eye } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import PageTransition from '@/components/ui/PageTransition';

export default function AboutPage() {
  const t = useTranslations('about');

  const impactStats = [
    { value: t('impact1_value'), label: t('impact1_label'), color: 'text-emerald-600' },
    { value: t('impact2_value'), label: t('impact2_label'), color: 'text-green-600' },
    { value: t('impact3_value'), label: t('impact3_label'), color: 'text-blue-600' },
    { value: t('impact4_value'), label: t('impact4_label'), color: 'text-violet-600' },
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
        <section className="py-20 px-6 bg-white">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-3 mb-5">
              <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-600">
                <Target className="w-5 h-5" />
              </div>
              <h2 className="text-2xl font-extrabold text-slate-900">{t('mission_title')}</h2>
            </div>
            <p className="text-slate-600 text-lg leading-relaxed">{t('mission_text')}</p>
          </div>
        </section>

        {/* Impact stats */}
        <section className="py-16 px-6 bg-slate-900 text-white">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-extrabold text-center mb-10">{t('impact_title')}</h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {impactStats.map(({ value, label, color }) => (
                <div key={label} className="text-center">
                  <p className={`text-3xl sm:text-4xl font-extrabold mb-1 ${color}`}>{value}</p>
                  <p className="text-sm text-slate-400 font-medium">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Story */}
        <section className="py-20 px-6 bg-white">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-3 mb-5">
              <div className="p-2.5 rounded-xl bg-amber-50 text-amber-600">
                <BookOpen className="w-5 h-5" />
              </div>
              <h2 className="text-2xl font-extrabold text-slate-900">{t('story_title')}</h2>
            </div>
            <p className="text-slate-600 text-lg leading-relaxed">{t('story_text')}</p>
          </div>
        </section>

        {/* Team */}
        <section className="py-20 px-6 bg-slate-50">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-extrabold text-slate-900 text-center mb-10">{t('team_title')}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                { name: t('founder1_name'), role: t('founder1_role'), initials: 'MS', color: 'bg-emerald-600' },
                { name: t('founder2_name'), role: t('founder2_role'), initials: 'SA', color: 'bg-blue-600' },
              ].map(({ name, role, initials, color }) => (
                <div key={name} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 flex items-center gap-4">
                  <div className={`shrink-0 w-14 h-14 rounded-2xl ${color} text-white font-extrabold text-xl flex items-center justify-center`}>
                    {initials}
                  </div>
                  <div>
                    <p className="font-bold text-slate-900">{name}</p>
                    <p className="text-sm text-slate-500">{role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Vision */}
        <section className="py-20 px-6 bg-white">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-3 mb-5">
              <div className="p-2.5 rounded-xl bg-violet-50 text-violet-600">
                <Eye className="w-5 h-5" />
              </div>
              <h2 className="text-2xl font-extrabold text-slate-900">{t('vision_title')}</h2>
            </div>
            <p className="text-slate-600 text-lg leading-relaxed">{t('vision_text')}</p>
          </div>
        </section>
      </main>
      <Footer />
    </PageTransition>
  );
}
