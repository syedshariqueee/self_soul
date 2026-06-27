import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Newsletter from '../components/Newsletter';
import HeritageVideoSection from '../components/HeritageVideoSection';
import BrandStoryBanner from '../components/BrandStoryBanner';

const CLINICAL_CARDS = [
  {
    name: 'Dermatologist Approved',
    slug: 'clinical-derm',
    img: '/heritage/clinical-test/1.png',
    desc: "Our skincare and bath product is proudly Dermatologist Approved, ensuring it's gentle, safe, and effective for all skin types. Tested by skin experts, it's crafted to nourish, soothe, and care for your skin without causing irritation—making it a trusted choice for your daily routine.",
  },
  {
    name: 'Hypoallergenic',
    slug: 'clinical-hypo',
    img: '/heritage/clinical-test/2.png',
    desc: "This skincare and bath product is Hypoallergenic, meaning it's carefully formulated to minimize the risk of allergic reactions. Made with skin-friendly ingredients, it's ideal for even the most sensitive skin, offering a soothing and worry-free experience every time you use it.",
  },
  {
    name: 'Non-Comedogenic',
    slug: 'clinical-nonco',
    img: '/heritage/clinical-test/3.png',
    desc: "This product is Non-Comedogenic, which means it won't clog pores or cause breakouts. Perfect for all skin types, especially acne-prone skin, it keeps your skin feeling fresh, clean, and breathable after every use.",
  },
  {
    name: 'Suitable for All Skin Types',
    slug: 'clinical-all',
    img: '/heritage/clinical-test/4.png',
    desc: "Gentle yet effective, this product is Suitable for All Skin Types. Whether you have dry, oily, sensitive, or combination skin, it's designed to nourish and care without causing irritation—making it a versatile addition to any skincare or bath routine.",
    heritageLink: true,
  },
];

export default function ClinicallyTested() {
  return (
    <main className="overflow-x-hidden bg-white text-[#203229]">
      <div className="mx-auto w-full max-w-[1366px] bg-white">
        <Header />

        <HeritageVideoSection />

        <section className="relative bg-[#FDF5F2] px-6 pb-12 pt-2 md:pb-16 md:pt-4">
          <div className="mx-auto flex max-w-[900px] flex-col items-center text-center mt-14">
         
            <h1 className="font-['Montserrat',sans-serif] text-[32px] font-semibold uppercase leading-[1.62] tracking-normal text-[#1B3638]">
              CLINICALLY TESTED FOR ALL SKIN TYPES
            </h1>
            <p className="mt-8 max-w-[640px] font-['Montserrat',sans-serif] text-[12px] font-normal leading-[1.62] tracking-normal text-[#41534D]">
              Our premium, organic bath products are ethically sourced and free of artificial scents. Explore each pillar
              below to learn how we approach testing and suitability for every skin type.
            </p>
          </div>
        </section>

        <section className="bg-[#FDF5F2] px-4 pb-12 pt-2 sm:px-6 md:pb-16 lg:px-10">
          <div className="mx-auto grid max-w-[1312px] grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {CLINICAL_CARDS.map((item) => (
              <article
                key={item.slug}
                className="mx-auto flex w-full max-w-[303px] flex-col overflow-hidden rounded-[4px] bg-transparent shadow-none"
              >
                <div className="relative aspect-[303/364] w-full overflow-hidden rounded-t-[4px] bg-[#e8e4df]">
                  <img src={item.img} alt={item.name} className="h-full w-full object-cover" loading="lazy" />
                </div>
                <div className="flex flex-col gap-3 px-4 pb-5 pt-4 text-left">
                  <h3 className="font-['Montserrat',sans-serif] text-[20px] font-semibold leading-6 tracking-normal text-[#1B3638]">
                    {item.name}
                  </h3>
                  <p className="font-['Montserrat',sans-serif] text-[12px] font-normal leading-[1.62] tracking-normal text-[#41534D]">
                    {item.desc}
                  </p>
                  {item.heritageLink ? (
                    <Link
                      to="/our-heritage"
                      className="font-['Montserrat',sans-serif] text-[12px] font-semibold leading-[1.62] text-[#41534D] underline underline-offset-2 hover:text-[#1B3638]"
                    >
                      Explore Our Heritage
                    </Link>
                  ) : null}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="bg-[#FDF5F2] px-6 pb-16 pt-4 md:pb-20">
          <div className="mx-auto max-w-[720px] text-center">
            <h2 className="font-['Montserrat',sans-serif] text-xl font-semibold uppercase tracking-[0.08em] text-[#1B3638] md:text-2xl">
              Suitability
            </h2>
            <p className="mt-6 font-['Montserrat',sans-serif] text-[12px] font-normal leading-[1.62] tracking-normal text-[#41534D] md:text-[13px]">
              Gentle yet effective routines for even the most sensitive skin—so you can soak with confidence while staying
              true to nature-inspired care.
            </p>
          </div>
        </section>

        <BrandStoryBanner />
        <Newsletter />
        <Footer />
      </div>
    </main>
  );
}
