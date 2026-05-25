"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  onClick?: () => void;
};

export function MinimalButton({ children, onClick }: Props) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileHover={{ y: -2, boxShadow: "0 8px 32px rgba(28, 25, 23, 0.1)" }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 28 }}
      className="glass-btn rounded-full px-10 py-3.5 font-label text-[var(--ink)]"
    >
      {children}
    </motion.button>
  );
}
