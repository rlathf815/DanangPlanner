import * as React from "react";
import { cn } from "@/lib/utils";

export const Input = React.forwardRef(function Input(
  { className, type = "text", ...props },
  ref
) {
  return (
    <input
      ref={ref}
      type={type}
      className={cn(
        "flex h-12 w-full rounded-xl border border-[#EEC8A9] bg-white px-3 py-2 text-[15px] text-slate-800",
        "placeholder:text-slate-400",
        "focus:outline-none focus:ring-2 focus:ring-[#DA251D]/50",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    />
  );
});
