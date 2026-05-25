"use client";

import { motion } from "framer-motion";

type Variant = "light" | "dark";

type Props = {
  variant?: Variant;
  className?: string;
};

export function MinimalAmbient({ variant = "light", className = "" }: Props) {
  const isDark = variant === "dark";

  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden>
      <div
        className="absolute inset-0"
        style={{
          background: isDark
            ? "radial-gradient(ellipse 80% 60% at 50% 40%, #141414 0%, #0a0a0a 100%)"
            : "linear-gradient(165deg, #faf8f5 0%, #f3ede8 45%, #ebe4dd 100%)",
        }}
      />

      {!isDark && (
        <>
          <motion.div
            className="absolute -left-[10%] top-[15%] h-[50vh] w-[50vw] rounded-full opacity-50"
            style={{
              background: "radial-gradient(circle, rgba(255,248,242,0.9) 0%, transparent 70%)",
              filter: "blur(80px)",
            }}
            animate={{ x: [0, 24, 0], y: [0, -12, 0] }}
            transition={{ duration: 28, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute -right-[5%] top-[40%] h-[40vh] w-[40vw] rounded-full opacity-40"
            style={{
              background: "radial-gradient(circle, rgba(232,220,210,0.8) 0%, transparent 70%)",
              filter: "blur(70px)",
            }}
            animate={{ x: [0, -20, 0], y: [0, 16, 0] }}
            transition={{ duration: 32, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-[10%] left-[30%] h-[30vh] w-[35vw] rounded-full opacity-30"
            style={{
              background: "radial-gradient(circle, rgba(255,255,255,0.6) 0%, transparent 70%)",
              filter: "blur(60px)",
            }}
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          />
        </>
      )}

      {isDark && (
        <div
          className="absolute left-1/2 top-[30%] h-[40vh] w-[50vw] -translate-x-1/2 rounded-full opacity-30"
          style={{
            background: "radial-gradient(ellipse, rgba(255,255,255,0.06) 0%, transparent 70%)",
            filter: "blur(60px)",
          }}
        />
      )}
    </div>
  );
}
