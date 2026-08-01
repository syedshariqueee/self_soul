import { useMemo, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Newsletter from '../components/Newsletter';
import HeritageVideoSection from '../components/HeritageVideoSection';
import BrandStoryBanner from '../components/BrandStoryBanner';
import ProductCard from '../components/ProductCard';

const BATH_IMAGE_NUMBERS = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 34,
];

const bathImage = (n) => `/bathpro/Artboard%20${n}.png`;

const PRODUCT_TITLES = [
  'Lavender Soap',
  'Eucalyptus Soap',
  'Coffee & Vanilla Soap',
  'Jasmine & Mogra Soap',
  'Rose Bath Salt',
  'Chamomile Bath Soak',
  'Citrus Bath Oil',
  'Herbal Bath Scrub',
  'Mint Bath Fizz',
  'Sandalwood Soap',
  'Calendula Bath Powder',
  'Tea Tree Soap',
  'Lemongrass Soap',
  'Neem & Tulsi Soap',
  'Oatmeal Honey Soap',
  'Patchouli Bath Salt',
  'Ylang Ylang Soak',
  'Cedarwood Bath Oil',
  'Hibiscus Bath Scrub',
  'Peppermint Bath Fizz',
  'Frankincense Soap',
  'Aloe Vera Soap',
  'Turmeric Glow Soap',
  'Vetiver Bath Salt',
  'Bergamot Bath Oil',
  'Geranium Bath Soak',
  'Coconut Milk Soap',
  'Orange Blossom Soap',
  'Clary Sage Scrub',
  'Rosemary Bath Powder',
  'Black Seed Soap',
  'Wild Rose Soap',
  'Forest Bath Soak',
];

const BADGES = ["People's Fav", 'Award Winner', null, "People's Fav", 'Award Winner', null];

const BATH_PRODUCTS = BATH_IMAGE_NUMBERS.map((num, index) => {
  const price = [349, 379, 399, 429, 449, 499, 549, 699][index % 8];

  return {
    id: index + 1,
    title: PRODUCT_TITLES[index] || `Bath Product ${index + 1}`,
    badge: BADGES[index % BADGES.length],
    price,
    rating: index % 5 === 0 ? 4 : 5,
    available: index % 11 !== 6,
    image: bathImage(num),
  };
});

const NATURAL_ICONS = [
  {
    label: 'Natural origin',
    svg: (
      <path
        fill="none"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        d="M12 22c0-6 4-10 8-14M12 22c0-5-2-9-6-12m6 12c-2-8 2-14 6-18M14 6l-2 4"
      />
    ),
  },
  {
    label: 'Sensitive skin',
    svg: (
      <>
        <circle cx="12" cy="10" r="3.5" fill="none" stroke="currentColor" strokeWidth="1.25" />
        <path
          fill="none"
          stroke="currentColor"
          strokeWidth="1.25"
          strokeLinecap="round"
          d="M6.5 18.5c1.2-2.5 3.4-4 5.5-4s4.3 1.5 5.5 4"
        />
      </>
    ),
  },
  {
    label: 'Cruelty-free',
    svg: (
      <path
        fill="none"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinejoin="round"
        d="M9 10c0-1.5 1-2.5 2.5-3S15 8 15 10v1.5c1 0 2 .8 2 2v1c0 1.5-1 2.5-2.5 2.5H10M9 10v6.5M12 6V4M10 4h4"
      />
    ),
  },
  {
    label: 'Gentle care',
    svg: (
      <path
        fill="none"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M8 14c2 2 4 2.5 6 1.5 1.5-.8 2.5-2.5 2-4.5-.3-1.8-2.5-3.5-3.5-4.5-1-1-2.5-.5-3.5.5S6.5 12 8 14z"
      />
    ),
  },
];

const selectClass =
  "appearance-none bg-transparent border-0 border-b border-[#1a3636]/30 pr-6 py-1 font-['Montserrat',sans-serif] text-sm text-[#1a3636] focus:outline-none cursor-pointer";

