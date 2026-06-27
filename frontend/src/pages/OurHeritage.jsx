import { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Newsletter from '../components/Newsletter';
import BrandStoryBanner from '../components/BrandStoryBanner';
import HeritageVideoSection from '../components/HeritageVideoSection';

const features = [
  {
    img: '/images/heritage/natural.png',
    title: '98% NATURAL INGREDIENTS',
    desc: 'Our entire product portfolio is clean, green, and cruelty-free. At least 99% of plant-based ingredients are derived from organic farming, and all products contain a minimum of 98% natural ingredients.',
    to: '/ingredients',
  },
  {
    img: '/images/heritage/clinically.png',
    title: 'CLINICALLY TESTED FOR ALL SKIN TYPES',
    desc: 'Our products are rigorously tested for suitability, ensuring confidence for even the most sensitive skin and welcoming the whole family to use OW.',
    to: '/clinically-tested',
  },
  {
    img: '/images/heritage/award.png',
    title: 'AWARD WINNING, ORGANIC BEAUTY',
    desc: 'Awards from judges, industry experts, clean beauty certifiers, the public & everything in between. Special recognitions and acclaimed awards garnered for our effective natural formulas.',
  },
];

const spaItems = [
  {
    img: '/images/heritage/spa1.png',
    label: 'Luxury of an Iceland Bathhouse',
    desc: 'Bath in a bio-rich mineral tea bath to detox, restore, and refresh the body',
    shop: 'SHOP XYZ',
  },
  {
    img: '/images/heritage/spa2.png',
    label: 'Luxury of a Japanese Bathhouse',
    desc: 'Bath in a bio-rich mineral tea bath to detox, restore, and refresh the body',
    shop: 'SHOP XYZ',
  },
  {
    img: '/images/heritage/spa3.png',
    label: 'Luxury of an Egyptian Bathhouse',
    desc: 'Bath in a bio-rich mineral tea bath to detox, restore, and refresh the body',
    shop: 'SHOP XYZ',
  },
  {
    img: '/images/heritage/spa4.png',
    label: 'Luxury of a Moroccan Bathhouse',
    desc: 'Bath in a bio-rich mineral tea bath to detox, restore, and refresh the body',
    shop: 'SHOP XYZ',
  },
];

export default function OurHeritage() {
  const [spaStart, setSpaStart] = useState(0);
  const visibleCount = 3;
  const canNext = spaStart + visibleCount < spaItems.length;
  const canPrev = spaStart > 0;
  const visibleSpa = spaItems.slice(spaStart, spaStart + visibleCount);

  return (
    <main className="overflow-x-hidden bg-white text-[#203229]">
      <div className="mx-auto w-full max-w-[1366px] bg-white">
        <Header />

        <HeritageVideoSection />

        {/* ── Origin of India ── */}
        <section className="bg-[#faf5ef] px-6 pb-10 pt-16 text-center md:pb-14 md:pt-20">
          <p className="mx-auto w-full max-w-[842px] font-['Montserrat',sans-serif] text-xl font-semibold uppercase leading-[1.62] tracking-normal text-[#1a2e2a] sm:text-2xl md:min-h-[52px] md:text-[32px]">
            ORIGIN OF INDIA
          </p>
          <h2 className="mx-auto mt-2 w-full max-w-[842px] min-h-[32px] font-['Montserrat',sans-serif] text-[20px] font-medium leading-[1.62] tracking-normal text-[#1a2e2a]">
            Founded 2023
          </h2>
          <p className="mx-auto mt-6 w-full max-w-[842px] font-['Montserrat',sans-serif] text-[12px] font-normal leading-[1.62] tracking-normal text-[#41534D]">
            Organic Works understands that true beauty should not come at the expense of the environment. Every product is crafted with love and care, minimising its carbon footprint. The true source of strength for the brand, is the earth itself, using ingredients sourced from Organic farming. With 99% of it's plant based ingredients derived from sustainable sources, the brand is firmly rooted in Nature's abundance.
          </p>
        </section>

        {/* ── Feature cards (Frame 257) — full green band, founder section below ── */}
        <section className="bg-[#41534D] px-6 py-12 md:py-16 lg:flex lg:min-h-[643px] lg:items-center lg:justify-center lg:py-20">
          <div className="mx-auto flex w-full max-w-[1440px] flex-col items-center justify-center gap-y-8 lg:flex-row lg:flex-nowrap lg:gap-x-7 lg:gap-y-0 xl:gap-x-8">
            {features.map((f) => {
              const cardClass =
                'flex h-[515px] w-full max-w-[326px] shrink-0 flex-col overflow-hidden rounded-[14.16px] bg-[#FDF3EC] shadow-[0_4px_24px_rgba(0,0,0,0.12)]';
              const body = (
                <>
                  <div className="relative h-[292px] w-full shrink-0 overflow-hidden bg-[#e8e4df]">
                    <img
                      src={f.img}
                      alt={f.title}
                      className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto px-5 pb-6 pt-5 text-center">
                    <h3 className="font-['Montserrat',sans-serif] text-[20px] font-semibold uppercase leading-6 tracking-normal text-[#1B3638]">
                      {f.title}
                    </h3>
                    <p className="font-['Montserrat',sans-serif] text-[12px] font-normal leading-[1.62] tracking-normal text-[#41534D]">
                      {f.desc}
                    </p>
                  </div>
                </>
              );
              return f.to ? (
                <Link
                  key={f.title}
                  to={f.to}
                  className={`group ${cardClass} text-inherit no-underline outline-none transition-opacity hover:opacity-95 focus-visible:ring-2 focus-visible:ring-[#FDF3EC] focus-visible:ring-offset-2 focus-visible:ring-offset-[#41534D]`}
                >
                  {body}
                </Link>
              ) : (
                <article key={f.title} className={`group ${cardClass}`}>
                  {body}
                </article>
              );
            })}
          </div>
        </section>

        {/* ── About Our Story (Frame 283 + typography) ── */}
        <section className="bg-[#FDF5F0] px-6 py-12 md:px-10 md:py-16 lg:px-14 lg:py-20">
          <div className="mx-auto grid max-w-[1440px] grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-12 lg:gap-16 xl:gap-20">
            {/* Left — image (693×640, 4px radius, #EBDDD1) */}
            <div className="flex justify-center md:justify-start">
              <div className="w-full max-w-[693px] overflow-hidden rounded-[4px] bg-[#EBDDD1]">
                <img
                  src="/images/heritage/founder.png"
                  alt="Founder Aanchal"
                  className="aspect-[693/640] w-full object-cover md:aspect-auto md:h-[640px]"
                />
              </div>
            </div>
            {/* Right — text */}
            <div className="flex flex-col justify-center text-left">
              <p className="font-['Montserrat',sans-serif] text-[16px] font-normal uppercase leading-[1.62] tracking-normal text-[#41534D]">
                ABOUT OUR STORY
              </p>
              <h2 className="mt-6 font-['Montserrat',sans-serif] text-[28px] font-medium leading-[1.62] tracking-normal text-[#1B3638]">
                Hi, my name is Aanchal
              </h2>
              <p className="mt-5 max-w-lg font-['Montserrat',sans-serif] text-[12px] font-normal leading-[1.62] tracking-normal text-[#41534D]">
                I founded Inoki Self soul out of my deep love for bath rituals and because nothing like it existed—a physical product crafted from premium teas and botanicals that authentically captures the tranquility of luxury bathhouses.
              </p>
              <Link
                to="/our-store"
                className="mt-10 inline-flex w-fit rounded-full bg-[#1B3638] px-10 py-3 font-['Montserrat',sans-serif] text-[11px] font-medium uppercase tracking-[0.12em] text-white transition-colors hover:bg-[#14292c]"
              >
                READ MORE ABOUT US
              </Link>
            </div>
          </div>
        </section>

        <BrandStoryBanner />

        {/* ── Our Purpose / Putting you first (Frame 285 + Frame 70) ── */}
        <section className="bg-[#FDF5F0] px-6 py-12 md:px-10 md:py-16 lg:px-14 lg:py-20">
          <div className="mx-auto grid max-w-[1440px] grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-12 lg:gap-16 xl:gap-20">
            <div className="flex justify-center md:justify-start">
              <div className="w-full max-w-[632px] overflow-hidden rounded-[4px] bg-[#EBDDD1]">
                <img
                  src="/images/heritage/natural.png"
                  alt="Putting you first"
                  className="h-[220px] w-full object-cover sm:h-[320px] md:h-[397px]"
                />
              </div>
            </div>
            <div className="mx-auto flex w-full max-w-[556px] flex-col gap-4 justify-center md:mx-0 md:justify-self-end">
              <p className="font-['Montserrat',sans-serif] text-[16px] font-normal uppercase leading-[1.62] tracking-normal text-[#41534D]">
                OUR PURPOSE
              </p>
              <h2 className="font-['Montserrat',sans-serif] text-[28px] font-medium leading-[1.62] tracking-normal text-[#1B3638]">
                Putting you first
              </h2>
              <p className="font-['Montserrat',sans-serif] text-[12px] font-normal leading-[1.62] tracking-normal text-[#41534D]">
                Our goal is to help you prioritize your mental, physical, and spiritual well-being by transforming a part of your home into a sanctuary of peace.
              </p>
            </div>
          </div>
        </section>

        {/* ── Our Methods / Prioritizing integrity ── */}
        <section className="bg-[#FDF5F0] px-6 py-12 md:px-10 md:py-16 lg:px-14 lg:py-20">
          <div className="mx-auto grid max-w-[1440px] grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-12 lg:gap-16 xl:gap-20">
            <div className="mx-auto flex w-full max-w-[556px] flex-col gap-4 justify-center md:order-1 md:mx-0 md:justify-self-start">
              <p className="font-['Montserrat',sans-serif] text-[16px] font-normal uppercase leading-[1.62] tracking-normal text-[#41534D]">
                OUR METHODS
              </p>
              <h2 className="font-['Montserrat',sans-serif] text-[28px] font-medium leading-[1.62] tracking-normal text-[#1B3638]">
                Prioritizing integrity
              </h2>
              <p className="font-['Montserrat',sans-serif] text-[12px] font-normal leading-[1.62] tracking-normal text-[#41534D]">
                We hold ourselves to the highest standards when it comes to crafting our baths. We work with dozens of suppliers to ensure we are using the highest quality and most ethically-sourced ingredients in our baths.
              </p>
              <button
                type="button"
                className="mt-2 w-fit rounded-full bg-[#41534D] px-8 py-2.5 font-['Montserrat',sans-serif] text-[11px] uppercase tracking-widest text-white transition-colors hover:bg-[#35463f]"
              >
                See Our Ingredients
              </button>
            </div>
            <div className="flex justify-center md:order-2 md:justify-end">
              <div className="w-full max-w-[632px] overflow-hidden rounded-[4px] bg-[#EBDDD1]">
                <img
                  src="/images/heritage/conscious.png"
                  alt="Prioritizing integrity"
                  className="h-[220px] w-full object-cover sm:h-[320px] md:h-[397px]"
                />
              </div>
            </div>
          </div>
        </section>

        {/* ── Our Morales / Created consciously ── */}
        <section className="bg-[#FDF5F0] px-6 py-12 md:px-10 md:py-16 lg:px-14 lg:py-20">
          <div className="mx-auto grid max-w-[1440px] grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-12 lg:gap-16 xl:gap-20">
            <div className="flex justify-center md:justify-start">
              <div className="w-full max-w-[632px] overflow-hidden rounded-[4px] bg-[#EBDDD1]">
                <img
                  src="/images/heritage/clinically.png"
                  alt="Created consciously"
                  className="h-[220px] w-full object-cover object-center sm:h-[320px] md:h-[397px]"
                />
              </div>
            </div>
            <div className="mx-auto flex w-full max-w-[556px] flex-col gap-4 justify-center md:mx-0 md:justify-self-end">
              <p className="font-['Montserrat',sans-serif] text-[16px] font-normal uppercase leading-[1.62] tracking-normal text-[#41534D]">
                OUR MORALES
              </p>
              <h2 className="font-['Montserrat',sans-serif] text-[28px] font-medium leading-[1.62] tracking-normal text-[#1B3638]">
                Created consciously
              </h2>
              <p className="font-['Montserrat',sans-serif] text-[12px] font-normal leading-[1.62] tracking-normal text-[#41534D]">
                Sustainability is a core part of our business decisions. We strive to make our packaging is fully eco-conscious (recyclable and compostable), as we want to make sure we are leaving a low environmental impact.
              </p>
              <button
                type="button"
                className="mt-2 w-fit rounded-full bg-[#41534D] px-8 py-2.5 font-['Montserrat',sans-serif] text-[11px] uppercase tracking-widest text-white transition-colors hover:bg-[#35463f]"
              >
                Our Sustainability Focus
              </button>
            </div>
          </div>
        </section>

        {/* ── Inspired by Global Spa Sensations ── */}
        <section className="bg-[#FFF5EE] px-6 py-14 md:px-10 md:py-20 lg:px-14">
          <h2 className="mx-auto max-w-[1200px] text-center font-['Montserrat',sans-serif] text-[28px] font-semibold uppercase leading-[1.62] tracking-normal text-[#1B3638] sm:text-[30px] md:text-[32px]">
            INSPIRED BY GLOBAL SPA SENSATIONS
          </h2>

          <div className="mx-auto mt-12 flex max-w-[1280px] flex-col gap-8 md:gap-10">
            {/* Image strip — ghost arrows centered on images only */}
            <div className="relative">
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-6 md:grid-cols-3 md:gap-5 lg:gap-8">
                {visibleSpa.map((spa) => (
                  <div
                    key={`${spa.label}-img`}
                    className="group overflow-hidden rounded-[6px] shadow-[0_2px_16px_rgba(27,54,56,0.06)]"
                  >
                    <img
                      src={spa.img}
                      alt={spa.label}
                      className="aspect-square w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                    />
                  </div>
                ))}
              </div>

              {canPrev && (
                <button
                  type="button"
                  onClick={() => setSpaStart((s) => Math.max(0, s - 1))}
                  className="absolute left-0 top-1/2 z-10 flex h-[60px] w-[40px] -translate-x-2 -translate-y-1/2 items-center justify-center text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.45)] transition-opacity hover:opacity-90 md:-translate-x-3"
                  aria-label="Previous"
                >
                  <svg
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.75"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden
                  >
                    <path d="M15 18l-6-6 6-6" />
                  </svg>
                </button>
              )}
              {canNext && (
                <button
                  type="button"
                  onClick={() =>
                    setSpaStart((s) => Math.min(spaItems.length - visibleCount, s + 1))
                  }
                  className="absolute right-0 top-1/2 z-10 flex h-[60px] w-[40px] translate-x-2 -translate-y-1/2 items-center justify-center text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.45)] transition-opacity hover:opacity-90 md:translate-x-3"
                  aria-label="Next"
                >
                  <svg
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.75"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden
                  >
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-6 md:grid-cols-3 md:gap-5 lg:gap-8">
              {visibleSpa.map((spa) => (
                <article key={spa.label} className="flex flex-col gap-3 text-left">
                  <p className="font-['Montserrat',sans-serif] text-[18px] font-semibold leading-[1.62] tracking-normal text-[#1B3638]">
                    {spa.label}
                  </p>
                  <p className="font-['Montserrat',sans-serif] text-[16px] font-normal leading-[1.62] tracking-normal text-[#41534D]">
                    {spa.desc}
                  </p>
                  <button
                    type="button"
                    className="w-fit font-['Montserrat',sans-serif] text-[16px] font-semibold uppercase leading-[1.62] tracking-normal text-[#41534D] underline underline-offset-[3px] decoration-solid hover:text-[#1B3638]"
                  >
                    {spa.shop}
                  </button>
                </article>
              ))}
            </div>
          </div>
        </section>

        <BrandStoryBanner />

        <Newsletter />
        <Footer />
      </div>
    </main>
  );
}
