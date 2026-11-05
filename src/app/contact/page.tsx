import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import Container from "@/components/Container";
import Reveal from "@/components/Reveal";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Tell us about your project. Call, write or send an inquiry to Arman Vaziri Studio.",
};

const methods = [
  {
    number: "01",
    label: "PHONE",
    title: "Call directly",
    text: "For project inquiries and direct communication.",
    action: "Call Arman",
    href: `tel:${site.phone}`,
    external: false,
  },
{
  number: "02",
  label: "EMAIL",
  title: "Write an email",
  text: "Share your ideas and tell us about your project.",
  action: "Send an email",
  href: `https://mail.google.com/mail/u/0/?to=${site.email}&fs=1&tf=cm`,
  external: true,
},
  {
    number: "03",
    label: "WHATSAPP",
    title: "Chat on WhatsApp",
    text: "Let’s discuss your project directly.",
    action: "Chat on WhatsApp",
    href: `https://wa.me/${site.whatsapp}`,
    external: true,
  },
];

export default function ContactPage() {
  return (
    <main className="min-h-screen overflow-x-clip pb-24 pt-36 text-white md:pt-44">
      <Container size="narrow">
        <Reveal>
          <header className="mb-20 text-center md:mb-24">
            <span className="mb-6 block text-[10px] tracking-[0.4em] text-white/40 md:text-xs">
              GET IN TOUCH
            </span>

            <h1 className="text-3xl font-light tracking-[0.06em] md:text-5xl">
              LET&apos;S{" "}
              <span className="font-serif italic text-gold">TALK</span>
            </h1>

            <div className="mx-auto my-7 h-2 w-2 rotate-45 bg-gold" />

            <p className="mx-auto max-w-2xl text-sm font-light leading-8 tracking-wide text-white/50 md:text-base">
              Every great space begins with an idea. Tell us about your
              vision, and let&apos;s explore how we can bring it to life.
            </p>
          </header>
        </Reveal>

        <div className="grid grid-cols-1 gap-10 border-t border-white/10 pt-10 md:grid-cols-3 md:gap-8">
          {methods.map((method, index) => (
            <Reveal key={method.number} delay={index * 120} className="h-full">
              <article className="flex h-full flex-col items-start">
                <span className="mb-7 text-xs tracking-[0.25em] text-gold/80">
                  {method.number} / {method.label}
                </span>
                <h2 className="mb-3 text-xl font-light">{method.title}</h2>
                <p className="mb-7 max-w-xs text-sm leading-7 text-white/45">
                  {method.text}
                </p>
                <a
                  href={method.href}
                  target={method.external ? "_blank" : undefined}
                  rel={method.external ? "noopener noreferrer" : undefined}
                  className="mt-auto border-b border-gold/50 pb-2 text-xs tracking-[0.12em] text-white/80 transition-colors duration-300 hover:border-gold hover:text-gold"
                >
                  {method.action} ↗
                </a>
              </article>
            </Reveal>
          ))}
        </div>

        {/* هدف لینک‌های «Send request» و «Start a conversation» */}
        <section
          id="inquiry"
          className="mt-24 scroll-mt-32 border-t border-white/10 pt-12 md:mt-32 md:pt-16"
        >
          <Reveal>
            <div className="mb-12 max-w-xl">
              <span className="text-[10px] tracking-[0.3em] text-gold">
                PROJECT INQUIRY
              </span>
              <h2 className="mt-4 text-2xl font-light md:text-3xl">
                Tell us about your project.
              </h2>
              <p className="mt-4 text-sm leading-7 text-white/45">
                Share a few details about your project, and let&apos;s start a
                conversation.
              </p>
            </div>
          </Reveal>

          <ContactForm />
        </section>

        <Reveal>
          <div className="mt-24 border-t border-white/10 pt-10 text-center md:mt-32 md:pt-14">
            <p className="text-xs tracking-[0.2em] text-white/40">
              HAVE A PROJECT IN MIND?
            </p>
            <p className="mt-4 text-xl font-light md:text-2xl">
              Let&apos;s make it happen.
            </p>
          </div>
        </Reveal>
      </Container>
    </main>
  );
}