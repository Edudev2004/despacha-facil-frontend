"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, Eye, EyeOff, AlertTriangle, Sparkles } from "lucide-react";
import { Button } from "@/shared/components/ui/Button";
import { Input } from "@/shared/components/ui/Input";
import { apiClient } from "@/shared/lib/apiClient";
import type { UserSession } from "../types/auth.types";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<{
    email?: string;
    password?: string;
  }>({});

  const validate = () => {
    const nextErrors: { email?: string; password?: string } = {};
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      nextErrors.email = "INGRESA UN CORREO VÁLIDO (EJ. HOLA@TUTIENDA.PE)";
    }
    if (!password || password.length < 6) {
      nextErrors.password = "LA CONTRASEÑA DEBE TENER AL MENOS 6 CARACTERES";
    }
    setFieldErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!validate()) return;

    setIsLoading(true);
    try {
      const session = await apiClient<UserSession>("/api/v1/auth/login", {
        method: "POST",
        body: JSON.stringify({ email: email.trim(), password, rememberMe }),
      });
      // Guardar sesión en localStorage para persistencia inmediata en el cliente
      if (typeof window !== "undefined" && session) {
        localStorage.setItem("df_user_session", JSON.stringify(session));
      }
      // Redirect will happen once dashboard route & cookie session are wired
      window.location.href = "/dashboard";
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : "No pudimos verificar tus credenciales. Intenta nuevamente.";
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      {error && (
        <div
          role="alert"
          className="p-3.5 rounded-[12px] border-2 border-ink bg-brand-coral text-white shadow-hard-sm flex items-start gap-2.5 text-left"
        >
          <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
          <div className="font-mono text-xs font-bold leading-snug">
            {error}
          </div>
        </div>
      )}

      <Input
        label="CORREO ELECTRÓNICO"
        name="email"
        type="email"
        autoComplete="email"
        placeholder="hola@modasnavarro.pe"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
          if (fieldErrors.email) setFieldErrors({ ...fieldErrors, email: undefined });
        }}
        error={fieldErrors.email}
      />

      <div className="w-full text-left">
        <div className="flex items-center justify-between mb-1.5">
          <label
            htmlFor="password"
            className="block font-mono text-xs font-bold text-ink uppercase tracking-wider"
          >
            {"// CONTRASEÑA"}
          </label>
          <Link
            href="/recuperar"
            className="font-mono text-[11px] font-bold text-ink/70 hover:text-ink underline underline-offset-2"
          >
            ¿OLVIDASTE TU CLAVE?
          </Link>
        </div>

        <div className="relative">
          <input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            autoComplete="current-password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              if (fieldErrors.password)
                setFieldErrors({ ...fieldErrors, password: undefined });
            }}
            className={`w-full px-4 py-3 pr-12 rounded-[10px] border-2 border-ink bg-white font-body text-ink text-sm placeholder:text-ink/40 focus:outline-none focus:shadow-hard transition-shadow ${
              fieldErrors.password
                ? "border-brand-coral focus:shadow-[4px_4px_0px_0px_#F56917]"
                : ""
            }`}
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            aria-label={showPassword ? "Ocultar contraseña" : "Ver contraseña"}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1.5 rounded-[8px] border border-transparent hover:border-ink hover:bg-paper text-ink transition-colors"
          >
            {showPassword ? (
              <EyeOff className="w-4 h-4" />
            ) : (
              <Eye className="w-4 h-4" />
            )}
          </button>
        </div>

        {fieldErrors.password && (
          <span className="block font-mono text-[11px] font-bold text-brand-coral mt-1.5">
            {fieldErrors.password}
          </span>
        )}
      </div>

      {/* Remember device */}
      <label className="flex items-center gap-2.5 cursor-pointer select-none pt-1">
        <input
          type="checkbox"
          checked={rememberMe}
          onChange={(e) => setRememberMe(e.target.checked)}
          className="w-4 h-4 rounded-[4px] border-2 border-ink accent-brand-orange cursor-pointer"
        />
        <span className="font-body text-xs sm:text-sm font-medium text-ink">
          Mantener sesión activa en este dispositivo
        </span>
      </label>

      <div className="pt-2">
        <Button
          type="submit"
          variant="primary"
          size="lg"
          isLoading={isLoading}
          className="w-full"
        >
          <span>{isLoading ? "VERIFICANDO..." : "ENTRAR AL PANEL"}</span>
          {!isLoading && <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />}
        </Button>
      </div>

      {/* Secondary CTA: Register */}
      <div className="pt-5 mt-5 border-t-2 border-dashed border-ink/20 text-left">
        <p className="font-mono text-[11px] font-bold text-ink/70 uppercase mb-2.5">
          {"// ¿AÚN NO TIENES TIENDA EN DESPACHA FÁCIL?"}
        </p>
        <Link
          href="/registro"
          className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-[12px] border-2 border-ink bg-paper text-ink font-body font-bold text-xs sm:text-sm uppercase tracking-wider shadow-hard-sm hover:bg-teal transition-all duration-150 active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
        >
          <Sparkles className="w-4 h-4 shrink-0" />
          <span>CREAR CATÁLOGO GRATIS (7 DÍAS)</span>
        </Link>
      </div>
    </form>
  );
}
