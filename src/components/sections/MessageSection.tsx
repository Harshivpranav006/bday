"use client";

import { motion } from "framer-motion";
import { TypewriterMessage } from "@/components/ui/TypewriterMessage";
import { SECTION_IDS } from "@/lib/constants";
import { EASE_SMOOTH } from "@/lib/easing";

export function MessageSection() {
  return (
    <section
      id={SECTION_IDS.message}
      className="relative flex min-h-screen items-center justify-center px-5 py-32 md:px-10"
    >
      <div className="relative z-10 mx-auto w-full max-w-2xl">
        <motion.header
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: EASE_SMOOTH }}
          className="mb-12 text-center md:mb-14"
        >
          <p className="message-section-subtitle mb-3">for Shamm</p>
          <h2 className="message-section-title">
            A Special Message
          </h2>
          <div className="mx-auto mt-7 h-px w-12 bg-[#d4c4c8]/50" />
        </motion.header>

        <motion.div
          initial={{ opacity: 0, y: 36, filter: "blur(8px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-48px" }}
          transition={{ duration: 1.2, ease: EASE_SMOOTH }}
          whileHover={{
            boxShadow:
              "0 24px 56px rgba(120, 90, 100, 0.1), 0 1px 0 rgba(255, 255, 255, 0.95) inset",
          }}
          className="message-card relative overflow-hidden rounded-[1.75rem] px-7 py-11 transition-shadow duration-700 md:rounded-[2rem] md:px-12 md:py-14"
        >
          <div className="message-scroll relative z-[1] max-h-[min(68vh,540px)] overflow-y-auto overscroll-contain px-2 md:max-h-[min(62vh,600px)] md:px-4">
            <TypewriterMessage />
          </div>
        </motion.div>

        <motion.footer
          className="mt-12 text-center md:mt-14"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 1, ease: EASE_SMOOTH }}
        >
          <p className="message-signature">Harshivv</p>
          <p className="message-section-subtitle mt-2 text-[0.7rem] tracking-[0.35em]">
            with love
          </p>
        </motion.footer>
      </div>
    </section>
  );
}
