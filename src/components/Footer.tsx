import Link from "next/link";
import { nav, site } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/10 bg-bg text-white">
      <div className="mx-auto max-w-[1440px] px-5 pb-6 pt-16 sm:px-8 sm:pt-20 lg:px-12 lg:pt-24">
        <div className="flex flex-col gap-8 border-b border-white/15 pb-12 sm:pb-16 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <Link
              href="/"
              className="inline-block text-xl font-light tracking-[0.18em] sm:text-2xl"
            >
              {site.name.toUpperCase()}
              <span className="text-gold">.</span>
            </Link>
            <p className="mt-3 text-[10px] tracking-[0.3em] text-white/50 sm:text-xs">
              {site.tagline.toUpperCase()}
            </p>
          </div>

          <div className="max-w-xl">
            <h2 className="text-3xl font-light leading-tight sm:text-4xl lg:text-5xl">
              Let&apos;s create something timeless.
            </h2>
            <p className="mt-4 max-w-md text-sm leading-7 text-white/55">
              Architecture shaped around space, material and light.
            </p>
            <Link
              href="/contact"
              className="mt-7 inline-flex min-h-12 items-center gap-5 rounded-full border border-gold px-6 py-3 text-xs tracking-[0.12em] transition-colors duration-300 hover:bg-gold hover:text-black"
            >
              START A PROJECT
              <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </div>

        <div className="py-10 sm:py-12">
          <h3 className="mb-5 text-[10px] tracking-[0.25em] text-white/40">
            EXPLORE
          </h3>
          <nav
            aria-label="Footer navigation"
            className="flex flex-col items-start gap-3"
          >
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm text-white/75 transition-colors hover:text-gold"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex flex-col gap-4 border-t border-white/15 pt-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-white/45">
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <p className="text-xs text-white/50">
            Website by <span className="text-gold">{site.credit}</span>
          </p>
          <a
            href="#"
            className="w-fit text-xs text-white/50 transition-colors hover:text-gold"
          >
            BACK TO TOP ↑
          </a>
        </div>
      </div>
    </footer>
  );
}