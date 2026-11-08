// import type { Metadata } from "next";
// import Image from "next/image";
// import Link from "next/link";
// import AboutGallery from "@/components/AboutGallery";
// import BorderDrawButton from "@/components/BorderDrawButton";
// import Container from "@/components/Container";
// import Floating from "@/components/Floating";
// import Marquee from "@/components/Marquee";
// import Placeholder from "@/components/Placeholder";
// import Reveal from "@/components/Reveal";
// import { about, team } from "../../lib/content";
// import { getProjects, type Img } from "@/lib/projects";
// import { siteImage } from "@/lib/site-images";

// export const metadata: Metadata = {
//   title: "About",
//   description:
//     "Full cycle studio of design and architecture. Meet Arman Vaziri and the studio.",
// };

// // عکس‌های عمودی پروژه‌ها (حداکثر ۲ عکس از هر پروژه)
// function portraitImages(limit: number): Img[] {
//   const result: Img[] = [];
//   const seen = new Set<string>();

//   for (const project of getProjects()) {
//     const pool = [
//       ...project.home,
//       project.cover,
//       ...project.gallery.flatMap((block) => block.columns.flat()),
//     ].filter((img): img is Img => Boolean(img));

//     const portraits = pool
//       .filter((img) => img.height > img.width && !seen.has(img.src))
//       .slice(0, 2);

//     portraits.forEach((img) => seen.add(img.src));
//     result.push(...portraits);

//     if (result.length >= limit) break;
//   }

//   return result.slice(0, limit);
// }

// export default function AboutPage() {
//   const banner = siteImage("about-banner");
//   const gallery = portraitImages(12);

//   return (
//     <main className="min-h-screen overflow-x-clip pb-24 text-white">
//       {/* بالای صفحه: مسیر، عنوان و بنر */}
//       <header className="pt-36 md:pt-44">
//         <Container size="wide">
//           <Reveal>
//             <nav
//               aria-label="Breadcrumb"
//               className="mb-10 flex gap-2 text-sm text-white/70"
//             >
//               <Link href="/" className="text-[#e5cca8] hover:underline">
//                 Home
//               </Link>
//               <span aria-hidden="true">-</span>
//               <span aria-current="page">About us</span>
//             </nav>

//             <h1 className="text-3xl font-light tracking-tight md:text-5xl">
//               <span className="font-serif italic text-gold">about</span> us
//             </h1>
//           </Reveal>

//           <Reveal delay={150} className="mt-12">
//             <div className="relative aspect-[16/9] overflow-hidden bg-deep md:aspect-[3/1]">
//               {banner ? (
//                 <Image
//                   src={banner}
//                   alt="Arman Vaziri Studio"
//                   fill
//                   priority
//                   sizes="100vw"
//                   className="object-cover"
//                 />
//               ) : (
//                 <Placeholder label="Banner" className="h-full" />
//               )}
//             </div>
//           </Reveal>
//         </Container>
//       </header>

//       {/* درباره شرکت */}
//       <section className="py-24 md:py-36">
//         <Container size="narrow">
//           <div className="grid gap-12 md:grid-cols-2 md:gap-20">
//             <Reveal from="left">
//               <h2 className="text-[clamp(1.8rem,3.5vw,3.5rem)] font-light uppercase leading-[1.05] tracking-[-0.03em]">
//                 About our{" "}
//                 <span className="font-serif normal-case italic text-gold">
//                   company
//                 </span>
//               </h2>
//               <p className="mt-6 text-[11px] uppercase tracking-[0.3em] text-white/45">
//                 {about.subtitle}
//               </p>
//             </Reveal>

//             <Reveal from="right" delay={120}>
//               <div className="max-w-md space-y-6 text-sm font-light leading-8 text-white/60 md:text-[15px]">
//                 {about.paragraphs.map((text) => (
//                   <p key={text}>{text}</p>
//                 ))}
//               </div>
//             </Reveal>
//           </div>
//         </Container>
//       </section>

//       <Marquee text="ABOUT US" />

//       {/* گالری عکس‌های عمودی */}
//       <section className="py-20 md:py-32">
//         <Container size="wide">
//           <Reveal>
//             <h2 className="mb-14 max-w-3xl text-[clamp(1.5rem,3vw,3rem)] font-light uppercase leading-[1.1] tracking-[-0.03em] md:mb-20">
//               Best interior{" "}
//               <span className="font-serif normal-case italic text-gold">
//                 design and architecture
//               </span>{" "}
//               options
//             </h2>
//           </Reveal>

//           <AboutGallery images={gallery} />
//         </Container>
//       </section>

//       {/* تیم */}
//       <section className="py-20 md:py-32">
//         <Container size="wide">
//           <Reveal>
//             <h2 className="mb-16 text-center text-3xl font-light tracking-tight md:mb-24 md:text-5xl">
//               <span className="font-serif italic text-gold">our</span> team
//             </h2>
//           </Reveal>

