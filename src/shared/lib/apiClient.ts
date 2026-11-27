function getApiBaseUrl(): string {
  // Si estamos en el navegador
  if (typeof window !== "undefined") {
    const host = window.location.hostname;
    // Si corre en tu máquina o red local -> Backend local en 8080
    if (host === "localhost" || host === "127.0.0.1" || host.startsWith("192.168.")) {
      return "http://localhost:8080";
    }
  }

  // Si está en producción (o SSR en servidor de producción)
  return process.env.NEXT_PUBLIC_API_URL || "https://api.despachafacil.com";
}

interface ApiError extends Error {
  status?: number;
}

interface FetchOptions extends RequestInit {
  tenantSlug?: string;
  token?: string;
}

export async function apiClient<T>(
  endpoint: string,
  options: FetchOptions = {}
): Promise<T> {
  const { tenantSlug, token, headers = {}, ...rest } = options;

  const requestHeaders: Record<string, string> = {
    "Content-Type": "application/json",
    ...(headers as Record<string, string>),
  };

  if (tenantSlug) {
    requestHeaders["X-Tenant-Slug"] = tenantSlug;
  }

  if (token) {
    requestHeaders["Authorization"] = `Bearer ${token}`;
  }

  const baseUrl = getApiBaseUrl();
  const url = `${baseUrl}${endpoint.startsWith("/") ? endpoint : `/${endpoint}`}`;

  try {
    const response = await fetch(url, {
      ...rest,
      credentials: rest.credentials || "include",
      headers: requestHeaders,
    });

    if (!response.ok) {
      const errorBody = await response.json().catch(() => ({}));
      const error: ApiError = new Error(
        errorBody.message || `Error en la petición: ${response.status} ${response.statusText}`
      );
      error.status = response.status;
      throw error;
    }

    return response.json();
  } catch (error) {
    if (error instanceof TypeError && error.message.includes("fetch")) {
      throw new Error(
        "No se pudo conectar con el servidor. Por favor verifica tu conexión o intenta más tarde."
      );
    }
    throw error;
  }
}
