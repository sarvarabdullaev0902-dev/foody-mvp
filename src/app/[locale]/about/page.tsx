'use client';

import { useTranslations } from 'next-intl';
import { useRef, useState, useEffect } from 'react';
import { Link } from '@/i18n/navigation';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import PageTransition from '@/components/ui/PageTransition';
import CountUp from '@/components/ui/CountUp';

// Confetti dots for section 3 (impact) panel
const CONFETTI = [
  { x: -85, y: -55, c: '#E8594F', s: 9 },
  { x: 85, y: -65, c: '#F4845F', s: 11 },
  { x: -80, y: 25, c: '#FAD6CC', s: 7 },
  { x: 85, y: 35, c: '#E8594F', s: 9 },
  { x: -45, y: 85, c: '#F4845F', s: 8 },
  { x: 65, y: 80, c: '#FAD6CC', s: 10 },
  { x: 10, y: -90, c: '#E8594F', s: 7 },
  { x: -35, y: -85, c: '#F9C0B8', s: 8 },
];

// Panel gradient backgrounds — all using brand palette
const PANEL_BG = [
  'from-emerald-100 to-emerald-50 border-emerald-200',   // 0 Fresh
  'from-amber-100 to-amber-50 border-amber-200',          // 1 Expiring
  'from-[#FAD6CC] to-[#F9C0B8] border-[#F9C0B8]',        // 2 Rescued
  'from-emerald-100 to-emerald-50 border-emerald-200',   // 3 Impact
  'from-[#F5ECDE] to-[#FAD6CC] border-[#F9C0B8]',        // 4 Team
  'from-[#FAD6CC] to-[#F9C0B8] border-[#E8594F]/30',     // 5 Future (brand, no violet)
];

const DOT_ACTIVE = [
  'bg-emerald-500',
  'bg-amber-500',
  'bg-[#E8594F]',
  'bg-emerald-500',
  'bg-[#E8594F]',
  'bg-[#E8594F]',  // was violet, now brand red
];

type TFunc = ReturnType<typeof useTranslations>;

