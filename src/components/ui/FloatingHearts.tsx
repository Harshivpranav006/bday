"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { randomBetween } from "@/lib/utils";

type Props = { count?: number; className?: string };

const EMOJIS = ["💗", "🤍", "💕", "✨"];

export function FloatingHearts({ count = 12, className = "" }: Props) {
  const items = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: `${randomBetween(4, 92)}%`,
        emoji: EMOJIS[i % EMOJIS.length],
        size: randomBetween(0.75, 1.25),
        delay: randomBetween(0, 4),
        duration: randomBetween(5, 9),
      })),
    [count]
  );

  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden>
      {items.map((h) => (
        <motion.span
          key={h.id}
          className="absolute bottom-0 select-none opacity-50"
          style={{ left: h.left, fontSize: `${h.size}rem` }}
          animate={{ y: [0, -500], opacity: [0, 0.7, 0] }}
          transition={{
            duration: h.duration,
            delay: h.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {h.emoji}
        </motion.span>
      ))}
    </div>
  );
}
