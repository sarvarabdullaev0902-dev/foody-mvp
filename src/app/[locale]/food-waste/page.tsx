'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { motion } from 'framer-motion';
import {
  Globe, TrendingDown, Flame, DollarSign, Users,
  UtensilsCrossed, Droplets, Trees, Factory,
  ShoppingBag, Building2, Leaf, Target,
  ChevronRight,
} from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import PageTransition from '@/components/ui/PageTransition';
import CountUp from '@/components/ui/CountUp';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] },
  viewport: { once: true, margin: '-60px' },
});

function SectionWrapper({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`mx-3 sm:mx-4 md:mx-6 rounded-2xl overflow-hidden shadow-sm ${className}`}>
      {children}
    </div>
  );
}

// Bar chart row for restaurant waste data
function WasteBar({ label, min, max, maxScale, color }: { label: string; min: number; max: number; maxScale: number; color: string }) {
  const pct = Math.round((max / maxScale) * 100);
  return (
    <div className="flex items-center gap-4">
      <p className="w-28 sm:w-36 text-sm font-semibold text-slate-700 shrink-0">{label}</p>
      <div className="flex-1 bg-slate-100 rounded-full h-3 overflow-hidden">
        <motion.div
          className="h-3 rounded-full"
          style={{ backgroundColor: color }}
          initial={{ width: 0 }}
          whileInView={{ width: `${pct}%` }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true, margin: '-40px' }}
        />
      </div>
      <p className="w-24 text-sm font-extrabold text-[#1E1E1E] shrink-0 text-right">
        {min}–{max} t/yr
      </p>
    </div>
  );
}

