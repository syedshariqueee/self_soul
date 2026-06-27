import Header from '../components/Header';
import Footer from '../components/Footer';
import Newsletter from '../components/Newsletter';
import BrandStoryBanner from '../components/BrandStoryBanner';

const bathRituals = [
  { title: "Relaxing", img: "/images/relaxing.jpg" },
  { title: "Healing", img: "/images/healing.jpg" },
  { title: "Nourishing", img: "/images/Nourishing.jpg" },
];

const ingredientTags = [
  "100% ingredients",
  "100% cruelty free",
  "Suitable for all skin types",
  "100% vegan",
  "100% curated",
];

const bestsellerImages = [
  { src: "/images/bestseller/best1.jpg", alt: "Bestseller product 1" },
  { src: "/images/bestseller/best6.jpg", alt: "Bestseller product 6" },
  { src: "/images/bestseller/best5.png", alt: "Bestseller product 5" },
  { src: "/images/bestseller/best4.jpg", alt: "Bestseller product 4" },
  { src: "/images/bestseller/best3.png", alt: "Bestseller product 3" },
  { src: "/images/bestseller/best2.png", alt: "Bestseller product 2" },
];

export default function Home() {
  return (
    <main className="overflow-x-hidden bg-[#f7f5f2] pb-8 text-[#203229] md:pb-10">
      <div className="mx-auto w-full max-w-[1366px] bg-white">
        <Header />

        <section
          className="grid items-center bg-[#f9efe3] px-4 py-10 sm:px-6 md:px-8 md:py-12 lg:px-14 lg:py-16"
          style={{
            backgroundImage:
              "linear-gradient(90deg, rgba(249,239,227,0.98) 0%, rgba(249,239,227,0.95) 34%, rgba(249,239,227,0.35) 62%), url('/images/hero-bg.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div className="max-w-[560px]">
            <p className="mb-2 font-['Montserrat',sans-serif] text-[36px] font-medium italic leading-[1.62] tracking-normal text-[#1B3638] sm:mb-3">
              Get more , spend less!
            </p>
            <h2 className="max-w-[500px] text-4xl font-semibold leading-[1.15] tracking-[0.01em] text-[#162f43] sm:text-5xl md:text-[58px]">
              BUY ONE GET SECOND HALF PRICE
            </h2>
            <p className="mt-3 text-xl leading-[1.25] text-[#162f43] sm:mt-4 sm:text-2xl md:text-[36px]">
              Spend ₹600, Unwrap a Surpise gift wrh ₹2100!
            </p>
            <button className="mt-6 rounded-full border border-[#233b4d] bg-[#fffdf8] px-7 py-2 text-sm text-[#22384a] shadow-[0_1px_0_rgba(255,255,255,0.8)]">
              SHOP NOW
            </button>
          </div>
        </section>

        <section className="bg-[#faf3eb] px-4 py-12 sm:px-6 sm:py-14 md:px-10 md:py-16 lg:px-14">
          <h3 className="text-center font-['Montserrat',sans-serif] text-2xl font-medium tracking-tight text-[#1a3030] sm:text-3xl md:text-[32px]">
            Bath Rituals
          </h3>
          <div className="mx-auto mt-8 grid max-w-[1200px] justify-items-center gap-4 sm:mt-10 sm:grid-cols-3 sm:gap-5 md:gap-6">
            {bathRituals.map((item) => (
              <article
                key={item.title}
                className="relative aspect-square w-full max-w-[368px] overflow-hidden rounded-[12px] bg-[#e8e4dc]"
              >
                <img
                  src={item.img}
                  alt={item.title}
                  className="absolute inset-0 h-full w-full scale-105 object-cover blur-[2.6px]"
                />
                <div
                  className="absolute inset-0 bg-black/[0.28]"
                  aria-hidden
                />
                <p className="absolute inset-0 flex items-center justify-center font-['Montserrat',sans-serif] text-xl font-medium text-white sm:text-2xl">
                  {item.title}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section
          className="w-screen max-w-[100vw] shrink-0"
          style={{
            marginLeft: "calc(50% - 50vw)",
            marginRight: "calc(50% - 50vw)",
          }}
        >
          <div className="flex w-full flex-col gap-0 md:h-[720px] md:min-h-[720px] md:flex-row">
            <img
              src="/images/mid1.jpg"
              alt="Organic works products in a natural setting"
              className="block aspect-[4/3] w-full object-cover md:aspect-auto md:h-full md:w-1/2 md:min-h-0"
            />
            <img
              src="/images/mid2.png"
              alt="Hair care benefits"
              className="block aspect-[4/3] w-full object-cover md:aspect-auto md:h-full md:w-1/2 md:min-h-0"
            />
          </div>
        </section>

        <section className="bg-[#6b7b6b] px-4 py-8 sm:px-6 md:px-10 md:py-10 lg:px-14">
          <div className="mx-auto flex min-h-[208px] max-w-[1440px] flex-col items-center justify-center text-center text-white">
            <h2 className="font-['Montserrat',sans-serif] text-xs font-medium uppercase tracking-[0.12em] sm:text-sm md:text-[15px]">
              Clinically approved, clean beauty
            </h2>
            <p className="mt-3 max-w-[920px] font-['Montserrat',sans-serif] text-[11px] leading-[1.65] text-white/95 sm:text-xs sm:leading-relaxed md:text-[13px] md:leading-7">
              Organic Works is a multi-award-winning beauty brand that promises clean beauty without
              compromise - Driven by passion for making natural and organic products that are genuinely
              effective, kind to the skin and manufactured sustainably.
            </p>
          </div>
        </section>

        <section className="bg-white px-4 py-8 sm:px-6 sm:py-10 md:px-10 md:py-12 lg:px-14">
          <div className="mx-auto w-full max-w-[1200px] bg-white p-3 sm:p-4">
            <div className="grid w-full grid-cols-1 gap-3 md:grid-cols-[minmax(260px,0.8fr)_minmax(0,1.2fr)] md:items-stretch md:gap-3">
              <div className="flex min-h-[280px] w-full flex-col items-start justify-center bg-[#414d47] px-8 py-10 font-['Montserrat',sans-serif] text-white sm:px-10 sm:py-12 md:h-full md:min-h-0 md:px-9 md:py-10 lg:px-10 lg:py-11">
                  <h2 className="text-3xl font-bold leading-tight tracking-tight sm:text-4xl">Best Sellers</h2>
                  <p className="mt-3 text-lg font-medium leading-snug text-white sm:text-xl">Everlasting Favourites</p>
                  <p className="mt-4 max-w-[22ch] text-xs leading-relaxed text-white/85 sm:text-sm">
                    <span className="block">our crowd-pleasers with</span>
                    <span className="block">guaranteed</span>
                  </p>
                  <button
                    type="button"
                    className="mt-8 w-fit rounded-full bg-[#5c6e62] px-8 py-2.5 text-sm font-medium text-white shadow-sm transition-opacity hover:opacity-90"
                  >
                    Explore
                  </button>
                </div>
                <div className="min-h-0 w-full md:h-full md:min-h-0">
                  <div className="grid h-auto min-h-[200px] w-full grid-cols-2 gap-3 bg-white md:h-full md:min-h-0 md:grid-cols-3">
                    {bestsellerImages.map((item) => (
                      <div
                        key={item.src}
                        className="relative aspect-square min-h-0 min-w-0 overflow-hidden bg-neutral-100"
                      >
                        <img
                          src={item.src}
                          alt={item.alt}
                          width={240}
                          height={240}
                          className="absolute inset-0 h-full w-full object-cover"
                          loading="lazy"
                        />
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[#e8e8e8]">
          <div className="flex min-h-[260px] w-full items-center justify-center font-['Montserrat',sans-serif] text-lg font-medium text-[#1a3030] sm:min-h-[320px] sm:text-xl">
            Video
          </div>
        </section>

        <section className="bg-[#ebddd1] px-4 py-12 sm:px-6 sm:py-14 md:px-10 md:py-16 lg:px-14">
          <div className="mx-auto max-w-[720px] text-center text-[#1a3030]">
            <h2 className="font-serif text-2xl font-normal leading-snug sm:text-3xl md:text-[32px]">
              Clean Beauty. It&apos;s in our DNA
            </h2>
            <p className="mt-5 font-['Montserrat',sans-serif] text-base font-medium leading-[1.62] tracking-normal text-[#3d4a42]">
              Our entire product portfolio is clean, green, and cruelty-free. At least 99% of plant-based
              ingredients are derived from organic farming, and all products contain a minimum of 98%
              natural ingredients. We also test our products for suitability to even the most sensitive
              skin, so the whole family can feel confident using OW.
            </p>
            <div className="mt-10 flex flex-wrap items-start justify-center gap-8 sm:gap-10 md:mt-12 md:gap-14">
              {[
                {
                  label: "Natural origin",
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
                  label: "Sensitive skin",
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
                  label: "Cruelty-free",
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
                  label: "Gentle care",
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
              ].map((item) => (
                <div key={item.label} className="flex w-[72px] flex-col items-center gap-2 sm:w-[80px]">
                  <span className="flex h-14 w-14 items-center justify-center rounded-full border border-[#1a3030]/35 text-[#1a3030]">
                    <svg viewBox="0 0 24 24" className="h-7 w-7" aria-hidden>
                      {item.svg}
                    </svg>
                  </span>
                  <span className="font-['Montserrat',sans-serif] text-[10px] leading-tight text-[#3d4a42] sm:text-[11px]">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section
          className="relative flex min-h-[min(520px,70vh)] w-full items-center justify-center px-6 py-16 md:min-h-[min(580px,65vh)] md:py-24"
          style={{
            backgroundImage:
              "linear-gradient(rgba(0,0,0,0.06), rgba(0,0,0,0.12)), url('/images/mid3.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <p
            className="relative z-[1] mx-auto flex w-full max-w-[min(56rem,94vw)] flex-col items-center gap-2 text-center font-['Montserrat',sans-serif] text-sm font-medium leading-[1.62] tracking-normal text-white md:gap-2.5 md:text-sm lg:text-[17px] xl:text-lg"
            style={{
              textShadow: "0 1px 12px rgba(0,0,0,0.22)",
            }}
          >
            <span className="block w-full text-balance md:w-auto md:whitespace-nowrap">
              Experience harmonious blend of time - honored traditions and locally sourced ingredients,
            </span>
            <span className="block w-full text-balance md:w-auto md:whitespace-nowrap">
              chosen for its unique ability to nurture and rejuvenate the skin.
            </span>
          </p>
        </section>

        <section className="bg-[#687C69] px-6 py-14 text-white sm:px-8 sm:py-16 md:py-20 lg:px-10 lg:py-[4.5rem]">
          <div className="mx-auto flex max-w-[900px] flex-col items-center">
            <h2 className="text-center font-['Montserrat',sans-serif] text-xs font-medium uppercase tracking-[0.2em] text-white sm:text-sm md:text-[15px]">
              What they say
            </h2>
            <div className="mx-auto mt-6 grid w-full max-w-[min(40rem,92vw)] grid-cols-[auto_minmax(0,1fr)_auto] items-start gap-x-2 sm:mt-8 sm:gap-x-3 md:max-w-[44rem] md:gap-x-5">
              <span
                className="pt-0.5 font-serif text-[2.5rem] leading-[0.85] text-white sm:text-5xl md:text-[3.25rem]"
                aria-hidden
              >
                &ldquo;
              </span>
              <blockquote className="min-w-0 pt-1 text-center font-['Montserrat',sans-serif] text-sm font-normal leading-[1.65] text-white sm:text-base md:pt-0.5 md:text-lg md:leading-relaxed">
                <span className="block md:whitespace-nowrap">
                  Leaves skin refreshed, hydrated, and glowing! Gentle, effective, and{" "}
                </span>
                <span className="block">perfect for all skin types.</span>
              </blockquote>
              <span
                className="pt-0.5 font-serif text-[2.5rem] leading-[0.85] text-white sm:text-5xl md:text-[3.25rem]"
                aria-hidden
              >
                &rdquo;
              </span>
            </div>
          </div>
        </section>

        <section className="w-full">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <img
              src="/images/mid4.png"
              alt="Mountain valley with wildflowers"
              className="h-full min-h-[260px] w-full object-cover md:min-h-[320px] lg:min-h-[360px]"
            />
            <div className="flex min-h-[280px] flex-col items-center justify-center bg-[#ebddd1] px-8 py-12 text-center sm:px-10 sm:py-14 md:min-h-[320px] md:py-16 lg:min-h-[360px]">
              <h2 className="max-w-[22ch] font-serif text-2xl font-normal leading-snug text-[#1a3030] sm:text-3xl md:text-[32px]">
                Unveiling the symphony of Nature
              </h2>
              <p className="mt-5 max-w-md font-['Montserrat',sans-serif] text-sm font-medium leading-[1.62] tracking-normal text-[#3d4a42]">
                Discover botanicals gathered with care and formulated to respect your skin and the
                landscapes they come from — a quiet rhythm of purity, potency, and place.
              </p>
              <a
                href="#"
                className="mt-8 font-['Montserrat',sans-serif] text-sm font-medium text-[#1a3030] underline decoration-[#1a3030]/40 underline-offset-4 transition-colors hover:decoration-[#1a3030]"
              >
                Learn More
              </a>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="order-2 flex min-h-[280px] flex-col items-center justify-center bg-[#687C69] px-8 py-12 text-center sm:px-10 sm:py-14 md:order-1 md:min-h-[320px] md:py-16 lg:min-h-[360px]">
              <h2 className="max-w-[24ch] font-serif text-2xl font-normal leading-snug text-[#f5f0e8] sm:text-3xl md:text-[32px]">
                Dive into the world of Organic Works
              </h2>
              <p className="mt-5 max-w-md font-['Montserrat',sans-serif] text-sm font-medium leading-[1.62] tracking-normal text-white/90">
                From transparent sourcing to thoughtful craft, explore how every product is rooted in
                organic integrity — made for everyday rituals you can trust.
              </p>
              <a
                href="#"
                className="mt-8 font-['Montserrat',sans-serif] text-sm font-medium text-[#f5f0e8] underline decoration-white/35 underline-offset-4 transition-colors hover:decoration-white"
              >
                Learn More
              </a>
            </div>
            <img
              src="/images/mid5.png"
              alt="Two people relaxing in a sunlit meadow"
              className="order-1 h-full min-h-[260px] w-full object-cover md:order-2 md:min-h-[320px] lg:min-h-[360px]"
            />
          </div>
        </section>

        <section className="bg-[#f7efe3] pt-0 pb-20">
          <div className="flex flex-col items-center">
            <div className="w-8 h-20 bg-[#d9d9d9] mb-4"></div>
            <h3 className="font-medium text-[#1a3636] text-lg sm:text-[22px] mb-10">
              @selfsoul_healwithnature
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5 px-6 w-full max-w-[1100px] mx-auto mb-10">
              {[1, 2, 3, 4].map((num) => (
                <div key={num} className="aspect-square w-full overflow-hidden">
                  <img 
                    src={`/home_runner/${num}.jpg`} 
                    alt={`Social media post ${num}`} 
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="border-y border-[#1a3636]/20 w-full overflow-hidden whitespace-nowrap py-4">
            <div className="inline-block animate-[marquee_20s_linear_infinite]">
              <span className="text-[#45504c] text-[15px] font-medium mx-8">100% Organic Ingredients</span>
              <span className="text-[#45504c] text-[15px] font-medium mx-8">100% Clinically Tested</span>
              <span className="text-[#45504c] text-[15px] font-medium mx-8">Suitable For All Skin Types</span>
              <span className="text-[#45504c] text-[15px] font-medium mx-8">100% Vegan</span>
              <span className="text-[#45504c] text-[15px] font-medium mx-8">100% Cruelty Free</span>
              <span className="text-[#45504c] text-[15px] font-medium mx-8">100% Organic Ingredients</span>
              <span className="text-[#45504c] text-[15px] font-medium mx-8">100% Clinically Tested</span>
              <span className="text-[#45504c] text-[15px] font-medium mx-8">Suitable For All Skin Types</span>
              <span className="text-[#45504c] text-[15px] font-medium mx-8">100% Vegan</span>
              <span className="text-[#45504c] text-[15px] font-medium mx-8">100% Cruelty Free</span>
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
