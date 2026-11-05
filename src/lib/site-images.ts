import fs from "node:fs";
import path from "node:path";
import { asset } from "./asset";

export function siteImage(name: string): string | null {
  const file = path.join(
    process.cwd(),
    "public",
    "images",
    "site",
    `${name}.webp`
  );

  return fs.existsSync(file) ? asset(`/images/site/${name}.webp`) : null;
}