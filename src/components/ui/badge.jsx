import * as React from "react";
import { cn } from "@/lib/utils";

export function Badge({ className, variant = "default", ...props }) {
  const base = "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold";
  const styles =
    variant === "outline"
      ? "border border-[#F2D9C4] text-[#7A1B16] bg-[#FFDD00]/20"
      : "bg-[#DA251D] text-white";
  return <span className={cn(base, styles, className)} {...props} />;
}
