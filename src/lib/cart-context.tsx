'use client';

import { createContext, useContext, useState, type ReactNode } from 'react';
import type { Listing } from './types';

export type CartItem = {
  id: number;
  supplier: string;
  title: string;
  image: string;
  price: number;
  originalPrice: number;
  discount: number;
  qty: number;
};

type CartContextType = {
  items: CartItem[];
  addToCart: (listing: Listing) => void;
  removeFromCart: (id: number) => void;
  updateQty: (id: number, delta: number) => void;
  itemCount: number;
  lastAddedAt: number;
};

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [lastAddedAt, setLastAddedAt] = useState(0);

  function addToCart(listing: Listing) {
    setLastAddedAt(Date.now());
    setItems((prev) => {
      const existing = prev.find((i) => i.id === listing.id);
      if (existing) {
        return prev.map((i) =>
          i.id === listing.id ? { ...i, qty: Math.min(10, i.qty + 1) } : i
        );
      }
      return [
        ...prev,
        {
          id: listing.id,
          supplier: listing.supplier,
          title: listing.title,
          image: listing.image,
          price: listing.discountedPrice,
          originalPrice: listing.originalPrice,
          discount: listing.discount,
          qty: 1,
        },
      ];
    });
  }

  function removeFromCart(id: number) {
    setItems((prev) => prev.filter((i) => i.id !== id));
  }

  function updateQty(id: number, delta: number) {
    setItems((prev) =>
      prev.map((i) =>
        i.id === id ? { ...i, qty: Math.max(1, Math.min(10, i.qty + delta)) } : i
      )
    );
  }

  const itemCount = items.reduce((sum, i) => sum + i.qty, 0);

  return (
    <CartContext.Provider value={{ items, addToCart, removeFromCart, updateQty, itemCount, lastAddedAt }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
