import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import BrandStoryBanner from '../components/BrandStoryBanner';
import Newsletter from '../components/Newsletter';

function DeliveryInformation() {
  return (
    <div className="min-h-screen flex flex-col bg-[#f7efe3]">
      <Header />
      <main className="flex-grow flex flex-col px-4 py-20 max-w-4xl mx-auto w-full">
        <h1 className="text-3xl md:text-4xl font-medium text-[#1a3636] mb-10 uppercase tracking-wide">
          DELIVERY INFORMATION
        </h1>
        <div className="space-y-6 text-[#5a5a5a] text-sm leading-relaxed">
          <p>FREE Super-saver Delivery when you spend over £40<br/>
          We aim to deliver in the UK within 3-5 working days of order confirmation, get in touch via email hello@selfsoul.com if you have any questions.</p>
          
          <p><strong>Priority Delivery</strong><br/>
          48-hour delivery in the UK is available from £8.95 for orders placed Monday to Thursday only. If you place a 48-hour delivery order on Friday, Saturday or Sunday, then your order will be sent on Monday for arrival by Wednesday. Please allow up to 72 hours for delivery if you live in more remote areas of the country.</p>
          
          <p>Super-saver delivery within the UK is £2.95 unless there are any current site offers offering free postage and packing on orders over a certain amount.</p>
          
          <p>If in the unlikely event, you are not satisfied with the delivery charges then you have the right to cancel your order. No cost will be incurred by yourself should you decide to cancel your order.</p>
          
          <p><strong>International Deliveries</strong><br/>
          International delivery varies and is determined by your basket/cart value. Please enter the products you wish to purchase into your basket/cart, then your shipping costs will be calculated at checkout.</p>
          
          <p><strong>How Long Will It Take For My Package To Arrive?</strong><br/>
          <strong>UK Deliveries</strong><br/>
          48-hour delivery orders are usually delivered with two working days, but please allow up to 72 hours for delivery if you live in more remote areas of the country.</p>
          
          <p>We aim to deliver within 3-5 working days of order confirmation, although we ask that you allow up to 7 working days before contacting customer services via email: hello@selfsoul.com</p>
          
          <p><strong>Worldwide Deliveries</strong><br/>
          Products can be delivered worldwide. We aim to deliver within 7-14 working days of order confirmation, although we ask that you allow 14 days for delivery before contacting customer services via email: hello@selfsoul.com.</p>
        </div>
      </main>
      <BrandStoryBanner />
      <Newsletter />
      <Footer />
    </div>
  );
}
export default DeliveryInformation;
