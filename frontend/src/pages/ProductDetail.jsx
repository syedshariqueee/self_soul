import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Newsletter from '../components/Newsletter';
import { getProductBySlug } from '../data/products';
import { useCart } from '../context/CartContext';
import { AUTH_EVENT, readAuthUser } from '../utils/auth';
import { WISHLIST_EVENT, isWishlisted, toggleWishlistId } from '../utils/wishlist';

function StarRating({ rating = 5, className = 'h-3.5 w-3.5' }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, i) => (
        <svg
          key={i}
          viewBox="0 0 20 20"
          className={`${className} ${i < Math.round(rating) ? 'text-[#1a1a1a]' : 'text-[#1a1a1a]/20'}`}
          fill="currentColor"
          aria-hidden
        >
          <path d="M10 1.5l2.35 4.76 5.25.76-3.8 3.7.9 5.24L10 13.77l-4.7 2.47.9-5.24-3.8-3.7 5.25-.76L10 1.5z" />
        </svg>
      ))}
    </div>
  );
}

function Accordion({ title, children, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-[#1a1a1a]/15">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="flex w-full items-center justify-between py-3.5 text-left"
        aria-expanded={open}
      >
        <span className="font-['Montserrat',sans-serif] text-sm font-semibold text-[#1a1a1a]">{title}</span>
        <svg
          viewBox="0 0 20 20"
          className={`h-4 w-4 text-[#1a1a1a] transition-transform ${open ? 'rotate-180' : ''}`}
          fill="currentColor"
          aria-hidden
        >
          <path d="M5.23 7.21a.75.75 0 011.06.02L10 11.17l3.71-3.94a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" />
        </svg>
      </button>
      {open ? <div className="pb-4 font-['Montserrat',sans-serif] text-[13px] leading-relaxed text-[#4a4a4a]">{children}</div> : null}
    </div>
  );
}

export default function ProductDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const product = useMemo(() => getProductBySlug(slug), [slug]);
  const { addItem, openCart } = useCart();
  const [activeImage, setActiveImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [overviewOpen, setOverviewOpen] = useState(false);
  const [wishlisted, setWishlisted] = useState(false);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    setActiveImage(0);
    setQuantity(1);
    setOverviewOpen(false);
    setAdded(false);
  }, [slug]);

  useEffect(() => {
    if (!product) return undefined;
    function sync() {
      setWishlisted(isWishlisted(product.id));
    }
    sync();
    window.addEventListener(WISHLIST_EVENT, sync);
    window.addEventListener(AUTH_EVENT, sync);
    return () => {
      window.removeEventListener(WISHLIST_EVENT, sync);
      window.removeEventListener(AUTH_EVENT, sync);
    };
  }, [product]);

  if (!product) {
    return (
      <main className="min-h-screen bg-[#f7efe3] text-[#1a1a1a]">
        <div className="mx-auto w-full max-w-[1366px]">
          <Header />
          <div className="px-6 py-24 text-center font-['Montserrat',sans-serif]">
            <h1 className="text-2xl font-semibold">Product not found</h1>
            <Link to="/bath" className="mt-4 inline-block text-sm underline">
              Back to Bath
            </Link>
          </div>
          <Footer />
        </div>
      </main>
    );
  }

  const images = product.images?.length ? product.images : [product.image];
  const overview = product.overview || '';
  const shortOverview = overview.length > 260 ? `${overview.slice(0, 260).trim()}...` : overview;
  const subtitle = (product.subtitle || '').replace(/^With\s+/i, '');

  function requireLogin() {
    navigate(`/login?next=${encodeURIComponent(`/bath/${product.slug}`)}`);
  }

  function toggleWishlist() {
    if (!readAuthUser()) {
      requireLogin();
      return;
    }
    setWishlisted(toggleWishlistId(product.id));
  }

  function addToCart() {
    const result = addItem(product, quantity);
    if (result?.requiresLogin) {
      requireLogin();
      return;
    }
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1800);
  }

  return (
    <main className="overflow-x-hidden bg-[#f7efe3] text-[#1a1a1a]">
      <div className="mx-auto w-full max-w-[1366px] bg-[#f7efe3]">
        <Header />

        <section className="px-4 py-8 sm:px-6 sm:py-10 md:px-10 lg:px-14 lg:py-12">
          <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-14">
            <div className="relative flex gap-3 sm:gap-4 lg:sticky lg:top-6 lg:self-start">
              <div className="flex w-[64px] shrink-0 flex-col gap-3 sm:w-[72px]">
                {images.map((src, index) => (
                  <button
                    key={src}
                    type="button"
                    onClick={() => setActiveImage(index)}
                    className={`aspect-square overflow-hidden border bg-[#f7efe3] ${
                      activeImage === index ? 'border-[#1a1a1a]' : 'border-transparent'
                    }`}
                    aria-label={`View image ${index + 1}`}
                  >
                    <img src={src} alt="" className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>

              <div className="relative min-h-[320px] flex-1 bg-[#f7efe3] sm:min-h-[420px] lg:min-h-[520px]">
                <img
                  src={images[activeImage]}
                  alt={product.title}
                  className="absolute inset-0 h-full w-full object-contain p-6 sm:p-8"
                />
                <button
                  type="button"
                  onClick={toggleWishlist}
                  className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center text-[#1a1a1a]"
                  aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
                >
                  <svg viewBox="0 0 24 24" className="h-6 w-6" fill={wishlisted ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.5">
                    <path d="M12.1 20.3S4 14.4 4 9.4A4.2 4.2 0 0 1 8.4 5.2c1.5 0 2.8.7 3.7 1.9 0.9-1.2 2.2-1.9 3.7-1.9A4.2 4.2 0 0 1 20 9.4c0 5-8.1 10.9-7.9 10.9z" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="font-['Montserrat',sans-serif] text-[#1a1a1a]">
              <h1 className="text-[26px] font-bold uppercase leading-tight tracking-wide sm:text-[30px]">
                {product.title}
              </h1>
              {subtitle ? (
                <p className="mt-1.5 text-sm font-normal text-[#4a4a4a] sm:text-[15px]">{subtitle}</p>
              ) : null}
              {product.size ? <p className="mt-1 text-sm text-[#1a1a1a]">{product.size}</p> : null}

              <div className="mt-3">
                <StarRating rating={product.rating} />
              </div>

              <div className="mt-4 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <span className="text-2xl font-semibold">₹ {product.price}</span>
                {product.compareAtPrice ? (
                  <span className="text-sm text-[#8a8a8a] line-through">₹ {product.compareAtPrice}</span>
                ) : null}
                {product.discountPercent ? (
                  <span className="text-sm font-medium text-[#2f7a4a]">{product.discountPercent}% off</span>
                ) : null}
              </div>
              <p className="mt-1 text-[11px] uppercase tracking-wide text-[#8a8a8a]">Tax included.</p>

              <div className="mt-5 border border-[#d8d0c6] px-4 py-3">
                <p className="text-[11px] font-bold uppercase tracking-[0.08em]">Limited time offer</p>
                <p className="mt-1.5 text-sm">Buy 2 Get 1</p>
                <p className="text-sm text-[#4a4a4a]">Spend ₹ 500, and get a free gift worth ₹ 100</p>
              </div>

              {overview ? (
                <div className="mt-6">
                  <h2 className="text-sm font-bold uppercase tracking-wide">Product Overview</h2>
                  <p className="mt-2 text-[13px] leading-relaxed text-[#4a4a4a]">
                    {overviewOpen ? overview : shortOverview}{' '}
                    {overview.length > 260 ? (
                      <button
                        type="button"
                        onClick={() => setOverviewOpen((value) => !value)}
                        className="font-medium text-[#c45c4a] underline-offset-2 hover:underline"
                      >
                        {overviewOpen ? 'Read Less' : 'Read More'}
                      </button>
                    ) : null}
                  </p>
                </div>
              ) : null}

              <div className="mt-4">
                {product.benefits?.length ? (
                  <Accordion title="Benefits" defaultOpen>
                    <ul className="list-disc space-y-1 pl-5">
                      {product.benefits.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </Accordion>
                ) : null}
                {product.credentials?.length ? (
                  <Accordion title="Clean Beauty Credentials">
                    <ul className="list-disc space-y-1 pl-5">
                      {product.credentials.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </Accordion>
                ) : null}
                {product.ingredients ? (
                  <Accordion title="Ingredients">
                    <p>{product.ingredients}</p>
                  </Accordion>
                ) : null}
                {product.application ? (
                  <Accordion title="Application">
                    <p>{product.application}</p>
                  </Accordion>
                ) : null}
              </div>

              <div className="mt-6 flex items-center gap-3">
                <div className="flex h-11 items-center rounded-md border border-[#1a1a1a]/25">
                  <button
                    type="button"
                    className="h-full px-3 text-lg leading-none"
                    onClick={() => setQuantity((value) => Math.max(1, value - 1))}
                    aria-label="Decrease quantity"
                  >
                    −
                  </button>
                  <span className="min-w-[2rem] text-center text-sm">{quantity}</span>
                  <button
                    type="button"
                    className="h-full px-3 text-lg leading-none"
                    onClick={() => setQuantity((value) => value + 1)}
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>
                <button
                  type="button"
                  onClick={addToCart}
                  className="h-11 flex-1 rounded-md bg-[#1a3035] px-6 text-sm font-semibold uppercase tracking-[0.12em] text-white transition-opacity hover:opacity-90"
                >
                  {added ? 'Added' : 'Add to Cart'}
                </button>
              </div>
              {added ? (
                <button
                  type="button"
                  onClick={openCart}
                  className="mt-3 inline-block text-sm underline underline-offset-4"
                >
                  View cart
                </button>
              ) : null}

              {product.review ? (
                <div className="mt-6 border border-[#d8d0c6] px-4 py-4">
                  <h3 className="text-sm font-semibold">Reviews</h3>
                  <div className="mt-2">
                    <StarRating rating={product.review.rating || 5} />
                  </div>
                  <p className="mt-3 text-[13px] leading-relaxed text-[#4a4a4a]">
                    {product.review.text}
                  </p>
                  <button type="button" className="mt-3 text-xs font-medium text-[#1a1a1a]">
                    View More
                  </button>
                </div>
              ) : null}
            </div>
          </div>
        </section>

        <Newsletter />
        <Footer />
      </div>
    </main>
  );
}
