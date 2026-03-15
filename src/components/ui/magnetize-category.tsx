'use client';

import React, { useState, useCallback, memo } from 'react';
import { motion, useSpring } from 'framer-motion';
import {
  UtensilsCrossed, ChefHat, Soup, Beef, Fish,
  Croissant, CakeSlice, Cookie, Wheat, Sandwich,
  ShoppingCart, Apple, Milk, Package, Carrot,
  Pill, Heart, Shield, Stethoscope, Thermometer,
  Coffee, CupSoda, IceCream, Cake, GlassWater,
  Store, Box, Tag,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const IDLE_OPACITY = 0.15;
const HOVER_OPACITY = 0.8;
const PARTICLE_COUNT = 6;

// Icons per category (6 unique per category)
const CATEGORY_ICONS: Record<string, React.ElementType[]> = {
  restaurant:  [UtensilsCrossed, ChefHat, Soup, Beef, Fish, UtensilsCrossed],
  bakery:      [Croissant, CakeSlice, Cookie, Wheat, Sandwich, Croissant],
  supermarket: [ShoppingCart, Apple, Milk, Package, Carrot, ShoppingCart],
  pharmacy:    [Pill, Heart, Shield, Stethoscope, Thermometer, Pill],
  cafe:        [Coffee, CupSoda, IceCream, Cake, GlassWater, Coffee],
  store:       [Store, Package, Box, Tag, ShoppingCart, Store],
};

// Stable seeded pseudo-random — no jitter between renders
function sr(seed: number) {
  const x = Math.sin(seed + 1) * 10000;
  return x - Math.floor(x);
}

interface ParticleConfig {
  angle:   number; // radians — evenly spread + small seed jitter
  radius:  number; // 28–42px from button center
  size:    number; // 10–12px
  delay:   number; // for bob animation stagger
}

function buildParticles(catKey: string): ParticleConfig[] {
  return Array.from({ length: PARTICLE_COUNT }, (_, i) => {
    const seed = catKey.charCodeAt(0) * 100 + i * 17;
    // Evenly distribute + small jitter so they fan out nicely
    const angle  = (i / PARTICLE_COUNT) * Math.PI * 2 + (sr(seed) - 0.5) * 0.5;
    const radius = 28 + sr(seed + 1) * 14;     // 28–42 px
    const size   = 10 + Math.round(sr(seed + 4) * 2); // 10–12 px
    const delay  = sr(seed + 5) * 3;           // stagger up to 3s
    return { angle, radius, size, delay };
  });
}

// ─── Single particle ──────────────────────────────────────────────────────────

interface ParticleProps {
  Icon: React.ElementType;
  cfg:  ParticleConfig;
  hovered: boolean;
}

const Particle = memo(function Particle({ Icon, cfg, hovered }: ParticleProps) {
  const restX = Math.cos(cfg.angle) * cfg.radius;
  const restY = Math.sin(cfg.angle) * cfg.radius;

  const x       = useSpring(restX, { stiffness: 100, damping: 15 });
  const y       = useSpring(restY, { stiffness: 100, damping: 15 });
  const opacity = useSpring(IDLE_OPACITY, { stiffness: 80, damping: 20 });

  React.useEffect(() => {
    if (hovered) {
      x.set(0);
      y.set(0);
      opacity.set(HOVER_OPACITY);
    } else {
      x.set(restX);
      y.set(restY);
      opacity.set(IDLE_OPACITY);
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
        marginLeft: -cfg.size / 2,
        marginTop:  -cfg.size / 2,
      }}
    >
      <Icon
        style={{ width: cfg.size, height: cfg.size, color: '#E8594F' }}
        strokeWidth={1.5}
      />
    </motion.div>
  );
});

// ─── MagnetizeCategory ────────────────────────────────────────────────────────

interface MagnetizeCategoryProps {
  categoryKey: string;
  isActive:    boolean;
  onClick:     () => void;
  children:    React.ReactNode;
  className?:  string;
}

export const MagnetizeCategory = memo(function MagnetizeCategory({
  categoryKey,
  isActive,
  onClick,
  children,
  className,
}: MagnetizeCategoryProps) {
  const [hovered, setHovered] = useState(false);

  const particles = React.useMemo(() => buildParticles(categoryKey), [categoryKey]);
  const icons     = CATEGORY_ICONS[categoryKey] ?? CATEGORY_ICONS.store;

  const onEnter = useCallback(() => setHovered(true),  []);
  const onLeave = useCallback(() => setHovered(false), []);

  return (
    // Outer wrapper sizes itself to the button — no fixed width/height so it
    // doesn't force white-space gaps between buttons
    <div className="relative inline-flex">
      {/* Particle layer — clipped to the button's rounded rectangle */}
      <div
        className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none"
        style={{ zIndex: 5 }}
      >
        {particles.map((cfg, i) => (
          <Particle
            key={i}
            Icon={icons[i % icons.length]}
            cfg={cfg}
            hovered={hovered}
          />
        ))}
      </div>

      {/* Button */}
      <motion.button
        onClick={onClick}
        onMouseEnter={onEnter}
        onMouseLeave={onLeave}
        whileTap={{ scale: 0.96 }}
        animate={{ scale: hovered ? 1.05 : 1 }}
        transition={{ type: 'spring', stiffness: 300, damping: 22 }}
        className={cn(
          'relative z-10 flex flex-col items-center gap-2 min-w-[88px] px-4 py-3 rounded-2xl border-2 transition-colors shrink-0',
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
