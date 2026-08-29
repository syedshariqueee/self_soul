import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { BATH_PRODUCTS } from '../data/products';
import { LAST_ORDER_KEY, ORDERS_KEY, writeJson, readJson as readStored } from '../utils/checkout';
import { AUTH_EVENT, accountKey, migrateAccountStorage, readAuthUser } from '../utils/auth';
import { fetchAccountLists, queueSaveAccountCart, queueSaveAccountWishlist, saveAccountCart } from '../utils/accountLists';
import { readWishlistIds, replaceLocalWishlistIds } from '../utils/wishlist';

export const CART_KEY = 'selfSoulCart';

function cartStorageKey() {
  return accountKey(CART_KEY);
}

function loadCartItems() {
  const key = cartStorageKey();
  if (!key) return [];
  return hydrateItems(readJson(key, []));
}

function readJson(key, fallback) {
  return readStored(key, fallback);
}

function productPitch(product) {
  if (product?.benefits?.length) {
    return product.benefits
      .slice(0, 3)
      .map((line) => line.replace(/\.$/, ''))
      .join('. ');
  }
  return (product?.subtitle || '').replace(/^With\s+/i, '');
}

function hydrateItems(items) {
  if (!Array.isArray(items)) return [];

  return items
    .map((item) => {
      const product = BATH_PRODUCTS.find((entry) => entry.id === item.id);
      const qty = Math.max(1, Number(item.qty) || 1);
      if (!product) {
        return {
          id: item.id,
          slug: item.slug,
          title: item.title,
          price: Number(item.price) || 0,
          image: item.image,
          qty,
        };
      }
      return {
        id: product.id,
        slug: product.slug,
        title: product.title,
        price: product.price,
        image: product.image,
        size: product.size,
        pitch: productPitch(product),
        rating: product.rating || 5,
        qty,
      };
    })
    .filter((item) => item.id && item.qty > 0);
}

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => loadCartItems());
  const [isOpen, setIsOpen] = useState(false);

  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);
  const toggleCart = useCallback(() => setIsOpen((open) => !open), []);

  const persist = useCallback((updater) => {
    const key = cartStorageKey();
    if (!key) {
      setItems([]);
      return { requiresLogin: true };
    }
    setItems((current) => {
      const next = typeof updater === 'function' ? updater(current) : updater;
      const hydrated = hydrateItems(next);
      localStorage.setItem(key, JSON.stringify(hydrated));
      queueSaveAccountCart(hydrated);
      return hydrated;
    });
    return { requiresLogin: false };
  }, []);

  useEffect(() => {
    migrateAccountStorage();
    setItems(loadCartItems());

    async function syncFromAccount() {
      const user = readAuthUser();
      if (!user) {
        setItems([]);
        setIsOpen(false);
        return;
      }

      migrateAccountStorage(user);
      const localCart = loadCartItems();
      const localWishlist = readWishlistIds();

      try {
        const lists = await fetchAccountLists();
        const remoteCart = hydrateItems(lists.cart);
        const nextCart = remoteCart.length ? remoteCart : localCart;
        const key = cartStorageKey();
        if (key) localStorage.setItem(key, JSON.stringify(nextCart));
        setItems(nextCart);
        if (!remoteCart.length && localCart.length) {
          saveAccountCart(nextCart).catch(() => {});
        }

        const nextWishlist = lists.wishlist.length ? lists.wishlist : localWishlist;
        replaceLocalWishlistIds(nextWishlist);
        if (!lists.wishlist.length && localWishlist.length) {
          queueSaveAccountWishlist(nextWishlist);
        }
      } catch {
        setItems(localCart);
        replaceLocalWishlistIds(localWishlist);
      }
    }

    function sync() {
      syncFromAccount();
      if (!readAuthUser()) setIsOpen(false);
    }

    syncFromAccount();
    window.addEventListener('storage', sync);
    window.addEventListener(AUTH_EVENT, sync);
    return () => {
      window.removeEventListener('storage', sync);
      window.removeEventListener(AUTH_EVENT, sync);
    };
  }, []);

  const addItem = useCallback(
    (product, qty = 1) => {
      if (!readAuthUser()) {
        setIsOpen(false);
        return { requiresLogin: true };
      }
      const amount = Math.max(1, Number(qty) || 1);
      persist((current) =>
        current.some((item) => item.id === product.id)
          ? current.map((item) =>
              item.id === product.id ? { ...item, qty: item.qty + amount } : item
            )
          : [
              ...current,
              {
                id: product.id,
                slug: product.slug,
                title: product.title,
                price: product.price,
                image: product.image,
                size: product.size,
                pitch: productPitch(product),
                rating: product.rating || 5,
                qty: amount,
              },
            ]
      );
      setIsOpen(true);
      return { requiresLogin: false };
    },
    [persist]
  );

  const updateQty = useCallback(
    (id, qty) => {
      const nextQty = Math.max(0, Number(qty) || 0);
      persist((current) =>
        nextQty < 1
          ? current.filter((item) => item.id !== id)
          : current.map((item) => (item.id === id ? { ...item, qty: nextQty } : item))
      );
    },
    [persist]
  );

  const removeItem = useCallback(
    (id) => {
      persist((current) => current.filter((item) => item.id !== id));
    },
    [persist]
  );

  const clearCart = useCallback(() => {
    persist([]);
  }, [persist]);

  const restoreItems = useCallback(
    (nextItems) => {
      persist(nextItems || []);
    },
    [persist]
  );

  const placeOrder = useCallback(
    (details) => {
      const current = loadCartItems();
      const subtotal = current.reduce((sum, item) => sum + item.price * item.qty, 0);
      const shipping = Number(details.shipping) || 0;
      const discount = Number(details.discount) || 0;
      const order = {
        id: details.orderId || `SS${Date.now().toString().slice(-8)}`,
        placedAt: new Date().toISOString(),
        status: 'placed',
        trackingId: `2016${Date.now().toString().slice(-10)}`,
        userEmail: readAuthUser()?.email || details.customer?.email || '',
        customer: details.customer,
        paymentMethod: details.paymentMethod,
        paymentDetail: details.paymentDetail || '',
        items: current,
        subtotal,
        shipping,
        discount,
        promoCode: details.promoCode || '',
        total: Math.max(0, subtotal + shipping - discount),
      };
      const orders = readJson(ORDERS_KEY, []);
      writeJson(ORDERS_KEY, [order, ...orders]);
      writeJson(LAST_ORDER_KEY, order);
      persist([]);
      return order;
    },
    [persist]
  );

  const value = useMemo(() => {
    const visibleItems = readAuthUser() ? items : [];
    const subtotal = visibleItems.reduce((sum, item) => sum + item.price * item.qty, 0);
    const itemCount = visibleItems.reduce((sum, item) => sum + item.qty, 0);
    return {
      items: visibleItems,
      itemCount,
      subtotal,
      isOpen,
      openCart,
      closeCart,
      toggleCart,
      addItem,
      updateQty,
      removeItem,
      clearCart,
      restoreItems,
      placeOrder,
    };
  }, [items, isOpen, openCart, closeCart, toggleCart, addItem, updateQty, removeItem, clearCart, restoreItems, placeOrder]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
}
