"use client";

import Dock from "./ui/dock";
import { User, FileText, Briefcase, Mail } from "lucide-react";

export type Section = "about" | "resume" | "portfolio" | "contact";

interface NavigationProps {
  activeSection: Section;
  onSectionChange: (section: Section) => void;
}

export function Navigation({ activeSection, onSectionChange }: NavigationProps) {
  const dockItems = [
    {
      icon: User,
      label: "About",
      onClick: () => onSectionChange("about"),
      tooltip: "Deep Dive",
    },
    {
      icon: FileText,
      label: "Resume",
      onClick: () => onSectionChange("resume"),
      tooltip: "The Receipts",
    },
    {
      icon: Briefcase,
      label: "Portfolio",
      onClick: () => onSectionChange("portfolio"),
      tooltip: "Show & Tell",
    },
    {
      icon: Mail,
      label: "Contact",
      onClick: () => onSectionChange("contact"),
      tooltip: "Let's Talk",
    },
  ];

  return (
    <nav className="fixed bottom-4 left-0 right-0 z-50 pointer-events-none xl:absolute xl:top-0 xl:right-0 xl:left-auto xl:bottom-auto">
      <div className="pointer-events-auto">
        <Dock items={dockItems} activeLabel={activeSection.charAt(0).toUpperCase() + activeSection.slice(1)} className="py-0 xl:py-0" />
      </div>
    </nav>
  );
}
