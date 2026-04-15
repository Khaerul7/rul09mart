import { create } from "zustand";
import { Product } from "./data";

export type CartItem = {
  product: Product;
  qty: number;
};

type CartStore = {
  items: CartItem[];
  add: (product: Product) => void;
  remove: (id: string) => void;
  increment: (id: string) => void;
  decrement: (id: string) => void;
  clear: () => void;
  total: () => number;
  count: () => number;
};

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],

  add: (product) =>
    set((s) => {
      const existing = s.items.find((i) => i.product.id === product.id);
      if (existing) {
        return { items: s.items.map((i) => i.product.id === product.id ? { ...i, qty: i.qty + 1 } : i) };
      }
      return { items: [...s.items, { product, qty: 1 }] };
    }),

  remove: (id) => set((s) => ({ items: s.items.filter((i) => i.product.id !== id) })),

  increment: (id) =>
    set((s) => ({ items: s.items.map((i) => i.product.id === id ? { ...i, qty: i.qty + 1 } : i) })),

  decrement: (id) =>
    set((s) => ({
      items: s.items
        .map((i) => i.product.id === id ? { ...i, qty: i.qty - 1 } : i)
        .filter((i) => i.qty > 0),
    })),

  clear: () => set({ items: [] }),

  total: () => get().items.reduce((acc, i) => acc + i.product.price * i.qty, 0),

  count: () => get().items.reduce((acc, i) => acc + i.qty, 0),
}));
