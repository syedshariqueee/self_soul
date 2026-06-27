import Header from '../components/Header';
import Footer from '../components/Footer';
import Newsletter from '../components/Newsletter';
import HeritageVideoSection from '../components/HeritageVideoSection';
import BrandStoryBanner from '../components/BrandStoryBanner';

/** Static PNGs: `public/heritage/98%ingredent/1.png` … `18.png` — `%` must be encoded as %25 in URLs */
const INGREDIENT_IMG = (n) => `/heritage/98%25ingredent/${n}.png`;

/**
 * Optional extra classes per 1-based image index for tighter crops / zoom (front & back use same framing).
 * Tweak keys after reviewing assets (e.g. scale-110, object-[center_20%], origin-top).
 */
const INGREDIENT_PHOTO_FRAMING = {
  // Examples — adjust to taste after visual QA:
  // 9: 'scale-110 origin-center',
  // 14: 'scale-105 object-[center_40%]',
};

const INGREDIENTS = [
  {
    name: 'Black Goji Berry',
    slug: 'black-goji',
    desc: 'Black Goji Berries, commonly known in Chinese medicine, are renowned for their potential to promote sleep quality and boost overall well-being. These small fruits are nutrient-dense with a greater anthocyanin content than that of other berry varieties. Abundant with antioxidants, minerals, and essential amino acids, these fruits may help to improve skin hydration and tone.',
  },
  {
    name: 'Butterfly Pea Flower',
    slug: 'butterfly-pea',
    desc: 'Butterfly Pea Flowers have been utilized for centuries to help keep skin looking firm, youthful, and bright. This delicate flower is high in antioxidants and anti-inflammatory properties which enhances skin quality while also calming the mind. The Butterfly Pea Flower is a member of the Fabaceae family, commonly found in countries in Southeast Asia such as Thailand and Sri Lanka.',
  },
  {
    name: 'Calendula',
    slug: 'calendula',
    desc: 'Calendula is native to Southeast Asia, the Mediterranean, and Western Europe, and has had a long history of being used in ancient cultures for its medicinal properties. High in antioxidants calendula soothes the skin, stimulates firmness, and improves elasticity. Notably, recent research has shown that the flower has antiviral and anti-dermatitis properties as well.',
  },
  {
    name: 'Centella Asiatica',
    slug: 'centella',
    desc: 'Centella Asiatica extract is one of the most widely-used ingredients in the skincare market. A natural skin tonic used for centuries in Asia to treat acne, wounds, and burns, studies suggest that it may also help to reduce the appearance of blemishes. By helping to improve cellular metabolism and increase moisture retention.',
  },
  {
    name: 'Chamomile Tea',
    slug: 'chamomile',
    desc: 'Chamomile flowers are widely considered to facilitate feelings of relaxation, which has made them a popular ingredient in natural sedatives and sleep aids. Natural remedies help to manage feelings of anxiety, as well as detoxifying and purifying formulations to support the body\'s natural healing abilities. Chamomile tea is reputed to help manage feelings of discomfort from inflammation and irritation.',
  },
  {
    name: 'Cinnamon Bark',
    slug: 'cinnamon',
    desc: 'Cinnamon Bark acts as a mood enhancer known for its sweet, woody, and spicy scent—which is reputed to be a mood enhancer. A warming ingredient rich in antioxidants, it is often used in aromatherapy massage as it stimulates feelings of relaxation and invokes a sense of well-being with its rich, sensual scent.',
  },
  {
    name: 'Coconut Milk',
    slug: 'coconut',
    desc: 'Coconut milk is a hydrating, conditioning, and moisturizing ingredient. For centuries, coconuts have been a staple ingredient in beauty products that were made and used by communities all around the world. Due to its ability to moisturize and condition the body, coconut milk continues to be used cosmetically, typically as a moisturizer, and in soaps to enhance the look and feel of skin.',
  },
  {
    name: 'Hojicha Tea',
    slug: 'hojicha',
    desc: 'Hojicha tea is a roasted variation of green tea which contains L-Theanine: a unique amino acid that helps the body and mind to relax, reduce stress, and lower anxiety. Hojicha is perfect to drink at all times of the day for a boost of energy or to simply take a break during stressful moments. Hojicha Tea contains antioxidants, including vitamins C and E. These antioxidant properties promote elastin on the skin, helping the skin retain its youth.',
  },
  {
    name: 'Honey',
    slug: 'honey',
    desc: 'Honey is great for the body and skin! Research has shown that it can be beneficial for a variety of skin conditions such as acne and dermatitis. It has been suggested that honey can also promote the formation of collagen, a crucial element for keeping skin looking young and healthy. In other words, honey can be an excellent anti-aging agent.',
  },
  {
    name: 'Jasmine Flowers',
    slug: 'jasmine-flowers',
    desc: 'Jasmine flowers lend a delicate floral aroma prized in bath rituals for relaxation. Traditionally used to soften and comfort skin, jasmine supports a sense of calm while leaving a subtle, uplifting fragrance.',
  },
  {
    name: 'Jasmine Pearls',
    slug: 'jasmine-pearls',
    desc: 'Hand-rolled jasmine pearls infuse slowly in warm water, releasing layered fragrance. Their gentle antioxidants complement mindful bathing and a serene, spa-like atmosphere.',
  },
  {
    name: 'Lavender Buds',
    slug: 'lavender',
    desc: 'Lavender is cherished for its soothing aroma and skin-comforting properties. Rich in calming botanical compounds, it helps create a peaceful soak while supporting a refreshed, balanced feeling.',
  },
  {
    name: 'Moringa Leaf',
    slug: 'moringa',
    desc: 'Moringa leaves are nutrient-dense and traditionally valued for vitamins and minerals that nourish and revitalize. In bath formulas they contribute to a green, earthy note and a wholesome sense of renewal.',
  },
  {
    name: 'Moroccan Spearmint',
    slug: 'spearmint',
    desc: 'Mint herb has been used in Ayurvedic medicine for centuries to soothe skin irritations and headaches. With anti-bacterial properties, spearmint cleanses and relieves skin irritations. In aromatherapy, mint has been said to stimulate the skin, enhance mood, and promote concentration. Its revitalizing aroma helps lift spirits and ease mental stress.',
  },
  {
    name: 'Mugwort',
    slug: 'mugwort',
    desc: 'Mugwort has long been used in traditional herbal baths for its warming, grounding qualities. Its aromatic leaves are chosen for restorative soaks that invite relaxation and quiet comfort.',
  },
  {
    name: 'Oat (Gluten-Free)',
    slug: 'oat',
    desc: 'Finely ground gluten-free oat helps soothe and soften sensitive skin. Known for its gentle, comforting texture, oat supports a creamy, nurturing bath experience.',
  },
  {
    name: 'Oolong Milk Tea',
    slug: 'oolong',
    desc: 'Oolong tea brings roasted depth and mild sweetness to the blend. Enjoyed for balanced energy and antioxidants, it complements indulgent, tea-inspired bath rituals.',
  },
  {
    name: 'Rose Buds & Petals',
    slug: 'rose',
    desc: 'Roses are native to Asia with some species also present in North America, Europe and Northwest Africa. Roses have been associated with love, beauty and spiritual worship for thousands of years. Give yourself a relaxing day with our organic roses. They contain anti-inflammatory and antioxidant properties, which help reduce redness and promote anti-aging effects.',
  },
];

