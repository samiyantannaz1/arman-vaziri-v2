import Container from "./Container";
import Reveal from "./Reveal";

export default function Philosophy() {
  return (
    <section className="overflow-x-clip py-16 md:py-24">
      <Container size="narrow">
        <Reveal from="left">
          <p className="text-[clamp(1.6rem,3.5vw,3.4rem)] font-light leading-[0.95] tracking-[-0.04em] text-white/90">
            We are in favor of
          </p>
        </Reveal>

        <Reveal from="right" delay={120} className="text-right">
          <p className="text-[clamp(1.6rem,3.5vw,3.4rem)] font-light italic leading-[0.95] tracking-[-0.04em] text-gold">
            aesthetics in details
          </p>
        </Reveal>

        <Reveal from="left" delay={240} className="mt-3">
          <p className="text-[clamp(1.35rem,2.8vw,2.7rem)] font-light leading-none tracking-[-0.035em] text-white/65">
            Design, that is inspired by nature
          </p>
        </Reveal>
      </Container>
    </section>
  );
}