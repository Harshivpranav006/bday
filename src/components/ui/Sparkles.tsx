"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { randomBetween } from "@/lib/utils";

type Props = { count?: number; className?: string };

export function Sparkles({ count = 18, className = "" }: Props) {
  const dots = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: `${randomBetween(3, 97)}%`,
        top: `${randomBetween(3, 97)}%`,
        size: randomBetween(1, 2.5),
        delay: randomBetween(0, 5),
        dur: randomBetween(2.5, 6),
      })),
    [count]
  );

  return (
    <div className={`pointer-events-none absolute inset-0 ${className}`} aria-hidden>
      {dots.map((d) => (
        <motion.span
          key={d.id}
          className="absolute rounded-full bg-white/50"
          style={{ left: d.left, top: d.top, width: d.size, height: d.size }}
          animate={{ opacity: [0.15, 0.55, 0.15], scale: [1, 1.3, 1] }}
          transition={{ duration: d.dur, delay: d.delay, repeat: Infinity }}
        />
      ))}
    </div>
  );
}
