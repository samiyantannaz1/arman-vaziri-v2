import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const SRC = "originals-site";
const OUT = "public/images/site";

await fs.mkdir(SRC, { recursive: true });
await fs.mkdir(OUT, { recursive: true });

for (const file of await fs.readdir(SRC)) {
  if (!/\.(png|jpe?g|webp)$/i.test(file)) continue;

  const name = file.replace(/\.[^.]+$/, "").toLowerCase();
  const info = await sharp(path.join(SRC, file))
    .rotate()
    .resize({ width: 2000, withoutEnlargement: true })
    .webp({ quality: 82 })
    .toFile(path.join(OUT, `${name}.webp`));

  console.log(`${name}.webp  ${info.width}×${info.height}`);
}