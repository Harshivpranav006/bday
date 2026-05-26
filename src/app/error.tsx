"use client";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#ffd6e7] px-6 text-center">
      <p className="text-4xl">🎀</p>
      <h1 className="mt-4 font-[family-name:var(--font-nunito)] text-xl font-bold text-[#5c3d4a]">
        Something went wrong
      </h1>
      <p className="mt-2 font-[family-name:var(--font-poppins)] text-[#8b6a75]">
        Tap below to try again.
      </p>
      <button
        type="button"
        onClick={reset}
        className="glass-btn mt-8 rounded-full px-8 py-3 font-[family-name:var(--font-nunito)] font-bold text-white"
      >
        Reload surprise
      </button>
    </div>
  );
}
