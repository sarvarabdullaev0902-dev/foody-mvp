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

const badgePop = {
  hidden: { opacity: 0, scale: 0.4 },
  visible: {
    opacity: 1, scale: 1,
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
    opacity: 1, x: 0,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  },
};

// ─── Shopping Trolley SVG ─────────────────────────────────────────────────────

function ShoppingTrolley() {
  const meshVerticals = [84, 118, 152, 186, 220, 254, 288, 322];
  const meshHorizontals = [170, 198, 226, 254, 282];

  return (
    <svg
      width="380"
      height="420"
      viewBox="0 0 400 440"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="drop-shadow-xl"
    >
      <defs>
        <clipPath id="basketMesh">
          <path d="M42 142 L358 142 L344 294 L56 294 Z" />
        </clipPath>
        <linearGradient id="trolleyBodyGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#EE7040" />
          <stop offset="55%" stopColor="#E86038" />
          <stop offset="100%" stopColor="#CC4820" />
        </linearGradient>
      </defs>

      {/* ═══════════════════════════════════════════════
          LAYER 1 — FOOD ITEMS
          Drawn first so basket front wall covers bottoms
          ═══════════════════════════════════════════════ */}

      {/* 1. Baguette — far left, tall, leans ~-14° */}
      <g transform="translate(50, 38) rotate(-14, 17, 60)">
        <path
          d="M17 3 C10 6 7 18 7 37 C7 61 8 90 13 110 C14 115 16 117 17 117 C18 117 20 115 21 110 C26 90 27 61 27 37 C27 18 24 6 17 3Z"
          fill="#D49040"
        />
        <path
          d="M17 3 C12 7 10 18 10 36 C10 54 11 76 14 96 C12 70 12 38 14 17 C15 9 16 5 17 3Z"
          fill="#E8B060"
          opacity="0.75"
        />
        {[15, 26, 37, 49, 61, 73, 85, 97].map((y) => (
          <path key={y} d={`M8 ${y} Q17 ${y - 3} 26 ${y}`} stroke="#A86820" strokeWidth="1.3" fill="none" strokeLinecap="round" />
        ))}
        <ellipse cx="17" cy="6" rx="5.5" ry="6" fill="#B86818" />
        <ellipse cx="17" cy="111" rx="5.5" ry="6" fill="#B86818" />
      </g>

      {/* 2. Broccoli — left-center */}
      <g transform="translate(118, 76)">
        <rect x="23" y="39" width="9" height="28" rx="4" fill="#3D7025" />
        <rect x="25" y="43" width="5" height="18" rx="2.5" fill="#305818" />
        <circle cx="14" cy="37" r="12" fill="#4A9430" />
        <circle cx="41" cy="37" r="12" fill="#4A9430" />
        <circle cx="27" cy="30" r="15" fill="#4EA832" />
        <circle cx="13" cy="33" r="9" fill="#5EC440" />
        <circle cx="41" cy="33" r="9" fill="#5EC440" />
        <circle cx="27" cy="24" r="11" fill="#68D448" />
        <circle cx="20" cy="18" r="7" fill="#78E455" />
        <circle cx="34" cy="18" r="7" fill="#78E455" />
        <circle cx="27" cy="12" r="8" fill="#86F063" />
      </g>

      {/* 3. Apple — center */}
      <g transform="translate(179, 90)">
        <path d="M25 8 C10 8 5 21 5 32 C5 45 13 54 21 54 C23 54 24 53 25 53 C26 53 27 54 29 54 C37 54 45 45 45 32 C45 21 40 8 25 8Z" fill="#CC2E2E" />
        <path d="M25 8 C16 8 7 18 7 30 C9 27 15 26 18 30 C18 30 14 14 25 8Z" fill="#E04848" />
        <ellipse cx="17" cy="20" rx="4" ry="6" fill="#E86060" opacity="0.38" />
        <path d="M22 8 C22 5 25 3 25 3 C25 3 28 5 28 8" stroke="#3A6820" strokeWidth="2.2" strokeLinecap="round" fill="none" />
        <path d="M25 3 C25 3 31 1 33 5 C31 4 28 4 25 3Z" fill="#3A6820" />
      </g>

      {/* 4. Juice carton — center-right */}
      <g transform="translate(236, 72)">
        <path d="M8 3 L6 14 L38 14 L36 3 Q34 1 22 1 Q10 1 8 3Z" fill="#FFECD0" />
        <path d="M15 3 L14 14 L30 14 L29 3Z" fill="#FFE0B0" opacity="0.8" />
        <rect x="4" y="14" width="36" height="52" rx="3" fill="#FFF0DC" />
        <rect x="4" y="38" width="36" height="5" fill="#E05A28" opacity="0.9" />
        <rect x="4" y="43" width="36" height="23" fill="#F07030" opacity="0.1" />
        <circle cx="22" cy="29" r="9" fill="#F07030" opacity="0.18" />
        <circle cx="22" cy="29" r="6" fill="#F07030" opacity="0.45" />
        <text x="22" y="33" textAnchor="middle" fontSize="5.5" fill="white" fontWeight="800">100%</text>
        <text x="22" y="12" textAnchor="middle" fontSize="4.5" fill="#C04E18" fontWeight="700" letterSpacing="0.3">JUICE</text>
        <line x1="6" y1="14" x2="38" y2="14" stroke="#EED0A0" strokeWidth="0.8" />
      </g>

      {/* 5. Carrot bunch — right, slight lean */}
      <g transform="translate(280, 76) rotate(7, 27, 40)">
        {/* Three carrots */}
        <path d="M10 5 C6 9 4 21 5 37 C6 51 9 65 12 70 C15 65 18 51 19 37 C20 21 18 9 14 5Z" fill="#EE7020" />
        <path d="M28 2 C24 5 22 17 22 33 C22 48 25 63 28 68 C31 63 34 48 34 33 C34 17 32 5 28 2Z" fill="#F07828" />
        <path d="M46 5 C42 9 40 21 40 37 C40 51 43 63 46 67 C49 63 52 51 52 37 C52 21 50 9 46 5Z" fill="#EE7020" />
        {/* Highlights */}
        <path d="M10 5 C7 9 6 19 7 33Z" fill="#F8A040" opacity="0.5" />
        <path d="M28 2 C25 6 23 16 24 30Z" fill="#F8A040" opacity="0.5" />
        {/* Texture marks */}
        <path d="M6 22 Q12 21 18 22" stroke="#C85810" strokeWidth="0.8" fill="none" strokeLinecap="round" />
        <path d="M24 18 Q28 17 32 18" stroke="#C85810" strokeWidth="0.8" fill="none" strokeLinecap="round" />
        {/* Green tops (left carrot) */}
        <path d="M8 6 C4 0 1 1 3 6" stroke="#3A6820" strokeWidth="2" strokeLinecap="round" fill="none" />
        <path d="M12 4 C11 -1 9 -3 8 -1" stroke="#3A6820" strokeWidth="2" strokeLinecap="round" fill="none" />
        <path d="M16 5 C18 0 21 1 19 6" stroke="#3A6820" strokeWidth="2" strokeLinecap="round" fill="none" />
        {/* Green tops (middle carrot) */}
        <path d="M25 3 C22 -2 19 0 21 5" stroke="#3A6820" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        <path d="M28 1 C28 -4 26 -6 25 -3" stroke="#3A6820" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        <path d="M31 3 C34 -2 37 0 36 5" stroke="#3A6820" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        {/* Green tops (right carrot) */}
        <path d="M43 5 C40 0 37 1 39 7" stroke="#3A6820" strokeWidth="2" strokeLinecap="round" fill="none" />
        <path d="M46 4 C46 -1 44 -3 43 -1" stroke="#3A6820" strokeWidth="2" strokeLinecap="round" fill="none" />
        <path d="M49 5 C52 0 55 1 53 7" stroke="#3A6820" strokeWidth="2" strokeLinecap="round" fill="none" />
      </g>

      {/* 6. Yogurt cup — far right */}
      <g transform="translate(318, 88)">
        <path d="M5 14 C5 8 8 5 21 5 C34 5 37 8 37 14 L37 52 Q37 56 21 56 Q5 56 5 52 Z" fill="#FFFAF5" />
        <rect x="5" y="22" width="32" height="10" fill="#E05A28" opacity="0.85" />
        <rect x="5" y="32" width="32" height="20" fill="#FEF0E0" />
        <ellipse cx="21" cy="14" rx="16" ry="5.5" fill="#FFF0DC" />
        <ellipse cx="21" cy="14" rx="16" ry="5.5" stroke="#EED8C0" strokeWidth="0.8" fill="none" />
        <circle cx="21" cy="42" r="10" fill="#E05A28" opacity="0.16" />
        <circle cx="21" cy="42" r="7" fill="#E05A28" opacity="0.28" />
        <text x="21" y="46" textAnchor="middle" fontSize="6" fill="#B83810" fontWeight="800">YO!</text>
      </g>

      {/* ═══════════════════════════════════════════════
          LAYER 2 — BASKET STRUCTURE (hides item bottoms)
          ═══════════════════════════════════════════════ */}

      {/* Opening depth strip (looking slightly down into basket) */}
      <path d="M50 130 L350 130 L358 142 L42 142 Z" fill="#8A2C0A" />

      {/* Front face fill */}
      <path d="M42 142 L358 142 L344 294 L56 294 Z" fill="url(#trolleyBodyGrad)" />

      {/* Right-side depth shadow */}
      <path d="M344 294 L358 142 L366 148 L350 298 Z" fill="#8A2C08" opacity="0.42" />

      {/* Wire mesh (clipped to basket face) */}
      <g clipPath="url(#basketMesh)" opacity="0.32">
        {meshVerticals.map((x) => (
          <line key={x} x1={x} y1="138" x2={x} y2="298" stroke="#9A3010" strokeWidth="1.6" />
        ))}
        {meshHorizontals.map((y) => (
          <line key={y} x1="38" y1={y} x2="362" y2={y} stroke="#9A3010" strokeWidth="1.6" />
        ))}
      </g>

      {/* Top rim (thick bar) */}
      <path d="M38 124 L362 124 L358 142 L42 142 Z" fill="#C84018" />
      <path d="M40 124 L360 124 L357 134 L43 134 Z" fill="#D85028" opacity="0.55" />

      {/* ═══════════════════════════════════════════════
          LAYER 3 — HANDLE
          ═══════════════════════════════════════════════ */}

      {/* Left post */}
      <rect x="90" y="66" width="15" height="61" rx="5.5" fill="#B83812" />
      <rect x="91" y="66" width="7" height="61" rx="4" fill="#CC4A1E" opacity="0.5" />

      {/* Right post */}
      <rect x="295" y="66" width="15" height="61" rx="5.5" fill="#B83812" />
      <rect x="296" y="66" width="7" height="61" rx="4" fill="#CC4A1E" opacity="0.5" />

      {/* Handle bar */}
      <rect x="76" y="46" width="248" height="22" rx="11" fill="#A82E0E" />
      <rect x="78" y="47" width="244" height="10" rx="8" fill="#C84018" opacity="0.6" />
      <rect x="78" y="58" width="244" height="9" rx="5" fill="#6E1A04" opacity="0.3" />

      {/* ═══════════════════════════════════════════════
          LAYER 4 — BOTTOM SHELF + AXLE + WHEELS
          ═══════════════════════════════════════════════ */}

      {/* Bottom shelf */}
      <path d="M60 294 L340 294 L334 324 L66 324 Z" fill="#CC5A28" />
      <g opacity="0.3">
        {[105, 148, 191, 234, 277, 318].map((x) => (
          <line key={x} x1={x} y1="294" x2={x - 3} y2="324" stroke="#9A2E0A" strokeWidth="1.2" />
        ))}
        <line x1="62" y1="309" x2="338" y2="309" stroke="#9A2E0A" strokeWidth="1.2" />
      </g>

      {/* Left strut */}
      <rect x="88" y="324" width="14" height="22" rx="5" fill="#9A2E0A" />
      {/* Right strut */}
      <rect x="298" y="324" width="14" height="22" rx="5" fill="#9A2E0A" />

      {/* Axle bar */}
      <rect x="100" y="343" width="200" height="8" rx="4" fill="#882408" />

      {/* Wheel shadows */}
      <ellipse cx="105" cy="380" rx="30" ry="8" fill="rgba(0,0,0,0.1)" />
      <ellipse cx="295" cy="380" rx="30" ry="8" fill="rgba(0,0,0,0.1)" />

      {/* Left wheel */}
      <circle cx="105" cy="362" r="28" fill="#B83010" />
      <circle cx="105" cy="362" r="20" fill="#C84018" />
      <line x1="105" y1="334" x2="105" y2="390" stroke="#9A2808" strokeWidth="3" />
      <line x1="77"  y1="362" x2="133" y2="362" stroke="#9A2808" strokeWidth="3" />
      <line x1="85"  y1="342" x2="125" y2="382" stroke="#9A2808" strokeWidth="2.5" />
      <line x1="125" y1="342" x2="85"  y2="382" stroke="#9A2808" strokeWidth="2.5" />
      <circle cx="105" cy="362" r="8" fill="#9A2808" />
      <circle cx="105" cy="362" r="4" fill="#E06028" />

      {/* Right wheel */}
      <circle cx="295" cy="362" r="28" fill="#B83010" />
      <circle cx="295" cy="362" r="20" fill="#C84018" />
      <line x1="295" y1="334" x2="295" y2="390" stroke="#9A2808" strokeWidth="3" />
      <line x1="267" y1="362" x2="323" y2="362" stroke="#9A2808" strokeWidth="3" />
      <line x1="275" y1="342" x2="315" y2="382" stroke="#9A2808" strokeWidth="2.5" />
      <line x1="315" y1="342" x2="275" y2="382" stroke="#9A2808" strokeWidth="2.5" />
      <circle cx="295" cy="362" r="8" fill="#9A2808" />
      <circle cx="295" cy="362" r="4" fill="#E06028" />
    </svg>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

interface HeroSectionProps {
  t: (key: string) => string;
  tMap: (key: string) => string;
  tCat: (key: string) => string;
}

export default function HeroSection({ t, tMap, tCat }: HeroSectionProps) {
  return (
    <section className="relative bg-[#FDF4F0] overflow-hidden min-h-screen flex items-center">

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
              { value: '2,400+', label: t('hero_stat_deals')    },
              { value: '70%',    label: t('hero_stat_discount') },
              { value: '180kg',  label: t('hero_stat_rescued')  },
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
          {/* Warm spotlight circle behind trolley */}
          <div
            className="absolute w-[400px] h-[400px] rounded-full pointer-events-none"
            style={{ background: '#F5D8CB', filter: 'blur(4px)' }}
          />

          {/* Category chips — left of trolley */}
          <motion.div
            className="absolute top-1/2 -translate-y-1/2 flex flex-col gap-3 z-10 hidden sm:flex"
            style={{ left: '-4px' }}
            variants={chipStagger}
            initial="hidden"
            animate="visible"
          >
            {[
              { label: tCat('bakery'),      dot: '#3B9A6E' },
              { label: tCat('restaurant'),  dot: '#E05A28' },
              { label: tCat('supermarket'), dot: '#3B82F6' },
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

          {/* Trolley + badge */}
          <div className="relative z-10 ml-0 sm:ml-6">
            <ShoppingTrolley />

            {/* Discount badge — spring pop, then pulse loop */}
            <motion.div
              className="absolute z-20"
              style={{ top: 28, right: -22, rotate: '-12deg', transformOrigin: 'center' }}
              variants={badgePop}
              initial="hidden"
              animate="visible"
            >
              <motion.div
                animate={{ scale: [1, 1.06, 1] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay: 1.6 }}
                className="w-[84px] h-[84px] rounded-full flex flex-col items-center justify-center shadow-xl shadow-yellow-300/30"
                style={{ background: '#FFD23F' }}
              >
                <span className="text-[23px] font-extrabold text-[#7A3E00] leading-none">-70%</span>
                <span className="text-[10px] font-semibold text-[#A05800] tracking-widest uppercase mt-0.5">{t('hero_badge_today')}</span>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
