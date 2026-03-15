'use client';

import { useRef, ReactNode } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { Leaf } from 'lucide-react';
import { Link } from '@/i18n/navigation';

interface AuthCardProps {
  children: ReactNode;
  maxWidth?: string;
}

// CSS animations run on the compositor thread — no JS RAF loops, no scroll jank.
const CSS_ANIMATIONS = `
  @keyframes auth-spin {
    from { transform: rotate(0deg); }
    to   { transform: rotate(360deg); }
  }
  @keyframes auth-blob1 {
    0%, 100% { transform: scale(1)    translate(0,     0);     }
    50%       { transform: scale(1.15) translate(18px, -18px); }
  }
  @keyframes auth-blob2 {
    0%, 100% { transform: scale(1)   translate(0,      0);    }
    50%       { transform: scale(1.2) translate(-18px, 18px); }
  }
  @keyframes auth-blob3 {
    0%, 100% { transform: scale(1);   }
    50%       { transform: scale(1.3); }
  }
`;

export default function AuthCard({ children, maxWidth = 'max-w-md' }: AuthCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  // useMotionValue + useSpring: only updates on mouse-move events, not continuously.
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [3.5, -3.5]), { damping: 35, stiffness: 120 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-3.5, 3.5]), { damping: 35, stiffness: 120 });

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
    <>
      {/* Inject @keyframes once — keeps JSX clean */}
      <style dangerouslySetInnerHTML={{ __html: CSS_ANIMATIONS }} />

      <div className="min-h-screen relative flex items-start sm:items-center justify-center px-4 py-10 overflow-x-hidden">

        {/* Static page background — no animation, no cost */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#FAD6CC]/70 via-[#F5ECDE] to-[#FAD6CC]/30 pointer-events-none" />

        {/* Glow blobs — CSS animations (compositor thread), reduced blur, pointer-events-none */}
        <div
          className="absolute -top-32 -left-32 w-96 h-96 rounded-full pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(232,89,79,0.28) 0%, transparent 70%)',
            filter: 'blur(60px)',
            willChange: 'transform',
            animation: 'auth-blob1 8s ease-in-out infinite',
          }}
        />
        <div
          className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(244,132,95,0.24) 0%, transparent 70%)',
            filter: 'blur(60px)',
            willChange: 'transform',
            animation: 'auth-blob2 10s ease-in-out infinite 3s',
          }}
        />
        <div
          className="absolute top-1/3 right-1/4 w-64 h-64 rounded-full pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(250,214,204,0.45) 0%, transparent 70%)',
            filter: 'blur(40px)',
            willChange: 'transform',
            animation: 'auth-blob3 7s ease-in-out infinite 1.5s',
          }}
        />

        {/* One-shot fade-in slide-up — framer-motion fires once then stops */}
        <motion.div
          className={`relative z-10 w-full ${maxWidth}`}
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Logo */}
          <div className="text-center mb-8">
            <Link href="/" className="inline-flex items-center gap-2 text-[#E8594F] font-bold text-2xl hover:opacity-80 transition-opacity">
              <Leaf className="w-7 h-7" />
              <span>Foody Moody</span>
            </Link>
          </div>

          {/* 3D tilt card — framer-motion used only for event-driven mouse tilt, not a loop */}
          <motion.div
            ref={cardRef}
            style={{ rotateX, rotateY, transformPerspective: 1200, willChange: 'transform' }}
            onMouseMove={onMouseMove}
            onMouseLeave={onMouseLeave}
            className="relative rounded-2xl"
          >
            {/* Light beam — CSS spin animation (compositor), pointer-events-none */}
            <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
              <div
                style={{
                  position: 'absolute',
                  width: '200%',
                  height: '200%',
                  top: '-50%',
                  left: '-50%',
                  background: 'conic-gradient(from 0deg, transparent 40%, #E8594F 55%, #FAD6CC 65%, transparent 80%)',
                  willChange: 'transform',
                  animation: 'auth-spin 4s linear infinite',
                }}
              />
            </div>

            {/* Glassmorphism card */}
            <div
              className="relative m-[1.5px] rounded-2xl bg-white/75 backdrop-blur-xl border border-white/60 overflow-hidden"
              style={{
                boxShadow: '0 24px 64px rgba(232,89,79,0.13), 0 8px 32px rgba(0,0,0,0.07), inset 0 1px 0 rgba(255,255,255,0.6)',
              }}
            >
              {/* Inner highlight */}
              <div className="absolute inset-0 bg-gradient-to-b from-white/50 via-transparent to-transparent pointer-events-none rounded-2xl" />
              <div className="relative p-8">{children}</div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </>
  );
}
