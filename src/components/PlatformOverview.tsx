'use client';
import { motion } from 'framer-motion';

export function PlatformOverview() {
  const modules = [
    'Cortex™ AI Engine',
    'Zelstrom Index',
    'Vault Infrastructure',
    'Z.A.O.E. Optimizer',
    'Negotiator™',
  ];

  return (
    <section className="mt-24">
      <h2 className="text-3xl font-bold mb-6 text-center">🧠 Zelstrom Platform Modules</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-4">
        {modules.map((name, i) => (
          <motion.div
            key={name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1, duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-zinc-900 p-6 rounded-xl border border-zinc-800 hover:border-emerald-500 cursor-pointer"
          >
            <h3 className="text-xl font-semibold">{name}</h3>
            <p className="text-sm text-zinc-400 mt-2">
              Learn how {name.split(' ')[0]} transforms your media strategy with predictive insights.
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
