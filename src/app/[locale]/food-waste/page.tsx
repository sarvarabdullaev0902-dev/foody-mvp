'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Wind, DollarSign, Heart, Leaf } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import PageTransition from '@/components/ui/PageTransition';

export default function FoodWastePage() {
  const t = useTranslations('food_waste');

  const stats = [
    { value: t('stat1_value'), label: t('stat1_label'), bg: 'bg-red-500' },
    { value: t('stat2_value'), label: t('stat2_label'), bg: 'bg-orange-500' },
    { value: t('stat3_value'), label: t('stat3_label'), bg: 'bg-amber-500' },
    { value: t('stat4_value'), label: t('stat4_label'), bg: 'bg-rose-600' },
  ];

  const impacts = [
    { icon: Wind, title: t('env_title'), text: t('env_text'), color: 'bg-green-50 text-green-600' },
    { icon: DollarSign, title: t('econ_title'), text: t('econ_text'), color: 'bg-amber-50 text-amber-600' },
    { icon: Heart, title: t('social_title'), text: t('social_text'), color: 'bg-red-50 text-red-500' },
  ];

  return (
    <PageTransition>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="bg-gradient-to-br from-red-700 via-orange-600 to-amber-500 text-white py-20 px-6">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-block bg-white/20 text-white text-xs font-bold px-3 py-1 rounded-full mb-4 uppercase tracking-wider">
              Food Waste
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight mb-5">
              {t('hero_title')}
            </h1>
            <p className="text-lg text-orange-100 max-w-xl mx-auto">
              {t('hero_subtitle')}
            </p>
          </div>
        </section>

        {/* Big stats */}
        <section className="py-20 px-6 bg-slate-900 text-white">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-center mb-12">
              {t('stats_title')}
            </h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map(({ value, label, bg }) => (
                <div key={label} className={`${bg} rounded-2xl p-6 text-center`}>
                  <p className="text-3xl sm:text-4xl font-extrabold mb-2">{value}</p>
                  <p className="text-xs sm:text-sm text-white/80 font-medium leading-snug">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why it matters */}
        <section className="py-20 px-6 bg-white">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 text-center mb-12">
              {t('why_title')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {impacts.map(({ icon: Icon, title, text, color }) => (
                <div key={title} className="bg-slate-50 rounded-2xl border border-slate-100 p-6">
                  <div className={`inline-flex p-3 rounded-xl mb-4 ${color}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900 mb-2">{title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How Foody helps */}
        <section className="py-20 px-6 bg-emerald-50">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex p-4 rounded-2xl bg-emerald-100 mb-6">
              <Leaf className="w-8 h-8 text-emerald-600" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-5">
              {t('how_title')}
            </h2>
            <p className="text-slate-600 text-lg leading-relaxed">{t('how_text')}</p>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 px-6 bg-slate-900 text-white text-center">
          <div className="max-w-lg mx-auto">
            <h2 className="text-3xl font-extrabold mb-8">{t('cta_title')}</h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/browse"
                className="inline-block bg-emerald-500 hover:bg-emerald-400 text-white font-bold px-8 py-3.5 rounded-2xl transition-colors shadow-lg shadow-emerald-900/40"
              >
                {t('cta_customer')}
              </Link>
              <Link
                href="/supplier/register"
                className="inline-block border-2 border-white text-white hover:bg-white hover:text-slate-900 font-bold px-8 py-3.5 rounded-2xl transition-colors"
              >
                {t('cta_supplier')}
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </PageTransition>
  );
}
