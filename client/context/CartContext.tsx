import { ReactNode, createContext, useContext, useMemo, useState } from "react";
import { toast } from "sonner";

export type CartItem = { name: string; weight: string; qty: number };

const MIN_QTY_LIMIT = 5;
const MAX_QTY_LIMIT = 10;
const SUPPORT_EMAIL = "support@pariyanioceans.store";

function hashKey(key: string): number {
  let hash = 0;
  for (let i = 0; i < key.length; i++)
    hash = (hash * 31 + key.charCodeAt(i)) >>> 0;
  return hash;
}

export function getQtyLimit(name: string, weight: string): number {
  const range = MAX_QTY_LIMIT - MIN_QTY_LIMIT + 1;
  return MIN_QTY_LIMIT + (hashKey(`${name}-${weight}`) % range);
}

type CartContextValue = {
  items: CartItem[];
  cartCount: number;
  addItem: (name: string, weight: string) => void;
  decrementItem: (name: string, weight: string) => void;
  removeItem: (name: string, weight: string) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  const addItem = (name: string, weight: string) => {
    const limit = getQtyLimit(name, weight);
    let limitReached = false;
    setItems((current) => {
      const existing = current.find(
        (item) => item.name === name && item.weight === weight,
      );
      if (existing) {
        if (existing.qty >= limit) {
          limitReached = true;
          return current;
        }
        return current.map((item) =>
          item === existing ? { ...item, qty: item.qty + 1 } : item,
        );
      }
      return [...current, { name, weight, qty: 1 }];
    });
    if (limitReached) {
      toast.error(
        `Only ${limit} ${weight} pack(s) of "${name}" can be added here. Email ${SUPPORT_EMAIL} to order more.`,
        {
          style: {
            background: "#dc2626",
            color: "#fff",
            border: "1px solid #b91c1c",
          },
        },
      );
      return;
    }
    toast(`${name} (${weight}) added to cart`);
  };

  const decrementItem = (name: string, weight: string) => {
    setItems((current) =>
      current
        .map((item) =>
          item.name === name && item.weight === weight
            ? { ...item, qty: item.qty - 1 }
            : item,
        )
        .filter((item) => item.qty > 0),
    );
  };

  const removeItem = (name: string, weight: string) => {
    setItems((current) =>
      current.filter((item) => !(item.name === name && item.weight === weight)),
    );
    toast(`${name} (${weight}) removed from cart`);
  };

  const clearCart = () => setItems([]);

  const cartCount = useMemo(
    () => items.reduce((total, item) => total + item.qty, 0),
    [items],
  );

  return (
    <CartContext.Provider
      value={{ items, cartCount, addItem, decrementItem, removeItem, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
}