export default function Ingredients() {
  return (
    <main className="overflow-x-hidden bg-white text-[#203229]">
      <div className="mx-auto w-full max-w-[1366px] bg-white">
        <Header />

        <HeritageVideoSection />

        <section className="relative bg-[#FDF5F0] px-6 pb-12 pt-2 md:pb-16 md:pt-4">
          <div className="mx-auto flex max-w-[820px] flex-col items-center text-center mt-15">
           
            <h1 className="font-['Montserrat',sans-serif] text-[32px] font-semibold uppercase leading-[1.62] tracking-normal text-[#1B3638]">
              Browse Our Herbal Collection
            </h1>
            <p className="mt-8 max-w-[640px] font-['Montserrat',sans-serif] text-[12px] font-normal leading-[1.62] tracking-normal text-[#41534D]">
              Our premium, organic bath products are ethically sourced and free of artificial scents. Explore our glossary
              to learn more about each ingredient and why we selected them to be a part of our carefully curated bath
              formulas. Hover over the ingredient card to learn more.
            </p>
          </div>
        </section>

        <section className="bg-[#FDF5F0] px-4 pb-16 pt-2 sm:px-6 md:pb-20 lg:px-10">
          <div className="mx-auto grid max-w-[1312px] grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4 lg:gap-6">
            {INGREDIENTS.map((item, index) => {
              const photoIndex = index + 1;
              const imgSrc = INGREDIENT_IMG(photoIndex);
              const framing = INGREDIENT_PHOTO_FRAMING[photoIndex] ?? '';

              return (
              <article
                key={item.slug}
                tabIndex={0}
                className="group relative mx-auto w-full max-w-[303px] rounded-[4px] outline-none [perspective:1200px] focus-visible:ring-2 focus-visible:ring-[#41534D] focus-visible:ring-offset-2 focus-visible:ring-offset-[#FDF5F0]"
              >
                <div className="relative aspect-[303/364] w-full">
                  <div className="absolute inset-0 transition-transform duration-700 ease-out [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] group-focus-within:[transform:rotateY(180deg)]">
                    {/* Front */}
                    <div className="absolute inset-0 overflow-hidden rounded-[4px] shadow-none [backface-visibility:hidden] [transform:rotateY(0deg)]">
                      <img
                        src={imgSrc}
                        alt={item.name}
                        className={`absolute inset-0 h-full w-full object-cover object-center ${framing}`}
                        loading="lazy"
                      />
                      <div className="absolute left-1/2 top-1/2 flex w-[88%] -translate-x-1/2 -translate-y-1/2 justify-center">
                        {/* Frame 320 — pad 10px, radius 4px, fill #1B3638 */}
                        <div className="inline-flex max-w-[95%] items-center justify-center rounded-[4px] bg-[#1B3638] p-[10px]">
                          <span className="text-center font-['Montserrat',sans-serif] text-[16px] font-semibold leading-[1.62] tracking-normal text-white">
                            {item.name}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Back */}
                    <div className="absolute inset-0 overflow-hidden rounded-[4px] shadow-none [backface-visibility:hidden] [transform:rotateY(180deg)]">
                      <img
                        src={imgSrc}
                        alt=""
                        className={`absolute inset-0 h-full w-full scale-105 object-cover object-center blur-[0.5px] ${framing}`}
                        loading="lazy"
                        aria-hidden
                      />
                      <div className="absolute inset-0 bg-black/40" />
                      <div className="relative flex h-full flex-col items-center justify-center gap-[10px] px-2 py-3">
                        {/* Title chip — Frame 320 */}
                        <div className="inline-flex max-w-[90%] shrink-0 items-center justify-center rounded-[4px] bg-[#1B3638] p-[10px]">
                          <span className="text-center font-['Montserrat',sans-serif] text-[16px] font-semibold leading-[1.62] tracking-normal text-white">
                            {item.name}
                          </span>
                        </div>
                        {/* Description box — 255px max, pad & radius 4px, gap 10px from title */}
                        <div className="max-h-[220px] w-full max-w-[255px] shrink-0 overflow-y-auto rounded-[4px] bg-[#1B3638] p-[10px] sm:max-h-[240px]">
                          <p className="text-center font-['Montserrat',sans-serif] text-[12px] font-normal leading-[1.62] tracking-normal text-white">
                            {item.desc}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            );
            })}
          </div>
        </section>

        <BrandStoryBanner />
        <Newsletter />
        <Footer />
      </div>
    </main>
  );
}
