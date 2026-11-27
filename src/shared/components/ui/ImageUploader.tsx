"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import {
  UploadCloud,
  X,
  Loader2,
  Link as LinkIcon,
  RefreshCw,
  AlertTriangle,
} from "lucide-react";
import { convertToWebP, formatBytes, type OptimizedImageResult } from "@/shared/lib/imageOptimizer";

interface ImageUploaderProps {
  label: string;
  hint?: string;
  value?: string;
  onChange: (url: string) => void;
  folder?: string;
  maxWidth?: number;
  maxHeight?: number;
  quality?: number;
  aspectRatio?: "square" | "banner" | "auto";
}

export function ImageUploader({
  label,
  hint,
  value,
  onChange,
  folder = "branding",
  maxWidth = 1200,
  maxHeight = 1200,
  quality = 0.85,
  aspectRatio = "auto",
}: ImageUploaderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [stats, setStats] = useState<OptimizedImageResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showManualInput, setShowManualInput] = useState(false);
  const [manualUrl, setManualUrl] = useState("");

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleProcessAndUpload = async (file: File) => {
    setError(null);
    setIsProcessing(true);

    try {
      // 1. Conversión instantánea a WebP directamente en el navegador
      const optimized = await convertToWebP(file, { maxWidth, maxHeight, quality });
      setStats(optimized);
      setIsProcessing(false);
      setIsUploading(true);

      // 2. Subida del archivo WebP optimizado al backend
      const formData = new FormData();
      formData.append("file", optimized.webpFile);
      formData.append("folder", folder);

      const response = await fetch("http://localhost:8080/api/v1/storage/upload", {
        method: "POST",
        body: formData,
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("No se pudo completar la subida de la imagen");
      }

      const data = await response.json();
      if (data && data.url) {
        // Si ya había una imagen previa y se está reemplazando, limpiar la anterior de R2
        if (value && value !== data.url) {
          fetch(`http://localhost:8080/api/v1/storage?url=${encodeURIComponent(value)}`, {
            method: "DELETE",
            credentials: "include",
          }).catch(() => {});
        }
        onChange(data.url);
      } else {
        // En caso de modo fallback local si R2 no está configurado aún
        onChange(optimized.previewUrl);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al procesar la imagen");
    } finally {
      setIsProcessing(false);
      setIsUploading(false);
    }
  };

  const handleFileDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleProcessAndUpload(e.dataTransfer.files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleProcessAndUpload(e.target.files[0]);
    }
  };

  const handleRemove = async () => {
    const currentUrl = value;
    onChange("");
    setStats(null);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }

    if (currentUrl) {
      try {
        await fetch(`http://localhost:8080/api/v1/storage?url=${encodeURIComponent(currentUrl)}`, {
          method: "DELETE",
          credentials: "include",
        });
      } catch {
        // ignore background cleanup failure
      }
    }
  };

  const handleApplyManualUrl = () => {
    if (manualUrl.trim()) {
      onChange(manualUrl.trim());
      setManualUrl("");
      setShowManualInput(false);
    }
  };

  return (
    <div className="w-full text-left space-y-2">
      {/* Etiqueta */}
      <div className="flex items-center justify-between">
        <label className="block font-mono text-xs font-bold text-ink uppercase tracking-wider">
          {"// " + label}
        </label>
        <button
          type="button"
          onClick={() => setShowManualInput(!showManualInput)}
          className="font-mono text-[11px] text-ink/60 hover:text-ink underline underline-offset-2 flex items-center gap-1"
        >
          <LinkIcon className="w-3 h-3" />
          {showManualInput ? "Usar archivo" : "O pegar URL"}
        </button>
      </div>

      {/* Input manual opcional de URL */}
      {showManualInput ? (
        <div className="flex gap-2">
          <input
            type="url"
            value={manualUrl}
            onChange={(e) => setManualUrl(e.target.value)}
            placeholder="https://.../imagen.webp"
            className="flex-1 px-4 py-2.5 rounded-[10px] border-2 border-ink bg-white font-body text-ink text-sm focus:outline-none focus:shadow-hard"
          />
          <button
            type="button"
            onClick={handleApplyManualUrl}
            className="px-4 py-2.5 rounded-[10px] bg-brand-orange text-ink font-body font-bold text-xs uppercase border-2 border-ink shadow-hard-sm active:translate-x-[1px] active:translate-y-[1px]"
          >
            Aplicar
          </button>
        </div>
      ) : value ? (
        /* Vista de Imagen Cargada con Acciones (Diseño Neo-Brutalista Estable) */
        <div className="rounded-[14px] border-2 border-ink bg-paper p-3.5 shadow-hard-sm space-y-3">
          {/* Contenedor de Previsualización */}
          <div
            className={`relative w-full overflow-hidden rounded-[10px] border-2 border-ink bg-white flex items-center justify-center ${
              aspectRatio === "banner" ? "h-28 sm:h-36" : "h-36 sm:h-44"
            }`}
          >
            <Image
              src={value}
              alt={label}
              fill
              className="object-contain p-2"
              unoptimized
            />
          </div>

          {/* Información y Estadísticas de Peso */}
          <div className="space-y-1 text-left min-w-0">
            <div className="flex items-center justify-between gap-2 flex-wrap">
              <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded-[4px] bg-teal border border-ink text-ink uppercase shrink-0 whitespace-nowrap">
                ✓ WebP Optimizado
              </span>
              {stats && (
                <span className="font-mono text-[10px] font-bold text-teal bg-teal/20 px-1.5 py-0.5 rounded border border-teal/40 shrink-0 whitespace-nowrap">
                  -{stats.savedPercentage}% peso
                </span>
              )}
            </div>

            {stats && (
              <p className="font-mono text-[11px] text-ink/70 truncate">
                De <span className="line-through">{formatBytes(stats.originalSize)}</span> a{" "}
                <strong className="text-ink font-bold">{formatBytes(stats.compressedSize)}</strong>
              </p>
            )}
          </div>

          {/* Botones de Acción */}
          <div className="grid grid-cols-2 gap-2 pt-1 border-t border-ink/15">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="w-full px-3 py-2 rounded-[8px] bg-white text-ink font-body font-bold text-xs uppercase border border-ink hover:bg-paper active:translate-x-[1px] active:translate-y-[1px] shadow-hard-sm flex items-center justify-center gap-1.5 transition-all"
            >
              <RefreshCw className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">Cambiar</span>
            </button>
            <button
              type="button"
              onClick={handleRemove}
              className="w-full px-3 py-2 rounded-[8px] bg-brand-coral/15 text-brand-coral font-body font-bold text-xs uppercase border border-brand-coral hover:bg-brand-coral hover:text-white active:translate-x-[1px] active:translate-y-[1px] flex items-center justify-center gap-1.5 transition-colors"
            >
              <X className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">Eliminar</span>
            </button>
          </div>
        </div>
      ) : (
        /* Zona Drag & Drop Neo-Brutalista */
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleFileDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`relative cursor-pointer rounded-[14px] border-2 border-dashed transition-all p-6 text-center ${
            isDragging
              ? "border-brand-orange bg-brand-orange/10 shadow-hard"
              : "border-ink/50 bg-paper/50 hover:bg-paper hover:border-ink hover:shadow-hard-sm"
          }`}
        >
          {isProcessing || isUploading ? (
            <div className="flex flex-col items-center justify-center py-4 space-y-2">
              <Loader2 className="w-8 h-8 text-brand-orange animate-spin" />
              <span className="font-mono text-xs font-bold text-ink uppercase tracking-wider">
                {isProcessing
                  ? "Convirtiendo a WebP ultraligero..."
                  : "Subiendo a almacenamiento..."}
              </span>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center space-y-2.5">
              <div className="w-11 h-11 rounded-[12px] bg-white border-2 border-ink grid place-items-center shadow-hard-sm">
                <UploadCloud className="w-6 h-6 text-ink" />
              </div>
              <div>
                <p className="font-body font-bold text-xs sm:text-sm text-ink uppercase">
                  Arrastra tu imagen o haz clic para subir
                </p>
                <p className="font-mono text-[11px] text-ink/60 mt-0.5">
                  PNG, JPG o WEBP • Se optimiza a WebP automáticamente
                </p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Input oculto nativo */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/png,image/jpeg,image/webp,image/jpg"
        onChange={handleFileSelect}
        className="hidden"
      />

      {/* Alerta de Error */}
      {error && (
        <div className="flex items-center gap-1.5 font-mono text-[11px] text-brand-coral font-bold mt-1">
          <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Hint */}
      {!error && hint && (
        <span className="block font-mono text-[11px] text-ink/60 mt-1">
          {hint}
        </span>
      )}
    </div>
  );
}
