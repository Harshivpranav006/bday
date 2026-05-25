"use client";

import { useEffect, useState, useRef, useMemo } from "react";
import { motion } from "framer-motion";
import { MESSAGE_LINES } from "@/lib/birthdayMessage";
import { getMessageLineClass } from "@/lib/messageTypography";

const CHAR_MS = 26;
const LINE_PAUSE_MS = 420;
const FADE_EASE = [0.22, 1, 0.36, 1] as const;

export function TypewriterMessage() {
  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [started, setStarted] = useState(false);
  const [done, setDone] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const completedLines = useMemo(
    () => MESSAGE_LINES.slice(0, lineIndex),
    [lineIndex]
  );

  const currentLine = MESSAGE_LINES[lineIndex] ?? "";
  const visibleCurrent = currentLine.slice(0, charIndex);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          obs.disconnect();
        }
      },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!started || done) return;

    const line = MESSAGE_LINES[lineIndex];
    if (!line && lineIndex < MESSAGE_LINES.length) {
      const t = setTimeout(() => {
        setLineIndex((i) => i + 1);
        setCharIndex(0);
      }, LINE_PAUSE_MS / 2);
      return () => clearTimeout(t);
    }

    if (charIndex < line.length) {
      const t = setTimeout(() => setCharIndex((c) => c + 1), CHAR_MS);
      return () => clearTimeout(t);
    }

    if (lineIndex < MESSAGE_LINES.length - 1) {
      const t = setTimeout(() => {
        setLineIndex((i) => i + 1);
        setCharIndex(0);
      }, LINE_PAUSE_MS);
      return () => clearTimeout(t);
    }

    const t = setTimeout(() => setDone(true), 0);
    return () => clearTimeout(t);
  }, [started, done, lineIndex, charIndex]);

  const showCursor = started && !done;

  return (
    <div ref={ref} className="mx-auto w-full max-w-[34rem] px-1 text-center">
      <div className="flex flex-col items-center">
        {completedLines.map((line, i) => (
          <motion.p
            key={`done-${i}`}
            initial={{ opacity: 0, y: 12, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.85, ease: FADE_EASE }}
            className={`w-full ${getMessageLineClass(line, i)} ${
              line === "" ? "h-4 md:h-5" : "mb-1"
            }`}
          >
            {line || "\u00A0"}
          </motion.p>
        ))}

        {(visibleCurrent || (showCursor && lineIndex < MESSAGE_LINES.length)) && (
          <motion.p
            initial={{ opacity: 0.85 }}
            animate={{ opacity: 1 }}
            className={`w-full ${getMessageLineClass(currentLine, lineIndex)}`}
          >
            {visibleCurrent}
            {showCursor && (
              <span className="message-cursor ml-0.5 inline-block h-[1.1em] w-[2px] animate-pulse align-middle" />
            )}
          </motion.p>
        )}
      </div>
    </div>
  );
}
