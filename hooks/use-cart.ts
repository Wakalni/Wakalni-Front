import { create } from "zustand";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  restaurantId: string;
  supplements?: Array<{
    id: string;
    name: string;
    price: number;
  }>;
}

interface CartStore {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "quantity">, quantity?: number) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

export const useCart = create<CartStore>((set, get) => ({
  items: [],

  addItem: (newItem, quantity = 1) =>
    set((state) => {
      const supplementsKey =
        newItem.supplements
          ?.map(({ id }) => id)
          .sort()
          .join(",") || "";
      const uniqueId = `${newItem.id}_${supplementsKey}`;
      const existingItem = state.items.find(
        (item) =>
          item.id === newItem.id &&
          JSON.stringify(item.supplements) ===
            JSON.stringify(newItem.supplements)
      );

      if (existingItem) {
        return {
          items: state.items.map((item) =>
            item.id === existingItem.id &&
            JSON.stringify(item.supplements) ===
              JSON.stringify(existingItem.supplements)
              ? { ...item, quantity: item.quantity + quantity }
              : item
          ),
        };
      } else {
        return {
          items: [...state.items, { ...newItem, quantity, id: uniqueId }],
        };
      }
    }),

  removeItem: (id) =>
    set((state) => ({
      items: state.items.filter((item) => item.id !== id),
    })),

  updateQuantity: (id, quantity) =>
    set((state) => {
      if (quantity <= 0) {
        return {
          items: state.items.filter((item) => item.id !== id),
        };
      }

      return {
        items: state.items.map((item) =>
          item.id === id ? { ...item, quantity } : item
        ),
      };
    }),

  clearCart: () => set({ items: [] }),

  getTotalItems: () => {
    const state = get();
    return state.items.reduce((total, item) => total + item.quantity, 0);
  },

  getTotalPrice: () => {
    const state = get();
    return state.items.reduce((total, item) => {
      const supplementsTotal =
        item.supplements?.reduce((sum, { price }) => sum + price, 0) || 0;
      return total + (item.price + supplementsTotal) * item.quantity;
    }, 0);
  },
}));
