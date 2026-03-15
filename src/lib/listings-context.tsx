'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import type { Listing } from './types';
import { DEMO_LISTINGS } from './demo-listings';

export type AddListingForm = {
  title: string;
  description: string;
  category: string;
  originalPrice: string;
  discountedPrice: string;
  quantity: string;
  expiryDate: string;
  pickupStart: string;
  pickupEnd: string;
  area: string;
};

type ListingsContextValue = {
  listings: Listing[];
  addListing: (form: AddListingForm, supplierName?: string) => Listing;
  pauseListing: (id: number) => void;
  resumeListing: (id: number) => void;
  deleteListing: (id: number) => void;
};

const ListingsContext = createContext<ListingsContextValue | null>(null);

const INITIAL_LISTINGS: Listing[] = DEMO_LISTINGS.map((l) => ({
  ...l,
  status: 'active' as const,
  isNew: false,
  qty: 10,
  created: '2026-03-10',
  area: 'Toshkent',
  lat: 41.2995,
  lng: 69.2401,
}));

// Tashkent area coordinates for supplier area dropdown
export const AREA_COORDS: Record<string, { lat: number; lng: number }> = {
  Yunusobod:    { lat: 41.340, lng: 69.305 },
  Yashnobod:    { lat: 41.270, lng: 69.268 },
  'Mirzo Ulugbek': { lat: 41.320, lng: 69.330 },
  Shayxontohur: { lat: 41.305, lng: 69.215 },
  Yakkasaroy:   { lat: 41.278, lng: 69.295 },
  Uchtepa:      { lat: 41.265, lng: 69.258 },
  Olmazor:      { lat: 41.322, lng: 69.218 },
  Bektemir:     { lat: 41.258, lng: 69.348 },
  Chilonzor:    { lat: 41.290, lng: 69.215 },
  Sergeli:      { lat: 41.243, lng: 69.280 },
};

let nextId = DEMO_LISTINGS.length + 1;

export function ListingsProvider({ children }: { children: ReactNode }) {
  const [listings, setListings] = useState<Listing[]>(INITIAL_LISTINGS);

  function addListing(form: AddListingForm, supplierName = "Mening Do'konim"): Listing {
    const orig = Number(form.originalPrice) || 0;
    const disc = Number(form.discountedPrice) || 0;
    const discountPct =
      orig > 0 && disc > 0 && disc < orig
        ? Math.round((1 - disc / orig) * 100)
        : 0;

    let expiresInHours = 24;
    let expiresIn = '24 hours';
    if (form.expiryDate) {
      const diffMs = new Date(form.expiryDate).getTime() - Date.now();
      const diffHours = Math.max(1, Math.round(diffMs / 3_600_000));
      expiresInHours = diffHours;
      expiresIn = diffHours < 24 ? `${diffHours} hours` : `${Math.round(diffHours / 24)} days`;
    }

    const area = form.area || 'Toshkent';
    const coords = AREA_COORDS[area] ?? { lat: 41.2995, lng: 69.2401 };

    const newListing: Listing = {
      id: nextId++,
      supplier: supplierName,
      category: form.category || 'store',
      title: form.title,
      image: `https://placehold.co/400x300/FAD6CC/E8594F?text=${encodeURIComponent(form.title.slice(0, 20) || 'Yangi')}`,
      originalPrice: orig,
      discountedPrice: disc,
      discount: discountPct,
      expiresIn,
      expiresInHours,
      pickup:
        form.pickupStart && form.pickupEnd
          ? `${form.pickupStart}–${form.pickupEnd}`
          : '10:00–20:00',
      descriptions: {
        uz: form.description,
        ru: form.description,
        en: form.description,
      },
      isNew: true,
      status: 'active',
      qty: Number(form.quantity) || 10,
      created: new Date().toISOString().split('T')[0],
      area,
      lat: coords.lat,
      lng: coords.lng,
    };

    setListings((prev) => [newListing, ...prev]);
    return newListing;
  }

  function pauseListing(id: number) {
    setListings((prev) =>
      prev.map((l) => (l.id === id ? { ...l, status: 'paused' as const } : l))
    );
  }

  function resumeListing(id: number) {
    setListings((prev) =>
      prev.map((l) => (l.id === id ? { ...l, status: 'active' as const } : l))
    );
  }

  function deleteListing(id: number) {
    setListings((prev) => prev.filter((l) => l.id !== id));
  }

  return (
    <ListingsContext.Provider
      value={{ listings, addListing, pauseListing, resumeListing, deleteListing }}
    >
      {children}
    </ListingsContext.Provider>
  );
}

export function useListings() {
  const ctx = useContext(ListingsContext);
  if (!ctx) throw new Error('useListings must be used inside ListingsProvider');
  return ctx;
}
