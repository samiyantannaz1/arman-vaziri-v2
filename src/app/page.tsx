import Image from "next/image";
import { getProjects } from "@/lib/projects";
import Placeholder from "@/components/Placeholder";
export default function Home() {
  const projects = getProjects();

  return (
    <main className="min-h-screen bg-[#1a1a1a] p-10 text-white">
      <h1 className="mb-8 text-2xl">تست داده‌ها: {projects.length} پروژه</h1>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        {projects.map((project) => (
          <div key={project.slug}>
            {project.cover ? (
              <Image
                src={project.cover.src}
                alt={project.title}
                width={project.cover.width}
                height={project.cover.height}
                className="h-auto w-full"
              />
            ) : (
           <Placeholder label={project.title} />
            )}

            <h2 className="mt-3 text-lg">{project.title}</h2>
            <p className="text-sm text-white/50">
              {project.category} — {project.gallery.length} بلوک گالری
            </p>
          </div>
        ))}
      </div>
    </main>
  );
}