import Header from '../components/Header';
import Footer from '../components/Footer';
import Newsletter from '../components/Newsletter';
import BrandStoryBanner from '../components/BrandStoryBanner';

const STORY_BODY =
  "As the child of an immigrant mother who never prioritized her health for the sake of our family, I have witnessed first-hand what decades of sacrificing your wellbeing can do to you and those around you. It's not kind. I'm on this journey with all of you to help you prioritize yourself—and let's make sure we slow down to enjoy it.";

export default function OurStore() {
  return (
    <main className="overflow-x-hidden bg-white text-[#203229]">
      <div className="mx-auto w-full max-w-[1366px] bg-white">
        <Header />

        {/* Hero — OUR STORY (Montserrat 500, 48px, lh 162%, uppercase, #1B3638) */}
        <section className="bg-[#FDF5F0] px-6 pb-12 pt-16 text-center md:pb-16 md:pt-20 lg:px-14">
          <h1 className="font-['Montserrat',sans-serif] text-[32px] font-medium uppercase leading-[1.62] tracking-normal text-[#1B3638] sm:text-[40px] md:text-[48px]">
            OUR STORY
          </h1>
          <p className="mx-auto mt-8 max-w-[842px] font-['Montserrat',sans-serif] text-[18px] font-semibold leading-[1.62] tracking-normal text-[#41534D] sm:text-[20px]">
            I aspire to build a bath business that puts people first.
          </p>
          <p className="mx-auto mt-8 max-w-[842px] font-['Montserrat',sans-serif] text-[15px] font-normal leading-[1.62] tracking-normal text-[#41534D] sm:text-[16px]">
            {STORY_BODY}
          </p>
        </section>

        {/* Founder — Frame 285 image + copy */}
        <section className="bg-[#FDF5F0] px-6 py-12 md:px-10 md:py-16 lg:px-14 lg:py-20">
          <div className="mx-auto grid max-w-[1440px] grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-12 lg:gap-16">
            <div className="flex justify-center md:justify-start">
              <div className="h-[300px] w-full max-w-[621px] overflow-hidden rounded-[4px] bg-[#EBDDD1]">
                <img
                  src="/images/heritage/founder.png"
                  alt="Founder Aanchal"
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>
            <div className="flex flex-col justify-center text-left">
              <h2 className="font-['Montserrat',sans-serif] text-[28px] font-medium leading-[1.62] tracking-normal text-[#1B3638]">
                Hi, my name is Aanchal
              </h2>
              <p className="mt-5 max-w-lg font-['Montserrat',sans-serif] text-[16px] font-normal leading-[1.62] tracking-normal text-[#41534D]">
                I&apos;m so grateful that you&apos;re here. I&apos;m an entrepreneur, traveller (ex-Digital Nomad), and bath
                fanatic from India.
              </p>
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
