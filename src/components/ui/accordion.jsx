"use client";

import * as React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronDownIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export function Accordion(props) {
  return <AccordionPrimitive.Root data-slot="accordion" {...props} />;
}

export function AccordionItem({ className, ...props }) {
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      className={cn("border-b border-[#F2D9C4] last:border-b-0", className)}
      {...props}
    />
  );
}

export function AccordionTrigger({ className, children, ...props }) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn(
          // 👇 테마 색상/테두리/포커스 전부 명시
          "flex w-full items-start justify-between gap-4 rounded-xl px-4 py-3 text-left text-[15px] font-medium transition-all",
          "bg-white border border-[#F2D9C4]",
          "hover:bg-[#FFF1D6]",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DA251D]/50",
          "[&[data-state=open]]:bg-[#FFF1D6]",
          "[&[data-state=open]>svg]:rotate-180",
          "disabled:pointer-events-none disabled:opacity-50",
          className
        )}
        {...props}
      >
        {children}
        <ChevronDownIcon className="pointer-events-none size-4 shrink-0 translate-y-0.5 transition-transform duration-200 text-[#C83C2B]" />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}

export function AccordionContent({ className, children, ...props }) {
  return (
    <AccordionPrimitive.Content
      data-slot="accordion-content"
      className="overflow-hidden text-sm data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
      {...props}
    >
      <div className={cn("pt-2 pb-4", className)}>{children}</div>
    </AccordionPrimitive.Content>
  );
}
