"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  Palette,
  Store,
  QrCode,
  Truck,
  Sparkles,
  Save,
  CheckCircle2,
  AlertCircle,
  Loader2,
  ExternalLink,
  ShieldCheck,
  ShoppingBag,
} from "lucide-react";
import { Button } from "@/shared/components/ui/Button";
import { Input } from "@/shared/components/ui/Input";
import { Card } from "@/shared/components/ui/Card";
import { Badge } from "@/shared/components/ui/Badge";
import { ImageUploader } from "@/shared/components/ui/ImageUploader";
import { apiClient } from "@/shared/lib/apiClient";
import type { TenantSettings, UpdateTenantSettingsInput } from "@/features/settings/types/settings.types";

const PRESET_COLORS = [
  { label: "Ámbar Oficial", hex: "#FFA800", bgClass: "bg-[#FFA800]" },
  { label: "Menta Live", hex: "#34C9A8", bgClass: "bg-[#34C9A8]" },
  { label: "Coral Fuego", hex: "#F56917", bgClass: "bg-[#F56917]" },
  { label: "Lima Eléctrico", hex: "#C8FF00", bgClass: "bg-[#C8FF00]" },
  { label: "Azul Cobalto", hex: "#0055FF", bgClass: "bg-[#0055FF]" },
  { label: "Rosa Neón", hex: "#FF4081", bgClass: "bg-[#FF4081]" },
];

const BUSINESS_TYPES = [
  "Moda, Ropa & Outfits",
  "Calzado & Zapatillas",
  "Joyería, Accesorios & Carteras",
  "Belleza, Cosméticos & Cuidado",
  "Electrónica & Accesorios Móviles",
  "Hogar, Deco & Tendencias",
  "Otro Rubro",
];

