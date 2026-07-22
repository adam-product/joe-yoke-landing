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
            observer.disconnect();
          }
        });
      },
      { threshold: 0.35 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="stats"
      ref={ref}
      className="bg-background w-full py-10 px-4 scroll-reveal-target"
    >
      <div className="max-w-7xl mx-auto">
        <div className="bg-[#0a0a0a] text-white rounded-[28px] border border-white/10 px-7 sm:px-10 py-10 sm:py-12">
          <p className="text-white/65 text-xs sm:text-sm font-medium tracking-widest uppercase mb-3">
            Our Community
          </p>
          <h2 className="font-bold text-white leading-[1.05] text-[clamp(30px,5vw,56px)] max-w-3xl mb-10">
            Millions of players. Endless ways to connect.
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-8 gap-x-6">
            {STATS.map((stat) => (
              <div className="flex flex-col gap-2" key={stat.label}>
                <StatValue
                  target={stat.target}
                  suffix={stat.suffix}
                  active={active}
                  isRating={stat.isRating}
                />
                <span className="text-white/65 text-sm">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
