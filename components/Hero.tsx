import Image from "next/image";
import { ArrowRight } from "./icons";

const HEADLINE = [
  { text: "The games", accent: false },
  { text: "bring you in, but", accent: false },
  { text: "the friendships", accent: true },
  { text: "keep you here.", accent: false },
];

export function Hero() {
  return (
    <section
      id="hero"
      className="relative w-full flex flex-col justify-center overflow-hidden py-8 md:py-16"
    >
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0">
        <span
          className="text-foreground/[0.03] font-bold leading-none whitespace-nowrap"
          style={{ fontSize: "clamp(80px, 18vw, 220px)", letterSpacing: "-0.04em" }}
        >
          Joe Yoke
        </span>
      </div>

      <div className="hero-floating-icons pointer-events-none" aria-hidden="true">
        <Image
          src="https://c.animaapp.com/mrunjrpflmlC0l/img/uploaded-asset-1784664263909-0.png"
          alt=""
          width={430}
          height={430}
          className="hero-icon hero-icon-float"
        />
      </div>

      <div className="relative z-10 w-full flex flex-col gap-8">
        <div className="hero-headline flex flex-col gap-1">
          {HEADLINE.map((line) => (
            <div className="hero-headline-line" key={line.text}>
              <h1
                className={`hero-headline-text font-extrabold ${
                  line.accent ? "text-primary" : "text-foreground"
                }`}
                style={{ fontSize: "clamp(36px, 7.5vw, 92px)" }}
              >
                {line.text}
              </h1>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-4 mt-2">
          <a href="#portfolio" className="engage-card">
            <div className="engage-card-copy">
              <span className="engage-card-title">Play Games</span>
            </div>
            <span className="engage-card-arrow" aria-hidden="true">
              <ArrowRight size={16} />
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}