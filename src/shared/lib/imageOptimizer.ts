export interface OptimizeImageOptions {
  maxWidth?: number;
  maxHeight?: number;
  quality?: number; // 0.1 to 1.0 (default: 0.85)
}

export interface OptimizedImageResult {
  webpBlob: Blob;
  webpFile: File;
  previewUrl: string;
  originalSize: number;
  compressedSize: number;
  savedBytes: number;
  savedPercentage: number;
  width: number;
  height: number;
}

/**
 * Convierte cualquier formato de imagen soportado por el navegador (JPG, PNG, HEIC, WEBP, etc.)
 * a formato WebP optimizado con reducción de dimensiones y compresión inteligente.
 * Todo ocurre directamente en el cliente (0 latencia de red y 0 consumo de datos móviles).
 */
export async function convertToWebP(
  file: File,
  options: OptimizeImageOptions = {}
): Promise<OptimizedImageResult> {
  const {
    maxWidth = 1400,
    maxHeight = 1400,
    quality = 0.85,
  } = options;

  return new Promise((resolve, reject) => {
    // Si no es un archivo de imagen, rechazar de inmediato
    if (!file.type.startsWith("image/")) {
      reject(new Error("El archivo seleccionado no es una imagen válida"));
      return;
    }

    const reader = new FileReader();
    reader.onerror = () => reject(new Error("Error al leer el archivo de imagen"));
    reader.onload = () => {
      const img = new Image();
      img.onerror = () => reject(new Error("No se pudo procesar la imagen seleccionada"));
      img.onload = () => {
        // 1. Calcular nuevas dimensiones proporcionales
        let { width, height } = img;

        if (width > maxWidth || height > maxHeight) {
          const ratio = Math.min(maxWidth / width, maxHeight / height);
          width = Math.round(width * ratio);
          height = Math.round(height * ratio);
        }

        // 2. Dibujar en Canvas con escalado suave
        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext("2d");
        if (!ctx) {
          reject(new Error("No se pudo inicializar el motor gráfico del navegador"));
          return;
        }

        // Optimización de renderizado para evitar pérdida de nitidez
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = "high";
        ctx.drawImage(img, 0, 0, width, height);

        // 3. Exportar a Blob formato WebP
        canvas.toBlob(
          (blob) => {
            if (!blob) {
              reject(new Error("Fallo en la conversión a formato WebP"));
              return;
            }

            const originalNameWithoutExt = file.name.substring(0, file.name.lastIndexOf(".")) || file.name;
            const newFileName = `${originalNameWithoutExt}.webp`;
            const webpFile = new File([blob], newFileName, { type: "image/webp" });
            const previewUrl = URL.createObjectURL(blob);

            const originalSize = file.size;
            const compressedSize = blob.size;
            const savedBytes = Math.max(0, originalSize - compressedSize);
            const savedPercentage = originalSize > 0
              ? Math.max(0, Math.round(((originalSize - compressedSize) / originalSize) * 100))
              : 0;

            resolve({
              webpBlob: blob,
              webpFile,
              previewUrl,
              originalSize,
              compressedSize,
              savedBytes,
              savedPercentage,
              width,
              height,
            });
          },
          "image/webp",
          quality
        );
      };

      img.src = reader.result as string;
    };

    reader.readAsDataURL(file);
  });
}

/**
 * Formatea bytes a representación legible (KB, MB)
 */
export function formatBytes(bytes: number, decimals = 1): string {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}
