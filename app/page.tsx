"use client";

import { useState } from "react";
import { Loader } from "@/components/Loader";
import { Header } from "@/components/Header";
import { RequestModal } from "@/components/RequestModal";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { PillBand } from "@/components/PillBand";
import { GamesGrid } from "@/components/GamesGrid";
import { CategoryList } from "@/components/CategoryList";
import { StatsSection } from "@/components/StatsSection";
import { Footer } from "@/components/Footer";
// TEMPORARILY DISABLED: Scroll libraries cause layout collapse if misconfigured.
// import { SmoothScroll } from "@/components/SmoothScroll"; 

export default function Home() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-x-hidden">
      {/* <SmoothScroll /> */}
      <Loader />
      <Header onStartProject={() => setModalOpen(true)} />
      <RequestModal open={modalOpen} onClose={() => setModalOpen(false)} />
      
      {/* 
        By wrapping every component in its own explicit `<div className="relative block w-full">`, 
        we guarantee they stack physically on top of each other, bypassing any internal positioning errors.
      */}
      <main className="relative flex flex-col w-full max-w-7xl mx-auto px-6 md:px-12 pt-32 overflow-hidden">
        <div className="relative block w-full mb-16 md:mb-24"><Hero /></div>
        <div className="relative block w-full mb-16 md:mb-24"><About /></div>
        <div className="relative block w-full mb-16 md:mb-24"><PillBand /></div>
        <div className="relative block w-full mb-16 md:mb-24"><GamesGrid /></div>
        <div className="relative block w-full mb-16 md:mb-24"><CategoryList /></div>
        <div className="relative block w-full mb-16 md:mb-24"><StatsSection /></div>
      </main>
      
      <div className="relative block w-full">
        <Footer onDownloadClick={() => setModalOpen(true)} />
      </div>
    </div>
  );
}