'use client';

import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';
import { Link } from '@/i18n/navigation';

// ─── Animation variants ──────────────────────────────────────────────────────

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
};

const slideUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1, y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  },
};

const rightPanel = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1, y: 0,
    transition: { duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  },
};


// ─── Main component ───────────────────────────────────────────────────────────

interface HeroSectionProps {
  t: (key: string) => string;
  tMap: (key: string) => string;
}

export default function HeroSection({ t, tMap }: HeroSectionProps) {
  const floatTransition = { duration: 4, repeat: Infinity, ease: 'easeInOut' as const };

  return (
    <section
      className="relative"
      style={{
        height: 'calc(100vh - 100px)',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
        background: 'radial-gradient(ellipse 900px 800px at -5% 10%, rgba(224,90,40,0.40) 0%, transparent 55%), radial-gradient(ellipse 800px 700px at 108% 95%, rgba(255,120,60,0.38) 0%, transparent 55%), #FDF4F0',
      }}
    >

      <div className="relative z-10 w-full max-w-6xl mx-auto px-5 sm:px-8 flex flex-col md:flex-row gap-14 md:gap-10" style={{ alignItems: 'center', width: '100%', height: '100%' }}>

        {/* ── Left column ── */}
        <motion.div
          className="flex-1 flex flex-col items-start gap-8 order-2 md:order-1 w-full"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          {/* Eyebrow pill */}
          <motion.div variants={slideUp}>
            <span className="inline-flex items-center gap-2 bg-[#FADDCB] text-[#A83C0E] text-xs font-semibold px-4 py-2 rounded-full tracking-wide">
              <span className="w-2 h-2 rounded-full bg-[#E05A28] animate-pulse flex-shrink-0" />
              {t('hero_eyebrow')}
            </span>
          </motion.div>

          {/* H1 */}
          <motion.h1
            variants={slideUp}
            className="text-[48px] sm:text-[56px] lg:text-[72px] font-extrabold leading-[1.05] tracking-tight text-[#1A1209]"
          >
            {t('hero_line1')},
            <br />
            <span className="text-[#E05A28]">{t('hero_line2')}</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={slideUp}
            className="text-[18px] text-[#6B5748] leading-relaxed max-w-[360px]"
          >
            {t('hero_subtitle_v2')}
          </motion.p>

          {/* CTA buttons */}
          <motion.div variants={slideUp} className="flex items-center gap-3 flex-wrap">
            <Link
              href="/browse"
              className="inline-flex items-center gap-1.5 bg-[#E05A28] text-white font-bold px-8 py-4 rounded-full text-sm hover:bg-[#C84E20] transition-colors shadow-md shadow-[#E05A28]/30 hover:shadow-lg hover:shadow-[#E05A28]/40"
            >
              {t('browse_deals')} →
            </Link>
            <Link
              href="/map"
              className="inline-flex items-center gap-2 border-2 border-[#E05A28] text-[#E05A28] font-semibold px-7 py-3.5 rounded-full text-sm hover:bg-[#E05A28]/8 transition-colors"
            >
              <MapPin className="w-4 h-4" />
              {tMap('title')}
            </Link>
          </motion.div>

          {/* Stats row */}
          <motion.div variants={slideUp} className="flex items-center gap-0 flex-wrap sm:flex-nowrap">
            {[
              { value: '2,400+', label: t('hero_stat_deals') },
              { value: '70%', label: t('hero_stat_discount') },
              { value: '180kg', label: t('hero_stat_rescued') },
            ].map(({ value, label }, i) => (
              <div key={label} className="flex items-center">
                <div className={`flex flex-col gap-1 ${i === 0 ? 'pr-6' : 'px-6'}`}>
                  <span className="text-2xl font-extrabold text-[#1A1209] leading-none">{value}</span>
                  <span className="text-[10px] font-semibold text-[#9B8276] tracking-widest uppercase leading-none">{label}</span>
                </div>
                {i < 2 && <div className="w-px h-9 bg-[#DDD0CA] self-center flex-shrink-0" />}
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* ── Right column ── */}
        <motion.div
          className="flex items-center justify-center order-1 md:order-2"
          style={{ width: '50%', alignItems: 'center' }}
          variants={rightPanel}
          initial="hidden"
          animate="visible"
        >
          {/* Single wrapper: float animation + relative anchor for badge */}
          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={floatTransition}
            style={{ position: 'relative', width: '100%', maxWidth: '490px', flexShrink: 0 }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/foody-bag.png"
              alt="Foody Moody bag"
              style={{
                width: '100%',
                height: 'auto',
                maxWidth: '490px',
                display: 'block',
              }}
            />

            {/* Badge — absolute inside wrapper, no filter interference */}
            <div
              style={{
                position: 'absolute',
                top: '18%',
                right: '8%',
                zIndex: 10,
                width: '84px',
                height: '84px',
                borderRadius: '50%',
                background: '#FFD23F',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                transform: 'rotate(-12deg)',
                boxShadow: '0 10px 30px rgba(253,211,63,0.35)',
              }}
            >
              <span style={{ fontSize: '23px', fontWeight: 800, color: '#7A3E00', lineHeight: '1' }}>-70%</span>
              <span style={{ fontSize: '10px', fontWeight: 600, color: '#A05800', letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: '2px' }}>{t('hero_badge_today')}</span>
            </div>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}
