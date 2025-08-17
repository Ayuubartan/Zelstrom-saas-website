// src/utils/useGoldenSpiralPoints.ts
import { useMemo } from "react";

export function useGoldenSpiralPoints({
  count,
  innerRadius = 0,
  outerRadius = 1,
  thetaStart = 0,
  thetaEnd = Math.PI * 2,
  thetaOffset = 0,
  zJitter = 0,
  seed = 1,
}: {
  count: number;
  innerRadius?: number;
  outerRadius?: number;
  thetaStart?: number;
  thetaEnd?: number;
  thetaOffset?: number;
  zJitter?: number;
  seed?: number;
}) {
  return useMemo(() => {
    const goldenAngle = Math.PI * (3 - Math.sqrt(5));
    const twoPi = Math.PI * 2;

    const norm = (a: number) => ((a % twoPi) + twoPi) % twoPi;
    const a0 = norm(thetaStart);
    const a1Raw = norm(thetaEnd);
    const a1 = a1Raw === a0 ? a0 + twoPi : (a1Raw > a0 ? a1Raw : a1Raw + twoPi);

    // Seeded jitter
    let s = Math.imul(seed ^ 0x9e3779b9, 0x85ebca6b) >>> 0;
    const rnd = () => {
      s ^= s << 13; s ^= s >>> 17; s ^= s << 5;
      return (s >>> 0) / 0xffffffff;
    };

    const pos = new Float32Array(count * 3);
    const phases = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      const theta = i * goldenAngle + thetaOffset;
      const thetaN = norm(theta);
      const thetaU = thetaN < a0 ? thetaN + twoPi : thetaN;

      // skip if outside arc
      if (thetaU < a0 || thetaU > a1) {
        pos[i * 3 + 0] = pos[i * 3 + 1] = pos[i * 3 + 2] = 9999; // hide
        phases[i] = 0;
        continue;
      }

      // Spiral radius growth instead of linear
      const t = i / count; // 0..1
      const r = innerRadius + (outerRadius - innerRadius) * t;

      const x = Math.cos(theta) * r;
      const y = Math.sin(theta) * r;
      const z = zJitter ? (rnd() * 2 - 1) * zJitter : 0;

      pos[i * 3 + 0] = x;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = z;

      phases[i] = t;
    }

    return { positions: pos, phases };
  }, [count, innerRadius, outerRadius, thetaStart, thetaEnd, thetaOffset, zJitter, seed]);
}

export const deg2rad = (deg: number) => (deg * Math.PI) / 180;
