"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FaqSectionProps {
  items: { q: string; a: string }[];
}

export function FaqSection({ items }: FaqSectionProps) {
  return (
    <div className="content-card gradient-border rounded-[14px] sm:rounded-[20px] px-5 sm:px-8">
      <Accordion type="single" collapsible className="w-full">
        {items.map((item, i) => (
          <AccordionItem
            key={i}
            value={`item-${i}`}
            className={i === items.length - 1 ? "border-b-0" : "border-white/5"}
          >
            <AccordionTrigger className="text-base sm:text-lg font-medium py-5 hover:no-underline">
              {item.q}
            </AccordionTrigger>
            <AccordionContent className="text-sm sm:text-[15px] text-muted-foreground font-light leading-relaxed pb-5 pr-8">
              {item.a}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
