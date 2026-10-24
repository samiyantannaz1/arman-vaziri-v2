"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import type { GalleryBlock } from "@/lib/projects";

export default function ProjectGallery({
  blocks,
  title,
}: {
  blocks: GalleryBlock[];
  title: string;
}) {
  const all = blocks.flatMap((block) => block.columns.flat());
  const indexOf = new Map(all.map((img, i) => [img.name, i]));

  const [active, setActive] = useState<number | null>(null);
  const [zoomed, setZoomed] = useState(false);

  const close = useCallback(() => {
    setActive(null);
    setZoomed(false);
  }, []);

  const step = useCallback(
    (direction: 1 | -1) => {
      setZoomed(false);
      setActive((current) =>
        current === null
          ? null
          : (current + direction + all.length) % all.length
      );
    },
    [all.length]
  );

  useEffect(() => {
    if (active === null) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
      if (event.key === "ArrowLeft") step(-1);
      if (event.key === "ArrowRight") step(1);
    };

    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [active, close, step]);

  if (all.length === 0) return null;

  const arrowClass =
    "absolute z-30 flex h-12 w-12 items-center justify-center border border-white/20 bg-black/50 text-xl text-white transition-colors hover:border-gold hover:text-gold sm:h-14 sm:w-14";

  return (
    <section className="bg-deep px-6 py-24 md:px-10 lg:px-16">
      <div className="mx-auto max-w-[1050px]">
        <span className="mb-16 block text-xs tracking-[0.35em] text-white/40">
          GALLERY
        </span>

        <div className="space-y-4">
          {blocks.map((block) => (
            <div key={block.id} className="flex items-start gap-4">
              {block.columns.map((column, c) => {
                // عرض ستون برعکس مجموع ارتفاع عکس‌هاش: همه ستون‌ها هم‌قد می‌شن
                const ratio = column.reduce(
                  (sum, img) => sum + img.height / img.width,
                  0
                );

                return (
                  <div
                    key={c}
                    className="flex flex-col gap-4"
                    style={{ flex: `${1 / ratio} 1 0%`, minWidth: 0 }}
                  >
                    {column.map((img) => (
                      <button
                        key={img.name}
                        type="button"
                        onClick={() => setActive(indexOf.get(img.name) ?? 0)}
                        aria-label={`Open image ${(indexOf.get(img.name) ?? 0) + 1}`}
                        className="group block cursor-zoom-in overflow-hidden"
                      >
                        <Image
                          src={img.src}
                          alt={`${title} — image ${(indexOf.get(img.name) ?? 0) + 1}`}
                          width={img.width}
                          height={img.height}
                          sizes="(max-width: 768px) 100vw, 1050px"
                          className="block h-auto w-full transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                        />
                      </button>
                    ))}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {active !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${title} gallery`}
          onClick={close}
          className="lightbox-in fixed inset-0 z-[100] flex items-center justify-center bg-[#080808]/95 p-4 sm:p-8"
        >
          <button
            type="button"
            onClick={close}
            aria-label="Close gallery"
            className={`${arrowClass} right-5 top-5 !h-11 !w-11`}
          >
            ×
          </button>

          {all.length > 1 && (
            <button
              type="button"
              aria-label="Previous image"
              onClick={(event) => {
                event.stopPropagation();
                step(-1);
              }}
              className={`${arrowClass} left-3 sm:left-8`}
            >
              ←
            </button>
          )}

          <div
            key={active}
            onClick={(event) => event.stopPropagation()}
            className="lightbox-in relative h-[75vh] w-full max-w-6xl overflow-hidden"
          >
            <Image
              src={all[active].src}
              alt={`${title} — image ${active + 1}`}
              fill
              sizes="100vw"
              onClick={() => setZoomed((value) => !value)}
              className={`object-contain transition-transform duration-500 ${
                zoomed ? "scale-[2] cursor-zoom-out" : "cursor-zoom-in"
              }`}
            />
          </div>

          {all.length > 1 && (
            <button
              type="button"
              aria-label="Next image"
              onClick={(event) => {
                event.stopPropagation();
                step(1);
              }}
              className={`${arrowClass} right-3 sm:right-8`}
            >
              →
            </button>
          )}

          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 text-xs tracking-[0.25em] text-white/60">
            {String(active + 1).padStart(2, "0")} /{" "}
            {String(all.length).padStart(2, "0")}
          </div>
        </div>
      )}
    </section>
  );
}