'use client';

import { useRef, ReactNode } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { Leaf } from 'lucide-react';
import { Link } from '@/i18n/navigation';

interface AuthCardProps {
  children: ReactNode;
  maxWidth?: string;
}

export default function AuthCard({ children, maxWidth = 'max-w-md' }: AuthCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [3.5, -3.5]), {
    damping: 35,
    stiffness: 120,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-3.5, 3.5]), {
    damping: 35,
    stiffness: 120,
  });

  function onMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  }

  function onMouseLeave() {
    mouseX.set(0);
    mouseY.set(0);
  }

  return (
    <div className="min-h-screen relative flex items-start sm:items-center justify-center px-4 py-10 overflow-x-hidden">
      {/* Page background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#FAD6CC]/70 via-[#F5ECDE] to-white/90" />

      {/* Animated glow blobs */}
      <motion.div
        className="absolute -top-32 -left-32 w-96 h-96 rounded-full blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(232,89,79,0.32) 0%, transparent 70%)' }}
        animate={{ scale: [1, 1.15, 1], x: [0, 18, 0], y: [0, -18, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(244,132,95,0.28) 0%, transparent 70%)' }}
        animate={{ scale: [1, 1.2, 1], x: [0, -18, 0], y: [0, 18, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
      />
      <motion.div
        className="absolute top-1/3 right-1/4 w-64 h-64 rounded-full blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(250,214,204,0.55) 0%, transparent 70%)' }}
        animate={{ scale: [1, 1.3, 1] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
      />

      {/* Content */}
      <motion.div
        className={`relative z-10 w-full ${maxWidth}`}
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[#E8594F] font-bold text-2xl hover:opacity-80 transition-opacity"
          >
            <Leaf className="w-7 h-7" />
            <span>Foody Moody</span>
          </Link>
        </div>

        {/* 3D Tilt card */}
        <motion.div
          ref={cardRef}
          style={{ rotateX, rotateY, transformPerspective: 1200 }}
          onMouseMove={onMouseMove}
          onMouseLeave={onMouseLeave}
          className="relative rounded-2xl"
        >
          {/* Traveling light beam border */}
          <div className="absolute inset-0 rounded-2xl overflow-hidden">
            <motion.div
              style={{
                position: 'absolute',
                width: '200%',
                height: '200%',
                top: '-50%',
                left: '-50%',
                background:
                  'conic-gradient(from 0deg, transparent 40%, #E8594F 55%, #FAD6CC 65%, transparent 80%)',
              }}
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
            />
          </div>

          {/* Glassmorphism card */}
          <div
            className="relative m-[1.5px] rounded-2xl bg-white/75 backdrop-blur-xl border border-white/60 overflow-hidden"
            style={{
              boxShadow:
                '0 24px 64px rgba(232,89,79,0.13), 0 8px 32px rgba(0,0,0,0.07), inset 0 1px 0 rgba(255,255,255,0.6)',
            }}
          >
            {/* Inner top highlight */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/50 via-transparent to-transparent pointer-events-none rounded-2xl" />
            <div className="relative p-8">{children}</div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
