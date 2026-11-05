
// import Link from "next/link";

// import Placeholder from "@/components/Placeholder";
// import { getProjects } from "@/lib/projects";

// const processSteps = [
//   {
//     number: "01",
//     title: "Start",
//     description:
//       "We start by studying your project, taking all needed measurements and choosing a suitable style.",
//   },
//   {
//     number: "02",
//     title: "Plan",
//     description:
//       "We prepare a detailed plan and present design directions tailored to your project.",
//   },
//   {
//     number: "03",
//     title: "Visualization",
//     description:
//       "We create detailed visualizations to communicate the atmosphere and character of each space.",
//   },
//   {
//     number: "04",
//     title: "Album",
//     description:
//       "The final design album brings together the plans and visualizations of your project.",
//   },
// ];

// function SectionMarquee({ text }: { text: string }) {
//   return (
//     <div className="home-marquee" aria-hidden="true">
//       <div className="home-marquee-track">
//         {Array.from({ length: 4 }, (_, index) => (
//           <span key={index}>{text}</span>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default function Home() {
//   const projects = getProjects();

//   return (
//     <main className="home-stage">
      

//       {/* Selected projects */}
//       <section className="home-projects-section" id="projects">
//         <div className="home-section-glow" />

//         <div className="home-section-heading">
//           <div>
//             <p className="home-kicker">01 / SELECTED WORK</p>
//             <h2>
//               Selected work<span>.</span>
//             </h2>
//           </div>

//           <Link href="/projects" className="home-text-link">
//             Explore all projects <span>↗</span>
//           </Link>
//         </div>

//         <div className="home-projects-list">
//           {projects.slice(0, 8).map((project, index) => (
//             <article
//               key={project.slug}
//               className={`home-project-card ${
//                 index % 2 === 1 ? "home-project-card-offset" : ""
//               }`}
//             >
//               <Link
//                 href={`/projects/${project.slug}`}
//                 className="home-project-image-link"
//                 aria-label={`View ${project.title}`}
//               >
//                 <Placeholder
//                   label={`Project ${String(index + 1).padStart(2, "0")}`}
//                   ratio={index % 3 === 1 ? "5 / 4" : "4 / 3"}
//                   className="home-project-placeholder"
//                 />
//                 <span className="home-project-open">↗</span>
//               </Link>

//               <div className="home-project-meta">
//                 <div>
//                   <h3>{project.title}</h3>
//                   <p>
//                     {[project.category, project.location]
//                       .filter(Boolean)
//                       .join(" / ")}
//                   </p>
//                 </div>

//                 <span>{project.year}</span>
//               </div>
//             </article>
//           ))}
//         </div>

//         {projects.length === 0 && (
//           <p className="home-empty-projects">
//             Project information will appear here.
//           </p>
//         )}

//         <SectionMarquee text="PROJECTS" />

//         <div className="home-more-projects">
//           <Link href="/projects" className="home-round-link">
//             <span>More projects</span>
//             <span>↗</span>
//           </Link>
//         </div>
//       </section>

//       {/* Design philosophy */}
//       <section className="home-philosophy-section">
//         <div className="home-philosophy-grid">
//           <div className="home-philosophy-copy">
//             <p className="home-kicker">02 / DESIGN PHILOSOPHY</p>

//             <h2>
//               Beyond
//               <br />
//               The Form<span>.</span>
//             </h2>

//             <p>
//               Architecture is more than form. It is the relationship between
//               space, material, light and the people who experience it.
//             </p>

//             <p>
//               Each project begins with understanding its purpose and develops
//               into a considered design with its own character.
//             </p>

//             <div className="home-philosophy-words">
//               <span>Form</span>
//               <span>Material</span>
//               <span>Light</span>
//             </div>
//           </div>

//           <div className="home-philosophy-image">
//             <Placeholder
//               label="Design philosophy"
//               ratio="4 / 5"
//               className="h-full bg-[#202020]"
//             />
//             <span className="home-image-caption">DESIGN / 2026</span>
//           </div>
//         </div>
//       </section>

//       {/* Work process */}
//       <section className="home-process-section">
//         <div className="home-process-glow" />

//         <div className="home-process-heading">
//           <p className="home-kicker">03 / HOW WE WORK</p>
//           <h2>
//             From concept
//             <br />
//             to completion<span>.</span>
//           </h2>
//         </div>

//         <div className="home-process-grid">
//           {processSteps.map((step) => (
//             <article className="home-process-card" key={step.number}>
//               <span className="home-process-number">{step.number}</span>
//               <div className="home-process-line" />
//               <h3>{step.title}</h3>
//               <p>{step.description}</p>
//             </article>
//           ))}
//         </div>
//       </section>

//       {/* Studio vision */}
//       <section className="home-studio-section">
//         <div className="home-studio-grid">
//           <div className="home-studio-image">
//             <Placeholder
//               label="Studio vision"
//               ratio="3 / 4"
//               className="h-full bg-[#202020]"
//             />
//             <span className="home-studio-line" />
//           </div>

//           <div className="home-studio-copy">
//             <p className="home-kicker">04 / PHILOSOPHY</p>

//             <h2>
//               Experience
//               <br />
//               in combination with
//               <br />
//               a distinct vision<span>.</span>
//             </h2>

//             <p>
//               Every space has a story to tell. Our approach brings together
//               functional planning, material sensitivity and a clear design
//               vision.
//             </p>

//             <p>
//               From the first concept to the final details, every decision
//               contributes to a coherent architectural experience.
//             </p>

//             <Link href="/about" className="home-text-link">
//               Discover the philosophy <span>↗</span>
//             </Link>
//           </div>
//         </div>
//       </section>
//     </main>
//   );
// }



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