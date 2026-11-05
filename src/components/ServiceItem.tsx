import Image from "next/image";
import Placeholder from "./Placeholder";
import Reveal from "./Reveal";

interface ServiceItemProps {
  number: string;
  title: string;
  description: string;
  image: string | null;
  flip?: boolean;
}

export default function ServiceItem({
  number,
  title,
  description,
  image,
  flip = false,
}: ServiceItemProps) {
  // قسمت‌های فرد (۰۱، ۰۳، ۰۵): خط مورب دارند
  const hasDiagonal = !flip;

  return (
    // --drop = مقدار پایین‌آمدن عکس (فقط در چیدمان دوستونه، از 1024 به بالا، زیاد می‌شود)
    <Reveal className="pb-4 [--drop:1rem] lg:pb-10 lg:[--drop:2.5rem]">
      {/* --pad = فاصله کناری کارت. خط مورب از لبه چپ بردر شروع می‌شود، پس به این عدد نیاز دارد */}
      <article className="group relative mx-auto max-w-[680px] px-5 [--pad:1.25rem] md:px-8 md:[--pad:2rem] lg:max-w-none">
        {/* بردر: پشت همه‌چیز (z-0) */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-[calc(var(--drop)*0.6)] top-[2%] z-0 border border-white/15 transition-colors duration-500 group-hover:border-gold/60"
        />

        <div className="relative z-10 grid items-center gap-7 lg:grid-cols-2 lg:gap-10">
          {/* قاب عکس: بالاتر از بردر (z-20)، پایین‌تر از جای خودش، در دسکتاپ چسبیده به پایین ردیف */}
          <div
            className={`relative z-20 translate-y-[var(--drop)] lg:self-end ${
              flip ? "lg:order-2" : ""
            }`}
          >
            {/* خود عکس: پس‌زمینه تمام‌مات تا بردر زیرش پیدا نباشد */}
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-bg">
              {image ? (
                <Image
                  src={image}
                  alt={title}
                  fill
                  sizes="(max-width: 1024px) 680px, 50vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                />
              ) : (
                <Placeholder label={title} className="h-full" />
              )}
            </div>

            {/* خط مورب: وصل به عکس. از لبه چپ بردر شروع می‌شود و روی عکس می‌آید.
                طول = (فاصله بردر + 18٪ عرض عکس) × 1.4142 تا زاویه 45 درجه درست بماند. */}
            {hasDiagonal && (
              <div
                aria-hidden="true"
                className="pointer-events-none absolute left-[calc(var(--pad)*-1)] top-[23%] z-30 h-px w-[calc((var(--pad)_+_18%)_*_1.4142)] origin-left -rotate-45 bg-gold/80"
              />
            )}
          </div>

          <div className="flex flex-col justify-center py-3 md:py-5">
            <span className="mb-4 text-xs tracking-[0.3em] text-white/45 transition-colors duration-500 group-hover:text-gold">
              {number}
            </span>
            <h2 className="mb-4 text-xl font-light tracking-[0.08em] text-white transition-colors duration-500 group-hover:text-gold md:text-2xl">
              {title}
            </h2>
            <p className="max-w-xl text-sm leading-7 text-white/65 transition-colors duration-500 group-hover:text-white/85 md:leading-8">
              {description}
            </p>
          </div>
        </div>
      </article>
    </Reveal>
  );
}