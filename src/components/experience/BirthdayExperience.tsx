"use client";

import dynamic from "next/dynamic";
import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MusicProvider } from "@/context/MusicContext";
import { Countdown } from "@/components/sections/Countdown";
import { LoadingScreen } from "@/components/sections/LoadingScreen";
import { HeroSection } from "@/components/sections/HeroSection";
import { MusicToggle } from "./MusicToggle";
import { EASE_SMOOTH } from "@/lib/easing";
const KawaiiCursor = dynamic(
  () =>
    import("@/components/ui/KawaiiCursor").then((m) => ({
      default: m.KawaiiCursor,
    })),
  { ssr: false }
);

const CakeSection = dynamic(
  () =>
    import("@/components/sections/CakeSection").then((m) => ({
      default: m.CakeSection,
    })),
  { ssr: false }
);

const MessageSection = dynamic(
  () =>
    import("@/components/sections/MessageSection").then((m) => ({
      default: m.MessageSection,
    })),
  { ssr: false }
);

type Phase = "countdown" | "loading" | "main";

function ExperienceInner() {
  const [phase, setPhase] = useState<Phase>("countdown");

  const onCountdownDone = useCallback(() => setPhase("loading"), []);
  const onLoadDone = useCallback(() => setPhase("main"), []);

  useEffect(() => {
    if (phase === "loading") {
      void import("@/components/sections/CakeSection");
      void import("@/components/sections/MessageSection");
    }
  }, [phase]);

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
