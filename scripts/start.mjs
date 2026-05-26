import { spawn } from "node:child_process";
import { existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const standaloneDir = join(root, ".next", "standalone");
const serverEntry = join(standaloneDir, "server.js");

if (!existsSync(serverEntry)) {
  console.error(
    "[start] Missing .next/standalone/server.js — run: npm install && npm run build"
  );
  process.exit(1);
}

const port = String(process.env.PORT || "10000");
const hostname = process.env.HOSTNAME || "0.0.0.0";

const env = {
  ...process.env,
  NODE_ENV: "production",
  PORT: port,
  HOSTNAME: hostname,
};

console.log(`[start] Listening on ${hostname}:${port}`);

const child = spawn(process.execPath, [serverEntry], {
  cwd: standaloneDir,
  env,
  stdio: "inherit",
});

child.on("error", (err) => {
  console.error("[start] Failed to launch server:", err);
  process.exit(1);
});

child.on("exit", (code, signal) => {
  if (signal) {
    console.error(`[start] Server stopped (${signal})`);
    process.exit(1);
  }
  process.exit(code ?? 0);
});

const shutdown = (sig) => {
  child.kill(sig);
};

process.on("SIGTERM", () => shutdown("SIGTERM"));
process.on("SIGINT", () => shutdown("SIGINT"));
