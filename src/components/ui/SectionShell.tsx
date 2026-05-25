"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { EASE_SMOOTH } from "@/lib/easing";

type Props = {
  id: string;
  children: ReactNode;
  className?: string;
  dark?: boolean;
};

export function SectionShell({ id, children, className = "", dark = false }: Props) {
  return (
    <section
      id={id}
      className={`section-snap relative flex min-h-screen w-full flex-col ${className}`}
    >
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-5%" }}
        transition={{ duration: 0.8, ease: EASE_SMOOTH }}
        className="relative z-10 flex min-h-screen w-full flex-col"
      >
        {children}
      </motion.div>
      {dark && (
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 70% 50% at 50% 45%, transparent 0%, rgba(0,0,0,0.4) 100%)",
          }}
        />
      )}
    </section>
  );
}
