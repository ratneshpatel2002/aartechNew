import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TailoredSolutionsMatrix from './components/TailoredSolutionsMatrix';
import GlobalPresence from './components/GlobalPresence';
import LivingPassions from './components/LivingPassions';
import Testimonials from './components/Testimonials';
import ManufacturingSection from './components/ManufacturingSection';
import EngineeringPassionCTA from './components/EngineeringPassionCTA';
import Footer from './components/Footer';
import FloatingWidgets from './components/FloatingWidgets';
import InquiryModal from './components/InquiryModal';

export default function App() {
  const [isInquiryOpen, setIsInquiryOpen] = useState(false);

  const handleOpenInquiry = () => {
    setIsInquiryOpen(true);
  };

  const handleCloseInquiry = () => {
    setIsInquiryOpen(false);
  };

  const scrollToAbout = () => {
    const el = document.getElementById('about') || document.getElementById('welcome');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToHistory = () => {
    const el = document.getElementById('about') || document.getElementById('hero');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
      {/* Corporate Header with Live Ticker */}
      <Navbar 
        onOpenInquiry={handleOpenInquiry}
        onOpenAbout={scrollToAbout}
        onOpenHistory={scrollToHistory}
      />

      {/* Main Page Flow */}
      <main className="flex-grow">
        {/* 1. Hero with Sliding Images in Background + Living Passion Through Engineering */}
        <Hero 
          onOpenAbout={scrollToAbout}
          onOpenHistory={scrollToHistory}
        />

        {/* 2. Tailored To Your Needs - Empowering Possibilities, Engineering Solutions (Design from assetimg3.png) */}
        <TailoredSolutionsMatrix onOpenInquiry={handleOpenInquiry} />

        {/* 3. Our Global Presence (Aartech International Footprint & Hubs) */}
        <GlobalPresence onOpenInquiry={handleOpenInquiry} />

        {/* 4. Living Passions Through Engineering (Design from assetabout.png) */}
        <LivingPassions onOpenInquiry={handleOpenInquiry} />

        {/* 5. Client Testimonials - Trust, in our customers' words (Design from assettest.png) */}
        <Testimonials />

        {/* 6. Manufacturing Hubs & Infrastructure + Commissioning & R&D (Aartech Solonics) */}
        <ManufacturingSection onOpenInquiry={handleOpenInquiry} />

        {/* 7. Engineering Passion CTA (from assetlast.png) */}
        <EngineeringPassionCTA onOpenInquiry={handleOpenInquiry} />
      </main>

      {/* RIL-Style Multi-Column Corporate Footer */}
      <Footer onOpenInquiry={handleOpenInquiry} />

      {/* Floating Action Widgets (WhatsApp & Scroll Top) */}
      <FloatingWidgets />

      {/* Engineering Consultation Modal */}
      <InquiryModal isOpen={isInquiryOpen} onClose={handleCloseInquiry} />
    </div>
  );
}
