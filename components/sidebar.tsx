"use client";

import { useState } from "react";
import { Mail, Phone, Calendar, MapPin, Download, ChevronDown } from "lucide-react";
import { profileData } from "@/lib/data/profile";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export function Sidebar() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <aside className="relative sidebar xl:sticky xl:top-[60px] max-h-[112px] xl:max-h-max overflow-hidden transition-all" style={{ maxHeight: isExpanded ? '480px' : undefined }}>
      {/* Profile Section - Always Visible */}
      <div className="relative flex items-center justify-between gap-4 sm:gap-6 pt-5 pb-6 px-4 sm:p-6 xl:px-[30px] xl:pt-[50px] xl:pb-0 xl:flex-col xl:items-center xl:text-center">
        <div className="flex-1 xl:w-full xl:mb-2">
          <h1 className="text-[22px] sm:text-[26px] font-medium tracking-tight mb-2 xl:mb-4 xl:whitespace-nowrap">{profileData.name}</h1>
          <div className="inline-block bg-[#1a1a1b] text-[#e4e4e7] text-[11px] sm:text-xs font-light px-3 sm:px-[18px] py-1 sm:py-[5px] rounded-lg border border-[#3a3a3b] xl:mx-auto">
            {profileData.title}
          </div>
        </div>

        {/* Show Contacts Button - Mobile Only */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="xl:hidden flex-shrink-0 flex items-center gap-2 px-[15px] sm:px-[18px] py-[12px] sm:py-[14px] text-[13px] sm:text-sm text-primary rounded-tl-none rounded-br-none rounded-tr-[15px] rounded-bl-[15px] gradient-border shadow-[var(--shadow-2)] transition-all hover:bg-white/5"
          style={{
            background: "rgba(255, 255, 255, 0.03)",
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
          }}
        >
          <span className="hidden sm:inline">{isExpanded ? "Hide" : "Show"} Contacts</span>
          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <ChevronDown className="w-5 h-5" />
          </motion.div>
        </button>
      </div>

      {/* Contact Info - Collapsible on Mobile, Always Visible on Desktop */}
      <motion.div
        initial={false}
        animate={{
          opacity: isExpanded ? 1 : 0,
          visibility: isExpanded ? "visible" : "hidden"
        }}
        className="xl:!opacity-100 xl:!visible transition-all"
      >
        <div className="px-4 sm:px-[30px] pb-[30px]">
          {/* Separator */}
          <div className="w-full h-[1px] bg-border my-4 sm:my-8"></div>

          {/* Contact List */}
          <ul className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-1 gap-4 sm:gap-5 xl:gap-4">
            {/* Email */}
            <li className="flex items-center gap-4">
              <div className="icon-box flex-shrink-0">
                <Mail className="w-[18px] h-[18px]" strokeWidth={2.5} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[11px] sm:text-xs text-muted-foreground uppercase mb-[2px]">Email</p>
                <a
                  href={`mailto:${profileData.email}`}
                  className="text-[13px] sm:text-sm hover:text-primary transition-colors break-all"
                >
                  {profileData.email}
                </a>
              </div>
            </li>

            {/* Phone */}
            <li className="flex items-center gap-4">
              <div className="icon-box flex-shrink-0">
                <Phone className="w-[18px] h-[18px]" strokeWidth={2.5} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[11px] sm:text-xs text-muted-foreground uppercase mb-[2px]">Phone</p>
                <a
                  href={`tel:${profileData.phone}`}
                  className="text-[13px] sm:text-sm hover:text-primary transition-colors"
                >
                  {profileData.phone}
                </a>
              </div>
            </li>

            {/* Birthday */}
            <li className="flex items-center gap-4">
              <div className="icon-box flex-shrink-0">
                <Calendar className="w-[18px] h-[18px]" strokeWidth={2.5} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[11px] sm:text-xs text-muted-foreground uppercase mb-[2px]">Birthday</p>
                <time className="text-[13px] sm:text-sm">{profileData.birthday}</time>
              </div>
            </li>

            {/* Location */}
            <li className="flex items-center gap-4">
              <div className="icon-box flex-shrink-0">
                <MapPin className="w-[18px] h-[18px]" strokeWidth={2.5} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[11px] sm:text-xs text-muted-foreground uppercase mb-[2px]">Location</p>
                <address className="text-[13px] sm:text-sm not-italic">{profileData.location}</address>
              </div>
            </li>
          </ul>

          {/* Separator */}
          <div className="w-full h-[1px] bg-border my-4 sm:my-8"></div>

          {/* Download CV Button */}
          <a href="/documents/Brendan Cane CV.pdf" download className="block w-full">
            <Button variant="outline" className="rounded-lg w-full h-12 text-base gap-2">
              <Download className="w-4 h-4" />
              Download CV
            </Button>
          </a>
        </div>
      </motion.div>
    </aside>
  );
}
