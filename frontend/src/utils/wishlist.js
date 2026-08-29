import { AUTH_EVENT, accountKey, readAuthUser } from './auth';
import { queueSaveAccountWishlist } from './accountLists';

export const WISHLIST_KEY = 'selfSoulWishlist';
export const WISHLIST_EVENT = 'selfsoul-wishlist';

function storageKey() {
  return accountKey(WISHLIST_KEY);
}

export function readWishlistIds() {
  const key = storageKey();
  if (!key) return [];
  try {
    const raw = localStorage.getItem(key);
    const ids = raw ? JSON.parse(raw) : [];
    return Array.isArray(ids) ? ids : [];
  } catch {
    return [];
  }
}

export function writeWishlistIds(ids, { persistRemote = true } = {}) {
  const key = storageKey();
  if (!key) {
    window.dispatchEvent(new Event(WISHLIST_EVENT));
    return;
  }
  const next = Array.isArray(ids) ? ids : [];
  localStorage.setItem(key, JSON.stringify(next));
  window.dispatchEvent(new Event(WISHLIST_EVENT));
  if (persistRemote) queueSaveAccountWishlist(next);
}

export function replaceLocalWishlistIds(ids) {
  writeWishlistIds(ids, { persistRemote: false });
}

export function isWishlisted(id) {
  return readWishlistIds().includes(id);
}

export function toggleWishlistId(id) {
  if (!readAuthUser()) return false;
  const ids = readWishlistIds();
  const next = ids.includes(id) ? ids.filter((item) => item !== id) : [...ids, id];
  writeWishlistIds(next);
  return next.includes(id);
}

export function removeWishlistId(id) {
  if (!readAuthUser()) return;
  writeWishlistIds(readWishlistIds().filter((item) => item !== id));
}

if (typeof window !== 'undefined') {
  window.addEventListener(AUTH_EVENT, () => {
    window.dispatchEvent(new Event(WISHLIST_EVENT));
  });
}
