const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://api.despachafacil.com";

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
}
