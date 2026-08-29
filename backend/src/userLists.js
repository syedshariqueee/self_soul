import { pool } from './db.js';

export function parseEmail(value) {
  const email = String(value || '').trim().toLowerCase();
  if (!email || !/^\S+@\S+\.\S+$/.test(email)) return null;
  return email;
}

export function asArray(value) {
  if (Array.isArray(value)) return value;
  if (typeof value === 'string') {
    try {
      const parsed = JSON.parse(value);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }
  return [];
}

export function normalizeCartItems(items) {
  if (!Array.isArray(items)) return [];
  return items
    .map((item) => ({
      id: Number(item?.id) || 0,
      slug: String(item?.slug || '').slice(0, 220),
      title: String(item?.title || '').slice(0, 180),
      price: Number(item?.price) || 0,
      image: String(item?.image || '').slice(0, 500),
      qty: Math.min(99, Math.max(1, Number(item?.qty) || 1)),
    }))
    .filter((item) => item.id > 0)
    .slice(0, 50);
}

export function normalizeWishlistIds(ids) {
  if (!Array.isArray(ids)) return [];
  return [...new Set(ids.map((id) => Number(id) || 0).filter((id) => id > 0))].slice(0, 100);
}

let tableReady = false;

export async function ensureUserListsTable() {
  if (tableReady) return;
  try {
    await pool.query(`
    CREATE TABLE IF NOT EXISTS user_lists (
      user_id BIGINT UNSIGNED NOT NULL,
      cart_items JSON NOT NULL,
      wishlist_ids JSON NOT NULL,
      created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      PRIMARY KEY (user_id),
      CONSTRAINT fk_user_lists_user
        FOREIGN KEY (user_id) REFERENCES users (id)
        ON DELETE CASCADE
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  `);
  } catch (error) {
    if (error?.code !== 'ER_TABLE_EXISTS_ERROR' && error?.errno !== 1050) {
      throw error;
    }
  }
  tableReady = true;
}

export async function getUserByEmail(email) {
  const [users] = await pool.query(
    'SELECT id, full_name AS fullName, email, mobile FROM users WHERE email = ? LIMIT 1',
    [email]
  );
  return users[0] || null;
}

export async function ensureUserLists(userId) {
  await ensureUserListsTable();
  await pool.query(
    'INSERT IGNORE INTO user_lists (user_id, cart_items, wishlist_ids) VALUES (?, ?, ?)',
    [userId, JSON.stringify([]), JSON.stringify([])]
  );
}

export async function getUserLists(userId) {
  await ensureUserLists(userId);
  const [rows] = await pool.query(
    'SELECT cart_items, wishlist_ids FROM user_lists WHERE user_id = ? LIMIT 1',
    [userId]
  );
  const row = rows[0] || {};
  return {
    cart: normalizeCartItems(asArray(row.cart_items)),
    wishlist: normalizeWishlistIds(asArray(row.wishlist_ids)),
  };
}

export async function saveUserCart(userId, items) {
  await ensureUserLists(userId);
  const cart = normalizeCartItems(items);
  await pool.query(
    'UPDATE user_lists SET cart_items = ?, updated_at = NOW() WHERE user_id = ?',
    [JSON.stringify(cart), userId]
  );
  return cart;
}

export async function saveUserWishlist(userId, ids) {
  await ensureUserLists(userId);
  const wishlist = normalizeWishlistIds(ids);
  await pool.query(
    'UPDATE user_lists SET wishlist_ids = ?, updated_at = NOW() WHERE user_id = ?',
    [JSON.stringify(wishlist), userId]
  );
  return wishlist;
}
