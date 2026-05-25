"use client";

export function LoadingDots() {
  return (
    <span className="inline-flex gap-1.5 align-middle">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="inline-block h-2 w-2 rounded-full bg-[#ff8fab]"
          style={{
            animation: "dot-bounce 1.2s ease-in-out infinite",
            animationDelay: `${i * 0.15}s`,
          }}
        />
      ))}
    </span>
  );
}
