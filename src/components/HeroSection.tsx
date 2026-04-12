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

// ─── SVG Illustrations ────────────────────────────────────────────────────────

function BaguetteSVG() {
  return (
    <svg width="34" height="118" viewBox="0 0 34 118" fill="none">
      {/* Body */}
      <path d="M17 4 C10 6 7 18 7 38 C7 62 8 90 13 110 C14 114 16 116 17 116 C18 116 20 114 21 110 C26 90 27 62 27 38 C27 18 24 6 17 4Z" fill="#D4954A" />
      {/* Highlight left side */}
      <path d="M17 4 C12 8 10 20 10 38 C10 55 11 78 14 98 C14 98 12 70 13 40 C14 20 15 8 17 4Z" fill="#E8B060" />
      {/* Score marks (diagonal slashes) */}
      {[18, 30, 42, 54, 66, 78, 90].map((y) => (
        <path key={y} d={`M10 ${y} Q17 ${y - 3} 24 ${y}`} stroke="#B07030" strokeWidth="1.4" strokeLinecap="round" fill="none" />
      ))}
      {/* Tip ends */}
      <ellipse cx="17" cy="6"   rx="4.5" ry="5.5" fill="#BF7E30" />
      <ellipse cx="17" cy="112" rx="4.5" ry="5.5" fill="#BF7E30" />
    </svg>
  );
}

function BroccoliSVG() {
  return (
    <svg width="54" height="68" viewBox="0 0 54 68" fill="none">
      {/* Stem */}
      <rect x="23" y="40" width="8" height="26" rx="4" fill="#4A7A2E" />
      <rect x="25" y="44" width="4" height="18" rx="2" fill="#3D6626" />
      {/* Florets — back row */}
      <circle cx="14" cy="36" r="11" fill="#4E9A30" />
      <circle cx="40" cy="36" r="11" fill="#4E9A30" />
      <circle cx="27" cy="30" r="14" fill="#52A432" />
      {/* Florets — front highlights */}
      <circle cx="13" cy="33" r="8"  fill="#62BE40" />
      <circle cx="41" cy="33" r="8"  fill="#62BE40" />
      <circle cx="27" cy="26" r="11" fill="#68C845" />
      {/* Top bumps */}
      <circle cx="20" cy="22" r="6"  fill="#74D450" />
      <circle cx="34" cy="22" r="6"  fill="#74D450" />
      <circle cx="27" cy="18" r="7"  fill="#7EDE58" />
    </svg>
  );
}

function AppleSVG() {
  return (
    <svg width="50" height="56" viewBox="0 0 50 56" fill="none">
      {/* Body */}
      <path d="M25 9 C10 9 5 22 5 33 C5 46 13 55 21 55 C23 55 24 54 25 54 C26 54 27 55 29 55 C37 55 45 46 45 33 C45 22 40 9 25 9Z" fill="#C83030" />
      {/* Left highlight */}
      <path d="M25 9 C16 9 7 18 7 31 C9 28 15 27 18 31 C18 31 14 16 25 9Z" fill="#E04848" />
      {/* Shine */}
      <ellipse cx="17" cy="22" rx="4" ry="6" fill="#E86060" opacity="0.45" />
      {/* Center divot */}
      <path d="M22 9 C22 6 25 4 25 4 C25 4 28 6 28 9" stroke="#4A7A2E" strokeWidth="2" strokeLinecap="round" fill="none" />
      {/* Leaf */}
      <path d="M25 4 C25 4 30 2 32 6 C30 5 27 5 25 4Z" fill="#4A7A2E" />
    </svg>
  );
}

function CarrotSVG() {
  return (
    <svg width="30" height="82" viewBox="0 0 30 82" fill="none">
      {/* Body */}
      <path d="M15 2 C8 6 4 20 5 38 C6 54 11 70 15 76 C19 70 24 54 25 38 C26 20 22 6 15 2Z" fill="#F07220" />
      {/* Left highlight */}
      <path d="M15 2 C10 6 8 18 9 34 C9 34 11 22 15 2Z" fill="#F89848" />
      {/* Horizontal texture lines */}
      {[16, 26, 38, 50].map((y) => (
        <path key={y} d={`M7 ${y} Q15 ${y - 2} 23 ${y}`} stroke="#D05C10" strokeWidth="0.9" strokeLinecap="round" fill="none" />
      ))}
      {/* Green tops */}
      <path d="M11 4 C7 -2 3 0 5 5"   stroke="#4A7A2E" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      <path d="M15 2 C15 -2 13 -4 11 -2" stroke="#4A7A2E" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      <path d="M19 4 C23 -2 27 0 25 5"  stroke="#4A7A2E" strokeWidth="2.5" strokeLinecap="round" fill="none" />
    </svg>
  );
}