export default function FoodWastePage() {
  const t = useTranslations('food_waste');

  return (
    <PageTransition>
      <Navbar />
      {/* space-y-6 for more breathing room between sections */}
      <main className="bg-[#F5ECDE] pt-4 pb-10 space-y-6">

        {/* SECTION 1: HERO */}
        <SectionWrapper>
          <section
            className="relative text-white py-24 px-6 overflow-hidden"
            style={{ background: 'linear-gradient(135deg, #E8594F 0%, #F4845F 50%, #D14840 100%)' }}
          >
            <div className="absolute inset-0 opacity-10" style={{
              backgroundImage: 'radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 20%, white 1px, transparent 1px)',
              backgroundSize: '60px 60px',
            }} />
            <div className="relative max-w-3xl mx-auto text-center">
              <motion.span {...fadeUp(0)} className="inline-block bg-white/20 border border-white/30 text-white text-xs font-bold px-4 py-1.5 rounded-full mb-5 uppercase tracking-widest">
                {t('hero_eyebrow')}
              </motion.span>
              <motion.h1 {...fadeUp(0.08)} className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight mb-5">
                {t('hero_title')}
              </motion.h1>
              <motion.p {...fadeUp(0.16)} className="text-lg sm:text-xl text-white/85 max-w-2xl mx-auto leading-relaxed">
                {t('hero_subtitle')}
              </motion.p>
              <motion.div {...fadeUp(0.28)} className="mt-10 flex justify-center">
                <div className="flex flex-col items-center gap-1 text-white/50">
                  <ChevronRight className="w-4 h-4 rotate-90" />
                  <ChevronRight className="w-4 h-4 rotate-90 -mt-2" />
                </div>
              </motion.div>
            </div>
          </section>
        </SectionWrapper>

        {/* SECTION 2: GLOBAL STATS */}
        <SectionWrapper className="bg-white">
          <section className="py-16 px-6">
            <div className="max-w-5xl mx-auto">
              <motion.div {...fadeUp(0)} className="text-center mb-12">
                <span className="inline-block text-xs font-bold text-[#E8594F] uppercase tracking-widest mb-3 bg-[#FAD6CC]/60 px-3 py-1 rounded-full">
                  {t('global_eyebrow')}
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1E1E1E] mt-2">
                  {t('global_title')}
                </h2>
              </motion.div>
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-5">
                {([
                  { icon: Globe,        countup: true,  end: 1.3, suffix: 'B t', decimals: 1, display: '',      label: 'g_stat1_label', color: 'bg-amber-50 text-amber-600' },
                  { icon: TrendingDown, countup: true,  end: 30,  suffix: '%',   decimals: 0, display: '',      label: 'g_stat2_label', color: 'bg-red-50 text-[#E8594F]' },
                  { icon: Flame,        countup: false, end: 0,   suffix: '',    decimals: 0, display: '8–10%', label: 'g_stat3_label', color: 'bg-orange-50 text-orange-600' },
                  { icon: DollarSign,   countup: false, end: 0,   suffix: '',    decimals: 0, display: '$1T',   label: 'g_stat4_label', color: 'bg-emerald-50 text-emerald-600' },
                  { icon: Users,        countup: true,  end: 1,   suffix: 'B+',  decimals: 0, display: '',      label: 'g_stat5_label', color: 'bg-blue-50 text-blue-600' },
                  { icon: UtensilsCrossed, countup: false, end: 0, suffix: '',   decimals: 0, display: '4×',    label: 'g_stat6_label', color: 'bg-violet-50 text-violet-600' },
                ] as const).map((stat, i) => (
                  <motion.div key={stat.label} {...fadeUp(i * 0.07)} className="bg-[#FAFAFA] border border-slate-100 rounded-2xl p-6 flex flex-col items-start gap-3 shadow-sm">
                    <div className={`inline-flex p-2.5 rounded-xl ${stat.color}`}>
                      <stat.icon className="w-5 h-5" />
                    </div>
                    <p className="text-3xl sm:text-4xl font-extrabold text-[#1E1E1E] leading-none">
                      {stat.countup
                        ? <CountUp end={stat.end} suffix={stat.suffix} decimals={stat.decimals} />
                        : stat.display}
                    </p>
                    <p className="text-xs sm:text-sm text-slate-500 font-medium leading-snug">{t(stat.label)}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        </SectionWrapper>

        {/* SECTION 3: UZBEKISTAN */}
        <SectionWrapper className="bg-[#FAD6CC]">
          <section className="py-16 px-6">
            <div className="max-w-5xl mx-auto">
              <motion.div {...fadeUp(0)} className="text-center mb-12">
                <span className="inline-block text-xs font-bold text-[#E8594F] uppercase tracking-widest mb-3 bg-white/50 px-3 py-1 rounded-full">
                  {t('uz_eyebrow')}
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1E1E1E] mt-2 mb-3">{t('uz_title')}</h2>
                <p className="text-slate-700 max-w-xl mx-auto text-sm sm:text-base">{t('uz_subtitle')}</p>
              </motion.div>

              {/* Featured stat — white card, big red number */}
              <motion.div {...fadeUp(0.08)} className="bg-white rounded-2xl p-8 mb-8 shadow-sm border border-[#F9C0B8] flex flex-col sm:flex-row items-center gap-6">
                <div className="shrink-0 w-20 h-20 rounded-2xl bg-[#E8594F]/10 flex items-center justify-center">
                  <UtensilsCrossed className="w-10 h-10 text-[#E8594F]" />
                </div>
                <div className="flex-1">
                  <p className="text-5xl sm:text-6xl font-extrabold text-[#E8594F] leading-none mb-2">
                    <CountUp end={12} suffix=" t" /> / {t('uz_peryear')}
                  </p>
                  <p className="text-slate-700 text-base font-semibold mb-1">{t('uz_rest_headline')}</p>
                  <p className="text-slate-400 text-sm">{t('uz_rest_source')}</p>
                </div>
                {/* Daily callout */}
                <div className="shrink-0 text-center bg-amber-50 border border-amber-100 rounded-2xl px-6 py-4">
                  <p className="text-3xl font-extrabold text-amber-600">33 kg</p>
                  <p className="text-xs font-semibold text-amber-500 mt-0.5">{t('uz_fact1_label')}</p>
                </div>
              </motion.div>

              {/* Bar chart: restaurant size breakdown */}
              <motion.div {...fadeUp(0.12)} className="bg-white rounded-2xl p-8 mb-6 shadow-sm border border-[#F9C0B8]">
                <p className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-6">{t('uz_chart_label')}</p>
                <div className="flex flex-col gap-5">
                  <WasteBar label={t('uz_fact2_label')} min={3}  max={7}  maxScale={30} color="#F4845F" />
                  <WasteBar label={t('uz_fact3_label')} min={10} max={23} maxScale={30} color="#E8594F" />
                  <WasteBar label={t('uz_fact4_label')} min={20} max={30} maxScale={30} color="#D14840" />
                </div>
              </motion.div>

              {/* Remaining facts: overproduction + govt */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {([
                  { l: 'uz_fact5_label', v: 'uz_fact5_value', s: 'uz_fact5_sub', color: 'bg-blue-50 border-blue-100' },
                  { l: 'uz_fact6_label', v: 'uz_fact6_value', s: 'uz_fact6_sub', color: 'bg-white border-slate-100' },
                ] as const).map(({ l, v, s, color }, i) => (
                  <motion.div key={l} {...fadeUp(0.16 + i * 0.06)} className={`rounded-2xl border p-6 ${color}`}>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">{t(l)}</p>
                    <p className="text-xl font-extrabold text-[#1E1E1E] mb-2">{t(v)}</p>
                    <p className="text-sm text-slate-500 leading-relaxed">{t(s)}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        </SectionWrapper>

        {/* SECTION 4: CENTRAL ASIA */}
        <SectionWrapper className="bg-white">
          <section className="py-16 px-6">
            <div className="max-w-5xl mx-auto">
              <motion.div {...fadeUp(0)} className="text-center mb-12">
                <span className="inline-block text-xs font-bold text-blue-600 uppercase tracking-widest mb-3 bg-blue-50 px-3 py-1 rounded-full">
                  {t('ca_eyebrow')}
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1E1E1E] mt-2">{t('ca_title')}</h2>
              </motion.div>

              <motion.div {...fadeUp(0.06)} className="mb-10">
                <p className="text-sm font-semibold text-slate-500 text-center mb-4">{t('ca_fao_label')}</p>
                <div className="flex flex-wrap justify-center gap-3">
                  {(['ca_country1','ca_country2','ca_country3','ca_country4','ca_country5','ca_country6','ca_country7'] as const).map((key, i) => (
                    <span key={key} className={`px-4 py-2 rounded-full text-sm font-bold border-2 ${i === 0 ? 'bg-[#E8594F] text-white border-[#E8594F]' : 'bg-slate-50 text-slate-600 border-slate-200'}`}>
                      {t(key)}
                    </span>
                  ))}
                </div>
              </motion.div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {([
                  { icon: Globe,   t_title: 'ca_card1_title', t_body: 'ca_card1_body', color: 'text-blue-600 bg-blue-50' },
                  { icon: Users,   t_title: 'ca_card2_title', t_body: 'ca_card2_body', color: 'text-[#E8594F] bg-[#FAD6CC]/60' },
                  { icon: Target,  t_title: 'ca_card3_title', t_body: 'ca_card3_body', color: 'text-emerald-600 bg-emerald-50' },
                ] as const).map(({ icon: Icon, t_title, t_body, color }, i) => (
                  <motion.div key={t_title} {...fadeUp(0.08 + i * 0.07)} className="rounded-2xl border border-slate-100 bg-[#FAFAFA] p-7">
                    <div className={`inline-flex p-3 rounded-xl mb-5 ${color}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="font-bold text-[#1E1E1E] mb-2 text-base">{t(t_title)}</h3>
                    <p className="text-sm text-slate-500 leading-relaxed">{t(t_body)}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        </SectionWrapper>

        {/* SECTION 5: ENVIRONMENTAL IMPACT — 2×2 grid, larger icons */}
        <SectionWrapper className="bg-[#F5ECDE]">
          <section className="py-16 px-6">
            <div className="max-w-5xl mx-auto">
              <motion.div {...fadeUp(0)} className="text-center mb-12">
                <span className="inline-block text-xs font-bold text-emerald-700 uppercase tracking-widest mb-3 bg-emerald-50 px-3 py-1 rounded-full">
                  {t('env_eyebrow')}
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1E1E1E] mt-2">{t('env_sec_title')}</h2>
              </motion.div>
              {/* 2×2 grid, gap-6, bigger cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {([
                  { icon: Flame,    t_title: 'env_card1_title', t_body: 'env_card1_body', accent: '#E8594F', bg: 'bg-red-50',    border: 'border-red-100' },
                  { icon: Droplets, t_title: 'env_card2_title', t_body: 'env_card2_body', accent: '#2563EB', bg: 'bg-blue-50',   border: 'border-blue-100' },
                  { icon: Trees,    t_title: 'env_card3_title', t_body: 'env_card3_body', accent: '#16a34a', bg: 'bg-emerald-50',border: 'border-emerald-100' },
                  { icon: Factory,  t_title: 'env_card4_title', t_body: 'env_card4_body', accent: '#9333ea', bg: 'bg-violet-50', border: 'border-violet-100' },
                ] as const).map(({ icon: Icon, t_title, t_body, accent, bg, border }, i) => (
                  <motion.div key={t_title} {...fadeUp(i * 0.08)} className={`rounded-2xl border ${border} ${bg} p-8 flex flex-col`}>
                    {/* Larger icon: 32px / w-8 h-8 */}
                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5" style={{ backgroundColor: accent + '20' }}>
                      <Icon className="w-8 h-8" style={{ color: accent }} />
                    </div>
                    <h3 className="font-extrabold text-[#1E1E1E] mb-3 text-base">{t(t_title)}</h3>
                    <p className="text-sm text-slate-600 leading-relaxed flex-1">{t(t_body)}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        </SectionWrapper>

        {/* SECTION 6: HOW FOODY MOODY HELPS — 2×2 grid, bigger cards, left border */}
        <SectionWrapper className="bg-white">
          <section className="py-16 px-6">
            <div className="max-w-5xl mx-auto">
              <motion.div {...fadeUp(0)} className="text-center mb-12">
                <span className="inline-block text-xs font-bold text-[#E8594F] uppercase tracking-widest mb-3 bg-[#FAD6CC]/50 px-3 py-1 rounded-full">
                  {t('help_eyebrow')}
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1E1E1E] mt-2 mb-3">{t('help_title')}</h2>
                <p className="text-slate-500 max-w-lg mx-auto text-sm sm:text-base">{t('help_subtitle')}</p>
              </motion.div>
              {/* 2×2 grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {([
                  { icon: ShoppingBag, t_title: 'help_card1_title', pts: ['help_card1_p1','help_card1_p2','help_card1_p3'], accent: '#E8594F', bg: 'bg-[#FAD6CC]/30' },
                  { icon: Building2,   t_title: 'help_card2_title', pts: ['help_card2_p1','help_card2_p2','help_card2_p3'], accent: '#2563EB', bg: 'bg-blue-50' },
                  { icon: Leaf,        t_title: 'help_card3_title', pts: ['help_card3_p1','help_card3_p2','help_card3_p3'], accent: '#16a34a', bg: 'bg-emerald-50' },
                  { icon: Target,      t_title: 'help_card4_title', pts: ['help_card4_p1','help_card4_p2','help_card4_p3'], accent: '#9333ea', bg: 'bg-violet-50' },
                ] as const).map(({ icon: Icon, t_title, pts, accent, bg }, i) => (
                  <motion.div
                    key={t_title}
                    {...fadeUp(i * 0.08)}
                    className={`rounded-2xl ${bg} p-7 flex flex-col border-l-4`}
                    style={{ borderLeftColor: accent }}
                  >
                    <div className="flex items-center gap-4 mb-5">
                      {/* Larger icon: w-8 h-8 */}
                      <div className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0" style={{ backgroundColor: accent + '20' }}>
                        <Icon className="w-8 h-8" style={{ color: accent }} />
                      </div>
                      <h3 className="font-extrabold text-[#1E1E1E] text-lg">{t(t_title)}</h3>
                    </div>
                    <ul className="flex flex-col gap-3 flex-1">
                      {pts.map((p) => (
                        <li key={p} className="flex items-start gap-2.5 text-sm text-slate-600">
                          <span className="mt-1 w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: accent }} />
                          {t(p)}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        </SectionWrapper>

        {/* SECTION 7: CTA */}
        <SectionWrapper>
          <section
            className="relative py-24 px-6 text-white text-center overflow-hidden"
            style={{ background: 'linear-gradient(135deg, #E8594F 0%, #F4845F 50%, #D14840 100%)' }}
          >
            <div className="absolute inset-0 opacity-10" style={{
              backgroundImage: 'radial-gradient(circle at 30% 70%, white 1px, transparent 1px), radial-gradient(circle at 70% 30%, white 1px, transparent 1px)',
              backgroundSize: '50px 50px',
            }} />
            <div className="relative max-w-lg mx-auto">
              <motion.div {...fadeUp(0)} className="inline-flex p-4 rounded-2xl bg-white/20 mb-6">
                <Leaf className="w-8 h-8 text-white" />
              </motion.div>
              <motion.h2 {...fadeUp(0.06)} className="text-3xl sm:text-4xl font-extrabold mb-4">{t('cta_title')}</motion.h2>
              <motion.p {...fadeUp(0.12)} className="text-white/80 text-base mb-3">{t('cta_subtitle')}</motion.p>
              <motion.p {...fadeUp(0.16)} className="text-white/60 text-sm italic mb-10">{t('cta_closing')}</motion.p>
              {/* Bigger buttons, more gap */}
              <motion.div {...fadeUp(0.22)} className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/browse"
                  className="inline-block bg-white text-[#E8594F] hover:bg-[#FAD6CC] font-bold px-10 py-4 rounded-2xl transition-colors shadow-lg text-base"
                >
                  {t('cta_customer')}
                </Link>
                <Link
                  href="/supplier/register"
                  className="inline-block bg-[#D14840] hover:bg-[#C03C35] text-white font-bold px-10 py-4 rounded-2xl transition-colors shadow-lg border border-white/20 text-base"
                >
                  {t('cta_supplier')}
                </Link>
              </motion.div>
            </div>
          </section>
        </SectionWrapper>

      </main>
      <Footer />
    </PageTransition>
  );
}
