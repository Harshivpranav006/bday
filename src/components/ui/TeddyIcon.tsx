"use client";

import { motion } from "framer-motion";

export function TeddyIcon() {
  return (
    <motion.div
      className="h-14 w-14 opacity-60 md:h-16 md:w-16"
      animate={{ y: [0, -5, 0] }}
      transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
    >
      <svg viewBox="0 0 80 80" fill="none" className="h-full w-full">
        <circle cx="40" cy="44" r="17" fill="#f0e6ea" stroke="#c4a090" strokeWidth="0.4" />
        <circle cx="25" cy="30" r="9" fill="#f0e6ea" stroke="#c4a090" strokeWidth="0.4" />
        <circle cx="55" cy="30" r="9" fill="#f0e6ea" stroke="#c4a090" strokeWidth="0.4" />
        <ellipse cx="33" cy="42" rx="2" ry="2.5" fill="#4a3d40" />
        <ellipse cx="47" cy="42" rx="2" ry="2.5" fill="#4a3d40" />
        <ellipse cx="40" cy="48" rx="2.5" ry="1.5" fill="#c4a090" opacity="0.35" />
      </svg>
    </motion.div>
  );
}
