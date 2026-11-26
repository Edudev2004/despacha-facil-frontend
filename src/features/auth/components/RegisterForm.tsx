"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2, XCircle, Loader2, Sparkles, AlertTriangle } from "lucide-react";
import { Button } from "@/shared/components/ui/Button";
import { Input } from "@/shared/components/ui/Input";
import { apiClient } from "@/shared/lib/apiClient";
import type { RegisterTenantInput, UserSession } from "../types/auth.types";

interface SlugCheckResult {
  slug: string;
  available: boolean;
}

export function RegisterForm() {
  const [storeName, setStoreName] = useState("");
  const [slug, setSlug] = useState("");
  const [whatsappNumber, setWhatsappNumber] = useState("");
  const [adminFullName, setAdminFullName] = useState("");
  const [adminEmail, setAdminEmail] = useState("");
  const [password, setPassword] = useState("");

  const [slugStatus, setSlugStatus] = useState<"idle" | "checking" | "available" | "unavailable">("idle");
  const [isManualSlug, setIsManualSlug] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [generalError, setGeneralError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  };

  const handleStoreNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    setStoreName(name);
    if (!isManualSlug) {
      setSlug(generateSlug(name));
    }
  };

  const handleSlugChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsManualSlug(true);
    setSlug(generateSlug(e.target.value));
  };

  useEffect(() => {
    if (!slug || slug.length < 3) {
      setSlugStatus("idle");
      return;
    }

    setSlugStatus("checking");
    const timeout = setTimeout(async () => {
      try {
        const res = await apiClient<SlugCheckResult>(`/api/v1/auth/check-slug?slug=${encodeURIComponent(slug)}`);
        setSlugStatus(res.available ? "available" : "unavailable");
      } catch {
        setSlugStatus("idle");
      }
    }, 400);

    return () => clearTimeout(timeout);
  }, [slug]);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!storeName.trim()) errs.storeName = "INGRESA EL NOMBRE COMERCIAL DE TU MARCA";
    if (!slug || slug.length < 3) errs.slug = "EL SUBDOMINIO DEBE TENER AL MENOS 3 CARACTERES";
    if (slugStatus === "unavailable") errs.slug = "ESTE SUBDOMINIO YA ESTÁ OCUPADO. ELIGE OTRO";
    if (!whatsappNumber.trim() || whatsappNumber.replace(/\D/g, "").length < 9) {
      errs.whatsappNumber = "INGRESA UN NÚMERO DE WHATSAPP VÁLIDO (EJ. 987654321)";
    }
    if (!adminFullName.trim()) errs.adminFullName = "INGRESA TU NOMBRE Y APELLIDO";
    if (!adminEmail.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(adminEmail)) {
      errs.adminEmail = "INGRESA UN CORREO VÁLIDO (EJ. DUEÑO@MARCA.PE)";
    }
    if (!password || password.length < 6) {
      errs.password = "LA CONTRASEÑA DEBE TENER AL MENOS 6 CARACTERES";
    }

    setFieldErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setGeneralError(null);

    if (!validate()) return;

    setIsLoading(true);
    try {
      const payload: RegisterTenantInput = {
        storeName: storeName.trim(),
        slug: slug.trim(),
        whatsappNumber: whatsappNumber.trim(),
        adminFullName: adminFullName.trim(),
        adminEmail: adminEmail.trim(),
        password,
        businessType: "RETAIL",
      };

      await apiClient<UserSession>("/api/v1/auth/register-tenant", {
        method: "POST",
        body: JSON.stringify(payload),
      });

      window.location.href = "/dashboard";
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Ocurrió un error al registrar tu tienda. Intenta nuevamente.";
      setGeneralError(msg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      {generalError && (
        <div
          role="alert"
          className="p-3.5 rounded-[12px] border-2 border-ink bg-brand-coral text-white shadow-hard-sm flex items-start gap-2.5 text-left"
        >
          <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
          <div className="font-mono text-xs font-bold leading-snug">{generalError}</div>
        </div>
      )}

      {/* BLOQUE 1: DATOS DE TIENDA */}
      <div className="p-3.5 rounded-[14px] bg-paper border-2 border-ink space-y-3.5">
        <span className="font-mono text-[11px] font-bold text-ink uppercase tracking-wider block border-b border-ink/15 pb-1">
          {"[01] TU TIENDA Y CATÁLOGO PÚBLICO"}
        </span>

        <Input
          label="NOMBRE COMERCIAL"
          name="storeName"
          placeholder="Modas Navarro Boutique"
          value={storeName}
          onChange={handleStoreNameChange}
          error={fieldErrors.storeName}
        />

        <div className="text-left">
          <Input
            label="SUBDOMINIO (SLUG PÚBLICO)"
            name="slug"
            placeholder="modas-navarro"
            value={slug}
            onChange={handleSlugChange}
            error={fieldErrors.slug}
          />
          <div className="mt-1 flex items-center justify-between text-[11px] font-mono">
            <span className="text-ink/70">
              despachafacil.com/tienda/<strong>{slug || "tu-marca"}</strong>
            </span>
            {slugStatus === "checking" && (
              <span className="inline-flex items-center gap-1 text-ink/70 font-bold">
                <Loader2 className="w-3 h-3 animate-spin" /> Verificando
              </span>
            )}
            {slugStatus === "available" && (
              <span className="inline-flex items-center gap-1 text-emerald-600 font-bold">
                <CheckCircle2 className="w-3 h-3" /> Disponible
              </span>
            )}
            {slugStatus === "unavailable" && (
              <span className="inline-flex items-center gap-1 text-brand-coral font-bold">
                <XCircle className="w-3 h-3" /> Ocupado
              </span>
            )}
          </div>
        </div>

        <Input
          label="WHATSAPP DE VENTAS"
          name="whatsappNumber"
          placeholder="987654321"
          value={whatsappNumber}
          onChange={(e) => setWhatsappNumber(e.target.value)}
          error={fieldErrors.whatsappNumber}
          hint="Para recibir pedidos y vouchers directamente."
        />
      </div>

      {/* BLOQUE 2: CUENTA ADMINISTRADORA */}
      <div className="p-3.5 rounded-[14px] bg-paper border-2 border-ink space-y-3.5">
        <span className="font-mono text-[11px] font-bold text-ink uppercase tracking-wider block border-b border-ink/15 pb-1">
          {"[02] CUENTA DE ADMINISTRADOR"}
        </span>

        <Input
          label="NOMBRE COMPLETO"
          name="adminFullName"
          placeholder="Carlos Navarro"
          value={adminFullName}
          onChange={(e) => setAdminFullName(e.target.value)}
          error={fieldErrors.adminFullName}
        />

        <Input
          label="CORREO DE ACCESO"
          name="adminEmail"
          type="email"
          placeholder="carlos@modasnavarro.pe"
          value={adminEmail}
          onChange={(e) => setAdminEmail(e.target.value)}
          error={fieldErrors.adminEmail}
        />

        <Input
          label="CONTRASEÑA (MÍNIMO 6 CARACTERES)"
          name="password"
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={fieldErrors.password}
        />
      </div>

      <div className="pt-2">
        <Button
          type="submit"
          variant="primary"
          size="lg"
          isLoading={isLoading}
          className="w-full"
        >
          <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
          <span>{isLoading ? "CREANDO TIENDA..." : "ACTIVAR MI TIENDA GRATIS (7 DÍAS)"}</span>
          {!isLoading && <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />}
        </Button>
      </div>

      <div className="text-center pt-2">
        <p className="font-body text-xs text-ink/80">
          ¿Ya tienes cuenta?{" "}
          <Link href="/login" className="font-bold underline underline-offset-2 hover:text-brand-orange">
            Inicia sesión aquí
          </Link>
        </p>
      </div>
    </form>
  );
}
