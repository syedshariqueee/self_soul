import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CheckoutLayout from '../components/checkout/CheckoutLayout';
import OrderSummary from '../components/checkout/OrderSummary';
import { useCart } from '../context/CartContext';
import {
  PAYMENT_METHODS,
  computeTotals,
  contactLooksValid,
  emptyDraft,
  readDraft,
  writeDraft,
} from '../utils/checkout';

import { readAuthUser } from '../utils/auth';

const fieldClass =
  "mt-1 w-full rounded-md border border-[#cfc8bf] bg-transparent px-3 py-2.5 font-['Montserrat',sans-serif] text-sm outline-none placeholder:text-[#8a8a8a] focus:border-[#1a3636]";

function PaymentIcon({ id }) {
  const className = 'h-5 w-5 shrink-0';
  if (id === 'upi') {
    return (
      <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="8" />
        <path d="M8 12h8M12 8v8" />
      </svg>
    );
  }
  if (id === 'card') {
    return (
      <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="3" y="6" width="18" height="12" rx="2" />
        <path d="M3 10h18" />
      </svg>
    );
  }
  if (id === 'netbanking') {
    return (
      <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M4 10l8-6 8 6M6 10v8h12v-8M2 20h20" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="4" y="7" width="16" height="10" rx="1.5" />
      <path d="M8 12h3" />
    </svg>
  );
}

export default function Checkout() {
  const navigate = useNavigate();
  const { items, itemCount, subtotal } = useCart();
  const [form, setForm] = useState(emptyDraft);
  const [promoInput, setPromoInput] = useState('');
  const [promoMessage, setPromoMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const saved = readDraft();
    const user = readAuthUser();
    const next = {
      ...saved,
      contact: saved.contact || user?.email || user?.mobile || '',
      fullName: saved.fullName || user?.fullName || '',
      phone: saved.phone || user?.mobile || '',
    };
    setForm(next);
    setPromoInput(next.promoApplied || next.promoCode || '');
  }, []);

  useEffect(() => {
    if (items.length === 0) navigate('/', { replace: true });
  }, [items.length, navigate]);

  const totals = useMemo(() => computeTotals(subtotal, form), [subtotal, form]);

  function update(name, value) {
    setForm((current) => {
      const next = { ...current, [name]: value };
      writeDraft(next);
      return next;
    });
  }

  function applyPromo() {
    const code = promoInput.trim().toUpperCase();
    if (code === 'NEW20') {
      const next = { ...form, promoCode: code, promoApplied: 'NEW20' };
      setForm(next);
      writeDraft(next);
      setPromoMessage('NEW20 applied — 20% off');
      return;
    }
    const next = { ...form, promoCode: promoInput, promoApplied: '' };
    setForm(next);
    writeDraft(next);
    setPromoMessage(code ? 'This code is not valid.' : '');
  }

  function handleProceed(event) {
    event.preventDefault();
    if (!contactLooksValid(form.contact)) {
      setError('Enter a valid email or 10-digit phone number.');
      return;
    }
    if (!form.fullName.trim() || !form.address.trim() || !form.state.trim() || !form.pincode.trim() || !form.phone.trim()) {
      setError('Please complete your shipping address.');
      return;
    }
    if (form.paymentMethod !== 'cod' && !form.paymentDetail.trim()) {
      setError(
        form.paymentMethod === 'upi'
          ? 'Enter your UPI ID.'
          : form.paymentMethod === 'card'
            ? 'Enter your card number.'
            : 'Enter your bank name.'
      );
      return;
    }
    writeDraft(form);
    setError('');
    navigate('/checkout/review');
  }

  const extraLabel =
    form.paymentMethod === 'upi'
      ? 'UPI ID'
      : form.paymentMethod === 'card'
        ? 'Card number'
        : form.paymentMethod === 'netbanking'
          ? 'Bank name'
          : '';

  return (
    <CheckoutLayout>
      <section className="px-4 py-10 sm:px-6 md:px-10 lg:px-14">
        <h1 className="text-center font-['Montserrat',sans-serif] text-2xl font-semibold uppercase tracking-[0.14em] text-[#1a3636] sm:text-[28px]">
          Checkout
        </h1>

        <div className="mx-auto mt-10 grid max-w-[1100px] grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(280px,0.85fr)] lg:gap-0">
          <form
            onSubmit={handleProceed}
            className="font-['Montserrat',sans-serif] lg:pr-10"
          >
            <div className="flex items-end justify-between">
              <h2 className="text-xs font-semibold uppercase tracking-[0.14em]">Contact</h2>
              {readAuthUser() ? (
                <span className="text-xs text-[#6b756f]">Logged in</span>
              ) : (
                <Link to="/login?next=/checkout" className="text-xs uppercase tracking-wide underline underline-offset-4">
                  Log in
                </Link>
              )}
            </div>
            <input
              value={form.contact}
              onChange={(event) => update('contact', event.target.value)}
              placeholder="Email ID or Phone Number"
              className={`${fieldClass} mt-3`}
            />

            <h2 className="mt-8 text-xs font-semibold uppercase tracking-[0.14em]">Address</h2>
            <input
              value={form.fullName}
              onChange={(event) => update('fullName', event.target.value)}
              placeholder="Full Name"
              className={`${fieldClass} mt-3`}
            />
            <input
              value={form.address}
              onChange={(event) => update('address', event.target.value)}
              placeholder="Address"
              className={fieldClass}
            />
            <input
              value={form.landmark}
              onChange={(event) => update('landmark', event.target.value)}
              placeholder="Landmark (optional)"
              className={fieldClass}
            />
            <div className="mt-1 grid grid-cols-1 gap-3 sm:grid-cols-3">
              <input
                value={form.state}
                onChange={(event) => update('state', event.target.value)}
                placeholder="State"
                className={fieldClass}
              />
              <input
                value={form.pincode}
                onChange={(event) => update('pincode', event.target.value)}
                placeholder="Pincode"
                className={fieldClass}
              />
              <input
                value={form.country}
                onChange={(event) => update('country', event.target.value)}
                placeholder="Country"
                className={fieldClass}
              />
            </div>
            <input
              value={form.phone}
              onChange={(event) => update('phone', event.target.value)}
              placeholder="Phone Number"
              className={fieldClass}
            />
            <label className="mt-3 flex items-center gap-2 text-xs text-[#4a4a4a]">
              <input
                type="checkbox"
                checked={form.saveAddress}
                onChange={(event) => update('saveAddress', event.target.checked)}
              />
              Use this address for future purchases
            </label>

            <h2 className="mt-8 text-xs font-semibold uppercase tracking-[0.14em]">Payment</h2>
            <p className="mt-1 text-[11px] text-[#6b756f]">All transactions are secure and encrypted.</p>
            <div className="mt-3 space-y-2">
              {PAYMENT_METHODS.map((method) => (
                <label
                  key={method.id}
                  className={`flex cursor-pointer items-center justify-between rounded-md border px-3 py-3 text-sm ${
                    form.paymentMethod === method.id ? 'border-[#1a3636]' : 'border-[#cfc8bf]'
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="payment"
                      checked={form.paymentMethod === method.id}
                      onChange={() => update('paymentMethod', method.id)}
                    />
                    {method.label}
                  </span>
                  <PaymentIcon id={method.id} />
                </label>
              ))}
            </div>
            {extraLabel ? (
              <input
                value={form.paymentDetail}
                onChange={(event) => update('paymentDetail', event.target.value)}
                placeholder={extraLabel}
                className={fieldClass}
              />
            ) : null}

            {error ? <p className="mt-4 text-sm text-[#c45c4a]">{error}</p> : null}

            <button
              type="submit"
              className="mt-6 h-12 w-full rounded-full bg-[#1a3035] text-sm font-semibold uppercase tracking-[0.14em] text-white"
            >
              Proceed
            </button>
            <div className="mt-3 flex justify-center gap-6 text-[11px] text-[#6b756f]">
              <Link to="/privacy-policy" className="underline underline-offset-2">
                Privacy Policy
              </Link>
              <Link to="/returns-policy" className="underline underline-offset-2">
                Return Policy
              </Link>
            </div>
          </form>

          <div className="lg:border-l lg:border-[#1a1a1a]/15 lg:pl-10">
            <OrderSummary
              items={items}
              itemCount={itemCount}
              subtotal={subtotal}
              shipping={totals.shipping}
              discount={totals.discount}
              total={totals.total}
              promoCode={promoInput}
              onPromoCodeChange={setPromoInput}
              onApplyPromo={applyPromo}
              promoMessage={promoMessage}
            />
          </div>
        </div>
      </section>
    </CheckoutLayout>
  );
}