//           <div className="flex flex-wrap justify-center gap-x-10 gap-y-20">
//             {team.map((member, index) => {
//               const photo = siteImage(member.image);
//               const [first, ...rest] = member.name.split(" ");

//               return (
//                 <article key={member.name} className="w-full max-w-[340px]">
//                   <Floating
//                     rotate={index % 2 === 0 ? -5 : 5}
//                     scaleFrom={0.9}
//                     scaleTo={1}
//                     lift={40}
//                   >
//                     <div className="relative aspect-[4/5] overflow-hidden bg-deep">
//                       {photo ? (
//                         <Image
//                           src={photo}
//                           alt={member.name}
//                           fill
//                           sizes="340px"
//                           className="object-cover"
//                         />
//                       ) : (
//                         <Placeholder label="Photo" className="h-full" />
//                       )}
//                     </div>
//                   </Floating>

//                   <Reveal className="mt-6">
//                     <h3 className="text-xl font-light md:text-2xl">
//                       <span className="font-serif italic text-gold">
//                         {first}
//                       </span>{" "}
//                       {rest.join(" ")}
//                     </h3>
//                     <p className="mt-2 text-[11px] uppercase tracking-[0.3em] text-white/45">
//                       {member.role}
//                     </p>
//                   </Reveal>
//                 </article>
//               );
//             })}
//           </div>
//         </Container>
//       </section>

//       {/* دعوت به تماس */}
//       <section className="py-20 text-center md:py-32">
//         <Container size="narrow">
//           <Reveal>
//             <h2 className="mb-12 text-[clamp(1.6rem,3.2vw,3.2rem)] font-light leading-[1.15] tracking-[-0.03em]">
//               Want{" "}
//               <span className="font-serif italic text-gold">to contact</span>{" "}
//               with us?
//             </h2>
//             <BorderDrawButton href="/contact#inquiry">
//               Start a conversation
//             </BorderDrawButton>
//           </Reveal>
//         </Container>
//       </section>
//     </main>
//   );
// }





import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import AboutGallery from "@/components/AboutGallery";
import BorderDrawButton from "@/components/BorderDrawButton";
import Container from "@/components/Container";
import Floating from "@/components/Floating";
import Marquee from "@/components/Marquee";
import Placeholder from "@/components/Placeholder";
import Reveal from "@/components/Reveal";
import { about, team } from "@/lib/content";
import { getProjects, type Img } from "@/lib/projects";
import { siteImage } from "@/lib/site-images";

export const metadata: Metadata = {
  title: "About",
  description:
    "Full cycle studio of design and architecture. Meet Arman Vaziri and the studio.",
};

// عکس‌های عمودی پروژه‌ها (حداکثر ۲ عکس از هر پروژه)
function portraitImages(limit: number): Img[] {
  const result: Img[] = [];
  const seen = new Set<string>();

  for (const project of getProjects()) {
    const pool = [
      ...project.home,
      project.cover,
      ...project.gallery.flatMap((block) => block.columns.flat()),
    ].filter((img): img is Img => Boolean(img));

    const portraits = pool
      .filter((img) => img.height > img.width && !seen.has(img.src))
      .slice(0, 2);

    portraits.forEach((img) => seen.add(img.src));
    result.push(...portraits);

    if (result.length >= limit) break;
  }

  return result.slice(0, limit);
}

