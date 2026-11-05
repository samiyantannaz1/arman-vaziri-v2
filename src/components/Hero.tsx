"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { site } from "@/lib/site";

const DISPLAY_TIME = 5000;
const TRANSITION_TIME = 1000;

// 0 = صفحه مشکی و لوگوی درشت، 1 = لوگو در حال رفتن به نوبار،
// 2 = باز شدن (خط، دایره، عکس‌ها)، 3 = تمام
type Stage = 0 | 1 | 2 | 3;

// بعد از یک بار پخش، با رفت‌وآمد بین صفحه‌ها دوباره پخش نمی‌شود (با رفرش پخش می‌شود)
let introPlayed = false;

// هر عکس از دو نیمه (بالا و پایین) ساخته می‌شود
function Layer({
  src,
  enter = false,
  priority = false,
}: {
  src: string;
  enter?: boolean;
  priority?: boolean;
}) {
  return (
    <div className={`hero-layer ${enter ? "hero-enter" : ""}`}>
      {(["top", "bottom"] as const).map((part) => (
        <div key={part} className={`hero-half hero-half-${part}`}>
          <div className="hero-half-inner">
            <Image
              src={src}
              alt=""
              fill
              sizes="100vw"
              priority={priority}
              className="object-cover"
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export default function Hero({ images }: { images: string[] }) {
  const heroRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLSpanElement>(null);
  const [stage, setStage] = useState<Stage>(introPlayed ? 3 : 0);
  const [current, setCurrent] = useState(0);
  const [next, setNext] = useState<number | null>(null);

  const open = stage >= 2;

  // انیمیشن شروع
  useEffect(() => {
    if (introPlayed) return;

    const root = document.documentElement;

    const finish = () => {
      introPlayed = true;
      delete root.dataset.intro;
      setStage(3);
    };

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      finish();
      return;
    }

    // لوگوی واقعی نوبار تا پایان انیمیشن مخفی است
    root.dataset.intro = "playing";

    // لوگوی درشت را به جای لوگوی نوبار می‌برد
    const flyLogo = () => {
      const logo = logoRef.current;
      if (!logo) return;

      const desktop = document
        .getElementById("site-logo")
        ?.getBoundingClientRect();
      const target =
        desktop && desktop.width > 0
          ? desktop
          : document.getElementById("site-logo-mobile")?.getBoundingClientRect();

      if (!target || target.width === 0) return;

      const scale = target.width / logo.offsetWidth;
      const dx =
        target.left + target.width / 2 - document.documentElement.clientWidth / 2;
      const dy =
        target.top + target.height / 2 - document.documentElement.clientHeight / 2;

      logo.style.transform = `translate(calc(-50% + ${dx}px), calc(-50% + ${dy}px)) perspective(900px) rotateX(0deg) scale(${scale})`;
    };

    const timers = [
      setTimeout(() => {
        setStage(1);
        flyLogo();
      }, 700),
      setTimeout(() => setStage(2), 1500),
      setTimeout(finish, 2600),
    ];

    return () => {
      timers.forEach(clearTimeout);
      delete root.dataset.intro;
    };
  }, []);

  // اسلایدر (بعد از پایان انیمیشن شروع)
  useEffect(() => {
    if (stage < 3 || images.length < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const target = (current + 1) % images.length;

    const preload = new window.Image();
    preload.src = images[target];

    let finish: ReturnType<typeof setTimeout> | undefined;

    const start = setTimeout(() => {
      setNext(target);
      finish = setTimeout(() => {
        setCurrent(target);
        setNext(null);
      }, TRANSITION_TIME);
    }, DISPLAY_TIME);

    return () => {
      clearTimeout(start);
      if (finish) clearTimeout(finish);
    };
  }, [current, images, stage]);

  // اسکرول: فقط یک متغیر CSS (--s)
  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

    let frame = 0;

    const update = () => {
      frame = 0;
      const s = Math.min(window.scrollY / window.innerHeight, 3);
      hero.style.setProperty("--s", s.toFixed(3));
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

  const layers = [current, next].filter((i): i is number => i !== null);

  return (
    <>
      {stage < 3 && (
        <div
          className={`hero-intro ${open ? "hero-intro-open" : ""}`}
          aria-hidden="true"
        >
          <span
            ref={logoRef}
            className="hero-intro-logo metallic-logo block font-bold uppercase"
          >
            {site.name}
          </span>
        </div>
      )}

      <section
        ref={heroRef}
        className={`hero ${open ? "hero-show" : ""}`}
        aria-label="Introduction"
      >
        <div className="hero-media" aria-hidden="true">
          {images.length > 0 &&
            layers.map((index) => (
              <Layer
                key={index}
                src={images[index]}
                enter={index === next}
                priority={index === 0}
              />
            ))}
        </div>

        <div className="hero-shade" aria-hidden="true" />
        <div className="hero-glow" aria-hidden="true" />

        <div className="hero-content">
          <div className="hero-line" aria-hidden="true" />
          <div className="hero-diag" aria-hidden="true" />

          {/* دایره Send request */}
          <div className="hero-cta-pos">
            <Link href="/contact#inquiry" className="hero-cta group">
              <span className="hero-cta-ring" aria-hidden="true" />
              <span className="hero-cta-label">
                <span className="hero-shine">
                  Send
                  <br />
                  request
                </span>
                <svg
                  viewBox="0 0 20 10"
                  aria-hidden="true"
                  className="hero-cta-arrow"
                  fill="none"
                  stroke="#e5cca8"
                  strokeWidth="0.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M1 5h17m-4-4 4 4-4 4" />
                </svg>
              </span>
            </Link>
          </div>

          <h1 className="hero-title">
            <span className="hero-title-1">full cycle studio</span>
            <span className="hero-title-2">
              of <em>design</em> and architecture
            </span>
          </h1>

          <div className="hero-scroller" aria-hidden="true">
            <span className="hero-scroller-dot" />
          </div>

                   {/* <Link href="/contact" className="hero-contact">
            Contact us
          </Link> */}
          {/* <div className="hero-contact-line" aria-hidden="true" /> */}
        </div>
      </section>
    </>
  );
}