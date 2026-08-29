import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Newsletter from '../components/Newsletter';
import BrandStoryBanner from '../components/BrandStoryBanner';
import { BATH_PRODUCTS } from '../data/products';
import { useCart } from '../context/CartContext';
import { AUTH_EVENT, readAuthUser } from '../utils/auth';
import { WISHLIST_EVENT, readWishlistIds, removeWishlistId } from '../utils/wishlist';

export default function Wishlist() {
  const navigate = useNavigate();
  const { addItem } = useCart();
  const [ids, setIds] = useState(() => readWishlistIds());
  const [query, setQuery] = useState('');
  const loggedIn = Boolean(readAuthUser());

  useEffect(() => {
    function sync() {
      setIds(readWishlistIds());
    }
    window.addEventListener(WISHLIST_EVENT, sync);
    window.addEventListener(AUTH_EVENT, sync);
    window.addEventListener('storage', sync);
    return () => {
      window.removeEventListener(WISHLIST_EVENT, sync);
      window.removeEventListener(AUTH_EVENT, sync);
      window.removeEventListener('storage', sync);
    };
  }, []);

  const items = useMemo(() => {
    const products = BATH_PRODUCTS.filter((product) => ids.includes(product.id));
    const search = query.trim().toLowerCase();
    if (!search) return products;
    return products.filter((product) => product.title.toLowerCase().includes(search));
  }, [ids, query]);

  function moveToCart(product) {
    const result = addItem(product, 1);
    if (result?.requiresLogin) {
      navigate(`/login?next=${encodeURIComponent('/wishlist')}`);
      return;
    }
    removeWishlistId(product.id);
    setIds(readWishlistIds());
  }

  function removeItem(id) {
    removeWishlistId(id);
    setIds(readWishlistIds());
  }

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#fdf6f0] text-[#1a1a1a]">
      <div className="mx-auto w-full max-w-[1366px] bg-[#fdf6f0]">
        <Header />

        <section className="px-4 py-12 sm:px-6 md:px-10 lg:px-14">
          <div className="mx-auto max-w-[1100px] font-['Montserrat',sans-serif]">
            <h1 className="text-center text-3xl font-semibold uppercase tracking-[0.12em] text-[#1a3636] sm:text-4xl">
              My Wishlist
            </h1>

            <label className="relative mx-auto mt-8 block max-w-[420px]">
              <svg
                viewBox="0 0 24 24"
                className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#6b756f]"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                aria-hidden
              >
                <circle cx="11" cy="11" r="6.5" />
                <path d="M16 16l5 5" />
              </svg>
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search Item"
                className="h-11 w-full rounded-full border border-[#cfc8bf] bg-white pl-11 pr-4 text-sm outline-none placeholder:text-[#8a8a8a] focus:border-[#1a3636]"
              />
            </label>

            {items.length === 0 ? (
              <div className="mt-16 text-center text-sm text-[#6b756f]">
                <p>No Products Found</p>
                {!loggedIn ? (
                  <Link to="/login?next=/wishlist" className="mt-4 inline-block text-[#1a3636] underline underline-offset-4">
                    Log in to see your wishlist
                  </Link>
                ) : null}
              </div>
            ) : (
              <div className="mt-12 grid grid-cols-1 justify-items-center gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
                {items.map((product) => (
                  <article key={product.id} className="w-full max-w-[280px] text-center">
                    <div className="relative">
                      <button
                        type="button"
                        onClick={() => removeItem(product.id)}
                        className="absolute -right-1 -top-3 z-10 text-lg leading-none text-[#1a1a1a]"
                        aria-label={`Remove ${product.title} from wishlist`}
                      >
                        ×
                      </button>
                      <Link to={`/bath/${product.slug}`} className="block overflow-hidden bg-[#efe6da]">
                        <img src={product.image} alt={product.title} className="aspect-[4/5] w-full object-cover" />
                      </Link>
                    </div>
                    <Link to={`/bath/${product.slug}`} className="mt-4 block text-sm font-medium">
                      {product.title}
                    </Link>
                    <p className="mt-1 text-sm">₹ {product.price}</p>
                    <button
                      type="button"
                      onClick={() => moveToCart(product)}
                      className="mt-4 h-10 w-full rounded-full bg-[#1a3035] text-[11px] font-semibold uppercase tracking-[0.12em] text-white"
                    >
                      Move to cart
                    </button>
                  </article>
                ))}
              </div>
            )}
          </div>
        </section>

        <BrandStoryBanner imageSrc="/footer-banner/homebanner.png" />
        <Newsletter />
        <Footer />
      </div>
    </main>
  );
}
