import React from "react";
import { cn } from "@/shared/lib/utils";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverEffect?: boolean;
  variant?: "default" | "paper" | "dark";
}

export function Card({
  className,
  hoverEffect = false,
  variant = "default",
  children,
  ...props
}: CardProps) {
  const variants = {
    default: "bg-white text-ink",
    paper: "bg-paper text-ink",
    dark: "bg-ink text-paper",
  };

  return (
    <div
      className={cn(
        "rounded-[18px] border-2 border-ink p-5 sm:p-6 shadow-hard",
        variants[variant],
        hoverEffect &&
          "transition-all duration-150 hover:-translate-y-0.5 hover:shadow-hard-lg",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
