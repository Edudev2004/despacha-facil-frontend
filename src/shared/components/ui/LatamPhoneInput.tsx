"use client";

import React, { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/shared/lib/utils";

export interface LatamCountry {
  code: string;
  name: string;
  flag: string;
  dialCode: string;
  digits: number;
  pattern: RegExp;
  example: string;
}

export const LATAM_COUNTRIES: LatamCountry[] = [
  {
    code: "PE",
    name: "Perú",
    flag: "🇵🇪",
    dialCode: "+51",
    digits: 9,
    pattern: /^9\d{8}$/,
    example: "987 654 321",
  },
  {
    code: "CO",
    name: "Colombia",
    flag: "🇨🇴",
    dialCode: "+57",
    digits: 10,
    pattern: /^3\d{9}$/,
    example: "300 123 4567",
  },
  {
    code: "MX",
    name: "México",
    flag: "🇲🇽",
    dialCode: "+52",
    digits: 10,
    pattern: /^\d{10}$/,
    example: "55 1234 5678",
  },
  {
    code: "CL",
    name: "Chile",
    flag: "🇨🇱",
    dialCode: "+56",
    digits: 9,
    pattern: /^9\d{8}$/,
    example: "9 1234 5678",
  },
  {
    code: "EC",
    name: "Ecuador",
    flag: "🇪🇨",
    dialCode: "+593",
    digits: 9,
    pattern: /^9\d{8}$/,
    example: "9 1234 5678",
  },
  {
    code: "BO",
    name: "Bolivia",
    flag: "🇧🇴",
    dialCode: "+591",
    digits: 8,
    pattern: /^[67]\d{7}$/,
    example: "7 123 4567",
  },
  {
    code: "AR",
    name: "Argentina",
    flag: "🇦🇷",
    dialCode: "+54",
    digits: 10,
    pattern: /^\d{10}$/,
    example: "11 1234 5678",
  },
];

interface LatamPhoneInputProps {
  label?: string;
  value?: string;
  onChange: (fullE164: string, country: LatamCountry, nationalNumber: string) => void;
  error?: string;
  hint?: string;
  id?: string;
}

export function LatamPhoneInput({
  label = "WHATSAPP DE VENTAS",
  onChange,
  error,
  hint,
  id = "phone-input",
}: LatamPhoneInputProps) {
  const [selectedCountry, setSelectedCountry] = useState<LatamCountry>(LATAM_COUNTRIES[0]);
  const [nationalNumber, setNationalNumber] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleCountryChange = (country: LatamCountry) => {
    setSelectedCountry(country);
    setIsOpen(false);
    const cleanDigits = nationalNumber.replace(/\D/g, "").slice(0, country.digits);
    setNationalNumber(cleanDigits);
    onChange(`${country.dialCode}${cleanDigits}`, country, cleanDigits);
  };

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, "").slice(0, selectedCountry.digits);
    setNationalNumber(raw);
    onChange(`${selectedCountry.dialCode}${raw}`, selectedCountry, raw);
  };

  return (
    <div className="w-full text-left" ref={dropdownRef}>
      {label && (
        <label htmlFor={id} className="block font-mono text-xs font-bold text-ink uppercase tracking-wider mb-1.5">
          {"// " + label}
        </label>
      )}

      <div className="relative flex items-stretch">
        {/* Country Selector Button */}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-1.5 px-3 py-3 rounded-l-[10px] border-2 border-r-0 border-ink bg-paper text-ink font-mono text-xs sm:text-sm font-bold shadow-hard-sm hover:bg-white active:translate-x-[1px] active:translate-y-[1px] transition-all select-none shrink-0"
        >
          <span className="text-base sm:text-lg leading-none">{selectedCountry.flag}</span>
          <span>{selectedCountry.dialCode}</span>
          <ChevronDown className={cn("w-3.5 h-3.5 transition-transform", isOpen && "rotate-180")} />
        </button>

        {/* Dropdown Menu */}
        {isOpen && (
          <div className="absolute top-full left-0 mt-1.5 w-60 max-h-60 overflow-y-auto rounded-[12px] border-2 border-ink bg-white shadow-hard-lg z-50 py-1.5">
            <div className="px-3 py-1 font-mono text-[10px] font-bold text-ink/60 uppercase border-b border-ink/10 mb-1">
              PAÍSES LATINOAMÉRICA
            </div>
            {LATAM_COUNTRIES.map((c) => (
              <button
                key={c.code}
                type="button"
                onClick={() => handleCountryChange(c)}
                className={cn(
                  "w-full flex items-center justify-between px-3 py-2 text-left hover:bg-paper transition-colors font-mono text-xs",
                  selectedCountry.code === c.code && "bg-brand-orange/20 font-bold"
                )}
              >
                <div className="flex items-center gap-2">
                  <span className="text-base leading-none">{c.flag}</span>
                  <span className="font-body text-ink font-medium">{c.name}</span>
                </div>
                <span className="text-ink/70 font-mono">{c.dialCode}</span>
              </button>
            ))}
          </div>
        )}

        {/* Number Input */}
        <input
          id={id}
          type="tel"
          inputMode="numeric"
          placeholder={`Ej. ${selectedCountry.example}`}
          value={nationalNumber}
          onChange={handleNumberChange}
          className={cn(
            "w-full px-4 py-3 rounded-r-[10px] border-2 border-ink bg-white font-mono text-ink text-sm placeholder:text-ink/40 focus:outline-none focus:shadow-hard transition-shadow",
            error && "border-brand-coral focus:shadow-[4px_4px_0px_0px_#F56917]"
          )}
        />
      </div>

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
