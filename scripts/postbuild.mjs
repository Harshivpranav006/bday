import { cpSync, existsSync, mkdirSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const standaloneDir = join(root, ".next", "standalone");
const serverJs = join(standaloneDir, "server.js");

if (!existsSync(serverJs)) {
  console.error("[postbuild] Missing .next/standalone/server.js");
  process.exit(1);
}

const publicSrc = join(root, "public");
const staticSrc = join(root, ".next", "static");

if (existsSync(publicSrc)) {
  cpSync(publicSrc, join(standaloneDir, "public"), { recursive: true, force: true });
}

if (!existsSync(staticSrc)) {
  console.error("[postbuild] Missing .next/static");
  process.exit(1);
}

const staticDest = join(standaloneDir, ".next", "static");
mkdirSync(join(standaloneDir, ".next"), { recursive: true });
cpSync(staticSrc, staticDest, { recursive: true, force: true });

console.log("[postbuild] Standalone ready.");
