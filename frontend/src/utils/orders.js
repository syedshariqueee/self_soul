import { LAST_ORDER_KEY, ORDERS_KEY, formatAddress, formatPayment, readJson, writeJson } from './checkout';

export const TRACKING_STEPS = [
  'Order Placed',
  'Ready to Ship',
  'Dispatched',
  'Out for Delivery',
  'Delivered',
];

export function readOrders() {
  return readJson(ORDERS_KEY, []);
}

export function getOrderById(id) {
  if (!id) return null;
  const fromList = readOrders().find((order) => String(order.id) === String(id));
  if (fromList) return fromList;
  const last = readJson(LAST_ORDER_KEY, null);
  return last && String(last.id) === String(id) ? last : null;
}

export function patchOrder(id, updates) {
  const orders = readOrders().map((order) =>
    String(order.id) === String(id) ? { ...order, ...updates } : order
  );
  writeJson(ORDERS_KEY, orders);
  const last = readJson(LAST_ORDER_KEY, null);
  if (last && String(last.id) === String(id)) {
    writeJson(LAST_ORDER_KEY, { ...last, ...updates });
  }
  return getOrderById(id);
}

export function ordersForUser(email) {
  const all = readOrders();
  if (!email) return all;
  const mine = all.filter(
    (order) => !order.userEmail || order.userEmail.toLowerCase() === email.toLowerCase()
  );
  return mine.length ? mine : all;
}

export function addDays(iso, days) {
  const date = new Date(iso);
  date.setDate(date.getDate() + days);
  return date;
}

export function formatHeadlineDate(date) {
  return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'long' }).toUpperCase();
}

export function formatPlacedDate(iso) {
  const date = new Date(iso);
  return `${date.getDate()}/${date.getMonth() + 1}/${String(date.getFullYear()).slice(-2)}`;
}

export function trackingIdFor(order) {
  if (order?.trackingId) return order.trackingId;
  const digits = String(order?.id || '').replace(/\D/g, '').padStart(10, '0').slice(-10);
  return `2016${digits}`;
}

export function displayStatus(order) {
  if (order.status === 'cancelled' || order.status === 'return_requested' || order.status === 'delivered') {
    return order.status;
  }
  const days = (Date.now() - new Date(order.placedAt).getTime()) / 86400000;
  if (days >= 8) return 'delivered';
  if (days >= 3) return 'shipped';
  return 'placed';
}

export function trackingIndex(status) {
  if (status === 'delivered') return 4;
  if (status === 'shipped') return 2;
  return 1;
}

export function orderHeadline(order) {
  const status = displayStatus(order);
  if (status === 'cancelled' || status === 'return_requested') {
    const when = order.cancelledAt || order.returnedAt || order.placedAt;
    return `ESTIMATED RETURN ON ${formatHeadlineDate(addDays(when, 2))}`;
  }
  if (status === 'delivered') {
    return `DELIVERED ON ${formatHeadlineDate(addDays(order.placedAt, 5))}`;
  }
  return `ESTIMATED DELIVERY ${formatHeadlineDate(addDays(order.placedAt, 11))}`;
}

export function orderSubline(order) {
  const status = displayStatus(order);
  if (status === 'cancelled') {
    return `Order cancelled on: ${formatPlacedDate(order.cancelledAt || order.placedAt)}`;
  }
  if (status === 'return_requested') {
    return `Return requested on: ${formatPlacedDate(order.returnedAt || order.placedAt)}`;
  }
  return `Order Placed on: ${formatPlacedDate(order.placedAt)}`;
}

export function orderAddress(order) {
  const customer = order.customer || {};
  const name = customer.fullName || '';
  const lines = formatAddress(customer);
  return { name, lines, phone: customer.mobile || '' };
}

export function orderPaymentLabel(order) {
  return formatPayment({
    paymentMethod: order.paymentMethod,
    paymentDetail: order.paymentDetail,
  });
}
