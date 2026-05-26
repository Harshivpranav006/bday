"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { EASE_SMOOTH } from "@/lib/easing";
import { dismissAppBoot } from "@/lib/dismissAppBoot";

type Props = { onComplete: () => void };

const NUMBERS = ["3", "2", "1"] as const;
const FINALE = "let's make her smile ✨";

export function Countdown({ onComplete }: Props) {
  const [step, setStep] = useState(0);

  useEffect(() => {
    dismissAppBoot();
    document.documentElement.classList.add("scroll-locked");

    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const tick = reduced ? 650 : 1000;
    const finaleHold = reduced ? 900 : 1600;

    const timers = [
      setTimeout(() => setStep(1), tick),
      setTimeout(() => setStep(2), tick * 2),
      setTimeout(() => setStep(3), tick * 3),
      setTimeout(() => onComplete(), tick * 3 + finaleHold),
    ];

    return () => {
      document.documentElement.classList.remove("scroll-locked");
      timers.forEach(clearTimeout);
    };
  }, [onComplete]);

  const showFinale = step >= 3;

  return (
    <motion.div
      className="fixed inset-0 z-[300] flex items-center justify-center bg-black"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.65, ease: EASE_SMOOTH }}
      style={{ WebkitTapHighlightColor: "transparent" }}
    >
      <AnimatePresence mode="wait">
        {!showFinale ? (
          <motion.span
            key={NUMBERS[step]}
            initial={{ opacity: 0, scale: 0.85, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 1.08, y: -20 }}
            transition={{ duration: 0.5, ease: EASE_SMOOTH }}
            className="intro-countdown-num font-[family-name:var(--font-playfair)] text-[clamp(5rem,24vw,11rem)] font-medium tracking-tight text-white"
          >
            {NUMBERS[step]}
          </motion.span>
        ) : (
          <motion.p
            key="finale"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.55, ease: EASE_SMOOTH }}
            className="intro-countdown-finale max-w-[min(92vw,28rem)] px-6 text-center font-[family-name:var(--font-playfair)] text-[clamp(1.35rem,5.5vw,2.25rem)] font-medium leading-snug tracking-wide text-white"
          >
            {FINALE}
          </motion.p>
        )}
      </AnimatePresence>

    </motion.div>
  );
}
