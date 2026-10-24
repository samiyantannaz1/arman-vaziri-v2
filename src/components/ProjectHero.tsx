"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

interface ProjectHeroProps {
  title: string;
  hero: string | null;
  location: string;
  area: string;
  year: string;
}

export default function ProjectHero({
  title,
  hero,
  location,
  area,
  year,
}: ProjectHeroProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 150);
    return () => clearTimeout(timer);
  }, []);

  const [first, ...rest] = title.split(" ");
  const place = [location, area].filter(Boolean).join(" / ");

  return (
    <section
      className={`project-hero ${visible ? "project-hero-visible" : ""}`}
    >
      {hero &&
        (["top", "bottom"] as const).map((part) => (
          <div
            key={part}
            className={`project-hero-half project-hero-${part}`}
            aria-hidden={part === "bottom"}
          >
            <Image
              src={hero}
              alt={part === "top" ? title : ""}
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
          </div>
        ))}

      <div className="project-hero-intro" aria-hidden="true">
        <span>ARMAN VAZIRI</span>
      </div>

      <div className="project-hero-info">
        <span className="project-hero-label">PROJECT</span>

        <h1 className="project-hero-title">
          <span className="font-bold">{first}</span>
          {rest.length > 0 && (
            <span className="font-light"> {rest.join(" ")}</span>
          )}
        </h1>

        {(place || year) && (
          <ul className="project-hero-meta">
            {place && <li>{place}</li>}
            {year && <li>{year}</li>}
          </ul>
        )}
      </div>
    </section>
  );
}