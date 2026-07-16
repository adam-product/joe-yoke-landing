import Link from "next/link";
import Image from "next/image";
import { ThemeToggle } from "./ThemeToggle";

export const Navbar = () => {
  return (
    <nav className="fixed top-0 w-full z-50 bg-white/70 dark:bg-[#0B192C]/70 backdrop-blur-xl border-b border-black/5 dark:border-white/10 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 md:px-12 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="overflow-hidden rounded-xl border border-black/10 dark:border-white/10">
            <Image 
              src="/logo-nav.jpg" 
              alt="Joe Yoke Logo" 
              width={40} 
              height={40} 
              className="group-hover:scale-110 transition-transform duration-500"
            />
          </div>
          <span className="font-heading text-2xl font-extrabold tracking-tight">
            Joe Yoke
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="#games" className="font-mono text-sm font-semibold text-neutral-600 dark:text-neutral-400 hover:text-primary transition-colors">
            Games
          </Link>
          <Link href="#community" className="font-mono text-sm font-semibold text-neutral-600 dark:text-neutral-400 hover:text-tertiary transition-colors">
            Community
          </Link>
          <Link 
            href="#download" 
            className="font-mono text-sm font-bold bg-primary text-[#0B192C] px-6 py-2.5 rounded-full hover:bg-primary/90 transition-all shadow-[0_0_15px_rgba(204,255,0,0.3)] hover:scale-105"
          >
            Download App
          </Link>
          <div className="w-px h-6 bg-black/10 dark:bg-white/10"></div>
          <ThemeToggle />
        </div>
        
        {/* Mobile Nav Toggle */}
        <div className="md:hidden flex items-center gap-4">
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
};