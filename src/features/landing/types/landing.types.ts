export interface FeatureItem {
  id: string;
  title: string;
  description: string;
  iconName: string;
}

export interface PlanItem {
  id: string;
  name: string;
  tagline: string;
  monthlyPrice: number;
  badge?: string;
  isPopular?: boolean;
  features: string[];
  ctaText: string;
}

export interface SectorItem {
  id: string;
  name: string;
  status: "ACTIVE" | "COMING_SOON";
  description: string;
  iconName: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}
