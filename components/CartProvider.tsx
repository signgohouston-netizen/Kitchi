"use client";

import { createContext, useContext, useEffect, useState, useCallback, ReactNode } from "react";
import type { CartItem } from "@/lib/data";
import { DELIVERY_FEE } from "@/lib/data";

type AddPayload = { name: string; price: number; emoji?: string };

type CartContextType = {
  items: CartItem[];
  count: number;
  subtotal: number;
  delivery: number;
  total: number;
  isOpen: boolean;
  toast: string | null;
  add: (item: AddPayload) => void;
  setQty: (name: string, delta: number) => void;
  remove: (name: string) => void;
  clear: () => void;
  open: () => void;
  close: () => void;
};

const CartContext = createContext<CartContextType | null>(null);
const KEY = "ldk_cart_next";

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [hydrated, setHydrated] = useState(false);

  // Load from localStorage once on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setItems(JSON.parse(raw));
    } catch {
      /* ignore */
    }
    setHydrated(true);
  }, []);

  // Persist
  useEffect(() => {
    if (hydrated) localStorage.setItem(KEY, JSON.stringify(items));
  }, [items, hydrated]);

  // Auto-dismiss toast
  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 2200);
    return () => clearTimeout(t);
  }, [toast]);

  const add = useCallback((item: AddPayload) => {
    setItems((prev) => {
      const found = prev.find((i) => i.name === item.name);
      if (found) return prev.map((i) => (i.name === item.name ? { ...i, qty: i.qty + 1 } : i));
      return [...prev, { name: item.name, price: item.price, emoji: item.emoji || "🍽️", qty: 1 }];
    });
    setToast(`${item.name} added to cart`);
    setIsOpen(true);
  }, []);

  const setQty = useCallback((name: string, delta: number) => {
    setItems((prev) =>
      prev
        .map((i) => (i.name === name ? { ...i, qty: i.qty + delta } : i))
        .filter((i) => i.qty > 0)
    );
  }, []);

  const remove = useCallback((name: string) => {
    setItems((prev) => prev.filter((i) => i.name !== name));
  }, []);

  const clear = useCallback(() => setItems([]), []);

  const count = items.reduce((n, i) => n + i.qty, 0);
  const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0);
  const delivery = items.length ? DELIVERY_FEE : 0;
  const total = subtotal + delivery;

  return (
    <CartContext.Provider
      value={{
        items, count, subtotal, delivery, total, isOpen, toast,
        add, setQty, remove, clear,
        open: () => setIsOpen(true),
        close: () => setIsOpen(false),
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