function JuiceCartonSVG() {
  return (
    <svg width="44" height="70" viewBox="0 0 44 70" fill="none">
      <defs>
        <linearGradient id="cartonGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#FFF4E0" />
          <stop offset="100%" stopColor="#FFEAC8" />
        </linearGradient>
      </defs>
      {/* Body */}
      <rect x="4" y="16" width="36" height="50" rx="3" fill="url(#cartonGrad)" />
      {/* Orange stripe band */}
      <rect x="4" y="40" width="36" height="5"  fill="#E05A28" opacity="0.8" />
      <rect x="4" y="45" width="36" height="21" rx="0" fill="#F07838" opacity="0.12" />
      {/* Gable top */}
      <path d="M8 4 L6 16 L38 16 L36 4 Q34 2 22 2 Q10 2 8 4Z" fill="#FFF0D8" />
      <path d="M15 4 L14 16 L30 16 L29 4Z" fill="#FFE4BC" />
      {/* Fold line at gable */}
      <line x1="6" y1="16" x2="38" y2="16" stroke="#E8C890" strokeWidth="0.8" />
      {/* Orange circle logo */}
      <circle cx="22" cy="30" r="10" fill="#F07838" opacity="0.25" />
      <circle cx="22" cy="30" r="7"  fill="#F07838" opacity="0.5"  />
      {/* Text labels */}
      <text x="22" y="34" textAnchor="middle" fontSize="6.5" fill="white" fontWeight="800">100%</text>
      <text x="22" y="14" textAnchor="middle" fontSize="5"   fill="#D05A18" fontWeight="700" letterSpacing="0.5">JUICE</text>
    </svg>
  );
}

// ─── Grocery Bag (paper bag style) ───────────────────────────────────────────

