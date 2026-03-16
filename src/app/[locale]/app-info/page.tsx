'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { MapPin, ShoppingBag, Smile, PiggyBank, Leaf, Store, Apple } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import PageTransition from '@/components/ui/PageTransition';
import { ContainerScroll } from '@/components/ui/container-scroll-animation';

export default function AppInfoPage() {
  const t = useTranslations('app_info');

  const steps = [
    { icon: MapPin, num: '1', title: t('step1_title'), desc: t('step1_desc'), color: 'bg-emerald-100 text-emerald-600' },
    { icon: ShoppingBag, num: '2', title: t('step2_title'), desc: t('step2_desc'), color: 'bg-blue-100 text-blue-600' },
    { icon: Smile, num: '3', title: t('step3_title'), desc: t('step3_desc'), color: 'bg-violet-100 text-violet-600' },
  ];

  const benefits = [
    { icon: PiggyBank, title: t('benefit1_title'), desc: t('benefit1_desc'), color: 'text-emerald-600 bg-emerald-50' },
    { icon: Leaf, title: t('benefit2_title'), desc: t('benefit2_desc'), color: 'text-green-600 bg-green-50' },
    { icon: Store, title: t('benefit3_title'), desc: t('benefit3_desc'), color: 'text-amber-600 bg-amber-50' },
  ];

  return (
    <PageTransition>
      <Navbar />
      <main className="bg-[#F5ECDE]">
        {/* Container Scroll Hero — pt-6 adds breathing room below the navbar */}
        <div className="pt-6">
          <ContainerScroll
            containerHeight="h-[50rem] md:h-[52rem]"
            titleComponent={
              <div>
                <p className="text-base sm:text-lg font-semibold text-[#4B5563] mb-2 tracking-wide">
                  {t('scroll_line1')}
                </p>
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-[#E8594F] leading-tight">
                  {t('scroll_line2')}
                </h1>
              </div>
            }
          >
            <img
              src="/grocery-hero.jpg"
              alt="Foody Moody app"
              className="w-full h-full object-cover"
              style={{ objectPosition: '50% 55%' }}
              draggable={false}
            />
          </ContainerScroll>
        </div>

        {/* 3-step process — mt-8 adds clear visual separation after scroll section */}
        <section className="py-20 px-6 bg-white">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 text-center mb-14">
              {t('steps_title')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {steps.map(({ icon: Icon, num, title, desc, color }) => (
                <div key={num} className="flex flex-col items-center text-center">
                  <div className={`w-16 h-16 rounded-2xl ${color} flex items-center justify-center mb-5 relative`}>
                    <Icon className="w-7 h-7" />
                    <span className="absolute -top-2 -right-2 bg-[#E8594F] text-white text-xs font-extrabold w-6 h-6 rounded-full flex items-center justify-center">
                      {num}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">{title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
            {/* Connector line (desktop only) */}
            <div className="hidden md:flex items-center justify-center -mt-[120px] mb-[60px] pointer-events-none">
              <div className="w-[68%] border-t-2 border-dashed border-emerald-200" />
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-20 px-6 bg-[#F5ECDE]">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 text-center mb-12">
              {t('benefits_title')}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {benefits.map(({ icon: Icon, title, desc, color }) => (
                <div key={title} className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
                  <div className={`inline-flex p-3 rounded-xl mb-4 ${color}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900 mb-1">{title}</h3>
                  <p className="text-sm text-slate-500">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Download CTA */}
        <section className="py-20 px-6 text-white text-center" style={{ background: 'linear-gradient(135deg, #E8594F 0%, #F4845F 50%, #D14840 100%)' }}>
          <div className="max-w-lg mx-auto">
            <div className="inline-flex p-4 rounded-2xl bg-white/20 mb-6">
              <Apple className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-extrabold mb-3">{t('download_title')}</h2>
            <p className="text-white/80 mb-8">{t('download_subtitle')}</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button className="flex items-center justify-center gap-3 bg-white text-[#E8594F] font-bold px-6 py-3.5 rounded-2xl hover:bg-[#FAD6CC] transition-colors">
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                </svg>
                {t('download_app_store')}
              </button>
              <button className="flex items-center justify-center gap-3 bg-white text-[#E8594F] font-bold px-6 py-3.5 rounded-2xl hover:bg-[#FAD6CC] transition-colors">
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3.18 23.76c.33.18.7.24 1.06.18l12.16-7.01-2.48-2.49-10.74 9.32zm-1.9-20.1C1.1 4 1 4.37 1 4.77v14.46c0 .4.1.77.28 1.1l.06.06 8.1-8.1v-.19L1.28 3.6l-.0-.06zm18.16 6.93-2.59-1.5-2.77 2.77 2.77 2.77 2.61-1.51c.74-.43.74-1.1-.02-1.53zM4.24.24C3.88.18 3.51.24 3.18.42L13.92 11.1l-2.48-2.49L4.24.24z"/>
                </svg>
                {t('download_google_play')}
              </button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </PageTransition>
  );
}
