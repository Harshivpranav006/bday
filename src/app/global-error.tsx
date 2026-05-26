"use client";

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col items-center justify-center bg-[#ffd6e7] px-6 text-center font-sans text-[#5c3d4a]">
        <p className="text-4xl">🎀</p>
        <h1 className="mt-4 text-xl font-bold">Something went wrong</h1>
        <button
          type="button"
          onClick={reset}
          className="mt-8 rounded-full bg-[#ff8fab] px-8 py-3 font-bold text-white"
        >
          Try again
        </button>
      </body>
    </html>
  );
}
