import { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Newsletter from '../components/Newsletter';

const features = [
  {
    img: '/images/heritage/natural.png',
    title: '98% NATURAL INGREDIENTS',
    desc: 'Our entire product portfolio is clean, green, and cruelty-free. At least 99% of plant-based ingredients are derived from organic farming, and all products contain a minimum of 98% natural ingredients.',
  },
  {
    img: '/images/heritage/clinically.png',
    title: 'CLINICALLY TESTED FOR FOR ALL SKIN TYPES',
    desc: 'Our products are rigorously tested for suitability, ensuring confidence for even the most sensitive skin and welcoming the whole family to use OW.',
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

  return (
    <main className="overflow-x-hidden bg-white text-[#203229]">
      <div className="mx-auto w-full max-w-[1366px] bg-white">
        <Header />

        {/* ── Video Section ── */}
        <section className="flex min-h-[320px] items-center justify-center bg-[#d8d5cf] md:min-h-[420px]">
          <div className="flex flex-col items-center gap-3 text-[#7a7572]">
            <svg width="52" height="52" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <polygon points="10 8 16 12 10 16 10 8" fill="currentColor" stroke="none" />
            </svg>
            <span className="font-['Montserrat',sans-serif] text-sm uppercase tracking-[0.3em] text-[#7a7572]">Video</span>
          </div>
        </section>

        {/* ── Origin of India ── */}
        <section className="bg-[#faf5ef] px-6 pb-0 pt-16 text-center md:pt-20">
          <p className="font-['Montserrat',sans-serif] text-[10px] uppercase tracking-[0.35em] text-[#9b948c]">Origin of India</p>
          <h2 className="mt-2 font-serif text-2xl font-normal text-[#1a2e2a] md:text-[28px]">Founded 2023</h2>
          <p className="mx-auto mt-6 max-w-2xl font-['Montserrat',sans-serif] text-[12px] leading-[1.9] text-[#6b6566]">
            Organic Works understands that true beauty should not come at the expense of the environment. Every product is crafted with love and care, minimising its carbon footprint. The true source of strength for the brand, is the earth itself, using ingredients sourced from Organic farming. With 99% of it's plant based ingredients derived from sustainable sources, the brand is firmly rooted in Nature's abundance.
          </p>

          {/* Feature Cards — sit on the dark green band */}
          <div className="relative mt-14">
            {/* Dark green background that bleeds into next section */}
            <div className="absolute inset-x-0 bottom-0 top-1/2 bg-[#3d5249]" />
            <div className="relative mx-auto grid max-w-4xl grid-cols-1 gap-5 sm:grid-cols-3">
              {features.map((f) => (
                <div key={f.title} className="flex flex-col overflow-hidden rounded-xl bg-white shadow-md">
                  <div className="overflow-hidden">
                    <img
                      src={f.img}
                      alt={f.title}
                      className="h-48 w-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                  </div>
                  <div className="flex flex-col gap-2 p-5 text-center">
                    <h3 className="font-['Montserrat',sans-serif] text-[10px] font-bold uppercase tracking-[0.2em] text-[#1a2e2a]">
                      {f.title}
                    </h3>
                    <p className="font-['Montserrat',sans-serif] text-[11px] leading-relaxed text-[#6b6566]">
                      {f.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Dark green spacer under cards ── */}
        <div className="h-16 bg-[#3d5249]" />

        {/* ── About Our Story ── */}
        <section className="grid grid-cols-1 md:grid-cols-2 min-h-[420px]">
          {/* Left — image */}
          <div className="min-h-[300px] overflow-hidden md:min-h-0 bg-[#ede8e0]">
            <img
              src="/images/heritage/founder.png"
              alt="Founder Aanchal"
              className="h-full w-full object-cover"
            />
          </div>
          {/* Right — text */}
          <div className="flex flex-col justify-center bg-[#faf5ef] px-10 py-14 md:px-14">
            <p className="font-['Montserrat',sans-serif] text-[10px] uppercase tracking-[0.35em] text-[#9b948c]">About Our Story</p>
            <h2 className="mt-4 font-serif text-3xl font-normal leading-snug text-[#1a2e2a] md:text-[38px]">
              Hi, my name is Aanchal
            </h2>
            <p className="mt-5 max-w-md font-['Montserrat',sans-serif] text-[12px] leading-[1.9] text-[#6b6566]">
              I founded Incki Self soul out of my deep love for bath rituals and because nothing like it existed—a physical product crafted from premium teas and botanicals that authentically captures the tranquillity of luxury bathhouses.
            </p>
            <button className="mt-8 w-fit rounded-full bg-[#3d5249] px-8 py-2.5 font-['Montserrat',sans-serif] text-[11px] uppercase tracking-widest text-white transition-colors hover:bg-[#2e3d36]">
              Read More About Us
            </button>
          </div>
        </section>

        {/* ── Full-bleed Founder Banner ── */}
        <section className="relative flex min-h-[380px] items-center justify-center overflow-hidden md:min-h-[460px]">
          <img
            src="/images/heritage/integrity.png"
            alt="Self Soul brand"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-black/30" />
          <div className="relative z-10 px-6 text-center text-white">
            <p className="font-serif text-5xl font-light tracking-[0.22em] drop-shadow-lg md:text-7xl">
              SELF'SOUL
            </p>
            <p className="mt-3 font-['Montserrat',sans-serif] text-[11px] uppercase tracking-[0.5em] text-white/80">
              Heal with Nature
            </p>
          </div>
        </section>

        {/* ── Putting you first ── */}
        <section className="grid grid-cols-1 md:grid-cols-2 min-h-[400px]">
          <div className="min-h-[280px] overflow-hidden md:min-h-0">
            <img
              src="/images/heritage/natural.png"
              alt="Putting you first"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="flex flex-col justify-center bg-[#faf5ef] px-10 py-14 md:px-14">
            <p className="font-['Montserrat',sans-serif] text-[10px] uppercase tracking-[0.35em] text-[#9b948c]">Our Purpose</p>
            <h2 className="mt-4 font-serif text-3xl font-normal leading-snug text-[#1a2e2a] md:text-[36px]">
              Putting you first
            </h2>
            <p className="mt-5 max-w-md font-['Montserrat',sans-serif] text-[12px] leading-[1.9] text-[#6b6566]">
              Our goal is to help you prioritize your mental, physical, and spiritual well-being by transforming a part of your home into a sanctuary of peace.
            </p>
          </div>
        </section>

        {/* ── Prioritizing Integrity ── */}
        <section className="grid grid-cols-1 md:grid-cols-2 min-h-[400px]">
          <div className="flex flex-col justify-center bg-[#faf5ef] px-10 py-14 md:px-14">
            <p className="font-['Montserrat',sans-serif] text-[10px] uppercase tracking-[0.35em] text-[#9b948c]">Our Methods</p>
            <h2 className="mt-4 font-serif text-3xl font-normal leading-snug text-[#1a2e2a] md:text-[36px]">
              Prioritizing integrity
            </h2>
            <p className="mt-5 max-w-md font-['Montserrat',sans-serif] text-[12px] leading-[1.9] text-[#6b6566]">
              We hold ourselves to the highest standards when it comes to crafting our baths. We work with dozens of suppliers to ensure we are using the highest quality and most ethically-sourced ingredients in our baths.
            </p>
            <button className="mt-8 w-fit rounded-full bg-[#3d5249] px-8 py-2.5 font-['Montserrat',sans-serif] text-[11px] uppercase tracking-widest text-white transition-colors hover:bg-[#2e3d36]">
              See Our Ingredients
            </button>
          </div>
          <div className="min-h-[280px] overflow-hidden md:min-h-0">
            <img
              src="/images/heritage/conscious.png"
              alt="Prioritizing integrity"
              className="h-full w-full object-cover"
            />
          </div>
        </section>

        {/* ── Created Consciously ── */}
        <section className="grid grid-cols-1 md:grid-cols-2 min-h-[400px]">
          <div className="min-h-[280px] overflow-hidden md:min-h-0">
            <img
              src="/images/heritage/clinically.png"
              alt="Created consciously"
              className="h-full w-full object-cover object-center"
            />
          </div>
          <div className="flex flex-col justify-center bg-[#faf5ef] px-10 py-14 md:px-14">
            <p className="font-['Montserrat',sans-serif] text-[10px] uppercase tracking-[0.35em] text-[#9b948c]">Our Morales</p>
            <h2 className="mt-4 font-serif text-3xl font-normal leading-snug text-[#1a2e2a] md:text-[36px]">
              Created consciously
            </h2>
            <p className="mt-5 max-w-md font-['Montserrat',sans-serif] text-[12px] leading-[1.9] text-[#6b6566]">
              Sustainability is a core part of our business decisions. We strive to make our packaging is fully eco-conscious (recyclable and compostable), as we want to make sure we are leaving a low environmental impact.
            </p>
            <button className="mt-8 w-fit rounded-full bg-[#3d5249] px-8 py-2.5 font-['Montserrat',sans-serif] text-[11px] uppercase tracking-widest text-white transition-colors hover:bg-[#2e3d36]">
              Our Sustainability Focus
            </button>
          </div>
        </section>

        {/* ── Inspired by Global Spa Sensations ── */}
        <section className="bg-[#faf5ef] px-6 py-14 md:py-20">
          <h2 className="text-center font-['Montserrat',sans-serif] text-[11px] font-semibold uppercase tracking-[0.3em] text-[#1a2e2a]">
            Inspired by Global Spa Sensations
          </h2>

          <div className="relative mt-10">
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
              {spaItems.slice(spaStart, spaStart + visibleCount).map((spa) => (
                <div key={spa.label} className="group flex flex-col gap-3">
                  <div className="overflow-hidden rounded-sm">
                    <img
                      src={spa.img}
                      alt={spa.label}
                      className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <p className="font-['Montserrat',sans-serif] text-[13px] font-semibold text-[#1a2e2a]">{spa.label}</p>
                    <p className="font-['Montserrat',sans-serif] text-[11px] leading-relaxed text-[#6b6566]">{spa.desc}</p>
                    <button className="mt-1 w-fit font-['Montserrat',sans-serif] text-[10px] font-semibold uppercase tracking-widest text-[#3d5249] underline underline-offset-2 hover:text-[#1a2e2a]">
                      {spa.shop}
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Navigation arrows */}
            {canPrev && (
              <button
                onClick={() => setSpaStart((s) => Math.max(0, s - 1))}
                className="absolute -left-4 top-[30%] flex h-9 w-9 items-center justify-center rounded-full bg-white shadow-md hover:bg-[#f0ebe3] transition-colors"
                aria-label="Previous"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6"/></svg>
              </button>
            )}
            {canNext && (
              <button
                onClick={() => setSpaStart((s) => Math.min(spaItems.length - visibleCount, s + 1))}
                className="absolute -right-4 top-[30%] flex h-9 w-9 items-center justify-center rounded-full bg-white shadow-md hover:bg-[#f0ebe3] transition-colors"
                aria-label="Next"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
              </button>
            )}
          </div>
        </section>

        {/* ── Brand Banner ── */}
        <section className="relative flex min-h-[300px] items-center justify-center overflow-hidden md:min-h-[360px]">
          <img
            src="/images/heritage/founder.png"
            alt="Self Soul"
            className="absolute inset-0 h-full w-full object-cover object-top"
          />
          <div className="absolute inset-0 bg-black/35" />
          <div className="relative z-10 px-6 text-center text-white">
            <p className="font-serif text-5xl font-light tracking-[0.22em] drop-shadow-lg md:text-7xl">SELF'SOUL</p>
            <p className="mt-3 font-['Montserrat',sans-serif] text-[10px] uppercase tracking-[0.5em] text-white/80">
              Heal with Nature
            </p>
          </div>
        </section>

        <Newsletter />
        <Footer />
      </div>
    </main>
  );
}
