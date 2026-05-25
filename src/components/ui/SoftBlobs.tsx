"use client";

import { motion } from "framer-motion";

export function SoftBlobs() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <motion.div
        className="absolute -left-[10%] top-[10%] h-64 w-64 rounded-full opacity-60 md:h-96 md:w-96"
        style={{
          background: "radial-gradient(circle, #ffe8f0 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
        animate={{ x: [0, 30, 0], y: [0, 20, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -right-[5%] top-[30%] h-56 w-56 rounded-full opacity-50 md:h-80 md:w-80"
        style={{
          background: "radial-gradient(circle, #e8d5ff 0%, transparent 70%)",
          filter: "blur(48px)",
        }}
        animate={{ x: [0, -25, 0], y: [0, -15, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-[15%] left-[20%] h-48 w-48 rounded-full opacity-40"
        style={{
          background: "radial-gradient(circle, #fff5f8 0%, transparent 70%)",
          filter: "blur(36px)",
        }}
        animate={{ scale: [1, 1.08, 1] }}
        transition={{ duration: 10, repeat: Infinity }}
      />
    </div>
  );
}