export default function TenantSettingsPage() {
  const [settings, setSettings] = useState<TenantSettings | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Form Fields
  const [name, setName] = useState("");
  const [businessType, setBusinessType] = useState("");
  const [whatsappNumber, setWhatsappNumber] = useState("");
  const [primaryColor, setPrimaryColor] = useState("#FFA800");
  const [logoUrl, setLogoUrl] = useState("");
  const [logoHasBorder, setLogoHasBorder] = useState(true);
  const [bannerUrl, setBannerUrl] = useState("");
  const [yapePhone, setYapePhone] = useState("");
  const [yapeQrUrl, setYapeQrUrl] = useState("");
  const [plinPhone, setPlinPhone] = useState("");
  const [freeShippingThreshold, setFreeShippingThreshold] = useState<string>("");

  // Validation
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    async function loadSettings() {
      setIsLoading(true);
      try {
        const data = await apiClient<TenantSettings>("/api/v1/tenant/settings");
        if (data) {
          setSettings(data);
          setName(data.name || "");
          setBusinessType(data.businessType || BUSINESS_TYPES[0]);
          setWhatsappNumber(data.whatsappNumber || "");
          setPrimaryColor(data.primaryColor || "#FFA800");
          setLogoUrl(data.logoUrl || "");
          setLogoHasBorder(data.logoHasBorder ?? true);
          setBannerUrl(data.bannerUrl || "");
          setYapePhone(data.yapePhone || "");
          setYapeQrUrl(data.yapeQrUrl || "");
          setPlinPhone(data.plinPhone || "");
          setFreeShippingThreshold(data.freeShippingThreshold != null ? String(data.freeShippingThreshold) : "");
        }
      } catch {
        // Redirigir a pantalla segura si el usuario no tiene permisos de admin
        window.location.href = "/dashboard/acceso-restringido";
      } finally {
        setIsLoading(false);
      }
    }

    loadSettings();
  }, []);

  const validate = () => {
    const errs: Record<string, string> = {};

    if (!name.trim()) {
      errs.name = "El nombre de tu tienda es obligatorio.";
    } else if (name.trim().length > 150) {
      errs.name = "Máximo 150 caracteres.";
    }

    if (!whatsappNumber.trim()) {
      errs.whatsappNumber = "El número de WhatsApp es requerido para atender tus pedidos.";
    } else if (whatsappNumber.trim().length < 8) {
      errs.whatsappNumber = "Ingresa un número telefónico válido.";
    }

    const hexRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
    if (primaryColor && !hexRegex.test(primaryColor)) {
      errs.primaryColor = "Debe ser un código hexadecimal válido (ej: #FFA800).";
    }

    if (freeShippingThreshold.trim()) {
      const num = Number(freeShippingThreshold);
      if (isNaN(num) || num < 0) {
        errs.freeShippingThreshold = "El umbral de envío gratis debe ser un monto positivo (ej: 150.00).";
      }
    }

    setFieldErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSaveSuccess(false);

    if (!validate()) return;

    setIsSaving(true);
    try {
      const payload: UpdateTenantSettingsInput = {
        name: name.trim(),
        businessType: businessType.trim() || null,
        whatsappNumber: whatsappNumber.trim(),
        primaryColor: primaryColor.trim() || "#FFA800",
        logoUrl: logoUrl.trim() || null,
        logoHasBorder,
        bannerUrl: bannerUrl.trim() || null,
        yapePhone: yapePhone.trim() || null,
        yapeQrUrl: yapeQrUrl.trim() || null,
        plinPhone: plinPhone.trim() || null,
        freeShippingThreshold: freeShippingThreshold.trim() ? Number(freeShippingThreshold) : null,
      };

      const updated = await apiClient<TenantSettings>("/api/v1/tenant/settings", {
        method: "PUT",
        body: JSON.stringify(payload),
      });

      setSettings(updated);
      setSaveSuccess(true);

      // Actualizar también la sesión en localStorage si el nombre de la tienda cambió
      try {
        const cached = localStorage.getItem("df_user_session");
        if (cached) {
          const session = JSON.parse(cached);
          session.tenantName = updated.name;
          localStorage.setItem("df_user_session", JSON.stringify(session));
        }
      } catch {
        // ignore
      }

      // Scroll suave hacia arriba para confirmar
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      setErrorMessage("No se pudieron guardar los ajustes. Revisa los datos ingresados e intenta nuevamente.");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-[500px] flex flex-col items-center justify-center p-8 text-center">
        <div className="w-16 h-16 rounded-[16px] bg-brand-orange border-3 border-ink shadow-hard grid place-items-center mb-4 animate-bounce">
          <Loader2 className="w-8 h-8 text-ink animate-spin" />
        </div>
        <p className="font-mono text-sm font-bold text-ink uppercase tracking-wider">
          Cargando configuración de marca...
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8 text-left pb-16">
      {/* Cabecera de Página Neo-Brutalista */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b-3 border-ink pb-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="font-mono text-xs font-bold px-2 py-0.5 rounded-[6px] bg-brand-orange border border-ink text-ink shrink-0 whitespace-nowrap">
              [07] AJUSTES DE MARCA
            </span>
            <span className="font-mono text-xs text-ink/60">•</span>
            <span className="font-mono text-xs font-bold text-ink/70 uppercase">
              Sprint 1 // EPIC-01
            </span>
          </div>
          <h1 className="font-display text-2xl sm:text-3xl lg:text-4xl uppercase tracking-tight text-ink">
            Marca, Colores & Billeteras
          </h1>
          <p className="font-body text-ink/70 text-sm sm:text-base mt-1 max-w-2xl">
            Personaliza la identidad visual de tu catálogo móvil, activa tus códigos QR de Yape / Plin y define políticas de envío para tus transmisiones en vivo.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {settings?.slug && (
            <a
              href={`/tienda/${settings.slug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-[12px] bg-white text-ink font-body font-bold text-xs uppercase tracking-wider border-2 border-ink shadow-hard-sm hover:bg-paper active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all"
            >
              <span>Ver Catálogo</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}
        </div>
      </div>

      {/* Alerta de Éxito Neo-Brutalista */}
      {saveSuccess && (
        <div className="p-4 rounded-[14px] bg-teal/20 border-2 border-ink shadow-hard-sm flex items-start gap-3 animate-in fade-in duration-200">
          <CheckCircle2 className="w-5 h-5 text-ink shrink-0 mt-0.5" />
          <div className="flex-1">
            <h4 className="font-display text-sm uppercase text-ink">
              ¡Ajustes Guardados con Éxito!
            </h4>
            <p className="font-body text-xs text-ink/80 mt-0.5">
              Los cambios en tu marca, colores y billeteras Yape / Plin ya están activos para tus clientes en el catálogo móvil.
            </p>
          </div>
          <button
            onClick={() => setSaveSuccess(false)}
            className="text-xs font-mono font-bold uppercase underline underline-offset-2 text-ink hover:text-brand-orange"
          >
            Cerrar
          </button>
        </div>
      )}

      {/* Alerta de Error Amigable */}
      {errorMessage && (
        <div className="p-4 rounded-[14px] bg-brand-coral/15 border-2 border-ink shadow-hard-sm flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-brand-coral shrink-0 mt-0.5" />
          <div className="flex-1">
            <h4 className="font-display text-sm uppercase text-brand-coral">
              Atención al guardar
            </h4>
            <p className="font-body text-xs text-ink/80 mt-0.5">
              {errorMessage}
            </p>
          </div>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Columna Izquierda / Central: Formularios Principales */}
          <div className="lg:col-span-2 space-y-8">
            {/* SECCIÓN 1: Identidad de Marca */}
            <Card variant="default" className="space-y-5">
              <div className="flex items-center gap-2.5 border-b-2 border-ink/10 pb-3">
                <Store className="w-5 h-5 text-brand-orange" />
                <div>
                  <h2 className="font-display text-base uppercase text-ink">
                    1. Identidad de la Tienda
                  </h2>
                  <p className="font-body text-xs text-ink/60">
                    Datos comerciales visibles en la cabecera del catálogo y mensajes de confirmación.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Nombre Comercial"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ej: R&M Personaliza"
                  error={fieldErrors.name}
                  hint="Visible en el encabezado del Live y catálogo."
                />

                <div className="w-full text-left">
                  <label className="block font-mono text-xs font-bold text-ink uppercase tracking-wider mb-1.5">
                    {"// Tipo de Negocio / Rubro"}
                  </label>
                  <select
                    value={businessType}
                    onChange={(e) => setBusinessType(e.target.value)}
                    className="w-full px-4 py-3 rounded-[10px] border-2 border-ink bg-white font-body text-ink text-sm focus:outline-none focus:shadow-hard transition-shadow"
                  >
                    {BUSINESS_TYPES.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                  <span className="block font-mono text-[11px] text-ink/60 mt-1.5">
                    Optimiza la experiencia del catálogo social.
                  </span>
                </div>
              </div>

              <div>
                <Input
                  label="WhatsApp Oficial de Ventas"
                  value={whatsappNumber}
                  onChange={(e) => setWhatsappNumber(e.target.value)}
                  placeholder="Ej: +51 987 654 321"
                  error={fieldErrors.whatsappNumber}
                  hint="Donde los clientes enviarán comprobantes Yape/Plin."
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
                <ImageUploader
                  label="Logo Oficial de la Tienda"
                  hint="Se optimiza automáticamente a WebP ultraligero (máx 600x600 px)."
                  value={logoUrl}
                  onChange={(url) => setLogoUrl(url)}
                  folder="branding"
                  maxWidth={600}
                  maxHeight={600}
                  aspectRatio="square"
                />

                <ImageUploader
                  label="Banner de Tienda & Lives"
                  hint="Se optimiza a WebP (máx 1400x450 px) para cabecera de catálogos."
                  value={bannerUrl}
                  onChange={(url) => setBannerUrl(url)}
                  folder="branding"
                  maxWidth={1400}
                  maxHeight={450}
                  aspectRatio="banner"
                />
              </div>

              {/* Selector de Estilo de Logo (Con Borde / Sin Borde) */}
              <div className="p-3.5 rounded-[12px] bg-paper border-2 border-ink shadow-hard-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <span className="font-mono text-xs font-bold text-ink uppercase block">
                    {"// Estilo del Logo en Catálogo"}
                  </span>
                  <p className="font-body text-xs text-ink/70 mt-0.5">
                    Elige si tu logo lleva marco negro Neo-Brutalista con sombra o si flota limpio. Fondo siempre negro sólido (sin sangrado de color).
                  </p>
                </div>
                <div className="inline-flex rounded-[10px] border-2 border-ink p-1 bg-white shadow-hard-sm shrink-0">
                  <button
                    type="button"
                    onClick={() => setLogoHasBorder(true)}
                    className={`px-3.5 py-1.5 rounded-[6px] font-body text-xs font-bold uppercase transition-all ${
                      logoHasBorder
                        ? "bg-black text-white shadow-hard-sm"
                        : "text-ink hover:text-ink/70"
                    }`}
                  >
                    Con Borde
                  </button>
                  <button
                    type="button"
                    onClick={() => setLogoHasBorder(false)}
                    className={`px-3.5 py-1.5 rounded-[6px] font-body text-xs font-bold uppercase transition-all ${
                      !logoHasBorder
                        ? "bg-black text-white shadow-hard-sm"
                        : "text-ink hover:text-ink/70"
                    }`}
                  >
                    Sin Borde
                  </button>
                </div>
              </div>
            </Card>

            {/* SECCIÓN 2: Color Primario & Identidad Visual */}
            <Card variant="default" className="space-y-5">
              <div className="flex items-center gap-2.5 border-b-2 border-ink/10 pb-3">
                <Palette className="w-5 h-5 text-teal" />
                <div>
                  <h2 className="font-display text-base uppercase text-ink">
                    2. Color de Marca (Neo-Brutalismo)
                  </h2>
                  <p className="font-body text-xs text-ink/60">
                    Aplica sobre botones principales de compra, etiquetas de stock y banners de live.
                  </p>
                </div>
              </div>

              <div>
                <label className="block font-mono text-xs font-bold text-ink uppercase tracking-wider mb-2.5">
                  {"// Presets Oficiales de Alto Impacto"}
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {PRESET_COLORS.map((color) => {
                    const isSelected = primaryColor.toUpperCase() === color.hex.toUpperCase();
                    return (
                      <button
                        type="button"
                        key={color.hex}
                        onClick={() => setPrimaryColor(color.hex)}
                        className={`p-2.5 rounded-[12px] border-2 border-ink flex items-center gap-2 text-left transition-all ${
                          isSelected
                            ? "bg-white shadow-hard ring-2 ring-ink"
                            : "bg-paper hover:bg-white shadow-hard-sm"
                        } active:translate-x-[2px] active:translate-y-[2px] active:shadow-none`}
                      >
                        <span
                          className={`w-6 h-6 rounded-[6px] border border-ink shrink-0 ${color.bgClass}`}
                          style={{ backgroundColor: color.hex }}
                        />
                        <div className="truncate">
                          <span className="font-body font-bold text-xs text-ink block leading-tight truncate">
                            {color.label}
                          </span>
                          <span className="font-mono text-[10px] text-ink/60 block">
                            {color.hex}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="pt-2">
                <Input
                  label="Código Hexadecimal Personalizado"
                  value={primaryColor}
                  onChange={(e) => setPrimaryColor(e.target.value)}
                  placeholder="#FFA800"
                  error={fieldErrors.primaryColor}
                  hint="Puedes ingresar cualquier color hexadecimal de tu paleta de marca."
                />
              </div>
            </Card>

            {/* SECCIÓN 3: Billeteras Digitales (Yape & Plin) */}
            <Card variant="default" className="space-y-5">
              <div className="flex items-center gap-2.5 border-b-2 border-ink/10 pb-3">
                <QrCode className="w-5 h-5 text-brand-orange" />
                <div>
                  <h2 className="font-display text-base uppercase text-ink">
                    3. Billeteras Digitales (Yape & Plin)
                  </h2>
                  <p className="font-body text-xs text-ink/60">
                    Cobro directo 0% comisión. Los clientes escanean o digitan el número al completar su reserva de 20 min.
                  </p>
                </div>
              </div>

              {/* Banner informativo 0% comisión */}
              <div className="p-3.5 rounded-[12px] bg-paper border-2 border-ink shadow-hard-sm flex items-center gap-3">
                <ShieldCheck className="w-6 h-6 text-teal shrink-0" />
                <p className="font-body text-xs text-ink/80 leading-relaxed">
                  <strong className="text-ink font-bold">100% de tus ingresos directo a tu cuenta:</strong> Despacha Fácil no cobra comisiones por transacción. El cliente realiza su pago directo vía Yape/Plin y tu equipo valida la captura en bodega.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Celular Registrado en Yape"
                  value={yapePhone}
                  onChange={(e) => setYapePhone(e.target.value)}
                  placeholder="Ej: 987654321"
                  hint="Número asociado a tu cuenta Yape."
                />

                <Input
                  label="Celular Registrado en Plin"
                  value={plinPhone}
                  onChange={(e) => setPlinPhone(e.target.value)}
                  placeholder="Ej: 987654321"
                  hint="Número asociado a tu cuenta Plin (opcional)."
                />
              </div>

              <div className="pt-2">
                <ImageUploader
                  label="Código QR de Yape (Para escaneo directo en Lives)"
                  hint="Sube la foto de tu código QR de Yape. Se convierte a WebP al instante para un escaneo veloz en el checkout."
                  value={yapeQrUrl}
                  onChange={(url) => setYapeQrUrl(url)}
                  folder="wallets"
                  maxWidth={800}
                  maxHeight={800}
                  aspectRatio="square"
                />
              </div>
            </Card>

            {/* SECCIÓN 4: Políticas de Despacho & Envío Gratis */}
            <Card variant="default" className="space-y-5">
              <div className="flex items-center gap-2.5 border-b-2 border-ink/10 pb-3">
                <Truck className="w-5 h-5 text-teal" />
                <div>
                  <h2 className="font-display text-base uppercase text-ink">
                    4. Políticas de Despacho & Courier
                  </h2>
                  <p className="font-body text-xs text-ink/60">
                    Incentivos de compra para tus envíos por Shalom y Olva Courier a todo el Perú.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Monto Mínimo para Envío Gratis (S/ PEN)"
                  type="number"
                  step="0.50"
                  min="0"
                  value={freeShippingThreshold}
                  onChange={(e) => setFreeShippingThreshold(e.target.value)}
                  placeholder="150.00"
                  error={fieldErrors.freeShippingThreshold}
                  hint="Deja vacío si no ofreces envío gratis general."
                />

                <div className="w-full text-left">
                  <label className="block font-mono text-xs font-bold text-ink uppercase tracking-wider mb-1.5">
                    {"// Moneda Operativa"}
                  </label>
                  <div className="w-full px-4 py-3 rounded-[10px] border-2 border-ink bg-paper font-mono text-ink text-sm font-bold">
                    PEN (S/ - Soles Peruanos)
                  </div>
                  <span className="block font-mono text-[11px] text-ink/60 mt-1.5">
                    Estándar para comercio nacional en Perú.
                  </span>
                </div>
              </div>
            </Card>
          </div>

          {/* Columna Derecha: Vista Previa en Vivo Neo-Brutalista */}
          <div className="space-y-6">
            <div className="sticky top-20 space-y-6">
              <Card variant="paper" className="space-y-4">
                <div className="flex items-center justify-between border-b-2 border-ink/20 pb-2.5">
                  <span className="font-mono text-xs font-bold uppercase text-ink flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-brand-orange" />
                    VISTA PREVIA EN VIVO
                  </span>
                  <Badge variant="success">Catálogo Móvil</Badge>
                </div>

                <p className="font-body text-xs text-ink/70">
                  Así verán tus clientes los botones y componentes con tu color seleccionado:
                </p>

                {/* Tarjeta de Demostración de Catálogo */}
                <div className="bg-white rounded-[14px] border-2 border-ink p-4 shadow-hard space-y-3.5">
                  {/* Banner simulado */}
                  {bannerUrl ? (
                    <div className="w-full h-20 rounded-[8px] border-2 border-ink overflow-hidden relative">
                      <Image
                        src={bannerUrl}
                        alt="Banner Preview"
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    </div>
                  ) : (
                    <div
                      className="w-full h-16 rounded-[8px] border-2 border-ink grid place-items-center text-ink font-display text-xs uppercase"
                      style={{ backgroundColor: primaryColor }}
                    >
                      {name || "TU TIENDA"}
                    </div>
                  )}

                  {/* Cabecera de tienda simulada */}
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className={`w-12 h-12 rounded-[10px] grid place-items-center font-display text-white text-sm shrink-0 overflow-hidden relative transition-all ${
                        logoHasBorder
                          ? "border-2 border-ink bg-black shadow-hard-sm"
                          : "border-0 bg-transparent"
                      }`}
                    >
                      {logoUrl ? (
                        <Image
                          src={logoUrl}
                          alt="Logo Preview"
                          fill
                          className={`object-contain ${logoHasBorder ? "p-1 bg-black" : "p-0 bg-transparent"}`}
                          unoptimized
                        />
                      ) : (
                        <div className="w-full h-full bg-black grid place-items-center">
                          <span className="font-display font-bold text-white text-sm tracking-wider">
                            {(name || "DF").substring(0, 2).toUpperCase()}
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="text-left min-w-0 flex-1">
                      <h4 className="font-display text-sm uppercase text-ink truncate leading-tight">
                        {name || "R&M Personaliza"}
                      </h4>
                      <span className="font-mono text-[10px] text-ink/60 block truncate">
                        {businessType || "Moda & Tendencias"}
                      </span>
                    </div>
                  </div>

                  {/* Producto simulado con botón en color de marca */}
                  <div className="p-3 rounded-[10px] bg-paper border border-ink text-left space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-body font-bold text-xs text-ink">
                        Vestido Estilo Sirena
                      </span>
                      <span className="font-mono text-xs font-bold text-ink">
                        S/ 89.00
                      </span>
                    </div>

                    <button
                      type="button"
                      className="w-full py-2.5 px-3 rounded-[10px] border-2 border-ink font-body font-bold text-xs uppercase tracking-wider text-ink shadow-hard-sm transition-transform active:translate-x-[2px] active:translate-y-[2px] active:shadow-none flex items-center justify-center gap-2"
                      style={{ backgroundColor: primaryColor }}
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Apartar en Live (20 min)</span>
                    </button>
                  </div>

                  {/* Badge de Envío Gratis simulado */}
                  {freeShippingThreshold && Number(freeShippingThreshold) > 0 && (
                    <div className="p-2 rounded-[8px] bg-teal/20 border border-ink font-mono text-[10px] font-bold text-ink text-center">
                      🚚 ¡Envío GRATIS a partir de S/ {Number(freeShippingThreshold).toFixed(2)}!
                    </div>
                  )}

                  {/* Previsualización de QR Yape si existe */}
                  {yapeQrUrl && (
                    <div className="p-3 rounded-[10px] bg-paper border border-ink text-center space-y-1.5">
                      <span className="font-mono text-[10px] font-bold uppercase text-ink block">
                        QR Yape para Checkout:
                      </span>
                      <div className="w-24 h-24 mx-auto rounded-[8px] border-2 border-ink overflow-hidden relative bg-white">
                        <Image
                          src={yapeQrUrl}
                          alt="QR Yape Preview"
                          fill
                          className="object-contain p-1"
                          unoptimized
                        />
                      </div>
                      {yapePhone && (
                        <span className="font-mono text-[11px] font-bold text-ink block">
                          Yape: {yapePhone}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </Card>

              {/* Botón Flotante / Fijado de Guardar */}
              <div className="p-4 rounded-[16px] bg-white border-2 border-ink shadow-hard space-y-3">
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  className="w-full"
                  isLoading={isSaving}
                >
                  <Save className="w-4 h-4 mr-2" />
                  <span>Guardar Configuración</span>
                </Button>

                <p className="font-mono text-[10px] text-ink/60 text-center">
                  Solo administradores pueden modificar estos ajustes.
                </p>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
