import fs from "node:fs/promises";
import path from "node:path";

const OLD = process.argv[2];

if (!OLD) {
  console.error('استفاده: npm run migrate -- "D:\\مسیر\\پروژه-قدیمی"');
  process.exit(1);
}

const IMAGE_EXT = /\.(png|jpe?g|webp)$/i;
const SPECIAL = new Set(["hero", "disc", "cover", "plan", "home-1", "home-2"]);
const GALLERY = /^([a-z])(?:-(\d))?(?:-([a-z]))?$/;

const P = (slug, title, category, dir = slug) => ({
  slug,
  title,
  category,
  dir,
});

// ترتیب این لیست = ترتیب نمایش (order). ۸ پروژه اول، پروژه‌های صفحه اصلی‌اند.
const PROJECTS = [
  P("tempo-house", "Tempo House", "Villas"),
  P("noir-nest", "Noir Nest", "Villas"),
  P("opal-vista", "Opal Vista", "Villas"),
  P("velvet-earth", "Velvet Earth", "Villas"),
  P("tranquil-lux", "Tranquil Lux", "Villas"),
  P("bitter-villa", "Bitter Villa", "Villas"),
  P("bold-fusion", "Bold Fusion", "Villas"),
  P("noir-horizon", "Noir Horizon", "Villas"),
  P("bloome-hose", "Bloome House", "Villas", "bloome-hose/project1"),
  P("ethra-restaurant", "Ethra Restaurant", "Commercial", "ethra-restaurant/project2"),
  P("dusky-rose", "Dusky Rose", "Villas", "dusky-rose/project3"),
  P("aequor-villa", "Aequor Villa", "Villas", "aequor-villa/project4"),
  P("birds-island", "Birds Island", "Commercial", "birds-island/project5"),
  P("the-art-of-living", "The Art of Living", "Villas", "the-art-of-living/project6"),
  P("creen-towers", "Creen Towers", "Commercial", "creen-towers/project7"),
  P("quiet-dimension", "Quiet Dimension", "Villas", "quiet-dimension/project8"),
  P("velora-residence", "Velora Residence", "Villas", "velora-residence/project9"),
  P("human-form-space", "Human Form Space", "Villas", "human-form-space/project10"),
  P("aurelia-terraces", "Aurelia Terraces", "Commercial", "aurelia-terraces/project11"),
  P("centered-living", "Centered Living", "Villas", "centered-living/project12"),
  P("silterra-villa", "Silterra Villa", "Villas", "silterra-villa/project13"),
  P("inner-balance", "Inner Balance", "Villas", "inner-balance/project14"),
  P("ember-house", "Ember House", "Villas", "ember-house/project15"),
  P("echoes-of-earth", "Echoes of Earth", "Villas", "echoes-of-earth/project16"),
  P("oasis-line", "Oasis Line", "Villas", "oasis-line/project17"),
  P("symphony-of-space", "Symphony of Space", "Villas", "symphony-of-space/project18"),
  P("aria-residence", "Aria Residence", "Villas", "aria-residence/project19"),
  P("stone-light", "Stone Light", "Villas", "stone-light/project20"),
  P("pool-oasis", "Pool Oasis", "Villas", "pool-oasis/project21"),
  P("aesthetic-abode", "Aesthetic Abode", "Apartments", "apartments/aesthetic-abode"),
  P("aesthetic-pleasure", "Aesthetic Pleasure", "Apartments", "apartments/aesthetic-peleasure"),
  P("bohemian-chic", "Bohemian Chic", "Apartments", "apartments/bohemian-chic"),
  P(
    "levitating-beauty-for",
    "Levitating Beauty for Ananta Developments",
    "Apartments",
    "apartments/levitating-beauty-for"
  ),
  P("luxe-living-concepts", "Luxe Living Concepts", "Apartments", "apartments/luxe-living-consepts"),
  P("velvet-vibe", "Velvet Vibe", "Apartments", "apartments/velvet-vibe"),
];

// اگر فایل دیتای قدیمی مکان و سال نداشت، از جدول صفحه اصلی قدیمی استفاده می‌شود
const HOME_META = {
  "tempo-house": { location: "UAE", year: "2024" },
  "noir-nest": { location: "USA", year: "2025" },
  "opal-vista": { location: "USA", year: "2025" },
  "velvet-earth": { location: "UAE", year: "2025" },
  "tranquil-lux": { location: "USA", year: "2024" },
  "bitter-villa": { location: "USA", year: "2024" },
  "bold-fusion": { location: "Jordan", year: "2024" },
  "noir-horizon": { location: "UAE", year: "2024" },
};

const IMAGES_ROOT = path.join(OLD, "public", "images", "projects");
const DATA_ROOT = path.join(OLD, "app", "data", "projectItem");

const exists = (p) => fs.access(p).then(() => true, () => false);

