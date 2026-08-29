import { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { AUTH_EVENT, clearAuthUser, readAuthUser } from '../utils/auth';
import { WISHLIST_EVENT, readWishlistIds } from '../utils/wishlist';
import { BATH_NAV_CATEGORIES, BATH_PRODUCTS } from '../data/products';

const BATH_MENU_PRODUCTS = BATH_PRODUCTS.slice(0, 2);

const NAV_ITEMS = [
  'Home',
  'Bath',
  'Body',
  'Face',
  'Value Sets',
  'Gift',
  'Our Heritage',
  'Blogs',
  'Contact Us',
];

function navTarget(item) {
  if (item === 'Home') return '/';
  if (item === 'Bath') return '/bath';
  if (item === 'Our Heritage') return '/our-heritage';
  if (item === 'Contact Us') return '/contact-us';
  return '#';
}

function navIsActive(pathname, item) {
  const to = navTarget(item);
  if (to === '#') return false;
  if (to === '/') return pathname === '/';
  if (item === 'Our Heritage') {
    return pathname === '/our-heritage' || pathname === '/our-store';
  }
  if (item === 'Bath') return pathname === '/bath' || pathname.startsWith('/bath/');
  return pathname === to;
}


function getDisplayName(user) {
  if (user?.fullName) return user.fullName.split(' ')[0];
  if (user?.email) return user.email.split('@')[0];
  return 'Account';
}

export default function Header() {
  const { pathname, search } = useLocation();
  const bathCategoryQuery = new URLSearchParams(search).get('category');
  const navigate = useNavigate();
  const { itemCount, openCart } = useCart();
  const accountMenuRef = useRef(null);
  const [user, setUser] = useState(() => readAuthUser());
  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false);
  const [wishlistCount, setWishlistCount] = useState(() => readWishlistIds().length);

  useEffect(() => {
    setUser(readAuthUser());
    setWishlistCount(readWishlistIds().length);
    setIsAccountMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    function syncAuth() {
      setUser(readAuthUser());
      setWishlistCount(readWishlistIds().length);
    }
    window.addEventListener(AUTH_EVENT, syncAuth);
    window.addEventListener(WISHLIST_EVENT, syncAuth);
    window.addEventListener('storage', syncAuth);
    return () => {
      window.removeEventListener(AUTH_EVENT, syncAuth);
      window.removeEventListener(WISHLIST_EVENT, syncAuth);
      window.removeEventListener('storage', syncAuth);
    };
  }, []);

  useEffect(() => {
    function handleClickOutside(event) {
      if (accountMenuRef.current && !accountMenuRef.current.contains(event.target)) {
        setIsAccountMenuOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  function handleLogout() {
    clearAuthUser();
    setUser(null);
    setWishlistCount(0);
    setIsAccountMenuOpen(false);
    navigate('/login');
  }

  return (
    <header className="relative z-50 border-b border-[#eadfcd] bg-[#f7efe3] px-4 py-3 sm:px-6 md:px-8">
      <div className="flex items-center justify-between gap-4">
        <Link to="/" className="shrink-0 flex items-center">
          <img src="/Logo.png" alt="Self Soul Logo" className="h-8 sm:h-12 w-auto object-contain" />
        </Link>

        <nav className="hidden items-center rounded-full border border-[#ebdfd1] bg-[#f8f1e7] px-3 py-2 font-['Montserrat',sans-serif] shadow-[inset_0_1px_0_rgba(255,255,255,0.7),0_3px_10px_rgba(58,44,28,0.08)] lg:flex">
          {NAV_ITEMS.map((item) => (
            <div key={item} className="group/navitem h-full">
              <Link
                to={navTarget(item)}
                className={`mx-1 block rounded-full px-3 py-1.5 text-[12px] transition-all duration-200 ${
                  navIsActive(pathname, item)
                    ? "bg-white font-medium text-[#2f3f36] shadow-[0_2px_8px_rgba(0,0,0,0.14)]"
                    : "text-[#566359] group-hover/navitem:bg-white group-hover/navitem:text-[#2f3f36] group-hover/navitem:shadow-[0_2px_8px_rgba(0,0,0,0.10)]"
                }`}
              >
                {item}
              </Link>

              {item === "Bath" && (
                <div className="absolute left-0 top-[calc(100%-20px)] hidden w-full pt-[20px] group-hover/navitem:block">
                  <div className="w-full cursor-default border-b border-[#eadfcd] bg-[#f7efe3] pb-12 pt-8 shadow-xl">
                    <div className="mx-auto flex max-w-5xl gap-16 px-8">
                    <div className="ml-32 flex flex-col gap-3">
                      {BATH_NAV_CATEGORIES.map((cat) => {
                        const to = cat.query ? `/bath?category=${cat.query}` : '/bath';
                        const isActive =
                          pathname === '/bath' &&
                          (bathCategoryQuery || null) === cat.query;
                        return (
                          <Link
                            key={cat.label}
                            to={to}
                            className={`text-[10px] font-medium tracking-widest transition-colors ${
                              isActive
                                ? "text-[#5f6a62]"
                                : "text-[#8b857a] hover:text-[#2f3f36]"
                            }`}
                          >
                            {cat.label}
                          </Link>
                        );
                      })}
                    </div>

                    <div className="flex gap-8">
                      {BATH_MENU_PRODUCTS.map((product) => (
                        <div key={product.id} className="flex flex-col gap-3">
                          <Link to={`/bath/${product.slug}`} className="overflow-hidden rounded-md shadow-sm">
                            <img
                              src={product.image}
                              alt={product.title}
                              className="h-44 w-44 object-cover transition-transform duration-500 hover:scale-105"
                            />
                          </Link>
                          <Link
                            to={`/bath/${product.slug}`}
                            className="flex items-center gap-1 text-[12px] font-semibold text-[#1c2d3a] hover:underline"
                          >
                            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17L17 7"/><path d="M7 7h10v10"/></svg>
                            {product.title}
                          </Link>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              )}

              {item === "Face" && (
                <div className="absolute left-0 top-[calc(100%-20px)] hidden w-full pt-[20px] group-hover/navitem:block">
                  <div className="w-full cursor-default border-b border-[#eadfcd] bg-[#f7efe3] pb-12 pt-8 shadow-xl">
                    <div className="mx-auto flex max-w-5xl gap-16 px-8">
                      <div className="ml-32 flex flex-col gap-3">
                        {[
                          "VIEW ALL",
                          "FACE WASH",
                          "FACE SCRUB",
                          "FACE SERUM",
                          "FACE MASK",
                          "FACE TONER",
                          "FACE MOISTURISER",
                          "FACE OIL",
                        ].map((cat, idx) => (
                          <Link
                            key={cat}
                            to="#"
                            className={`text-[10px] font-medium tracking-widest transition-colors ${
                              idx === 0
                                ? "text-[#5f6a62]"
                                : "text-[#8b857a] hover:text-[#2f3f36]"
                            }`}
                          >
                            {cat}
                          </Link>
                        ))}
                      </div>

                      <div className="flex gap-8">
                        <div className="flex flex-col gap-3">
                          <div className="overflow-hidden rounded-md shadow-sm">
                            <img
                              src="/face/face1.png"
                              alt="Rose Face Bar"
                              className="h-44 w-44 object-cover transition-transform duration-500 hover:scale-105"
                            />
                          </div>
                          <Link
                            to="#"
                            className="flex items-center gap-1 text-[12px] font-semibold text-[#1c2d3a] hover:underline"
                          >
                            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17L17 7"/><path d="M7 7h10v10"/></svg>
                            Rose Face Bar
                          </Link>
                        </div>

                        <div className="flex flex-col gap-3">
                          <div className="overflow-hidden rounded-md shadow-sm">
                            <img
                              src="/face/face2.png"
                              alt="Honey Face Scrub"
                              className="h-44 w-44 object-cover transition-transform duration-500 hover:scale-105"
                            />
                          </div>
                          <Link
                            to="#"
                            className="flex items-center gap-1 text-[12px] font-semibold text-[#1c2d3a] hover:underline"
                          >
                            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17L17 7"/><path d="M7 7h10v10"/></svg>
                            Honey Face Scrub
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {item === "Value Sets" && (
                <div className="absolute left-0 top-[calc(100%-20px)] hidden w-full pt-[20px] group-hover/navitem:block">
                  <div className="w-full cursor-default border-b border-[#eadfcd] bg-[#f7efe3] pb-12 pt-8 shadow-xl">
                    <div className="mx-auto flex max-w-5xl gap-16 px-8">
                      <div className="ml-32 flex flex-col gap-3">
                        {[
                          "VIEW ALL",
                          "BATH",
                          "FACE",
                        ].map((cat, idx) => (
                          <Link
                            key={cat}
                            to="#"
                            className={`text-[10px] font-medium tracking-widest transition-colors ${
                              idx === 0
                                ? "text-[#5f6a62]"
                                : "text-[#8b857a] hover:text-[#2f3f36]"
                            }`}
                          >
                            {cat}
                          </Link>
                        ))}
                      </div>

                      <div className="flex gap-8">
                        <div className="flex flex-col gap-3">
                          <div className="overflow-hidden rounded-md shadow-sm bg-[#f2c4b4] flex items-center justify-center">
                            <img
                              src="/value/value1.png"
                              alt="Super Salt Combo"
                              className="h-44 w-44 object-contain transition-transform duration-500 hover:scale-105"
                            />
                          </div>
                          <Link
                            to="#"
                            className="flex items-center gap-1 text-[12px] font-semibold text-[#1c2d3a] hover:underline"
                          >
                            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17L17 7"/><path d="M7 7h10v10"/></svg>
                            Super Salt Combo
                          </Link>
                        </div>

                        <div className="flex flex-col gap-3">
                          <div className="overflow-hidden rounded-md shadow-sm bg-[#ecd9cc] flex items-center justify-center">
                            <img
                              src="/value/value2.png"
                              alt="Value Combo Set"
                              className="h-44 w-44 object-contain transition-transform duration-500 hover:scale-105"
                            />
                          </div>
                          <Link
                            to="#"
                            className="flex items-center gap-1 text-[12px] font-semibold text-[#1c2d3a] hover:underline"
                          >
                            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17L17 7"/><path d="M7 7h10v10"/></svg>
                            Value Combo Set
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {item === "Gift" && (
                <div className="absolute left-0 top-[calc(100%-20px)] hidden w-full pt-[20px] group-hover/navitem:block">
                  <div className="w-full cursor-default border-b border-[#eadfcd] bg-[#f7efe3] pb-12 pt-8 shadow-xl">
                    <div className="mx-auto flex max-w-5xl gap-16 px-8">
                      <div className="ml-32 flex flex-col gap-3">
                        {[
                          "VIEW ALL",
                          "BATH GIFT BOX",
                          "SKINCARE GIFT BOX",
                          "MINI TREAT SET",
                          "SELF-CARE KIT",
                        ].map((cat, idx) => (
                          <Link
                            key={cat}
                            to="#"
                            className={`text-[10px] font-medium tracking-widest transition-colors ${
                              idx === 0
                                ? "text-[#5f6a62]"
                                : "text-[#8b857a] hover:text-[#2f3f36]"
                            }`}
                          >
                            {cat}
                          </Link>
                        ))}
                      </div>

                      <div className="flex gap-8">
                        <div className="flex flex-col gap-3">
                          <div className="overflow-hidden rounded-md shadow-sm">
                            <img
                              src="/images/gift/gift1.png"
                              alt="Ultimate Gifting Kit"
                              className="h-44 w-44 object-cover transition-transform duration-500 hover:scale-105"
                            />
                          </div>
                          <Link
                            to="#"
                            className="flex items-center gap-1 text-[12px] font-semibold text-[#1c2d3a] hover:underline"
                          >
                            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17L17 7"/><path d="M7 7h10v10"/></svg>
                            Ultimate Gifting Kit
                          </Link>
                        </div>

                        <div className="flex flex-col gap-3">
                          <div className="overflow-hidden rounded-md shadow-sm">
                            <img
                              src="/images/gift/gift2.png"
                              alt="Mini Kit-Budget Friendly"
                              className="h-44 w-44 object-cover transition-transform duration-500 hover:scale-105"
                            />
                          </div>
                          <Link
                            to="#"
                            className="flex items-center gap-1 text-[12px] font-semibold text-[#1c2d3a] hover:underline"
                          >
                            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17L17 7"/><path d="M7 7h10v10"/></svg>
                            Mini Kit-Budget Friendly
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <button type="button" className="cursor-pointer transition-opacity hover:opacity-70">
            <img src="/icons/search.png" alt="Search" className="w-[18px] h-[18px] object-contain" />
          </button>
          <Link
            to="/wishlist"
            className="relative cursor-pointer transition-opacity hover:opacity-70"
            aria-label={`Wishlist${user && wishlistCount ? `, ${wishlistCount} items` : ''}`}
          >
            <img src="/icons/heart.png" alt="" className="w-[18px] h-[18px] object-contain" />
            {user && wishlistCount > 0 ? (
              <span className="absolute -right-2 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#1a3636] px-1 text-[9px] font-semibold leading-none text-white">
                {wishlistCount > 99 ? '99+' : wishlistCount}
              </span>
            ) : null}
          </Link>
          <button
            type="button"
            onClick={openCart}
            className="relative cursor-pointer transition-opacity hover:opacity-70"
            aria-label={`Shopping bag${user && itemCount ? `, ${itemCount} items` : ''}`}
          >
            <img src="/icons/shoppingbag.png" alt="" className="w-[18px] h-[18px] object-contain" />
            {user && itemCount > 0 ? (
              <span className="absolute -right-2 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#1a3636] px-1 text-[9px] font-semibold leading-none text-white">
                {itemCount > 99 ? '99+' : itemCount}
              </span>
            ) : null}
          </button>
          <div ref={accountMenuRef} className="relative inline-flex">
            {user ? (
              <>
                <button
                  type="button"
                  onClick={() => setIsAccountMenuOpen((isOpen) => !isOpen)}
                  className="cursor-pointer transition-opacity hover:opacity-70"
                  aria-label="Open account menu"
                  aria-expanded={isAccountMenuOpen}
                >
                  <img src="/icons/account.png" alt="" className="w-[18px] h-[18px] object-contain" />
                </button>

                {isAccountMenuOpen && (
                  <div className="absolute right-0 top-[calc(100%+18px)] w-48 overflow-hidden rounded-xl bg-[#41534D] font-['Montserrat',sans-serif] text-[15px] font-normal text-[#f7efe3] shadow-[0_10px_25px_rgba(0,0,0,0.18)]">
                    <div className="flex items-center gap-3 border-b border-[#7b8a84] px-5 py-3.5">
                      <svg className="h-5 w-5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
                        <circle cx="12" cy="8" r="4" />
                        <path d="M4 21a8 8 0 0 1 16 0" />
                      </svg>
                      <span>{getDisplayName(user)}</span>
                    </div>

                    <Link to="/profile" className="block px-5 py-2.5 transition-colors hover:bg-[#4b625b]">
                      Profile
                    </Link>
                    <Link to="/orders" className="block px-5 py-2.5 transition-colors hover:bg-[#4b625b]">
                      Orders
                    </Link>
                    <button
                      type="button"
                      onClick={handleLogout}
                      className="block w-full px-5 py-2.5 text-left transition-colors hover:bg-[#4b625b]"
                    >
                      Log Out
                    </button>
                  </div>
                )}
              </>
            ) : (
              <Link
                to={`/login?next=${encodeURIComponent(pathname === '/login' ? '/' : pathname)}`}
                className="cursor-pointer transition-opacity hover:opacity-70"
              >
                <img src="/icons/account.png" alt="Account" className="w-[18px] h-[18px] object-contain" />
              </Link>
            )}
          </div>
        </div>
      </div>

      <nav className="mt-3 flex gap-2 overflow-x-auto pb-1 font-['Montserrat',sans-serif] lg:hidden">
        {NAV_ITEMS.map((item) => (
          <Link
            key={item}
            to={navTarget(item)}
            className={`shrink-0 rounded-full border px-3 py-1.5 text-[11px] transition-all duration-200 ${
              navIsActive(pathname, item)
                ? "border-[#e5d8c7] bg-white font-medium text-[#2f3f36]"
                : "border-[#eadfce] bg-[#f6eee3] text-[#5f6a62] hover:border-[#e5d8c7] hover:bg-white hover:text-[#2f3f36]"
            }`}
          >
            {item}
          </Link>
        ))}
      </nav>
    </header>
  );
}
