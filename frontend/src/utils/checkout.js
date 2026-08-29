export const CHECKOUT_DRAFT_KEY = 'selfSoulCheckout';
export const LAST_ORDER_KEY = 'selfSoulLastOrder';
export const ORDERS_KEY = 'selfSoulOrders';

export const PAYMENT_METHODS = [
  { id: 'upi', label: 'UPI' },
  { id: 'card', label: 'Debit or Credit Card' },
  { id: 'netbanking', label: 'Net Banking' },
  { id: 'cod', label: 'Pay on Delivery' },
];

export const emptyDraft = {
  contact: '',
  fullName: '',
  address: '',
  landmark: '',
  state: '',
  pincode: '',
  country: 'India',
  phone: '',
  saveAddress: true,
  paymentMethod: 'upi',
  paymentDetail: '',
  promoCode: '',
  promoApplied: '',
};

export function readJson(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

export function writeJson(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function readDraft() {
  return { ...emptyDraft, ...readJson(CHECKOUT_DRAFT_KEY, {}) };
}

export function writeDraft(draft) {
  writeJson(CHECKOUT_DRAFT_KEY, draft);
}

export function paymentLabel(method) {
  return PAYMENT_METHODS.find((item) => item.id === method)?.label || 'Payment';
}

export function formatPayment(draft) {
  if (draft.paymentMethod === 'cod') return 'Pay on Delivery';
  if (draft.paymentMethod === 'upi') return draft.paymentDetail ? `UPI — ${draft.paymentDetail}` : 'UPI';
  if (draft.paymentMethod === 'card') return 'Debit or Credit Card';
  if (draft.paymentMethod === 'netbanking') {
    return draft.paymentDetail ? `Net Banking — ${draft.paymentDetail}` : 'Net Banking';
  }
  return paymentLabel(draft.paymentMethod);
}

export function formatAddress(draft) {
  return [draft.address, draft.landmark, draft.state, draft.pincode, draft.country]
    .map((part) => String(part || '').trim())
    .filter(Boolean)
    .join(', ');
}

export function computeTotals(subtotal, draft) {
  const shipping = String(draft.pincode || '').trim().length >= 4 ? 42 : 0;
  const promo = String(draft.promoApplied || '').trim().toUpperCase();
  const discount = promo === 'NEW20' ? Math.round(subtotal * 0.2) : 0;
  const total = Math.max(0, subtotal + shipping - discount);
  return { shipping, discount, total, promo };
}

export function contactLooksValid(value) {
  const text = String(value || '').trim();
  return /^\S+@\S+\.\S+$/.test(text) || /^[0-9]{10}$/.test(text.replace(/\s+/g, ''));
}