function GroceryBag() {
  return (
    <svg width="240" height="290" viewBox="0 0 240 290" fill="none" className="drop-shadow-2xl">
      <defs>
        <linearGradient id="bagBody" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%"   stopColor="#EE6E3C" />
          <stop offset="52%"  stopColor="#E05A28" />
          <stop offset="100%" stopColor="#B04018" />
        </linearGradient>
        <linearGradient id="bagFold" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#C84E1E" />
          <stop offset="100%" stopColor="#D85828" />
        </linearGradient>
        <linearGradient id="depthShadow" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="rgba(0,0,0,0.38)" />
          <stop offset="100%" stopColor="rgba(0,0,0,0)"     />
        </linearGradient>
        <clipPath id="bagBodyClip">
          <path d="M30 70 L210 70 L222 272 Q222 280 212 280 L28 280 Q18 280 18 272 Z" />
        </clipPath>
      </defs>

      {/* ── Main body ── */}
      <path
        d="M30 70 L210 70 L222 272 Q222 280 212 280 L28 280 Q18 280 18 272 Z"
        fill="url(#bagBody)"
      />

      {/* Right depth panel */}
      <path
        d="M192 70 L210 70 L222 272 Q222 280 212 280 L196 280 L184 272 Z"
        fill="#983410"
        opacity="0.55"
      />

      {/* Left crease — shadow side */}
      <line x1="90" y1="70" x2="84" y2="280" stroke="#983820" strokeWidth="2.5" opacity="0.55" />
      {/* Left crease — highlight side */}
      <line x1="93" y1="70" x2="87" y2="280" stroke="#F07840" strokeWidth="1.2" opacity="0.35" />

      {/* Inner shadow at opening */}
      <rect x="18" y="70" width="204" height="30" fill="url(#depthShadow)" clipPath="url(#bagBodyClip)" />

      {/* ── Top rim / folded opening ── */}
      {/* The folded-over paper rim — slightly darker band */}
      <path
        d="M30 70 Q36 62 54 63 L80 65 Q100 67 120 67 Q140 67 160 65 L186 63 Q204 62 210 70 L204 76 Q190 72 168 70 L144 68 Q132 68 120 68 Q108 68 96 68 L72 70 Q50 72 36 76 Z"
        fill="url(#bagFold)"
      />
      {/* Rim highlight line — suggests the folded paper edge */}
      <path
        d="M36 63 Q80 57 120 58 Q160 57 204 63"
        stroke="#F07840"
        strokeWidth="1.4"
        fill="none"
        opacity="0.45"
      />
      {/* Subtle second fold shadow for depth */}
      <path
        d="M38 65 Q80 60 120 61 Q160 60 202 65"
        stroke="#9A3A18"
        strokeWidth="0.8"
        fill="none"
        opacity="0.3"
      />

      {/* ── Twisted paper handles ── */}
      {/* Left handle */}
      {/* Outer shadow rope */}
      <path d="M66 70 C56 42 57 22 80 19 C103 16 109 40 104 70"
            stroke="#8A2E0E" strokeWidth="13" strokeLinecap="round" fill="none" />
      {/* Main handle rope color */}
      <path d="M66 70 C56 42 57 22 80 19 C103 16 109 40 104 70"
            stroke="#C84018" strokeWidth="9"  strokeLinecap="round" fill="none" />
      {/* Twist strand A – weaves over */}
      <path d="M63 64 C56 46 59 28 78 23 C92 19 103 28 105 46 C106 54 105 62 104 70"
            stroke="#E86030" strokeWidth="3"  strokeLinecap="round" fill="none" opacity="0.55" />
      {/* Twist strand B – highlight */}
      <path d="M68 70 C60 48 62 30 80 26 C94 23 102 36 102 54 C102 62 103 66 104 70"
            stroke="#F08858" strokeWidth="1.8" strokeLinecap="round" fill="none" opacity="0.4"  />

      {/* Right handle */}
      <path d="M136 70 C131 40 132 20 158 17 C182 14 188 40 182 70"
            stroke="#8A2E0E" strokeWidth="13" strokeLinecap="round" fill="none" />
      <path d="M136 70 C131 40 132 20 158 17 C182 14 188 40 182 70"
            stroke="#C84018" strokeWidth="9"  strokeLinecap="round" fill="none" />
      <path d="M133 64 C129 46 133 28 154 23 C168 19 180 28 182 46 C183 54 182 62 182 70"
            stroke="#E86030" strokeWidth="3"  strokeLinecap="round" fill="none" opacity="0.55" />
      <path d="M138 70 C134 48 136 30 156 26 C170 23 179 36 180 54 C180 62 181 66 182 70"
            stroke="#F08858" strokeWidth="1.8" strokeLinecap="round" fill="none" opacity="0.4"  />

      {/* ── Wordmark near bottom ── */}
      <g opacity="0.2">
        <path d="M76 254 C76 244 86 238 96 242 C86 242 82 248 82 254 C82 260 86 264 92 264 C98 264 102 260 102 254 C102 248 98 244 96 242 C106 244 108 254 104 262 C100 270 84 268 76 254Z"
              fill="white" />
        <text x="108" y="260" fontSize="11.5" fill="white" fontWeight="700" letterSpacing="0.4" fontFamily="system-ui">
          foody moody
        </text>
      </g>
    </svg>
  );
}

// ─── Products inside the bag ──────────────────────────────────────────────────

function BagWithProducts() {
  return (
    <div className="relative w-[240px] h-[290px]">
      {/* Products layer — sits behind the bag */}
      <div className="absolute inset-0" style={{ zIndex: 1 }}>
        <svg width="240" height="290" viewBox="0 0 240 290" fill="none">
          <defs>
            {/* Only show items above the bag opening (y ≤ 78) */}
            <clipPath id="itemsClip">
              <rect x="0" y="-60" width="240" height="138" />
            </clipPath>
          </defs>

          {/* Baguette — far left, tall diagonal, leans right ~12° */}
          <g transform="translate(26,-22) rotate(12,17,59)" clipPath="url(#itemsClip)">
            <BaguetteSVG />
          </g>

          {/* Broccoli — left-center, straight up */}
          <g transform="translate(62,8)" clipPath="url(#itemsClip)">
            <BroccoliSVG />
          </g>

          {/* Apple — center, only top ~40% visible */}
          <g transform="translate(104,44)" clipPath="url(#itemsClip)">
            <AppleSVG />
          </g>

          {/* Carrot — right-center, leans left ~8° */}
          <g transform="translate(152,-14) rotate(-8,15,41)" clipPath="url(#itemsClip)">
            <CarrotSVG />
          </g>

          {/* Juice carton — far right */}
          <g transform="translate(183,6)" clipPath="url(#itemsClip)">
            <JuiceCartonSVG />
          </g>
        </svg>
      </div>

      {/* Bag covers the lower halves of all items */}
      <div className="absolute inset-0" style={{ zIndex: 2 }}>
        <GroceryBag />
      </div>
    </div>
  );
}

