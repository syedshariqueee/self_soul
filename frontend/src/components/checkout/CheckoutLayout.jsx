import Header from '../Header';
import Footer from '../Footer';
import Newsletter from '../Newsletter';
import BrandStoryBanner from '../BrandStoryBanner';

export default function CheckoutLayout({ children }) {
  return (
    <main className="min-h-screen overflow-x-hidden bg-[#fdf6f0] text-[#1a1a1a]">
      <div className="mx-auto w-full max-w-[1366px] bg-[#fdf6f0]">
        <Header />
        {children}
        <BrandStoryBanner imageSrc="/footer-banner/homebanner.png" />
        <Newsletter />
        <Footer />
      </div>
    </main>
  );
}
