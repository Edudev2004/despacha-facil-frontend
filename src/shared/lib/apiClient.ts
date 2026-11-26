const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  (typeof window !== "undefined" && window.location.hostname === "localhost"
    ? "http://localhost:8080"
    : "https://api.despachafacil.com");

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

  const url = `${API_BASE_URL}${endpoint.startsWith("/") ? endpoint : `/${endpoint}`}`;

  try {
    const response = await fetch(url, {
      ...rest,
      headers: requestHeaders,
    });

    if (!response.ok) {
      const errorBody = await response.json().catch(() => ({}));
      throw new Error(
        errorBody.message || `Error en la petición: ${response.status} ${response.statusText}`
      );
    }

    return response.json();
  } catch (error) {
    if (error instanceof TypeError && error.message.includes("fetch")) {
      throw new Error(
        "No se pudo conectar con el servidor backend (revisa que el servicio esté activo en localhost:8080 o tu conexión a internet)."
      );
    }
    throw error;
  }
}
