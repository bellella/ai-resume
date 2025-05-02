'use client';

import { useScroll, useTransform, motion } from 'framer-motion';
import { useRef } from 'react';

export function Parallax({ speed = 50, children }: { speed?: number; children: React.ReactNode }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', `${speed}%`]);

  return (
    <motion.div style={{ y }} ref={ref} className="absolute inset-0 z-0">
      {children}
    </motion.div>
  );
}
