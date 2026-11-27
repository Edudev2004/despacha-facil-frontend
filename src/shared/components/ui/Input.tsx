import React from "react";
import { cn } from "@/shared/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, hint, id, ...props }, ref) => {
    const inputId = id || props.name;

    return (
      <div className="w-full text-left">
        {label && (
          <label
            htmlFor={inputId}
            className="block font-mono text-xs font-bold text-ink uppercase tracking-wider mb-1.5"
          >
            {"// " + label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={cn(
            "w-full px-4 py-3 rounded-[10px] border-2 border-ink bg-white font-body text-ink text-sm placeholder:text-ink/40 focus:outline-none focus:shadow-hard transition-shadow disabled:bg-paper disabled:opacity-60 disabled:cursor-not-allowed",
            error && "border-brand-coral focus:shadow-[4px_4px_0px_0px_#F56917]",
            className
          )}
          {...props}
        />
        {error && (
          <span className="block font-mono text-[11px] font-bold text-brand-coral mt-1.5">
            {error}
          </span>
        )}
        {!error && hint && (
          <span className="block font-mono text-[11px] text-ink/60 mt-1.5">
            {hint}
          </span>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
