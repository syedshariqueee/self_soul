import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import BrandStoryBanner from '../components/BrandStoryBanner';
import Newsletter from '../components/Newsletter';

function Faqs() {
  return (
    <div className="min-h-screen flex flex-col bg-[#f7efe3]">
      <Header />
      <main className="flex-grow flex flex-col px-4 py-20 max-w-4xl mx-auto w-full">
        <h1 className="text-3xl md:text-4xl font-medium text-[#1a3636] mb-10 uppercase tracking-wide">
          FAQs
        </h1>
        <div className="space-y-8 text-[#1a3636]">
          <div>
            <h3 className="font-semibold mb-2 text-[15px]">1. Is this product safe for sensitive skin?</h3>
            <p className="text-[#5a5a5a] text-sm leading-relaxed">Yes, our product is Dermatologist Approved and Hypoallergenic, making it safe and gentle for even the most sensitive skin types.</p>
          </div>
          <div>
            <h3 className="font-semibold mb-2 text-[15px]">2. Can I use this daily?</h3>
            <p className="text-[#5a5a5a] text-sm leading-relaxed">Absolutely! Our formula is designed for daily use to keep your skin nourished, soft, and refreshed.</p>
          </div>
          <div>
            <h3 className="font-semibold mb-2 text-[15px]">3. Will this clog my pores?</h3>
            <p className="text-[#5a5a5a] text-sm leading-relaxed">No, the product is Non-Comedogenic, meaning it won't clog pores or cause breakouts—perfect for acne-prone and oily skin.</p>
          </div>
          <div>
            <h3 className="font-semibold mb-2 text-[15px]">4. Is this suitable for all skin types?</h3>
            <p className="text-[#5a5a5a] text-sm leading-relaxed">Yes, it's carefully crafted to be suitable for all skin types including dry, oily, combination, and sensitive skin.</p>
          </div>
          <div>
            <h3 className="font-semibold mb-2 text-[15px]">5. Are there any artificial fragrances or colors?</h3>
            <p className="text-[#5a5a5a] text-sm leading-relaxed">No, our products are free from harsh chemicals and artificial fragrances, keeping your skin healthy and irritation-free.</p>
          </div>
          <div>
            <h3 className="font-semibold mb-2 text-[15px]">6. Is this product cruelty-free?</h3>
            <p className="text-[#5a5a5a] text-sm leading-relaxed">Yes, we are proud to be cruelty-free. No testing is done on any animals at any stage of our production.</p>
          </div>
        </div>
      </main>
      <BrandStoryBanner />
      <Newsletter />
      <Footer />
    </div>
  );
}
export default Faqs;
