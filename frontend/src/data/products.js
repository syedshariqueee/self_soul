import details from './product-details.json';

const IMAGE_FALLBACKS = {};

function bathImage(title) {
  const fileTitle = IMAGE_FALLBACKS[title] || title;
  return `/bathpro/${encodeURIComponent(`${fileTitle}.png`)}`;
}

export function slugify(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

function detailKey(value) {
  return value
    .toLowerCase()
    .replace(/eucalume lune/g, 'eucalume essence')
    .replace(/\bbathing\b/g, '')
    .replace(/\bbody\b/g, '')
    .replace(/\bbath\b/g, '')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
}

const detailMap = Object.fromEntries(details.map((item) => [detailKey(item.heading), item]));

const FALLBACK_DETAILS = {};

const CATALOG = [
  { title: 'Lavende Lune Soap', price: 250, category: 'SOAP' },
  { title: 'Eucalume Essence Soap', price: 250, category: 'SOAP' },
  { title: 'Roselle Rust Soap', price: 250, category: 'SOAP' },
  { title: 'Marigold Mirage Soap', price: 250, category: 'SOAP' },
  { title: 'Mystic Mogra Muse Soap', price: 250, category: 'SOAP' },
  { title: 'Vanille Mocha Soap', price: 250, category: 'SOAP' },
  { title: 'Lavende Lune Salt', price: 199, category: 'BATHING SALT' },
  { title: 'Eucalume Essence Salt', price: 199, category: 'BATHING SALT' },
  { title: 'Roselle Rust Salt', price: 199, category: 'BATHING SALT' },
  { title: 'Mystic Mogra Muse Salt', price: 199, category: 'BATHING SALT' },
  { title: 'Vanille Mocha Salt', price: 199, category: 'BATHING SALT' },
  { title: 'Marigold Mirage Salt', price: 199, category: 'BATHING SALT' },
  { title: 'Roselle Rust Oil', price: 299, category: 'BATHING OIL' },
  { title: 'Marigold Mirage Oil', price: 299, category: 'BATHING OIL' },
  { title: 'Lavende Lune Oil', price: 299, category: 'BATHING OIL' },
  { title: 'Eucalume Essence Oil', price: 299, category: 'BATHING OIL' },
  { title: 'Vanille Mocha Oil', price: 299, category: 'BATHING OIL' },
  { title: 'Mystic Mogra Muse Oil', price: 299, category: 'BATHING OIL' },
  { title: 'Lavende Lune Scrub', price: 350, category: 'BATHING SCRUB' },
  { title: 'Eucalume Essence Scrub', price: 350, category: 'BATHING SCRUB' },
  { title: 'Vanille Mocha Scrub', price: 350, category: 'BATHING SCRUB' },
  { title: 'Mystic Mogra Muse Scrub', price: 350, category: 'BATHING SCRUB' },
  { title: 'Roselle Rust Scrub', price: 350, category: 'BATHING SCRUB' },
  { title: 'Marigold Mirage Scrub', price: 350, category: 'BATHING SCRUB' },
  { title: 'Lavende Lune Fizz', price: 330, category: 'BATHING FIZZ' },
  { title: 'Eucalume Essence Fizz', price: 330, category: 'BATHING FIZZ' },
  { title: 'Vanille Mocha Fizz', price: 330, category: 'BATHING FIZZ' },
  { title: 'Mystic Mogra Muse Fizz', price: 330, category: 'BATHING FIZZ' },
  { title: 'Roselle Rust Fizz', price: 330, category: 'BATHING FIZZ' },
  { title: 'Marigold Mirage Fizz', price: 330, category: 'BATHING FIZZ' },
  { title: 'Herbal Soak', price: 290, category: 'BATH SOAK' },
  { title: 'Herbal Powder', price: 330, category: 'BATH POWDER' },
];

const BADGES = ["People's Fav", null, null];


const SCENT_TYPES = ['Soap', 'Oil', 'Scrub', 'Salt', 'Fizz'];
const SCENT_PREFIX =
  /^(Lavende Lune|Eucalume Essence|Roselle Rust|Marigold Mirage|Mystic Mogra Muse|Vanille Mocha)/;

const GALLERY_MAP = {
  'Vanille Mocha Soap': ['Coffee Soap (2).jpeg', 'Coffee Soap (3).jpeg'],
  'Vanille Mocha Scrub': ['Coffee Scrub. 1.png', 'Coffee Scrub . 2.png'],
  'Vanille Mocha Salt': ['Coffee Salt. 1.png', 'Coffee Salt 3s.png'],
  'Eucalume Essence Soap': ['Eucalyptus Soap.1.png', 'Eucalyptus Soap.2.png'],
  'Eucalume Essence Scrub': ['Eucalyptus Scrub . 1.png', 'Eucaluptus Scrub 2.png'],
  'Eucalume Essence Salt': ['Eucalyptus Salt  1.png', 'Eucalyptus salt  .2.png'],
  'Roselle Rust Soap': ['Rose Soap .1.png', 'Rose Soap .2.png'],
  'Roselle Rust Scrub': ['Rose Scrub . 1.png', 'Rose Scrub 2.png'],
  'Roselle Rust Salt': ['ROse Salt. 1S.png', 'Rose Salt 2S.png'],
  'Marigold Mirage Soap': ['Marigold Soap.1.png', 'Marigold Soap.2.png'],
  'Marigold Mirage Scrub': ['MArigold Scrub. 1.png', 'Marigold Scrub. 2.png'],
  'Marigold Mirage Salt': ['Maeigold  Salt. 1.png', 'Marigold Salt 3.png'],
  'Mystic Mogra Muse Soap': ['Mogra Soap.1.png', 'Mogra Soap.2.png'],
  'Mystic Mogra Muse Scrub': ['Mogra Scrub. 1.png', 'Mogra Scrub. 2.png'],
  'Mystic Mogra Muse Salt': ['Mlogra Salt. 1.png', 'Mogra Salt . 2S.png'],
  'Lavende Lune Soap': ['Lavender Lune [1].png', 'Lavender Lune [2].png'],
  'Lavende Lune Scrub': ['Lavender Lune  Scrub . 1.png', 'Lavender Lune Scrub . 2.png'],
  'Lavende Lune Salt': ['Lavender Lune  Salt. 1.png', 'Lavender Lune Salt. 2.png'],
  'Herbal Soak': ['Herbal Soak 1.png', 'Herbal Soak 2.png'],
  'Herbal Powder': ['Herbal Powder  1.png', 'Herbal Powder  2.png']
};

function galleryFor(title) {
  const primary = bathImage(title);
  
  if (GALLERY_MAP[title]) {
    return [primary, ...GALLERY_MAP[title].map(name => `/product_per/${name}`)];
  }

  // Fallback to cross-scent images for products without custom images (e.g. Oils, Fizz)
  const extras = [];
  const scent = title.match(SCENT_PREFIX)?.[1];

  if (scent) {
    extras.push(
      ...SCENT_TYPES.map((type) => `${scent} ${type}`).filter((related) => related !== title)
    );
  } else if (title === 'Herbal Soak' || title === 'Herbal Powder') {
    extras.push(title === 'Herbal Soak' ? 'Herbal Powder' : 'Herbal Soak');
  }

  return [primary, ...extras.slice(0, 2).map(bathImage)];
}


export const BATH_PRODUCTS = CATALOG.map((item, index) => {
  const extra = detailMap[detailKey(item.title)] || FALLBACK_DETAILS[detailKey(item.title)] || {};
  const compareAtPrice = Math.round(item.price * 1.25);
  const images = galleryFor(item.title);

  return {
    id: index + 1,
    title: item.title,
    slug: slugify(item.title),
    price: item.price,
    compareAtPrice,
    discountPercent: Math.round((1 - item.price / compareAtPrice) * 100),
    category: item.category,
    rating: extra.review?.rating || 5,
    available: true,
    badge: BADGES[index % BADGES.length],
    image: images[0],
    images,
    subtitle: extra.subtitle || '',
    size: extra.size || '',
    overview: extra.overview || '',
    benefits: extra.benefits || [],
    credentials: extra.credentials || [],
    ingredients: extra.ingredients || '',
    application: extra.application || '',
    review: extra.review || null,
  };
});

// Homepage bestsellers, grouped by the bath categories available in the catalog.
const bySoap   = BATH_PRODUCTS.filter((p) => p.category === 'SOAP');
const bySalt   = BATH_PRODUCTS.filter((p) => p.category === 'BATHING SALT');
const byOil    = BATH_PRODUCTS.filter((p) => p.category === 'BATHING OIL');
const byScrub  = BATH_PRODUCTS.filter((p) => p.category === 'BATHING SCRUB');
const byFizz   = BATH_PRODUCTS.filter((p) => p.category === 'BATHING FIZZ');
const bySoak   = BATH_PRODUCTS.filter((p) => p.category === 'BATH SOAK');

// Show six products from six distinct bath categories in the homepage grid.
export const BESTSELLERS = [
  ...bySoap.slice(0, 1),
  ...bySalt.slice(0, 1),
  ...byOil.slice(0, 1),
  ...byScrub.slice(0, 1),
  ...byFizz.slice(0, 1),
  ...bySoak.slice(0, 1),
];

export const BATH_NAV_CATEGORIES = [
  { label: 'VIEW ALL', query: null, value: null },
  { label: 'BATH SOAPS', query: 'soaps', value: 'SOAP' },
  { label: 'BATH SALTS', query: 'salts', value: 'BATHING SALT' },
  { label: 'BATH OILS', query: 'oils', value: 'BATHING OIL' },
  { label: 'BATH SCRUBS', query: 'scrubs', value: 'BATHING SCRUB' },
  { label: 'BATH FIZZ', query: 'fizz', value: 'BATHING FIZZ' },
  { label: 'BATH SOAKS', query: 'soaks', value: 'BATH SOAK' },
  { label: 'BATH POWDER', query: 'powder', value: 'BATH POWDER' },
];

export function getBathCategoryFilter(query) {
  return BATH_NAV_CATEGORIES.find((item) => item.query === query) || BATH_NAV_CATEGORIES[0];
}

export function getProductBySlug(slug) {
  return (
    BATH_PRODUCTS.find((product) => product.slug === slug) ||
    VALUE_SET_PRODUCTS.find((product) => product.slug === slug) ||
    null
  );
}

const VALUE_SET_CATALOG = [
  // ── Lavender Lune ──────────────────────────────────────────────
  {
    title: 'Lavender Lune Complete Ritual',
    price: 1499,
    compareAtPrice: 2000,
    category: 'BATH',
    badge: "People's Fav",
    image: '/value_set/Lavender Lune bath scrub, soap, oil, salt , fizz 1.png',
  },
  {
    title: 'Lavender Lune Scrub & Oil Duo',
    price: 799,
    compareAtPrice: 1050,
    category: 'BATH',
    badge: 'Best Value',
    image: '/value_set/Lavender Lune Scrub & Oil 2.png',
  },
  {
    title: 'Lavender Lune Salt & Soap Set',
    price: 649,
    compareAtPrice: 850,
    category: 'BATH',
    badge: null,
    image: '/value_set/Lavender Lune Salt & Soap  3.png',
  },
  {
    title: 'Lavender Lune Fizz, Salt & Oil Trio',
    price: 999,
    compareAtPrice: 1350,
    category: 'BATH',
    badge: 'New Arrival',
    image: '/value_set/Lavender Lune Fizz, Salt, oil 4.png',
  },

  // ── Eucalume Essence ───────────────────────────────────────────
  {
    title: 'Eucalume Complete Ritual',
    price: 1499,
    compareAtPrice: 2000,
    category: 'BATH',
    badge: "People's Fav",
    image: '/value_set/Eucalume bath scrub, soap, oil, salt , fizz 4.png',
  },
  {
    title: 'Eucalume Salt & Soap Duo',
    price: 649,
    compareAtPrice: 850,
    category: 'BATH',
    badge: 'Best Seller',
    image: '/value_set/Eucalume Salt & Soap 1.png',
  },
  {
    title: 'Eucalume Fizz, Oil & Salt Trio',
    price: 999,
    compareAtPrice: 1350,
    category: 'BATH',
    badge: null,
    image: '/value_set/Eucalume Fizz , oil, Salt 2 (1).png',
  },
  {
    title: 'Eucalume Scrub & Oil Duo',
    price: 799,
    compareAtPrice: 1050,
    category: 'BATH',
    badge: 'New Arrival',
    image: '/value_set/Eucalume Scrub & Oil 3.png',
  },

  // ── Rose ───────────────────────────────────────────────────────
  {
    title: 'Rose Complete Ritual',
    price: 1499,
    compareAtPrice: 2000,
    category: 'BATH',
    badge: "People's Fav",
    image: '/value_set/Rose bath scrub, soap, oil, salt , fizz4.png',
  },
  {
    title: 'Rose Scrub & Oil Duo',
    price: 799,
    compareAtPrice: 1050,
    category: 'BATH',
    badge: 'Best Value',
    image: '/value_set/Rose bath Scrub and oil 1.png',
  },
  {
    title: 'Rose Salt, Fizz & Oil Trio',
    price: 999,
    compareAtPrice: 1350,
    category: 'BATH',
    badge: 'Best Seller',
    image: '/value_set/Rose bath Salt, fizz,Oil 2.png',
  },
  {
    title: 'Rose Salt & Soap Set',
    price: 649,
    compareAtPrice: 850,
    category: 'BATH',
    badge: null,
    image: '/value_set/Rose Salt & soap 3.png',
  },

  // ── Marigold Mirage ────────────────────────────────────────────
  {
    title: 'Marigold Complete Ritual',
    price: 1499,
    compareAtPrice: 2000,
    category: 'BATH',
    badge: "People's Fav",
    image: '/value_set/Marigold bath scrub, soap, oil, salt , fizz 2.png',
  },
  {
    title: 'Marigold Scrub & Oil Duo',
    price: 799,
    compareAtPrice: 1050,
    category: 'BATH',
    badge: 'New Arrival',
    image: '/value_set/Marigold  Scrub & Oil 1.png',
  },
  {
    title: 'Marigold Fizz, Oil & Salt Trio',
    price: 999,
    compareAtPrice: 1350,
    category: 'BATH',
    badge: null,
    image: '/value_set/Marigold Fizz, oil,Salt 3.png',
  },
  {
    title: 'Marigold Salt & Soap Set',
    price: 649,
    compareAtPrice: 850,
    category: 'BATH',
    badge: 'Best Seller',
    image: '/value_set/Marigold Salt & Soap 4.png',
  },

  // ── Mystic Mogra ───────────────────────────────────────────────
  {
    title: 'Mogra Complete Ritual',
    price: 1499,
    compareAtPrice: 2000,
    category: 'BATH',
    badge: "People's Fav",
    image: '/value_set/Mogra bath scrub, soap, oil, salt , fizz 3n.png',
  },
  {
    title: 'Mogra Scrub & Oil Duo',
    price: 799,
    compareAtPrice: 1050,
    category: 'BATH',
    badge: 'Best Value',
    image: '/value_set/MOgra Scrub & Oil 1.png',
  },
  {
    title: 'Mogra Fizz, Salt & Oil Trio',
    price: 999,
    compareAtPrice: 1350,
    category: 'BATH',
    badge: null,
    image: '/value_set/MOgra Fizz, Salt, Oil  2n.png',
  },
  {
    title: 'Mogra Soap & Salt Set',
    price: 649,
    compareAtPrice: 850,
    category: 'BATH',
    badge: 'New Arrival',
    image: '/value_set/Mogra Soap & Salt 4.png',
  },

  // ── Coffee (Vanille Mocha) ─────────────────────────────────────
  {
    title: 'Coffee Complete Ritual',
    price: 1499,
    compareAtPrice: 2000,
    category: 'BATH',
    badge: "People's Fav",
    image: '/value_set/Coffee bath scrub, soap, oil, salt , fizz 4.png',
  },
  {
    title: 'Coffee Soap & Salt Duo',
    price: 649,
    compareAtPrice: 850,
    category: 'BATH',
    badge: 'Best Seller',
    image: '/value_set/Coffee Soap & Salt 1.png',
  },
  {
    title: 'Coffee Fizz, Salt & Oil Trio',
    price: 999,
    compareAtPrice: 1350,
    category: 'BATH',
    badge: null,
    image: '/value_set/Coffee Fizz, Salt, Oil 2.png',
  },
  {
    title: 'Coffee Scrub & Oil Duo',
    price: 799,
    compareAtPrice: 1050,
    category: 'BATH',
    badge: 'New Arrival',
    image: '/value_set/Coffee Scrub & Oil 3.png',
  },
];


export const VALUE_SET_PRODUCTS = VALUE_SET_CATALOG.map((item, index) => {
  const discountPercent = Math.round((1 - item.price / item.compareAtPrice) * 100);
  return {
    id: `vs-${index + 1}`,
    title: item.title,
    slug: slugify(item.title),
    price: item.price,
    compareAtPrice: item.compareAtPrice,
    discountPercent,
    category: item.category,
    rating: 5,
    available: true,
    badge: item.badge,
    image: item.image,
    images: [item.image],
    catalogPath: '/value-sets',
    subtitle: 'Curated value set with complementary Self Soul favourites',
    size: 'Value Set',
    overview:
      'A thoughtfully paired value set that brings together complementary Self Soul rituals at a better price. Formulated with a minimum of 98% natural ingredients and suitable for everyday care.',
    benefits: [
      'Better value than buying each product separately.',
      'Complementary formulas for a complete ritual.',
      'Minimum 98% natural ingredients.',
      'Suitable for everyday use.',
    ],
    credentials: [
      'Dermatologically Tested.',
      'Free from Parabens & Sulphates.',
      'No Harsh Chemicals.',
      'Cruelty Free.',
    ],
    ingredients: 'See individual product packaging for full ingredient lists.',
    application: 'Use each product as directed on its packaging. Ideal for gifting or building a complete bath and skincare ritual.',
    review: {
      rating: 5,
      text: 'Love this combo — great value and everything smells and feels beautiful together.',
    },
  };
});

export const VALUE_SET_NAV_CATEGORIES = [
  { label: 'VIEW ALL', query: null, value: null },
  { label: 'BATH', query: 'bath', value: 'BATH' },
];


export function getValueSetCategoryFilter(query) {
  return VALUE_SET_NAV_CATEGORIES.find((item) => item.query === query) || VALUE_SET_NAV_CATEGORIES[0];
}

export function getValueSetBySlug(slug) {
  return VALUE_SET_PRODUCTS.find((product) => product.slug === slug) || null;
}
