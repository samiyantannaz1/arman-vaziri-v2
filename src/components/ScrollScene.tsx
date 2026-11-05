"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";

export default function ScrollScene({
  children,
  className = "",
  style,
}: {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      element.style.setProperty("--p", "1");
      return;
    }

    let frame = 0;
    let listening = false;

    // 0 = تازه از پایین وارد صفحه شده، 1 = از بالا خارج شده
    const update = () => {
      frame = 0;
      const rect = element.getBoundingClientRect();
      const viewport = window.innerHeight;
      const progress = (viewport - rect.top) / (viewport + rect.height);
      element.style.setProperty(
        "--p",
        Math.min(1, Math.max(0, progress)).toFixed(3)
      );
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

    // فقط وقتی نزدیک صفحه است گوش می‌دهد
    const observer = new IntersectionObserver(
      ([entry]) => (entry.isIntersecting ? start() : stop()),
      { rootMargin: "120px 0px" }
    );
    observer.observe(element);

    return () => {
      observer.disconnect();
      stop();
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div ref={ref} className={className} style={style}>
      {children}
    </div>
  );
}