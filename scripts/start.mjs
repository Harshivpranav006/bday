import { spawn } from "node:child_process";
import { existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const standaloneDir = join(root, ".next", "standalone");
const serverEntry = join(standaloneDir, "server.js");

if (!existsSync(serverEntry)) {
  console.error(
    "[start] Missing .next/standalone/server.js — run npm run build first."
  );
  process.exit(1);
}

const port = process.env.PORT || "10000";
const hostname = process.env.HOSTNAME || "0.0.0.0";

process.env.PORT = port;
process.env.HOSTNAME = hostname;
process.env.NODE_ENV = "production";

console.log(`[start] Next.js standalone → http://${hostname}:${port}`);

const child = spawn(process.execPath, [serverEntry], {
  cwd: standaloneDir,
  env: process.env,
  stdio: "inherit",
});

child.on("exit", (code, signal) => {
  if (signal) {
    console.error(`[start] Server stopped (${signal})`);
    process.exit(1);
  }
  process.exit(code ?? 0);
});

process.on("SIGTERM", () => child.kill("SIGTERM"));
process.on("SIGINT", () => child.kill("SIGINT"));
