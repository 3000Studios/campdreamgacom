import type { ReactNode } from 'react';
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

import { getProductBySlug } from '@/content/products';

export interface CartItem {
  productSlug: string;
  quantity: number;
}

interface CartContextValue {
  addItem: (productSlug: string, quantity?: number) => void;
  clear: () => void;
  items: CartItem[];
  removeItem: (productSlug: string) => void;
  setQuantity: (productSlug: string, quantity: number) => void;
  subtotalDisplay: string;
  totalItems: number;
}

const cartStorageKey = 'campdream-store-cart';
const CartContext = createContext<CartContextValue | undefined>(undefined);

const formatUsd = (amount: number): string =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);

const clampQuantity = (value: number): number => Math.max(1, Math.min(99, Math.floor(value)));

const safeParseStored = (raw: string | null): CartItem[] => {
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed
      .map((entry) => {
        if (!entry || typeof entry !== 'object') return null;
        const productSlug = (entry as { productSlug?: unknown }).productSlug;
        const quantity = (entry as { quantity?: unknown }).quantity;
        if (typeof productSlug !== 'string' || productSlug.trim().length === 0) return null;
        if (typeof quantity !== 'number' || !Number.isFinite(quantity)) return null;
        return { productSlug, quantity: clampQuantity(quantity) } satisfies CartItem;
      })
      .filter((entry): entry is CartItem => Boolean(entry));
  } catch {
    return [];
  }
};

export const CartProvider = ({ children }: { children: ReactNode }): JSX.Element => {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    setItems(safeParseStored(window.localStorage.getItem(cartStorageKey)));
  }, []);

  useEffect(() => {
    window.localStorage.setItem(cartStorageKey, JSON.stringify(items));
  }, [items]);

  const setQuantity = useCallback((productSlug: string, quantity: number) => {
    setItems((current) => {
      const nextQuantity = clampQuantity(quantity);
      const exists = current.some((item) => item.productSlug === productSlug);
      if (!exists) {
        return [...current, { productSlug, quantity: nextQuantity }];
      }
      return current.map((item) =>
        item.productSlug === productSlug ? { ...item, quantity: nextQuantity } : item,
      );
    });
  }, []);

  const addItem = useCallback(
    (productSlug: string, quantity = 1) => {
      setItems((current) => {
        const nextQuantity = clampQuantity(quantity);
        const existing = current.find((item) => item.productSlug === productSlug);
        if (!existing) {
          return [...current, { productSlug, quantity: nextQuantity }];
        }
        return current.map((item) =>
          item.productSlug === productSlug
            ? { ...item, quantity: clampQuantity(item.quantity + nextQuantity) }
            : item,
        );
      });
    },
    [setItems],
  );

  const removeItem = useCallback((productSlug: string) => {
    setItems((current) => current.filter((item) => item.productSlug !== productSlug));
  }, []);

  const clear = useCallback(() => setItems([]), []);

  const contextValue = useMemo<CartContextValue>(() => {
    const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
    const subtotal = items.reduce((sum, item) => {
      const product = getProductBySlug(item.productSlug);
      if (!product) return sum;
      return sum + product.price.amount * item.quantity;
    }, 0);

    return {
      addItem,
      clear,
      items,
      removeItem,
      setQuantity,
      subtotalDisplay: formatUsd(subtotal),
      totalItems,
    };
  }, [addItem, clear, items, removeItem, setQuantity]);

  return <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>;
};

export const useCart = (): CartContextValue => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider.');
  }
  return context;
};
