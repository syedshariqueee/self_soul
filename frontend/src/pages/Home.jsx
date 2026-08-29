import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Newsletter from '../components/Newsletter';
import BrandStoryBanner from '../components/BrandStoryBanner';
import { BESTSELLERS } from '../data/products';

const bathRituals = [
  { title: "Relaxing", img: "/home/relaxing.jpeg" },
  { title: "Healing", img: "/home/healing.jpeg" },
  { title: "Nourishing", img: "/home/nourishing.jpeg" },
];

const ingredientTags = [
  "100% ingredients",
  "100% cruelty free",
  "Suitable for all skin types",
  "100% vegan",
  "100% curated",
];

export default function Home() {
  return (
    <main className="overflow-x-hidden bg-[#f7f5f2] pb-8 text-[#203229] md:pb-10">
      <div className="mx-auto w-full max-w-[1366px] bg-white">
        <Header />

        <section className="relative overflow-hidden bg-[#102418]">
          <img
            src="/home/banner.jpeg"
            alt="Renew your body ritual"
            className="block h-[260px] w-full object-cover sm:h-[360px] md:h-[460px] lg:h-[520px]"
          />
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
          <div className="flex w-full flex-col gap-0 md:h-[560px] md:min-h-[560px] md:flex-row">
            <img
              src="/home/two.jpeg"
              alt="Organic works products in a natural setting"
              className="block aspect-[4/3] w-full bg-[#102418] object-fill md:aspect-auto md:h-full md:w-1/2 md:min-h-0"
            />
            <img
              src="/home/twoimages.jpeg"
              alt="Hair care benefits"
              className="block aspect-[4/3] w-full bg-[#102418] object-fill md:aspect-auto md:h-full md:w-1/2 md:min-h-0"
            />
          </div>
        </section>

        <section className="bg-[#6b7b6b] px-4 py-8 sm:px-6 md:px-10 md:py-10 lg:px-14">
          <div className="mx-auto flex min-h-[208px] max-w-[1440px] flex-col items-center justify-center text-center text-white">
            <h2 className="font-['Montserrat',sans-serif] text-xs font-medium uppercase tracking-[0.12em] sm:text-sm md:text-[15px]">
              Clinically approved, clean beauty
            </h2>
            <p className="mt-3 max-w-[920px] font-['Montserrat',sans-serif] text-[11px] leading-[1.65] text-white/95 sm:text-xs sm:leading-relaxed md:text-[13px] md:leading-7">
            Expertly formulated and clinically tested for all skin types, our products deliver a gentle yet indulgent experience that supports healthy, balanced skin. 
            </p>
          </div>
        </section>

        <section className="bg-white px-4 py-8 sm:px-6 sm:py-10 md:px-10 md:py-12 lg:px-14">
          <div className="mx-auto grid w-full max-w-[1200px] grid-cols-1 items-stretch gap-3 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
            <div className="flex min-h-[280px] items-center bg-[#41534D] px-8 py-12 font-['Montserrat',sans-serif] text-white sm:px-10 md:min-h-0 md:px-12 lg:px-14">
              <div className="flex flex-col items-start justify-center">
                <h2 className="text-3xl font-bold leading-tight tracking-tight sm:text-4xl">Best Sellers</h2>
                <p className="mt-3 text-lg font-medium leading-snug text-white sm:text-xl">Everlasting Favourites</p>
                <p className="mt-4 max-w-[22ch] text-xs leading-relaxed text-white/85 sm:text-sm">
                  <span className="block">our crowd-pleasers with</span>
                  <span className="block">guaranteed</span>
                </p>
                <Link
                  to="/bath"
                  className="mt-8 w-fit rounded-full border border-white/70 bg-[#5c6e62] px-8 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90"
                >
                  Explore
                </Link>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 md:h-full md:grid-cols-3 md:grid-rows-2">
              {BESTSELLERS.map((item) => (
                <Link
                  key={item.slug}
                  to={`/bath/${item.slug}`}
                  className="relative min-h-0 min-w-0 overflow-hidden bg-neutral-100 aspect-square"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    width={240}
                    height={240}
                    className="absolute inset-0 h-full w-full object-cover"
                    loading="lazy"
                  />
                </Link>
              ))}
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
              "linear-gradient(rgba(0,0,0,0.06), rgba(0,0,0,0.12)), url('/home/image_text.jpeg')",
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
              src="/home/side.jpeg"
              alt="Mountain valley with wildflowers"
              className="h-[320px] w-full object-cover md:h-[640px]"
            />
            <div className="flex min-h-[320px] flex-col items-start justify-center bg-[#ebddd1] px-8 py-12 text-left sm:px-10 sm:py-14 md:min-h-[640px] md:px-14 md:py-16 lg:px-16">
              <h2 className="w-full max-w-[526px] font-['Montserrat',sans-serif] text-[28px] font-medium leading-[1.62] tracking-normal text-[#1B3638]">
                Unveiling the symphony of Nature
              </h2>
              <p className="mt-5 w-full max-w-[640px] font-['Montserrat',sans-serif] text-xs font-normal leading-[1.62] tracking-normal text-[#41534D]">
                Organic Works understands that true beauty should not come at the expense of the environment.
                Every product is crafted with love and care, minimizing it&apos;s carbon footprint. The true
                source of strength for the brand, is the earth itself, using ingredients sourced from Organic
                farming. With 99% of it&apos;s plant based ingredients derived from sustainable sources, the brand
                is firmly rooted in Nature&apos;s abundance.
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
            <div className="order-2 flex min-h-[320px] flex-col items-center justify-center bg-[#1A1F1C] px-8 py-12 text-left sm:px-10 sm:py-14 md:order-1 md:min-h-[640px] md:py-16">
              <h2 className="w-full max-w-[526px] font-['Montserrat',sans-serif] text-[28px] font-medium leading-[1.62] tracking-normal text-[#D6BC97]">
                Dive into the world of Organic Works
              </h2>
              <p className="mt-5 w-full max-w-[526px] font-['Montserrat',sans-serif] text-xs font-normal leading-[1.62] tracking-normal text-[#FDF3EC]">
                Elevate your senses with the purity of our secret ingredients, lovingly nurtured by the
                Scottish landscape. Our commitment to authenticity goes beyond the surface - it&apos;s a dedication
                to preserving the very essence of the land, ensuring that each fragrance, feel and texture
                orchestrated into the Organic works range, is a genuine connection to the heart of Scotland.
              </p>
              <a
                href="#"
                className="mt-8 font-['Montserrat',sans-serif] text-base font-medium leading-[1.62] tracking-normal !text-white underline decoration-white/35 underline-offset-4 transition-colors hover:decoration-white"
              >
                Learn More
              </a>
            </div>
            <img
              src="/home/rightside.jpeg"
              alt="Two people relaxing in a sunlit meadow"
              className="order-1 h-[320px] w-full object-cover md:order-2 md:h-[640px]"
            />
          </div>
        </section>

        <section className="bg-[#f7efe3] pt-20 pb-20">
          <div className="flex flex-col items-center">
            <h3 className="mb-10 font-medium text-[#1a3636] text-lg sm:text-[22px]">
              <a
                href="https://www.instagram.com/selfsoul_sanctuary?igsh=MXdjZ2N1ejh5c3R2Zg=="
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                @selfsoul_sanctuary
              </a>
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
              <span className="text-[#45504c] text-[15px] font-medium mx-8">100% Organic Ingredient</span>
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

        <BrandStoryBanner imageSrc="/footer-banner/homebanner.png" />
        <Newsletter />
        <Footer />
      </div>
    </main>
  );
}