export default function Bath() {
  const [availability, setAvailability] = useState('all');
  const [priceRange, setPriceRange] = useState('all');
  const [sortBy, setSortBy] = useState('best-selling');

  const products = useMemo(() => {
    let list = [...BATH_PRODUCTS];

    if (availability === 'in-stock') {
      list = list.filter((p) => p.available);
    } else if (availability === 'out-of-stock') {
      list = list.filter((p) => !p.available);
    }

    if (priceRange === 'under-400') {
      list = list.filter((p) => p.price < 400);
    } else if (priceRange === '400-500') {
      list = list.filter((p) => p.price >= 400 && p.price <= 500);
    } else if (priceRange === 'over-500') {
      list = list.filter((p) => p.price > 500);
    }

    if (sortBy === 'price-low') {
      list.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      list.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'name') {
      list.sort((a, b) => a.title.localeCompare(b.title));
    }

    return list;
  }, [availability, priceRange, sortBy]);

  return (
    <main className="overflow-x-hidden bg-white text-[#203229]">
      <div className="mx-auto w-full max-w-[1366px] bg-white">
        <Header />

        <HeritageVideoSection />

        <section className="flex min-h-[181px] w-full items-center justify-center bg-[#EBDDD1] px-4 py-8 sm:px-6 md:px-10 lg:px-14">
          <div className="mx-auto max-w-[720px] text-center">
            <h1 className="font-['Montserrat',sans-serif] text-2xl font-medium leading-[1.62] tracking-normal text-[#2A2C2E]">
              98% Natural Ingredients
            </h1>
            <p className="mt-3 font-['Montserrat',sans-serif] text-xs font-normal leading-[1.62] tracking-normal text-[#1B3638]">
              99% of plant-based ingredients derived from organic farming and all products contain a
              minimum of 98% natural ingredients.
            </p>
            <div className="mt-6 flex flex-wrap items-start justify-center gap-8 sm:gap-10">
              {NATURAL_ICONS.map((item) => (
                <div key={item.label} className="flex w-[72px] flex-col items-center gap-2 sm:w-[80px]">
                  <span className="flex h-14 w-14 items-center justify-center rounded-full border border-[#2A2C2E]/35 text-[#2A2C2E]">
                    <svg viewBox="0 0 24 24" className="h-7 w-7" aria-hidden>
                      {item.svg}
                    </svg>
                  </span>
                  <span className="font-['Montserrat',sans-serif] text-[10px] leading-tight text-[#1B3638] sm:text-[11px]">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 pb-16 pt-8 sm:px-6 md:px-10 lg:px-14">
          <div className="mx-auto max-w-[1312px]">
            <div className="flex flex-col gap-4 border-b border-[#1a3636]/15 pb-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex flex-wrap items-center gap-4 sm:gap-6">
                <span className="font-['Montserrat',sans-serif] text-sm font-medium text-[#1a3636]">
                  Filter:
                </span>
                <label className="relative inline-flex items-center">
                  <select
                    value={availability}
                    onChange={(e) => setAvailability(e.target.value)}
                    className={selectClass}
                    aria-label="Filter by availability"
                  >
                    <option value="all">Availability</option>
                    <option value="in-stock">In stock</option>
                    <option value="out-of-stock">Out of stock</option>
                  </select>
                  <ChevronDown />
                </label>
                <label className="relative inline-flex items-center">
                  <select
                    value={priceRange}
                    onChange={(e) => setPriceRange(e.target.value)}
                    className={selectClass}
                    aria-label="Filter by price"
                  >
                    <option value="all">Price</option>
                    <option value="under-400">Under ₹400</option>
                    <option value="400-500">₹400 – ₹500</option>
                    <option value="over-500">Over ₹500</option>
                  </select>
                  <ChevronDown />
                </label>
              </div>

              <div className="flex flex-wrap items-center gap-4 sm:gap-6">
                <label className="relative inline-flex items-center gap-2">
                  <span className="font-['Montserrat',sans-serif] text-sm font-medium text-[#1a3636]">
                    Sort by:
                  </span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className={selectClass}
                    aria-label="Sort products"
                  >
                    <option value="best-selling">Best selling</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="name">Name</option>
                  </select>
                  <ChevronDown />
                </label>
                <span className="font-['Montserrat',sans-serif] text-sm text-[#6b756f]">
                  {products.length} products
                </span>
              </div>
            </div>

            <div className="mt-10 grid grid-cols-2 justify-items-center gap-x-4 gap-y-10 sm:gap-x-6 md:gap-y-12 lg:grid-cols-4">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  badge={product.badge}
                  image={product.image}
                  title={product.title}
                  rating={product.rating}
                  price={product.price}
                />
              ))}
            </div>

            {products.length === 0 ? (
              <p className="mt-16 text-center font-['Montserrat',sans-serif] text-sm text-[#6b756f]">
                No products match your filters.
              </p>
            ) : null}
          </div>
        </section>

        <BrandStoryBanner imageSrc="/footer-banner/productpagebanner.png" />
        <Newsletter />
        <Footer />
      </div>
    </main>
  );
}

function ChevronDown() {
  return (
    <svg
      className="pointer-events-none absolute right-0 h-3.5 w-3.5 text-[#1a3636]"
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden
    >
      <path
        fillRule="evenodd"
        d="M5.23 7.21a.75.75 0 011.06.02L10 11.17l3.71-3.94a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
        clipRule="evenodd"
      />
    </svg>
  );
}
