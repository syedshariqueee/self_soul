import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import BrandStoryBanner from '../components/BrandStoryBanner';
import Newsletter from '../components/Newsletter';

function TermsConditions() {
  return (
    <div className="min-h-screen flex flex-col bg-[#f7efe3]">
      <Header />
      <main className="flex-grow flex flex-col px-4 py-20 max-w-4xl mx-auto w-full">
        <h1 className="text-3xl md:text-4xl font-medium text-[#1a3636] mb-10 uppercase tracking-wide">
          TERMS & CONDITIONS
        </h1>
        <div className="space-y-6 text-[#5a5a5a] text-sm leading-relaxed">
          <p>Company Details:<br/>
          Self Soul Ltd, a company registered in Scotland. Registered office is situated in UK. Email Address: hello@selfsoul.com</p>
          
          <p><strong>Payment</strong><br/>
          You can pay for your order securely online. We accept most major credit and debit cards. Product prices can be shown in your local currency but payment will be taken in GBP (£).</p>
          
          <p><strong>Your Consent</strong><br/>
          By using our web site and submitting your information to our network, you consent to the collection and use of this information by us. If we decide to change our Privacy Policy, we will post those changes on this page so that you are always aware of what information we collect, how we use it, and under what circumstances we disclose it.</p>
          
          <p><strong>Returns / 30 Day Money Back Guarantee</strong><br/>
          We are very confident that you will be delighted with your purchase, but should you wish to return an item for a full refund or exchange, then simply return it to us within 30 days. Goods must be unused and in perfect, re-saleable condition (including product packaging, etc.) otherwise we will not be able to refund you.</p>
          
          <p><strong>Faulty Goods</strong><br/>
          All products go through a rigorous quality checking process. However, if you receive faulty goods from us, we will be happy to refund or exchange the product as you see fit.</p>
        </div>
      </main>
      <BrandStoryBanner />
      <Newsletter />
      <Footer />
    </div>
  );
}
export default TermsConditions;
