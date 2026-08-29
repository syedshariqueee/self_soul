const otps = new Map();
const users = new Map();
let nextId = 1;

export function isDbUnreachable(error) {
  const code = error?.code || error?.cause?.code || '';
  const message = String(error?.message || '');
  return (
    ['EHOSTUNREACH', 'ETIMEDOUT', 'ECONNREFUSED', 'ENOTFOUND', 'PROTOCOL_CONNECTION_LOST'].includes(code) ||
    /EHOSTUNREACH|ETIMEDOUT|ECONNREFUSED/.test(message)
  );
}

export function saveMemoryOtp(email, otpCode, expiresAt) {
  otps.set(email, { otpCode, expiresAt: new Date(expiresAt).getTime() });
}

export function consumeMemoryOtp(email, otpCode) {
  const entry = otps.get(email);
  if (!entry || entry.otpCode !== otpCode || Date.now() > entry.expiresAt) {
    return false;
  }
  otps.delete(email);
  return true;
}

export function upsertMemoryUser(email, fields = {}) {
  const existing = users.get(email) || {
    id: nextId++,
    fullName: null,
    email,
    mobile: null,
  };
  const user = { ...existing, ...fields, email };
  users.set(email, user);
  return user;
}

export function getMemoryUser(email) {
  return users.get(email) || null;
}
