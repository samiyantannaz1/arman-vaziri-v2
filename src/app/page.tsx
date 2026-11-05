// import FeaturedProjects from "@/components/FeaturedProjects";
// import Hero from "@/components/Hero";
// import Philosophy from "@/components/Philosophy";
// import StageCards from "@/components/StageCards";
// import StudioVision from "@/components/StudioVision";
// import { stages } from "@/lib/content";
// import { getProjects, type Img, type Project } from "@/lib/projects";
// import { siteImage } from "@/lib/site-images";

// const heroNames = [1, 2, 3, 4, 5, 6, 7].map((n) => `hero-0${n}`);

// // تعداد عکس هر ردیف (مثل سایت مرجع). بعد از ردیف هشتم: یک‌درمیان
// const LAYOUT: (1 | 2)[] = [2, 1, 2, 1, 2, 2, 1, 2];

// const isPortrait = (img: Img) => img.height > img.width;

// function pickImages(project: Project, count: 1 | 2): (Img | null)[] {
//   // اگر عکس‌های home-1 و home-2 هست، همان‌ها به ترتیب
//   if (project.home.length >= count) return project.home.slice(0, count);

//   const pool: Img[] = [
//     project.cover,
//     ...project.gallery.flatMap((block) => block.columns.flat()),
//   ].filter((img): img is Img => Boolean(img));

//   const portrait = pool.find(isPortrait) ?? null;
//   const landscape = pool.find((img) => !isPortrait(img)) ?? null;

//   // دوتایی: عمودی + افقی. تکی: افقی
//   return count === 2 ? [portrait, landscape] : [landscape ?? pool[0] ?? null];
// }

// export default function Home() {
//   const heroImages = heroNames
//     .map((name) => siteImage(name))
//     .filter((src): src is string => Boolean(src));

//   const featured = getProjects()
//     .slice(0, 8)
//     .map((project, index) => {
//       const layout = LAYOUT[index] ?? (index % 2 === 0 ? 2 : 1);

//       return {
//         slug: project.slug,
//         title: project.title,
//         location: project.location,
//         year: project.year,
//         layout,
//         images: pickImages(project, layout),
//       };
//     });

//   return (
//     <main>
//       <Hero images={heroImages} />

//       {/* Hero ثابت می‌ماند و این بخش با اسکرول روی آن می‌آید */}
//       <div className="relative z-10">
//         <div
//           aria-hidden="true"
//           className="h-[40vh] bg-gradient-to-b from-transparent to-bg"
//         />

//         <div className="relative">
//           <FeaturedProjects projects={featured} />
//           <Philosophy />

//           <section className="px-2 py-20 sm:px-4 md:py-32">
//             <StageCards stages={stages} />
//           </section>

//           <StudioVision image={siteImage("arman")} />
//         </div>
//       </div>
//     </main>
//   );
// }



import FeaturedProjects from "@/components/FeaturedProjects";
import Hero from "@/components/Hero";
import Philosophy from "@/components/Philosophy";
import StageCards from "@/components/StageCards";
import StudioVision from "@/components/StudioVision";
import { stages } from "@/lib/content";
import { getProjects, type Img, type Project } from "@/lib/projects";
import { siteImage } from "@/lib/site-images";

const heroNames = [1, 2, 3, 4, 5, 6, 7].map((n) => `hero-0${n}`);

// تعداد عکس هر ردیف (مثل سایت مرجع). بعد از ردیف هشتم: یک‌درمیان
const LAYOUT: (1 | 2)[] = [2, 1, 2, 1, 2, 2, 1, 2];

const isPortrait = (img: Img) => img.height > img.width;

function pickImages(project: Project, count: 1 | 2): (Img | null)[] {
  // اگر عکس‌های home-1 و home-2 هست، همان‌ها به ترتیب
  if (project.home.length >= count) return project.home.slice(0, count);

  const pool: Img[] = [
    project.cover,
    ...project.gallery.flatMap((block) => block.columns.flat()),
  ].filter((img): img is Img => Boolean(img));

  const portrait = pool.find(isPortrait) ?? null;
  const landscape = pool.find((img) => !isPortrait(img)) ?? null;

  // دوتایی: عمودی + افقی. تکی: افقی
  return count === 2 ? [portrait, landscape] : [landscape ?? pool[0] ?? null];
}

export default function Home() {
  const heroImages = heroNames
    .map((name) => siteImage(name))
    .filter((src): src is string => Boolean(src));

  const featured = getProjects()
    .slice(0, 8)
    .map((project, index) => {
      const layout = LAYOUT[index] ?? (index % 2 === 0 ? 2 : 1);

      return {
        slug: project.slug,
        title: project.title,
        location: project.location,
        year: project.year,
        layout,
        images: pickImages(project, layout),
      };
    });

  return (
    <main>
      <Hero images={heroImages} />

      {/* Hero ثابت می‌ماند و این بخش با اسکرول روی آن می‌آید */}
      <div className="relative z-10">
        <div
          aria-hidden="true"
          className="h-[40vh] bg-gradient-to-b from-transparent to-bg"
        />

        <div className="relative">
          <FeaturedProjects projects={featured} />
          <Philosophy />

          <section className="px-2 py-20 sm:px-4 md:py-32">
            <StageCards stages={stages} />
          </section>

          <StudioVision image={siteImage("arman")} />
        </div>
      </div>
    </main>
  );
}