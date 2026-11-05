
import Image from "next/image";
import Link from "next/link";
import type { Img } from "@/lib/projects";
import BorderDrawButton from "./BorderDrawButton";
import Container from "./Container";
import Floating from "./Floating";
import Marquee from "./Marquee";
import Placeholder from "./Placeholder";
import Reveal from "./Reveal";

export interface FeaturedProject {
  slug: string;
  title: string;
  location: string;
  year: string;
  layout: 1 | 2;
  images: (Img | null)[];
}

function ProjectInfo({ project }: { project: FeaturedProject }) {
  const [first, ...rest] = project.title.split(" ");
  const meta = [project.location, project.year].filter(Boolean).join(" / ");

  return (
    <Reveal className="group">
      <Link
        href={`/projects/${project.slug}`}
        aria-label={`View ${project.title} project`}
        className="block leading-[0.9]"
      >
        <span className="block text-[clamp(1.8rem,3.2vw,3.2rem)] font-normal tracking-[-0.04em] text-white transition-colors duration-300 group-hover:text-gold">
          {first}
        </span>

        {rest.length > 0 && (
          <span className="mt-1 block text-[clamp(1.45rem,2.6vw,2.6rem)] font-extralight tracking-[-0.045em] text-white/50 transition-colors duration-300 group-hover:text-gold/80">
            {rest.join(" ")}
          </span>
        )}
      </Link>

      <div className="mt-5 flex items-center gap-5 md:mt-6">
        {meta && (
          <span className="whitespace-nowrap text-[9px] uppercase tracking-[0.22em] text-white/45 md:text-[10px]">
            {meta}
          </span>
        )}

        <span
          aria-hidden="true"
          className="relative block h-px w-20 bg-white/45 transition-all duration-700 group-hover:w-36 md:w-28 md:group-hover:w-52"
        >
          <span className="absolute right-0 top-1/2 block h-[7px] w-[7px] -translate-y-1/2 rotate-45 border-r border-t border-white/70" />
        </span>
      </div>
    </Reveal>
  );
}

// یک عکس شناور: نسبت ابعاد از خود عکس می‌آید (عمودی یا افقی)
function FloatingImage({
  project,
  image,
  rotate,
  fallbackRatio,
  className = "",
  decorative = false,
}: {
  project: FeaturedProject;
  image: Img | null;
  rotate: number;
  fallbackRatio: string;
  className?: string;
  decorative?: boolean;
}) {
  const ratio = image ? `${image.width} / ${image.height}` : fallbackRatio;

  return (
    <Floating rotate={rotate} className={className}>
      <Link
        href={`/projects/${project.slug}`}
        aria-label={decorative ? undefined : `View ${project.title} project`}
        aria-hidden={decorative || undefined}
        tabIndex={decorative ? -1 : undefined}
        className="group block"
      >
        <div
          className="relative w-full overflow-hidden bg-deep"
          style={{ aspectRatio: ratio }}
        >
          {image ? (
            <Image
              src={image.src}
              alt={decorative ? "" : project.title}
              fill
              sizes="(max-width: 768px) 100vw, 60vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
            />
          ) : (
            <Placeholder label={project.title} className="h-full" />
          )}
        </div>
      </Link>
    </Floating>
  );
}

function ProjectRow({
  project,
  index,
}: {
  project: FeaturedProject;
  index: number;
}) {
  // هر دو ردیف، چیدمان چپ و راست عوض می‌شود
  const flip = Math.floor(index / 2) % 2 === 1;
  const [first, second] = project.images;

  // ردیف دوتایی: یک عکس عمودی + یک عکس افقی
  if (project.layout === 2) {
    return (
      <article className="py-10 md:py-[72px]">
        <Container size="wide">
          <div className="mx-auto max-w-[1100px]">
            <div
              className={`flex flex-col gap-6 md:items-end md:justify-between md:gap-7 ${
                flip ? "md:flex-row-reverse" : "md:flex-row"
              }`}
            >
              <FloatingImage
                project={project}
                image={first}
                rotate={flip ? 12 : -10}
                fallbackRatio="9 / 14"
                className={`w-[68%] md:w-[34%] ${
                  flip ? "self-end" : "self-start"
                } md:self-auto`}
              />

              <FloatingImage
                project={project}
                image={second}
                rotate={flip ? -14 : 11}
                fallbackRatio="16 / 10"
                decorative
                className="w-full md:mb-14 md:w-[62%]"
              />
            </div>

            <div
              className={`mt-7 md:mt-9 md:w-[70%] ${
                flip ? "md:ml-[18%]" : "md:ml-[12%]"
              }`}
            >
              <ProjectInfo project={project} />
            </div>
          </div>
        </Container>
      </article>
    );
  }

  // ردیف تکی: یک عکس افقی کنار عنوان
  return (
    <article className="py-10 md:py-[72px]">
      <Container size="wide">
        <div
          className={`flex flex-col gap-8 md:items-center md:justify-center md:gap-[5vw] ${
            flip ? "md:flex-row-reverse" : "md:flex-row"
          }`}
        >
          <div className="order-2 md:order-none md:w-[24%] md:max-w-[280px]">
            <ProjectInfo project={project} />
          </div>

          <FloatingImage
            project={project}
            image={first}
            rotate={flip ? -12 : 10}
            fallbackRatio="16 / 10"
            className="order-1 w-full md:order-none md:w-[60%]"
          />
        </div>
      </Container>
    </article>
  );
}

export default function FeaturedProjects({
  projects,
}: {
  projects: FeaturedProject[];
}) {
  if (projects.length === 0) return null;

  return (
    <section id="projects" className="relative overflow-hidden">
      {/* خط‌های مورب طلایی پس‌زمینه */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        {[8, 31, 54, 77].map((top, i) => (
          <div
            key={top}
            className={`absolute -left-[30%] h-px w-[160%] rotate-[32deg] ${
              i % 2 === 0 ? "bg-gold/45" : "bg-gold/35"
            }`}
            style={{ top: `${top}%` }}
          />
        ))}
      </div>

      <Container
        size="wide"
        className="relative pb-10 pt-20 md:pb-20 md:pt-32"
      >
        <Reveal>
          <div className="flex items-end justify-between">
            <div>
              <p className="mb-4 text-[10px] uppercase tracking-[0.35em] text-white/40">
                Selected work
              </p>

              <h2 className="text-[clamp(1.6rem,3.5vw,3.5rem)] font-light uppercase leading-[0.9] tracking-[-0.05em]">
                Projects
              </h2>
            </div>

            <span className="hidden pb-2 text-[10px] uppercase tracking-[0.3em] text-white/40 md:block">
              01 — {String(projects.length).padStart(2, "0")}
            </span>
          </div>
        </Reveal>
      </Container>

      <div className="relative">
        {projects.map((project, index) => (
          <div key={project.slug}>
            <ProjectRow project={project} index={index} />

            {(index + 1) % 2 === 0 && index < projects.length - 1 && (
              <div className="my-12 md:my-20">
                <Marquee text="PROJECTS" />
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="relative flex justify-center px-5 pb-32 pt-10 md:pb-48">
        <BorderDrawButton href="/projects">More projects</BorderDrawButton>
      </div>
    </section>
  );
}
