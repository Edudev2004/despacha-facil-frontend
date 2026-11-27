export interface TenantSettings {
  id: string;
  name: string;
  slug: string;
  businessType: string | null;
  whatsappNumber: string;
  currency: string;
  logoUrl: string | null;
  logoHasBorder?: boolean;
  primaryColor: string | null;
  bannerUrl: string | null;
  yapeQrUrl: string | null;
  yapePhone: string | null;
  plinPhone: string | null;
  freeShippingThreshold: number | null;
  isActive: boolean;
}

export interface UpdateTenantSettingsInput {
  name: string;
  whatsappNumber: string;
  businessType?: string | null;
  logoUrl?: string | null;
  logoHasBorder?: boolean;
  primaryColor?: string | null;
  bannerUrl?: string | null;
  yapeQrUrl?: string | null;
  yapePhone?: string | null;
  plinPhone?: string | null;
  freeShippingThreshold?: number | null;
}
