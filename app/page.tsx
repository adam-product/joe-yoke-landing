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
      <main>
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
