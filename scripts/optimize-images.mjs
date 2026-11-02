/**
 * Generates lightweight JPEG copies of every portfolio screenshot:
 *   src/assets/img/optimized/card/<name>-<ext>.jpg  — 760px wide, for the grid cards
 *   src/assets/img/optimized/full/<name>-<ext>.jpg  — 1600px wide, for the preview dialog
 * Uses macOS `sips`. Existing up-to-date files are skipped, and on machines
 * without `sips` (e.g. CI) the script exits quietly — commit the output.
 */
import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, readdirSync, statSync } from "node:fs";
import { join, parse } from "node:path";

const SRC = "src/assets/img";
const SIZES = { card: [760, 72], full: [1600, 80] };

try {
  execFileSync("which", ["sips"], { stdio: "ignore" });
} catch {
  console.log("optimize-images: sips not available, skipping");
  process.exit(0);
}

let made = 0;
for (const file of readdirSync(SRC)) {
  if (!/\.(png|jpe?g|gif)$/i.test(file)) continue;
  const src = join(SRC, file);
  for (const [dir, [width, quality]] of Object.entries(SIZES)) {
    const outDir = join(SRC, "optimized", dir);
    mkdirSync(outDir, { recursive: true });
    const { name, ext } = parse(file);
    const out = join(outDir, `${name}-${ext.slice(1).toLowerCase()}.jpg`);
    if (existsSync(out) && statSync(out).mtimeMs >= statSync(src).mtimeMs)
      continue;
    const srcWidth = Number(
      execFileSync("sips", ["-g", "pixelWidth", src]).toString().match(/pixelWidth: (\d+)/)[1],
    );
    const args = ["-s", "format", "jpeg", "-s", "formatOptions", String(quality)];
    if (srcWidth > width) args.push("--resampleWidth", String(width)); // never upscale
    execFileSync("sips", [...args, src, "--out", out], { stdio: "ignore" });
    made++;
  }
}
console.log(`optimize-images: ${made} file(s) written`);
