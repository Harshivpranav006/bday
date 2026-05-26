import { cpSync, existsSync, mkdirSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const standaloneDir = join(root, ".next", "standalone");

if (!existsSync(standaloneDir)) {
  console.error(
    "[postbuild] Missing .next/standalone. Ensure next.config has output: 'standalone'."
  );
  process.exit(1);
}

cpSync(join(root, "public"), join(standaloneDir, "public"), { recursive: true });

const standaloneNext = join(standaloneDir, ".next");
mkdirSync(standaloneNext, { recursive: true });
cpSync(join(root, ".next", "static"), join(standaloneNext, "static"), {
  recursive: true,
});

console.log("[postbuild] Copied public/ and .next/static into standalone output.");
