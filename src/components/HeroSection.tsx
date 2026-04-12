'use client';

import { motion, useAnimation } from 'framer-motion';
import { useEffect } from 'react';
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
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] },
  },
};

const rightPanel = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] },
  },
};

const badgePop = {
  hidden: { opacity: 0, scale: 0.4 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: 'spring' as const, stiffness: 380, damping: 18, delay: 0.7 },
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
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] },
  },
};

// ─── SVG Illustrations ────────────────────────────────────────────────────────

function BaguetteSVG() {
  return (
    <svg width="38" height="110" viewBox="0 0 38 110" fill="none">
      <ellipse cx="19" cy="55" rx="8" ry="52" fill="#D4A35A" />
      <ellipse cx="19" cy="55" rx="6" ry="50" fill="#E8BC72" />
      {[14, 26, 38, 50, 62, 74, 86].map((y) => (
        <line key={y} x1="12" y1={y} x2="26" y2={y + 4} stroke="#C8943A" strokeWidth="1.2" strokeLinecap="round" />
      ))}
      <ellipse cx="19" cy="9" rx="5.5" ry="7" fill="#C8943A" />
      <ellipse cx="19" cy="101" rx="5.5" ry="7" fill="#C8943A" />
    </svg>
  );
}

function BroccoliSVG() {
  return (
    <svg width="52" height="72" viewBox="0 0 52 72" fill="none">
      <rect x="22" y="38" width="8" height="34" rx="4" fill="#5D8A3C" />
      <rect x="24" y="42" width="4" height="20" rx="2" fill="#4A7030" />
      <circle cx="26" cy="28" r="18" fill="#5CAD3A" />
      <circle cx="14" cy="34" r="12" fill="#5CAD3A" />
      <circle cx="38" cy="34" r="12" fill="#5CAD3A" />
      <circle cx="26" cy="18" r="10" fill="#6DC44A" />
      <circle cx="16" cy="26" r="8" fill="#6DC44A" />
      <circle cx="36" cy="26" r="8" fill="#6DC44A" />
      <circle cx="26" cy="28" r="5" fill="#7ED654" />
      <circle cx="16" cy="34" r="4" fill="#7ED654" />
      <circle cx="36" cy="34" r="4" fill="#7ED654" />
    </svg>
  );
}

function AppleSVG() {
  return (
    <svg width="52" height="60" viewBox="0 0 52 60" fill="none">
      <path d="M26 10 C10 10 6 24 6 34 C6 48 14 58 22 58 C24 58 25 57 26 57 C27 57 28 58 30 58 C38 58 46 48 46 34 C46 24 42 10 26 10Z" fill="#D93C3C" />
      <path d="M26 10 C18 10 8 18 8 32 C8 32 14 28 20 32 C20 32 16 16 26 10Z" fill="#E85555" />
      <path d="M22 8 C22 4 26 2 26 2 C26 2 30 4 30 8" stroke="#5D8A3C" strokeWidth="2" strokeLinecap="round" fill="none" />
      <path d="M26 2 C26 2 32 0 34 4" stroke="#5D8A3C" strokeWidth="1.5" strokeLinecap="round" fill="none" />
      <ellipse cx="18" cy="26" rx="5" ry="7" fill="#E86666" opacity="0.5" />
    </svg>
  );
}

function CarrotSVG() {
  return (
    <svg width="32" height="78" viewBox="0 0 32 78" fill="none">
      <path d="M16 4 C8 8 4 22 6 40 C8 56 14 72 16 74 C18 72 24 56 26 40 C28 22 24 8 16 4Z" fill="#F07A28" />
      <path d="M16 4 C12 8 10 20 11 36 C11 36 14 28 16 4Z" fill="#F8A050" />
      {[18, 30, 42].map((y) => (
        <line key={y} x1="8" y1={y} x2="14" y2={y - 2} stroke="#D86020" strokeWidth="1" strokeLinecap="round" />
      ))}
      <path d="M10 6 C6 0 2 2 4 6" stroke="#5D8A3C" strokeWidth="2" strokeLinecap="round" fill="none" />
      <path d="M16 4 C16 0 14 -2 12 0" stroke="#5D8A3C" strokeWidth="2" strokeLinecap="round" fill="none" />
      <path d="M22 6 C26 0 30 2 28 6" stroke="#5D8A3C" strokeWidth="2" strokeLinecap="round" fill="none" />
    </svg>
  );
}

