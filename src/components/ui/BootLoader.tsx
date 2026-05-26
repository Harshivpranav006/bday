export function BootLoader() {
  return (
    <div
      className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-[#ffd6e7]"
      role="status"
      aria-live="polite"
      aria-label="Loading birthday surprise"
    >
      <p className="animate-bounce-cute text-5xl" aria-hidden>
        🎀
      </p>
      <p className="mt-6 font-[family-name:var(--font-nunito)] text-base font-semibold text-[#7a4d5c]">
        Loading your surprise…
      </p>
    </div>
  );
}
