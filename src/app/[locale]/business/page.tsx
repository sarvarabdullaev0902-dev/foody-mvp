'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Trash2, TrendingUp, Users, LayoutDashboard, UserPlus, PackagePlus, ClipboardCheck, HandshakeIcon } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import PageTransition from '@/components/ui/PageTransition';

export default function BusinessPage() {
  const t = useTranslations('business');

  const benefits = [
    { icon: Trash2, title: t('benefit1_title'), desc: t('benefit1_desc'), color: 'bg-red-50 text-red-500' },
    { icon: TrendingUp, title: t('benefit2_title'), desc: t('benefit2_desc'), color: 'bg-emerald-50 text-emerald-600' },
    { icon: Users, title: t('benefit3_title'), desc: t('benefit3_desc'), color: 'bg-blue-50 text-blue-600' },
    { icon: LayoutDashboard, title: t('benefit4_title'), desc: t('benefit4_desc'), color: 'bg-violet-50 text-violet-600' },
  ];

  const steps = [
    { icon: UserPlus, num: '1', title: t('how1_title'), desc: t('how1_desc') },
    { icon: PackagePlus, num: '2', title: t('how2_title'), desc: t('how2_desc') },
    { icon: ClipboardCheck, num: '3', title: t('how3_title'), desc: t('how3_desc') },
    { icon: HandshakeIcon, num: '4', title: t('how4_title'), desc: t('how4_desc') },
  ];

  return (
    <PageTransition>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="text-white py-20 px-6" style={{ background: 'linear-gradient(135deg, #E8594F 0%, #F4845F 50%, #D14840 100%)' }}>
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-block bg-white/20 border border-white/30 text-white text-xs font-bold px-3 py-1 rounded-full mb-4 uppercase tracking-wider">
              Foody Business
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight mb-5">
              {t('hero_title')}
            </h1>
            <p className="text-lg text-white/80 max-w-xl mx-auto mb-8">
              {t('hero_subtitle')}
            </p>
            <Link
              href="/supplier/register"
              className="inline-block bg-white text-[#E8594F] hover:bg-[#FAD6CC] font-bold px-8 py-3.5 rounded-2xl transition-colors shadow-lg"
            >
              {t('cta_btn')}
            </Link>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-20 px-6 bg-white">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 text-center mb-12">
              {t('benefits_title')}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {benefits.map(({ icon: Icon, title, desc, color }) => (
                <div key={title} className="flex gap-4 bg-[#FFFFFF] rounded-2xl p-6 border border-[#F9C0B8]">
                  <div className={`shrink-0 inline-flex p-3 rounded-xl h-fit ${color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900 mb-1">{title}</h3>
                    <p className="text-sm text-slate-500 leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="py-20 px-6 bg-[#F5ECDE]">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 text-center mb-12">
              {t('how_title')}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {steps.map(({ icon: Icon, num, title, desc }) => (
                <div key={num} className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm text-center">
                  <div className="inline-flex w-12 h-12 rounded-xl bg-emerald-600 text-white items-center justify-center mb-4 text-lg font-extrabold">
                    {num}
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 mb-1.5">{title}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section className="py-20 px-6 bg-white">
          <div className="max-w-lg mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-8">
              {t('pricing_title')}
            </h2>
            <div className="bg-white border-2 border-[#F9C0B8] rounded-3xl p-10 shadow-sm">
              <div className="inline-block bg-[#E8594F] text-white text-xs font-bold px-3 py-1 rounded-full mb-4 uppercase tracking-wider">
                Free
              </div>
              <p className="text-4xl font-extrabold text-[#E8594F] mb-3">{t('pricing_free')}</p>
              <p className="text-slate-500 text-sm leading-relaxed">{t('pricing_note')}</p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 px-6 text-white text-center" style={{ background: 'linear-gradient(135deg, #E8594F 0%, #F4845F 50%, #D14840 100%)' }}>
          <div className="max-w-lg mx-auto">
            <h2 className="text-3xl font-extrabold mb-3">{t('cta_title')}</h2>
            <p className="text-white/80 mb-8">{t('cta_subtitle')}</p>
            <Link
              href="/supplier/register"
              className="inline-block bg-white text-[#E8594F] font-bold px-8 py-3.5 rounded-2xl hover:bg-[#FAD6CC] transition-colors shadow-lg"
            >
              {t('cta_btn')}
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </PageTransition>
  );
}
