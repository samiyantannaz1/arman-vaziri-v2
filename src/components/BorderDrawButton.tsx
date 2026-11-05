import Link from "next/link";
import type { ReactNode } from "react";

const draw =
  "absolute bg-gold transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]";

export default function BorderDrawButton({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  return (
    <Link
      href={href}
      className="group relative inline-flex min-w-[220px] items-center justify-center border border-white/30 px-10 py-5"
    >
      <span aria-hidden="true" className={`${draw} left-0 top-[-1px] h-px w-full origin-left scale-x-0 group-hover:scale-x-100`} />
      <span aria-hidden="true" className={`${draw} right-[-1px] top-0 h-full w-px origin-top scale-y-0 delay-100 group-hover:scale-y-100`} />
      <span aria-hidden="true" className={`${draw} bottom-[-1px] right-0 h-px w-full origin-right scale-x-0 delay-200 group-hover:scale-x-100`} />
      <span aria-hidden="true" className={`${draw} bottom-0 left-[-1px] h-full w-px origin-bottom scale-y-0 delay-300 group-hover:scale-y-100`} />

      <span className="text-[10px] uppercase tracking-[0.3em] text-white transition-colors duration-500 group-hover:text-gold">
        {children}
      </span>
      <span
        aria-hidden="true"
        className="ml-5 text-base text-white transition-all duration-500 group-hover:translate-x-2 group-hover:text-gold"
      >
        →
      </span>
    </Link>
  );
}