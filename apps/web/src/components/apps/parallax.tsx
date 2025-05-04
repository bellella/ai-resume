'use client';

import { useScroll, useTransform, useSpring, motion } from 'framer-motion';
import { useRef } from 'react';

export function Parallax({
  speed = 1000,
  children,
}: {
  speed?: number;
  children: React.ReactNode;
}) {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  });

  const rawY = useTransform(scrollYProgress, [0, 1], [0, speed]);

  const smoothY = useSpring(rawY, {
    stiffness: 1000,
    damping: 50,
    mass: 0.5,
  });

  return (
    <motion.div
      ref={ref}
      style={{ y: smoothY, willChange: 'transform' }}
      className="absolute inset-0 z-0"
    >
      {children}
    </motion.div>
  );
}
