import { ScrollReveal } from "./ScrollReveal";

const pillClass =
  "inline-flex items-center justify-center px-6 sm:px-8 py-2.5 sm:py-3 rounded-full border border-foreground/20 text-foreground font-medium text-xl sm:text-2xl lg:text-3xl tracking-tight";

export function PillBand() {
  return (
    <ScrollReveal id="pill-band" className="bg-background pt-4 pb-16 sm:pb-24 w-full">
      <div className="flex flex-row items-center justify-center gap-3 sm:gap-4 flex-wrap px-4">
        <span className={pillClass}>Play</span>
        <span className={pillClass}>With</span>
        <span className="inline-flex items-center justify-center px-6 sm:px-8 py-2.5 sm:py-3 rounded-full bg-primary text-background font-medium text-xl sm:text-2xl lg:text-3xl tracking-tight">
          →
        </span>
        <span className={pillClass}>Friends</span>
      </div>
    </ScrollReveal>
  );
}
