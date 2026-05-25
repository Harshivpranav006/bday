"use client";

import { useSyncExternalStore, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

function subscribePointer(onChange: () => void) {
  const mq = window.matchMedia("(pointer: coarse)");
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}

function getPointerSnapshot() {
  return window.matchMedia("(pointer: coarse)").matches;
}

function getPointerServerSnapshot() {
  return true;
}

export function KawaiiCursor() {
  const touch = useSyncExternalStore(
    subscribePointer,
    getPointerSnapshot,
    getPointerServerSnapshot
  );
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [trail, setTrail] = useState<{ id: number; x: number; y: number }[]>([]);

  useEffect(() => {
    if (touch) return;
    let id = 0;
    const move = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      id += 1;
      setTrail((t) => [...t.slice(-8), { id, x: e.clientX, y: e.clientY }]);
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [touch]);

  if (touch) return null;

  return (
    <>
      <motion.div
        className="pointer-events-none fixed z-[9999] text-sm"
        style={{ left: pos.x - 6, top: pos.y - 6 }}
        layout
      >
        ✨
      </motion.div>
      <AnimatePresence>
        {trail.map((t) => (
          <motion.span
            key={t.id}
            initial={{ opacity: 0.8, scale: 0.5 }}
            animate={{ opacity: 0, y: t.y - 16, scale: 0.8 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="pointer-events-none fixed z-[9998] text-[10px]"
            style={{ left: t.x, top: t.y }}
          >
            🤍
          </motion.span>
        ))}
      </AnimatePresence>
    </>
  );
}
