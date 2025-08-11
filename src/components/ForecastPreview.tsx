'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';

export function ForecastPreview() {
  const [cpm, setCpm] = useState(45);
  const indexScore = (cpm - 30) * 2 + 60;

  return (
    <section className="max-w-xl mx-auto bg-zinc-900 p-8 rounded-2xl shadow-lg">
      <h2 className="text-2xl font-semibold mb-4">🎯 Live Forecast Preview</h2>
      <p className="mb-2 text-zinc-400">Adjust the CPM below to simulate campaign results.</p>

      <input
        type="range"
        min={30}
        max={90}
        step={1}
        value={cpm}
        onChange={(e) => setCpm(Number(e.target.value))}
        className="w-full mt-4"
      />
      <div className="text-center mt-4 text-sm text-zinc-400">CPM: {cpm} SEK</div>

      <div className="mt-6 text-center">
        <motion.div
          key={cpm}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 20 }}
          className="text-5xl font-bold text-emerald-400"
        >
          Index Score: {indexScore.toFixed(1)}
        </motion.div>
        <p className="text-sm text-zinc-400 mt-2">
          (+{((indexScore - 70) / 70 * 100).toFixed(1)}% vs baseline)
        </p>
      </div>
    </section>
  );
}
