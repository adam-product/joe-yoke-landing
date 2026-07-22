import { ScrollReveal } from "./ScrollReveal";
import { ArrowUpRight } from "./icons";

const FOOTER_COLUMNS = [
  {
    heading: "Company",
    links: [
      { label: "About", href: "#about" },
      { label: "Games", href: "#portfolio" },
      { label: "Services", href: "#services" },
      { label: "Contact", href: "#footer" },
    ],
  },
  {
    heading: "Services",
    links: [
      { label: "Development", href: "#services" },
      { label: "Design", href: "#services" },
      { label: "Quality Assurance", href: "#services" },
      { label: "Consulting", href: "#services" },
    ],
  },
  {
    heading: "Social",
    links: [
      { label: "X / Twitter", href: "#" },
      { label: "Behance", href: "#" },
      { label: "Dribbble", href: "#" },
      { label: "LinkedIn", href: "#" },
    ],
  },
];

export function Footer({ onDownloadClick }: { onDownloadClick: () => void }) {
  return (
    <>
      <ScrollReveal id="footer" className="w-full px-4 pt-6 pb-8">
        <div className="max-w-7xl mx-auto bg-[#0a0a0a] text-white rounded-[28px] border border-white/10 overflow-hidden">
          <div className="px-6 sm:px-10 pt-10 sm:pt-12 pb-8 sm:pb-10">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12">
              <h2 className="font-bold text-white leading-[0.98] text-[clamp(42px,7vw,86px)] max-w-3xl">
                Ready to join <br />
                the fun? Let&apos;s play.
              </h2>
              <button
                type="button"
                onClick={onDownloadClick}
                className="inline-flex items-center justify-between gap-4 bg-white text-black rounded-full px-2 py-2 pl-5 pr-2 text-sm font-semibold w-fit min-w-[180px] hover:bg-white/90 transition-colors"
              >
                <span>Download App</span>
                <span className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-black text-white">
                  <ArrowUpRight size={14} />
                </span>
              </button>
            </div>

            <div className="w-full h-[1px] bg-white/10" />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 py-10">
              <div>
                <p className="font-semibold text-white text-base mb-3">Joe Yoke</p>
                <p className="text-white/65 text-sm leading-relaxed max-w-[28ch]">
                  The ultimate place to play multiplayer games, chat, and hang
                  out with friends — all in one app.
                </p>
              </div>

              {FOOTER_COLUMNS.map((column) => (
                <div key={column.heading}>
                  <p className="text-white/45 text-xs uppercase tracking-widest mb-4 font-semibold">
                    {column.heading}
                  </p>
                  <ul className="space-y-2.5">
                    {column.links.map((link) => (
                      <li key={link.label}>
                        <a
                          href={link.href}
                          className="text-white/75 hover:text-white transition-colors text-sm"
                        >
                          {link.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="w-full h-[1px] bg-white/10" />

            <div className="pt-6 flex items-center text-white/55 text-xs">
              <p>© 2026 Joe Yoke. All rights reserved.</p>
            </div>
          </div>

          <div className="w-full overflow-hidden select-none pointer-events-none border-t border-white/5">
            <p
              className="text-white/[0.05] font-bold leading-none whitespace-nowrap tracking-[-0.04em] px-2 -mb-[0.14em]"
              style={{ fontSize: "clamp(72px, 16vw, 220px)" }}
            >
              JOE YOKE
            </p>
          </div>
        </div>
      </ScrollReveal>
      <div className="bottom-progressive-blur" aria-hidden="true" />
    </>
  );
}
