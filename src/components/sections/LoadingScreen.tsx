"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { KawaiiCharacter } from "@/components/ui/KawaiiCharacter";
import { LoadingDots } from "@/components/ui/LoadingDots";
import { FloatingHearts } from "@/components/ui/FloatingHearts";
import { EASE_SMOOTH } from "@/lib/easing";

type Props = { onComplete: () => void };

export function LoadingScreen({ onComplete }: Props) {
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setExiting(true), 2800);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!exiting) return;
    const t = setTimeout(() => {
      document.documentElement.classList.remove("scroll-locked");
      onComplete();
    }, 700);
    return () => clearTimeout(t);
  }, [exiting, onComplete]);

  return (
    <AnimatePresence>
      {!exiting && (
        <motion.div
          exit={{ opacity: 0, filter: "blur(8px)" }}
          transition={{ duration: 0.7, ease: EASE_SMOOTH }}
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-[#ffd6e7]"
        >
          <FloatingHearts count={10} />
          <KawaiiCharacter size="lg" />
          <p className="mt-8 font-[family-name:var(--font-nunito)] text-lg font-semibold text-[#7a4d5c]">
            Loading your birthday surprise… <LoadingDots />
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
