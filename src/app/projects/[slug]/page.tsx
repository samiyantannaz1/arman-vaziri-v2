import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import ProjectGallery from "@/components/ProjectGallery";
import ProjectHero from "@/components/ProjectHero";
import ProjectIntro from "@/components/ProjectIntro";
import ProjectNav from "@/components/ProjectNav";
import { getProjects } from "@/lib/projects";

// فقط پروژه‌هایی که تو content هستن ساخته می‌شن
export const dynamicParams = false;

export function generateStaticParams() {
  return getProjects().map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjects().find((p) => p.slug === slug);

  return {
    title: project?.title ?? "Project",
    description: project?.description || undefined,
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const projects = getProjects();
  const index = projects.findIndex((p) => p.slug === slug);

  if (index === -1) notFound();

  const project = projects[index];
  const prev = projects[index - 1] ?? null;
  const next = projects[index + 1] ?? null;

  return (
    <main>
      <ProjectHero
        title={project.title}
        hero={project.hero?.src ?? null}
        location={project.location}
        area={project.area}
        year={project.year}
      />

      <ProjectIntro
        title={project.title}
        description={project.description}
        disc={project.disc}
        year={project.year}
        location={project.location}
        area={project.area}
      />

      {project.plan && (
        <section className="bg-deep px-5 py-12 md:py-16">
          <div className="mx-auto w-full max-w-[1050px]">
            <Image
              src={project.plan.src}
              alt={`${project.title} architectural plan`}
              width={project.plan.width}
              height={project.plan.height}
              sizes="(max-width: 768px) 100vw, 1050px"
              className="mx-auto h-auto max-h-[850px] w-full object-contain"
            />
          </div>
        </section>
      )}

      <ProjectGallery blocks={project.gallery} title={project.title} />

      <ProjectNav
        prev={prev && { slug: prev.slug, title: prev.title }}
        next={next && { slug: next.slug, title: next.title }}
      />
    </main>
  );
}