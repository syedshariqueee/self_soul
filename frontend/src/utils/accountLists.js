import { apiRequest } from './api';
import { readAuthUser } from './auth';

function currentEmail() {
  return readAuthUser()?.email?.trim().toLowerCase() || '';
}

export async function fetchAccountLists() {
  const email = currentEmail();
  if (!email) return { cart: [], wishlist: [] };
  const data = await apiRequest(`/api/account/lists?email=${encodeURIComponent(email)}`);
  return {
    cart: Array.isArray(data.cart) ? data.cart : [],
    wishlist: Array.isArray(data.wishlist) ? data.wishlist : [],
  };
}

export async function saveAccountCart(items) {
  const email = currentEmail();
  if (!email) return;
  await apiRequest('/api/account/cart', {
    method: 'PUT',
    body: JSON.stringify({ email, items }),
  });
}

export async function saveAccountWishlist(ids) {
  const email = currentEmail();
  if (!email) return;
  await apiRequest('/api/account/wishlist', {
    method: 'PUT',
    body: JSON.stringify({ email, ids }),
  });
}

let cartSaveTimer;
export function queueSaveAccountCart(items) {
  window.clearTimeout(cartSaveTimer);
  cartSaveTimer = window.setTimeout(() => {
    saveAccountCart(items).catch(() => {});
  }, 400);
}

let wishlistSaveTimer;
export function queueSaveAccountWishlist(ids) {
  window.clearTimeout(wishlistSaveTimer);
  wishlistSaveTimer = window.setTimeout(() => {
    saveAccountWishlist(ids).catch(() => {});
  }, 400);
}