function FoodPanel({ section, t }: { section: number; t: TFunc }) {
  return (
    <motion.div
      initial={{ y: -60, rotate: -360, opacity: 0, scale: 0.7 }}
      animate={{ y: 0, rotate: 0, opacity: 1, scale: 1, transition: { type: 'spring', damping: 20, stiffness: 180 } }}
      exit={{ y: 60, rotate: 360, opacity: 0, scale: 0.7, transition: { duration: 0.22, ease: 'easeIn' } }}
      className={`relative rounded-3xl bg-gradient-to-br ${PANEL_BG[section]} border-2 flex flex-col items-center justify-center shadow-2xl overflow-visible`}
      style={{ width: 240, height: 240 }}
    >
      {/* 0 — Fresh croissant floating */}
      {section === 0 && (
        <motion.div
          animate={{ y: [-8, 8, -8] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          className="text-8xl select-none"
        >
          🥐
        </motion.div>
      )}

      {/* 1 — Expiring: clock badge + draining progress bar */}
      {section === 1 && (
        <div className="flex flex-col items-center gap-4">
          <div className="relative">
            <div className="text-7xl select-none">🥐</div>
            <div className="absolute -top-1 -right-7 bg-amber-500 text-white text-xs font-extrabold px-2 py-0.5 rounded-full whitespace-nowrap">
              ⏰ 23:59
            </div>
          </div>
          <div className="w-44">
            <div className="w-full bg-amber-100 rounded-full h-2.5 overflow-hidden">
              <motion.div
                className="bg-amber-500 h-2.5 rounded-full"
                initial={{ width: '90%' }}
                animate={{ width: '10%' }}
                transition={{ duration: 3, ease: 'easeInOut', repeat: Infinity, repeatType: 'mirror' }}
              />
            </div>
          </div>
        </div>
      )}

      {/* 2 — Rescued: -50% badge + checkmark */}
      {section === 2 && (
        <div className="relative flex items-center justify-center">
          <div className="text-8xl select-none">🥐</div>
          <motion.div
            animate={{ scale: [1, 1.2, 1], rotate: [-4, 4, -4] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="absolute -top-4 -right-8 bg-[#E8594F] text-white text-base font-extrabold px-3 py-1.5 rounded-full shadow-lg"
          >
            -50%
          </motion.div>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.4, type: 'spring', damping: 12 }}
            className="absolute -bottom-2 right-0 bg-emerald-500 text-white rounded-full w-10 h-10 flex items-center justify-center text-xl shadow-lg"
          >
            ✓
          </motion.div>
        </div>
      )}

      {/* 3 — Impact: plate + confetti burst */}
      {section === 3 && (
        <div className="relative flex flex-col items-center justify-center">
          {CONFETTI.map((dot, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full"
              style={{ width: dot.s, height: dot.s, backgroundColor: dot.c }}
              initial={{ x: 0, y: 0, opacity: 0, scale: 0 }}
              animate={{ x: dot.x, y: dot.y, opacity: [0, 1, 0.8, 0], scale: [0, 1.2, 1, 0] }}
              transition={{ duration: 2, delay: i * 0.08, repeat: Infinity, repeatDelay: 0.8 }}
            />
          ))}
          <div className="text-7xl select-none">🍽️</div>
        </div>
      )}

      {/* 4 — Team: founder initials */}
      {section === 4 && (
        <div className="flex flex-col items-center gap-5">
          <div className="flex gap-3">
            {['MS', 'SA'].map((init) => (
              <div
                key={init}
                className="w-16 h-16 rounded-2xl bg-[#E8594F] text-white font-extrabold text-xl flex items-center justify-center shadow-lg"
              >
                {init}
              </div>
            ))}
          </div>
          <div className="text-center">
            <p className="text-[#E8594F] font-extrabold text-sm">Foody Moody</p>
            <p className="text-slate-500 text-xs">Founders</p>
          </div>
        </div>
      )}

      {/* 5 — Future: rocket + roadmap (brand colors, no violet) */}
      {section === 5 && (
        <div className="flex flex-col items-center gap-3">
          <motion.div
            animate={{ y: [-6, 6, -6] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
            className="text-6xl select-none"
          >
            🚀
          </motion.div>
          <div className="flex flex-col items-start gap-1.5 mt-1">
            {[t('roadmap1'), t('roadmap2'), t('roadmap3')].map((city, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.15 }}
                className={`flex items-center gap-1.5 text-xs font-semibold ${i === 0 ? 'text-[#E8594F]' : 'text-[#E8594F]/50'}`}
              >
                <span className={`w-1.5 h-1.5 rounded-full ${i === 0 ? 'bg-[#E8594F]' : 'bg-[#F9C0B8]'}`} />
                {city}
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
}

// Shared card wrapper for rounded floating sections
function SectionCard({
  divRef,
  bg,
  gradientStyle,
  children,
  className = '',
}: {
  divRef: React.RefObject<HTMLDivElement>;
  bg?: string;
  gradientStyle?: React.CSSProperties;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      ref={divRef}
      className={`mx-4 md:mx-6 lg:mx-4 rounded-2xl shadow-md overflow-hidden scroll-mt-24 ${bg ?? ''} ${className}`}
      style={gradientStyle}
    >
      <div className="min-h-[85vh] flex flex-col justify-center py-20 px-6 lg:pl-10 lg:pr-12">
        {children}
      </div>
    </div>
  );
}

export default function AboutPage() {
  const t = useTranslations('about');
  const [active, setActive] = useState(0);

  const s0 = useRef<HTMLDivElement>(null);
  const s1 = useRef<HTMLDivElement>(null);
  const s2 = useRef<HTMLDivElement>(null);
  const s3 = useRef<HTMLDivElement>(null);
  const s4 = useRef<HTMLDivElement>(null);
  const s5 = useRef<HTMLDivElement>(null);

  const v0 = useInView(s0, { amount: 0.3 });
  const v1 = useInView(s1, { amount: 0.3 });
  const v2 = useInView(s2, { amount: 0.3 });
  const v3 = useInView(s3, { amount: 0.3 });
  const v4 = useInView(s4, { amount: 0.3 });
  const v5 = useInView(s5, { amount: 0.3 });

  useEffect(() => {
    if (v5) setActive(5);
    else if (v4) setActive(4);
    else if (v3) setActive(3);
    else if (v2) setActive(2);
    else if (v1) setActive(1);
    else if (v0) setActive(0);
  }, [v0, v1, v2, v3, v4, v5]);

  const sectionRefs = [s0, s1, s2, s3, s4, s5];

  const impactStats = [
    { end: 10000, suffix: '+', decimals: 0, label: t('impact1_label') },
    { end: 2.5, suffix: ' t', decimals: 1, label: t('impact2_label') },
    { end: 150, suffix: '+', decimals: 0, label: t('impact3_label') },
    { end: 50000, suffix: '+', decimals: 0, label: t('impact4_label') },
  ];

  const fadeIn = (delay = 0) => ({
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.5, delay },
    viewport: { once: true },
  });

  return (
    <PageTransition>
      <Navbar />
      {/* Cream page background — sections float as rounded cards on top */}
      <main className="bg-[#F5ECDE] pt-4 pb-10">
        <div className="relative">
          <div className="lg:max-w-6xl lg:mx-auto">
            <div className="lg:flex">

              {/* ── Left column: rounded section cards ── */}
              <div className="flex-1 min-w-0 space-y-4">

                {/* Section 0: Mission / Fresh food */}
                <SectionCard divRef={s0} bg="bg-white">
                  <div className="lg:hidden text-6xl mb-8 select-none">🥐</div>
                  <motion.span {...fadeIn(0)} className="inline-block text-xs font-bold text-emerald-600 uppercase tracking-widest mb-4 bg-emerald-50 px-3 py-1 rounded-full w-fit">
                    {t('sec1_eyebrow')}
                  </motion.span>
                  <motion.h2 {...fadeIn(0.1)} className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1E1E1E] mb-6 leading-tight">
                    {t('mission_title')}
                  </motion.h2>
                  <motion.p {...fadeIn(0.2)} className="text-slate-600 text-lg leading-relaxed max-w-lg">
                    {t('mission_text')}
                  </motion.p>
                </SectionCard>

                {/* Section 1: The Problem / Expiring */}
                <SectionCard divRef={s1} bg="bg-amber-50">
                  <div className="lg:hidden text-6xl mb-8 select-none">⏰</div>
                  <motion.span {...fadeIn(0)} className="inline-block text-xs font-bold text-amber-600 uppercase tracking-widest mb-4 bg-amber-100 px-3 py-1 rounded-full w-fit">
                    {t('sec2_eyebrow')}
                  </motion.span>
                  <motion.h2 {...fadeIn(0.1)} className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1E1E1E] mb-6 leading-tight">
                    {t('sec2_title')}
                  </motion.h2>
                  <motion.p {...fadeIn(0.2)} className="text-slate-600 text-lg leading-relaxed max-w-lg">
                    {t('sec2_body')}
                  </motion.p>
                </SectionCard>

                {/* Section 2: The Solution / Story */}
                <SectionCard divRef={s2} bg="bg-[#FAD6CC]">
                  <div className="lg:hidden text-6xl mb-8 select-none">🏷️</div>
                  <motion.span {...fadeIn(0)} className="inline-block text-xs font-bold text-[#E8594F] uppercase tracking-widest mb-4 bg-white/60 px-3 py-1 rounded-full w-fit">
                    {t('sec3_eyebrow')}
                  </motion.span>
                  <motion.h2 {...fadeIn(0.1)} className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1E1E1E] mb-6 leading-tight">
                    {t('story_title')}
                  </motion.h2>
                  <motion.p {...fadeIn(0.2)} className="text-slate-700 text-lg leading-relaxed max-w-lg">
                    {t('story_text')}
                  </motion.p>
                </SectionCard>

                {/* Section 3: Impact / Happy customer */}
                <SectionCard divRef={s3} bg="bg-white">
                  <div className="lg:hidden text-6xl mb-8 select-none">🍽️</div>
                  <motion.span {...fadeIn(0)} className="inline-block text-xs font-bold text-emerald-600 uppercase tracking-widest mb-4 bg-emerald-50 px-3 py-1 rounded-full w-fit">
                    {t('impact_title')}
                  </motion.span>
                  <motion.h2 {...fadeIn(0.1)} className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1E1E1E] mb-6 leading-tight">
                    {t('sec4_title')}
                  </motion.h2>
                  <motion.p {...fadeIn(0.2)} className="text-slate-600 text-lg leading-relaxed max-w-lg mb-10">
                    {t('sec4_body')}
                  </motion.p>
                  <motion.div {...fadeIn(0.3)} className="grid grid-cols-2 gap-4 max-w-sm">
                    {impactStats.map(({ end, suffix, decimals, label }) => (
                      <div key={label} className="bg-emerald-50 rounded-2xl p-4">
                        <p className="text-2xl font-extrabold text-[#E8594F]">
                          <CountUp end={end} suffix={suffix} decimals={decimals} />
                        </p>
                        <p className="text-xs text-slate-600 font-medium mt-0.5">{label}</p>
                      </div>
                    ))}
                  </motion.div>
                </SectionCard>

                {/* Section 4: Team */}
                <SectionCard divRef={s4} bg="bg-[#F5ECDE]">
                  <div className="lg:hidden text-6xl mb-8 select-none">👥</div>
                  <motion.span {...fadeIn(0)} className="inline-block text-xs font-bold text-[#E8594F] uppercase tracking-widest mb-4 bg-white/70 px-3 py-1 rounded-full w-fit">
                    {t('sec5_eyebrow')}
                  </motion.span>
                  <motion.h2 {...fadeIn(0.1)} className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1E1E1E] mb-10 leading-tight">
                    {t('team_title')}
                  </motion.h2>
                  <div className="flex flex-col gap-4 max-w-md">
                    {[
                      { name: t('founder1_name'), role: t('founder1_role'), initials: 'MS' },
                      { name: t('founder2_name'), role: t('founder2_role'), initials: 'SA' },
                    ].map(({ name, role, initials }, i) => (
                      <motion.div
                        key={name}
                        initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: i * 0.12 }} viewport={{ once: true }}
                        className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 flex items-center gap-4"
                      >
                        <div className="shrink-0 w-14 h-14 rounded-2xl bg-[#E8594F] text-white font-extrabold text-xl flex items-center justify-center">
                          {initials}
                        </div>
                        <div>
                          <p className="font-bold text-slate-900">{name}</p>
                          <p className="text-sm text-slate-500">{role}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </SectionCard>

                {/* Section 5: Vision + CTA — red gradient, rounded card */}
                <SectionCard
                  divRef={s5}
                  gradientStyle={{ background: 'linear-gradient(135deg, #E8594F 0%, #F4845F 50%, #D14840 100%)' }}
                  className="text-white"
                >
                  <div className="lg:hidden text-6xl mb-8 select-none">🚀</div>
                  <motion.span {...fadeIn(0)} className="inline-block text-xs font-bold text-white/70 uppercase tracking-widest mb-4 bg-white/20 border border-white/20 px-3 py-1 rounded-full w-fit">
                    {t('sec6_eyebrow')}
                  </motion.span>
                  <motion.h2 {...fadeIn(0.1)} className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-6 leading-tight">
                    {t('vision_title')}
                  </motion.h2>
                  <motion.p {...fadeIn(0.2)} className="text-white/80 text-lg leading-relaxed max-w-lg mb-10">
                    {t('vision_text')}
                  </motion.p>

                  {/* Roadmap — Toshkent → Uzbekistan → Central Asia */}
                  <motion.div {...fadeIn(0.3)} className="flex items-end gap-3 mb-10 flex-wrap">
                    {[t('roadmap1'), t('roadmap2'), t('roadmap3')].map((city, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <div className="flex flex-col items-center">
                          <div className={`w-3 h-3 rounded-full border-2 ${i === 0 ? 'bg-white border-white' : 'bg-transparent border-white/40'}`} />
                          <p className={`text-xs font-bold mt-1.5 ${i === 0 ? 'text-white' : 'text-white/50'}`}>{city}</p>
                        </div>
                        {i < 2 && <div className="w-10 h-0.5 bg-white/25 mb-3.5" />}
                      </div>
                    ))}
                  </motion.div>

                  {/* CTA buttons */}
                  <motion.div {...fadeIn(0.4)} className="flex flex-col sm:flex-row gap-3">
                    <Link href="/browse" className="inline-block bg-white text-[#E8594F] font-bold px-7 py-3.5 rounded-2xl hover:bg-[#FAD6CC] transition-colors text-center shadow-lg">
                      {t('cta_customers')}
                    </Link>
                    <Link href="/supplier/register" className="inline-block bg-[#D14840] hover:bg-[#C03C35] text-white font-bold px-7 py-3.5 rounded-2xl transition-colors text-center shadow-lg">
                      {t('cta_suppliers')}
                    </Link>
                  </motion.div>
                </SectionCard>

              </div>

              {/* ── Right column: sticky food icon panel ── */}
              <div className="hidden lg:block w-72 xl:w-80 shrink-0">
                <div
                  className="sticky top-24 flex items-center gap-4 pl-6"
                  style={{ height: 'calc(100vh - 6rem)' }}
                >
                  {/* Vertical dashed timeline + dots */}
                  <div className="relative flex flex-col justify-center h-[65%]">
                    <div className="absolute left-1.5 top-0 bottom-0 border-l-2 border-dashed border-slate-300" />
                    <div className="flex flex-col justify-between h-full py-1">
                      {DOT_ACTIVE.map((activeColor, i) => (
                        <motion.button
                          key={i}
                          onClick={() => sectionRefs[i].current?.scrollIntoView({ behavior: 'smooth', block: 'center' })}
                          animate={{ scale: active === i ? 1.5 : 1 }}
                          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                          className={`relative z-10 w-3 h-3 rounded-full border-2 transition-colors duration-300 cursor-pointer ${
                            active === i ? `${activeColor} border-transparent` : 'bg-white border-slate-300'
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Food icon panel */}
                  <div className="flex-1 flex items-center justify-center">
                    <AnimatePresence mode="wait">
                      <FoodPanel key={active} section={active} t={t} />
                    </AnimatePresence>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </main>
      <Footer />
    </PageTransition>
  );
}
