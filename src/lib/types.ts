export type LocalizedText = { uz: string; ru: string; en: string };

export type Listing = {
  id: number;
  supplier: string;
  category: string;
  title: string;
  image: string;
  originalPrice: number;
  discountedPrice: number;
  discount: number;
  expiresIn: string;
  expiresInHours: number;
  pickup: string;
  descriptions: LocalizedText;
  // Supplier-managed fields
  isNew?: boolean;
  status?: 'active' | 'paused';
  qty?: number;
  created?: string;
  area?: string;
  lat?: number;
  lng?: number;
};
