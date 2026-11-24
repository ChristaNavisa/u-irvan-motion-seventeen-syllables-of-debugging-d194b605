// Seventeen Syllables of Debugging — entry for make.fun bounty
// u-irvan-motion-seventeen-syllables-of-debugging-d194b605
//
// Writes one haiku about debugging (3 lines, 5-7-5 syllables, at most
// 200 characters) to /output/entry.txt, deterministically.
//
// The haiku:
//   Red dot holds its breath        (5)
//   the log repeats my own name    (7)
//   it was my typo                 (5)
//
// Centre picture: a breakpoint (the red dot) holding its breath while a
// log line keeps repeating the debugger's own name — and the turn: the
// bug the debugger hunted all night was their own typo.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The haiku, one line per array entry. Fixed text: no input, no clock,
// no randomness, so every run writes byte-identical output.
const HAIKU: readonly string[] = [
  "Red dot holds its breath",
  "the log repeats my own name",
  "it was my typo",
];

// Expected syllable count per line: the 5-7-5 shape.
const EXPECTED_SYLLABLES: readonly number[] = [5, 7, 5];

// Gate: /output/entry.txt must hold 1 to 200 characters, not only
// whitespace, in exactly three lines.
const MAX_CHARS = 200;

function countSyllables(word: string): number {
  const w = word.toLowerCase().replace(/[^a-z]/g, "");
  if (w.length === 0) return 0;
  if (w.length <= 3) return 1;
  // Count vowel groups (a, e, i, o, u, y), then drop one for a silent
  // trailing "e" (e.g. "name" is one syllable, not two).
  const groups = w.match(/[aeiouy]+/g) ?? [];
  let n = groups.length;
  if (w.endsWith("e") && n > 1) n -= 1;
  return Math.max(n, 1);
}

function countLineSyllables(line: string): number {
  return line
    .split(/\s+/)
    .filter((word) => word.length > 0)
    .reduce((sum, word) => sum + countSyllables(word), 0);
}

function fail(message: string): never {
  throw new Error(`haiku gate failed: ${message}`);
}

function writeEntry(outDir: string, outPath: string, text: string): void {
  mkdirSync(outDir, { recursive: true });
  writeFileSync(outPath, text, "utf8");

  // Read back and confirm what landed on disk is exactly what we built.
  const written = readFileSync(outPath, "utf8");
  if (written !== text) {
    fail("read-back differs from the haiku text");
  }
}

function main(): void {
  // Output directory: /output in the grading sandbox. ENTRY_OUT_DIR only
  // exists so a local run can point somewhere else; the grader never sets it.
  const outDir = process.env.ENTRY_OUT_DIR ?? "/output";
  const outPath = join(outDir, "entry.txt");

  const text = HAIKU.join("\n") + "\n";

  // Gate 1: 1 to 200 characters, not only whitespace.
  const charCount = [...text].length;
  if (charCount < 1 || charCount > MAX_CHARS) {
    fail(`character count ${charCount} outside 1-${MAX_CHARS}`);
  }
  if (text.trim().length === 0) {
    fail("text is only whitespace");
  }

  // Gate 2: exactly three non-empty lines.
  const lines = text.trimEnd().split("\n");
  if (lines.length !== 3) {
    fail(`expected 3 lines, got ${lines.length}`);
  }
  for (const line of lines) {
    if (line.trim().length === 0) fail("empty line in haiku");
  }

  // Gate 3: the 5-7-5 syllable shape, checked per line.
  const counts = lines.map(countLineSyllables);
  for (let i = 0; i < 3; i++) {
    if (counts[i] !== EXPECTED_SYLLABLES[i]) {
      fail(
        `line ${i + 1} has ${counts[i]} syllables, expected ${EXPECTED_SYLLABLES[i]}: "${lines[i]}"`,
      );
    }
  }

  writeEntry(outDir, outPath, text);

  for (let i = 0; i < 3; i++) {
    console.log(`line ${i + 1} (${counts[i]} syllables): ${lines[i]}`);
  }
  console.log(`wrote ${outPath} (${charCount} characters, ${counts.join("-")})`);
}

main();
