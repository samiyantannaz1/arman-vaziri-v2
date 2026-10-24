import fs from "node:fs";
import path from "node:path";
import { asset } from "./asset";

export type Category = "Villas" | "Apartments" | "Commercial";

export interface Img {
  src: string;
  width: number;
  height: number;
}

export interface GalleryImg extends Img {
  name: string;
}

export interface GalleryBlock {
  id: string;
  columns: GalleryImg[][];
}

export interface Project {
  slug: string;
  title: string;
  category: Category;
  order: number;
  location: string;
  year: string;
  area: string;
  description: string;
  hero: Img | null;
  disc: Img | null;
  cover: Img | null;
  plan: Img | null;
  home: Img[];
  gallery: GalleryBlock[];
}

interface RawImages {
  hero?: Img | null;
  disc?: Img | null;
  cover?: Img | null;
  plan?: Img | null;
  home?: Img[];
  gallery?: GalleryBlock[];
}

const CONTENT_DIR = path.join(process.cwd(), "content", "projects");
const MANIFEST = path.join(process.cwd(), "src", "content", "images.json");

function readJson<T>(file: string, fallback: T): T {
  try {
    const text = fs.readFileSync(file, "utf8").replace(/^\uFEFF/, "");
    return JSON.parse(text) as T;
  } catch {
    return fallback;
  }
}

// مسیر عکس را با basePath کامل می‌کند
function withBase<T extends Img>(img: T | null | undefined) {
  return img ? { ...img, src: asset(img.src) } : null;
}

export function getProjects(): Project[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];

  const manifest = readJson<Record<string, RawImages>>(MANIFEST, {});

  const projects = fs
    .readdirSync(CONTENT_DIR, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry): Project => {
      const slug = entry.name;
      const info = readJson<Partial<Project>>(
        path.join(CONTENT_DIR, slug, "info.json"),
        {}
      );
      const images = manifest[slug] ?? {};

      return {
        slug,
        title: info.title || slug,
        category: info.category ?? "Villas",
        order: info.order ?? 0,
        location: info.location ?? "",
        year: info.year ?? "",
        area: info.area ?? "",
        description: info.description ?? "",
        hero: withBase(images.hero),
        disc: withBase(images.disc),
        cover: withBase(images.cover),
        plan: withBase(images.plan),
        home: (images.home ?? []).map((img) => withBase(img)!),
        gallery: (images.gallery ?? []).map((block) => ({
          id: block.id,
          columns: block.columns.map((column) =>
            column.map((img) => withBase(img)!)
          ),
        })),
      };
    });

  return projects.sort(
    (a, b) => a.order - b.order || a.title.localeCompare(b.title)
  );
}

export function getProject(slug: string) {
  return getProjects().find((project) => project.slug === slug);
}