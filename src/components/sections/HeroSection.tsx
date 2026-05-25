"use client";

import { motion } from "framer-motion";
import { SoftBlobs } from "@/components/ui/SoftBlobs";
import { FloatingHearts } from "@/components/ui/FloatingHearts";
import { SECTION_IDS } from "@/lib/constants";
import { EASE_SMOOTH } from "@/lib/easing";
import { useSound } from "@/hooks/useSound";
import { useMusic } from "@/context/MusicContext";

export function HeroSection() {
  const { play } = useSound();
  const { playMusic } = useMusic();

  const scrollToCake = () => {
    play("pop");
    playMusic();
    document.getElementById(SECTION_IDS.cake)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id={SECTION_IDS.hero}
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 py-20 text-center"
    >
      <SoftBlobs />
      <FloatingHearts count={14} />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: EASE_SMOOTH }}
        className="relative z-10 max-w-2xl"
      >
        <motion.h1
          className="font-[family-name:var(--font-nunito)] text-[clamp(1.75rem,6vw,3.25rem)] font-extrabold leading-tight text-[#5c3d4a] text-cute-glow"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.9 }}
        >
          My girl was born 19 years ago today!
        </motion.h1>

        <motion.p
          className="mt-5 font-[family-name:var(--font-poppins)] text-lg text-[#8b6a75] md:text-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          Yes, it&apos;s YOU! A little surprise awaits…
        </motion.p>

        <motion.button
          type="button"
          onClick={scrollToCake}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65 }}
          whileHover={{
            scale: 1.06,
            boxShadow: "0 0 32px rgba(255, 143, 171, 0.55)",
          }}
          whileTap={{ scale: 0.96 }}
          className="glass-btn mt-10 rounded-full px-10 py-4 font-[family-name:var(--font-nunito)] text-lg font-bold text-white"
        >
          Start the surprise 🎀
        </motion.button>
      </motion.div>
    </section>
  );
}
