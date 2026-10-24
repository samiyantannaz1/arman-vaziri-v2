import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const SRC_DIR = "originals";
const OUT_DIR = "public/images/projects";
const MANIFEST = "src/content/images.json";
const MAX_WIDTH = 2000;
const QUALITY = 82;

const IMAGE_EXT = /\.(png|jpe?g|webp)$/i;
const SPECIAL = new Set(["hero", "disc", "cover", "plan", "home-1", "home-2"]);
// بلوک[-ستون][-ردیف]  مثل a, b-1, c-2-a
const GALLERY_NAME = /^([a-z])(?:-(\d))?(?:-([a-z]))?$/;

const mb = (bytes) => (bytes / 1024 / 1024).toFixed(1);

async function statOrNull(p) {
  try {
    return await fs.stat(p);
  } catch {
    return null;
  }
}

function buildGallery(images) {
  const blocks = new Map();

  for (const [name, img] of Object.entries(images)) {
    const match = GALLERY_NAME.exec(name);
    if (!match) continue;
    const [, block, col = "1", row = "a"] = match;
    if (!blocks.has(block)) blocks.set(block, []);
    blocks.get(block).push({ col: Number(col), row, name, ...img });
  }

  return [...blocks.keys()].sort().map((id) => {
    const columns = new Map();
    for (const item of blocks.get(id)) {
      if (!columns.has(item.col)) columns.set(item.col, []);
      columns.get(item.col).push(item);
    }
    return {
      id,
      columns: [...columns.keys()]
        .sort((a, b) => a - b)
        .map((col) =>
          columns
            .get(col)
            .sort((a, b) => a.row.localeCompare(b.row))
            .map(({ name, src, width, height }) => ({ name, src, width, height }))
        ),
    };
  });
}

async function processProject(slug) {
  const srcDir = path.join(SRC_DIR, slug);
  const outDir = path.join(OUT_DIR, slug);
  await fs.mkdir(outDir, { recursive: true });

  const images = {};
  const invalid = [];
  let bytesIn = 0;
  let bytesOut = 0;

  for (const file of await fs.readdir(srcDir)) {
    if (!IMAGE_EXT.test(file)) continue;

    const name = file.replace(IMAGE_EXT, "");
    if (!SPECIAL.has(name) && !GALLERY_NAME.test(name)) {
      invalid.push(file);
      continue;
    }

    const inPath = path.join(srcDir, file);
    const outPath = path.join(outDir, `${name}.webp`);
    const [inStat, outStat] = await Promise.all([
      fs.stat(inPath),
      statOrNull(outPath),
    ]);

    let width;
    let height;
    if (outStat && outStat.mtimeMs >= inStat.mtimeMs) {
      // خروجی از قبل به‌روز است
      ({ width, height } = await sharp(outPath).metadata());
    } else {
      ({ width, height } = await sharp(inPath)
        .rotate()
        .resize({ width: MAX_WIDTH, withoutEnlargement: true })
        .webp({ quality: QUALITY })
        .toFile(outPath));
    }

    bytesIn += inStat.size;
    bytesOut += (await fs.stat(outPath)).size;
    images[name] = {
      src: `/images/projects/${slug}/${name}.webp`,
      width,
      height,
    };
  }

  // خروجی‌هایی که دیگر فایل اصلی ندارند پاک شوند
  const keep = new Set(Object.keys(images).map((n) => `${n}.webp`));
  for (const file of await fs.readdir(outDir)) {
    if (!keep.has(file)) await fs.rm(path.join(outDir, file));
  }

  return {
    invalid,
    bytesIn,
    bytesOut,
    entry: {
      hero: images.hero ?? null,
      disc: images.disc ?? null,
      cover: images.cover ?? null,
      plan: images.plan ?? null,
      home: ["home-1", "home-2"].map((n) => images[n]).filter(Boolean),
      gallery: buildGallery(images),
    },
  };
}

async function main() {
  if (!(await statOrNull(SRC_DIR))) {
    console.error(`پوشه ${SRC_DIR}/ پیدا نشد. اول یک پروژه با new-project بساز.`);
    process.exit(1);
  }

  const slugs = (await fs.readdir(SRC_DIR, { withFileTypes: true }))
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort();

  const manifest = {};
  let hasErrors = false;

  for (const slug of slugs) {
    const { entry, invalid, bytesIn, bytesOut } = await processProject(slug);
    manifest[slug] = entry;

    const count =
      entry.gallery.reduce((n, b) => n + b.columns.flat().length, 0) +
      entry.home.length +
      ["hero", "disc", "cover", "plan"].filter((k) => entry[k]).length;
    console.log(`${slug}: ${count} عکس، ${mb(bytesIn)} MB ← ${mb(bytesOut)} MB`);

    for (const file of invalid) {
      hasErrors = true;
      console.error(`  ✗ اسم نامعتبر: ${slug}/${file}`);
    }
  }

  await fs.mkdir(path.dirname(MANIFEST), { recursive: true });
  await fs.writeFile(MANIFEST, JSON.stringify(manifest, null, 2) + "\n");

  if (hasErrors) process.exitCode = 1;
}

await main();