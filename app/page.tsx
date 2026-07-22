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
import { SmoothScroll } from "@/components/SmoothScroll";

export default function Home() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-x-hidden">
      <SmoothScroll />
      <Loader />
      <Header onStartProject={() => setModalOpen(true)} />
      <RequestModal open={modalOpen} onClose={() => setModalOpen(false)} />
      
      {/* 
        UPDATED: Added flex column layout with strict gaps and padding.
        - 'pt-32' ensures the Hero isn't hidden behind your fixed Header.
        - 'flex flex-col gap-24' forces every section to stack properly with breathing room.
      */}
      <main className="relative flex flex-col gap-24 md:gap-32 pt-32 pb-16 px-6 md:px-12 max-w-7xl mx-auto overflow-hidden">
        <Hero />
        <About />
        <PillBand />
        <GamesGrid />
        <CategoryList />
        <StatsSection />
      </main>
      
      <Footer onDownloadClick={() => setModalOpen(true)} />
    </div>
  );
}