// ─── Floating background decorations ─────────────────────────────────────────

function FloatingLeaf({ x, y, delay, size = 30 }: { x: number; y: number; delay: number; size?: number }) {
  return (
    <motion.div
      className="absolute pointer-events-none hidden md:block"
      style={{ left: x, top: y }}
      animate={{ y: [0, -13, 0] }}
      transition={{ duration: 4.8, repeat: Infinity, ease: 'easeInOut', delay }}
    >
      <svg width={size} height={size} viewBox="0 0 30 32" fill="none" opacity="0.17">
        {/* Leaf teardrop */}
        <path d="M15 2 C8 6 4 14 4 20 C4 27 9 30 15 30 C21 30 26 27 26 20 C26 14 22 6 15 2Z" fill="#E05A28" />
        {/* Center vein */}
        <line x1="15" y1="4"  x2="15" y2="29" stroke="#B04018" strokeWidth="1.2" strokeLinecap="round" />
        {/* Side veins */}
        <line x1="15" y1="12" x2="9"  y2="17" stroke="#B04018" strokeWidth="0.8" strokeLinecap="round" />
        <line x1="15" y1="18" x2="9"  y2="22" stroke="#B04018" strokeWidth="0.8" strokeLinecap="round" />
        <line x1="15" y1="12" x2="21" y2="17" stroke="#B04018" strokeWidth="0.8" strokeLinecap="round" />
        <line x1="15" y1="18" x2="21" y2="22" stroke="#B04018" strokeWidth="0.8" strokeLinecap="round" />
      </svg>
    </motion.div>
  );
}

function FloatingSparkle({ x, y, delay }: { x: number; y: number; delay: number }) {
  return (
    <motion.div
      className="absolute pointer-events-none hidden md:block"
      style={{ left: x, top: y }}
      animate={{ y: [0, -10, 0], rotate: [0, 20, 0] }}
      transition={{ duration: 5.2, repeat: Infinity, ease: 'easeInOut', delay }}
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" opacity="0.16">
        {/* 4-point sparkle */}
        <path d="M12 1 L13.5 10.5 L23 12 L13.5 13.5 L12 23 L10.5 13.5 L1 12 L10.5 10.5 Z" fill="#E05A28" />
        {/* Small center dot */}
        <circle cx="12" cy="12" r="2" fill="#FFD23F" />
      </svg>
    </motion.div>
  );
}

