"use client";

import { useState } from "react";
import { Sidebar } from "@/components/sidebar";
import { Navigation, Section } from "@/components/navigation";
import { AboutSection } from "@/components/sections/about";
import { ResumeSection } from "@/components/sections/resume";
import { PortfolioSection } from "@/components/sections/portfolio";
import { ContactSection } from "@/components/sections/contact";
import { motion, AnimatePresence } from "framer-motion";

export default function Home() {
  const [activeSection, setActiveSection] = useState<Section>("about");

  const handleSectionChange = (section: Section) => {
    setActiveSection(section);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const renderSection = () => {
    switch (activeSection) {
      case "about":
        return <AboutSection />;
      case "resume":
        return <ResumeSection />;
      case "portfolio":
        return <PortfolioSection />;
      case "contact":
        return <ContactSection />;
      default:
        return <AboutSection />;
    }
  };

  return (
    <main className="my-[15px] mx-3 mb-[75px] min-w-[259px] sm:mt-[60px] sm:mb-[100px] xl:max-w-[1200px] xl:mx-auto xl:my-[60px] xl:mb-[60px] xl:flex xl:justify-center xl:items-stretch xl:gap-[25px]">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="main-content relative w-full mx-auto xl:min-w-[75%] xl:w-[75%] xl:m-0 mt-[15px] sm:mt-[30px] xl:mt-0 overflow-x-hidden sm:overflow-x-visible">
        <article className="sidebar min-h-full active" data-page={activeSection}>
          {/* Navigation - Top Right on Desktop, Bottom on Mobile */}
          <Navigation
            activeSection={activeSection}
            onSectionChange={handleSectionChange}
          />

          {/* Content with Fade Animation */}
          <div className="p-4 sm:p-[30px] xl:p-[40px] pb-[75px] xl:pb-[40px] overflow-x-hidden sm:overflow-x-visible">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSection}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                {renderSection()}
              </motion.div>
            </AnimatePresence>
          </div>
        </article>
      </div>
    </main>
  );
}
