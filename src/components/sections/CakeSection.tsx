"use client";

import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useDrag } from "@use-gesture/react";
import { KawaiiCharacter } from "@/components/ui/KawaiiCharacter";
import { FloatingHearts } from "@/components/ui/FloatingHearts";
import { SECTION_IDS } from "@/lib/constants";
import { EASE_SMOOTH } from "@/lib/easing";
import { useSound } from "@/hooks/useSound";

const COLORS = ["#ffd6e7", "#ffb8d0", "#e8d5ff", "#ff8fab", "#fff"];

export function CakeSection() {
  const [cut, setCut] = useState(0);
  const [done, setDone] = useState(false);
  const doneRef = useRef(false);
  const { play } = useSound();

  const celebrate = useCallback(() => {
    if (doneRef.current) return;
    doneRef.current = true;
    setDone(true);
    play("chime");

    const mobile =
      typeof window !== "undefined" &&
      window.matchMedia("(max-width: 767px)").matches;
    const particleCount = mobile ? 3 : 5;
    const end = Date.now() + (mobile ? 1800 : 2500);

    void import("canvas-confetti").then(({ default: confetti }) => {
      const burst = () => {
        confetti({
          particleCount,
          spread: mobile ? 50 : 60,
          origin: { y: 0.55 },
          colors: COLORS,
          disableForReducedMotion: true,
        });
        if (Date.now() < end) requestAnimationFrame(burst);
      };
      burst();
    });
  }, [play]);

  const bind = useDrag(
    ({ movement: [mx, my], memo = 0 }) => {
      const d = Math.hypot(mx, my);
      const p = Math.min(100, memo + d / 2.5);
      setCut(p);
      if (p >= 100) celebrate();
      return memo + d;
    },
    { filterTaps: true }
  );

  return (
    <section
      id={SECTION_IDS.cake}
      className="relative flex min-h-screen touch-pan-y flex-col items-center justify-center px-6 py-24"
    >
      {done && <FloatingHearts count={20} />}

      <motion.p
        className="mb-2 font-[family-name:var(--font-nunito)] text-sm font-semibold text-[#ff8fab]"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        ✨ make a wish first ✨
      </motion.p>
      <motion.h2
        className="mb-10 text-center font-[family-name:var(--font-nunito)] text-xl font-bold text-[#5c3d4a] md:text-2xl"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        Swipe anywhere to cut the cake!
      </motion.h2>

      <div
        className="relative flex touch-none select-none flex-col items-center gap-4"
        {...bind()}
      >
        <KawaiiCharacter size="lg" holdingCake />
        <CakeVisual progress={cut} />
      </div>

      <div className="mt-8 h-2 w-44 overflow-hidden rounded-full bg-white/50">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-[#ffb8d0] to-[#ff8fab]"
          style={{ width: `${cut}%` }}
        />
      </div>

      <AnimatePresence>
        {done && (
          <motion.div
            className="mt-10 text-center"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE_SMOOTH }}
          >
            <p className="font-[family-name:var(--font-nunito)] text-3xl font-extrabold text-[#ff8fab] md:text-4xl">
              Happy Birthday Shamm! 🎂
            </p>
            <p className="mt-3 font-[family-name:var(--font-poppins)] text-[#8b6a75]">
              +10000 aura unlocked ✨
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function CakeVisual({ progress }: { progress: number }) {
  const gap = (progress / 100) * 24;

  return (
    <svg width="200" height="100" viewBox="0 0 200 100" className="drop-shadow-lg">
      <g
        style={{
          transform: `translateX(${-gap / 2}px)`,
          transition: "transform 0.15s ease-out",
        }}
      >
        <path d="M40 50 L40 85 Q40 92 50 92 L95 92 L95 50 Z" fill="#ffe8f0" stroke="#ffb8d0" />
        <path d="M48 35 L48 52 L92 52 L92 35 Q92 28 70 28 Q48 28 48 35 Z" fill="#ffd6e7" stroke="#ffb8d0" />
      </g>
      <g
        style={{
          transform: `translateX(${gap / 2}px)`,
          transition: "transform 0.15s ease-out",
        }}
      >
        <path d="M105 50 L105 92 Q105 92 115 92 L160 92 L160 50 Z" fill="#ffe8f0" stroke="#ffb8d0" />
        <path d="M108 35 L108 52 L152 52 L152 35 Q152 28 130 28 Q108 28 108 35 Z" fill="#ffd6e7" stroke="#ffb8d0" />
      </g>
      {progress > 8 && (
        <line x1="100" y1="28" x2="100" y2="92" stroke="#fff" strokeWidth="2" strokeDasharray="4 3" />
      )}
    </svg>
  );
}