function JuiceCartonSVG() {
  return (
    <svg width="46" height="68" viewBox="0 0 46 68" fill="none">
      <rect x="4" y="14" width="38" height="52" rx="4" fill="#FFF8EE" />
      <rect x="4" y="14" width="38" height="52" rx="4" fill="url(#juiceGrad)" />
      <rect x="4" y="38" width="38" height="28" rx="0" fill="#F07A28" opacity="0.15" />
      <rect x="4" y="38" width="38" height="6" fill="#E05A28" opacity="0.7" />
      <path d="M10 4 L8 14 L38 14 L36 4 Q34 2 23 2 Q12 2 10 4Z" fill="#FFF0DC" />
      <path d="M16 4 L15 14 L31 14 L30 4Z" fill="#FFE4C0" />
      <circle cx="23" cy="46" r="10" fill="#F07A28" opacity="0.6" />
      <circle cx="23" cy="46" r="7" fill="#F07A28" opacity="0.8" />
      <text x="23" y="50" textAnchor="middle" fontSize="7" fill="white" fontWeight="bold">100%</text>
      <text x="23" y="28" textAnchor="middle" fontSize="5.5" fill="#E05A28" fontWeight="bold">JUICE</text>
      <defs>
        <linearGradient id="juiceGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#FFF8EE" />
          <stop offset="100%" stopColor="#FFE8CC" />
        </linearGradient>
      </defs>
    </svg>
  );
}

// ─── The Bag ──────────────────────────────────────────────────────────────────

function GroceryBag() {
  return (
    <svg
      width="240"
      height="290"
      viewBox="0 0 240 290"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="drop-shadow-2xl"
    >
      <defs>
        <linearGradient id="bagBody" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#E8643A" />
          <stop offset="55%" stopColor="#E05A28" />
          <stop offset="100%" stopColor="#B84820" />
        </linearGradient>
        <linearGradient id="bagTop" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#C8501C" />
          <stop offset="100%" stopColor="#E05A28" />
        </linearGradient>
        <linearGradient id="innerShadow" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(0,0,0,0.35)" />
          <stop offset="100%" stopColor="rgba(0,0,0,0)" />
        </linearGradient>
        <clipPath id="bagClip">
          <path d="M28 72 Q28 66 34 66 L206 66 Q212 66 212 72 L224 268 Q224 278 214 278 L26 278 Q16 278 16 268 Z" />
        </clipPath>
      </defs>

      {/* Bag body */}
      <path
        d="M28 72 Q28 66 34 66 L206 66 Q212 66 212 72 L224 268 Q224 278 214 278 L26 278 Q16 278 16 268 Z"
        fill="url(#bagBody)"
      />

      {/* Right-side depth shadow */}
      <path
        d="M190 66 L206 66 Q212 66 212 72 L224 268 Q224 278 214 278 L198 278 L186 268 Z"
        fill="#A03C16"
        opacity="0.5"
      />

      {/* Center-left crease */}
      <line x1="88" y1="66" x2="82" y2="278" stroke="#C04B1E" strokeWidth="2" opacity="0.6" />
      <line x1="92" y1="66" x2="86" y2="278" stroke="#F07848" strokeWidth="1" opacity="0.3" />

      {/* Top fold — the folded-over rim */}
      <path
        d="M28 66 Q34 60 50 62 L70 64 Q90 68 120 68 Q150 68 170 64 L190 62 Q206 60 212 66 L206 72 Q200 70 180 68 L160 66 Q140 66 120 66 Q100 66 80 66 L60 68 Q40 70 34 72 Z"
        fill="url(#bagTop)"
      />

      {/* Fold highlight */}
      <path
        d="M34 62 Q80 56 120 57 Q160 56 206 62"
        stroke="#F07848"
        strokeWidth="1.5"
        fill="none"
        opacity="0.5"
      />

      {/* Inner shadow at opening */}
      <rect x="16" y="66" width="208" height="28" fill="url(#innerShadow)" clipPath="url(#bagClip)" />

      {/* Left handle */}
      <path
        d="M68 66 C60 38 60 22 80 20 C100 18 104 38 100 66"
        stroke="#C04B1E"
        strokeWidth="10"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M68 66 C60 38 60 22 80 20 C100 18 104 38 100 66"
        stroke="#D45828"
        strokeWidth="6"
        strokeLinecap="round"
        fill="none"
      />

      {/* Right handle */}
      <path
        d="M140 66 C136 38 136 22 160 20 C180 18 184 38 176 66"
        stroke="#C04B1E"
        strokeWidth="10"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M140 66 C136 38 136 22 160 20 C180 18 184 38 176 66"
        stroke="#D45828"
        strokeWidth="6"
        strokeLinecap="round"
        fill="none"
      />

      {/* Bottom rounded corners visual cue */}
      <path d="M16 240 Q16 278 26 278 L30 278 Q20 278 20 268 Z" fill="#A03C16" opacity="0.3" />
      <path d="M224 240 Q224 278 214 278 L210 278 Q220 278 220 268 Z" fill="#A03C16" opacity="0.3" />

      {/* Wordmark area near bottom */}
      <g opacity="0.22">
        {/* Leaf icon */}
        <path
          d="M80 248 C80 238 90 232 100 236 C90 236 86 242 86 248 C86 254 90 258 96 258 C102 258 106 254 106 248 C106 242 102 238 100 236 C110 238 112 248 108 256 C104 264 88 262 80 248Z"
          fill="white"
        />
        {/* "foody moody" text */}
        <text x="112" y="254" fontSize="12" fill="white" fontWeight="700" letterSpacing="0.5" fontFamily="system-ui">
          foody moody
        </text>
      </g>
    </svg>
  );
}

