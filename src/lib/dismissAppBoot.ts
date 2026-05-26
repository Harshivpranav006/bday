/** Remove the instant HTML boot overlay once React is ready. */
export function dismissAppBoot() {
  const el = document.getElementById("app-boot");
  if (!el) return;
  el.classList.add("opacity-0", "pointer-events-none");
  window.setTimeout(() => el.remove(), 320);
}
