"use client";

import { useEffect, useRef, useState } from "react";

const STATS = [
  { target: 1, suffix: "M+", label: "Registered Players", parse: (v: number) => `${v}` },
  { target: 4, suffix: "%", label: "Multiplayer hits", isPercentSpecial: true },
  { target: 2, suffix: "M+", label: "Chat groups formed" },
  { target: 4.8, suffix: "", label: "App Store rating", isRating: true },
];

function useCountUp(target: number, active: boolean, duration = 1800) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!active) return;
    let raf: number;
    const start = performance.now();

    function update(now: number) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(eased * target);
      if (progress < 1) {
        raf = requestAnimationFrame(update);
      } else {
        setValue(target);
      }
    }

    raf = requestAnimationFrame(update);
    return () => cancelAnimationFrame(raf);
  }, [active, target, duration]);

  return value;
}

function StatValue({
  target,
  suffix,
  active,
  isRating,
}: {
  target: number;
  suffix: string;
  active: boolean;
  isRating?: boolean;
}) {
  const value = useCountUp(target, active);
  const display = isRating ? value.toFixed(1) : Math.round(value);
  return (
    <span className="font-bold text-[clamp(44px,7vw,74px)] leading-none">
      {isRating ? `${display}/5` : `${display}${suffix}`}
    </span>
  );
}

export function StatsSection() {
  const [active, setActive] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(true);
            entry.target.classList.add("is-inview");
            observer.disconnect();
          }
        });
      },
      { threshold: 0.2, rootMargin: "0px 0px -8% 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="stats"
      ref={ref}
      // Added relative, block, w-full, and z-10 to separate it from the footer
      className="relative block w-full bg-background py-10 z-10 scroll-reveal-target"
    >
      <div className="w-full">
        <div className="bg-[#0a0a0a] text-white rounded-[28px] border border-white/10 px-7 sm:px-12 py-12 sm:py-16 w-full relative overflow-hidden shadow-2xl">
          <p className="text-white/65 text-xs sm:text-sm font-semibold tracking-widest uppercase mb-4">
            Our Community
          </p>
          <h2 className="font-bold text-white leading-[1.05] text-[clamp(32px,5vw,64px)] max-w-4xl mb-12">
            Millions of players. Endless ways to connect.
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-10 gap-x-8 relative z-10">
            {STATS.map((stat) => (
              <div className="flex flex-col gap-2" key={stat.label}>
                <StatValue
                  target={stat.target}
                  suffix={stat.suffix}
                  active={active}
                  isRating={stat.isRating}
                />
                <span className="text-white/65 text-sm md:text-base font-medium">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}