// ─── Products sitting in the bag ─────────────────────────────────────────────

function BagWithProducts() {
  // clip path matches the bag opening
  const clipId = 'productsClip';

  return (
    <div className="relative w-[240px] h-[290px]">
      {/* Products: positioned so bottom halves are hidden inside bag */}
      {/* SVG layer for products - sits BEHIND the bag top */}
      <div className="absolute inset-0" style={{ zIndex: 1 }}>
        <svg width="240" height="290" viewBox="0 0 240 290" fill="none">
          <defs>
            <clipPath id={clipId}>
              {/* Only show items above the bag opening line (y≈66) */}
              <rect x="0" y="0" width="240" height="76" />
            </clipPath>
          </defs>

          {/* Items placed so they sit "inside" — top portions visible above y=66 */}

          {/* Baguette — left, diagonal, tallest */}
          <g transform="translate(32, -38) rotate(8, 19, 55)" clipPath={`url(#${clipId})`}>
            <BaguetteSVG />
          </g>

          {/* Broccoli — left-center */}
          <g transform="translate(62, 2)" clipPath={`url(#${clipId})`}>
            <BroccoliSVG />
          </g>

          {/* Apple — center */}
          <g transform="translate(104, 18)" clipPath={`url(#${clipId})`}>
            <AppleSVG />
          </g>

          {/* Carrot — right-center, slight lean */}
          <g transform="translate(150, -10) rotate(-6, 16, 39)" clipPath={`url(#${clipId})`}>
            <CarrotSVG />
          </g>

          {/* Juice carton — far right */}
          <g transform="translate(182, 4)" clipPath={`url(#${clipId})`}>
            <JuiceCartonSVG />
          </g>
        </svg>
      </div>

      {/* The bag itself sits on top, covering the lower halves of items */}
      <div className="absolute inset-0" style={{ zIndex: 2 }}>
        <GroceryBag />
      </div>
    </div>
  );
}

// ─── Floating background food SVGs ───────────────────────────────────────────

