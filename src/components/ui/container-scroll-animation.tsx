'use client';

import React, { useRef } from 'react';
import { useScroll, useTransform, motion, MotionValue } from 'framer-motion';

interface ContainerScrollProps {
  titleComponent: React.ReactNode;
  children: React.ReactNode;
  containerHeight?: string;
}

function CardRotate({
  children,
  rotate,
  scale,
}: {
  children: React.ReactNode;
  rotate: MotionValue<number>;
  scale: MotionValue<number>;
}) {
  return (
    <motion.div
      style={{
        rotateX: rotate,
        scale,
        transformPerspective: 1200,
        transformOrigin: 'center top',
      }}
      className="mx-auto w-full max-w-5xl h-[22rem] sm:h-[28rem] md:h-[34rem] rounded-[30px] border-2 border-[#6C6C6C] overflow-hidden shadow-2xl"
    >
      {children}
    </motion.div>
  );
}

export function ContainerScroll({
  titleComponent,
  children,
  containerHeight = 'h-[60rem] md:h-[70rem]',
}: ContainerScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
  });

  const rotate = useTransform(scrollYProgress, [0, 0.5], [20, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.88, 1]);
  // Title drifts up as user scrolls — starts visible (translateY 0 → -60)
  const translateY = useTransform(scrollYProgress, [0, 0.5], [0, -60]);

  return (
    <div
      ref={containerRef}
      className={`relative ${containerHeight} flex items-start justify-center`}
    >
      {/*
        sticky top-24 keeps the panel below the navbar (h-8 + h-16 = 96px = 6rem).
        h-[calc(100vh-6rem)] fills the remaining viewport height.
        overflow-hidden clips the tilted card edges without cutting the title.
      */}
      <div
        className="sticky top-24 w-full flex flex-col items-center justify-start pt-8 md:pt-12 px-4 overflow-hidden"
        style={{ height: 'calc(100vh - 6rem)' }}
      >
        {/* Title — always visible; drifts up on scroll */}
        <motion.div
          style={{ translateY }}
          className="w-full max-w-5xl mx-auto text-center mb-6 md:mb-10"
        >
          {titleComponent}
        </motion.div>

        {/* Card */}
        <CardRotate rotate={rotate} scale={scale}>
          {children}
        </CardRotate>
      </div>
    </div>
  );
}
