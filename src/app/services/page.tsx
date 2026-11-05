import type { Metadata } from "next";
import Container from "@/components/Container";
import Marquee from "@/components/Marquee";
import Reveal from "@/components/Reveal";
import ServiceItem from "@/components/ServiceItem";
import StageCards from "@/components/StageCards";
import { services, stages } from "@/lib/content";
import { siteImage } from "@/lib/site-images";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Architectural design, interior design, renovation, equipment and author’s supervision.",
};

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-bg pb-24 pt-36 text-white md:pt-44">
      <Container size="narrow">
        <Reveal>
          <header className="mx-auto mb-20 max-w-3xl text-center md:mb-28">
            <h1 className="text-xl font-light tracking-[0.04em] md:text-3xl lg:text-4xl">
              OUR{" "}
              <span className="font-serif italic text-white/85">SERVICES</span>
            </h1>

            <div className="mx-auto my-8 h-2 w-2 rotate-45 bg-gold" />

            <p className="text-sm font-light leading-8 tracking-wide text-white/50 md:text-base md:leading-9">
              We transform ideas into{" "}
              <span className="text-white/85">
                thoughtfully designed spaces
              </span>
              , combining creativity, functionality, and attention to every
              detail. From the initial concept to the final visualization,
              every stage is shaped around your vision, lifestyle, and unique
              requirements.
            </p>
          </header>
        </Reveal>

        <div className="flex flex-col gap-24 md:gap-40">
          {services.map((service, index) => (
            <ServiceItem
              key={service.slug}
              number={String(index + 1).padStart(2, "0")}
              title={service.title}
              description={service.description}
              image={siteImage(service.slug)}
              flip={index % 2 === 1}
            />
          ))}
        </div>
      </Container>

      <section className="mt-32 pb-12 md:mt-48 md:pb-24">
        <Marquee text="WORK STAGES" />

        {/* عمداً بیرون از Container: فقط 8 پیکسل فاصله کناری، تا کارت‌ها جا داشته باشند */}
        <div className="mt-16 w-full px-2">
          <StageCards stages={stages} />
        </div>
      </section>
    </main>
  );
}