import type { ElementType, ReactNode } from "react";

const sizes = {
  narrow: "max-w-6xl",
  default: "max-w-[1400px]",
  wide: "max-w-[1600px]",
} as const;

interface ContainerProps {
  children: ReactNode;
  size?: keyof typeof sizes;
  as?: ElementType;
  className?: string;
}

// فاصله کناری و عرض بیشینه محتوا فقط از همین‌جا کنترل می‌شود.
export default function Container({
  children,
  size = "default",
  as: Tag = "div",
  className = "",
}: ContainerProps) {
  return (
    <Tag
      className={`mx-auto w-full px-6 sm:px-10 lg:px-16 ${sizes[size]} ${className}`}
    >
      {children}
    </Tag>
  );
}