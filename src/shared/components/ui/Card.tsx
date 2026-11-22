import React from "react";
import { cn } from "@/shared/lib/utils";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverEffect?: boolean;
}

export function Card({
  className,
  hoverEffect = false,
  children,
  ...props
}: CardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6 backdrop-blur-sm",
        hoverEffect &&
          "transition-all duration-300 hover:border-zinc-700 hover:bg-zinc-900/90 hover:shadow-xl hover:shadow-emerald-950/20",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
