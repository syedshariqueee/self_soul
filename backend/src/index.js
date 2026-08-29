import cors from 'cors';
import express from 'express';
import { checkDatabaseConnection, pool } from './db.js';
import {
  ensureUserLists,
  ensureUserListsTable,
  getUserByEmail,
  getUserLists,
  parseEmail,
  saveUserCart,
  saveUserWishlist,
} from './userLists.js';
import {
  consumeMemoryOtp,
  isDbUnreachable,
  saveMemoryOtp,
  upsertMemoryUser,
} from './memoryAuth.js';

const app = express();
const port = Number(process.env.PORT || 5000);

const allowedOrigins = (
  process.env.CLIENT_ORIGIN ||
  'https://self-soul-fb6x.vercel.app,https://blue-opossum-562849.hostingersite.com,https://mediumblue-curlew-218317.hostingersite.com,http://localhost:5173,http://localhost:5174'
)
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

function isAllowedOrigin(origin) {
  if (!origin) return true;
  if (allowedOrigins.includes(origin)) return true;
  if (/^http:\/\/(localhost|127\.0\.0\.1):\d+$/.test(origin)) return true;
  if (/^https:\/\/[a-z0-9-]+\.hostingersite\.com$/i.test(origin)) return true;
  return false;
}

app.use(
  cors({
    origin(origin, callback) {
      callback(null, isAllowedOrigin(origin));
    },
  })
);
app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({ ok: true });
});

app.get('/api/health/db', async (_req, res) => {
  try {
    const database = await checkDatabaseConnection();
    res.json({ ok: true, database });
  } catch (error) {
    res.status(500).json({
      ok: false,
      error: error instanceof Error ? error.message : 'Database connection failed',
    });
  }
});

app.post('/api/auth/request-otp', async (req, res) => {
  const email = String(req.body?.email || '').trim().toLowerCase();

  if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
    return res.status(400).json({ ok: false, error: 'Valid email is required' });
  }

  const otpCode = String(Math.floor(100000 + Math.random() * 900000));
  const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

  try {
    await pool.query(
      'INSERT INTO login_otps (email, otp_code, expires_at) VALUES (?, ?, ?)',
      [email, otpCode, expiresAt]
    );

    console.log(`OTP for ${email}: ${otpCode}`);
    res.status(201).json({
      ok: true,
      message: 'OTP created',
      devOtp: process.env.NODE_ENV === 'production' && process.env.EXPOSE_OTP !== 'true' ? undefined : otpCode,
    });
  } catch (error) {
    if (isDbUnreachable(error)) {
      saveMemoryOtp(email, otpCode, expiresAt);
      console.log(`OTP for ${email}: ${otpCode}`);
      return res.status(201).json({
        ok: true,
        message: 'OTP created',
        devOtp: process.env.EXPOSE_OTP === 'false' ? undefined : otpCode,
      });
    }
    res.status(500).json({
      ok: false,
      error: error instanceof Error ? error.message : 'Could not create OTP',
    });
  }
});

app.post('/api/auth/verify-otp', async (req, res) => {
  const email = String(req.body?.email || '').trim().toLowerCase();
  const otpCode = String(req.body?.otp || '').trim();

  if (!email || !/^\S+@\S+\.\S+$/.test(email) || !/^\d{6}$/.test(otpCode)) {
    return res.status(400).json({ ok: false, error: 'Valid email and OTP are required' });
  }

  try {
    const [otps] = await pool.query(
      `SELECT id
       FROM login_otps
       WHERE email = ?
         AND otp_code = ?
         AND verified_at IS NULL
         AND expires_at > NOW()
       ORDER BY created_at DESC
       LIMIT 1`,
      [email, otpCode]
    );

    if (otps.length === 0) {
      return res.status(401).json({ ok: false, error: 'Incorrect or expired OTP' });
    }

    await pool.query('UPDATE login_otps SET verified_at = NOW() WHERE id = ?', [otps[0].id]);
    await pool.query(
      `INSERT INTO users (email, email_verified_at)
       VALUES (?, NOW())
       ON DUPLICATE KEY UPDATE email_verified_at = NOW(), updated_at = NOW()`,
      [email]
    );

    const user = await getUserByEmail(email);
    const lists = await getUserLists(user.id);

    res.json({
      ok: true,
      user,
      cart: lists.cart,
      wishlist: lists.wishlist,
      requiresProfile: !user.fullName || !user.mobile,
    });
  } catch (error) {
    if (isDbUnreachable(error) && consumeMemoryOtp(email, otpCode)) {
      const user = upsertMemoryUser(email);
      return res.json({
        ok: true,
        user,
        cart: [],
        wishlist: [],
        requiresProfile: !user.fullName || !user.mobile,
      });
    }
    res.status(500).json({
      ok: false,
      error: error instanceof Error ? error.message : 'Could not verify OTP',
    });
  }
});

