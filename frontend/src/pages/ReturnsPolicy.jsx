import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import BrandStoryBanner from '../components/BrandStoryBanner';
import Newsletter from '../components/Newsletter';

function ReturnsPolicy() {
  return (
    <div className="min-h-screen flex flex-col bg-[#f7efe3]">
      <Header />
      <main className="flex-grow flex flex-col px-4 py-20 max-w-4xl mx-auto w-full">
        <h1 className="text-3xl md:text-4xl font-medium text-[#1a3636] mb-10 uppercase tracking-wide">
          RETURNS POLICY
        </h1>
        <div className="space-y-6 text-[#5a5a5a] text-sm leading-relaxed">
          <p>Please contact Head Office for all returns at hello@selfsoul.com</p>
          
          <p><strong>30 Day Money Back Guarantee</strong><br/>
          We are confident that you will be delighted with your purchase, but should you wish to return an item for a full refund or exchange, then simply return it to us within 30 days. Goods must be unused and in perfect, re-saleable condition (including product packaging, etc.) otherwise we will not be able to refund you. If the item has been bought as a gift, you are responsible for the costs of any other services provided in connection with your purchase, e.g. Gift Wrapping, Delivery, etc., and these costs cannot be refunded under the Money Back Guarantee Scheme.</p>
          
          <p><strong>Faulty Goods</strong><br/>
          All products go through a rigorous quality checking process as part of the service we offer to you. Therefore it’s very unlikely you will receive faulty goods from us, but in the unlikely event that this may happen then you will be reassured to know that we will be happy to refund or exchange the product as you see fit, once the fault has been verified.</p>
          
          <p><strong>Signatures Are Recommended When Returning Goods</strong><br/>
          You will be responsible for any returned goods until they reach us, so please ensure you obtain proof of postage. In the unlikely event of a lost package you will be responsible for claiming from your delivery company.</p>
          
          <p><strong>Refunds</strong><br/>
          Once your item has been returned and we find everything is as expected (either faulty or in perfect condition) then you will be credited with the full purchase price of the item. If you paid by payment or debit card then your card will be refunded.</p>
          
          <p>If you have any further questions that have not been answered here then please don't hesitate to get in touch with our Support team on: hello@selfsoul.com</p>
        </div>
      </main>
      <BrandStoryBanner />
      <Newsletter />
      <Footer />
    </div>
  );
}
export default ReturnsPolicy;
