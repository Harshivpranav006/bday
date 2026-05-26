import { cpSync, existsSync, mkdirSync, rmSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const standaloneDir = join(root, ".next", "standalone");
const publicSrc = join(root, "public");
const staticSrc = join(root, ".next", "static");
const publicDest = join(standaloneDir, "public");
const staticDest = join(standaloneDir, ".next", "static");

if (!existsSync(join(standaloneDir, "server.js"))) {
  console.error(
    "[postbuild] Missing .next/standalone/server.js — set output: 'standalone' in next.config."
  );
  process.exit(1);
}

if (!existsSync(publicSrc)) {
  console.warn("[postbuild] No public/ directory found.");
} else {
  if (existsSync(publicDest)) rmSync(publicDest, { recursive: true, force: true });
  cpSync(publicSrc, publicDest, { recursive: true });
}

if (!existsSync(staticSrc)) {
  console.error("[postbuild] Missing .next/static — build may have failed.");
  process.exit(1);
}

mkdirSync(join(standaloneDir, ".next"), { recursive: true });
if (existsSync(staticDest)) rmSync(staticDest, { recursive: true, force: true });
cpSync(staticSrc, staticDest, { recursive: true });

console.log("[postbuild] Standalone bundle ready (public + static copied).");
