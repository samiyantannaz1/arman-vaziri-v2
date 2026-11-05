"use client";

import { useEffect, useRef } from "react";
import ProcessCard from "./ProcessCard";

interface Stage {
  title: string;
  description: string;
}

export default function StageCards({ stages }: { stages: readonly Stage[] }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;

    // --p بین -1 و 1: وسط صفحه = 0
    const update = () => {
      frame = 0;
      const rect = element.getBoundingClientRect();
      const viewport = window.innerHeight;
      const center = rect.top + rect.height / 2;
      const progress = (viewport / 2 - center) / (viewport / 2 + rect.height / 2);
      element.style.setProperty(
        "--p",
        Math.max(-1, Math.min(1, progress)).toFixed(3)
      );
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div
      ref={ref}
           className="mx-auto grid w-full max-w-[1229px] grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4"
    >
      {stages.map((stage, index) => (
        <div
          key={stage.title}
          className="stage-shift"
          // دو کارت چپ حرکت می‌کنن، دو کارت راست ثابت می‌مونن
          style={{ "--shift": index < 2 ? "-90px" : "0px" } as React.CSSProperties}
        >
          <ProcessCard
            number={String(index + 1).padStart(2, "0")}
            title={stage.title}
            description={stage.description}
          />
        </div>
      ))}
    </div>
  );
}