// "use client";

// import { useEffect, useRef, useState, type ReactNode } from "react";

// interface RevealProps {
//   children: ReactNode;
//   delay?: number; // میلی‌ثانیه
//   className?: string;
// }

// export default function Reveal({
//   children,
//   delay = 0,
//   className = "",
// }: RevealProps) {
//   const ref = useRef<HTMLDivElement>(null);
//   const [shown, setShown] = useState(false);

//   useEffect(() => {
//     const element = ref.current;
//     if (!element) return;

//     const observer = new IntersectionObserver(
//       ([entry]) => {
//         if (entry.isIntersecting) {
//           setShown(true);
//           observer.disconnect();
//         }
//       },
//       { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
//     );

//     observer.observe(element);
//     return () => observer.disconnect();
//   }, []);

//   return (
//     <div
//       ref={ref}
//       className={`reveal ${shown ? "reveal-in" : ""} ${className}`}
//       style={{ transitionDelay: `${delay}ms` }}
//     >
//       {children}
//     </div>
//   );
// }





// "use client";

// import { useEffect, useRef, useState, type ReactNode } from "react";

// type RevealDirection = "up" | "down" | "left" | "right";

// interface RevealProps {
//   children: ReactNode;
//   delay?: number;
//   className?: string;
//   from?: RevealDirection;
// }

// export default function Reveal({
//   children,
//   delay = 0,
//   className = "",
//   from = "up",
// }: RevealProps) {
//   const ref = useRef<HTMLDivElement>(null);
//   const [shown, setShown] = useState(false);

//   useEffect(() => {
//     const element = ref.current;
//     if (!element) return;

//     const observer = new IntersectionObserver(
//       ([entry]) => {
//         if (entry.isIntersecting) {
//           setShown(true);
//           observer.disconnect();
//         }
//       },
//       { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
//     );

//     observer.observe(element);

//     return () => observer.disconnect();
//   }, []);

//   return (
//     <div
//       ref={ref}
//       data-from={from}
//       className={`reveal ${shown ? "reveal-in" : ""} ${className}`}
//       style={{ transitionDelay: `${delay}ms` }}
//     >
//       {children}
//     </div>
//   );
// }




"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  delay?: number;
  from?: "up" | "left" | "right";
  className?: string;
}

export default function Reveal({
  children,
  delay = 0,
  from = "up",
  className = "",
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -6% 0px",
      }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal ${
        from === "up" ? "" : `reveal-${from}`
      } ${shown ? "reveal-in" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}