function FloatingLeaf({ x, y, delay, size = 28 }: { x: number; y: number; delay: number; size?: number }) {
  return (
    <motion.div
      className="absolute pointer-events-none hidden md:block"
      style={{ left: x, top: y }}
      animate={{ y: [0, -14, 0] }}
      transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay }}
    >
      <svg width={size} height={size} viewBox="0 0 28 28" fill="none" opacity="0.18">
        <path d="M14 2 C14 2 4 8 4 18 C4 24 8 26 14 26 C20 26 24 24 24 18 C24 8 14 2 14 2Z" fill="#E05A28" />
        <line x1="14" y1="2" x2="14" y2="26" stroke="#C04B20" strokeWidth="1.5" />
        <line x1="14" y1="10" x2="8" y2="14" stroke="#C04B20" strokeWidth="1" />
        <line x1="14" y1="16" x2="20" y2="20" stroke="#C04B20" strokeWidth="1" />
      </svg>
    </motion.div>
  );
}

function FloatingStar({ x, y, delay }: { x: number; y: number; delay: number }) {
  return (
    <motion.div
      className="absolute pointer-events-none hidden md:block"
      style={{ left: x, top: y }}
      animate={{ y: [0, -10, 0], rotate: [0, 15, 0] }}
      transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay }}
    >
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" opacity="0.14">
        <circle cx="11" cy="11" r="9" stroke="#E05A28" strokeWidth="2" />
        <path d="M11 4 L12.5 9 L18 9 L13.5 12 L15 17 L11 14 L7 17 L8.5 12 L4 9 L9.5 9 Z" fill="#E05A28" />
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
  const badgeControls = useAnimation();

  useEffect(() => {
    // After pop-in, start the pulse loop
    const timeout = setTimeout(() => {
      badgeControls.start({
        scale: [1, 1.06, 1],
        transition: { duration: 2.5, repeat: Infinity, ease: 'easeInOut' },
      });
    }, 1400);
    return () => clearTimeout(timeout);
  }, [badgeControls]);

  return (
    <section
      className="relative bg-[#FDF4F0] overflow-hidden"
      style={{ minHeight: 'clamp(580px, 90vh, 760px)' }}
    >
      {/* Floating background decorations */}
      <FloatingLeaf  x={30}  y={60}  delay={0}    size={34} />
      <FloatingStar  x={80}  y={20}  delay={1.2}  />
      <FloatingLeaf  x={60}  y={180} delay={2.3}  size={22} />

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
              <span
                className="w-2 h-2 rounded-full bg-[#E05A28] animate-pulse flex-shrink-0"
              />
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
              { value: '2,400+', label: 'DEALS SAVED' },
              { value: '70%',    label: 'AVG. DISCOUNT' },
              { value: '180kg',  label: 'FOOD RESCUED' },
            ].map(({ value, label }, i) => (
              <div key={label} className="flex items-center">
                <div className={`flex flex-col gap-0.5 ${i === 0 ? 'pr-5' : 'px-5'}`}>
                  <span className="text-xl font-extrabold text-[#1A1209] leading-none">{value}</span>
                  <span className="text-[10px] font-semibold text-[#9B8276] tracking-widest uppercase leading-none mt-0.5">{label}</span>
                </div>
                {i < 2 && (
                  <div className="w-px h-8 bg-[#DDD0CA] self-center flex-shrink-0" />
                )}
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
            className="absolute left-0 top-1/2 -translate-y-1/2 flex flex-col gap-2.5 z-10 hidden sm:flex"
            style={{ left: '-8px' }}
            variants={chipStagger}
            initial="hidden"
            animate="visible"
          >
            {[
              { label: 'Bakery',       dot: '#3B9A6E' },
              { label: 'Restaurant',   dot: '#E05A28' },
              { label: 'Supermarket',  dot: '#3B82F6' },
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

          {/* The bag with products */}
          <div className="relative z-10">
            <BagWithProducts />

            {/* Discount badge */}
            <motion.div
              className="absolute z-20"
              style={{ top: '-18px', right: '-14px', rotate: '-12deg', transformOrigin: 'center' }}
              variants={badgePop}
              initial="hidden"
              animate={badgeControls}
            >
              <motion.div
                animate={{ scale: [1, 1.06, 1] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
                className="w-[76px] h-[76px] rounded-full flex flex-col items-center justify-center shadow-lg"
                style={{ background: '#FFD23F' }}
              >
                <span className="text-xl font-extrabold text-[#7A3E00] leading-none">-70%</span>
                <span className="text-[10px] font-semibold text-[#A05800] tracking-widest uppercase mt-0.5">today</span>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
