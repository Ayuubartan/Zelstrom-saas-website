'use client';

import HeroScene from '@/components/three/HeroScene';


export default function Hero() {
  return (
    <section className="relative h-screen w-full overflow-hidden bg-black">
      {/* 3D background */}
      <HeroScene />

      {/* Overlay content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-6 text-center">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight text-white">
          Zelstrom — Live Neural Vectors in Motion
        </h1>
        <p className="mt-4 max-w-2xl text-base sm:text-lg text-white/70">
          Predictive media intelligence. Real-time optimization. Premium performance.
        </p>
        <div className="mt-8 flex items-center gap-4">
          <a
            href="#get-started"
            className="rounded-2xl px-5 py-2.5 bg-white/10 text-white backdrop-blur border border-white/10 hover:bg-white/15 transition"
          >
            Get Started
          </a>
          <a
            href="#learn-more"
            className="rounded-2xl px-5 py-2.5 text-white border border-white/15 hover:bg-white/05 transition"
          >
            Learn More
          </a>
        </div>
      </div>
    </section>
  );
}
