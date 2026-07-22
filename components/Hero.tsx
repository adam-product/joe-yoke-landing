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
    <section id="hero" className="relative w-full flex flex-col justify-center min-h-[65vh] pt-8 md:pt-12">
      <div className="hero-floating-icons pointer-events-none" aria-hidden="true">
        <Image
          src="https://c.animaapp.com/mrunjrpflmlC0l/img/uploaded-asset-1784664263909-0.png"
          alt=""
          width={430}
          height={430}
          className="hero-icon hero-icon-float"
          priority
        />
      </div>

      <div className="relative z-10 w-full flex flex-col gap-8">
        <div className="hero-headline flex flex-col gap-0 max-w-3xl">
          {HEADLINE.map((line) => (
            <h1
              key={line.text}
              className={`font-extrabold tracking-tight leading-[1.04] ${
                line.accent ? "text-primary" : "text-foreground"
              }`}
              style={{ fontSize: "clamp(34px, 7vw, 88px)" }}
            >
              {line.text}
            </h1>
          ))}
        </div>

        <div className="flex flex-col gap-4 mt-2">
          <a href="#portfolio" className="engage-card">
            <span className="engage-card-title">Play Games</span>
            <span className="engage-card-arrow" aria-hidden="true">
              <ArrowRight size={16} />
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}