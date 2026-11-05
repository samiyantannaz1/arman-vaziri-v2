interface ProcessCardProps {
  number: string;
  title: string;
  description: string;
}

export default function ProcessCard({
  number,
  title,
  description,
}: ProcessCardProps) {
  return (
    // حداکثر 295.2 × 295.2، همیشه مربع. اگر جا کم باشد کوچک می‌شود ولی روی کارت کناری نمی‌افتد.
    <article className="group aspect-square w-full max-w-[295.2px] justify-self-center">
      <div className="flex h-full flex-col justify-between overflow-hidden border border-white/[0.08] bg-white/[0.025] p-6 transition-colors duration-500 hover:border-gold/40 md:p-7">
        <div className="flex items-start justify-between">
          <h3 className="text-[1.2rem] font-light text-white/90 transition-transform duration-500 group-hover:translate-x-1 md:text-[1.5rem]">
            {title}
          </h3>
          <span className="text-[1.3rem] font-extralight italic leading-none tracking-[-0.08em] text-gold/35 transition-all duration-500 group-hover:-translate-y-0.5 group-hover:text-gold/60 md:text-[1.8rem]">
            {number}
          </span>
        </div>

        <p className="text-[13px] leading-[1.7] tracking-[0.02em] text-white/45 md:text-[14px]">
          {description}
        </p>
      </div>
    </article>
  );
}