// اسم‌های قدیمی را به قاعده جدید تبدیل می‌کند
function normalize(base) {
  return base
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/^new/, "") // newcover → cover, newdisc → disc
    .replace(/(\d)new-/, "$1-") // b-2new-a → b-2-a
    .replace(/-v2$/, ""); // a-v2 → a
}

// مقدار یک فیلد رشته‌ای را از فایل TypeScript قدیمی بیرون می‌کشد
function pick(text, key) {
  const re = new RegExp(
    `\\b${key}:\\s*((?:"(?:[^"\\\\]|\\\\.)*"\\s*(?:\\+\\s*)?)+)`
  );
  const block = re.exec(text)?.[1];
  if (!block) return "";

  return [...block.matchAll(/"((?:[^"\\]|\\.)*)"/g)]
    .map((m) => {
      try {
        return JSON.parse(`"${m[1]}"`);
      } catch {
        return m[1];
      }
    })
    .join("")
    .trim();
}

const clean = (value) => (value === "—" || value === "-" ? "" : value);

const skipped = [];
const incomplete = [];
let copiedTotal = 0;

for (const [index, project] of PROJECTS.entries()) {
  const { slug } = project;
  const srcDir = path.join(IMAGES_ROOT, project.dir);
  const destDir = path.join("originals", slug);

  let files;
  try {
    files = await fs.readdir(srcDir);
  } catch {
    console.warn(`✗ ${slug}: پوشه عکس پیدا نشد (${srcDir})`);
    continue;
  }

  await fs.mkdir(destDir, { recursive: true });

  // --- کپی عکس‌ها ---
  const seen = new Set();
  let copied = 0;

  for (const file of files) {
    if (!IMAGE_EXT.test(file)) continue;

    const ext = path.extname(file).toLowerCase();
    const name = normalize(file.slice(0, file.length - path.extname(file).length));

    if (!SPECIAL.has(name) && !GALLERY.test(name)) {
      skipped.push(`${slug}/${file}`);
      continue;
    }

    if (seen.has(name)) {
      skipped.push(`${slug}/${file} (اسم تکراری)`);
      continue;
    }
    seen.add(name);

    const dest = path.join(destDir, `${name}${ext}`);
    if (await exists(dest)) continue;

    await fs.copyFile(path.join(srcDir, file), dest);
    copied++;
    copiedTotal++;
  }

  // پروژه‌ای که کاور ندارد، از home-1 کاور می‌گیرد
  const present = await fs.readdir(destDir);
  const find = (n) => present.find((f) => f.replace(IMAGE_EXT, "") === n);

  if (!find("cover") && find("home-1")) {
    const homeFile = find("home-1");
    await fs.copyFile(
      path.join(destDir, homeFile),
      path.join(destDir, `cover${path.extname(homeFile)}`)
    );
  }

  if (!find("hero")) incomplete.push(`${slug}: عکس hero ندارد`);

  // --- info.json ---
  const text = await fs
    .readFile(path.join(DATA_ROOT, `${slug}.ts`), "utf8")
    .catch(() => "");

  const meta = HOME_META[slug] ?? {};
  const fresh = {
    title: project.title,
    category: project.category,
    order: index + 1,
    location: clean(pick(text, "location")) || meta.location || "",
    year: clean(pick(text, "year")) || meta.year || "",
    area: clean(pick(text, "area")),
    description: pick(text, "description"),
  };

  const infoDir = path.join("content", "projects", slug);
  const infoFile = path.join(infoDir, "info.json");
  await fs.mkdir(infoDir, { recursive: true });

  let existing = {};
  try {
    existing = JSON.parse(await fs.readFile(infoFile, "utf8"));
  } catch {
    // فایل وجود ندارد
  }

  // مقدارهایی که از قبل پر شده‌اند حفظ می‌شوند (order صفر عوض می‌شود)
  const kept = Object.fromEntries(
    Object.entries(existing).filter(
      ([key, value]) => value !== "" && !(key === "order" && value === 0)
    )
  );
  const info = { ...fresh, ...kept };

  await fs.writeFile(infoFile, JSON.stringify(info, null, 2) + "\n");

  const missing = ["location", "year", "area", "description"].filter(
    (key) => !info[key]
  );
  if (missing.length) incomplete.push(`${slug}: ${missing.join("، ")}`);

  console.log(`${slug}: ${copied} عکس جدید`);
}

console.log(`\nجمعاً ${copiedTotal} عکس کپی شد.`);

if (skipped.length) {
  console.log("\nاین فایل‌ها اسم نامعتبر دارند و کپی نشدند (اگر لازم‌اند اسمشان را درست کن و دوباره اجرا کن):");
  skipped.forEach((item) => console.log(`  - ${item}`));
}

if (incomplete.length) {
  console.log("\nاین فیلدها خالی ماندند (بعداً تو content/projects/<slug>/info.json پر کن):");
  incomplete.forEach((item) => console.log(`  - ${item}`));
}