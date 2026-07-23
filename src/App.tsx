import React, { useState } from 'react';
import { Sun, Moon, Gamepad2, Download, Users } from 'lucide-react';
import heroImage from './imports/hero.png';
import logoNav from './imports/logo-nav.jpg';

export default function App() {
  const [isLightMode, setIsLightMode] = useState(false);

  return (
    <div
      className={`min-h-screen ${
        isLightMode ? 'bg-slate-50 text-slate-900' : 'bg-black text-white'
      } transition-colors duration-300 font-sans selection:bg-[#ccff00] selection:text-black`}
    >
      {/* Navigation Header */}
      <header className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
        {/* Brand Logo */}
        <div className="flex items-center gap-3">
          <img
            src={logoNav}
            alt="Joe Yoke Logo"
            className="w-8 h-8 rounded-full object-cover border border-white/20"
            onError={(e) => {
              (e.target as HTMLElement).style.display = 'none';
            }}
          />
          <span className="font-extrabold text-xl tracking-wider uppercase flex items-center gap-2">
            <span className="w-6 h-6 bg-[#ccff00] text-black rounded flex items-center justify-center text-xs font-black">
              Y
            </span>
            JOE YOKE
          </span>
        </div>

        {/* Center Nav Pills */}
        <nav className="hidden md:flex items-center gap-1 bg-white/5 border border-white/10 rounded-full p-1.5 backdrop-blur-md">
          <button className="bg-[#ccff00] text-black font-bold text-xs uppercase px-5 py-2 rounded-full transition-all hover:brightness-110 shadow-lg shadow-[#ccff00]/20">
            Games
          </button>
          <button className="text-gray-400 hover:text-white font-semibold text-xs uppercase px-5 py-2 rounded-full transition-colors">
            Community
          </button>
          <button className="text-gray-400 hover:text-white font-semibold text-xs uppercase px-5 py-2 rounded-full transition-colors">
            Download App
          </button>
        </nav>

        {/* Light / Dark Mode Switcher */}
        <button
          onClick={() => setIsLightMode(!isLightMode)}
          className="flex items-center gap-2 text-xs font-medium text-gray-400 hover:text-white transition-colors py-2 px-3 rounded-lg hover:bg-white/5"
        >
          {isLightMode ? (
            <>
              <Moon className="w-4 h-4 text-indigo-400" />
              <span>DARK</span>
            </>
          ) : (
            <>
              <Sun className="w-4 h-4 text-amber-400" />
              <span>LIGHT</span>
            </>
          )}
        </button>
      </header>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-6 pt-6 pb-20 md:pt-12 md:pb-32 overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Breathable Headline Text */}
          <div className="lg:col-span-7 z-10 space-y-8">
            <div className="relative">
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[1.12] sm:leading-[1.12] md:leading-[1.12]">
                <span className="block text-white">The games</span>
                <span className="block text-white">bring you in,</span>
                <span className="block text-white">
                  but <span className="text-[#ccff00]">the</span>
                </span>
                <span className="block text-[#ccff00]">friendships</span>
                <span className="block text-white">keep you</span>
              </h1>

              {/* Reflection Effect for "here" */}
              <div className="relative mt-2">
                <span className="block text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[1.12] text-white">
                  here.
                </span>
                {/* Mirror Gradient Reflection */}
                <span
                  aria-hidden="true"
                  className="block text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[1.12] text-white/20 select-none blur-[2px] transform scale-y-[-0.55] origin-top translate-y-[-12px] pointer-events-none bg-clip-text text-transparent bg-gradient-to-b from-white/30 to-transparent"
                >
                  here.
                </span>
              </div>
            </div>

            <p className="text-gray-400 text-lg md:text-xl max-w-xl font-normal leading-relaxed pt-2">
              Discover multiplayer party games, host rooms, and meet gamers from across the globe in one seamless hub.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button className="bg-[#ccff00] text-black font-extrabold text-sm uppercase px-8 py-4 rounded-full hover:bg-[#b8e600] transition-all transform hover:scale-105 shadow-xl shadow-[#ccff00]/20 flex items-center gap-2">
                <Download className="w-5 h-5" />
                Download App
              </button>
              <button className="bg-white/10 hover:bg-white/20 text-white font-bold text-sm uppercase px-8 py-4 rounded-full transition-all border border-white/10 backdrop-blur-sm flex items-center gap-2">
                <Gamepad2 className="w-5 h-5 text-[#ccff00]" />
                Explore Games
              </button>
            </div>
          </div>

          {/* Right Column: Repositioned Phone Mockup (Shifted Up & Right) */}
          <div className="lg:col-span-5 relative flex justify-center lg:justify-end items-center">
            {/* Background Neon Glow */}
            <div className="absolute w-72 h-72 sm:w-96 sm:h-96 bg-[#ccff00]/15 rounded-full blur-3xl -z-10 pointer-events-none top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />

            {/* Phone Image Container: shifted -translate-y-14 (up) and translate-x-10 (right) */}
            <div className="relative transform -translate-y-8 md:-translate-y-14 translate-x-4 md:translate-x-10 transition-transform duration-500 hover:-translate-y-16">
              <img
                src={heroImage}
                alt="Joe Yoke Mobile App"
                className="w-full max-w-xs sm:max-w-md lg:max-w-md object-contain drop-shadow-[0_30px_40px_rgba(0,0,0,0.85)]"
              />

              {/* Bottom Soft Shadow */}
              <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-4/5 h-10 bg-black/80 blur-xl rounded-full -z-10" />
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}