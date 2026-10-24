interface PlaceholderProps {
  label?: string;
  ratio?: string;
  className?: string;
}

// جای خالی برای عکسی که هنوز نرسیده
export default function Placeholder({
  label = "Image",
  ratio = "4 / 3",
  className = "",
}: PlaceholderProps) {
  return (
    <div
      className={`flex w-full items-center justify-center bg-white/[0.06] text-[10px] uppercase tracking-[0.25em] text-white/30 ${className}`}
      style={{ aspectRatio: ratio }}
    >
      {label}
    </div>
  );
}