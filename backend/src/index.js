import cors from 'cors';
import express from 'express';
import { checkDatabaseConnection, pool } from './db.js';

const app = express();
const port = Number(process.env.PORT || 5000);

app.use(cors({ origin: process.env.CLIENT_ORIGIN || 'http://localhost:5173' }));
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

    res.status(201).json({
      ok: true,
      message: 'OTP created',
      devOtp: process.env.NODE_ENV === 'production' ? undefined : otpCode,
    });
  } catch (error) {
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

    const [users] = await pool.query(
      'SELECT id, full_name AS fullName, email, mobile FROM users WHERE email = ? LIMIT 1',
      [email]
    );
    const user = users[0];

    res.json({
      ok: true,
      user,
      requiresProfile: !user.fullName || !user.mobile,
    });
  } catch (error) {
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

    const [users] = await pool.query(
      'SELECT id, full_name AS fullName, email, mobile FROM users WHERE email = ? LIMIT 1',
      [email]
    );

    res.json({ ok: true, user: users[0] });
  } catch (error) {
    if (error?.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({ ok: false, error: 'This mobile number is already registered' });
    }

    res.status(500).json({
      ok: false,
      error: error instanceof Error ? error.message : 'Could not update profile',
    });
  }
});

const server = app.listen(port, () => {
  console.log(`API server running on http://localhost:${port}`);
});

async function shutdown() {
  server.close(async () => {
    await pool.end();
    process.exit(0);
  });
}

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
