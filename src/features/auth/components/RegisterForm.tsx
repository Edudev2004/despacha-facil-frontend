"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2, XCircle, Loader2, Sparkles, AlertTriangle } from "lucide-react";
import { Button } from "@/shared/components/ui/Button";
import { Input } from "@/shared/components/ui/Input";
import { LatamPhoneInput, LATAM_COUNTRIES, type LatamCountry } from "@/shared/components/ui/LatamPhoneInput";
import { apiClient } from "@/shared/lib/apiClient";
import type { RegisterTenantInput, UserSession } from "../types/auth.types";

interface SlugCheckResult {
  slug: string;
  available: boolean;
}

export function RegisterForm() {
  const [storeName, setStoreName] = useState("");
  const [slug, setSlug] = useState("");
  const [phoneE164, setPhoneE164] = useState("");
  const [selectedCountry, setSelectedCountry] = useState<LatamCountry>(LATAM_COUNTRIES[0]);
  const [nationalPhone, setNationalPhone] = useState("");
  const [adminFullName, setAdminFullName] = useState("");
  const [adminEmail, setAdminEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

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

    // 1. Nombre Comercial
    if (!storeName.trim() || storeName.trim().length < 3) {
      errs.storeName = "Ingresa el nombre comercial de tu marca (mínimo 3 letras)";
    }

    // 2. Slug
    const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
    if (!slug || slug.length < 3) {
      errs.slug = "El subdominio debe tener al menos 3 caracteres";
    } else if (!slugRegex.test(slug)) {
      errs.slug = "Solo permite letras minúsculas, números y guiones medios";
    } else if (slugStatus === "unavailable") {
      errs.slug = "Este subdominio ya está ocupado. Elige otro";
    }

    // 3. Teléfono / WhatsApp con validación estricta según país LATAM
    if (!nationalPhone || nationalPhone.length === 0) {
      errs.whatsappNumber = "El número de WhatsApp es obligatorio";
    } else if (nationalPhone.length !== selectedCountry.digits) {
      errs.whatsappNumber = `Para ${selectedCountry.name} debe tener exactamente ${selectedCountry.digits} dígitos`;
    } else if (!selectedCountry.pattern.test(nationalPhone)) {
      errs.whatsappNumber = `Número inválido para ${selectedCountry.name}. Ejemplo: ${selectedCountry.example}`;
    }

    // 4. Nombre completo del admin (nombre + apellido)
    const nameParts = adminFullName.trim().split(/\s+/);
    if (!adminFullName.trim() || nameParts.length < 2) {
      errs.adminFullName = "Ingresa tu nombre y al menos un apellido";
    }

    // 5. Correo electrónico estricto
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!adminEmail.trim()) {
      errs.adminEmail = "El correo electrónico es obligatorio";
    } else if (!emailRegex.test(adminEmail.trim())) {
      errs.adminEmail = "Ingresa un correo electrónico válido (ej. tu@marca.pe)";
    }

    // 6. Contraseña fuerte (mínimo 8 caracteres, al menos una letra y un número)
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;
    if (!password) {
      errs.password = "La contraseña es obligatoria";
    } else if (!passwordRegex.test(password)) {
      errs.password = "Mínimo 8 caracteres, incluyendo al menos una letra y un número";
    }

    // 7. Confirmar contraseña
    if (!confirmPassword) {
      errs.confirmPassword = "Debes confirmar tu contraseña";
    } else if (password !== confirmPassword) {
      errs.confirmPassword = "Las contraseñas no coinciden";
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
        whatsappNumber: phoneE164 || `${selectedCountry.dialCode}${nationalPhone}`,
        adminFullName: adminFullName.trim(),
        adminEmail: adminEmail.trim().toLowerCase(),
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

        {/* Latam Phone Input */}
        <LatamPhoneInput
          label="WHATSAPP DE VENTAS (LATAM)"
          value={phoneE164}
          onChange={(fullE164, country, national) => {
            setPhoneE164(fullE164);
            setSelectedCountry(country);
            setNationalPhone(national);
            if (fieldErrors.whatsappNumber) {
              setFieldErrors((prev) => ({ ...prev, whatsappNumber: "" }));
            }
          }}
          error={fieldErrors.whatsappNumber}
          hint={`Formato estándar internacional (${selectedCountry.name}: ${selectedCountry.dialCode}) para recibir pedidos directos.`}
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
          onChange={(e) => {
            setAdminFullName(e.target.value);
            if (fieldErrors.adminFullName) setFieldErrors((prev) => ({ ...prev, adminFullName: "" }));
          }}
          error={fieldErrors.adminFullName}
        />

        <Input
          label="CORREO DE ACCESO"
          name="adminEmail"
          type="email"
          placeholder="carlos@modasnavarro.pe"
          value={adminEmail}
          onChange={(e) => {
            setAdminEmail(e.target.value);
            if (fieldErrors.adminEmail) setFieldErrors((prev) => ({ ...prev, adminEmail: "" }));
          }}
          error={fieldErrors.adminEmail}
        />

        <Input
          label="CONTRASEÑA (MÍNIMO 8 CARACTERES, LETRAS Y NÚMEROS)"
          name="password"
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => {
            const val = e.target.value;
            setPassword(val);
            if (fieldErrors.password) setFieldErrors((prev) => ({ ...prev, password: "" }));
            if (confirmPassword && val !== confirmPassword) {
              setFieldErrors((prev) => ({ ...prev, confirmPassword: "Las contraseñas no coinciden" }));
            } else if (confirmPassword && val === confirmPassword) {
              setFieldErrors((prev) => ({ ...prev, confirmPassword: "" }));
            }
          }}
          error={fieldErrors.password}
        />

        <div className="text-left">
          <Input
            label="CONFIRMAR CONTRASEÑA"
            name="confirmPassword"
            type="password"
            placeholder="••••••••"
            value={confirmPassword}
            onChange={(e) => {
              const val = e.target.value;
              setConfirmPassword(val);
              if (password && val !== password) {
                setFieldErrors((prev) => ({ ...prev, confirmPassword: "Las contraseñas no coinciden" }));
              } else {
                setFieldErrors((prev) => ({ ...prev, confirmPassword: "" }));
              }
            }}
            error={fieldErrors.confirmPassword}
          />
          {confirmPassword && password && (
            <div className="mt-1 flex items-center gap-1.5 text-[11px] font-mono">
              {password === confirmPassword ? (
                <span className="inline-flex items-center gap-1 text-emerald-600 font-bold">
                  <CheckCircle2 className="w-3.5 h-3.5" /> ¡Las contraseñas coinciden!
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 text-brand-coral font-bold">
                  <XCircle className="w-3.5 h-3.5" /> Las contraseñas no coinciden
                </span>
              )}
            </div>
          )}
        </div>
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
