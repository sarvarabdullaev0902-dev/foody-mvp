'use client';

import React, { useState, useCallback, memo, useEffect } from 'react';
import { motion, useSpring, useAnimationControls } from 'framer-motion';
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
  radius:  number; // 35–45px from button center
  size:    number; // 10–12px
  bobDur:  number; // 4–6s bobbing cycle
  bobDel:  number; // stagger offset
}

function buildParticles(catKey: string): ParticleConfig[] {
  return Array.from({ length: PARTICLE_COUNT }, (_, i) => {
    const seed = catKey.charCodeAt(0) * 100 + i * 17;
    const angle  = (i / PARTICLE_COUNT) * Math.PI * 2 + (sr(seed) - 0.5) * 0.4;
    const radius = 35 + sr(seed + 1) * 10;             // 35–45 px
    const size   = 10 + Math.round(sr(seed + 4) * 2);  // 10–12 px
    const bobDur = 4 + sr(seed + 5) * 2;               // 4–6 s
    const bobDel = sr(seed + 6) * 3;                   // 0–3 s stagger
    return { angle, radius, size, bobDur, bobDel };
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

  // x and opacity via springs; y handled by animation controls for bobbing
  const x       = useSpring(restX, { stiffness: 100, damping: 15 });
  const opacity = useSpring(IDLE_OPACITY, { stiffness: 80, damping: 20 });
  const ctrl    = useAnimationControls();

  // Start idle bob on mount
  useEffect(() => {
    ctrl.start({
      y: [restY - 4, restY + 4],
      transition: {
        duration:   cfg.bobDur,
        delay:      cfg.bobDel,
        repeat:     Infinity,
        ease:       'easeInOut',
        repeatType: 'mirror',
      },
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (hovered) {
      x.set(0);
      opacity.set(HOVER_OPACITY);
      ctrl.start({
        y: 0,
        transition: { type: 'spring', stiffness: 50, damping: 10 },
      });
    } else {
      x.set(restX);
      opacity.set(IDLE_OPACITY);
      ctrl.start({
        y: [restY - 4, restY + 4],
        transition: {
          duration:   cfg.bobDur,
          repeat:     Infinity,
          ease:       'easeInOut',
          repeatType: 'mirror',
        },
      });
    }
  }, [hovered, restX, restY, x, opacity, ctrl, cfg.bobDur]);

  return (
    <motion.div
      animate={ctrl}
      className="absolute pointer-events-none"
      style={{
        x,
        opacity,
        left: '50%',
        top:  '50%',
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
    // Outer wrapper sizes to the button; overflow is visible by default so
    // particles that orbit outside the button boundary are still rendered.
    <div className="relative inline-flex">
      {/* Particles — absolute, pointer-events-none, overflow visible */}
      {particles.map((cfg, i) => (
        <Particle
          key={i}
          Icon={icons[i % icons.length]}
          cfg={cfg}
          hovered={hovered}
        />
      ))}

      {/* Button — z-10 keeps it visually above the particles */}
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
