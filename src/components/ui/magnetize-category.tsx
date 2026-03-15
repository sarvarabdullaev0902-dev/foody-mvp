'use client';

import React, { useRef, useState, useCallback, memo } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';
import {
  UtensilsCrossed, ChefHat, Soup, Beef, Fish,
  Croissant, CakeSlice, Cookie, Wheat, Sandwich,
  ShoppingCart, Apple, Milk, Package, Carrot,
  Pill, Heart, Shield, Stethoscope, Thermometer,
  Coffee, CupSoda, IceCream, Cake, GlassWater,
  Store, Box, Tag,
} from 'lucide-react';
import { cn } from '@/lib/utils';

// Icons per category (10 each, cycling through 5 types × 2)
const CATEGORY_ICONS: Record<string, React.ElementType[]> = {
  restaurant:  [UtensilsCrossed, ChefHat, Soup, Beef, Fish, UtensilsCrossed, ChefHat, Soup, Beef, Fish],
  bakery:      [Croissant, CakeSlice, Cookie, Wheat, Sandwich, Croissant, CakeSlice, Cookie, Wheat, Sandwich],
  supermarket: [ShoppingCart, Apple, Milk, Package, Carrot, ShoppingCart, Apple, Milk, Package, Carrot],
  pharmacy:    [Pill, Heart, Shield, Stethoscope, Thermometer, Pill, Heart, Shield, Stethoscope, Thermometer],
  cafe:        [Coffee, CupSoda, IceCream, Cake, GlassWater, Coffee, CupSoda, IceCream, Cake, GlassWater],
  store:       [Store, Package, Box, Tag, ShoppingCart, Store, Package, Box, Tag, ShoppingCart],
};

// Seeded pseudo-random positions so they're stable across renders
function seededRandom(seed: number) {
  const x = Math.sin(seed + 1) * 10000;
  return x - Math.floor(x);
}

interface ParticleConfig {
  angle: number;   // radians
  radius: number;  // px, rest position
  offsetX: number; // small bobbing variation
  offsetY: number;
  size: number;    // icon size px
  delay: number;   // animation delay
}

function buildParticles(count: number, catKey: string): ParticleConfig[] {
  return Array.from({ length: count }, (_, i) => {
    const seed = catKey.charCodeAt(0) * 100 + i * 13;
    const angle = (i / count) * Math.PI * 2 + seededRandom(seed) * 0.6;
    const radius = 54 + seededRandom(seed + 1) * 28; // 54-82px
    const offsetX = (seededRandom(seed + 2) - 0.5) * 12;
    const offsetY = (seededRandom(seed + 3) - 0.5) * 12;
    const size = 12 + Math.round(seededRandom(seed + 4) * 6); // 12-18px
    const delay = seededRandom(seed + 5) * 2.5;
    return { angle, radius, offsetX, offsetY, size, delay };
  });
}

// ─── Single particle ──────────────────────────────────────────────────────────

interface ParticleProps {
  Icon: React.ElementType;
  config: ParticleConfig;
  hovered: boolean;
  btnCx: number;
  btnCy: number;
}

const Particle = memo(function Particle({ Icon, config, hovered, btnCx, btnCy }: ParticleProps) {
  const restX = Math.cos(config.angle) * config.radius + config.offsetX;
  const restY = Math.sin(config.angle) * config.radius + config.offsetY;

  const x = useSpring(restX, { stiffness: 100, damping: 15 });
  const y = useSpring(restY, { stiffness: 100, damping: 15 });
  const opacity = useSpring(0.3, { stiffness: 80, damping: 20 });

  React.useEffect(() => {
    if (hovered) {
      x.set(0);
      y.set(0);
      opacity.set(0.8);
    } else {
      x.set(restX);
      y.set(restY);
      opacity.set(0.3);
    }
  }, [hovered, restX, restY, x, y, opacity]);

  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{
        x,
        y,
        opacity,
        left: '50%',
        top: '50%',
        marginLeft: -config.size / 2,
        marginTop: -config.size / 2,
      }}
      animate={{
        y: hovered ? 0 : [restY, restY - 5, restY],
      }}
      transition={{
        y: { duration: 2.5, delay: config.delay, repeat: Infinity, ease: 'easeInOut' },
      }}
    >
      <Icon
        style={{ width: config.size, height: config.size, color: '#E8594F' }}
        strokeWidth={1.5}
      />
    </motion.div>
  );
});

// ─── MagnetizeCategory ────────────────────────────────────────────────────────

interface MagnetizeCategoryProps {
  categoryKey: string;
  isActive: boolean;
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
}

const PARTICLE_COUNT = 10;

export const MagnetizeCategory = memo(function MagnetizeCategory({
  categoryKey,
  isActive,
  onClick,
  children,
  className,
}: MagnetizeCategoryProps) {
  const [hovered, setHovered] = useState(false);
  const btnRef = useRef<HTMLButtonElement>(null);

  const particles = React.useMemo(
    () => buildParticles(PARTICLE_COUNT, categoryKey),
    [categoryKey]
  );

  const icons = CATEGORY_ICONS[categoryKey] ?? CATEGORY_ICONS.store;

  const handleMouseEnter = useCallback(() => setHovered(true), []);
  const handleMouseLeave = useCallback(() => setHovered(false), []);

  return (
    <div className="relative flex items-center justify-center" style={{ width: 100, height: 100 }}>
      {/* Particles */}
      {particles.map((cfg, i) => (
        <Particle
          key={i}
          Icon={icons[i % icons.length]}
          config={cfg}
          hovered={hovered}
          btnCx={0}
          btnCy={0}
        />
      ))}

      {/* Button */}
      <motion.button
        ref={btnRef}
        onClick={onClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        whileTap={{ scale: 0.96 }}
        animate={{ scale: hovered ? 1.05 : 1 }}
        transition={{ type: 'spring', stiffness: 300, damping: 22 }}
        className={cn(
          'relative z-10 flex flex-col items-center gap-2 w-[88px] px-4 py-3 rounded-2xl border-2 transition-colors shrink-0',
          isActive
            ? 'border-emerald-500 bg-emerald-50 text-emerald-700 shadow-sm'
            : 'border-slate-200 bg-white text-slate-500 hover:border-emerald-300 hover:text-emerald-600',
          className
        )}
      >
        {children}
      </motion.button>
    </div>
  );
});
