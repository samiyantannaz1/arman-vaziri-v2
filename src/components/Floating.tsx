"use client";

import { useEffect, useRef, type ReactNode } from "react";

interface FloatingProps {
  children: ReactNode;
  rotate?: number; // زاویه کج بودن اولیه (درجه)
  scaleFrom?: number;
  scaleTo?: number;
  lift?: number; // میزان پایین بودن اولیه (پیکسل)
  className?: string;
}

const pose = (
  t: number,
  rotate: number,
  scaleFrom: number,
  scaleTo: number,
  lift: number
) =>
  `translate3d(0, ${(1 - t) * lift}px, 0) rotate(${(1 - t) * rotate}deg) scale(${
    scaleFrom + t * (scaleTo - scaleFrom)
  })`;

// کج و کوچک از پایین وارد می‌شود و وقتی به وسط صفحه رسید صاف می‌شود
export default function Floating({
  children,
  rotate = 6,
  scaleFrom = 0.86,
  scaleTo = 0.96,
  lift = 40,
  className = "",
}: FloatingProps) {
  const outer = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const outerEl = outer.current;
    const innerEl = inner.current;
    if (!outerEl || !innerEl) return;

    const apply = (t: number) => {
      innerEl.style.transform = pose(t, rotate, scaleFrom, scaleTo, lift);
    };

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      apply(1);
      return;
    }

    let frame = 0;
    let listening = false;

    // اندازه‌گیری روی المان بیرونی انجام می‌شود (که transform ندارد)
    const update = () => {
      frame = 0;
      const rect = outerEl.getBoundingClientRect();
      const vh = window.innerHeight;
      // ۰ وقتی بالای المان به پایین صفحه می‌رسد، ۱ وقتی مرکزش به ۴۵٪ ارتفاع صفحه می‌رسد
      const progress = (vh - rect.top) / (vh * 0.55 + rect.height / 2);
      apply(Math.min(1, Math.max(0, progress)));
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    const start = () => {
      if (listening) return;
      listening = true;
      update();
      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("resize", onScroll);
    };

    const stop = () => {
      if (!listening) return;
      listening = false;
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };

    const observer = new IntersectionObserver(
      ([entry]) => (entry.isIntersecting ? start() : stop()),
      { rootMargin: "150px 0px" }
    );
    observer.observe(outerEl);

    return () => {
      observer.disconnect();
      stop();
      if (frame) cancelAnimationFrame(frame);
    };
  }, [rotate, scaleFrom, scaleTo, lift]);

  return (
    <div ref={outer} className={className}>
      <div
        ref={inner}
        className="will-change-transform"
        style={{ transform: pose(0, rotate, scaleFrom, scaleTo, lift) }}
      >
        {children}
      </div>
    </div>
  );
}