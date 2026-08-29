import { Link } from 'react-router-dom';

export default function OrderSummary({
  items,
  itemCount,
  subtotal,
  shipping,
  discount,
  total,
  promoCode,
  onPromoCodeChange,
  onApplyPromo,
  promoMessage,
  showPromo = true,
  orderMeta,
}) {
  return (
    <aside className="font-['Montserrat',sans-serif] text-[#1a1a1a]">
      {orderMeta ? (
        <div className="mb-5">
          <h2 className="text-sm font-semibold uppercase tracking-[0.12em]">Order summary</h2>
          <p className="mt-2 text-xs text-[#6b756f]">Order placed on {orderMeta.placedOn}</p>
          <p className="text-xs text-[#6b756f]">Order ID: {orderMeta.orderId}</p>
        </div>
      ) : null}

      <ul className="space-y-4">
        {items.map((item) => (
          <li key={`${item.id}-${item.size || ''}`} className="flex gap-3">
            <img src={item.image} alt="" className="h-16 w-12 shrink-0 object-cover bg-[#efe6da]" />
            <div className="min-w-0 flex-1">
              <p className="text-[13px] font-semibold uppercase leading-snug">{item.title}</p>
              <p className="mt-0.5 text-[11px] text-[#6b756f]">
                {item.size ? `${item.size}` : ''}
                {item.qty > 1 ? ` · Qty ${item.qty}` : ''}
              </p>
              {orderMeta ? (
                <Link to={`/bath/${item.slug}`} className="mt-1 inline-block text-[11px] underline underline-offset-2">
                  View item
                </Link>
              ) : null}
            </div>
            <span className="text-sm">₹ {item.price * item.qty}</span>
          </li>
        ))}
      </ul>

      {showPromo ? (
        <form
          className="mt-6 flex gap-2"
          onSubmit={(event) => {
            event.preventDefault();
            onApplyPromo?.();
          }}
        >
          <input
            value={promoCode}
            onChange={(event) => onPromoCodeChange?.(event.target.value)}
            placeholder="Discount Code"
            className="h-10 min-w-0 flex-1 rounded-md border border-[#1a1a1a]/20 bg-white px-3 text-sm outline-none focus:border-[#1a3636]"
          />
          <button
            type="submit"
            className="h-10 rounded-md bg-[#1a3035] px-4 text-xs font-semibold uppercase tracking-wide text-white"
          >
            Apply
          </button>
        </form>
      ) : null}
      {promoMessage ? (
        <p className={`mt-2 text-xs ${promoMessage.includes('not valid') ? 'text-[#c45c4a]' : 'text-[#2f7a4a]'}`}>
          {promoMessage}
        </p>
      ) : null}

      <div className="mt-6 space-y-2 border-t border-[#1a1a1a]/10 pt-4 text-sm">
        <div className="flex justify-between">
          <span>Subtotal · {itemCount} {itemCount === 1 ? 'item' : 'items'}</span>
          <span>₹ {subtotal}</span>
        </div>
        <div className="flex justify-between text-[#6b756f]">
          <span>Shipping</span>
          <span>{shipping > 0 ? `₹ ${shipping}` : 'Enter shipping address'}</span>
        </div>
        {discount > 0 ? (
          <div className="flex justify-between text-[#2f7a4a]">
            <span>Discount</span>
            <span>- ₹ {discount}</span>
          </div>
        ) : null}
        <div className="flex justify-between pt-2 text-base font-semibold">
          <span>Total</span>
          <span>₹ {total}</span>
        </div>
      </div>
    </aside>
  );
}
