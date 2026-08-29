import Header from '../Header';
import Footer from '../Footer';
import Newsletter from '../Newsletter';
import BrandStoryBanner from '../BrandStoryBanner';

export default function OrderPageLayout({ children }) {
  return (
    <main className="min-h-screen overflow-x-hidden bg-[#f7efe3] text-[#1a1a1a]">
      <div className="mx-auto w-full max-w-[1366px] bg-[#f7efe3]">
        <Header />
        {children}
        <BrandStoryBanner imageSrc="/footer-banner/homebanner.png" />
        <Newsletter />
        <Footer />
      </div>
    </main>
  );
}
