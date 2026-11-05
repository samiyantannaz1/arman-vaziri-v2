import Image from "next/image";
import Container from "./Container";
import Floating from "./Floating";
import Placeholder from "./Placeholder";
import Reveal from "./Reveal";

export default function StudioVision({ image }: { image: string | null }) {
  return (
    <section className="relative overflow-x-clip py-28 md:py-40">
      <Container
        size="narrow"
        className="grid grid-cols-1 items-center gap-20 md:grid-cols-2 md:gap-24"
      >
        <Reveal from="left" className="order-2 md:order-1">
          <p className="mb-8 text-[11px] uppercase tracking-[0.35em] text-gold/70">
            Philosophy
          </p>

          <h2 className="max-w-[520px] text-4xl font-light leading-[1.15] tracking-[-0.03em] md:text-5xl lg:text-6xl">
            10 years experience
            <br />
            <span className="text-white/45">in combination with</span>
            <br />
            a distinct vision
          </h2>

          <div className="mt-12 max-w-[500px] space-y-6 text-sm font-light leading-7 text-white/55 md:text-[15px]">
            <p>
              Our approach goes beyond creating beautiful spaces. We design
              environments that reflect the character, lifestyle, and
              aspirations of the people who inhabit them.
            </p>
            <p>
              We believe architecture is not only about form and function. It
              is about creating a meaningful relationship between people and
              the spaces around them.
            </p>
            <p>
              Every project begins with understanding: the context, the
              individual, and the way a space is meant to be experienced.
            </p>
            <p>
              At Arman Vaziri Studio, design is a process of discovering
              balance between material, light, proportion, and human
              experience.
            </p>
          </div>
        </Reveal>

        <div className="order-1 flex justify-center md:order-2 md:justify-end">
          <div className="relative w-[78%] max-w-[420px] md:w-[85%]">
            {/* خط مورب طلایی: ثابت و زیر عکس */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -left-[65%] bottom-[40%] z-0 h-px w-[230%] -rotate-[40deg] bg-gold/70"
            />

            {/* عکس شخص: بالای خط، کج شروع می‌شود و با اسکرول صاف می‌شود */}
            <div className="relative z-10">
              <Floating rotate={-18} scaleFrom={0.9} scaleTo={1} lift={60}>
                <div className="relative aspect-[3/4] overflow-hidden bg-bg">
                  {image ? (
                    <Image
                      src={image}
                      alt="Arman Vaziri Studio"
                      fill
                      sizes="(max-width: 768px) 80vw, 420px"
                      className="object-cover"
                    />
                  ) : (
                    <Placeholder
                      label="Portrait"
                      ratio="3 / 4"
                      className="h-full"
                    />
                  )}
                </div>
              </Floating>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}