import Image from "next/image";
import type { Img } from "@/lib/projects";

interface ProjectIntroProps {
  title: string;
  description: string;
  disc: Img | null;
  year: string;
  location: string;
  area: string;
}

export default function ProjectIntro({
  title,
  description,
  disc,
  year,
  location,
  area,
}: ProjectIntroProps) {
  const details = [
    { label: "YEAR", value: year },
    { label: "LOCATION", value: location },
    { label: "SQUARE METERS", value: area },
  ].filter((item) => item.value);

  if (!description && !disc && details.length === 0) return null;

  return (
    <section className="overflow-x-clip bg-deep px-6 py-24 text-white md:px-12 md:py-32 lg:px-24">
      <div
        className={`mx-auto grid gap-14 ${
          disc
            ? "max-w-[1000px] md:grid-cols-[0.9fr_1.1fr] md:gap-20"
            : "max-w-[700px]"
        }`}
      >
        {disc && (
          // --o = فاصله قاب و خط از لبه چپ عکس. فقط همین عدد را عوض کن.
          <div className="relative mt-6 [--o:1rem] md:mt-8 md:[--o:2.5rem] lg:[--o:4.5rem]">
            {/* قاب طلایی */}
            <div
              aria-hidden="true"
              className="absolute -top-6 left-[calc(var(--o)*-1)] h-full w-full border border-gold/45 md:-top-8"
            />

            <Image
              src={disc.src}
              alt={`${title} detail`}
              width={disc.width}
              height={disc.height}
              sizes="(max-width: 768px) 100vw, 450px"
              className="relative block h-auto w-full"
            />

            {/* خط مورب: از لبه چپ قاب شروع می‌شود و روی عکس می‌آید */}
                       <div
              aria-hidden="true"
              className="pointer-events-none absolute left-[calc(var(--o)*-1)] top-[20%] z-10 h-px w-[47%] origin-left -rotate-45 bg-gold/80"
            />
          </div>
        )}

        <div className="flex flex-col justify-between gap-12">
          <div>
            <h2 className="text-2xl font-light uppercase tracking-[0.06em] md:text-3xl">
              Features
            </h2>

            {description && (
              <p className="mt-8 max-w-md whitespace-pre-line text-sm font-light leading-7 text-white/70">
                {description}
              </p>
            )}
          </div>

          {details.length > 0 && (
            <ul>
              {details.map((item) => (
                <li
                  key={item.label}
                  className="flex items-center justify-between gap-4 border-t border-white/15 py-4"
                >
                  <span className="text-[10px] tracking-[0.15em] text-white/40">
                    {item.label}
                  </span>
                  <span className="text-xs font-light tracking-[0.05em] text-white/80">
                    {item.value}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}