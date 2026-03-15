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
  containerHeight = 'h-[50rem] md:h-[60rem]',
}: ContainerScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
  });

  const rotate = useTransform(scrollYProgress, [0, 0.5], [20, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.88, 1]);
  const translateY = useTransform(scrollYProgress, [0, 0.5], [0, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.15], [0, 1]);

  return (
    <div
      ref={containerRef}
      className={`relative ${containerHeight} flex items-start justify-center`}
    >
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-start pt-12 md:pt-20 px-4 overflow-hidden">
        {/* Title */}
        <motion.div
          style={{ translateY, opacity }}
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
