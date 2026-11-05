"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Adjacent {
  slug: string;
  title: string;
}

interface ProjectHeroProps {
  title: string;
  hero: string | null;
  location: string;
  area: string;
  year: string;
  prev: Adjacent | null;
  next: Adjacent | null;
}

export default function ProjectHero({
  title,
  hero,
  location,
  area,
  year,
  prev,
  next,
}: ProjectHeroProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setOpen(true), 150);
    return () => clearTimeout(timer);
  }, []);

  const [first, ...rest] = title.split(" ");
  const place = [location, area].filter(Boolean).join(" / ");
  const meta = [place, year].filter(Boolean);

  return (
    <section className={`ph ${open ? "ph-open" : ""}`}>
      {/* عکس: کج و باریک شروع می‌شود و صاف و تمام‌صفحه می‌شود */}
      <div className="ph-media" aria-hidden="true">
        {hero && (
          <Image
            src={hero}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        )}
        <div className="ph-shade" />
      </div>

      <div className="ph-line" aria-hidden="true" />
      <div className="ph-diag" aria-hidden="true" />

      <nav aria-label="Breadcrumb" className="ph-crumbs ph-fade">
        <Link href="/">Home</Link>
        <span aria-hidden="true">-</span>
        <Link href="/projects">Projects</Link>
        <span aria-hidden="true">-</span>
        <span aria-current="page">{title}</span>
      </nav>

      <h1 className="ph-title">
        <span className="ph-title-1">{first}</span>
        {rest.length > 0 && (
          <span className="ph-title-2">{rest.join(" ")}</span>
        )}
      </h1>

      {meta.length > 0 && (
        <ul className="ph-meta ph-fade">
          {meta.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      )}

      {prev && (
        <Link
          href={`/projects/${prev.slug}`}
          className="ph-btn ph-btn-prev ph-fade"
        >
          <span aria-hidden="true">←</span> Previous Project
        </Link>
      )}

      {next && (
        <Link
          href={`/projects/${next.slug}`}
          className="ph-btn ph-btn-next ph-fade"
        >
          Next Project <span aria-hidden="true">→</span>
        </Link>
      )}
    </section>
  );
}