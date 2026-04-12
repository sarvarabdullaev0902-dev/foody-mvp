'use client';

import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';
import { Link } from '@/i18n/navigation';

// ─── Animation variants ──────────────────────────────────────────────────────

const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.05 },
  },
};

const slideUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  },
};

const rightPanel = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  },
};

const badgePop = {
  hidden: { opacity: 0, scale: 0.4 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: 'spring' as const, stiffness: 380, damping: 18, delay: 0.8 },
  },
};

const chipStagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 1.0 } },
};

const chipFade = {
  hidden: { opacity: 0, x: 14 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  },
};

// ─── Main component ───────────────────────────────────────────────────────────

interface HeroSectionProps {
  t: (key: string) => string;
  tMap: (key: string) => string;
}

export default function HeroSection({ t, tMap }: HeroSectionProps) {
  return (
    <section className="relative bg-[#FDF4F0] overflow-hidden min-h-screen flex items-center">

      {/* ── Background circle outlines (decorative) ── */}
      <div className="absolute -top-32 -left-32 w-[480px] h-[480px] rounded-full border border-[#E05A28]/10 pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-[560px] h-[560px] rounded-full border border-[#E05A28]/8 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full border border-[#E05A28]/5 pointer-events-none hidden md:block" />
      <div className="absolute -bottom-40 left-1/4 w-[320px] h-[320px] rounded-full border border-[#E05A28]/8 pointer-events-none hidden md:block" />

      <div className="relative w-full max-w-6xl mx-auto px-5 sm:px-8 py-20 md:py-0 flex flex-col md:flex-row items-center gap-14 md:gap-10">

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
              Discounted food near you
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
            Near-expiry deals from restaurants, bakeries and supermarkets. Up to 70% off, every day.
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
          <motion.div
            variants={slideUp}
            className="flex items-center gap-0 flex-wrap sm:flex-nowrap"
          >
            {[
              { value: '2,400+', label: 'DEALS SAVED'   },
              { value: '70%',    label: 'AVG. DISCOUNT' },
              { value: '180kg',  label: 'FOOD RESCUED'  },
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
          className="flex-1 relative flex items-center justify-center order-1 md:order-2 w-full"
          variants={rightPanel}
          initial="hidden"
          animate="visible"
        >
          {/* Category chips — left of image */}
          <motion.div
            className="absolute top-1/2 -translate-y-1/2 flex flex-col gap-3 z-10 hidden sm:flex"
            style={{ left: '-4px' }}
            variants={chipStagger}
            initial="hidden"
            animate="visible"
          >
            {[
              { label: 'Bakery',      dot: '#3B9A6E' },
              { label: 'Restaurant',  dot: '#E05A28' },
              { label: 'Supermarket', dot: '#3B82F6' },
            ].map(({ label, dot }) => (
              <motion.div
                key={label}
                variants={chipFade}
                className="flex items-center gap-2 bg-white/90 backdrop-blur-sm border border-[#EDE0D8] rounded-full px-3 py-1.5 shadow-sm"
              >
                <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: dot }} />
                <span className="text-xs font-semibold text-[#4A3A34] whitespace-nowrap">{label}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* Photo + badge */}
          <div className="relative z-10 ml-0 sm:ml-8">
            {/* Grocery bag photo */}
            <div
              className="relative overflow-hidden shadow-2xl"
              style={{ width: 400, height: 500, borderRadius: 24 }}
            >
              {/* Photo */}
              <img
                src="https://images.unsplash.com/photo-1542838132-92c53300491e?w=600"
                alt="Fresh groceries"
                className="w-full h-full object-cover"
                style={{ objectPosition: 'center' }}
              />
              {/* Warm coral tint overlay */}
              <div
                className="absolute inset-0"
                style={{
                  background: 'rgba(224, 90, 40, 0.13)',
                  mixBlendMode: 'multiply',
                }}
              />
              {/* Subtle vignette for depth */}
              <div
                className="absolute inset-0"
                style={{
                  background: 'radial-gradient(ellipse at center, transparent 55%, rgba(26,18,9,0.22) 100%)',
                }}
              />
            </div>

            {/* Discount badge — spring pop on mount, then continuous pulse */}
            <motion.div
              className="absolute z-20"
              style={{ top: -20, right: -20, rotate: '-12deg', transformOrigin: 'center' }}
              variants={badgePop}
              initial="hidden"
              animate="visible"
            >
              <motion.div
                animate={{ scale: [1, 1.06, 1] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay: 1.6 }}
                className="w-[86px] h-[86px] rounded-full flex flex-col items-center justify-center shadow-xl shadow-yellow-300/30"
                style={{ background: '#FFD23F' }}
              >
                <span className="text-[24px] font-extrabold text-[#7A3E00] leading-none">-70%</span>
                <span className="text-[10px] font-semibold text-[#A05800] tracking-widest uppercase mt-0.5">today</span>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
