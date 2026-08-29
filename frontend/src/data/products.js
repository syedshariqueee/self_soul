import details from './product-details.json';

const IMAGE_FALLBACKS = {
  'Scrub Bar': 'Mystic Mogra Muse Soap',
  'Luffa Bar': 'Eucalume Essence Soap',
  'Floral Powder': 'Herbal Powder',
};

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

const FALLBACK_DETAILS = {
  'scrub bar': {
    subtitle: 'With Natural Exfoliants & Ayurvedic Herbs',
    size: '100 GM',
    overview:
      'Refresh and polish the skin with our Scrub Bar, handcrafted with Ayurvedic herbs and natural exfoliants. This dual-action bar gently lifts away dull surface cells while cleansing everyday impurities, leaving skin feeling smoother, brighter, and comfortably hydrated.',
    benefits: [
      'Gently exfoliates without harsh abrasion.',
      'Cleanses while helping skin feel smoother.',
      'Leaves skin refreshed and comfortably hydrated.',
      'Suitable for everyday bathing.',
    ],
    credentials: [
      'Handmade with Ayurvedic herbal ingredients.',
      'Free from Parabens & Sulphates.',
      'No Harsh Chemicals.',
      'Dermatologically Tested.',
    ],
    ingredients:
      'Saponified Coconut Oil, Sustainable Palm Oil, Castor Oil, Olive Oil, Vegetable Glycerin, Natural Exfoliants, Aloe Vera Extract, Neem Extract, Tulsi Extract, Vitamin E, Purified Water, Natural Botanical Fragrance.',
    application:
      'Wet the bar and your skin thoroughly. Work into a light lather and massage in circular motions, then rinse well. Use 2–3 times a week or as desired.',
    review: {
      rating: 5,
      text: 'A lovely everyday scrub bar — gentle, refreshing, and leaves skin feeling polished without dryness.',
    },
  },
  'luffa bar': {
    subtitle: 'With Natural Luffa & Ayurvedic Herbs',
    size: '100 GM',
    overview:
      'Invigorate your bath ritual with our Luffa Bar, crafted with Ayurvedic herbs and natural luffa for a gentle polishing cleanse. It helps sweep away impurities while keeping skin feeling soft, fresh, and revived.',
    benefits: [
      'Natural luffa helps buff away dullness.',
      'Cleanses without stripping the skin.',
      'Leaves skin feeling smooth and refreshed.',
      'Suitable for all skin types.',
    ],
    credentials: [
      'Handmade with Ayurvedic herbal ingredients.',
      'Free from Parabens & Sulphates.',
      'No Harsh Chemicals.',
      'Dermatologically Tested.',
    ],
    ingredients:
      'Saponified Coconut Oil, Sustainable Palm Oil, Castor Oil, Olive Oil, Vegetable Glycerin, Natural Luffa, Aloe Vera Extract, Neem Extract, Tulsi Extract, Vitamin E, Purified Water, Natural Botanical Fragrance.',
    application:
      'Wet the bar and massage over damp skin in circular motions. Rinse thoroughly. Use a few times a week for smoother, fresher-feeling skin.',
    review: {
      rating: 5,
      text: 'The luffa texture is just right — it wakes up the skin and still feels gentle enough for regular use.',
    },
  },
};

const CATALOG = [
  { title: 'Lavende Lune Soap', price: 250, category: 'SOAP' },
  { title: 'Eucalume Essence Soap', price: 250, category: 'SOAP' },
  { title: 'Roselle Rust Soap', price: 250, category: 'SOAP' },
  { title: 'Marigold Mirage Soap', price: 250, category: 'SOAP' },
  { title: 'Mystic Mogra Muse Soap', price: 250, category: 'SOAP' },
  { title: 'Vanille Mocha Soap', price: 250, category: 'SOAP' },
  { title: 'Scrub Bar', price: 250, category: 'SOAP' },
  { title: 'Luffa Bar', price: 250, category: 'SOAP' },
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
  { title: 'Floral Soak', price: 290, category: 'BATH SOAK' },
  { title: 'Herbal Powder', price: 330, category: 'BATH POWDER' },
  { title: 'Floral Powder', price: 330, category: 'BATH POWDER' },
];

const BADGES = ["People's Fav", 'Award Winner', null];

const SCENT_TYPES = ['Soap', 'Oil', 'Scrub', 'Salt', 'Fizz'];
const SCENT_PREFIX =
  /^(Lavende Lune|Eucalume Essence|Roselle Rust|Marigold Mirage|Mystic Mogra Muse|Vanille Mocha)/;

function galleryFor(title) {
  const primary = bathImage(title);
  const extras = [];
  const scent = title.match(SCENT_PREFIX)?.[1];

  if (scent) {
    extras.push(
      ...SCENT_TYPES.map((type) => `${scent} ${type}`).filter((related) => related !== title),
    );
  } else if (title === 'Herbal Soak' || title === 'Herbal Powder') {
    extras.push(title === 'Herbal Soak' ? 'Herbal Powder' : 'Herbal Soak');
  } else if (title === 'Floral Soak' || title === 'Floral Powder') {
    extras.push(title === 'Floral Soak' ? 'Herbal Powder' : 'Floral Soak');
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

export const BESTSELLERS = BATH_PRODUCTS.slice(0, 6);

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
  return BATH_PRODUCTS.find((product) => product.slug === slug) || null;
}
