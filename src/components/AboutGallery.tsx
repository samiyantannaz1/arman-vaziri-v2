import Image from "next/image";
import type { Img } from "@/lib/projects";
import Floating from "./Floating";
import Placeholder from "./Placeholder";

// گالری عکس‌های عمودی: کج وارد می‌شوند و صاف می‌شوند، ستون‌های زوج کمی پایین‌ترند
export default function AboutGallery({
  images,
  minimum = 8,
}: {
  images: Img[];
  minimum?: number;
}) {
  const items: (Img | null)[] = [...images];
  while (items.length < minimum) items.push(null);

  return (
    <ul className="grid grid-cols-2 items-start gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
      {items.map((img, i) => (
        <li
          key={img ? `${img.src}-${i}` : `empty-${i}`}
          className={i % 2 === 1 ? "mt-8 sm:mt-0 lg:mt-14" : ""}
        >
          <Floating
            rotate={i % 2 === 0 ? -5 : 5}
            scaleFrom={0.9}
            scaleTo={1}
            lift={30}
          >
            <div
              className="relative w-full overflow-hidden bg-deep"
              style={{
                aspectRatio: img ? `${img.width} / ${img.height}` : "9 / 16",
              }}
            >
              {img ? (
                <Image
                  src={img.src}
                  alt={`Project image ${i + 1}`}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  className="object-cover"
                />
              ) : (
                <Placeholder label="Photo" className="h-full" />
              )}
            </div>
          </Floating>
        </li>
      ))}
    </ul>
  );
}