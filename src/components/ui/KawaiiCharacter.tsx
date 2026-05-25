"use client";

import { motion } from "framer-motion";

type Props = {
  size?: "sm" | "md" | "lg";
  holdingCake?: boolean;
};

const SIZES = { sm: 80, md: 120, lg: 160 };

export function KawaiiCharacter({ size = "md", holdingCake = false }: Props) {
  const s = SIZES[size];

  return (
    <motion.div
      className="relative"
      style={{ width: s, height: s }}
      animate={{ y: [0, -8, 0] }}
      transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
    >
      <svg viewBox="0 0 120 120" className="h-full w-full drop-shadow-md">
        <ellipse cx="60" cy="78" rx="32" ry="28" fill="#fff5f8" stroke="#ffb8d0" strokeWidth="1.5" />
        <ellipse cx="60" cy="42" rx="30" ry="26" fill="#fff5f8" stroke="#ffb8d0" strokeWidth="1.5" />
        <ellipse cx="32" cy="28" rx="12" ry="15" fill="#fff5f8" stroke="#ffb8d0" strokeWidth="1.5" />
        <ellipse cx="88" cy="28" rx="12" ry="15" fill="#fff5f8" stroke="#ffb8d0" strokeWidth="1.5" />
        <ellipse cx="32" cy="28" rx="6" ry="8" fill="#ffb8d0" />
        <ellipse cx="88" cy="28" rx="6" ry="8" fill="#ffb8d0" />
        <circle cx="48" cy="44" r="4" fill="#5c3d4a" />
        <circle cx="72" cy="44" r="4" fill="#5c3d4a" />
        <circle cx="49" cy="43" r="1.2" fill="#fff" />
        <circle cx="73" cy="43" r="1.2" fill="#fff" />
        <ellipse cx="38" cy="54" rx="7" ry="4" fill="#ffc8dd" opacity="0.7" />
        <ellipse cx="82" cy="54" rx="7" ry="4" fill="#ffc8dd" opacity="0.7" />
        <path d="M52 58 Q60 64 68 58" stroke="#ff8fab" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        {holdingCake && (
          <g transform="translate(0, 8)">
            <rect x="38" y="88" width="44" height="22" rx="6" fill="#ffe8f0" stroke="#ffb8d0" />
            <rect x="42" y="82" width="36" height="12" rx="4" fill="#ffd6e7" stroke="#ff8fab" strokeWidth="0.8" />
            {[50, 58, 66, 74].map((x, i) => (
              <g key={i}>
                <rect x={x} y="74" width="2" height="10" fill="#ff8fab" />
                <ellipse cx={x + 1} cy="72" rx="2" ry="3" fill="#ffb8d0" />
              </g>
            ))}
          </g>
        )}
        {!holdingCake && (
          <>
            <text x="60" y="18" textAnchor="middle" fontSize="10" fill="#ff8fab">
              ♡
            </text>
          </>
        )}
      </svg>
    </motion.div>
  );
}
