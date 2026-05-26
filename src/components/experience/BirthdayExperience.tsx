"use client";

import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MusicProvider } from "@/context/MusicContext";
import { Countdown } from "@/components/sections/Countdown";
import { LoadingScreen } from "@/components/sections/LoadingScreen";
import { HeroSection } from "@/components/sections/HeroSection";
import { CakeSection } from "@/components/sections/CakeSection";
import { MessageSection } from "@/components/sections/MessageSection";
import { MusicToggle } from "./MusicToggle";
import { KawaiiCursor } from "@/components/ui/KawaiiCursor";
import { EASE_SMOOTH } from "@/lib/easing";

type Phase = "countdown" | "loading" | "main";

function ExperienceInner() {
  const [phase, setPhase] = useState<Phase>("countdown");

  const onCountdownDone = useCallback(() => setPhase("loading"), []);
  const onLoadDone = useCallback(() => setPhase("main"), []);

  useEffect(() => {
    return () => {
      document.documentElement.classList.remove("scroll-locked");
    };
  }, []);

  useEffect(() => {
    if (phase === "main") {
      document.documentElement.classList.remove("scroll-locked");
    }
  }, [phase]);

  return (
    <>
      <AnimatePresence>
        {phase === "countdown" && (
          <Countdown key="cd" onComplete={onCountdownDone} />
        )}
      </AnimatePresence>

      {phase === "loading" && <LoadingScreen onComplete={onLoadDone} />}

      {phase === "main" && (
        <motion.main
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, ease: EASE_SMOOTH }}
          className="relative min-h-screen touch-pan-y overflow-x-hidden bg-[#ffd6e7]"
        >
          <KawaiiCursor />
          <MusicToggle />
          <HeroSection />
          <CakeSection />
          <MessageSection />
        </motion.main>
      )}
    </>
  );
}

export function BirthdayExperience() {
  return (
    <MusicProvider>
      <ExperienceInner />
    </MusicProvider>
  );
}
