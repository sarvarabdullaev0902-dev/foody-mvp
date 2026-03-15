'use client';

import React, { useState, useCallback, memo, useEffect } from 'react';
import { motion, useSpring, useAnimationControls } from 'framer-motion';
import {
  UtensilsCrossed, ChefHat, Soup, Beef, Fish, Sandwich,
  Croissant, CakeSlice, Cookie, Wheat, Cake,
  ShoppingCart, Apple, Milk, Package, Carrot, Box,
  Pill, Heart, Shield, Stethoscope, Thermometer,
  Coffee, CupSoda, IceCream, GlassWater,
  Store, Tag,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const IDLE_OPACITY  = 0.25;
const HOVER_OPACITY = 0.9;
const BRAND_COLOR   = '#E8594F';

const CATEGORY_ICONS: Record<string, React.ElementType[]> = {
  restaurant:  [UtensilsCrossed, ChefHat, Soup, Beef, Fish, Sandwich],
  bakery:      [Croissant, CakeSlice, Cookie, Wheat, Sandwich, Cake],
  supermarket: [ShoppingCart, Apple, Milk, Package, Carrot, Box],
  pharmacy:    [Pill, Heart, Shield, Stethoscope, Thermometer, Package],
  cafe:        [Coffee, CupSoda, IceCream, Cake, GlassWater, Croissant],
  store:       [Store, Package, Box, Tag, ShoppingCart, Apple],
};

// 6 evenly-spaced clock positions (0°, 60°, 120°, 180°, 240°, 300°)
// Deterministic — no randomness, same layout every render.
interface ParticleConfig {
  angle:  number; // radians
  radius: number; // px from button center
  size:   number; // px
  bobAmp: number; // vertical bob ±px
  bobDur: number; // seconds
  bobDel: number; // start delay seconds
}

const PARTICLES: ParticleConfig[] = [
  { angle: 0 * (Math.PI / 3), radius: 46, size: 17, bobAmp: 6, bobDur: 3.8, bobDel: 0.0 },
  { angle: 1 * (Math.PI / 3), radius: 48, size: 16, bobAmp: 7, bobDur: 4.5, bobDel: 0.6 },
  { angle: 2 * (Math.PI / 3), radius: 44, size: 18, bobAmp: 5, bobDur: 3.2, bobDel: 1.2 },
  { angle: 3 * (Math.PI / 3), radius: 46, size: 17, bobAmp: 8, bobDur: 4.8, bobDel: 0.3 },
  { angle: 4 * (Math.PI / 3), radius: 48, size: 16, bobAmp: 6, bobDur: 3.5, bobDel: 1.8 },
  { angle: 5 * (Math.PI / 3), radius: 44, size: 18, bobAmp: 7, bobDur: 4.2, bobDel: 0.9 },
];

// ─── Single particle ──────────────────────────────────────────────────────────

interface ParticleProps {
  Icon:    React.ElementType;
  cfg:     ParticleConfig;
  hovered: boolean;
}

const Particle = memo(function Particle({ Icon, cfg, hovered }: ParticleProps) {
  const restX = Math.cos(cfg.angle) * cfg.radius;
  const restY = Math.sin(cfg.angle) * cfg.radius;

  // x + opacity via springs; y via animation controls (loop vs spring)
  const x       = useSpring(restX, { stiffness: 120, damping: 14 });
  const opacity = useSpring(IDLE_OPACITY, { stiffness: 80, damping: 18 });
  const ctrl    = useAnimationControls();

  // Start idle bob on mount
  useEffect(() => {
    ctrl.start({
      y: [restY - cfg.bobAmp, restY + cfg.bobAmp],
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
        y: [restY - cfg.bobAmp, restY + cfg.bobAmp],
        transition: {
          duration:   cfg.bobDur,
          repeat:     Infinity,
          ease:       'easeInOut',
          repeatType: 'mirror',
        },
      });
    }
  }, [hovered, restX, restY, x, opacity, ctrl, cfg.bobAmp, cfg.bobDur]);

  return (
    <motion.div
      animate={ctrl}
      className="absolute pointer-events-none"
      style={{
        x,
        opacity,
        left:       '50%',
        top:        '50%',
        marginLeft: -cfg.size / 2,
        marginTop:  -cfg.size / 2,
      }}
    >
      <Icon
        style={{ width: cfg.size, height: cfg.size, color: BRAND_COLOR }}
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

  const icons   = CATEGORY_ICONS[categoryKey] ?? CATEGORY_ICONS.store;
  const onEnter = useCallback(() => setHovered(true),  []);
  const onLeave = useCallback(() => setHovered(false), []);

  return (
    // overflow visible (default) — particles orbit outside the button bounds
    <div className="relative inline-flex">
      {PARTICLES.map((cfg, i) => (
        <Particle
          key={i}
          Icon={icons[i]}
          cfg={cfg}
          hovered={hovered}
        />
      ))}

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
