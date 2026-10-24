import fs from "node:fs/promises";
import path from "node:path";

const [command, countArg] = process.argv.slice(2);
const ROOT = path.join("content", "projects");
const categories = ["Villas", "Apartments", "Commercial"];
const places = ["UAE", "USA", "Jordan", "Turkey"];

if (command === "add") {
  const count = Number(countArg ?? 12);

  for (let i = 1; i <= count; i++) {
    const n = String(i).padStart(2, "0");
    const dir = path.join(ROOT, `demo-${n}`);
    await fs.mkdir(dir, { recursive: true });

    const info = {
      title: `Demo Project ${n}`,
      category: categories[i % categories.length],
      order: i,
      location: places[i % places.length],
      year: String(2020 + (i % 6)),
      area: `${200 + i * 20} m²`,
      description:
        "Placeholder text. The real project description will be added here.",
    };

    await fs.writeFile(
      path.join(dir, "info.json"),
      JSON.stringify(info, null, 2) + "\n"
    );
  }
  console.log(`${count} پروژه نمونه ساخته شد.`);
} else if (command === "clear") {
  const entries = await fs.readdir(ROOT, { withFileTypes: true });
  let removed = 0;

  for (const entry of entries) {
    if (entry.isDirectory() && entry.name.startsWith("demo-")) {
      await fs.rm(path.join(ROOT, entry.name), { recursive: true });
      removed++;
    }
  }
  console.log(`${removed} پروژه نمونه پاک شد.`);
} else {
  console.log("استفاده:");
  console.log("  npm run demo -- add 12   (ساخت ۱۲ پروژه نمونه)");
  console.log("  npm run demo -- clear    (پاک کردن همه نمونه‌ها)");
}