app.put('/api/auth/profile', async (req, res) => {
  const email = String(req.body?.email || '').trim().toLowerCase();
  const fullName = String(req.body?.fullName || '').trim();
  const mobile = String(req.body?.mobile || '').trim();

  if (!email || !/^\S+@\S+\.\S+$/.test(email) || !fullName || mobile.length < 10) {
    return res.status(400).json({ ok: false, error: 'Valid name, email, and mobile are required' });
  }

  try {
    await pool.query(
      `INSERT INTO users (full_name, email, mobile, email_verified_at)
       VALUES (?, ?, ?, NOW())
       ON DUPLICATE KEY UPDATE full_name = VALUES(full_name), mobile = VALUES(mobile), updated_at = NOW()`,
      [fullName, email, mobile]
    );

    const user = await getUserByEmail(email);
    await ensureUserLists(user.id);
    const lists = await getUserLists(user.id);

    res.json({ ok: true, user, cart: lists.cart, wishlist: lists.wishlist });
  } catch (error) {
    if (error?.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({ ok: false, error: 'This mobile number is already registered' });
    }
    if (isDbUnreachable(error)) {
      const user = upsertMemoryUser(email, { fullName, mobile });
      return res.json({ ok: true, user, cart: [], wishlist: [] });
    }

    res.status(500).json({
      ok: false,
      error: error instanceof Error ? error.message : 'Could not update profile',
    });
  }
});

async function requireUserByEmail(req, res) {
  const email = parseEmail(req.body?.email || req.query?.email);
  if (!email) {
    res.status(400).json({ ok: false, error: 'Valid email is required' });
    return null;
  }

  const user = await getUserByEmail(email);
  if (!user) {
    res.status(404).json({ ok: false, error: 'Account not found' });
    return null;
  }

  return user;
}

app.get('/api/account/lists', async (req, res) => {
  try {
    const user = await requireUserByEmail(req, res);
    if (!user) return;
    const lists = await getUserLists(user.id);
    res.json({ ok: true, cart: lists.cart, wishlist: lists.wishlist });
  } catch (error) {
    res.status(500).json({
      ok: false,
      error: error instanceof Error ? error.message : 'Could not load cart and wishlist',
    });
  }
});

app.put('/api/account/cart', async (req, res) => {
  try {
    const user = await requireUserByEmail(req, res);
    if (!user) return;
    const cart = await saveUserCart(user.id, req.body?.items);
    res.json({ ok: true, cart });
  } catch (error) {
    res.status(500).json({
      ok: false,
      error: error instanceof Error ? error.message : 'Could not save cart',
    });
  }
});

app.put('/api/account/wishlist', async (req, res) => {
  try {
    const user = await requireUserByEmail(req, res);
    if (!user) return;
    const wishlist = await saveUserWishlist(user.id, req.body?.ids);
    res.json({ ok: true, wishlist });
  } catch (error) {
    res.status(500).json({
      ok: false,
      error: error instanceof Error ? error.message : 'Could not save wishlist',
    });
  }
});

const server = app.listen(port, '0.0.0.0', () => {
  console.log(`API server running on port ${port}`);
});

ensureUserListsTable().catch((error) => {
  const host = `${process.env.DB_HOST}:${process.env.DB_PORT}`;
  console.error('Could not prepare user_lists table:', error instanceof Error ? error.message : error);
  console.error(
    `MySQL at ${host} is not reachable from this machine. If this is Cloud SQL, add this PC's public IP to Authorized networks (Connections), then restart the API.`
  );
});

async function shutdown() {
  server.close(async () => {
    await pool.end();
    process.exit(0);
  });
}

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
