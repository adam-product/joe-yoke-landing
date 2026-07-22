"use client";

import { useEffect, useRef, type ReactNode } from "react";

export function ScrollReveal({
  as: Tag = "section",
  id,
  className = "",
  delay = 0,
  children,
}: {
  as?: "section" | "div";
  id?: string;
  className?: string;
  delay?: number;
  children: ReactNode;
}) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-inview");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.18, rootMargin: "0px 0px -8% 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref as never}
      id={id}
      className={`scroll-reveal-target ${className}`}
      style={{ ["--reveal-delay" as string]: `${Math.min(delay * 45, 220)}ms` }}
    >
      {children}
    </Tag>
  );
}