export default function AboutPage() {
  const banner = siteImage("about-banner");
  const gallery = portraitImages(12);

  const founder = team.length === 1 ? team[0] : null;
  const founderPhoto = founder ? siteImage(founder.image) : null;

  return (
    <main className="min-h-screen overflow-x-clip pb-24 text-white">
      {/* بالای صفحه: مسیر، عنوان و بنر */}
      <header className="pt-36 md:pt-44">
        <Container size="wide">
          <Reveal>
            <nav
              aria-label="Breadcrumb"
              className="mb-10 flex gap-2 text-sm text-white/70"
            >
              <Link href="/" className="text-[#e5cca8] hover:underline">
                Home
              </Link>
              <span aria-hidden="true">-</span>
              <span aria-current="page">About us</span>
            </nav>

            <h1 className="text-3xl font-light tracking-tight md:text-5xl">
              <span className="font-serif italic text-gold">about</span> us
            </h1>
          </Reveal>

          <Reveal delay={150} className="mt-12">
            <div className="relative aspect-[16/9] overflow-hidden bg-deep md:aspect-[3/1]">
              {banner ? (
                <Image
                  src={banner}
                  alt="Arman Vaziri Studio"
                  fill
                  priority
                  sizes="100vw"
                  className="object-cover"
                />
              ) : (
                <Placeholder label="Banner" className="h-full" />
              )}
            </div>
          </Reveal>
        </Container>
      </header>

      {/* درباره شرکت */}
      <section className="py-24 md:py-36">
        <Container size="narrow">
          <div className="grid gap-12 md:grid-cols-2 md:gap-20">
            <Reveal from="left">
              <h2 className="text-[clamp(1.8rem,3.5vw,3.5rem)] font-light uppercase leading-[1.05] tracking-[-0.03em]">
                About our{" "}
                <span className="font-serif normal-case italic text-gold">
                  company
                </span>
              </h2>
              <p className="mt-6 text-[11px] uppercase tracking-[0.3em] text-white/45">
                {about.subtitle}
              </p>
            </Reveal>

            <Reveal from="right" delay={120}>
              <div className="max-w-md space-y-6 text-sm font-light leading-8 text-white/60 md:text-[15px]">
                {about.paragraphs.map((text) => (
                  <p key={text}>{text}</p>
                ))}
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      <Marquee text="ABOUT US" />

      {/* گالری عکس‌های عمودی */}
      <section className="py-20 md:py-32">
        <Container size="wide">
          <Reveal>
            <h2 className="mb-14 max-w-3xl text-[clamp(1.5rem,3vw,3rem)] font-light uppercase leading-[1.1] tracking-[-0.03em] md:mb-20">
              Best interior{" "}
              <span className="font-serif normal-case italic text-gold">
                design and architecture
              </span>{" "}
              options
            </h2>
          </Reveal>

          <AboutGallery images={gallery} />
        </Container>
      </section>

      {/* یک نفر: معرفی بنیان‌گذار. چند نفر: گرید «our team» */}
      {founder ? (
        <section className="py-20 md:py-32">
          <Container size="narrow">
            <div className="grid items-center gap-12 md:grid-cols-[0.8fr_1fr] md:gap-20">
              <Floating rotate={-6} scaleFrom={0.9} scaleTo={1} lift={40}>
                <div className="relative mx-auto aspect-[4/5] w-full max-w-[380px] overflow-hidden bg-deep">
                  {founderPhoto ? (
                    <Image
                      src={founderPhoto}
                      alt={founder.name}
                      fill
                      sizes="(max-width: 768px) 80vw, 380px"
                      className="object-cover"
                    />
                  ) : (
                    <Placeholder label="Portrait" className="h-full" />
                  )}
                </div>
              </Floating>

              <Reveal from="right">
                <p className="mb-6 text-[11px] uppercase tracking-[0.35em] text-gold/70">
                  Meet the founder
                </p>

                <h2 className="text-[clamp(2rem,4vw,4rem)] font-light leading-[1.05] tracking-[-0.03em]">
                  <span className="font-serif italic text-gold">
                    {founder.name.split(" ")[0]}
                  </span>{" "}
                  {founder.name.split(" ").slice(1).join(" ")}
                </h2>

                <p className="mt-3 text-[11px] uppercase tracking-[0.3em] text-white/45">
                  {founder.role}
                </p>

                {founder.bio && (
                  <p className="mt-8 max-w-md text-sm font-light leading-8 text-white/60 md:text-[15px]">
                    {founder.bio}
                  </p>
                )}
              </Reveal>
            </div>
          </Container>
        </section>
      ) : (
        <section className="py-20 md:py-32">
          <Container size="wide">
            <Reveal>
              <h2 className="mb-16 text-center text-3xl font-light tracking-tight md:mb-24 md:text-5xl">
                <span className="font-serif italic text-gold">our</span> team
              </h2>
            </Reveal>

            <div className="flex flex-wrap justify-center gap-x-10 gap-y-20">
              {team.map((member, index) => {
                const photo = siteImage(member.image);
                const [first, ...rest] = member.name.split(" ");

                return (
                  <article key={member.name} className="w-full max-w-[340px]">
                    <Floating
                      rotate={index % 2 === 0 ? -5 : 5}
                      scaleFrom={0.9}
                      scaleTo={1}
                      lift={40}
                    >
                      <div className="relative aspect-[4/5] overflow-hidden bg-deep">
                        {photo ? (
                          <Image
                            src={photo}
                            alt={member.name}
                            fill
                            sizes="340px"
                            className="object-cover"
                          />
                        ) : (
                          <Placeholder label="Photo" className="h-full" />
                        )}
                      </div>
                    </Floating>

                    <Reveal className="mt-6">
                      <h3 className="text-xl font-light md:text-2xl">
                        <span className="font-serif italic text-gold">
                          {first}
                        </span>{" "}
                        {rest.join(" ")}
                      </h3>
                      <p className="mt-2 text-[11px] uppercase tracking-[0.3em] text-white/45">
                        {member.role}
                      </p>
                    </Reveal>
                  </article>
                );
              })}
            </div>
          </Container>
        </section>
      )}

      {/* دعوت به تماس */}
      <section className="py-20 text-center md:py-32">
        <Container size="narrow">
          <Reveal>
            <h2 className="mb-12 text-[clamp(1.6rem,3.2vw,3.2rem)] font-light leading-[1.15] tracking-[-0.03em]">
              Want{" "}
              <span className="font-serif italic text-gold">to contact</span>{" "}
              with us?
            </h2>
            <BorderDrawButton href="/contact#inquiry">
              Start a conversation
            </BorderDrawButton>
          </Reveal>
        </Container>
      </section>
    </main>
  );
}