"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { EASE_SMOOTH } from "@/lib/easing";

type Props = { onComplete: () => void };

const NUMBERS = ["3", "2", "1"] as const;

export function Countdown({ onComplete }: Props) {
  const [index, setIndex] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    document.documentElement.classList.add("scroll-locked");
    const timers = [
      setTimeout(() => setIndex(1), 900),
      setTimeout(() => setIndex(2), 1800),
      setTimeout(() => setDone(true), 2700),
      setTimeout(() => onComplete(), 3400),
    ];
    return () => {
      document.documentElement.classList.remove("scroll-locked");
      timers.forEach(clearTimeout);
    };
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[300] flex items-center justify-center bg-[#ffd6e7]"
      exit={{ opacity: 0 }}
    >
      <AnimatePresence mode="wait">
        {!done ? (
          <motion.span
            key={NUMBERS[index]}
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 1.2, y: -30 }}
            transition={{ duration: 0.45, ease: EASE_SMOOTH }}
            className="animate-bounce-cute font-[family-name:var(--font-nunito)] text-[clamp(5rem,22vw,10rem)] font-extrabold text-[#ff8fab]"
          >
            {NUMBERS[index]}
          </motion.span>
        ) : (
          <motion.span
            key="go"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-4xl"
          >
            🎀
          </motion.span>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
