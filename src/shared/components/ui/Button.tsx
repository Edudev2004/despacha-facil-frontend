import React from "react";
import { cn } from "@/shared/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger" | "whatsapp";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      children,
      variant = "primary",
      size = "md",
      isLoading = false,
      disabled,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center font-body font-bold uppercase tracking-wider transition-all duration-150 rounded-[12px] border-2 border-ink focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed select-none active:translate-x-[2px] active:translate-y-[2px] active:shadow-none whitespace-nowrap";

    const variants = {
      primary:
        "bg-ink text-brand-orange shadow-hard hover:bg-brand-orange hover:text-ink hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-hard-sm",
      secondary:
        "bg-paper text-ink shadow-hard hover:bg-teal hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-hard-sm",
      outline:
        "bg-white text-ink shadow-hard-sm hover:bg-paper",
      ghost:
        "border-transparent bg-transparent text-ink hover:bg-ink/5 shadow-none",
      danger:
        "bg-brand-coral text-white shadow-hard hover:bg-ink hover:text-brand-coral",
      whatsapp:
        "bg-[#25D366] text-ink shadow-hard hover:bg-[#20ba59]",
    };

    const sizes = {
      sm: "text-xs px-3 py-2 gap-1.5 rounded-[8px]",
      md: "text-sm px-5 py-3 gap-2",
      lg: "text-base px-6 py-4 gap-2.5",
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {isLoading && (
          <svg
            className="animate-spin -ml-1 mr-1.5 h-4 w-4 text-current"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
