import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const HAIKU = [
  "Three a.m. Tests pass",
  "the bug I hunted all week",
  "hid inside the test",
].join("\n");

function resolveOutDir(): string {
  return process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
}

function writeEntry(outDir: string, text: string): void {
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, "entry.txt"), text, "utf8");
}

writeEntry(resolveOutDir(), HAIKU);
