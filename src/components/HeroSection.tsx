'use client';

import { motion } from 'framer-motion';
import { ThemeToggle } from '@/components/ThemeToggle';

export function HeroSection() {
  return (
    <header className="text-center mb-20 flex flex-col items-center space-y-6">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-5xl font-bold tracking-tight"
      >
        Zelstrom Analytics
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="text-lg text-zinc-400"
      >
        Predictive AI Engine for Real-Time Media Intelligence
      </motion.p>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.5 }}
      >
        <ThemeToggle />
      </motion.div>
    </header>
  );
}
