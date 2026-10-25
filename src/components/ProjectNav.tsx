import Link from "next/link";

interface NavItem {
  slug: string;
  title: string;
}

function NavLink({
  item,
  direction,
}: {
  item: NavItem | null;
  direction: "prev" | "next";
}) {
  const isNext = direction === "next";

  if (!item) return <div />;

  return (
    <Link
      href={`/projects/${item.slug}`}
      className={`group flex flex-col gap-2 py-8 transition-colors ${
        isNext ? "items-end text-right" : "items-start"
      }`}
    >
      <span className="text-[10px] tracking-[0.3em] text-white/40 transition-colors group-hover:text-gold">
        {isNext ? "NEXT PROJECT →" : "← PREVIOUS PROJECT"}
      </span>
      <span className="text-lg font-light text-white/80 transition-colors group-hover:text-gold md:text-2xl">
        {item.title}
      </span>
    </Link>
  );
}

export default function ProjectNav({
  prev,
  next,
}: {
  prev: NavItem | null;
  next: NavItem | null;
}) {
  return (
    <nav
      aria-label="Project navigation"
      className="bg-deep px-6 pb-24 text-white md:px-10 lg:px-16"
    >
      <div className="mx-auto max-w-[1050px]">
        <div className="grid grid-cols-2 gap-6 border-y border-white/10">
          <NavLink item={prev} direction="prev" />
          <NavLink item={next} direction="next" />
        </div>

        <Link
          href="/projects"
          className="mt-10 block text-center text-xs tracking-[0.3em] text-white/50 transition-colors hover:text-gold"
        >
          BACK TO ALL PROJECTS ↗
        </Link>
      </div>
    </nav>
  );
}