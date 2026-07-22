import { ScrollReveal } from "./ScrollReveal";
import { ArrowUpRight } from "./icons";

const CATEGORIES = [
  { number: "01", title: "Action & Arcade", detail: "Fast-paced / Combat / 3D" },
  { number: "02", title: "Party Card Games", detail: "Uno / Poker / Hearts" },
  { number: "03", title: "Strategy", detail: "Chess / Trivia / Board" },
  {
    number: "04",
    title: "Casual Sports",
    detail: "Mini Golf / Bowling / Darts",
  },
];

export function CategoryList() {
  return (
    <ScrollReveal id="services" className="bg-background py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col">
          {CATEGORIES.map((category, i) => (
            <div
              key={category.number}
              className={`group border-t border-foreground/10 flex items-center justify-between px-6 py-8 cursor-pointer transition-colors duration-300 hover:bg-primary ${
                i === CATEGORIES.length - 1 ? "border-b border-b-foreground/10" : ""
              }`}
            >
              <div className="flex items-center gap-8">
                <span className="text-muted text-sm font-medium group-hover:text-black transition-colors duration-300">
                  {category.number}
                </span>
                <h3 className="text-foreground text-3xl font-bold group-hover:text-black transition-colors duration-300">
                  {category.title}
                </h3>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-muted text-sm group-hover:text-black transition-colors duration-300">
                  {category.detail}
                </span>
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-black text-white transition-transform duration-300 group-hover:scale-105">
                  <ArrowUpRight size={16} />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </ScrollReveal>
  );
}
