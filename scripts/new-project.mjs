import fs from "node:fs/promises";
import path from "node:path";

const [slug, ...titleParts] = process.argv.slice(2);
const title = titleParts.join(" ");

if (!slug || !/^[a-z0-9]+(-[a-z0-9]+)*$/.test(slug)) {
  console.error('استفاده: npm run new-project -- <slug> "<Title>"');
  console.error("slug فقط حروف کوچک انگلیسی، عدد و خط تیره.");
  process.exit(1);
}

const dir = path.join("content", "projects", slug);
const file = path.join(dir, "info.json");

try {
  await fs.access(file);
  console.error("این پروژه از قبل وجود دارد.");
  process.exit(1);
} catch {
  // وجود ندارد، ادامه
}

await fs.mkdir(dir, { recursive: true });
await fs.mkdir(path.join("originals", slug), { recursive: true });

const info = {
    title: title || slug,
  category: "Villas",
  order: 0,
  location: "",
  year: "",
  area: "",
  description: "",
};

await fs.writeFile(file, JSON.stringify(info, null, 2) + "\n");
console.log(`ساخته شد: ${file}\nعکس‌ها را بریز تو: originals/${slug}/`);