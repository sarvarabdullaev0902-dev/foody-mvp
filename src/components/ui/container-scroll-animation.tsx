'use client';

import React, { useRef } from 'react';
import { useScroll, useTransform, useSpring, motion, MotionValue } from 'framer-motion';

interface ContainerScrollProps {
  titleComponent: React.ReactNode;
  children: React.ReactNode;
  containerHeight?: string;
  cardBg?: string;
  /** Height of the sticky inner panel. Defaults to calc(100vh - 6rem).
   *  For compact layouts pass e.g. "calc(100% - 20px)" so it stays
   *  within the container height and the sticky behaviour still works. */
  stickyHeight?: string;
  /** Tailwind height classes for the card frame. Defaults to the full-size variant. */
  cardHeight?: string;
}

function CardRotate({
  children,
  rotate,
  scale,
  cardBg = '#1a1a1a',
  cardHeight = 'h-[26rem] sm:h-[34rem] md:h-[42rem]',
}: {
  children: React.ReactNode;
  rotate: MotionValue<number>;
  scale: MotionValue<number>;
  cardBg?: string;
  cardHeight?: string;
}) {
  return (
    <motion.div
      style={{
        rotateX: rotate,
        scale,
        transformPerspective: 1200,
        transformOrigin: 'center top',
        backgroundColor: cardBg,
      }}
      className={`mx-auto w-full max-w-5xl ${cardHeight} rounded-[30px] border-2 border-[#6C6C6C] overflow-hidden shadow-2xl`}
    >
      {children}
    </motion.div>
  );
}

export function ContainerScroll({
  titleComponent,
  children,
  containerHeight = 'h-[60rem] md:h-[70rem]',
  cardBg,
  stickyHeight = 'calc(100vh - 6rem)',
  cardHeight,
}: ContainerScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
  });

  const rotateRaw = useTransform(scrollYProgress, [0, 1], [20, 0]);
  const scaleRaw = useTransform(scrollYProgress, [0, 1], [0.88, 1]);
  const translateYRaw = useTransform(scrollYProgress, [0, 1], [0, -60]);

  const springCfg = { stiffness: 60, damping: 20, mass: 0.8 };
  const rotate = useSpring(rotateRaw, springCfg);
  const scale = useSpring(scaleRaw, springCfg);
  const translateY = useSpring(translateYRaw, springCfg);

  return (
    <div
      ref={containerRef}
      className={`relative ${containerHeight} flex items-start justify-center`}
    >
      <div
        className="sticky top-24 w-full flex flex-col items-center justify-start pt-8 md:pt-12 px-4 overflow-hidden"
        style={{ height: stickyHeight }}
      >
        {/* Title — always visible; drifts up on scroll */}
        <motion.div
          style={{ translateY }}
          className="w-full max-w-5xl mx-auto text-center mb-6 md:mb-10"
        >
          {titleComponent}
        </motion.div>

        {/* Card */}
        <CardRotate rotate={rotate} scale={scale} cardBg={cardBg} cardHeight={cardHeight}>
          {children}
        </CardRotate>
      </div>
    </div>
  );
}
