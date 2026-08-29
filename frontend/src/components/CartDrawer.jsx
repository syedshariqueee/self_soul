import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BATH_PRODUCTS, BESTSELLERS } from '../data/products';
import { useCart } from '../context/CartContext';
import { readWishlistIds } from '../utils/wishlist';

function StarRating({ rating = 5 }) {
  return (
    <div className="mt-1 flex items-center gap-px">
      {Array.from({ length: 5 }, (_, i) => (
        <svg
          key={i}
          viewBox="0 0 20 20"
          className={`h-3 w-3 ${i < Math.round(rating) ? 'text-[#1a1a1a]' : 'text-[#1a1a1a]/20'}`}
          fill="currentColor"
          aria-hidden
        >
          <path d="M10 1.5l2.35 4.76 5.25.76-3.8 3.7.9 5.24L10 13.77l-4.7 2.47.9-5.24-3.8-3.7 5.25-.76L10 1.5z" />
        </svg>
      ))}
    </div>
  );
}

export default function CartDrawer() {
  const navigate = useNavigate();
  const { items, itemCount, subtotal, isOpen, closeCart, addItem, updateQty, removeItem } = useCart();
  const suggested = BESTSELLERS.slice(0, 2);

  useEffect(() => {
    if (!isOpen) return undefined;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    function onKey(event) {
      if (event.key === 'Escape') closeCart();
    }
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener('keydown', onKey);
    };
  }, [isOpen, closeCart]);

  function goShopping() {
    closeCart();
    navigate('/bath');
  }

  function addFromWishlist() {
    const ids = readWishlistIds();
    const products = BATH_PRODUCTS.filter((product) => ids.includes(product.id));
    if (!products.length) {
      closeCart();
      navigate('/wishlist');
      return;
    }
    const result = addItem(products[0], 1);
    if (result?.requiresLogin) {
      closeCart();
      navigate(`/login?next=${encodeURIComponent('/wishlist')}`);
      return;
    }
    products.slice(1).forEach((product) => addItem(product, 1));
  }

  function goCheckout() {
    closeCart();
    navigate('/checkout');
  }

  return (
    <>
      <div
        className={`fixed inset-0 z-[80] bg-black/35 transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
        onClick={closeCart}
        aria-hidden={!isOpen}
      />

      <aside
        className={`fixed inset-y-0 right-0 z-[90] flex w-full max-w-[420px] flex-col bg-[#f7efe3] font-['Montserrat',sans-serif] text-[#1a1a1a] shadow-[-12px_0_40px_rgba(0,0,0,0.12)] transition-transform duration-300 ease-out ${
          isOpen ? 'translate-x-0' : 'pointer-events-none translate-x-full'
        }`}
        aria-hidden={!isOpen}
        aria-label="Your cart"
      >
        <div className="relative flex h-14 items-center justify-center border-b border-[#1a1a1a]/15 px-12">
          <button
            type="button"
            onClick={closeCart}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-1"
            aria-label="Close cart"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6">
              <path d="M15 5l-7 7 7 7" />
            </svg>
          </button>
          <h2 className="text-sm font-semibold uppercase tracking-[0.14em]">Your Cart</h2>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col overflow-y-auto px-6 pb-8 pt-10">
            <h3 className="text-center text-lg font-semibold uppercase tracking-wide">Your bag is empty</h3>
            <p className="mt-2 text-center text-sm text-[#6b756f]">
              Whoops... Nothing in here! Explore around to add items.
            </p>
            <button
              type="button"
              onClick={goShopping}
              className="mt-8 h-11 rounded-full bg-[#1a3035] text-sm font-semibold uppercase tracking-[0.08em] text-white"
            >
              Start shopping
            </button>
            <button
              type="button"
              onClick={addFromWishlist}
              className="mt-3 h-11 rounded-full border border-[#1a1a1a] bg-transparent text-sm font-semibold uppercase tracking-[0.08em]"
            >
              Add from wishlist
            </button>

            <div className="mt-10">
              <h4 className="text-center text-[11px] font-semibold uppercase tracking-[0.16em]">Don&apos;t miss out</h4>
              <div className="mt-5 grid grid-cols-2 gap-4">
                {suggested.map((product) => (
                  <Link
                    key={product.id}
                    to={`/bath/${product.slug}`}
                    onClick={closeCart}
                    className="text-left"
                  >
                    <div className="aspect-[3/4] overflow-hidden bg-[#efe6da]">
                      <img src={product.image} alt={product.title} className="h-full w-full object-cover" />
                    </div>
                    <p className="mt-2 text-[12px] font-semibold leading-snug">{product.title}</p>
                    <StarRating rating={product.rating} />
                    <p className="mt-1 text-[12px]">₹ {product.price}</p>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-5 py-4">
              <ul className="space-y-5">
                {items.map((item) => (
                  <li key={item.id} className="flex gap-3">
                    <Link to={`/bath/${item.slug}`} onClick={closeCart} className="h-[108px] w-[84px] shrink-0 overflow-hidden bg-[#efe6da]">
                      <img src={item.image} alt={item.title} className="h-full w-full object-cover" />
                    </Link>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-2">
                        <Link
                          to={`/bath/${item.slug}`}
                          onClick={closeCart}
                          className="text-[13px] font-semibold uppercase leading-snug tracking-wide"
                        >
                          {item.title}
                        </Link>
                        <button
                          type="button"
                          onClick={() => removeItem(item.id)}
                          className="mt-0.5 text-[#6b756f]"
                          aria-label={`Remove ${item.title}`}
                        >
                          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6">
                            <path d="M6 6l12 12M18 6L6 18" />
                          </svg>
                        </button>
                      </div>
                      {item.pitch ? (
                        <p className="mt-1 line-clamp-2 text-[11px] leading-relaxed text-[#6b756f]">{item.pitch}</p>
                      ) : null}
                      {item.size ? <p className="mt-1 text-[11px] text-[#6b756f]">Size: {item.size}</p> : null}
                      <div className="mt-3 flex items-center justify-between">
                        <div className="flex h-8 items-center rounded-full border border-[#1a1a1a]/30 px-1">
                          <button
                            type="button"
                            className="px-2 text-sm"
                            onClick={() => updateQty(item.id, item.qty - 1)}
                            aria-label="Decrease quantity"
                          >
                            −
                          </button>
                          <span className="min-w-[1.25rem] text-center text-xs">{item.qty}</span>
                          <button
                            type="button"
                            className="px-2 text-sm"
                            onClick={() => updateQty(item.id, item.qty + 1)}
                            aria-label="Increase quantity"
                          >
                            +
                          </button>
                        </div>
                        <span className="text-sm font-medium">₹ {item.price * item.qty}</span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="border-t border-[#1a1a1a]/10 px-5 py-4">
              <button
                type="button"
                onClick={goCheckout}
                className="h-12 w-full rounded-full bg-[#1a3035] text-sm font-semibold uppercase tracking-[0.08em] text-white"
              >
                Checkout — ₹ {subtotal}
              </button>
              <p className="mt-2 text-center text-[11px] text-[#6b756f]">
                Tax included. Shipping calculated at Checkout.
              </p>
              {itemCount > 1 ? (
                <p className="mt-1 text-center text-[11px] text-[#6b756f]">{itemCount} items</p>
              ) : null}
            </div>
          </>
        )}
      </aside>
    </>
  );
}
