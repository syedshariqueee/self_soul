export const AUTH_USER_STORAGE_KEY = 'selfSoulUser';
export const AUTH_EVENT = 'selfsoul-auth';

export function readAuthUser() {
  try {
    const stored = localStorage.getItem(AUTH_USER_STORAGE_KEY);
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
}

export function accountKey(prefix) {
  const email = readAuthUser()?.email;
  if (!email) return null;
  return `${prefix}:${email.toLowerCase()}`;
}

function takeLegacy(key) {
  try {
    const raw = localStorage.getItem(key);
    localStorage.removeItem(key);
    return raw ? JSON.parse(raw) : null;
  } catch {
    localStorage.removeItem(key);
    return null;
  }
}

export function migrateAccountStorage(user = readAuthUser()) {
  const email = user?.email?.toLowerCase();
  if (!email) return;

  const legacyCart = takeLegacy('selfSoulCart');
  const cartKey = `selfSoulCart:${email}`;
  if (Array.isArray(legacyCart) && legacyCart.length && !localStorage.getItem(cartKey)) {
    localStorage.setItem(cartKey, JSON.stringify(legacyCart));
  }

  const legacyWishlist = takeLegacy('selfSoulWishlist');
  const wishlistKey = `selfSoulWishlist:${email}`;
  if (Array.isArray(legacyWishlist) && legacyWishlist.length && !localStorage.getItem(wishlistKey)) {
    localStorage.setItem(wishlistKey, JSON.stringify(legacyWishlist));
  }
}

export function saveAuthUser(user) {
  localStorage.setItem(AUTH_USER_STORAGE_KEY, JSON.stringify(user));
  migrateAccountStorage(user);
  window.dispatchEvent(new Event(AUTH_EVENT));
}

export function clearAuthUser() {
  localStorage.removeItem(AUTH_USER_STORAGE_KEY);
  window.dispatchEvent(new Event(AUTH_EVENT));
}

export function safeNextPath(value) {
  if (!value || !value.startsWith('/') || value.startsWith('//') || value.startsWith('/login')) {
    return '/';
  }
  return value;
}
