"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Placeholder from "./Placeholder";
import Reveal from "./Reveal";
export interface GridProject {
  slug: string;
  title: string;
  category: string;
  cover: { src: string; width: number; height: number } | null;
}

export default function ProjectsGrid({
  projects,
}: {
  projects: GridProject[];
}) {
  const [active, setActive] = useState("All");

  const categories = ["All", ...new Set(projects.map((p) => p.category))];
  const visible =
    active === "All" ? projects : projects.filter((p) => p.category === active);

  return (
    <>
      <div className="mb-12 flex flex-wrap justify-center gap-x-8 gap-y-3">
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            onClick={() => setActive(category)}
            aria-pressed={active === category}
            className={`border-b pb-2 text-sm transition-colors duration-300 md:text-base ${
              active === category
                ? "border-gold text-gold"
                : "border-transparent text-white/55 hover:text-white"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
              {visible.map((project, index) => (
          <Reveal key={project.slug} delay={(index % 3) * 110}>
            <Link href={`/projects/${project.slug}`} className="group block">
              <div className="relative aspect-[4/3] overflow-hidden bg-deep">
                {project.cover ? (
                  <Image
                    src={project.cover.src}
                    alt={project.title}
                    fill
                    priority={index < 3}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                  />
                ) : (
                  <Placeholder
                    label="Photos coming soon"
                    className="h-full"
                  />
                )}
              </div>

              <div className="mt-4 flex items-center justify-between">
                <h2 className="text-sm font-light tracking-wide text-white/80 transition-colors group-hover:text-gold md:text-base">
                  {project.title}
                </h2>
                <span
                  aria-hidden="true"
                  className="text-white/40 transition-all duration-300 group-hover:translate-x-1 group-hover:text-gold"
                >
                  ↗
                </span>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>

      {visible.length === 0 && (
        <p className="py-20 text-center text-white/50">
          No projects in this category.
        </p>
      )}
    </>
  );
}