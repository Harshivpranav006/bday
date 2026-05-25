"use client";

import { useCallback, useRef } from "react";

type SoundType = "pop" | "chime" | "whoosh" | "wobble" | "bass";

function playTone(
  ctx: AudioContext,
  freq: number,
  duration: number,
  type: OscillatorType = "sine",
  volume = 0.08,
  attack = 0.01
) {
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, ctx.currentTime);
  gain.gain.setValueAtTime(0.001, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(volume, ctx.currentTime + attack);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start();
  osc.stop(ctx.currentTime + duration + 0.05);
}

export function useSound() {
  const ctxRef = useRef<AudioContext | null>(null);

  const getCtx = useCallback(() => {
    if (typeof window === "undefined") return null;
    if (!ctxRef.current) ctxRef.current = new AudioContext();
    if (ctxRef.current.state === "suspended") void ctxRef.current.resume();
    return ctxRef.current;
  }, []);

  const play = useCallback(
    (type: SoundType = "pop") => {
      const ctx = getCtx();
      if (!ctx) return;

      switch (type) {
        case "pop":
          playTone(ctx, 540, 0.1, "sine", 0.05);
          setTimeout(() => playTone(ctx, 820, 0.07, "sine", 0.03), 35);
          break;
        case "chime":
          playTone(ctx, 660, 0.22, "triangle", 0.04);
          setTimeout(() => playTone(ctx, 990, 0.28, "triangle", 0.03), 70);
          break;
        case "whoosh":
          playTone(ctx, 180, 0.35, "sine", 0.025);
          break;
        case "wobble":
          playTone(ctx, 320, 0.08, "square", 0.03);
          setTimeout(() => playTone(ctx, 280, 0.08, "square", 0.025), 60);
          setTimeout(() => playTone(ctx, 350, 0.1, "square", 0.02), 120);
          break;
        case "bass":
          playTone(ctx, 55, 0.45, "sine", 0.14, 0.02);
          playTone(ctx, 110, 0.3, "triangle", 0.06, 0.02);
          break;
      }
    },
    [getCtx]
  );

  return { play };
}