function FloatingBagOutline({ x, y, delay }: { x: number; y: number; delay: number }) {
  return (
    <motion.div
      className="absolute pointer-events-none hidden md:block"
      style={{ left: x, top: y }}
      animate={{ y: [0, -11, 0] }}
      transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut', delay }}
    >
      <svg width="26" height="30" viewBox="0 0 26 30" fill="none" opacity="0.15">
        {/* Bag outline */}
        <path d="M3 8 L23 8 L25 26 Q25 28 23 28 L3 28 Q1 28 1 26 Z"
              stroke="#E05A28" strokeWidth="1.5" fill="none" strokeLinejoin="round" />
        {/* Handle */}
        <path d="M8 8 C7 3 9 1 13 1 C17 1 19 3 18 8"
              stroke="#E05A28" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      </svg>
    </motion.div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

interface HeroSectionProps {
  t: (key: string) => string;
  tMap: (key: string) => string;
}

export default function HeroSection({ t, tMap }: HeroSectionProps) {
  return (
    <section
      className="relative bg-[#FDF4F0] overflow-hidden"
      style={{ minHeight: 'clamp(580px, 90vh, 760px)' }}
    >
      {/* Floating background decorations */}
      <FloatingLeaf       x={28}  y={55}  delay={0}    size={32} />
      <FloatingSparkle    x={82}  y={18}  delay={1.3}  />
      <FloatingBagOutline x={55}  y={190} delay={2.5}  />

      <div className="relative max-w-6xl mx-auto px-5 sm:px-8 py-16 md:py-20 flex flex-col md:flex-row items-center gap-12 md:gap-8">

        {/* ── Left column ── */}
        <motion.div
          className="flex-1 flex flex-col items-start gap-6 order-2 md:order-1 w-full"
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
            className="text-4xl sm:text-5xl lg:text-[58px] font-extrabold leading-[1.1] tracking-tight text-[#1A1209]"
          >
            {t('hero_line1')},
            <br />
            <span className="text-[#E05A28]">{t('hero_line2')}</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={slideUp}
            className="text-[#6B5748] text-base sm:text-lg leading-relaxed max-w-[340px]"
          >
            Near-expiry deals from restaurants, bakeries and supermarkets. Up to 70% off, every day.
          </motion.p>

          {/* CTA buttons */}
          <motion.div variants={slideUp} className="flex items-center gap-3 flex-wrap">
            <Link
              href="/browse"
              className="inline-flex items-center gap-1.5 bg-[#E05A28] text-white font-bold px-7 py-3.5 rounded-full text-sm hover:bg-[#C84E20] transition-colors shadow-md shadow-[#E05A28]/30 hover:shadow-lg hover:shadow-[#E05A28]/40"
            >
              {t('browse_deals')} →
            </Link>
            <Link
              href="/map"
              className="inline-flex items-center gap-2 border-2 border-[#E05A28] text-[#E05A28] font-semibold px-6 py-3 rounded-full text-sm hover:bg-[#E05A28]/8 transition-colors"
            >
              <MapPin className="w-4 h-4" />
              {tMap('title')}
            </Link>
          </motion.div>

          {/* Stats row */}
          <motion.div
            variants={slideUp}
            className="flex items-center gap-0 pt-2 flex-wrap sm:flex-nowrap"
          >
            {[
              { value: '2,400+', label: 'DEALS SAVED'    },
              { value: '70%',    label: 'AVG. DISCOUNT'  },
              { value: '180kg',  label: 'FOOD RESCUED'   },
            ].map(({ value, label }, i) => (
              <div key={label} className="flex items-center">
                <div className={`flex flex-col gap-0.5 ${i === 0 ? 'pr-5' : 'px-5'}`}>
                  <span className="text-xl font-extrabold text-[#1A1209] leading-none">{value}</span>
                  <span className="text-[10px] font-semibold text-[#9B8276] tracking-widest uppercase leading-none mt-0.5">{label}</span>
                </div>
                {i < 2 && <div className="w-px h-8 bg-[#DDD0CA] self-center flex-shrink-0" />}
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
          {/* Warm spotlight circle */}
          <div
            className="absolute w-[320px] h-[320px] rounded-full"
            style={{ background: '#F5D8CB', filter: 'blur(2px)' }}
          />

          {/* Category chips — left of bag */}
          <motion.div
            className="absolute top-1/2 -translate-y-1/2 flex flex-col gap-2.5 z-10 hidden sm:flex"
            style={{ left: '-8px' }}
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

          {/* Bag + badge */}
          <div className="relative z-10">
            <BagWithProducts />

            {/* Discount badge — spring pop on mount, then continuous pulse */}
            <motion.div
              className="absolute z-20"
              style={{ top: '-20px', right: '-16px', rotate: '-12deg', transformOrigin: 'center' }}
              variants={badgePop}
              initial="hidden"
              animate="visible"
            >
              <motion.div
                animate={{ scale: [1, 1.06, 1] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay: 1.6 }}
                className="w-[78px] h-[78px] rounded-full flex flex-col items-center justify-center shadow-lg shadow-yellow-300/40"
                style={{ background: '#FFD23F' }}
              >
                <span className="text-[22px] font-extrabold text-[#7A3E00] leading-none">-70%</span>
                <span className="text-[10px] font-semibold text-[#A05800] tracking-widest uppercase mt-0.5">today</span>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
