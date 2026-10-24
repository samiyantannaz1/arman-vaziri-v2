import type { Metadata } from "next";
import ProjectsGrid from "@/components/ProjectsGrid";
import { getProjects } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Projects",
  description: "Selected architecture and interior design projects.",
};

export default function ProjectsPage() {
  const projects = getProjects().map(({ slug, title, category, cover }) => ({
    slug,
    title,
    category,
    cover,
  }));

  return (
    <main className="min-h-screen bg-bg px-6 pb-24 pt-36 text-white md:px-10 lg:px-16">
      <div className="mx-auto max-w-[1400px]">
        <h1 className="mb-10 text-center text-3xl font-light tracking-tight md:text-5xl">
          Our <span className="font-serif italic text-gold">projects</span>
        </h1>

        <ProjectsGrid projects={projects} />
      </div>
    </main>
  );
}