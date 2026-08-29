import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CheckoutLayout from '../components/checkout/CheckoutLayout';
import OrderSummary from '../components/checkout/OrderSummary';
import { useCart } from '../context/CartContext';
import { computeTotals, formatAddress, formatPayment, readDraft, writeDraft } from '../utils/checkout';

export default function CheckoutReview() {
  const navigate = useNavigate();
  const { items, itemCount, subtotal, placeOrder } = useCart();
  const [draft, setDraft] = useState(() => readDraft());
  const [promoInput, setPromoInput] = useState(draft.promoApplied || draft.promoCode || '');
  const [promoMessage, setPromoMessage] = useState(draft.promoApplied === 'NEW20' ? 'NEW20 applied — 20% off' : '');
  const [paying, setPaying] = useState(false);

  useEffect(() => {
    if (!paying && items.length === 0) navigate('/', { replace: true });
  }, [items.length, navigate, paying]);

  const totals = useMemo(() => computeTotals(subtotal, draft), [subtotal, draft]);

  function applyPromo() {
    const code = promoInput.trim().toUpperCase();
    const next = {
      ...draft,
      promoCode: promoInput,
      promoApplied: code === 'NEW20' ? 'NEW20' : '',
    };
    setDraft(next);
    writeDraft(next);
    setPromoMessage(code === 'NEW20' ? 'NEW20 applied — 20% off' : code ? 'This code is not valid.' : '');
  }

  function payNow() {
    setPaying(true);
    window.setTimeout(() => {
      const online = draft.paymentMethod !== 'cod';
      const detail = String(draft.paymentDetail || '').trim();
      const approved = !online || (detail && !/fail/i.test(detail));
      if (!approved) {
        setPaying(false);
        navigate('/checkout/failed');
        return;
      }
      placeOrder({
        customer: {
          fullName: draft.fullName,
          email: draft.contact,
          mobile: draft.phone,
          address: draft.address,
          landmark: draft.landmark,
          state: draft.state,
          pincode: draft.pincode,
          country: draft.country,
        },
        paymentMethod: draft.paymentMethod,
        paymentDetail: draft.paymentDetail,
        shipping: totals.shipping,
        discount: totals.discount,
        promoCode: draft.promoApplied,
      });
      navigate('/checkout/success');
    }, 700);
  }

  const rows = [
    { label: 'Email', value: draft.contact },
    { label: 'Mobile Number', value: draft.phone },
    { label: 'Shipping Address', value: formatAddress(draft) },
    { label: 'Payment Method', value: formatPayment(draft) },
  ];

  return (
    <CheckoutLayout>
      <section className="px-4 py-10 sm:px-6 md:px-10 lg:px-14">
        <h1 className="text-center font-['Montserrat',sans-serif] text-2xl font-semibold uppercase tracking-[0.14em] text-[#1a3636] sm:text-[28px]">
          Checkout
        </h1>
        <div className="mx-auto mt-10 grid max-w-[1100px] grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(280px,0.85fr)] lg:gap-0">
          <div className="font-['Montserrat',sans-serif] lg:pr-10">
            <h2 className="text-xs font-semibold uppercase tracking-[0.14em]">Review and pay</h2>
            <div className="mt-6 divide-y divide-[#1a1a1a]/10">
              {rows.map((row) => (
                <div key={row.label} className="flex items-start justify-between gap-4 py-4">
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-wide text-[#6b756f]">{row.label}</p>
                    <p className="mt-1 text-sm">{row.value || '—'}</p>
                  </div>
                  <Link to="/checkout" className="shrink-0 text-xs uppercase tracking-wide underline underline-offset-4">
                    Change
                  </Link>
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={payNow}
              disabled={paying}
              className="mt-6 h-12 w-full rounded-full bg-[#1a3035] text-sm font-semibold uppercase tracking-[0.14em] text-white disabled:opacity-70"
            >
              {paying ? 'Processing…' : 'Pay now'}
            </button>
            <div className="mt-3 flex justify-center gap-6 text-[11px] text-[#6b756f]">
              <Link to="/privacy-policy" className="underline underline-offset-2">
                Privacy Policy
              </Link>
              <Link to="/returns-policy" className="underline underline-offset-2">
                Cancellation Policy
              </Link>
            </div>
          </div>
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
