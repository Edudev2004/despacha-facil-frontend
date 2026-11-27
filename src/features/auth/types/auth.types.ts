export interface UserSession {
  userId: string;
  tenantId: string;
  tenantSlug: string;
  tenantName?: string;
  fullName: string;
  email: string;
  role: "ROLE_ADMIN" | "ROLE_OPERATOR" | "ROLE_DISPATCHER";
  token: string;
}

export interface LoginCredentials {
  email: string;
  passwordHash: string;
}

export interface RegisterTenantInput {
  storeName: string;
  slug: string;
  whatsappNumber: string;
  adminFullName: string;
  adminEmail: string;
  password: string;
  businessType?: "RETAIL" | "MANUFACTURING" | "SERVICES";
}
