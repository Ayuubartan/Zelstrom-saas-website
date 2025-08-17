'use client';

import HeroScene from './HeroScene';

export default function Hero() {
  return (
    <section className="relative h-screen w-full overflow-hidden bg-black">
      {/* 3D background */}
      <HeroScene
        // optional: tweak these if you want
        // count, radius, pointSize already mapped correctly inside
      />

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

      {/* gradient vignette for depth */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_40%_at_50%_70%,rgba(0,200,170,0.12),transparent_60%)]"
      />
    </section>
  );
}
