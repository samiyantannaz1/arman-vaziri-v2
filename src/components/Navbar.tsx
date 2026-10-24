"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { nav, site } from "@/lib/site";

// "/projects/" را "/projects" می‌کند (چون trailingSlash روشن است)
const clean = (path: string) => (path.length > 1 ? path.replace(/\/$/, "") : path);

export default function Navbar() {
  const pathname = clean(usePathname());
  const [open, setOpen] = useState(false);

  const isActive = (href: string) =>
    href === "/"
      ? pathname === "/"
      : pathname === href || pathname.startsWith(`${href}/`);

  // وقتی منوی موبایل بازه، اسکرول صفحه قفل می‌شود
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // نور روی لوگو را مستقیم با CSS تغییر می‌دهیم (بدون رندر دوباره)
  const moveLight = (event: React.MouseEvent<HTMLElement>) => {
    const box = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty(
      "--x",
      `${((event.clientX - box.left) / box.width) * 100}%`
    );
    event.currentTarget.style.setProperty(
      "--y",
      `${((event.clientY - box.top) / box.height) * 100}%`
    );
  };

  const linkClass = (href: string) =>
    `whitespace-nowrap text-[15px] font-semibold tracking-[0.1em] transition-colors duration-300 ${
      isActive(href) ? "text-gold" : "text-white/80 hover:text-gold"
    }`;

  const left = nav.slice(0, 3);
  const right = nav.slice(3);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {/* دسکتاپ */}
      <nav
        aria-label="Main navigation"
        className="relative mx-auto hidden max-w-7xl items-center justify-between px-8 pb-6 pt-10 md:flex"
      >
        <div className="flex flex-1 items-center gap-10">
          {left.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(item.href) ? "page" : undefined}
              className={linkClass(item.href)}
            >
              {item.label}
            </Link>
          ))}
        </div>

        <Link
          href="/"
          aria-label={`${site.name} home`}
          onMouseMove={moveLight}
          className="absolute left-1/2 top-8 -translate-x-1/2"
        >
          <span className="metallic-logo block text-[18px] font-bold uppercase tracking-[0.24em]">
            {site.name}
          </span>
        </Link>

        <div className="flex flex-1 items-center justify-end gap-10">
          {right.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(item.href) ? "page" : undefined}
              className={linkClass(item.href)}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </nav>

      {/* موبایل: نوار بالا */}
      <div className="flex items-center justify-between px-7 py-5 md:hidden">
        <Link
          href="/"
          onClick={() => setOpen(false)}
          className="relative z-[80] text-sm font-semibold tracking-[0.16em] text-white"
        >
          {site.name.toUpperCase()}
          <span className="text-gold">.</span>
        </Link>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-navigation"
          className="relative z-[80] flex h-11 w-11 items-center justify-center text-white"
        >
          <span className="relative block h-5 w-6">
            <span
              className={`absolute left-0 top-1/2 h-px w-6 bg-current transition-transform duration-300 ${
                open ? "rotate-45" : "-translate-y-[4px]"
              }`}
            />
            <span
              className={`absolute left-0 top-1/2 h-px w-6 bg-current transition-transform duration-300 ${
                open ? "-rotate-45" : "translate-y-[4px]"
              }`}
            />
          </span>
        </button>
      </div>

      {/* موبایل: منوی تمام‌صفحه */}
      <div
        id="mobile-navigation"
        aria-hidden={!open}
        className={`fixed inset-0 z-[60] flex flex-col bg-deep px-7 pb-8 pt-28 transition-[opacity,visibility] duration-500 md:hidden ${
          open ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <nav aria-label="Mobile navigation" className="flex flex-col">
          {nav.map((item, index) => (
            <Link
              key={item.href}
              href={item.href}
              tabIndex={open ? 0 : -1}
              onClick={() => setOpen(false)}
              aria-current={isActive(item.href) ? "page" : undefined}
              className={`flex items-center gap-4 border-b border-white/10 py-4 transition-colors ${
                isActive(item.href)
                  ? "text-gold"
                  : "text-white/85 hover:text-gold"
              }`}
            >
              <span className="w-5 text-[10px] tracking-wider text-white/30">
                0{index + 1}
              </span>
              <span className="text-3xl font-light tracking-wide">
                {item.label}
              </span>
            </Link>
          ))}
        </nav>

        <div className="mt-auto border-t border-white/10 pt-5">
          <p className="text-[10px] tracking-[0.22em] text-white/40">
            {site.name.toUpperCase()}
          </p>
          <p className="mt-2 text-xs text-white/55">{site.tagline}</p>
        </div>
      </div>
    </header>
  );
}