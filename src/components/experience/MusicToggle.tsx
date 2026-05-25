"use client";

import { motion } from "framer-motion";
import { useMusic } from "@/context/MusicContext";

export function MusicToggle() {
  const { playing, toggle } = useMusic();

  return (
    <motion.button
      type="button"
      onClick={toggle}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-5 right-5 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-white/70 text-xl shadow-lg backdrop-blur-md md:bottom-7 md:right-7"
      aria-label={playing ? "Pause music" : "Play music"}
    >
      {playing ? "🎵" : "🔇"}
    </motion.button>
  );
}
