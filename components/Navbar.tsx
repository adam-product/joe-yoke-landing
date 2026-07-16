import Link from "next/link";
import Image from "next/image";
import { ThemeToggle } from "./ThemeToggle";

export const Navbar = () => {
  return (
    <nav className="fixed top-0 w-full z-50 bg-white/80 dark:bg-background/80 backdrop-blur-md border-b border-black/10 dark:border-white/10">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 transition-transform hover:scale-105">
          <Image 
            src="/logo-nav.jpg" 
            alt="Joe Yoke Logo" 
            width={40} 
            height={40} 
            className="rounded-xl"
          />
          <span className="font-heading text-xl font-bold text-neutral-900 dark:text-white tracking-wide">
            Joe Yoke
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <Link href="#games" className="text-sm font-semibold text-neutral-600 dark:text-neutral-300 hover:text-primary transition-colors">
            Games
          </Link>
          <Link href="#community" className="text-sm font-semibold text-neutral-600 dark:text-neutral-300 hover:text-tertiary transition-colors">
            Community
          </Link>
          <Link 
            href="#download" 
            className="text-sm font-bold bg-primary text-background px-5 py-2 rounded-full hover:bg-primary/90 transition-all dark:shadow-[0_0_15px_rgba(204,255,0,0.4)] dark:hover:shadow-[0_0_25px_rgba(204,255,0,0.6)]"
          >
            Download App
          </Link>
          <div className="w-px h-6 bg-black/20 dark:bg-white/20"></div>
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
};