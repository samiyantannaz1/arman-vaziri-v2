import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProjectHero from "@/components/ProjectHero";
import { getProject, getProjects } from "@/lib/projects";

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
  const project = getProject(slug);

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
  const project = getProject(slug);

  if (!project) notFound();

  return (
    <main>
      <ProjectHero
        title={project.title}
        hero={project.hero?.src ?? null}
        location={project.location}
        area={project.area}
        year={project.year}
      />

      {project.description && (
        <section className="bg-deep px-6 py-24 text-white md:px-10">
          <p className="mx-auto max-w-[700px] text-sm font-light leading-8 text-white/70 md:text-base">
            {project.description}
          </p>
        </section>
      )}
    </main>
  );
}